@echo off
echo ========================================
echo    MIMI CRM - INICIO RAPIDO
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Instalando dependencias...
npm install

echo.
echo Iniciando servidor...
echo.
echo ========================================
echo  Aplicacion disponible en:
echo  http://localhost:3000
echo.
echo  Credenciales iniciales:
echo  Email: admin@mimi.com
echo  Password: admin123
echo ========================================
echo.

npm start 