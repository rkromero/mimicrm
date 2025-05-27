// login.js - Lógica del formulario de login para MIMI CRM

document.addEventListener('DOMContentLoaded', function() {
    // Si ya está logueado, redirigir al dashboard
    if (isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const result = login(username, password);
        if (result.success) {
            // Redirigir al dashboard
            window.location.href = 'index.html';
        } else {
            errorDiv.textContent = result.message;
            errorDiv.style.display = 'block';
        }
    });
}); 