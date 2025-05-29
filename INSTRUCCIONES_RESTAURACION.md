# 📁 Instrucciones de Restauración - MIMI CRM

## 🛡️ Puntos de Restauración Creados

### 1. **Tag de Git: `backup-before-cleanup`**
- **Tipo**: Tag de Git
- **Fecha**: 28/05/2025 22:46
- **Descripción**: Estado completo antes de eliminar elementos no utilizados
- **Ubicación**: Repositorio Git local y remoto

### 2. **Rama de Git: `backup-complete-20250528-2246`**
- **Tipo**: Rama de Git
- **Fecha**: 28/05/2025 22:46
- **Descripción**: Rama completa con todo el código actual
- **Ubicación**: GitHub (remoto) y local

### 3. **Backup Físico: `MIMI CRM BACKUP 20250528-2247`**
- **Tipo**: Copia física de archivos
- **Fecha**: 28/05/2025 22:47
- **Descripción**: Copia completa del proyecto sin .git
- **Ubicación**: `D:\DOCUMENTOS\PROYECTOS VS\MIMI CRM BACKUP 20250528-2247`

---

## 🔄 Métodos de Restauración

### Método 1: Restaurar desde Tag de Git (MÁS RÁPIDO)

```bash
# Verificar que estás en el directorio correcto
cd "D:\DOCUMENTOS\PROYECTOS VS\MIMI CRM"

# Restaurar al estado del tag
git checkout backup-before-cleanup

# Crear una nueva rama para trabajar
git checkout -b restauracion-desde-tag

# Si quieres volver a main con el estado restaurado
git checkout main
git reset --hard backup-before-cleanup
```

### Método 2: Restaurar desde Rama de Backup

```bash
# Cambiar a la rama de backup
git checkout backup-complete-20250528-2246

# Crear una nueva rama desde este punto
git checkout -b nueva-rama-desde-backup

# O restaurar main desde esta rama
git checkout main
git reset --hard backup-complete-20250528-2246
```

### Método 3: Restaurar desde Backup Físico (MÁS SEGURO)

```bash
# 1. Respaldar el proyecto actual (por si acaso)
cd "D:\DOCUMENTOS\PROYECTOS VS"
ren "MIMI CRM" "MIMI CRM CURRENT"

# 2. Copiar el backup físico
Copy-Item -Path "MIMI CRM BACKUP 20250528-2247" -Destination "MIMI CRM" -Recurse

# 3. Ir al directorio restaurado
cd "MIMI CRM"

# 4. Reinicializar Git (si es necesario)
git init
git remote add origin https://github.com/rkromero/mimicrm.git
git add .
git commit -m "Restaurado desde backup físico"
```

### Método 4: Restaurar desde GitHub (REMOTO)

```bash
# 1. Clonar desde la rama de backup
git clone -b backup-complete-20250528-2246 https://github.com/rkromero/mimicrm.git "MIMI CRM RESTAURADO"

# 2. Cambiar al directorio
cd "MIMI CRM RESTAURADO"

# 3. Cambiar a main si es necesario
git checkout main
```

---

## ⚠️ Verificaciones Post-Restauración

### 1. **Verificar Archivos Críticos**
```bash
# Verificar que existen los archivos principales
ls index.html server.js script.js styles.css package.json

# Verificar configuración
ls config.env
```

### 2. **Verificar Base de Datos**
```bash
# Probar conexión al servidor
node server.js

# En otra terminal, probar el endpoint
curl http://localhost:3000/api/test
```

### 3. **Verificar Despliegue**
```bash
# Verificar que Railway funciona
git push origin main

# Verificar URL de producción
# https://web-production-17439.up.railway.app
```

---

## 🚨 En Caso de Emergencia

### Si nada funciona:

1. **Contactar al backup físico**:
   - Directorio: `D:\DOCUMENTOS\PROYECTOS VS\MIMI CRM BACKUP 20250528-2247`
   - Simplemente copiar todo el contenido a un nuevo directorio

2. **Descargar desde GitHub**:
   - Ir a: https://github.com/rkromero/mimicrm
   - Seleccionar rama: `backup-complete-20250528-2246`
   - Descargar ZIP

3. **Restaurar base de datos**:
   - La base de datos en Railway está intacta
   - Solo reconectar la aplicación

---

## 📋 Lista de Verificación Post-Restauración

- [ ] ✅ Archivos principales presentes
- [ ] ✅ package.json y dependencias
- [ ] ✅ config.env configurado
- [ ] ✅ server.js arranca sin errores
- [ ] ✅ Login funcional
- [ ] ✅ Dashboard carga correctamente
- [ ] ✅ Base de datos conecta
- [ ] ✅ Todas las secciones visibles
- [ ] ✅ Railway deployment funcional
- [ ] ✅ URL de producción responde

---

## 📞 Contacto de Emergencia

Si tienes problemas con la restauración:

1. **Verificar commits recientes**: `git log --oneline -10`
2. **Verificar ramas**: `git branch -a`
3. **Verificar tags**: `git tag -l`
4. **Estado del repositorio**: `git status`

---

**🔒 IMPORTANTE**: Estos backups contienen el estado COMPLETO y FUNCIONAL de la aplicación al 28/05/2025. La aplicación está desplegada y funcionando perfectamente en Railway en este momento. 