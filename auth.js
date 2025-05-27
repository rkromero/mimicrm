// auth.js - Funciones comunes de autenticación para el CRM

// Iniciar sesión: valida usuario y contraseña contra SIMULATED_USERS
function login(username, password) {
    const user = SIMULATED_USERS.find(u => u.username === username && u.password === password);
    if (user) {
        // Guardar sesión en localStorage (sin la contraseña)
        const sessionUser = { ...user };
        delete sessionUser.password;
        sessionUser.isLoggedIn = true;
        localStorage.setItem('crm_user', JSON.stringify(sessionUser));
        return { success: true, user: sessionUser };
    } else {
        return { success: false, message: 'Usuario o contraseña incorrectos.' };
    }
}

// Cerrar sesión: elimina la sesión del localStorage
function logout() {
    localStorage.removeItem('crm_user');
}

// Obtener el usuario logueado actual (o null)
function getCurrentUser() {
    const userStr = localStorage.getItem('crm_user');
    if (!userStr) return null;
    try {
        const user = JSON.parse(userStr);
        if (user && user.isLoggedIn) return user;
    } catch (e) {}
    return null;
}

// Verificar si hay sesión activa
function isAuthenticated() {
    return !!getCurrentUser();
} 