# 🚀 GUÍA COMPLETA PARA PONER MIMI CRM ONLINE

## 📋 REQUISITOS PREVIOS

### 1. Instalar Node.js
1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación abriendo PowerShell y escribiendo:
   ```
   node --version
   npm --version
   ```

### 2. Instalar MySQL
1. Ve a https://dev.mysql.com/downloads/mysql/
2. Descarga MySQL Community Server
3. Durante la instalación:
   - Elige "Developer Default"
   - Configura una contraseña para el usuario root (¡ANÓTALA!)
   - Deja el puerto por defecto (3306)

## 🔧 CONFIGURACIÓN LOCAL

### PASO 1: Configurar la Base de Datos
1. Abre MySQL Workbench (se instala con MySQL)
2. Conecta con usuario `root` y tu contraseña
3. Crea una nueva base de datos:
   ```sql
   CREATE DATABASE mimi_crm;
   ```

### PASO 2: Configurar Variables de Entorno
1. Abre el archivo `config.env` en tu proyecto
2. Cambia estos valores:
   ```
   DB_PASSWORD=tu_password_de_mysql_aqui
   JWT_SECRET=una_clave_muy_segura_y_larga_aqui_123456789
   ```

### PASO 3: Instalar Dependencias
1. Abre PowerShell en la carpeta de tu proyecto
2. Ejecuta:
   ```
   npm install
   ```

### PASO 4: Ejecutar la Aplicación
1. En PowerShell, ejecuta:
   ```
   npm start
   ```
2. Ve a http://localhost:3000
3. Usa estas credenciales iniciales:
   - Email: admin@mimi.com
   - Contraseña: admin123

## 🌐 PONER LA APLICACIÓN ONLINE

### OPCIÓN 1: Heroku (Gratis para empezar)

#### Paso 1: Crear cuenta en Heroku
1. Ve a https://heroku.com
2. Crea una cuenta gratuita
3. Descarga e instala Heroku CLI

#### Paso 2: Preparar la aplicación
1. Crea un archivo `Procfile` (sin extensión):
   ```
   web: node server.js
   ```

#### Paso 3: Configurar base de datos en la nube
1. En Heroku, ve a tu app → Resources
2. Busca "ClearDB MySQL" y agrégalo (gratis hasta 5MB)
3. Ve a Settings → Config Vars
4. Copia la DATABASE_URL que aparece

#### Paso 4: Subir a Heroku
```bash
# Inicializar git (si no lo has hecho)
git init
git add .
git commit -m "Initial commit"

# Crear app en Heroku
heroku create tu-app-name

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=tu_clave_secreta_aqui

# Subir código
git push heroku main
```

### OPCIÓN 2: Railway (Recomendado - Más fácil)

#### Paso 1: Crear cuenta en Railway
1. Ve a https://railway.app
2. Regístrate con GitHub

#### Paso 2: Crear proyecto
1. Click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Conecta tu repositorio

#### Paso 3: Agregar base de datos
1. Click en "Add Service" → "Database" → "MySQL"
2. Railway creará automáticamente la base de datos

#### Paso 4: Configurar variables
1. Ve a tu servicio web → Variables
2. Agrega:
   ```
   NODE_ENV=production
   JWT_SECRET=tu_clave_secreta_aqui
   ```

### OPCIÓN 3: DigitalOcean App Platform

#### Paso 1: Crear cuenta
1. Ve a https://digitalocean.com
2. Crea una cuenta (tienen crédito gratis)

#### Paso 2: Crear App
1. Ve a Apps → Create App
2. Conecta tu repositorio de GitHub
3. Selecciona el plan básico ($5/mes)

#### Paso 3: Configurar base de datos
1. Agrega un componente de base de datos MySQL
2. Configura las variables de entorno

## 🔒 CONFIGURACIÓN DE SEGURIDAD

### Variables de Entorno Importantes
```
NODE_ENV=production
JWT_SECRET=clave_muy_segura_de_al_menos_32_caracteres
DB_HOST=tu_host_de_base_de_datos
DB_USER=tu_usuario_de_db
DB_PASSWORD=tu_password_de_db
DB_NAME=mimi_crm
```

### Cambiar Credenciales por Defecto
1. Una vez online, inicia sesión como administrador
2. Ve a "Administrar Perfiles"
3. Cambia la contraseña del administrador
4. Crea usuarios adicionales según necesites

## 📱 CONFIGURACIÓN DE DOMINIO PERSONALIZADO

### Si quieres tu propio dominio (ej: mimicrm.com):

1. Compra un dominio en:
   - Namecheap
   - GoDaddy
   - Google Domains

2. En tu proveedor de hosting:
   - Heroku: Settings → Domains
   - Railway: Settings → Domains
   - DigitalOcean: Settings → Domains

3. Configura los DNS según las instrucciones del proveedor

## 🔧 MANTENIMIENTO

### Backup de Base de Datos
- Configura backups automáticos en tu proveedor
- Exporta datos regularmente desde MySQL Workbench

### Monitoreo
- Revisa logs regularmente
- Configura alertas de uptime

### Actualizaciones
- Mantén Node.js actualizado
- Revisa dependencias con `npm audit`

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error de Conexión a Base de Datos
1. Verifica credenciales en config.env
2. Asegúrate que MySQL esté ejecutándose
3. Revisa que el puerto 3306 esté abierto

### Error "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Error de Puerto en Producción
- Asegúrate que tu app use `process.env.PORT`
- En Heroku/Railway se asigna automáticamente

## 📞 SOPORTE

Si tienes problemas:
1. Revisa los logs del servidor
2. Verifica la consola del navegador (F12)
3. Asegúrate que todas las variables estén configuradas

## 🎯 PRÓXIMOS PASOS

Una vez online:
1. Cambia credenciales por defecto
2. Crea usuarios para tu equipo
3. Configura listas de precios
4. Importa tus clientes existentes
5. Configura backup automático

¡Tu CRM estará listo para usar! 🎉 