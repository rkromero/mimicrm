#!/usr/bin/env node

/**
 * Script para probar el estado del pool de conexiones MySQL
 * Uso: node test-pool-status.js
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🧪 Test del Pool de Conexiones MySQL');
console.log('=====================================\n');

// Función para hacer petición al endpoint
async function testPoolStatus(token) {
    try {
        const fetch = require('node-fetch');
        const response = await fetch('http://localhost:3000/api/pool-status', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log('✅ Respuesta del servidor:');
        console.log('========================');
        console.log(JSON.stringify(data, null, 2));
        
        // Análisis del estado
        console.log('\n📊 Análisis del Pool:');
        console.log('=====================');
        
        if (data.status === 'ok' && data.pool) {
            const { pool } = data;
            console.log(`🔗 Conexiones totales: ${pool.totalConnections}`);
            console.log(`🟢 Conexiones libres: ${pool.freeConnections}`);
            console.log(`🔴 Conexiones en uso: ${pool.usedConnections}`);
            console.log(`📈 Utilización: ${pool.utilizationPercent}%`);
            console.log(`❤️  Estado de salud: ${data.health.toUpperCase()}`);
            
            // Recomendaciones
            if (pool.utilizationPercent > 80) {
                console.log('\n⚠️  ADVERTENCIA: Pool cerca del límite');
                console.log('💡 Considera aumentar connectionLimit si es frecuente');
            } else if (pool.utilizationPercent < 20) {
                console.log('\n✅ Pool funcionando con baja utilización (óptimo)');
            } else {
                console.log('\n👍 Pool funcionando en rango normal');
            }
        } else {
            console.log('❌ Error en la respuesta del servidor');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.log('\n💡 Posibles soluciones:');
            console.log('   1. Verifica que el servidor esté ejecutándose en puerto 3000');
            console.log('   2. Ejecuta: npm start');
        } else if (error.message.includes('401') || error.message.includes('403')) {
            console.log('\n💡 Error de autenticación:');
            console.log('   1. El token puede estar expirado');
            console.log('   2. Inicia sesión nuevamente en el CRM');
        }
    }
}

// Función para obtener el token desde localStorage (simulado)
function getStoredToken() {
    console.log('📝 Para probar el endpoint necesitas un token de autenticación.');
    console.log('🌐 Opción 1: Abre http://localhost:3000 en tu navegador');
    console.log('🔍 Opción 2: Abre las herramientas de desarrollo (F12)');
    console.log('💾 Opción 3: En la consola ejecuta: localStorage.getItem("authToken")');
    console.log('📋 Opción 4: Copia el token y pégalo aquí\n');
}

async function main() {
    try {
        // Opción simple: intentar sin token primero (para ver si hay otros errores)
        console.log('🔄 Intentando conectar al servidor...\n');
        
        await testPoolStatus(''); // Sin token para ver qué pasa
        
    } catch (error) {
        console.log('🔐 Se requiere autenticación. Vamos a pedirte el token.\n');
        
        getStoredToken();
        
        rl.question('Pega tu token aquí (o presiona Enter para cancelar): ', async (token) => {
            if (!token.trim()) {
                console.log('❌ Cancelado. Para probar manualmente:');
                console.log('   curl -H "Authorization: Bearer TU_TOKEN" http://localhost:3000/api/pool-status');
                rl.close();
                return;
            }

            await testPoolStatus(token.trim());
            rl.close();
        });
    }
}

// Verificar si node-fetch está disponible
try {
    require('node-fetch');
} catch (error) {
    console.error('❌ node-fetch no está instalado.');
    console.log('💡 Para instalar: npm install node-fetch@2.7.0');
    console.log('🌐 Alternativamente, prueba en el navegador:');
    console.log('   1. Abre http://localhost:3000');
    console.log('   2. Inicia sesión');
    console.log('   3. Ve a http://localhost:3000/api/pool-status');
    process.exit(1);
}

if (require.main === module) {
    main();
}