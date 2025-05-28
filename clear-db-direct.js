const mysql = require('mysql2/promise');

// Credenciales de Railway (estas son las que deberías tener en tu dashboard de Railway)
// Reemplaza estos valores con los reales de tu base de datos MySQL en Railway
const railwayConfig = {
    host: 'autorack.proxy.rlwy.net',  // Ejemplo - reemplaza con tu host real
    port: 12345,                      // Ejemplo - reemplaza con tu puerto real  
    user: 'root',                     // Ejemplo - reemplaza con tu usuario real
    password: 'tu_password_aqui',     // Ejemplo - reemplaza con tu password real
    database: 'railway'               // Ejemplo - reemplaza con tu database real
};

async function clearRailwayDatabase() {
    let connection;
    
    try {
        console.log('🔗 Conectando a la base de datos de Railway...');
        console.log('Host:', railwayConfig.host);
        console.log('Port:', railwayConfig.port);
        console.log('Database:', railwayConfig.database);
        
        // Conectar a la base de datos
        connection = await mysql.createConnection(railwayConfig);

        console.log('✅ Conectado a la base de datos de Railway');

        // Deshabilitar verificación de claves foráneas temporalmente
        await connection.execute('SET FOREIGN_KEY_CHECKS = 0');

        // Lista de todas las tablas a limpiar
        const tables = [
            'contactos',
            'pagos', 
            'pedido_items',
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
        console.log('⚠️  IMPORTANTE: No hay usuarios en el sistema.');
        console.log('💡 Para crear un usuario administrador, ve a la aplicación web y regístrate.');

    } catch (error) {
        console.error('❌ Error limpiando la base de datos:', error);
        console.log('💡 Verifica las credenciales de la base de datos en Railway:');
        console.log('   1. Ve a tu proyecto en Railway');
        console.log('   2. Selecciona el servicio de MySQL');
        console.log('   3. Ve a la pestaña "Variables"');
        console.log('   4. Copia los valores de MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE');
        console.log('   5. Actualiza este script con esos valores');
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Conexión cerrada');
        }
    }
}

console.log('⚠️  IMPORTANTE: Antes de ejecutar este script, debes actualizar las credenciales');
console.log('   de la base de datos en la línea 5-11 con los valores reales de Railway.');
console.log('');
console.log('🔍 Para obtener las credenciales:');
console.log('   1. Ve a https://railway.app/dashboard');
console.log('   2. Selecciona tu proyecto MIMI CRM');
console.log('   3. Haz clic en el servicio MySQL');
console.log('   4. Ve a la pestaña "Variables"');
console.log('   5. Copia MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE');
console.log('');

// Descomenta la siguiente línea después de actualizar las credenciales
// clearRailwayDatabase(); 