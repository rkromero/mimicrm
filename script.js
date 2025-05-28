// Arrays para almacenar datos - VACÍOS (se cargan desde la base de datos)
let clients = [];
let orders = [];
let payments = [];
let products = [];
let contacts = [];

// Listado de provincias y localidades de Argentina
const provinciasYLocalidades = {
    "Buenos Aires": {
        "La Plata": ["Berisso", "Ensenada", "La Plata"],
        "Mar del Plata": ["Batán", "Mar del Plata", "Sierra de los Padres"],
        "Bahía Blanca": ["Bahía Blanca", "Ingeniero White", "General Daniel Cerri"],
        "San Nicolás": ["San Nicolás de los Arroyos", "Ramallo"],
        "Tandil": ["Tandil", "María Ignacia Vela"],
        "Quilmes": ["Quilmes", "Bernal", "Ezpeleta"],
        "Avellaneda": ["Avellaneda", "Dock Sud", "Wilde"],
        "Lanús": ["Lanús Este", "Lanús Oeste", "Remedios de Escalada"],
        "San Isidro": ["Acassuso", "Beccar", "Boulogne Sur Mer", "Martínez", "San Isidro", "Villa Adelina"],
        "Vicente López": ["Florida", "Munro", "Olivos", "Vicente López", "Villa Martelli"],
        "Tigre": ["Don Torcuato", "El Talar", "General Pacheco", "Tigre", "Ricardo Rojas"],
        "San Fernando": ["San Fernando", "Victoria"],
        "Escobar": ["Belén de Escobar", "Garín", "Ingeniero Maschwitz", "Matheu"],
        "Pilar": ["Del Viso", "Derqui", "Manzanares", "Pilar"],
        "Moreno": ["Cuartel V", "Francisco Álvarez", "La Reja", "Moreno", "Paso del Rey", "Trujui"],
        "Merlo": ["Libertad", "Mariano Acosta", "Merlo", "Parque San Martín", "Pontevedra"],
        "Morón": ["Castelar", "El Palomar", "Haedo", "Morón"],
        "Hurlingham": ["Hurlingham", "Villa Tesei", "William C. Morris"],
        "Ituzaingó": ["Ituzaingó", "Villa Udaondo"],
        "Tres de Febrero": ["Caseros", "Churruca", "Ciudad Jardín Lomas del Palomar", "El Libertador", "José Ingenieros", "Loma Hermosa", "Martín Coronado", "Pablo Podestá", "Remedios de Escalada", "Sáenz Peña", "Santos Lugares", "Villa Bosch", "Villa Raffo"],
        "San Martín": ["José León Suárez", "San Andrés", "San Martín", "Villa Ballester"],
        "Malvinas Argentinas": ["Grand Bourg", "Los Polvorines", "Pablo Nogués", "Tortuguitas", "Villa de Mayo"],
        "José C. Paz": ["José C. Paz"],
        "San Miguel": ["Bella Vista", "San Miguel"],
        "Almirante Brown": ["Adrogué", "Burzaco", "Claypole", "Don Orione", "Glew", "José Mármol", "Longchamps", "Malvinas Argentinas", "Minister Rivadavia", "Rafael Calzada", "Solano"],
        "Lomas de Zamora": ["Banfield", "Llavallol", "Lomas de Zamora", "Temperley", "Turdera"],
        "Esteban Echeverría": ["9 de Abril", "El Jagüel", "Luis Guillón", "Monte Grande"],
        "Ezeiza": ["Carlos Spegazzini", "Ezeiza", "Tristán Suárez"],
        "La Matanza": ["Aldo Bonzi", "Ciudad Evita", "González Catán", "Gregorio de Laferrere", "Isidro Casanova", "La Tablada", "Lomas del Mirador", "Ramos Mejía", "San Justo", "Tapiales", "Villa Luzuriaga", "Virrey del Pino"],
        "Florencio Varela": ["Bosques", "Florencio Varela"],
        "Berazategui": ["Berazategui", "Hudson", "Plátanos", "Ranelagh", "Sourigues"],
        "Presidente Perón": ["Guernica", "Presidente Perón"]
    },
    "Ciudad Autonoma de Buenos Aires": {
        "Comuna 1": ["Puerto Madero", "Retiro", "San Nicolás", "San Telmo", "Montserrat", "Constitución"],
        "Comuna 2": ["Recoleta"],
        "Comuna 3": ["Balvanera", "San Cristóbal"],
        "Comuna 4": ["Barracas", "Boca", "Nueva Pompeya", "Parque Patricios"],
        "Comuna 5": ["Almagro", "Boedo"],
        "Comuna 6": ["Caballito"],
        "Comuna 7": ["Flores", "Parque Chacabuco"],
        "Comuna 8": ["Villa Lugano", "Villa Riachuelo", "Villa Soldati"],
        "Comuna 9": ["Liniers", "Mataderos", "Parque Avellaneda"],
        "Comuna 10": ["Floresta", "Monte Castro", "Vélez Sársfield", "Versalles", "Villa Luro", "Villa Real"],
        "Comuna 11": ["Villa General Mitre", "Villa Devoto", "Villa del Pino", "Villa Santa Rita"],
        "Comuna 12": ["Coghlan", "Saavedra", "Villa Pueyrredón", "Villa Urquiza"],
        "Comuna 13": ["Belgrano", "Colegiales", "Núñez"],
        "Comuna 14": ["Palermo"],
        "Comuna 15": ["Agronomía", "Chacarita", "Paternal", "Villa Crespo", "Villa Ortúzar"]
    },
    "Córdoba": {
        "Córdoba": ["Córdoba", "Villa Allende", "Mendiolaza", "Río Ceballos", "Saldán", "La Calera", "Villa Carlos Paz"],
        "Río Cuarto": ["Río Cuarto", "Las Higueras", "Holmberg"],
        "Villa María": ["Villa María", "Villa Nueva"],
        "San Francisco": ["San Francisco", "Frontera", "Sa Esperanza"],
        "Alta Gracia": ["Alta Gracia", "Anisacate", "Villa General Belgrano"],
        "Jesús María": ["Jesús María", "Colonia Caroya", "Sinsacate"],
        "Bell Ville": ["Bell Ville", "Morrison", "Pueblo Italiano"],
        "Cruz del Eje": ["Cruz del Eje", "Dean Funes", "Villa de Soto"],
        "Marcos Juárez": ["Marcos Juárez", "Saira", "Inriville"],
        "La Carlota": ["La Carlota", "Alejandro Roca", "Ucacha"]
    },
    "Santa Fe": {
        "Rosario": ["Rosario", "Villa Gobernador Gálvez", "Funes", "Roldán", "Pérez"],
        "Santa Fe": ["Santa Fe", "Recreo", "Monte Vera", "Sauce Viejo"],
        "Rafaela": ["Rafaela", "Sunchales", "Lehmann"],
        "Venado Tuerto": ["Venado Tuerto", "Firmat", "Murphy"],
        "Reconquista": ["Reconquista", "Avellaneda", "Las Toscas"],
        "Esperanza": ["Esperanza", "San Carlos Centro", "Humboldt"],
        "Casilda": ["Casilda", "Arroyo Seco", "Villa Constitución"],
        "Gálvez": ["Gálvez", "San Lorenzo", "Capitán Bermúdez"],
        "Cañada de Gómez": ["Cañada de Gómez", "Carcarañá", "Oliveros"],
        "San Javier": ["San Javier", "Romang", "Villa Ocampo"]
    },
    "Mendoza": {
        "Mendoza": ["Mendoza", "Las Heras", "Guaymallén", "Godoy Cruz", "Maipú", "Luján de Cuyo"],
        "San Rafael": ["San Rafael", "General Alvear", "Malargüe"],
        "Rivadavia": ["Rivadavia", "Santa Rosa", "La Paz"],
        "Tunuyán": ["Tunuyán", "Tupungato", "San Carlos"],
        "San Martín": ["San Martín", "Palmira", "Junín"],
        "Lavalle": ["Villa Tulumaya", "Costa de Araujo", "Jocolí"]
    }
};

function actualizarCiudades(provincia, selectId = 'client-city-input') {
    const ciudadSelect = document.getElementById(selectId);
    ciudadSelect.innerHTML = '<option value="">Seleccione una ciudad</option>';
    
    if (provincia && provinciasYLocalidades[provincia]) {
        Object.keys(provinciasYLocalidades[provincia]).forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad;
            option.textContent = ciudad;
            ciudadSelect.appendChild(option);
        });
    }
}

function actualizarLocalidades(provincia, ciudad, selectId = 'client-locality-input') {
    const localidadSelect = document.getElementById(selectId);
    localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
    
    if (provincia && ciudad && provinciasYLocalidades[provincia] && provinciasYLocalidades[provincia][ciudad]) {
        provinciasYLocalidades[provincia][ciudad].forEach(localidad => {
            const option = document.createElement('option');
            option.value = localidad;
            option.textContent = localidad;
            localidadSelect.appendChild(option);
        });
    }
}

// Funciones de utilidad
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(amount);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('es-AR');
}

// === VERIFICACIÓN DE AUTENTICACIÓN ===

// Función para verificar si el usuario está autenticado
async function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    const currentUser = localStorage.getItem('currentUser');
    
    // Si estamos en login.html, no hacer verificación
    if (window.location.pathname.includes('login.html')) {
        return false;
    }
    
    if (!token || !currentUser) {
        // Solo redirigir si no estamos ya en login
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = '/login.html';
        }
        return false;
    }
    
    try {
        // Verificar el token con el servidor
        const response = await fetch('/api/auth/verify', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            // Token inválido, limpiar localStorage y redirigir solo si no estamos en login
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            if (!window.location.pathname.includes('login.html')) {
                window.location.href = '/login.html';
            }
            return false;
        }
        
        const data = await response.json();
        // Actualizar datos del usuario si es necesario
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        // Configurar el usuario actual para el sistema legacy
        const user = data.user;
        const userNameElement = document.getElementById('current-user-name');
        if (userNameElement) {
            userNameElement.textContent = user.nombre;
        }
        
        return true;
        
    } catch (error) {
        console.error('Error verificando autenticación:', error);
        // En caso de error, solo redirigir si no estamos en login
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = '/login.html';
        }
        return false;
    }
}

// Función para obtener el usuario actual desde localStorage
function getCurrentUserFromAuth() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Función para hacer logout
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    window.location.href = '/login.html';
}

// === FUNCIONES DE CARGA DE DATOS DESDE API ===

// Función para cargar clientes desde la API
async function loadClients() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/clientes', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            clients = await response.json();
            renderClientsTable();
        } else {
            console.error('Error cargando clientes:', response.statusText);
        }
    } catch (error) {
        console.error('Error cargando clientes:', error);
    }
}

// Función para cargar productos desde la API
async function loadProducts() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/productos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            products = await response.json();
        } else {
            console.error('Error cargando productos:', response.statusText);
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// Función para cargar pedidos desde la API
async function loadOrders() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/pedidos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            orders = await response.json();
        } else {
            console.error('Error cargando pedidos:', response.statusText);
        }
    } catch (error) {
        console.error('Error cargando pedidos:', error);
    }
}

// Función para cargar pagos desde la API
async function loadPayments() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/pagos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            payments = await response.json();
        } else {
            console.error('Error cargando pagos:', response.statusText);
        }
    } catch (error) {
        console.error('Error cargando pagos:', error);
    }
}

// Función para cargar contactos desde la API
async function loadContacts() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/contactos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            contacts = await response.json();
        } else {
            console.error('Error cargando contactos:', response.statusText);
        }
    } catch (error) {
        console.error('Error cargando contactos:', error);
    }
}

// === FUNCIONES DE RENDERIZADO ===

// Función para renderizar la tabla de clientes
function renderClientsTable() {
    const container = document.getElementById('clients-list');
    if (!container) return;
    
    if (clients.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No hay clientes registrados</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'clients-table';
    
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Saldo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${clients.map(client => `
                <tr>
                    <td>${client.nombre || client.name}</td>
                    <td>${client.documento || client.cuit}</td>
                    <td>${client.email}</td>
                    <td>${client.telefono || client.phone}</td>
                    <td>${formatCurrency(client.saldo || client.balance || 0)}</td>
                    <td>
                        <button onclick="editClient(${client.id})" class="btn-edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteClient(${client.id})" class="btn-delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

// Función para renderizar la tabla de pedidos
function renderOrdersTable() {
    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay pedidos registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.numero_pedido}</td>
            <td>${order.cliente_nombre || 'Cliente no encontrado'}</td>
            <td>${order.descripcion || ''}</td>
            <td>${formatCurrency(order.monto)}</td>
            <td><span class="status-badge status-${order.estado}">${order.estado}</span></td>
            <td>${formatDate(order.fecha)}</td>
            <td>
                <button onclick="editOrder(${order.id})" class="btn-edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteOrder(${order.id})" class="btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Función para renderizar la tabla de pagos
function renderPaymentsTable() {
    const tbody = document.getElementById('payments-table-body');
    if (!tbody) return;
    
    if (payments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay pagos registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = payments.map(payment => `
        <tr>
            <td>${payment.cliente_nombre || 'Cliente no encontrado'}</td>
            <td>${formatCurrency(payment.monto)}</td>
            <td>${payment.metodo}</td>
            <td>${payment.referencia || ''}</td>
            <td>${formatDate(payment.fecha)}</td>
            <td>
                <button onclick="editPayment(${payment.id})" class="btn-edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePayment(${payment.id})" class="btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Función para renderizar la tabla de productos
function renderProductsTable() {
    const tbody = document.getElementById('products-table-body');
    if (!tbody) return;
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay productos registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.nombre}</td>
            <td>${product.descripcion || ''}</td>
            <td>${formatCurrency(product.precio)}</td>
            <td>${product.stock || 0}</td>
            <td>
                <button onclick="editProduct(${product.id})" class="btn-edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteProduct(${product.id})" class="btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Función para renderizar la tabla de contactos
function renderContactsTable() {
    const tbody = document.getElementById('contacts-table-body');
    if (!tbody) return;
    
    if (contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay contactos registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.nombre}</td>
            <td>${contact.cliente_nombre || 'Cliente no encontrado'}</td>
            <td>${contact.email || ''}</td>
            <td>${contact.telefono || ''}</td>
            <td>${contact.cargo || ''}</td>
            <td>${contact.departamento || ''}</td>
            <td>
                <button onclick="editContact(${contact.id})" class="btn-edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteContact(${contact.id})" class="btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// === FUNCIONES DE NAVEGACIÓN ===

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// === INICIALIZACIÓN ===

// Event listener principal
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Iniciando aplicación MIMI CRM...');
    
    // Verificar autenticación
    const isAuthenticated = await checkAuthentication();
    if (!isAuthenticated) {
        console.log('❌ Usuario no autenticado');
        return;
    }
    
    console.log('✅ Usuario autenticado');
    
    // Cargar datos desde la API
    await loadClients();
    await loadProducts();
    await loadOrders();
    await loadPayments();
    await loadContacts();
    
    // Configurar navegación
    setupNavigation();
    
    // Configurar formularios
    setupForms();
    
    // Configurar botones del header
    setupHeaderButtons();
    
    // Mostrar dashboard por defecto
    showSection('dashboard');
    updateHeaderTitle('dashboard');
    
    // Marcar dashboard como activo en la navegación
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const dashboardNav = document.querySelector('.nav-item'); // El primer nav-item es dashboard
    if (dashboardNav) {
        dashboardNav.classList.add('active');
    }
    
    console.log('✅ Aplicación inicializada correctamente');
});

// Función para configurar la navegación
function setupNavigation() {
    console.log('🔧 Configurando navegación...');
    
    // Configurar navegación del sidebar
    const navItems = document.querySelectorAll('.nav-item');
    console.log(`🔍 Encontrados ${navItems.length} elementos de navegación`);
    
    navItems.forEach((item, index) => {
        // Usar onclick en lugar de addEventListener para evitar duplicados
        item.onclick = function(e) {
            e.preventDefault();
            console.log('🖱️ Click en navegación:', this.textContent.trim());
            
            try {
                // Remover clase active de todos los items
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                
                // Agregar clase active al item clickeado
                this.classList.add('active');
                
                // Obtener la sección desde el data-section o el texto
                const section = this.getAttribute('data-section') || this.textContent.trim().toLowerCase();
                console.log('📍 Navegando a sección:', section);
                
                // Actualizar el título del header
                updateHeaderTitle(section);
                
                // Mostrar la sección correspondiente
                showSection(section);
            } catch (error) {
                console.error('❌ Error en navegación:', error);
            }
        };
    });
    
    // Configurar logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            console.log('🚪 Cerrando sesión...');
            logoutUser();
        };
        console.log('✅ Event listener de logout configurado');
    }
    
    console.log('✅ Navegación configurada correctamente');
}

// Función para actualizar el título del header
function updateHeaderTitle(section) {
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) {
        switch(section) {
            case 'dashboard':
                headerTitle.textContent = 'Dashboard';
                break;
            case 'clientes':
                headerTitle.textContent = 'Clientes';
                break;
            case 'pedidos':
                headerTitle.textContent = 'Pedidos';
                break;
            case 'pagos':
                headerTitle.textContent = 'Pagos';
                break;
            case 'productos':
                headerTitle.textContent = 'Productos';
                break;
            case 'contactos':
                headerTitle.textContent = 'Contactos';
                break;
            case 'fábrica':
                headerTitle.textContent = 'Fábrica';
                break;
            default:
                headerTitle.textContent = 'MIMI CRM';
        }
    }
}

// Función para mostrar secciones
function showSection(section) {
    console.log('🔄 Cambiando a sección:', section);
    
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.page-content, #admin-profiles-section, #pedidos-section, #pagos-section, #productos-section, #contactos-section');
    sections.forEach(sec => sec.style.display = 'none');
    
    // Mostrar la sección correspondiente
    switch(section) {
        case 'dashboard':
            document.querySelector('.page-content').style.display = 'block';
            // Solo renderizar si ya tenemos datos
            if (clients.length > 0) {
                renderClientsTable();
            }
            break;
        case 'clientes':
            document.querySelector('.page-content').style.display = 'block';
            // Solo renderizar si ya tenemos datos
            if (clients.length > 0) {
                renderClientsTable();
            }
            break;
        case 'pedidos':
            document.getElementById('pedidos-section').style.display = 'block';
            // Solo renderizar si ya tenemos datos
            if (orders.length > 0) {
                renderOrdersTable();
            }
            break;
        case 'pagos':
            document.getElementById('pagos-section').style.display = 'block';
            // Solo renderizar si ya tenemos datos
            if (payments.length > 0) {
                renderPaymentsTable();
            }
            break;
        case 'productos':
            document.getElementById('productos-section').style.display = 'block';
            // Solo renderizar si ya tenemos datos
            if (products.length > 0) {
                renderProductsTable();
            }
            break;
        case 'contactos':
            document.getElementById('contactos-section').style.display = 'block';
            // Solo renderizar si ya tenemos datos
            if (contacts.length > 0) {
                renderContactsTable();
            }
            break;
        case 'fábrica':
            // Implementar vista de fábrica
            document.querySelector('.page-content').style.display = 'block';
            break;
        default:
            document.querySelector('.page-content').style.display = 'block';
    }
    
    console.log('✅ Sección mostrada:', section);
}

// Función para configurar formularios
function setupForms() {
    console.log('🔧 Configurando formularios...');
    
    try {
        // Configurar formulario de nuevo cliente
        const newClientForm = document.getElementById('new-client-form');
        if (newClientForm) {
            // Usar onsubmit en lugar de addEventListener para evitar duplicados
            newClientForm.onsubmit = handleNewClientSubmit;
            console.log('✅ Event listener del formulario configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario new-client-form');
        }
        
        // Configurar cierre de modales
        const closeModalBtns = document.querySelectorAll('.close-modal');
        console.log(`🔍 Encontrados ${closeModalBtns.length} botones de cerrar modal`);
        closeModalBtns.forEach(btn => {
            btn.onclick = function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                    console.log('✅ Modal cerrado');
                }
            };
        });
        
        console.log('✅ Configuración de formularios completada');
    } catch (error) {
        console.error('❌ Error configurando formularios:', error);
    }
}

// Función para mostrar modales
function showModal(modalId) {
    console.log('🔍 Intentando mostrar modal:', modalId);
    
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('❌ No se encontró el modal:', modalId);
        return;
    }
    
    console.log('✅ Modal encontrado, mostrando...');
    modal.style.display = 'block';
    
    // Si es el modal de nuevo cliente, configurar listeners de provincia y ciudad
    if (modalId === 'new-client-modal') {
        console.log('🔄 Cargando configuración para modal de nuevo cliente...');
        try {
            setupProvinceAndCityListeners();
            console.log('✅ Configuración del modal completada');
        } catch (error) {
            console.error('❌ Error al configurar modal de nuevo cliente:', error);
        }
    }
}

// Función para configurar listeners de provincia y ciudad
function setupProvinceAndCityListeners() {
    console.log('🔧 Configurando listeners de provincia y ciudad...');
    
    const provinceSelect = document.getElementById('client-province-input');
    const citySelect = document.getElementById('client-city-input');
    const localitySelect = document.getElementById('client-locality-input');
    
    if (!provinceSelect || !citySelect || !localitySelect) {
        console.warn('⚠️ No se encontraron todos los elementos de provincia/ciudad/localidad');
        return;
    }
    
    // Limpiar opciones existentes
    citySelect.innerHTML = '<option value="">Seleccione una ciudad</option>';
    localitySelect.innerHTML = '<option value="">Seleccione una localidad</option>';
    
    // Configurar listener de provincia (sin clonar)
    provinceSelect.onchange = function() {
        console.log('🌍 Provincia seleccionada:', this.value);
        try {
            actualizarCiudades(this.value);
            // Limpiar localidad cuando cambia la provincia
            const localitySelect = document.getElementById('client-locality-input');
            if (localitySelect) {
                localitySelect.innerHTML = '<option value="">Seleccione una localidad</option>';
            }
        } catch (error) {
            console.error('❌ Error al actualizar ciudades:', error);
        }
    };
    
    // Configurar listener de ciudad (sin clonar)
    citySelect.onchange = function() {
        console.log('🏙️ Ciudad seleccionada:', this.value);
        try {
            const provincia = provinceSelect.value;
            actualizarLocalidades(provincia, this.value);
        } catch (error) {
            console.error('❌ Error al actualizar localidades:', error);
        }
    };
    
    console.log('✅ Listeners de provincia y ciudad configurados');
}

// Función para manejar envío de nuevo cliente
async function handleNewClientSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const clientData = {
        nombre: formData.get('nombre') || document.getElementById('client-name-input').value,
        documento: formData.get('documento') || document.getElementById('client-rut-input').value,
        email: formData.get('email') || document.getElementById('client-email-input').value,
        telefono: formData.get('telefono') || document.getElementById('client-phone-input').value,
        direccion: formData.get('direccion') || document.getElementById('client-address-input').value,
        provincia: formData.get('provincia') || document.getElementById('client-province-input').value,
        ciudad: formData.get('ciudad') || document.getElementById('client-city-input').value,
        localidad: formData.get('localidad') || document.getElementById('client-locality-input').value,
        codigo_postal: formData.get('codigo_postal') || document.getElementById('client-zip-input').value
    };
    
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/clientes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });
        
        if (response.ok) {
            showNotification('Cliente creado exitosamente', 'success');
            document.getElementById('new-client-modal').style.display = 'none';
            e.target.reset();
            await loadClients(); // Recargar la lista
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error al crear cliente', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al crear cliente', 'error');
    }
}

// Funciones placeholder para compatibilidad
function editClient(clientId) {
    console.log('Editar cliente:', clientId);
    showNotification('Función de edición en desarrollo', 'info');
}

function deleteClient(clientId) {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
        console.log('Eliminar cliente:', clientId);
        showNotification('Función de eliminación en desarrollo', 'info');
    }
}

function editOrder(orderId) {
    console.log('Editar pedido:', orderId);
    showNotification('Función de edición en desarrollo', 'info');
}

function deleteOrder(orderId) {
    if (confirm('¿Está seguro de que desea eliminar este pedido?')) {
        console.log('Eliminar pedido:', orderId);
        showNotification('Función de eliminación en desarrollo', 'info');
    }
}

function editPayment(paymentId) {
    console.log('Editar pago:', paymentId);
    showNotification('Función de edición en desarrollo', 'info');
}

function deletePayment(paymentId) {
    if (confirm('¿Está seguro de que desea eliminar este pago?')) {
        console.log('Eliminar pago:', paymentId);
        showNotification('Función de eliminación en desarrollo', 'info');
    }
}

function editProduct(productId) {
    console.log('Editar producto:', productId);
    showNotification('Función de edición en desarrollo', 'info');
}

function deleteProduct(productId) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        console.log('Eliminar producto:', productId);
        showNotification('Función de eliminación en desarrollo', 'info');
    }
}

function editContact(contactId) {
    console.log('Editar contacto:', contactId);
    showNotification('Función de edición en desarrollo', 'info');
}

function deleteContact(contactId) {
    if (confirm('¿Está seguro de que desea eliminar este contacto?')) {
        console.log('Eliminar contacto:', contactId);
        showNotification('Función de eliminación en desarrollo', 'info');
    }
}

// Función para configurar botones del header
function setupHeaderButtons() {
    console.log('🔧 Configurando botones del header...');
    
    try {
        // Configurar botón "Nuevo Cliente" del header
        const newClientBtnHeader = document.getElementById('new-client-btn');
        if (newClientBtnHeader) {
            newClientBtnHeader.onclick = function() {
                console.log('🖱️ Botón nuevo cliente (header) clickeado');
                showModal('new-client-modal');
            };
            console.log('✅ Botón nuevo cliente del header configurado');
        }
        
        // Configurar botón "Nuevo Pedido" del header
        const newOrderBtnHeader = document.getElementById('new-order-btn');
        if (newOrderBtnHeader) {
            newOrderBtnHeader.onclick = function() {
                console.log('🖱️ Botón nuevo pedido (header) clickeado');
                showModal('new-order-modal');
            };
            console.log('✅ Botón nuevo pedido del header configurado');
        }
        
        // Configurar botón "Nuevo Pago" del header
        const newPaymentBtnHeader = document.getElementById('new-payment-btn');
        if (newPaymentBtnHeader) {
            newPaymentBtnHeader.onclick = function() {
                console.log('🖱️ Botón nuevo pago (header) clickeado');
                showModal('new-payment-modal');
            };
            console.log('✅ Botón nuevo pago del header configurado');
        }
        
        // Configurar botones adicionales de las secciones
        const newOrderBtnSection = document.getElementById('new-order-btn-section');
        if (newOrderBtnSection) {
            newOrderBtnSection.onclick = function() {
                console.log('🖱️ Botón nuevo pedido (sección) clickeado');
                showModal('new-order-modal');
            };
        }
        
        const newPaymentBtnSection = document.getElementById('new-payment-btn-section');
        if (newPaymentBtnSection) {
            newPaymentBtnSection.onclick = function() {
                console.log('🖱️ Botón nuevo pago (sección) clickeado');
                showModal('new-payment-modal');
            };
        }
        
        const newContactBtnSection = document.getElementById('new-contact-btn-section');
        if (newContactBtnSection) {
            newContactBtnSection.onclick = function() {
                console.log('🖱️ Botón nuevo contacto (sección) clickeado');
                showModal('new-contact-modal');
            };
        }
        
        const newProductBtn = document.getElementById('new-product-btn');
        if (newProductBtn) {
            newProductBtn.onclick = function() {
                console.log('🖱️ Botón nuevo producto clickeado');
                showModal('new-product-modal');
            };
        }
        
        console.log('✅ Configuración de botones del header completada');
    } catch (error) {
        console.error('❌ Error configurando botones del header:', error);
    }
}
