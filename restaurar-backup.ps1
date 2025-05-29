# 🔄 Script de Restauración - MIMI CRM
# Fecha: 28/05/2025
# Descripción: Script para restaurar desde diferentes puntos de backup

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("tag", "rama", "fisico", "github")]
    [string]$Metodo = "tag",
    
    [Parameter(Mandatory=$false)]
    [switch]$Confirmar
)

Write-Host "🛡️ SISTEMA DE RESTAURACIÓN - MIMI CRM" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Definir rutas y nombres
$projectPath = "D:\DOCUMENTOS\PROYECTOS VS\MIMI CRM"
$backupPath = "D:\DOCUMENTOS\PROYECTOS VS\MIMI CRM BACKUP 20250528-2247"
$tagName = "backup-before-cleanup"
$branchName = "backup-complete-20250528-2246"
$repoUrl = "https://github.com/rkromero/mimicrm.git"

Write-Host "📍 Método seleccionado: $Metodo" -ForegroundColor Yellow
Write-Host ""

# Función para verificar si estamos en el directorio correcto
function Test-ProjectDirectory {
    if (!(Test-Path $projectPath)) {
        Write-Host "❌ No se encuentra el directorio del proyecto: $projectPath" -ForegroundColor Red
        return $false
    }
    return $true
}

# Función para crear backup del estado actual
function Backup-CurrentState {
    Write-Host "📦 Creando backup del estado actual..." -ForegroundColor Blue
    $timestamp = Get-Date -Format "yyyyMMdd-HHmm"
    $currentBackup = "D:\DOCUMENTOS\PROYECTOS VS\MIMI CRM CURRENT $timestamp"
    
    if (Test-Path $projectPath) {
        Copy-Item -Path $projectPath -Destination $currentBackup -Recurse -Force
        Write-Host "✅ Estado actual respaldado en: $currentBackup" -ForegroundColor Green
    }
}

# Restaurar desde Tag
function Restore-FromTag {
    Write-Host "🏷️ Restaurando desde tag: $tagName" -ForegroundColor Blue
    
    Set-Location $projectPath
    
    # Verificar que el tag existe
    $tagExists = git tag -l $tagName
    if (!$tagExists) {
        Write-Host "❌ El tag $tagName no existe" -ForegroundColor Red
        return $false
    }
    
    # Restaurar
    git checkout $tagName
    git checkout -b "restauracion-$(Get-Date -Format 'yyyyMMdd-HHmm')"
    
    Write-Host "✅ Restaurado desde tag exitosamente" -ForegroundColor Green
    return $true
}

# Restaurar desde Rama
function Restore-FromBranch {
    Write-Host "🌿 Restaurando desde rama: $branchName" -ForegroundColor Blue
    
    Set-Location $projectPath
    
    # Verificar que la rama existe
    $branchExists = git branch -a | Select-String $branchName
    if (!$branchExists) {
        Write-Host "❌ La rama $branchName no existe" -ForegroundColor Red
        return $false
    }
    
    # Restaurar
    git checkout $branchName
    git checkout -b "restauracion-rama-$(Get-Date -Format 'yyyyMMdd-HHmm')"
    
    Write-Host "✅ Restaurado desde rama exitosamente" -ForegroundColor Green
    return $true
}

# Restaurar desde Backup Físico
function Restore-FromPhysical {
    Write-Host "💾 Restaurando desde backup físico" -ForegroundColor Blue
    
    if (!(Test-Path $backupPath)) {
        Write-Host "❌ No se encuentra el backup físico: $backupPath" -ForegroundColor Red
        return $false
    }
    
    # Crear backup del estado actual
    Backup-CurrentState
    
    # Remover directorio actual
    if (Test-Path $projectPath) {
        Remove-Item $projectPath -Recurse -Force
    }
    
    # Copiar desde backup
    Copy-Item -Path $backupPath -Destination $projectPath -Recurse
    
    Write-Host "✅ Restaurado desde backup físico exitosamente" -ForegroundColor Green
    return $true
}

# Restaurar desde GitHub
function Restore-FromGitHub {
    Write-Host "🌐 Restaurando desde GitHub" -ForegroundColor Blue
    
    $tempPath = "D:\DOCUMENTOS\PROYECTOS VS\MIMI CRM TEMP $(Get-Date -Format 'yyyyMMdd-HHmm')"
    
    # Clonar desde GitHub
    git clone -b $branchName $repoUrl $tempPath
    
    if (!(Test-Path $tempPath)) {
        Write-Host "❌ Error clonando desde GitHub" -ForegroundColor Red
        return $false
    }
    
    # Crear backup del estado actual
    Backup-CurrentState
    
    # Reemplazar directorio actual
    if (Test-Path $projectPath) {
        Remove-Item $projectPath -Recurse -Force
    }
    
    Move-Item $tempPath $projectPath
    
    Write-Host "✅ Restaurado desde GitHub exitosamente" -ForegroundColor Green
    return $true
}

# Verificar estado post-restauración
function Test-PostRestore {
    Write-Host "🔍 Verificando estado post-restauración..." -ForegroundColor Blue
    
    Set-Location $projectPath
    
    $files = @("index.html", "server.js", "script.js", "styles.css", "package.json")
    $allPresent = $true
    
    foreach ($file in $files) {
        if (Test-Path $file) {
            Write-Host "✅ $file" -ForegroundColor Green
        } else {
            Write-Host "❌ $file" -ForegroundColor Red
            $allPresent = $false
        }
    }
    
    if ($allPresent) {
        Write-Host "🎉 Todos los archivos críticos están presentes" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Faltan algunos archivos críticos" -ForegroundColor Yellow
    }
    
    return $allPresent
}

# SCRIPT PRINCIPAL
Write-Host "⚠️ ADVERTENCIA: Este script modificará tu proyecto actual" -ForegroundColor Yellow
Write-Host "Asegúrate de tener backups antes de continuar" -ForegroundColor Yellow
Write-Host ""

if (!$Confirmar) {
    $confirmacion = Read-Host "¿Continuar con la restauración? (s/n)"
    if ($confirmacion -ne "s" -and $confirmacion -ne "S") {
        Write-Host "❌ Operación cancelada" -ForegroundColor Red
        exit
    }
}

# Verificar directorio del proyecto
if (!(Test-ProjectDirectory)) {
    Write-Host "❌ No se puede proceder sin el directorio del proyecto" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Iniciando restauración..." -ForegroundColor Green
Write-Host ""

# Ejecutar método seleccionado
$success = $false

switch ($Metodo) {
    "tag" { $success = Restore-FromTag }
    "rama" { $success = Restore-FromBranch }
    "fisico" { $success = Restore-FromPhysical }
    "github" { $success = Restore-FromGitHub }
}

if ($success) {
    Write-Host ""
    Write-Host "🔍 Ejecutando verificaciones post-restauración..." -ForegroundColor Blue
    Test-PostRestore
    
    Write-Host ""
    Write-Host "🎉 RESTAURACIÓN COMPLETADA" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host "Próximos pasos:" -ForegroundColor Yellow
    Write-Host "1. Verificar que el servidor arranca: node server.js" -ForegroundColor White
    Write-Host "2. Probar la aplicación en http://localhost:3000" -ForegroundColor White
    Write-Host "3. Hacer push si todo funciona: git push origin main" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ RESTAURACIÓN FALLIDA" -ForegroundColor Red
    Write-Host "Consulta las instrucciones manuales en INSTRUCCIONES_RESTAURACION.md"
    exit 1
}

Write-Host ""
Write-Host "📚 Para más información, consulta: INSTRUCCIONES_RESTAURACION.md" -ForegroundColor Cyan 