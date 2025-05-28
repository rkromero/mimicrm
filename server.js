const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: './config.env' });

console.log('🚀 Iniciando servidor MIMI CRM...');
console.log('📁 Directorio actual:', __dirname);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
console.log('🔌 PORT:', process.env.PORT);

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
    port: process.env.DB_PORT || 3306
};

// Crear conexión a la base de datos
let db;

async function connectDB() {
    try {
        db = await mysql.createConnection(dbConfig);
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

        // Tabla de listas de precios
        await db.execute(`
            CREATE TABLE IF NOT EXISTS listas_precios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                descuento DECIMAL(5,2) DEFAULT 0,
                activa BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Tabla de clientes
        await db.execute(`
            CREATE TABLE IF NOT EXISTS clientes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
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
                estado ENUM('pendiente', 'en_proceso', 'completado', 'cancelado') DEFAULT 'pendiente',
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

        // Tabla de contactos
        await db.execute(`
            CREATE TABLE IF NOT EXISTS contactos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cliente_id INT NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                telefono VARCHAR(50),
                cargo VARCHAR(100),
                departamento VARCHAR(100),
                activo BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (cliente_id) REFERENCES clientes(id)
            )
        `);

        console.log('✅ Tablas creadas correctamente');
        
        // Insertar datos iniciales
        await insertInitialData();
        
    } catch (error) {
        console.error('❌ Error creando tablas:', error);
    }
}

// Función para insertar datos iniciales
async function insertInitialData() {
    // Función vacía - no insertar datos de prueba
    console.log('✅ Base de datos lista - sin datos de prueba');
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
                COALESCE(SUM(p.monto), 0) as total_pedidos,
                COALESCE(SUM(pa.monto), 0) as total_pagos,
                (COALESCE(SUM(p.monto), 0) - COALESCE(SUM(pa.monto), 0)) as saldo_real
            FROM clientes c
            LEFT JOIN usuarios u ON c.creado_por = u.id
            LEFT JOIN pedidos p ON c.id = p.cliente_id AND p.estado != 'cancelado'
            LEFT JOIN pagos pa ON c.id = pa.cliente_id
            WHERE c.activo = true
        `;
        
        const params = [];

        // Filtrar por perfil de usuario
        if (req.user.perfil === 'Vendedor') {
            query += ' AND c.creado_por = ?';
            params.push(req.user.id);
        } else if (req.user.perfil === 'Gerente de ventas') {
            query += ' AND c.creado_por IN (SELECT id FROM usuarios WHERE perfil = "Vendedor")';
        }

        query += ' GROUP BY c.id, u.nombre ORDER BY c.nombre';

        console.log('📊 Ejecutando consulta de clientes con cálculo de saldo...');
        const [clientes] = await db.execute(query, params);
        
        // Mapear los resultados para incluir el saldo calculado
        const clientesConSaldo = clientes.map(cliente => ({
            ...cliente,
            saldo: cliente.saldo_real, // Usar el saldo calculado
            total_pedidos: parseFloat(cliente.total_pedidos || 0),
            total_pagos: parseFloat(cliente.total_pagos || 0),
            saldo_calculado: parseFloat(cliente.saldo_real || 0)
        }));
        
        console.log(`✅ ${clientesConSaldo.length} clientes obtenidos con saldos calculados`);
        res.json(clientesConSaldo);
    } catch (error) {
        console.error('Error obteniendo clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear cliente
app.post('/api/clientes', authenticateToken, async (req, res) => {
    try {
        const {
            nombre, cuit, email, telefono, direccion, provincia,
            ciudad, localidad, codigo_postal
        } = req.body;

        const [result] = await db.execute(
            `INSERT INTO clientes (
                nombre, cuit, email, telefono, direccion, provincia,
                ciudad, localidad, codigo_postal, creado_por
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre, cuit, email, telefono, direccion, provincia,
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
app.put('/api/clientes/:id', authenticateToken, async (req, res) => {
    try {
        const clienteId = req.params.id;
        const {
            nombre, cuit, email, telefono, direccion, provincia,
            ciudad, localidad, codigo_postal
        } = req.body;

        // Verificar que el cliente existe y el usuario tiene permisos
        const [existingCliente] = await db.execute(
            'SELECT * FROM clientes WHERE id = ?',
            [clienteId]
        );

        if (existingCliente.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Si es vendedor, verificar que sea el creador del cliente
        if (req.user.perfil === 'Vendedor' && existingCliente[0].creado_por !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permisos para editar este cliente' });
        }

        // Verificar si el documento ya existe en otro cliente
        if (cuit && cuit !== existingCliente[0].cuit) {
            const [duplicateCliente] = await db.execute(
                'SELECT id FROM clientes WHERE cuit = ? AND id != ? AND activo = true',
                [cuit, clienteId]
            );

            if (duplicateCliente.length > 0) {
                return res.status(400).json({ error: 'Ya existe un cliente con este número de documento' });
            }
        }

        // Actualizar el cliente
        await db.execute(
            `UPDATE clientes SET 
                nombre = ?, cuit = ?, email = ?, telefono = ?, direccion = ?, 
                provincia = ?, ciudad = ?, localidad = ?, codigo_postal = ?
            WHERE id = ?`,
            [
                nombre, cuit, email, telefono, direccion, provincia,
                ciudad, localidad, codigo_postal, clienteId
            ]
        );

        res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar cliente
app.delete('/api/clientes/:id', authenticateToken, async (req, res) => {
    try {
        const clienteId = req.params.id;

        // Verificar que el cliente existe y el usuario tiene permisos
        const [existingCliente] = await db.execute(
            'SELECT * FROM clientes WHERE id = ?',
            [clienteId]
        );

        if (existingCliente.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Si es vendedor, verificar que sea el creador del cliente
        if (req.user.perfil === 'Vendedor' && existingCliente[0].creado_por !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permisos para eliminar este cliente' });
        }

        // Verificar que no tenga pedidos o pagos asociados
        const [pedidosAsociados] = await db.execute(
            'SELECT COUNT(*) as count FROM pedidos WHERE cliente_id = ?',
            [clienteId]
        );

        const [pagosAsociados] = await db.execute(
            'SELECT COUNT(*) as count FROM pagos WHERE cliente_id = ?',
            [clienteId]
        );

        if (pedidosAsociados[0].count > 0 || pagosAsociados[0].count > 0) {
            return res.status(400).json({ 
                error: 'No se puede eliminar el cliente porque tiene pedidos o pagos asociados. Considere desactivarlo en su lugar.' 
            });
        }

        // Eliminar el cliente (marcar como inactivo para preservar integridad)
        await db.execute(
            'UPDATE clientes SET activo = false WHERE id = ?',
            [clienteId]
        );

        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando cliente:', error);
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
        const { nombre, descripcion, precio, stock } = req.body;

        const [result] = await db.execute(
            'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, stock || 0]
        );

        res.status(201).json({ id: result.insertId, message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar producto
app.put('/api/productos/:id', authenticateToken, async (req, res) => {
    try {
        const productoId = req.params.id;
        const { nombre, descripcion, precio, stock } = req.body;

        // Verificar que el producto existe
        const [existingProduct] = await db.execute(
            'SELECT * FROM productos WHERE id = ? AND activo = true',
            [productoId]
        );

        if (existingProduct.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar el producto
        await db.execute(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
            [nombre, descripcion, precio, stock || 0, productoId]
        );

        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS DE PEDIDOS

// Obtener todos los pedidos
app.get('/api/pedidos', authenticateToken, async (req, res) => {
    try {
        let query = `
            SELECT p.*, c.nombre as cliente_nombre, u.nombre as creado_por_nombre
            FROM pedidos p
            LEFT JOIN clientes c ON p.cliente_id = c.id
            LEFT JOIN usuarios u ON p.creado_por = u.id
            WHERE 1=1
        `;
        
        const params = [];

        // Filtrar por perfil de usuario
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
        const { cliente_id, descripcion, monto, estado = 'pendiente', items = [] } = req.body;

        // Generar número de pedido único
        const numeroPedido = `PED-${Date.now()}`;

        // Insertar el pedido
        const [result] = await db.execute(
            'INSERT INTO pedidos (numero_pedido, cliente_id, descripcion, monto, estado, fecha, creado_por) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [numeroPedido, cliente_id, descripcion, monto, estado, new Date().toISOString().split('T')[0], req.user.id]
        );

        const pedidoId = result.insertId;

        // Insertar los items del pedido si existen
        if (items && items.length > 0) {
            for (const item of items) {
                const subtotal = item.cantidad * item.precio;
                await db.execute(
                    'INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)',
                    [pedidoId, item.producto_id, item.cantidad, item.precio, subtotal]
                );
            }
        }

        res.status(201).json({ id: pedidoId, message: 'Pedido creado exitosamente' });
    } catch (error) {
        console.error('Error creando pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar pedido
app.put('/api/pedidos/:id', authenticateToken, async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const { cliente_id, descripcion, monto, estado, items = [] } = req.body;

        // Verificar que el pedido existe y el usuario tiene permisos
        const [existingPedido] = await db.execute(
            'SELECT * FROM pedidos WHERE id = ?',
            [pedidoId]
        );

        if (existingPedido.length === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Si es vendedor, verificar que sea el creador del pedido
        if (req.user.perfil === 'Vendedor' && existingPedido[0].creado_por !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permisos para editar este pedido' });
        }

        // Actualizar el pedido
        await db.execute(
            'UPDATE pedidos SET cliente_id = ?, descripcion = ?, monto = ?, estado = ? WHERE id = ?',
            [cliente_id, descripcion, monto, estado, pedidoId]
        );

        // Eliminar items existentes del pedido
        await db.execute('DELETE FROM pedido_items WHERE pedido_id = ?', [pedidoId]);

        // Insertar los nuevos items del pedido
        if (items && items.length > 0) {
            for (const item of items) {
                const subtotal = item.cantidad * item.precio;
                await db.execute(
                    'INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)',
                    [pedidoId, item.producto_id, item.cantidad, item.precio, subtotal]
                );
            }
        }

        res.json({ message: 'Pedido actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar pedido
app.delete('/api/pedidos/:id', authenticateToken, async (req, res) => {
    try {
        const pedidoId = req.params.id;

        // Verificar que el pedido existe y el usuario tiene permisos
        const [existingPedido] = await db.execute(
            'SELECT * FROM pedidos WHERE id = ?',
            [pedidoId]
        );

        if (existingPedido.length === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Si es vendedor, verificar que sea el creador del pedido
        if (req.user.perfil === 'Vendedor' && existingPedido[0].creado_por !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permisos para eliminar este pedido' });
        }

        // Eliminar items del pedido (se eliminan automáticamente por CASCADE)
        // Eliminar el pedido
        await db.execute('DELETE FROM pedidos WHERE id = ?', [pedidoId]);

        res.json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener items de un pedido específico
app.get('/api/pedidos/:id/items', authenticateToken, async (req, res) => {
    try {
        const pedidoId = req.params.id;
        
        const [items] = await db.execute(`
            SELECT pi.*, p.nombre as producto_nombre, p.descripcion as producto_descripcion
            FROM pedido_items pi
            LEFT JOIN productos p ON pi.producto_id = p.id
            WHERE pi.pedido_id = ?
            ORDER BY pi.id
        `, [pedidoId]);
        
        res.json(items);
    } catch (error) {
        console.error('Error obteniendo items del pedido:', error);
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

        // Filtrar por perfil de usuario
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

        // Validar campos requeridos
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
app.put('/api/pagos/:id', authenticateToken, async (req, res) => {
    try {
        const pagoId = req.params.id;
        const { cliente_id, monto, metodo, referencia } = req.body;

        // Verificar que el pago existe y el usuario tiene permisos
        const [existingPago] = await db.execute(
            'SELECT * FROM pagos WHERE id = ?',
            [pagoId]
        );

        if (existingPago.length === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        // Si es vendedor, verificar que sea el creador del pago
        if (req.user.perfil === 'Vendedor' && existingPago[0].creado_por !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permisos para editar este pago' });
        }

        // Validar campos requeridos
        if (!cliente_id || !monto || !metodo) {
            return res.status(400).json({ error: 'Cliente, monto y método son campos requeridos' });
        }

        // Actualizar el pago
        await db.execute(
            'UPDATE pagos SET cliente_id = ?, monto = ?, metodo = ?, referencia = ? WHERE id = ?',
            [cliente_id, monto, metodo, referencia, pagoId]
        );

        res.json({ message: 'Pago actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando pago:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar pago
app.delete('/api/pagos/:id', authenticateToken, async (req, res) => {
    try {
        const pagoId = req.params.id;

        // Verificar que el pago existe y el usuario tiene permisos
        const [existingPago] = await db.execute(
            'SELECT * FROM pagos WHERE id = ?',
            [pagoId]
        );

        if (existingPago.length === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        // Si es vendedor, verificar que sea el creador del pago
        if (req.user.perfil === 'Vendedor' && existingPago[0].creado_por !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permisos para eliminar este pago' });
        }

        // Eliminar el pago
        await db.execute('DELETE FROM pagos WHERE id = ?', [pagoId]);

        res.json({ message: 'Pago eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando pago:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS DE CONTACTOS

// Obtener todos los contactos
app.get('/api/contactos', authenticateToken, async (req, res) => {
    try {
        let query = `
            SELECT co.*, c.nombre as cliente_nombre
            FROM contactos co
            LEFT JOIN clientes c ON co.cliente_id = c.id
            WHERE co.activo = true
        `;
        
        const params = [];

        // Filtrar por perfil de usuario si es necesario
        // (Los contactos no tienen campo creado_por en la tabla actual)

        query += ' ORDER BY co.nombre';

        const [contactos] = await db.execute(query, params);
        res.json(contactos);
    } catch (error) {
        console.error('Error obteniendo contactos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear contacto
app.post('/api/contactos', authenticateToken, async (req, res) => {
    try {
        const { cliente_id, nombre, email, telefono, cargo, departamento } = req.body;

        const [result] = await db.execute(
            'INSERT INTO contactos (cliente_id, nombre, email, telefono, cargo, departamento) VALUES (?, ?, ?, ?, ?, ?)',
            [cliente_id, nombre, email, telefono, cargo, departamento]
        );

        res.status(201).json({ id: result.insertId, message: 'Contacto creado exitosamente' });
    } catch (error) {
        console.error('Error creando contacto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar contacto
app.put('/api/contactos/:id', authenticateToken, async (req, res) => {
    try {
        const contactoId = req.params.id;
        const { cliente_id, nombre, email, telefono, cargo, departamento } = req.body;

        // Verificar que el contacto existe
        const [existingContacto] = await db.execute(
            'SELECT * FROM contactos WHERE id = ? AND activo = true',
            [contactoId]
        );

        if (existingContacto.length === 0) {
            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        // Actualizar el contacto
        await db.execute(
            'UPDATE contactos SET cliente_id = ?, nombre = ?, email = ?, telefono = ?, cargo = ?, departamento = ? WHERE id = ?',
            [cliente_id, nombre, email, telefono, cargo, departamento, contactoId]
        );

        res.json({ message: 'Contacto actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando contacto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar contacto
app.delete('/api/contactos/:id', authenticateToken, async (req, res) => {
    try {
        const contactoId = req.params.id;

        // Verificar que el contacto existe
        const [existingContacto] = await db.execute(
            'SELECT * FROM contactos WHERE id = ?',
            [contactoId]
        );

        if (existingContacto.length === 0) {
            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        // Eliminar el contacto
        await db.execute('DELETE FROM contactos WHERE id = ?', [contactoId]);

        res.json({ message: 'Contacto eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando contacto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS DE ADMINISTRACIÓN DE USUARIOS

// Obtener todos los usuarios (solo para administradores)
app.get('/api/usuarios', authenticateToken, async (req, res) => {
    try {
        // Verificar que el usuario sea administrador
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden ver usuarios.' });
        }

        const [usuarios] = await db.execute(
            'SELECT id, nombre, email, perfil, activo, created_at FROM usuarios ORDER BY nombre'
        );
        
        res.json(usuarios);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear nuevo usuario (solo para administradores)
app.post('/api/usuarios', authenticateToken, async (req, res) => {
    try {
        // Verificar que el usuario sea administrador
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden crear usuarios.' });
        }

        const { nombre, email, perfil, password } = req.body;

        // Validar campos requeridos
        if (!nombre || !email || !perfil || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Verificar que el email no exista
        const [existingUsers] = await db.execute(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Ya existe un usuario con este email' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const [result] = await db.execute(
            'INSERT INTO usuarios (nombre, email, perfil, password) VALUES (?, ?, ?, ?)',
            [nombre, email, perfil, hashedPassword]
        );

        res.status(201).json({ 
            id: result.insertId, 
            message: 'Usuario creado exitosamente',
            usuario: { id: result.insertId, nombre, email, perfil }
        });
    } catch (error) {
        console.error('Error creando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar usuario (solo para administradores)
app.put('/api/usuarios/:id', authenticateToken, async (req, res) => {
    try {
        // Verificar que el usuario sea administrador
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden editar usuarios.' });
        }

        const userId = req.params.id;
        const { nombre, email, perfil, password, activo } = req.body;

        // Verificar que el usuario existe
        const [existingUsers] = await db.execute(
            'SELECT id FROM usuarios WHERE id = ?',
            [userId]
        );

        if (existingUsers.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Construir query de actualización dinámicamente
        let updateFields = [];
        let updateValues = [];

        if (nombre) {
            updateFields.push('nombre = ?');
            updateValues.push(nombre);
        }
        if (email) {
            updateFields.push('email = ?');
            updateValues.push(email);
        }
        if (perfil) {
            updateFields.push('perfil = ?');
            updateValues.push(perfil);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.push('password = ?');
            updateValues.push(hashedPassword);
        }
        if (activo !== undefined) {
            updateFields.push('activo = ?');
            updateValues.push(activo);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ error: 'No hay campos para actualizar' });
        }

        updateValues.push(userId);

        await db.execute(
            `UPDATE usuarios SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar usuario (solo para administradores)
app.delete('/api/usuarios/:id', authenticateToken, async (req, res) => {
    try {
        // Verificar que el usuario sea administrador
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden eliminar usuarios.' });
        }

        const userId = req.params.id;

        // Verificar que no se esté eliminando a sí mismo
        if (parseInt(userId) === req.user.id) {
            return res.status(400).json({ error: 'No puedes eliminar tu propio usuario' });
        }

        // Verificar que el usuario existe
        const [existingUsers] = await db.execute(
            'SELECT id FROM usuarios WHERE id = ?',
            [userId]
        );

        if (existingUsers.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // En lugar de eliminar, marcar como inactivo para preservar integridad referencial
        await db.execute(
            'UPDATE usuarios SET activo = false WHERE id = ?',
            [userId]
        );

        res.json({ message: 'Usuario desactivado exitosamente' });
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener permisos por perfil
app.get('/api/permisos', authenticateToken, async (req, res) => {
    try {
        console.log('📋 Solicitud de permisos recibida por usuario:', req.user.perfil);
        
        // Solo administradores pueden ver permisos
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden ver permisos.' });
        }

        // Intentar obtener permisos de la base de datos
        try {
            const [rows] = await db.execute('SELECT * FROM permisos_perfil ORDER BY perfil, modulo');
            
            if (rows.length > 0) {
                // Convertir filas a estructura anidada
                const permisos = {};
                rows.forEach(row => {
                    if (!permisos[row.perfil]) {
                        permisos[row.perfil] = {};
                    }
                    permisos[row.perfil][row.modulo] = {
                        crear: Boolean(row.crear),
                        leer: Boolean(row.leer),
                        editar: Boolean(row.editar),
                        eliminar: Boolean(row.eliminar)
                    };
                });
                
                console.log('✅ Permisos cargados desde base de datos');
                return res.json({ permisos });
            }
        } catch (dbError) {
            console.log('⚠️ Tabla permisos_perfil no existe, usando permisos por defecto');
        }

        // Si no hay datos en BD o no existe la tabla, usar permisos por defecto
        const permisosDefecto = {
            'Administrador': {
                clientes: { crear: true, leer: true, editar: true, eliminar: true },
                pedidos: { crear: true, leer: true, editar: true, eliminar: true },
                pagos: { crear: true, leer: true, editar: true, eliminar: true },
                productos: { crear: true, leer: true, editar: true, eliminar: true },
                contactos: { crear: true, leer: true, editar: true, eliminar: true },
                usuarios: { crear: true, leer: true, editar: true, eliminar: true }
            },
            'Vendedor': {
                clientes: { crear: true, leer: true, editar: true, eliminar: false },
                pedidos: { crear: true, leer: true, editar: true, eliminar: true },
                pagos: { crear: true, leer: true, editar: true, eliminar: true },
                productos: { crear: false, leer: true, editar: false, eliminar: false },
                contactos: { crear: true, leer: true, editar: true, eliminar: true },
                usuarios: { crear: false, leer: false, editar: false, eliminar: false }
            },
            'Produccion': {
                clientes: { crear: false, leer: true, editar: false, eliminar: false },
                pedidos: { crear: false, leer: true, editar: true, eliminar: false },
                pagos: { crear: false, leer: true, editar: false, eliminar: false },
                productos: { crear: true, leer: true, editar: true, eliminar: false },
                contactos: { crear: false, leer: true, editar: false, eliminar: false },
                usuarios: { crear: false, leer: false, editar: false, eliminar: false }
            }
        };

        console.log('✅ Enviando permisos por defecto');
        res.json({ permisos: permisosDefecto });

    } catch (error) {
        console.error('❌ Error obteniendo permisos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Guardar permisos por perfil
app.put('/api/permisos', authenticateToken, async (req, res) => {
    try {
        console.log('💾 Solicitud de guardado de permisos recibida por usuario:', req.user.perfil);
        
        // Solo administradores pueden modificar permisos
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden modificar permisos.' });
        }

        const { permisos } = req.body;
        
        if (!permisos) {
            return res.status(400).json({ error: 'Datos de permisos requeridos' });
        }

        console.log('📊 Permisos a guardar:', JSON.stringify(permisos, null, 2));

        try {
            // Intentar crear la tabla si no existe
            await db.execute(`
                CREATE TABLE IF NOT EXISTS permisos_perfil (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    perfil VARCHAR(50) NOT NULL,
                    modulo VARCHAR(50) NOT NULL,
                    crear BOOLEAN DEFAULT FALSE,
                    leer BOOLEAN DEFAULT FALSE,
                    editar BOOLEAN DEFAULT FALSE,
                    eliminar BOOLEAN DEFAULT FALSE,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    UNIQUE KEY unique_perfil_modulo (perfil, modulo)
                )
            `);
            
            console.log('✅ Tabla permisos_perfil verificada/creada');

            // Limpiar permisos existentes
            await db.execute('DELETE FROM permisos_perfil');
            console.log('🗑️ Permisos anteriores eliminados');

            // Insertar nuevos permisos
            const insertPromises = [];
            Object.keys(permisos).forEach(perfil => {
                Object.keys(permisos[perfil]).forEach(modulo => {
                    const permisoModulo = permisos[perfil][modulo];
                    insertPromises.push(
                        db.execute(
                            'INSERT INTO permisos_perfil (perfil, modulo, crear, leer, editar, eliminar) VALUES (?, ?, ?, ?, ?, ?)',
                            [perfil, modulo, permisoModulo.crear, permisoModulo.leer, permisoModulo.editar, permisoModulo.eliminar]
                        )
                    );
                });
            });

            await Promise.all(insertPromises);
            console.log(`✅ ${insertPromises.length} permisos guardados en base de datos`);

            res.json({ 
                message: 'Permisos guardados exitosamente',
                count: insertPromises.length
            });

        } catch (dbError) {
            console.error('❌ Error de base de datos guardando permisos:', dbError);
            res.status(500).json({ error: 'Error de base de datos al guardar permisos' });
        }

    } catch (error) {
        console.error('❌ Error guardando permisos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar producto
app.delete('/api/productos/:id', authenticateToken, async (req, res) => {
    try {
        const productoId = req.params.id;

        // Verificar que el producto existe
        const [existingProducto] = await db.execute(
            'SELECT * FROM productos WHERE id = ?',
            [productoId]
        );

        if (existingProducto.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar que no esté siendo usado en pedidos
        const [pedidosConProducto] = await db.execute(
            'SELECT COUNT(*) as count FROM pedido_items WHERE producto_id = ?',
            [productoId]
        );

        if (pedidosConProducto[0].count > 0) {
            return res.status(400).json({ error: 'No se puede eliminar el producto porque está siendo usado en pedidos' });
        }

        // Eliminar el producto
        await db.execute('DELETE FROM productos WHERE id = ?', [productoId]);

        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error eliminando producto:', error);
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

// Ruta para servir el dashboard (requiere autenticación)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ENDPOINT DE PRUEBA SIMPLE
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ENDPOINT ESPECIAL PARA ACTUALIZAR ESTRUCTURA DE TABLA PEDIDOS
app.post('/api/admin/update-pedidos-table', async (req, res) => {
    try {
        console.log('🔧 Actualizando estructura de tabla pedidos...');

        // Actualizar el ENUM del campo estado
        await db.execute(`
            ALTER TABLE pedidos 
            MODIFY COLUMN estado ENUM('pendiente', 'en_proceso', 'completado', 'cancelado') DEFAULT 'pendiente'
        `);

        // Actualizar registros existentes con estados antiguos
        await db.execute(`
            UPDATE pedidos 
            SET estado = CASE 
                WHEN estado = 'active' THEN 'pendiente'
                WHEN estado = 'completed' THEN 'completado'
                WHEN estado = 'cancelled' THEN 'cancelado'
                ELSE estado
            END
        `);

        console.log('✅ Tabla pedidos actualizada correctamente');

        res.json({
            success: true,
            message: 'Tabla pedidos actualizada exitosamente'
        });

    } catch (error) {
        console.error('❌ Error actualizando tabla pedidos:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
});

// ENDPOINT ESPECIAL PARA LIMPIAR BASE DE DATOS (SOLO DESARROLLO)
app.post('/api/admin/clear-database', async (req, res) => {
    try {
        // Verificar que sea un entorno de desarrollo o que se proporcione la clave especial
        const { adminKey } = req.body;
        
        if (process.env.NODE_ENV === 'production' && adminKey !== 'CLEAR_MIMI_DB_2024') {
            return res.status(403).json({ error: 'Operación no permitida en producción sin clave de administrador' });
        }

        console.log('🧹 Iniciando limpieza completa de la base de datos...');

        // Deshabilitar verificación de claves foráneas temporalmente
        await db.execute('SET FOREIGN_KEY_CHECKS = 0');

        // Lista de todas las tablas a limpiar
        const tables = [
            'contactos',
            'pagos', 
            'pedidos_productos',
            'pedidos',
            'productos',
            'listas_precios',
            'clientes',
            'usuarios'
        ];

        const results = {};

        // Limpiar cada tabla
        for (const table of tables) {
            try {
                const [result] = await db.execute(`DELETE FROM ${table}`);
                await db.execute(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
                results[table] = result.affectedRows;
                console.log(`✅ Tabla ${table} limpiada (${result.affectedRows} registros eliminados)`);
            } catch (error) {
                console.log(`⚠️  Error limpiando tabla ${table}:`, error.message);
                results[table] = `Error: ${error.message}`;
            }
        }

        // Rehabilitar verificación de claves foráneas
        await db.execute('SET FOREIGN_KEY_CHECKS = 1');

        console.log('🎉 Base de datos completamente limpiada');

        res.json({
            success: true,
            message: 'Base de datos limpiada exitosamente',
            results: results,
            warning: 'IMPORTANTE: No hay usuarios en el sistema. Necesitarás crear un usuario administrador.'
        });

    } catch (error) {
        console.error('❌ Error limpiando la base de datos:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
});

// Servir archivos estáticos (debe ir al final)
app.use(express.static(__dirname));

// Iniciar servidor
async function startServer() {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`📱 Aplicación disponible en: http://localhost:${PORT}`);
    });
}

startServer(); 