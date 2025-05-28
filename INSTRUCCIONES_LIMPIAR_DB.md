# Instrucciones para Limpiar la Base de Datos

## ✅ Completado: Eliminación de Datos de Prueba del Código

Se han realizado los siguientes cambios:

1. **Función `insertInitialData()` vaciada**: Ya no se crean usuarios, productos, listas de precios ni otros datos de prueba automáticamente.

2. **Servidor actualizado**: Se agregó un endpoint especial `/api/admin/clear-database` para limpiar la base de datos remotamente.

## 🧹 Cómo Limpiar la Base de Datos Existente

### Opción 1: Script Directo a Railway (Recomendado)

1. **Obtener credenciales de Railway**:
   - Ve a https://railway.app/dashboard
   - Selecciona tu proyecto MIMI CRM
   - Haz clic en el servicio MySQL/Database
   - Ve a la pestaña "Variables"
   - Copia los siguientes valores:
     - `MYSQL_HOST` (ejemplo: autorack.proxy.rlwy.net)
     - `MYSQL_PORT` (ejemplo: 12345)
     - `MYSQL_USER` (ejemplo: root)
     - `MYSQL_PASSWORD` (tu password)
     - `MYSQL_DATABASE` (ejemplo: railway)

2. **Actualizar el script**:
   - Abre el archivo `clear-db-direct.js`
   - Reemplaza las líneas 5-11 con tus credenciales reales
   - Descomenta la última línea del archivo

3. **Ejecutar el script**:
   ```bash
   node clear-db-direct.js
   ```

### Opción 2: Endpoint del Servidor (Si el servidor funciona)

Si el servidor Node.js está funcionando correctamente en Railway:

```bash
node clear-database-remote.js
```

## 📋 Resultado Esperado

Después de ejecutar cualquiera de los scripts:

- ✅ Todas las tablas estarán vacías
- ✅ Los contadores AUTO_INCREMENT se resetearán a 1
- ⚠️ **NO habrá usuarios en el sistema**

## 🔐 Crear Usuario Administrador

Después de limpiar la base de datos, necesitarás crear un usuario administrador:

1. Ve a la aplicación web: https://mimi-crm-production.railway.app
2. Como no hay usuarios, el sistema te permitirá registrarte
3. El primer usuario registrado automáticamente será Administrador

## 📁 Archivos Creados

- `clear-database.js` - Script para base de datos local
- `clear-database-remote.js` - Script para limpiar vía API
- `clear-db-direct.js` - Script directo a Railway (recomendado)
- `test-server.js` - Script para probar endpoints
- `test-urls.js` - Script para encontrar URL correcta
- `railway.json` - Configuración de Railway

## 🚀 Estado Actual

- ✅ Código actualizado sin datos de prueba
- ✅ Scripts de limpieza creados
- ✅ Cambios subidos a GitHub
- ⏳ Esperando limpieza manual de la base de datos

## 💡 Notas Importantes

1. **Backup**: Si tienes datos importantes, haz un backup antes de limpiar
2. **Usuarios**: Después de limpiar, no habrá usuarios en el sistema
3. **Primer registro**: El primer usuario que se registre será administrador
4. **Credenciales**: Guarda las credenciales de Railway en un lugar seguro 