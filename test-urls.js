const https = require('https');

const possibleUrls = [
    'mimi-crm-production.up.railway.app',
    'mimicrm-production.up.railway.app', 
    'mimi-crm.up.railway.app',
    'mimicrm.up.railway.app',
    'mimi-crm-production.railway.app',
    'mimicrm-production.railway.app'
];

async function testUrl(hostname) {
    return new Promise((resolve) => {
        const options = {
            hostname: hostname,
            port: 443,
            path: '/',
            method: 'GET',
            timeout: 5000
        };

        const req = https.request(options, (res) => {
            console.log(`✅ ${hostname} - Status: ${res.statusCode}`);
            resolve({ hostname, status: res.statusCode, success: true });
        });

        req.on('error', (error) => {
            console.log(`❌ ${hostname} - Error: ${error.message}`);
            resolve({ hostname, error: error.message, success: false });
        });

        req.on('timeout', () => {
            console.log(`⏰ ${hostname} - Timeout`);
            req.destroy();
            resolve({ hostname, error: 'Timeout', success: false });
        });

        req.end();
    });
}

async function testAllUrls() {
    console.log('🔍 Probando URLs posibles de Railway...\n');
    
    const results = [];
    
    for (const url of possibleUrls) {
        const result = await testUrl(url);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo entre requests
    }
    
    console.log('\n📊 Resumen de resultados:');
    const workingUrls = results.filter(r => r.success && r.status < 400);
    
    if (workingUrls.length > 0) {
        console.log('\n✅ URLs que funcionan:');
        workingUrls.forEach(url => {
            console.log(`   - https://${url.hostname} (Status: ${url.status})`);
        });
    } else {
        console.log('\n❌ No se encontraron URLs funcionales');
        console.log('💡 Posibles soluciones:');
        console.log('   1. Verificar que la aplicación esté desplegada en Railway');
        console.log('   2. Generar un dominio en Railway Settings > Networking');
        console.log('   3. Verificar el nombre del proyecto en Railway');
    }
}

testAllUrls(); 