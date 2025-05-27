const https = require('https');

async function clearRemoteDatabase() {
    const data = JSON.stringify({
        adminKey: 'CLEAR_MIMI_DB_2024'
    });

    const options = {
        hostname: 'mimi-crm-production.up.railway.app',
        port: 443,
        path: '/api/admin/clear-database',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const result = JSON.parse(responseData);
                    resolve(result);
                } catch (error) {
                    reject(new Error('Error parsing response: ' + responseData));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

async function main() {
    try {
        console.log('🔗 Conectando a la base de datos de Railway...');
        console.log('🧹 Limpiando base de datos...');
        
        const result = await clearRemoteDatabase();
        
        if (result.success) {
            console.log('✅', result.message);
            console.log('📊 Resultados por tabla:');
            
            for (const [table, count] of Object.entries(result.results)) {
                if (typeof count === 'number') {
                    console.log(`   - ${table}: ${count} registros eliminados`);
                } else {
                    console.log(`   - ${table}: ${count}`);
                }
            }
            
            console.log('⚠️ ', result.warning);
        } else {
            console.error('❌ Error:', result.error);
        }
        
    } catch (error) {
        console.error('❌ Error limpiando la base de datos:', error.message);
    }
}

main(); 