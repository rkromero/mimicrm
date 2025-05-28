const https = require('https');

async function testEndpoint(hostname, path) {
    return new Promise((resolve) => {
        const options = {
            hostname: hostname,
            port: 443,
            path: path,
            method: 'GET',
            timeout: 10000
        };

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                console.log(`${path} - Status: ${res.statusCode}`);
                if (res.statusCode === 200) {
                    console.log(`   ✅ Funciona correctamente`);
                } else {
                    console.log(`   ⚠️  Response: ${responseData.substring(0, 100)}...`);
                }
                resolve({ path, status: res.statusCode, response: responseData });
            });
        });

        req.on('error', (error) => {
            console.log(`${path} - Error: ${error.message}`);
            resolve({ path, error: error.message });
        });

        req.on('timeout', () => {
            console.log(`${path} - Timeout`);
            req.destroy();
            resolve({ path, error: 'Timeout' });
        });

        req.end();
    });
}

async function main() {
    const hostname = 'mimi-crm-production.railway.app';
    
    console.log(`🔍 Probando servidor: https://${hostname}\n`);
    
    const endpoints = [
        '/',
        '/login.html',
        '/api/auth/verify',
        '/api/admin/clear-database'
    ];
    
    for (const endpoint of endpoints) {
        await testEndpoint(hostname, endpoint);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n💡 Si el endpoint /api/admin/clear-database no existe, significa que');
    console.log('   el servidor aún no se ha desplegado con los últimos cambios.');
    console.log('   Espera unos minutos más para que Railway termine el deployment.');
}

main(); 