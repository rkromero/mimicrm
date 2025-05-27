// main.js
// Lógica de la interfaz de administración de perfiles y ejemplos de uso de permisos

// Mostrar u ocultar el panel según el usuario
window.onload = function() {
    const user = getCurrentUser();
    const adminPanel = document.getElementById('admin-panel');
    const noAccess = document.getElementById('no-access');
    if (checkAccess(user, 'AdminPanel', 'ver')) {
        adminPanel.style.display = '';
        renderUserTable();
        renderPermsTables();
    } else {
        noAccess.style.display = '';
        noAccess.textContent = 'No tienes permisos para acceder a esta sección.';
    }
};

function renderUserTable() {
    const tbody = document.getElementById('user-table-body');
    tbody.innerHTML = '';
    USERS.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>
                <select class="profile-select" data-userid="${user.id}" ${user.id === getCurrentUser().id ? 'disabled' : ''}>
                    ${Object.keys(ROLES).map(role => `<option value="${role}" ${user.perfil === role ? 'selected' : ''}>${role}</option>`).join('')}
                </select>
            </td>
            <td>
                ${user.id === getCurrentUser().id ? '<span style="color:#888">(Tú)</span>' : '<button class="btn-guardar" data-userid="'+user.id+'">Guardar</button>'}
            </td>
        `;
        tbody.appendChild(tr);
    });
    // Listeners para guardar cambios de perfil
    document.querySelectorAll('.btn-guardar').forEach(btn => {
        btn.onclick = function() {
            const userId = parseInt(this.getAttribute('data-userid'));
            const select = document.querySelector(`select[data-userid='${userId}']`);
            setUserProfile(userId, select.value);
            renderUserTable();
        };
    });
}

function renderPermsTables() {
    const container = document.getElementById('perms-tables');
    container.innerHTML = '';
    Object.keys(ROLES).forEach(role => {
        const perms = ROLES[role];
        const modules = Object.keys(perms);
        const actions = ['ver','crear','editar','eliminar'];
        let html = `<h4>${role}</h4><table class="perms-table"><thead><tr><th>Módulo</th>`;
        actions.forEach(a => html += `<th>${a.charAt(0).toUpperCase()+a.slice(1)}</th>`);
        html += '</tr></thead><tbody>';
        modules.forEach(mod => {
            html += `<tr><td>${mod}</td>`;
            actions.forEach(a => {
                const has = perms[mod] && perms[mod].includes(a);
                html += `<td><span class="badge ${has ? 'badge-yes' : 'badge-no'}">${has ? 'Sí' : 'No'}</span></td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        container.innerHTML += html;
    });
}

// Ejemplo de protección de función
function editarCliente(clienteId) {
    const user = getCurrentUser();
    if (!checkAccess(user, 'Clientes', 'editar')) {
        alert('No tienes permiso para editar clientes.');
        return;
    }
    // ... lógica de edición ...
    alert('Editando cliente ' + clienteId);
} 