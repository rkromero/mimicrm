@echo off
echo ========================================
echo    MIMI CRM - CONFIGURACION INICIAL
echo ========================================
echo.

echo Paso 1: Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado
    echo.
    echo Por favor:
    echo 1. Ve a https://nodejs.org/
    echo 2. Descarga la version LTS
    echo 3. Instala y reinicia esta ventana
    echo.
    pause
    exit /b 1
)
echo ✓ Node.js encontrado!

echo.
echo Paso 2: Verificando MySQL...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ADVERTENCIA: MySQL no encontrado en PATH
    echo.
    echo Por favor asegurate de tener MySQL instalado:
    echo 1. Ve a https://dev.mysql.com/downloads/mysql/
    echo 2. Descarga MySQL Community Server
    echo 3. Instala con configuracion Developer Default
    echo.
    echo Presiona cualquier tecla para continuar...
    pause >nul
)

echo.
echo Paso 3: Configurando archivo de entorno...
if not exist "config.env" (
    copy "config.env.ejemplo" "config.env"
    echo ✓ Archivo config.env creado
    echo.
    echo IMPORTANTE: Edita el archivo config.env y configura:
    echo - DB_PASSWORD: Tu contraseña de MySQL
    echo - JWT_SECRET: Una clave secreta segura
    echo.
    echo ¿Quieres abrir el archivo config.env ahora? (s/n)
    set /p respuesta=
    if /i "%respuesta%"=="s" (
        notepad config.env
    )
) else (
    echo ✓ Archivo config.env ya existe
)

echo.
echo Paso 4: Instalando dependencias...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Fallo la instalacion de dependencias
    pause
    exit /b 1
)
echo ✓ Dependencias instaladas

echo.
echo ========================================
echo    CONFIGURACION COMPLETADA
echo ========================================
echo.
echo Proximos pasos:
echo 1. Asegurate de que MySQL este ejecutandose
echo 2. Edita config.env con tus credenciales
echo 3. Ejecuta inicio-rapido.bat para iniciar
echo.
echo ¿Quieres iniciar la aplicacion ahora? (s/n)
set /p iniciar=
if /i "%iniciar%"=="s" (
    call inicio-rapido.bat
) else (
    echo.
    echo Para iniciar mas tarde, ejecuta: inicio-rapido.bat
    pause
) 