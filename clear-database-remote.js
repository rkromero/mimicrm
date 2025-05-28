const https = require('https');

async function clearRemoteDatabase() {
    const data = JSON.stringify({
        adminKey: 'CLEAR_MIMI_DB_2024'
    });

    const options = {
        hostname: 'mimi-crm-production.railway.app',
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

            console.log('📡 Status Code:', res.statusCode);
            console.log('📡 Headers:', res.headers);

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                console.log('📡 Response Data:', responseData);
                
                try {
                    const result = JSON.parse(responseData);
                    resolve(result);
                } catch (error) {
                    reject(new Error('Error parsing response: ' + responseData));
                }
            });
        });

        req.on('error', (error) => {
            console.error('📡 Request Error:', error);
            reject(error);
        });

        req.setTimeout(30000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.write(data);
        req.end();
    });
}

async function main() {
    try {
        console.log('🔗 Conectando a la base de datos de Railway...');
        console.log('🌐 URL: https://mimi-crm-production.up.railway.app/api/admin/clear-database');
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
        console.error('❌ Stack:', error.stack);
    }
}

main(); 