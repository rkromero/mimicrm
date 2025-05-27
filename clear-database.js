const mysql = require('mysql2/promise');
require('dotenv').config({ path: 'config.env' });

async function clearDatabase() {
    let connection;
    
    try {
        console.log('🔗 Intentando conectar a la base de datos...');
        console.log('Host:', process.env.DB_HOST);
        console.log('Database:', process.env.DB_NAME);
        
        // Conectar a la base de datos
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'mimi_crm'
        });

        console.log('✅ Conectado a la base de datos');

        // Deshabilitar verificación de claves foráneas temporalmente
        await connection.execute('SET FOREIGN_KEY_CHECKS = 0');

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

        console.log('🧹 Iniciando limpieza de la base de datos...');

        // Limpiar cada tabla
        for (const table of tables) {
            try {
                const [result] = await connection.execute(`DELETE FROM ${table}`);
                await connection.execute(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
                console.log(`✅ Tabla ${table} limpiada (${result.affectedRows} registros eliminados)`);
            } catch (error) {
                console.log(`⚠️  Error limpiando tabla ${table}:`, error.message);
            }
        }

        // Rehabilitar verificación de claves foráneas
        await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

        console.log('🎉 Base de datos completamente limpiada');
        console.log('📝 Todas las tablas están vacías y listas para usar');
        console.log('⚠️  IMPORTANTE: No hay usuarios en el sistema. Necesitarás crear un usuario administrador.');

    } catch (error) {
        console.error('❌ Error limpiando la base de datos:', error);
        console.log('💡 Asegúrate de que las variables de entorno estén configuradas correctamente');
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Conexión cerrada');
        }
    }
}

// Ejecutar el script
clearDatabase(); 