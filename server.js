gconst express = require('express');
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

// Función para generar número de pedido consecutivo
async function generateConsecutiveOrderNumber() {
    try {
        // Consulta simple y eficiente usando MAX(id)
        const [result] = await db.execute('SELECT MAX(id) as max_id FROM pedidos');
        
        let nextNumber = 1;
        
        if (result.length > 0 && result[0].max_id !== null) {
            nextNumber = result[0].max_id + 1;
        }
        
        // Formatear con ceros a la izquierda (ej: PED-0001, PED-0002, etc.)
        return `PED-${nextNumber.toString().padStart(4, '0')}`;
    } catch (error) {
        console.error('Error generando número de pedido:', error);
        // Fallback al método anterior si hay error
        return `PED-${Date.now()}`;
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

        // Tabla de secuencias para números de pedido (OPTIMIZACIÓN)
        await db.execute(`
            CREATE TABLE IF NOT EXISTS secuencias (
                nombre VARCHAR(50) PRIMARY KEY,
                valor INT NOT NULL DEFAULT 1,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Insertar secuencia inicial si no existe
        await db.execute(`
            INSERT IGNORE INTO secuencias (nombre, valor) VALUES ('pedido_numero', 1)
        `);

        // Solo índices esenciales - sin overhead innecesario

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
        
        // Ejecutar migraciones
        await runMigrations();
        
    } catch (error) {
        console.error('❌ Error creando tablas:', error);
    }
}

// Función para insertar datos iniciales
async function insertInitialData() {
    // Función vacía - no insertar datos de prueba
    console.log('✅ Base de datos lista - sin datos de prueba');
}

// Función para ejecutar migraciones
async function runMigrations() {
    try {
        // Verificar si existe la columna apellido en clientes
        const [columns] = await db.execute(`
            SHOW COLUMNS FROM clientes LIKE 'apellido'
        `);
        
        if (columns.length === 0) {
            console.log('🔄 Agregando columna apellido a tabla clientes...');
            await db.execute(`
                ALTER TABLE clientes ADD COLUMN apellido VARCHAR(255) AFTER nombre
            `);
            console.log('✅ Columna apellido agregada exitosamente');
        } else {
            console.log('✅ Columna apellido ya existe');
        }

        // Verificar si existe el índice en numero_pedido
        const [indexes] = await db.execute(`
            SHOW INDEX FROM pedidos WHERE Key_name = 'idx_numero_pedido'
        `);
        
        if (indexes.length === 0) {
            console.log('🔄 Agregando índice optimizado para numero_pedido...');
            await db.execute(`
                CREATE INDEX idx_numero_pedido ON pedidos(numero_pedido)
            `);
            console.log('✅ Índice numero_pedido agregado exitosamente');
        } else {
            console.log('✅ Índice numero_pedido ya existe');
        }
    } catch (error) {
        console.error('❌ Error ejecutando migraciones:', error);
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
        console.log('🔐 Intento de login recibido');
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('❌ Email o password faltante');
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        console.log('📧 Buscando usuario con email:', email);
        const [users] = await db.execute(
            'SELECT * FROM usuarios WHERE email = ? AND activo = true',
            [email]
        );

        if (users.length === 0) {
            console.log('❌ Usuario no encontrado o inactivo:', email);
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = users[0];
        console.log('✅ Usuario encontrado:', user.nombre);
        
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            console.log('❌ Contraseña incorrecta para:', email);
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        console.log('✅ Contraseña válida, generando token...');
        const token = jwt.sign(
            { id: user.id, email: user.email, perfil: user.perfil },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('✅ Login exitoso para:', user.nombre);
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
        console.error('❌ Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Registro (primer usuario será administrador)
app.post('/api/auth/register', async (req, res) => {
    try {
        console.log('📝 Intento de registro recibido');
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            console.log('❌ Datos faltantes en registro');
            return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
        }

        // Verificar si ya existe un usuario con este email
        const [existingUsers] = await db.execute(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            console.log('❌ Email ya registrado:', email);
            return res.status(400).json({ error: 'Ya existe un usuario con este email' });
        }

        // Verificar si es el primer usuario (será administrador)
        const [totalUsers] = await db.execute('SELECT COUNT(*) as count FROM usuarios');
        const isFirstUser = totalUsers[0].count === 0;
        const perfil = isFirstUser ? 'Administrador' : 'Vendedor';

        console.log(`👤 Creando usuario ${isFirstUser ? '(PRIMER USUARIO - ADMINISTRADOR)' : '(VENDEDOR)'}`);

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const [result] = await db.execute(
            'INSERT INTO usuarios (nombre, email, password, perfil) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, perfil]
        );

        console.log(`✅ Usuario creado exitosamente: ${nombre} (${perfil})`);

        // Generar token para login automático
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
        console.error('❌ Error en registro:', error);
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

        // Filtrar por perfil de usuario
        if (req.user.perfil === 'Vendedor') {
            query += ' AND c.creado_por = ?';
            params.push(req.user.id);
        } else if (req.user.perfil === 'Gerente de ventas') {
            query += ' AND c.creado_por IN (SELECT id FROM usuarios WHERE perfil = "Vendedor")';
        }

        query += ' ORDER BY c.nombre';

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
app.put('/api/clientes/:id', authenticateToken, async (req, res) => {
    try {
        const clienteId = req.params.id;
        const {
            nombre, apellido, cuit, email, telefono, direccion, provincia,
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
                nombre = ?, apellido = ?, cuit = ?, email = ?, telefono = ?, direccion = ?, 
                provincia = ?, ciudad = ?, localidad = ?, codigo_postal = ?
            WHERE id = ?`,
            [
                nombre, apellido, cuit, email, telefono, direccion, provincia,
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
        const { nombre, descripcion, precio } = req.body;

        console.log('🔍 Creando nuevo producto:', { nombre, descripcion, precio });

        // Validaciones básicas
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

        console.log('✅ Producto creado con ID:', result.insertId);
        res.status(201).json({ id: result.insertId, message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('❌ Error creando producto:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

// ENDPOINT TEMPORAL DE DEBUG para productos
app.put('/api/productos/:id/debug', authenticateToken, async (req, res) => {
    try {
        const productoId = req.params.id;
        const requestData = {
            productoId,
            headers: req.headers,
            body: req.body,
            rawBody: JSON.stringify(req.body),
            bodyKeys: Object.keys(req.body),
            bodyTypes: {}
        };

        // Analizar tipos de datos
        Object.keys(req.body).forEach(key => {
            const value = req.body[key];
            requestData.bodyTypes[key] = {
                value: value,
                type: typeof value,
                isNull: value === null,
                isUndefined: value === undefined,
                isEmpty: value === '',
                length: typeof value === 'string' ? value.length : null
            };
        });

        // Simular las validaciones que usa el endpoint real (SIN stock)
        const validations = {
            nombreValid: req.body.nombre && req.body.nombre.trim() !== '',
            precioValid: req.body.precio && !isNaN(req.body.precio) && req.body.precio > 0
        };

        res.json({
            message: 'Debug de datos recibidos para actualizar producto',
            data: requestData,
            validations: validations,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error en debug endpoint:', error);
        res.status(500).json({ error: 'Error en debug endpoint', details: error.message });
    }
});

// Actualizar producto
app.put('/api/productos/:id', authenticateToken, async (req, res) => {
    try {
        const productoId = req.params.id;
        const { nombre, descripcion, precio } = req.body;

        // Log para debugging con más detalles
        console.log('🔍 === INICIO ACTUALIZACIÓN PRODUCTO ===');
        console.log('🔍 ID del producto:', productoId);
        console.log('🔍 Datos recibidos:', {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            nombreType: typeof nombre,
            precioType: typeof precio
        });
        console.log('🔍 Body completo:', JSON.stringify(req.body, null, 2));

        // Validaciones básicas con logging detallado
        if (!nombre || nombre.trim() === '') {
            console.log('❌ Error de validación: nombre vacío');
            return res.status(400).json({ error: 'El nombre del producto es requerido' });
        }

        if (!precio || isNaN(precio) || precio <= 0) {
            console.log('❌ Error de validación: precio inválido', { precio, isNaN: isNaN(precio), lessThanZero: precio <= 0 });
            return res.status(400).json({ error: 'El precio debe ser un número válido mayor a 0' });
        }

        console.log('✅ Validaciones básicas pasadas');

        // Verificar que el producto existe
        console.log('🔍 Verificando si el producto existe...');
        const [existingProduct] = await db.execute(
            'SELECT * FROM productos WHERE id = ?',
            [productoId]
        );

        if (existingProduct.length === 0) {
            console.log('❌ Producto no encontrado con ID:', productoId);
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        console.log('✅ Producto existente encontrado:', {
            id: existingProduct[0].id,
            nombre: existingProduct[0].nombre,
            precio: existingProduct[0].precio
        });

        // Preparar valores para la actualización
        const nombreLimpio = nombre.trim();
        const descripcionFinal = descripcion || null;
        const precioFinal = parseFloat(precio);

        console.log('🔍 Valores finales para actualización:', {
            nombreLimpio,
            descripcionFinal,
            precioFinal
        });

        // Actualizar el producto (SIN stock)
        console.log('🔍 Ejecutando consulta UPDATE...');
        const updateResult = await db.execute(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?',
            [nombreLimpio, descripcionFinal, precioFinal, productoId]
        );

        console.log('✅ Resultado de actualización:', {
            affectedRows: updateResult[0].affectedRows,
            changedRows: updateResult[0].changedRows,
            info: updateResult[0].info
        });

        console.log('🔍 === FIN ACTUALIZACIÓN PRODUCTO ===');
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.log('🚨 === ERROR EN ACTUALIZACIÓN PRODUCTO ===');
        console.error('❌ Error actualizando producto:', error);
        console.error('❌ Error name:', error.name);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error errno:', error.errno);
        console.error('❌ Error sqlState:', error.sqlState);
        console.error('❌ Error sqlMessage:', error.sqlMessage);
        console.error('❌ Stack trace:', error.stack);
        console.log('🚨 === FIN ERROR ===');
        
        res.status(500).json({ 
            error: 'Error interno del servidor', 
            details: error.message,
            code: error.code,
            errno: error.errno
        });
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
        const { cliente_id, descripcion, monto, estado = 'pendiente de pago', items = [] } = req.body;

        // Generar número de pedido consecutivo
        const numeroPedido = await generateConsecutiveOrderNumber();

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

        res.status(201).json({ id: pedidoId, numero_pedido: numeroPedido, message: 'Pedido creado exitosamente' });
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

        // Insertar los nuevos items del pedido (OPTIMIZACIÓN: Inserción en lote)
        if (items && items.length > 0) {
            // Preparar todos los valores para inserción en lote
            const values = items.map(item => {
                const subtotal = item.cantidad * item.precio;
                return [pedidoId, item.producto_id, item.cantidad, item.precio, subtotal];
            });
            
            // Crear la consulta de inserción múltiple
            const placeholders = items.map(() => '(?, ?, ?, ?, ?)').join(', ');
            const flatValues = values.flat();
            
            await db.execute(
                `INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio, subtotal) VALUES ${placeholders}`,
                flatValues
            );
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

        // OPTIMIZACIÓN: Eliminar items del pedido manualmente en una sola consulta
        // Esto es mucho más rápido que depender del CASCADE
        await db.execute('DELETE FROM pedido_items WHERE pedido_id = ?', [pedidoId]);
        
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
        console.log('🔍 API - Obteniendo items para pedido:', pedidoId);
        
        const [items] = await db.execute(`
            SELECT pi.*, p.nombre as producto_nombre, p.descripcion as producto_descripcion
            FROM pedido_items pi
            LEFT JOIN productos p ON pi.producto_id = p.id
            WHERE pi.pedido_id = ?
            ORDER BY pi.id
        `, [pedidoId]);
        
        console.log('✅ API - Items encontrados:', {
            pedidoId,
            itemsCount: items.length,
            items: items
        });
        
        res.json(items);
    } catch (error) {
        console.error('❌ API - Error obteniendo items del pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Cambiar solo el estado de un pedido (sin afectar items)
app.patch('/api/pedidos/:id/estado', authenticateToken, async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const { estado } = req.body;

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

        // Validar que el estado sea válido
        const estadosValidos = ['pendiente de pago', 'fabricar', 'sale fabrica', 'completado'];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido' });
        }

        // Actualizar solo el estado del pedido
        await db.execute(
            'UPDATE pedidos SET estado = ? WHERE id = ?',
            [estado, pedidoId]
        );

        res.json({ message: 'Estado del pedido actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando estado del pedido:', error);
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

// Obtener un usuario específico por ID (solo para administradores)
app.get('/api/usuarios/:id', authenticateToken, async (req, res) => {
    try {
        // Verificar que el usuario sea administrador
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden ver usuarios.' });
        }

        const userId = req.params.id;

        // Verificar que el ID sea válido
        if (!userId || isNaN(parseInt(userId))) {
            return res.status(400).json({ error: 'ID de usuario inválido' });
        }

        const [usuarios] = await db.execute(
            'SELECT id, nombre, email, perfil, activo, created_at FROM usuarios WHERE id = ?',
            [userId]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuarios[0]);
    } catch (error) {
        console.error('Error obteniendo usuario por ID:', error);
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
            updateFields.push('acto = ?');
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


// === NUEVOS ENDPOINTS PARA DASHBOARD ===

// Endpoint para obtener clientes inactivos (sin pedidos en los últimos 30 días)
app.get('/api/clientes/inactivos', authenticateToken, async (req, res) => {
    try {
        console.log('📊 Obteniendo clientes inactivos para usuario:', req.user.perfil);
        
        let query = `
            SELECT 
                c.id,
                c.nombre,
                c.email,
                c.telefono,
                c.direccion,
                MAX(p.fecha) as lastOrderDate
            FROM clientes c
            LEFT JOIN pedidos p ON c.id = p.cliente_id
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
        
        query += `
            GROUP BY c.id, c.nombre, c.email, c.telefono, c.direccion
            HAVING lastOrderDate IS NULL 
                OR lastOrderDate < DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            ORDER BY lastOrderDate ASC
        `;
        
        const [inactiveClients] = await db.execute(query, params);
        
        // Obtener la fecha de la última actividad filtrada por usuario
        let activityQuery = `
            SELECT MAX(p.fecha) as lastActivity 
            FROM pedidos p
            WHERE p.fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        `;
        
        const activityParams = [];
        
        if (req.user.perfil === 'Vendedor') {
            activityQuery += ' AND p.creado_por = ?';
            activityParams.push(req.user.id);
        } else if (req.user.perfil === 'Gerente de ventas') {
            activityQuery += ' AND p.creado_por IN (SELECT id FROM usuarios WHERE perfil = "Vendedor")';
        }
        
        const [lastActivity] = await db.execute(activityQuery, activityParams);
        
        console.log(`✅ ${inactiveClients.length} clientes inactivos encontrados para ${req.user.perfil}`);
        
        res.json({
            inactiveClients: inactiveClients,
            lastActivity: lastActivity[0]?.lastActivity || null,
            count: inactiveClients.length
        });
        
    } catch (error) {
        console.error('❌ Error obteniendo clientes inactivos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener ventas completadas con filtro de fechas
app.get('/api/ventas/completadas', authenticateToken, async (req, res) => {
    try {
        console.log('📊 Obteniendo ventas completadas para usuario:', req.user.perfil);
        
        const { dateFrom, dateTo } = req.query;
        
        let whereClause = "WHERE p.estado = 'completado'";
        let params = [];
        
        // Filtrar por perfil de usuario
        if (req.user.perfil === 'Vendedor') {
            whereClause += " AND p.creado_por = ?";
            params.push(req.user.id);
        } else if (req.user.perfil === 'Gerente de ventas') {
            whereClause += " AND p.creado_por IN (SELECT id FROM usuarios WHERE perfil = 'Vendedor')";
        }
        
        if (dateFrom && dateTo) {
            whereClause += " AND p.fecha BETWEEN ? AND ?";
            params.push(dateFrom, dateTo);
        } else if (dateFrom) {
            whereClause += " AND p.fecha >= ?";
            params.push(dateFrom);
        } else if (dateTo) {
            whereClause += " AND p.fecha <= ?";
            params.push(dateTo);
        }
        
        const [completedSales] = await db.execute(`
            SELECT 
                COUNT(*) as completedOrders,
                COALESCE(SUM(p.monto), 0) as totalAmount
            FROM pedidos p
            ${whereClause}
        `, params);
        
        console.log(`✅ Ventas completadas obtenidas para ${req.user.perfil}:`, completedSales[0]);
        
        res.json({
            completedOrders: completedSales[0].completedOrders,
            totalAmount: parseFloat(completedSales[0].totalAmount) || 0
        });
        
    } catch (error) {
        console.error('❌ Error obteniendo ventas completadas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener resumen de cobros pendientes
app.get('/api/cobros/pendientes', authenticateToken, async (req, res) => {
    try {
        console.log('📊 Obteniendo cobros pendientes para usuario:', req.user.perfil);
        
        let orderQuery = `SELECT COALESCE(SUM(monto), 0) as totalOrders FROM pedidos`;
        let paymentQuery = `SELECT COALESCE(SUM(monto), 0) as totalPayments FROM pagos`;
        
        const orderParams = [];
        const paymentParams = [];
        
        // Filtrar por perfil de usuario
        if (req.user.perfil === 'Vendedor') {
            orderQuery += ` WHERE creado_por = ?`;
            paymentQuery += ` WHERE creado_por = ?`;
            orderParams.push(req.user.id);
            paymentParams.push(req.user.id);
        } else if (req.user.perfil === 'Gerente de ventas') {
            orderQuery += ` WHERE creado_por IN (SELECT id FROM usuarios WHERE perfil = 'Vendedor')`;
            paymentQuery += ` WHERE creado_por IN (SELECT id FROM usuarios WHERE perfil = 'Vendedor')`;
        }
        
        // Obtener totales de pedidos filtrados
        const [orderTotals] = await db.execute(orderQuery, orderParams);
        
        // Obtener totales de pagos filtrados
        const [paymentTotals] = await db.execute(paymentQuery, paymentParams);
        
        const totalOrders = parseFloat(orderTotals[0].totalOrders) || 0;
        const totalPayments = parseFloat(paymentTotals[0].totalPayments) || 0;
        const pendingAmount = totalOrders - totalPayments;
        
        console.log(`✅ Cobros pendientes calculados para ${req.user.perfil}: $${pendingAmount}`);
        
        res.json({
            totalOrders: totalOrders,
            totalPayments: totalPayments,
            pendingAmount: pendingAmount
        });
        
    } catch (error) {
        console.error('❌ Error obteniendo cobros pendientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener detalles de cobros pendientes por cliente
app.get('/api/cobros/pendientes/detalle', authenticateToken, async (req, res) => {
    try {
        console.log('📊 Obteniendo detalles de cobros pendientes por cliente para usuario:', req.user.perfil);
        
        let orderQuery = `SELECT COALESCE(SUM(monto), 0) as totalOrders FROM pedidos`;
        let paymentQuery = `SELECT COALESCE(SUM(monto), 0) as totalPayments FROM pagos`;
        
        const orderParams = [];
        const paymentParams = [];
        
        // Filtrar por perfil de usuario
        if (req.user.perfil === 'Vendedor') {
            orderQuery += ` WHERE creado_por = ?`;
            paymentQuery += ` WHERE creado_por = ?`;
            orderParams.push(req.user.id);
            paymentParams.push(req.user.id);
        } else if (req.user.perfil === 'Gerente de ventas') {
            orderQuery += ` WHERE creado_por IN (SELECT id FROM usuarios WHERE perfil = 'Vendedor')`;
            paymentQuery += ` WHERE creado_por IN (SELECT id FROM usuarios WHERE perfil = 'Vendedor')`;
        }
        
        // Obtener resumen general filtrado
        const [orderTotals] = await db.execute(orderQuery, orderParams);
        const [paymentTotals] = await db.execute(paymentQuery, paymentParams);
        
        const totalOrders = parseFloat(orderTotals[0].totalOrders) || 0;
        const totalPayments = parseFloat(paymentTotals[0].totalPayments) || 0;
        const pendingAmount = totalOrders - totalPayments;
        
        // Construir consulta de detalles por cliente con filtros
        let clientQuery = `
            SELECT 
                c.id,
                c.nombre,
                COALESCE(pedidos_totals.totalOrders, 0) as totalOrders,
                COALESCE(pagos_totals.totalPayments, 0) as totalPayments
            FROM clientes c
            LEFT JOIN (
                SELECT 
                    cliente_id,
                    SUM(monto) as totalOrders
                FROM pedidos`;
        
        if (req.user.perfil === 'Vendedor') {
            clientQuery += ` WHERE creado_por = ${req.user.id}`;
        } else if (req.user.perfil === 'Gerente de ventas') {
            clientQuery += ` WHERE creado_por IN (SELECT id FROM usuarios WHERE perfil = 'Vendedor')`;
        }
        
        clientQuery += `
                GROUP BY cliente_id
            ) pedidos_totals ON c.id = pedidos_totals.cliente_id
            LEFT JOIN (
                SELECT 
                    cliente_id,
                    SUM(monto) as totalPayments
                FROM pagos`;
        
        if (req.user.perfil === 'Vendedor') {
            clientQuery += ` WHERE creado_por = ${req.user.id}`;
        } else if (req.user.perfil === 'Gerente de ventas') {
            clientQuery += ` WHERE creado_por IN (SELECT id FROM usuarios WHERE perfil = 'Vendedor')`;
        }
        
        clientQuery += `
                GROUP BY cliente_id
            ) pagos_totals ON c.id = pagos_totals.cliente_id
            WHERE c.activo = true`;
        
        // Filtrar clientes por usuario si es vendedor
        if (req.user.perfil === 'Vendedor') {
            clientQuery += ` AND c.creado_por = ${req.user.id}`;
        } else if (req.user.perfil === 'Gerente de ventas') {
            clientQuery += ` AND c.creado_por IN (SELECT id FROM usuarios WHERE perfil = 'Vendedor')`;
        }
        
        clientQuery += `
            HAVING totalOrders > 0 OR totalPayments > 0
            ORDER BY (totalOrders - totalPayments) DESC
        `;
        
        const [clientDetails] = await db.execute(clientQuery);
        
        // Procesar datos de clientes
        const clients = clientDetails.map(client => ({
            id: client.id,
            nombre: client.nombre,
            totalOrders: parseFloat(client.totalOrders) || 0,
            totalPayments: parseFloat(client.totalPayments) || 0
        }));
        
        console.log(`✅ Detalles de cobros obtenidos para ${clients.length} clientes del ${req.user.perfil}`);
        
        res.json({
            summary: {
                totalOrders: totalOrders,
                totalPayments: totalPayments,
                pendingAmount: pendingAmount
            },
            clients: clients
        });
        
    } catch (error) {
        console.error('❌ Error obteniendo detalles de cobros pendientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Función temporal para actualizar estructura de tabla pedidos
async function updatePedidosTableStructure() {
    try {
        console.log('🔄 Iniciando actualización de estructura de tabla pedidos...');
        
        // Agregar columna numero_pedido si no existe
        try {
            await db.execute('ALTER TABLE pedidos ADD COLUMN numero_pedido VARCHAR(255) UNIQUE AFTER id');
            console.log('✅ Columna numero_pedido agregada');
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log('✅ Columna numero_pedido ya existe');
            } else {
                throw error;
            }
        }

        console.log('✅ Estructura de tabla pedidos actualizada');
        return { success: true };
    } catch (error) {
        console.error('❌ Error actualizando estructura de pedidos:', error);
        throw error;
    }
}

// Función para actualizar estructura de tabla productos
async function updateProductosTableStructure() {
    try {
        console.log('🔄 Iniciando actualización de estructura de tabla productos...');
        
        // Verificar columnas existentes
        const [columns] = await db.execute(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'productos'
        `);
        
        const existingColumns = columns.map(col => col.COLUMN_NAME.toLowerCase());
        console.log('🔍 Columnas existentes en productos:', existingColumns);
        
        // Agregar columna stock si no existe
        if (!existingColumns.includes('stock')) {
            await db.execute('ALTER TABLE productos ADD COLUMN stock INT DEFAULT 0 AFTER precio');
            console.log('✅ Columna stock agregada');
        } else {
            console.log('✅ Columna stock ya existe');
        }
        
        // Agregar columna activo si no existe
        if (!existingColumns.includes('activo')) {
            await db.execute('ALTER TABLE productos ADD COLUMN activo BOOLEAN DEFAULT TRUE');
            console.log('✅ Columna activo agregada');
        } else {
            console.log('✅ Columna activo ya existe');
        }
        
        // Agregar columna created_at si no existe
        if (!existingColumns.includes('created_at')) {
            await db.execute('ALTER TABLE productos ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
            console.log('✅ Columna created_at agregada');
        } else {
            console.log('✅ Columna created_at ya existe');
        }
        
        // Agregar columna updated_at si no existe
        if (!existingColumns.includes('updated_at')) {
            await db.execute('ALTER TABLE productos ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
            console.log('✅ Columna updated_at agregada');
        } else {
            console.log('✅ Columna updated_at ya existe');
        }

        console.log('✅ Estructura de tabla productos actualizada completamente');
        return { success: true, columns: existingColumns };
    } catch (error) {
        console.error('❌ Error actualizando estructura de productos:', error);
        throw error;
    }
}

// Endpoint para actualizar estructura de tabla pedidos
app.post('/api/admin/update-pedidos-table', authenticateToken, async (req, res) => {
    try {
        // Verificar que el usuario sea administrador
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Solo los administradores pueden actualizar la estructura de tablas' });
        }

        const result = await updatePedidosTableStructure();
        res.json({ message: 'Estructura de tabla pedidos actualizada exitosamente', result });
    } catch (error) {
        console.error('Error actualizando estructura de pedidos:', error);
        res.status(500).json({ error: 'Error actualizando estructura de tabla', details: error.message });
    }
});

// Endpoint para actualizar estructura de tabla productos
app.post('/api/admin/update-productos-table', authenticateToken, async (req, res) => {
    try {
        console.log('🔍 Usuario solicitando actualización:', req.user);
        
        // Verificar que el usuario sea administrador
        if (req.user.perfil !== 'Administrador') {
            return res.status(403).json({ error: 'Solo los administradores pueden actualizar la estructura de tablas' });
        }

        const result = await updateProductosTableStructure();
        res.json({ 
            message: 'Estructura de tabla productos actualizada exitosamente', 
            result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error actualizando estructura de productos:', error);
        res.status(500).json({ error: 'Error actualizando estructura de tabla', details: error.message });
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