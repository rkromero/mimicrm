const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: './config.env' });

// Configurar zona horaria de Argentina
process.env.TZ = 'America/Argentina/Buenos_Aires';

console.log('🚀 Iniciando servidor MIMI CRM...');
console.log('🕐 Zona horaria configurada:', process.env.TZ);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mimi_crm',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    waitForConnections: true,
    queueLimit: 5
};

// Crear pool de conexiones a la base de datos
let db;

async function connectDB() {
    try {
        db = mysql.createPool(dbConfig);
        
        // Probar la conexión
        const connection = await db.getConnection();
        connection.release();
        
        console.log('✅ Conectado a la base de datos MySQL');
        
        // Crear las tablas si no existen
        await createTables();
        
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
        process.exit(1);
    }
}

// Función para crear las tablas
async function createTables() {
    try {
        // Tabla de usuarios
        await db.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                perfil ENUM('Administrador', 'Vendedor', 'Produccion', 'Gerente de ventas') DEFAULT 'Vendedor',
                avatar VARCHAR(255),
                tema VARCHAR(20) DEFAULT 'light',
                activo BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Tabla de clientes
        await db.execute(`
            CREATE TABLE IF NOT EXISTS clientes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                apellido VARCHAR(255),
                cuit VARCHAR(50) NOT NULL,
                email VARCHAR(255),
                telefono VARCHAR(50),
                direccion TEXT,
                provincia VARCHAR(100),
                ciudad VARCHAR(100),
                localidad VARCHAR(100),
                codigo_postal VARCHAR(20),
                saldo DECIMAL(15,2) DEFAULT 0,
                creado_por INT,
                activo BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (creado_por) REFERENCES usuarios(id)
            )
        `);

        // Tabla de productos
        await db.execute(`
            CREATE TABLE IF NOT EXISTS productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                precio DECIMAL(15,2) NOT NULL,
                stock INT DEFAULT 0,
                activo BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Tabla de pedidos
        await db.execute(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                numero_pedido VARCHAR(50) UNIQUE NOT NULL,
                cliente_id INT NOT NULL,
                descripcion TEXT,
                monto DECIMAL(15,2) NOT NULL,
                estado ENUM('pendiente de pago', 'fabricar', 'sale fabrica', 'completado') DEFAULT 'pendiente de pago',
                fecha DATE NOT NULL,
                creado_por INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (cliente_id) REFERENCES clientes(id),
                FOREIGN KEY (creado_por) REFERENCES usuarios(id)
            )
        `);

        // Tabla de items de pedidos
        await db.execute(`
            CREATE TABLE IF NOT EXISTS pedido_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pedido_id INT NOT NULL,
                producto_id INT NOT NULL,
                cantidad INT NOT NULL,
                precio DECIMAL(15,2) NOT NULL,
                subtotal DECIMAL(15,2) NOT NULL,
                FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
                FOREIGN KEY (producto_id) REFERENCES productos(id)
            )
        `);

        // Tabla de pagos
        await db.execute(`
            CREATE TABLE IF NOT EXISTS pagos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cliente_id INT NOT NULL,
                pedido_id INT,
                monto DECIMAL(15,2) NOT NULL,
                metodo ENUM('efectivo', 'transferencia', 'tarjeta') NOT NULL,
                referencia VARCHAR(255),
                fecha DATE NOT NULL,
                creado_por INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (cliente_id) REFERENCES clientes(id),
                FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
                FOREIGN KEY (creado_por) REFERENCES usuarios(id)
            )
        `);

        console.log('✅ Tablas creadas correctamente');
        
    } catch (error) {
        console.error('❌ Error creando tablas:', error);
    }
}

// Función para generar número de pedido consecutivo
async function generateConsecutiveOrderNumber() {
    try {
        const [result] = await db.execute('SELECT MAX(id) as max_id FROM pedidos');
        
        let nextNumber = 1;
        
        if (result.length > 0 && result[0].max_id !== null) {
            nextNumber = result[0].max_id + 1;
        }
        
        return `PED-${nextNumber.toString().padStart(4, '0')}`;
    } catch (error) {
        console.error('Error generando número de pedido:', error);
        return `PED-${Date.now()}`;
    }
}

// Middleware de autenticación
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de acceso requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
}

// RUTAS DE AUTENTICACIÓN

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const [users] = await db.execute(
            'SELECT * FROM usuarios WHERE email = ? AND activo = true',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, perfil: user.perfil },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                perfil: user.perfil,
                avatar: user.avatar,
                tema: user.tema
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Registro
app.post('/api/auth/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
        }

        const [existingUsers] = await db.execute(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Ya existe un usuario con este email' });
        }

        const [totalUsers] = await db.execute('SELECT COUNT(*) as count FROM usuarios');
        const isFirstUser = totalUsers[0].count === 0;
        const perfil = isFirstUser ? 'Administrador' : 'Vendedor';

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            'INSERT INTO usuarios (nombre, email, password, perfil) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, perfil]
        );

        const token = jwt.sign(
            { id: result.insertId, email: email, perfil: perfil },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: result.insertId,
                nombre: nombre,
                email: email,
                perfil: perfil,
                avatar: null,
                tema: 'light'
            },
            message: isFirstUser ? 'Primer usuario creado como Administrador' : 'Usuario creado exitosamente'
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Verificar token
app.get('/api/auth/verify', authenticateToken, async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT id, nombre, email, perfil, avatar, tema FROM usuarios WHERE id = ?',
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ user: users[0] });
    } catch (error) {
        console.error('Error verificando token:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS DE CLIENTES

// Obtener todos los clientes
app.get('/api/clientes', authenticateToken, async (req, res) => {
    try {
        let query = `
            SELECT 
                c.*,
                u.nombre as creado_por_nombre,
                COALESCE(pedidos_totals.total_pedidos, 0) as total_pedidos,
                COALESCE(pagos_totals.total_pagos, 0) as total_pagos,
                (COALESCE(pedidos_totals.total_pedidos, 0) - COALESCE(pagos_totals.total_pagos, 0)) as saldo_real
            FROM clientes c
            LEFT JOIN usuarios u ON c.creado_por = u.id
            LEFT JOIN (
                SELECT cliente_id, SUM(monto) as total_pedidos 
                FROM pedidos 
                GROUP BY cliente_id
            ) pedidos_totals ON c.id = pedidos_totals.cliente_id
            LEFT JOIN (
                SELECT cliente_id, SUM(monto) as total_pagos 
                FROM pagos 
                GROUP BY cliente_id
            ) pagos_totals ON c.id = pagos_totals.cliente_id
            WHERE c.activo = true
        `;
        
        const params = [];

        if (req.user.perfil === 'Vendedor') {
            query += ' AND c.creado_por = ?';
            params.push(req.user.id);
        } else if (req.user.perfil === 'Gerente de ventas') {
            query += ' AND c.creado_por IN (SELECT id FROM usuarios WHERE perfil = "Vendedor")';
        }

        query += ' ORDER BY c.nombre';

        const [clientes] = await db.execute(query, params);
        
        const clientesConSaldo = clientes.map(cliente => ({
            ...cliente,
            saldo: cliente.saldo_real,
            total_pedidos: parseFloat(cliente.total_pedidos || 0),
            total_pagos: parseFloat(cliente.total_pagos || 0),
            saldo_calculado: parseFloat(cliente.saldo_real || 0)
        }));
        
        res.json(clientesConSaldo);
    } catch (error) {
        console.error('Error obteniendo clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener cliente por ID
app.get('/api/clientes/:clientId', authenticateToken, async (req, res) => {
    try {
        const { clientId } = req.params;
        
        const query = `
            SELECT 
                c.*,
                u.nombre as creado_por_nombre,
                COALESCE(pedidos_totals.total_pedidos, 0) as total_pedidos,
                COALESCE(pagos_totals.total_pagos, 0) as total_pagos,
                (COALESCE(pedidos_totals.total_pedidos, 0) - COALESCE(pagos_totals.total_pagos, 0)) as saldo_real
            FROM clientes c
            LEFT JOIN usuarios u ON c.creado_por = u.id
            LEFT JOIN (
                SELECT cliente_id, SUM(monto) as total_pedidos 
                FROM pedidos 
                GROUP BY cliente_id
            ) pedidos_totals ON c.id = pedidos_totals.cliente_id
            LEFT JOIN (
                SELECT cliente_id, SUM(monto) as total_pagos 
                FROM pagos 
                GROUP BY cliente_id
            ) pagos_totals ON c.id = pagos_totals.cliente_id
            WHERE c.id = ?
        `;
        
        const [clientes] = await db.execute(query, [clientId]);
        
        if (clientes.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        
        const cliente = clientes[0];
        const clienteConSaldo = {
            ...cliente,
            saldo: cliente.saldo_real,
            total_pedidos: parseFloat(cliente.total_pedidos || 0),
            total_pagos: parseFloat(cliente.total_pagos || 0),
            saldo_calculado: parseFloat(cliente.saldo_real || 0)
        };
        
        res.json(clienteConSaldo);
    } catch (error) {
        console.error('Error obteniendo cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear cliente
app.post('/api/clientes', authenticateToken, async (req, res) => {
    try {
        const {
            nombre, apellido, cuit, email, telefono, direccion, provincia,
            ciudad, localidad, codigo_postal
        } = req.body;

        const [result] = await db.execute(
            `INSERT INTO clientes (
                nombre, apellido, cuit, email, telefono, direccion, provincia,
                ciudad, localidad, codigo_postal, creado_por
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre, apellido, cuit, email, telefono, direccion, provincia,
                ciudad, localidad, codigo_postal, req.user.id
            ]
        );

        res.status(201).json({ id: result.insertId, message: 'Cliente creado exitosamente' });
    } catch (error) {
        console.error('Error creando cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar cliente
app.put('/api/clientes/:clientId', authenticateToken, async (req, res) => {
    try {
        const { clientId } = req.params;
        const {
            nombre, apellido, cuit, email, telefono, direccion, provincia,
            ciudad, localidad, codigo_postal
        } = req.body;

        // Verificar que el cliente existe
        const [existingClient] = await db.execute(
            'SELECT * FROM clientes WHERE id = ?',
            [clientId]
        );

        if (existingClient.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Actualizar el cliente
        await db.execute(
            `UPDATE clientes SET 
                nombre = ?, apellido = ?, cuit = ?, email = ?, telefono = ?, 
                direccion = ?, provincia = ?, ciudad = ?, localidad = ?, codigo_postal = ?
                WHERE id = ?`,
            [
                nombre, apellido, cuit, email, telefono, direccion, provincia,
                ciudad, localidad, codigo_postal, clientId
            ]
        );

        console.log(`✅ Cliente ${clientId} actualizado exitosamente`);
        res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar cliente
app.delete('/api/clientes/:clientId', authenticateToken, async (req, res) => {
    try {
        const { clientId } = req.params;

        // Verificar que el cliente existe
        const [existingClient] = await db.execute(
            'SELECT * FROM clientes WHERE id = ?',
            [clientId]
        );

        if (existingClient.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Marcar como inactivo en lugar de eliminar
        await db.execute('UPDATE clientes SET activo = false WHERE id = ?', [clientId]);

        console.log(`✅ Cliente ${clientId} marcado como inactivo`);
        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener clientes inactivos (nueva ruta)
app.get('/api/clientes/inactivos', authenticateToken, async (req, res) => {
    try {
        console.log('🔍 Ejecutando consulta de clientes inactivos...');
        
        const query = `
            SELECT 
                c.id,
                c.nombre,
                c.email,
                c.telefono,
                c.direccion,
                c.created_at,
                MAX(p.fecha) as ultimo_pedido,
                COALESCE(DATEDIFF(CURDATE(), MAX(p.fecha)), 0) as dias_sin_actividad,
                COALESCE(SUM(p.monto), 0) as total_historico
            FROM clientes c
            LEFT JOIN pedidos p ON c.id = p.cliente_id
            WHERE c.activo = true
            GROUP BY c.id, c.nombre, c.email, c.telefono, c.direccion, c.created_at
            HAVING ultimo_pedido IS NULL OR ultimo_pedido < DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            ORDER BY dias_sin_actividad DESC, c.nombre ASC
        `;
        
        const [clientes] = await db.execute(query);
        console.log(`✅ Encontrados ${clientes.length} clientes inactivos`);
        
        res.json(clientes);
    } catch (error) {
        console.error('❌ Error en endpoint de clientes inactivos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS DE PRODUCTOS

// Obtener todos los productos
app.get('/api/productos', authenticateToken, async (req, res) => {
    try {
        const [productos] = await db.execute(
            'SELECT * FROM productos WHERE activo = true ORDER BY nombre'
        );
        res.json(productos);
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear producto
app.post('/api/productos', authenticateToken, async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;

        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ error: 'El nombre del producto es requerido' });
        }

        if (!precio || isNaN(precio) || precio <= 0) {
            return res.status(400).json({ error: 'El precio debe ser un número válido mayor a 0' });
        }

        const [result] = await db.execute(
            'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
            [nombre.trim(), descripcion || null, parseFloat(precio)]
        );

        res.status(201).json({ id: result.insertId, message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar producto
app.put('/api/productos/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const { nombre, descripcion, precio } = req.body;

        // Verificar que el producto existe
        const [existingProduct] = await db.execute(
            'SELECT * FROM productos WHERE id = ?',
            [productId]
        );

        if (existingProduct.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar el producto
        await db.execute(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?',
            [nombre, descripcion, precio, productId]
        );

        console.log(`✅ Producto ${productId} actualizado exitosamente`);
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar producto
app.delete('/api/productos/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;

        // Verificar que el producto existe
        const [existingProduct] = await db.execute(
            'SELECT * FROM productos WHERE id = ?',
            [productId]
        );

        if (existingProduct.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Marcar como inactivo en lugar de eliminar
        await db.execute('UPDATE productos SET activo = false WHERE id = ?', [productId]);

        console.log(`✅ Producto ${productId} marcado como inactivo`);
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS DE PEDIDOS

// Obtener todos los pedidos
app.get('/api/pedidos', authenticateToken, async (req, res) => {
    try {
        let query = `
            SELECT p.*, c.nombre as cliente_nombre, c.apellido as cliente_apellido, u.nombre as creado_por_nombre
            FROM pedidos p
            LEFT JOIN clientes c ON p.cliente_id = c.id
            LEFT JOIN usuarios u ON p.creado_por = u.id
            WHERE 1=1
        `;
        
        const params = [];

        if (req.user.perfil === 'Vendedor') {
            query += ' AND p.creado_por = ?';
            params.push(req.user.id);
        }

        query += ' ORDER BY p.created_at DESC';

        const [pedidos] = await db.execute(query, params);
        res.json(pedidos);
    } catch (error) {
        console.error('Error obteniendo pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear pedido
app.post('/api/pedidos', authenticateToken, async (req, res) => {
    try {
        const { cliente_id, descripcion, monto, estado = 'pendiente de pago', items = [] } = req.body;

        const numeroPedido = await generateConsecutiveOrderNumber();

        const [result] = await db.execute(
            'INSERT INTO pedidos (numero_pedido, cliente_id, descripcion, monto, estado, fecha, creado_por) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [numeroPedido, cliente_id, descripcion, monto, estado, new Date().toISOString().split('T')[0], req.user.id]
        );

        const pedidoId = result.insertId;

        if (items && items.length > 0) {
            for (const item of items) {
                const subtotal = item.cantidad * item.precio;
                await db.execute(
                    'INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)',
                    [pedidoId, item.producto_id, item.cantidad, item.precio, subtotal]
                );
            }
        }

        res.status(201).json({ id: pedidoId, numero_pedido: numeroPedido, message: 'Pedido creado exitosamente' });
    } catch (error) {
        console.error('Error creando pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener items de un pedido específico
app.get('/api/pedidos/:orderId/items', authenticateToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        
        const query = `
            SELECT pi.*, p.nombre as producto_nombre, p.descripcion as producto_descripcion
            FROM pedido_items pi
            LEFT JOIN productos p ON pi.producto_id = p.id
            WHERE pi.pedido_id = ?
            ORDER BY pi.id
        `;
        
        const [items] = await db.execute(query, [orderId]);
        
        console.log(`✅ Items cargados para pedido ${orderId}:`, items.length);
        res.json(items);
    } catch (error) {
        console.error('Error obteniendo items del pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar pedido
app.put('/api/pedidos/:orderId', authenticateToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { cliente_id, descripcion, monto, estado, items = [] } = req.body;

        // Verificar que el pedido existe
        const [existingOrder] = await db.execute(
            'SELECT * FROM pedidos WHERE id = ?',
            [orderId]
        );

        if (existingOrder.length === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Actualizar el pedido
        await db.execute(
            'UPDATE pedidos SET cliente_id = ?, descripcion = ?, monto = ?, estado = ? WHERE id = ?',
            [cliente_id, descripcion, monto, estado, orderId]
        );

        // Eliminar items existentes
        await db.execute('DELETE FROM pedido_items WHERE pedido_id = ?', [orderId]);

        // Insertar nuevos items
        if (items && items.length > 0) {
            for (const item of items) {
                const subtotal = item.cantidad * item.precio;
                await db.execute(
                    'INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)',
                    [orderId, item.producto_id, item.cantidad, item.precio, subtotal]
                );
            }
        }

        console.log(`✅ Pedido ${orderId} actualizado exitosamente`);
        res.json({ message: 'Pedido actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar pedido
app.delete('/api/pedidos/:orderId', authenticateToken, async (req, res) => {
    try {
        const { orderId } = req.params;

        // Verificar que el pedido existe
        const [existingOrder] = await db.execute(
            'SELECT * FROM pedidos WHERE id = ?',
            [orderId]
        );

        if (existingOrder.length === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Eliminar el pedido (los items se eliminan automáticamente por CASCADE)
        await db.execute('DELETE FROM pedidos WHERE id = ?', [orderId]);

        console.log(`✅ Pedido ${orderId} eliminado exitosamente`);
        res.json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS DE PAGOS

// Obtener todos los pagos
app.get('/api/pagos', authenticateToken, async (req, res) => {
    try {
        let query = `
            SELECT p.*, c.nombre as cliente_nombre, pe.numero_pedido, u.nombre as creado_por_nombre
            FROM pagos p
            LEFT JOIN clientes c ON p.cliente_id = c.id
            LEFT JOIN pedidos pe ON p.pedido_id = pe.id
            LEFT JOIN usuarios u ON p.creado_por = u.id
            WHERE 1=1
        `;
        
        const params = [];

        if (req.user.perfil === 'Vendedor') {
            query += ' AND p.creado_por = ?';
            params.push(req.user.id);
        }

        query += ' ORDER BY p.fecha DESC';

        const [pagos] = await db.execute(query, params);
        res.json(pagos);
    } catch (error) {
        console.error('Error obteniendo pagos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear pago
app.post('/api/pagos', authenticateToken, async (req, res) => {
    try {
        const { cliente_id, pedido_id, monto, metodo, referencia } = req.body;

        if (!cliente_id || !monto || !metodo) {
            return res.status(400).json({ error: 'Cliente, monto y método son campos requeridos' });
        }

        const [result] = await db.execute(
            'INSERT INTO pagos (cliente_id, pedido_id, monto, metodo, referencia, fecha, creado_por) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cliente_id, pedido_id || null, monto, metodo, referencia, new Date().toISOString().split('T')[0], req.user.id]
        );

        res.status(201).json({ id: result.insertId, message: 'Pago registrado exitosamente' });
    } catch (error) {
        console.error('Error registrando pago:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar pago
app.put('/api/pagos/:paymentId', authenticateToken, async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { cliente_id, pedido_id, monto, metodo, referencia } = req.body;

        // Verificar que el pago existe
        const [existingPayment] = await db.execute(
            'SELECT * FROM pagos WHERE id = ?',
            [paymentId]
        );

        if (existingPayment.length === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        // Actualizar el pago
        await db.execute(
            'UPDATE pagos SET cliente_id = ?, pedido_id = ?, monto = ?, metodo = ?, referencia = ? WHERE id = ?',
            [cliente_id, pedido_id || null, monto, metodo, referencia, paymentId]
        );

        console.log(`✅ Pago ${paymentId} actualizado exitosamente`);
        res.json({ message: 'Pago actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando pago:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar pago
app.delete('/api/pagos/:paymentId', authenticateToken, async (req, res) => {
    try {
        const { paymentId } = req.params;

        // Verificar que el pago existe
        const [existingPayment] = await db.execute(
            'SELECT * FROM pagos WHERE id = ?',
            [paymentId]
        );

        if (existingPayment.length === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        // Eliminar el pago
        await db.execute('DELETE FROM pagos WHERE id = ?', [paymentId]);

        console.log(`✅ Pago ${paymentId} eliminado exitosamente`);
        res.json({ message: 'Pago eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando pago:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para servir la aplicación
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Ruta para servir el login
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Ruta para servir el dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ENDPOINT DE PRUEBA
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ENDPOINT DE DIAGNÓSTICO PARA CLIENTES INACTIVOS
app.get('/api/debug/inactive-clients', authenticateToken, async (req, res) => {
    try {
        // Calcular la fecha de hace 30 días
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];
        
        console.log('🔍 Fecha de hace 30 días:', thirtyDaysAgoStr);
        
        // 1. Verificar cuántos clientes hay en total
        const [totalClients] = await db.execute('SELECT COUNT(*) as total FROM clientes WHERE activo = true');
        console.log('📊 Total de clientes activos:', totalClients[0].total);
        
        // 2. Verificar cuántos pedidos hay en total
        const [totalOrders] = await db.execute('SELECT COUNT(*) as total FROM pedidos');
        console.log('📊 Total de pedidos:', totalOrders[0].total);
        
        // 3. Verificar pedidos recientes (últimos 30 días)
        const [recentOrders] = await db.execute(
            'SELECT COUNT(*) as total FROM pedidos WHERE fecha >= ?',
            [thirtyDaysAgoStr]
        );
        console.log('📊 Pedidos en los últimos 30 días:', recentOrders[0].total);
        
        // 4. Verificar clientes con pedidos recientes
        const [clientsWithRecentOrders] = await db.execute(`
            SELECT COUNT(DISTINCT c.id) as total
            FROM clientes c
            INNER JOIN pedidos p ON c.id = p.cliente_id
            WHERE c.activo = true AND p.fecha >= ?
        `, [thirtyDaysAgoStr]);
        console.log('📊 Clientes con pedidos recientes:', clientsWithRecentOrders[0].total);
        
        // 5. Verificar clientes sin pedidos
        const [clientsWithoutOrders] = await db.execute(`
            SELECT COUNT(*) as total
            FROM clientes c
            LEFT JOIN pedidos p ON c.id = p.cliente_id
            WHERE c.activo = true AND p.id IS NULL
        `);
        console.log('📊 Clientes sin pedidos:', clientsWithoutOrders[0].total);
        
        // 6. Verificar clientes con pedidos antiguos
        const [clientsWithOldOrders] = await db.execute(`
            SELECT COUNT(DISTINCT c.id) as total
            FROM clientes c
            INNER JOIN pedidos p ON c.id = p.cliente_id
            WHERE c.activo = true AND p.fecha < ?
        `, [thirtyDaysAgoStr]);
        console.log('📊 Clientes con pedidos antiguos:', clientsWithOldOrders[0].total);
        
        // 7. Ejecutar la consulta actual para ver qué devuelve
        const query = `
            SELECT 
                c.*,
                MAX(p.fecha) as lastOrderDate
            FROM clientes c
            LEFT JOIN pedidos p ON c.id = p.cliente_id
            WHERE c.activo = true
            GROUP BY c.id
            HAVING lastOrderDate < ? OR lastOrderDate IS NULL
            ORDER BY c.nombre
        `;
        
        const [clientes] = await db.execute(query, [thirtyDaysAgoStr]);
        console.log('📊 Resultado de la consulta actual:', clientes.length, 'clientes');
        
        res.json({
            debug: {
                fechaLimite: thirtyDaysAgoStr,
                totalClientesActivos: totalClients[0].total,
                totalPedidos: totalOrders[0].total,
                pedidosRecientes: recentOrders[0].total,
                clientesConPedidosRecientes: clientsWithRecentOrders[0].total,
                clientesSinPedidos: clientsWithoutOrders[0].total,
                clientesConPedidosAntiguos: clientsWithOldOrders[0].total,
                resultadoConsultaActual: clientes.length
            },
            clientes: clientes.slice(0, 5) // Solo mostrar los primeros 5 para no saturar
        });
    } catch (error) {
        console.error('Error en diagnóstico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});





// Obtener cobros pendientes
app.get('/api/cobros/pendientes', authenticateToken, async (req, res) => {
    try {
        // Calcular totales generales - consultas separadas para evitar producto cartesiano
        const [ordersResult] = await db.execute(`
            SELECT COALESCE(SUM(monto), 0) as totalOrders
            FROM pedidos
        `);
        
        const [paymentsResult] = await db.execute(`
            SELECT COALESCE(SUM(monto), 0) as totalPayments
            FROM pagos
        `);
        
        const totalOrders = parseFloat(ordersResult[0].totalOrders || 0);
        const totalPayments = parseFloat(paymentsResult[0].totalPayments || 0);
        const pendingAmount = totalOrders - totalPayments;
        
        console.log(`📊 Cobros pendientes - Pedidos: $${totalOrders}, Pagos: $${totalPayments}, Pendiente: $${pendingAmount}`);
        
        res.json({
            pendingAmount: pendingAmount,
            totalOrders: totalOrders,
            totalPayments: totalPayments
        });
    } catch (error) {
        console.error('Error obteniendo cobros pendientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener detalles de cobros pendientes
app.get('/api/cobros/pendientes/detalle', authenticateToken, async (req, res) => {
    try {
        // Calcular totales generales - consultas separadas para evitar producto cartesiano
        const [ordersResult] = await db.execute(`
            SELECT COALESCE(SUM(monto), 0) as totalOrders
            FROM pedidos
        `);
        
        const [paymentsResult] = await db.execute(`
            SELECT COALESCE(SUM(monto), 0) as totalPayments
            FROM pagos
        `);
        
        const totalOrders = parseFloat(ordersResult[0].totalOrders || 0);
        const totalPayments = parseFloat(paymentsResult[0].totalPayments || 0);
        const pendingAmount = totalOrders - totalPayments;
        
        // Obtener clientes con saldo pendiente
        const query = `
            SELECT 
                c.*,
                COALESCE(pedidos_totals.total_pedidos, 0) as totalOrders,
                COALESCE(pagos_totals.total_pagos, 0) as totalPayments,
                (COALESCE(pedidos_totals.total_pedidos, 0) - COALESCE(pagos_totals.total_pagos, 0)) as saldo_pendiente
            FROM clientes c
            LEFT JOIN (
                SELECT cliente_id, SUM(monto) as total_pedidos 
                FROM pedidos 
                GROUP BY cliente_id
            ) pedidos_totals ON c.id = pedidos_totals.cliente_id
            LEFT JOIN (
                SELECT cliente_id, SUM(monto) as total_pagos 
                FROM pagos 
                GROUP BY cliente_id
            ) pagos_totals ON c.id = pagos_totals.cliente_id
            WHERE c.activo = true 
            AND (COALESCE(pedidos_totals.total_pedidos, 0) - COALESCE(pagos_totals.total_pagos, 0)) > 0
            ORDER BY saldo_pendiente DESC
        `;
        
        const [clients] = await db.execute(query);
        
        res.json({
            summary: {
                totalOrders: totalOrders,
                totalPayments: totalPayments,
                pendingAmount: pendingAmount
            },
            clients: clients
        });
    } catch (error) {
        console.error('Error obteniendo detalles de cobros pendientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener contactos (placeholder)
app.get('/api/contactos', authenticateToken, async (req, res) => {
    try {
        // Por ahora devolver array vacío hasta que se implemente la tabla de contactos
        res.json([]);
    } catch (error) {
        console.error('Error obteniendo contactos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar servidor
async function startServer() {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`📱 Aplicación disponible en: http://localhost:${PORT}`);
    });
}

startServer();
