// users.js
// Usuarios ficticios para testear el sistema

[
    { "id": 1, "nombre": "Ana Admin", "email": "ana@crm.com", "perfil": "Administrador" },
    { "id": 2, "nombre": "Vero Vendedora", "email": "vero@crm.com", "perfil": "Vendedor" },
    { "id": 3, "nombre": "Pedro Producción", "email": "pedro@crm.com", "perfil": "Produccion" }
]

// Simulación de usuario autenticado
let currentUserId = 1; // Cambia este valor para simular otro usuario

function getCurrentUser() {
    return USERS_DATA.find(u => u.id === currentUserId);
}

function setUserProfile(userId, newProfile) {
    const user = USERS_DATA.find(u => u.id === userId);
    if (user) user.perfil = newProfile;
}

// Lista de usuarios simulados para login
// Puedes agregar más usuarios aquí
const SIMULATED_USERS = [
  {
    username: 'rodo',
    password: 'rodo123', // En un backend real, nunca guardes contraseñas en texto plano
    nombre: 'Rodolfo',
    perfil: 'administrador',
    avatar: '',
    email: 'rodo@crm.com'
  }
]; 