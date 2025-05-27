// permissions.js
// Función para chequear permisos de usuario

// Requiere que roles.js y users.js estén cargados

function checkAccess(user, module, action) {
    if (!user || !user.perfil) return false;
    const role = ROLES[user.perfil];
    if (!role) return false;
    const allowed = role[module];
    return allowed && allowed.includes(action);
}

// Ejemplo de uso:
// if (checkAccess(getCurrentUser(), 'Clientes', 'editar')) { ... } 