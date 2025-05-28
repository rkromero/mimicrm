// Arrays para almacenar datos - VACÍOS (se cargan desde la base de datos)
let clients = [];
let orders = [];
let payments = [];
let products = [];
let contacts = [];
let orderItems = []; // Array para almacenar los productos del pedido actual
let editOrderItems = []; // Array para almacenar los productos del pedido editado

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
    if (amount === null || amount === undefined) return '$0.00';
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(amount);
}

function translateOrderStatus(status) {
    const statusMap = {
        'active': 'Activo',
        'completed': 'Completado', 
        'cancelled': 'Cancelado',
        'pendiente': 'Pendiente',
        'en_proceso': 'En Proceso',
        'completado': 'Completado',
        'cancelado': 'Cancelado',
        'pendiente de pago': 'Pendiente de Pago',
        'fabricar': 'Fabricar',
        'sale fabrica': 'Sale Fábrica'
    };
    return statusMap[status] || status;
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
        
        // Mostrar panel de administración si el usuario es administrador
        if (user.perfil === 'Administrador') {
            const adminNav = document.getElementById('admin-profiles-nav');
            if (adminNav) {
                adminNav.style.display = 'block';
                debugLog('AUTH', 'Panel de administración habilitado para usuario administrador');
            }
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
            renderProductsTable(); // Renderizar la tabla después de cargar los datos
            debugLog('DATA', 'Productos cargados');
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
            renderOrdersTable(); // Renderizar la tabla después de cargar los datos
            debugLog('DATA', 'Pedidos cargados');
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
            renderPaymentsTable(); // Renderizar la tabla después de cargar los datos
            debugLog('DATA', 'Pagos cargados');
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
            renderContactsTable(); // Renderizar la tabla después de cargar los datos
            debugLog('DATA', 'Contactos cargados');
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
    
    // Función auxiliar para obtener el estilo del saldo
    function getSaldoStyle(saldo) {
        const saldoNum = parseFloat(saldo) || 0;
        if (saldoNum > 0) {
            // Saldo deudor (cliente debe dinero) - fondo rojo
            return `
                background-color: #fee2e2; 
                color: #dc2626; 
                padding: 0.25rem 0.75rem; 
                border-radius: 9999px; 
                font-weight: 600;
                text-align: center;
                display: inline-block;
                min-width: 80px;
            `;
        } else if (saldoNum < 0) {
            // Saldo a favor (cliente tiene crédito) - fondo verde
            return `
                background-color: #dcfce7; 
                color: #16a34a; 
                padding: 0.25rem 0.75rem; 
                border-radius: 9999px; 
                font-weight: 600;
                text-align: center;
                display: inline-block;
                min-width: 80px;
            `;
        } else {
            // Saldo neutro - sin color especial
            return `
                color: #6b7280; 
                padding: 0.25rem 0.75rem; 
                text-align: center;
                display: inline-block;
                min-width: 80px;
            `;
        }
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
            ${clients.map(client => {
                const saldo = client.saldo || client.balance || client.saldo_calculado || 0;
                const saldoStyle = getSaldoStyle(saldo);
                
                return `
                    <tr>
                        <td>${client.nombre || client.name}</td>
                        <td>${client.documento || client.cuit}</td>
                        <td>${client.email}</td>
                        <td>${client.telefono || client.phone}</td>
                        <td>
                            <span style="${saldoStyle}">
                                ${formatCurrency(saldo)}
                            </span>
                        </td>
                        <td>
                            <button onclick="viewClientDetails(${client.id})" class="btn-icon" title="Ver detalles">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="editClient(${client.id})" class="btn-icon" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteClient(${client.id})" class="btn-icon" title="Eliminar" style="color: #dc2626;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('')}
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
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay pedidos registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.numero_pedido}</td>
            <td>${order.cliente_nombre || 'N/A'}</td>
            <td>${order.descripcion || 'Sin descripción'}</td>
            <td>${formatCurrency(order.monto)}</td>
            <td>
                <span style="${getOrderStatusStyle(order.estado)}">
                    ${translateOrderStatus(order.estado)}
                </span>
            </td>
            <td>${formatDate(order.fecha)}</td>
            <td>
                <button onclick="viewOrderDetails(${order.id})" class="btn-icon" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="editOrder(${order.id})" class="btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteOrder(${order.id})" class="btn-icon" title="Eliminar" style="color: #dc2626;">
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
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay pagos registrados</td></tr>';
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
                <button onclick="viewPaymentDetails(${payment.id})" class="btn-icon" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="editPayment(${payment.id})" class="btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePayment(${payment.id})" class="btn-icon" title="Eliminar" style="color: #dc2626;">
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
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay productos registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.nombre}</td>
            <td>${product.descripcion || ''}</td>
            <td>${formatCurrency(product.precio)}</td>
            <td>${product.stock || 0}</td>
            <td>
                <button onclick="viewProductDetails(${product.id})" class="btn-icon" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="editProduct(${product.id})" class="btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteProduct(${product.id})" class="btn-icon" title="Eliminar" style="color: #dc2626;">
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
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay contactos registrados</td></tr>';
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
                <button onclick="viewContactDetails(${contact.id})" class="btn-icon" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="editContact(${contact.id})" class="btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteContact(${contact.id})" class="btn-icon" title="Eliminar" style="color: #dc2626;">
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
    notification.className = `notification notification-${type}`;
    
    // Crear contenido de la notificación con la estructura correcta
    const notificationContent = document.createElement('div');
    notificationContent.className = 'notification-content';
    notificationContent.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.appendChild(notificationContent);
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Ocultar después de 4 segundos (un poco más de tiempo para leer)
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// === INICIALIZACIÓN ===

// === SISTEMA DE DEBUGGING Y MANEJO DE ERRORES ===

// Configurar manejo global de errores
window.addEventListener('error', function(e) {
    console.error('🚨 ERROR GLOBAL CAPTURADO:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error,
        stack: e.error?.stack
    });
    
    // Mostrar notificación al usuario
    showNotification(`Error: ${e.message}`, 'error');
    
    // Enviar error a consola con más detalles
    console.trace('Stack trace del error:');
});

// Configurar manejo de promesas rechazadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('🚨 PROMESA RECHAZADA NO MANEJADA:', {
        reason: e.reason,
        promise: e.promise
    });
    
    showNotification(`Error de promesa: ${e.reason}`, 'error');
    console.trace('Stack trace de la promesa rechazada:');
});

// Función para logging detallado
function debugLog(context, message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 🔍 ${context}: ${message}`, data || '');
}

// Función para capturar errores en funciones específicas
function safeExecute(fn, context = 'Unknown') {
    return function(...args) {
        try {
            debugLog(context, 'Ejecutando función', { args });
            const result = fn.apply(this, args);
            
            // Si es una promesa, manejar errores async
            if (result && typeof result.catch === 'function') {
                return result.catch(error => {
                    console.error(`🚨 Error en ${context}:`, error);
                    showNotification(`Error en ${context}: ${error.message}`, 'error');
                    throw error;
                });
            }
            
            debugLog(context, 'Función ejecutada exitosamente');
            return result;
        } catch (error) {
            console.error(`🚨 Error en ${context}:`, error);
            console.trace('Stack trace:');
            showNotification(`Error en ${context}: ${error.message}`, 'error');
            throw error;
        }
    };
}

// Event listener principal con manejo de errores mejorado
document.addEventListener('DOMContentLoaded', async function() {
    try {
        console.log('🚀 Iniciando aplicación MIMI CRM...');
        debugLog('INIT', 'Comenzando inicialización de la aplicación');
        
        // Verificar autenticación
        debugLog('AUTH', 'Verificando autenticación...');
        const isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            console.log('❌ Usuario no autenticado');
            return;
        }
        debugLog('AUTH', 'Usuario autenticado correctamente');
        
        // Cargar datos desde la API con manejo de errores individual
        debugLog('DATA', 'Iniciando carga de datos...');
        
        try {
            await loadClients();
            debugLog('DATA', 'Clientes cargados');
        } catch (error) {
            console.error('Error cargando clientes:', error);
        }
        
        try {
            await loadProducts();
            debugLog('DATA', 'Productos cargados');
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
        
        try {
            await loadOrders();
            debugLog('DATA', 'Pedidos cargados');
        } catch (error) {
            console.error('Error cargando pedidos:', error);
        }
        
        try {
            await loadPayments();
            debugLog('DATA', 'Pagos cargados');
        } catch (error) {
            console.error('Error cargando pagos:', error);
        }
        
        try {
            await loadContacts();
            debugLog('DATA', 'Contactos cargados');
        } catch (error) {
            console.error('Error cargando contactos:', error);
        }
        
        // Configurar componentes con manejo de errores
        debugLog('SETUP', 'Configurando navegación...');
        setupNavigation();
        
        debugLog('SETUP', 'Configurando formularios...');
        setupForms();
        
        debugLog('SETUP', 'Configurando botones del header...');
        setupHeaderButtons();
        
        // Mostrar dashboard por defecto
        debugLog('UI', 'Mostrando dashboard por defecto...');
        showSection('dashboard');
        updateHeaderTitle('dashboard');
        
        // Marcar dashboard como activo en la navegación
        debugLog('UI', 'Configurando navegación activa...');
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        const dashboardNav = document.querySelector('.nav-item');
        if (dashboardNav) {
            dashboardNav.classList.add('active');
        }
        
        console.log('✅ Aplicación inicializada correctamente');
        debugLog('INIT', 'Inicialización completada exitosamente');
        
        // Ejecutar diagnóstico final
        setTimeout(() => {
            debugLog('INIT', 'Ejecutando diagnóstico post-inicialización...');
            const diagnosticReport = runDOMDiagnostic();
            
            // Hacer el reporte disponible globalmente para debugging
            window.MIMI_DIAGNOSTIC = diagnosticReport;
            console.log('💡 Tip: Usa window.MIMI_DIAGNOSTIC para ver el reporte completo');
            console.log('💡 Tip: Usa window.debugModal("modal-id") para probar modales');
            console.log('💡 Tip: Usa window.runDiagnostic() para ejecutar diagnóstico manual');
        }, 1000);
        
    } catch (error) {
        console.error('🚨 ERROR CRÍTICO EN INICIALIZACIÓN:', error);
        console.trace('Stack trace completo:');
        showNotification('Error crítico al inicializar la aplicación', 'error');
        
        // Intentar mostrar al menos una interfaz básica
        try {
            document.body.innerHTML += `
                <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                           background: red; color: white; padding: 20px; border-radius: 8px; z-index: 9999;">
                    <h3>Error Crítico</h3>
                    <p>La aplicación no pudo inicializarse correctamente.</p>
                    <p>Error: ${error.message}</p>
                    <button onclick="location.reload()">Recargar Página</button>
                </div>
            `;
        } catch (e) {
            console.error('No se pudo mostrar el mensaje de error:', e);
        }
    }
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
            case 'administrar perfiles':
            case 'admin':
                headerTitle.textContent = 'Administrar Perfiles';
                break;
            default:
                headerTitle.textContent = 'MIMI CRM';
        }
    }
}

// Función para mostrar secciones
function showSection(section) {
    console.log('🔄 Cambiando a sección:', section);
    
    // Restaurar estilos del panel de administración si no estamos navegando a él
    if (section !== 'administrar perfiles' && section !== 'admin') {
        restoreAdminPanelStyles();
    }
    
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.page-content, #admin-profiles-section, #pedidos-section, #pagos-section, #productos-section, #contactos-section, #dashboard-section, #clientes-section');
    sections.forEach(sec => sec.style.display = 'none');
    
    // Mostrar la sección correspondiente
    switch(section) {
        case 'dashboard':
            const dashboardSection = document.getElementById('dashboard-section');
            if (dashboardSection) {
                dashboardSection.style.display = 'block';
            } else {
                // Si no existe la sección dashboard, mostrar la primera page-content
                document.querySelector('.page-content').style.display = 'block';
            }
            // Actualizar estadísticas del dashboard
            updateDashboardStats();
            break;
        case 'clientes':
            const clientesSection = document.getElementById('clientes-section');
            if (clientesSection) {
                clientesSection.style.display = 'block';
            } else {
                // Fallback a la sección general
                document.querySelector('.page-content').style.display = 'block';
            }
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
        case 'administrar perfiles':
        case 'admin':
            const adminSection = document.getElementById('admin-profiles-section');
            if (adminSection) {
                adminSection.style.display = 'block';
                // Cargar datos de usuarios si es necesario
                loadUsersForAdmin();
                
                // Aplicar automáticamente el forzado de visibilidad
                setTimeout(() => {
                    console.log('🔧 Aplicando forzado automático de visibilidad del panel admin...');
                    
                    // Aplicar los mismos estilos que la función forceShowAdminPanel
                    adminSection.style.cssText = `
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100vw !important;
                        height: 100vh !important;
                        z-index: 9999 !important;
                        background: #f3f4f6 !important;
                        overflow-y: auto !important;
                    `;
                    
                    const pageContent = adminSection.querySelector('.page-content');
                    if (pageContent) {
                        pageContent.style.cssText = `
                            display: block !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                            padding: 1rem 2rem !important;
                            max-width: 1200px !important;
                            margin: 0 auto !important;
                            background: transparent !important;
                        `;
                    }
                    
                    const adminPanel = adminSection.querySelector('.admin-panel');
                    if (adminPanel) {
                        adminPanel.style.cssText = `
                            display: block !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                            background: #ffffff !important;
                            border: 3px solid #10b981 !important;
                            padding: 2rem !important;
                            margin: 1rem auto !important;
                            border-radius: 8px !important;
                            max-width: 1200px !important;
                            width: 95% !important;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                        `;
                    }
                    
                    const usersContainer = adminSection.querySelector('.users-table-container');
                    if (usersContainer) {
                        usersContainer.style.cssText = `
                            display: block !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                            background: #ffffff !important;
                            border: 3px solid #3b82f6 !important;
                            padding: 1rem !important;
                            margin: 1rem 0 !important;
                            border-radius: 8px !important;
                            min-height: 200px !important;
                            width: 100% !important;
                            overflow: visible !important;
                        `;
                        
                        // Si hay contenido, asegurar que la tabla sea visible
                        const table = usersContainer.querySelector('table');
                        if (table) {
                            table.style.cssText = `
                                display: table !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                                width: 100% !important;
                                background: white !important;
                                border-collapse: collapse !important;
                            `;
                        }
                    }
                    
                    const newUserBtn = adminSection.querySelector('#new-user-btn');
                    if (newUserBtn) {
                        newUserBtn.style.cssText = `
                            display: inline-block !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                            background-color: #4f46e5 !important;
                            color: white !important;
                            padding: 0.75rem 1.5rem !important;
                            border: none !important;
                            border-radius: 6px !important;
                            cursor: pointer !important;
                            font-weight: 500 !important;
                        `;
                    }
                    
                    console.log('✅ Forzado automático aplicado al panel de administración');
                }, 200);
            }
            break;
        default:
            // Por defecto mostrar dashboard
            const defaultDashboard = document.getElementById('dashboard-section');
            if (defaultDashboard) {
                defaultDashboard.style.display = 'block';
                updateDashboardStats();
            } else {
                document.querySelector('.page-content').style.display = 'block';
            }
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
            newClientForm.onsubmit = handleNewClientSubmit;
            console.log('✅ Event listener del formulario de cliente configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario new-client-form');
        }
        
        // Configurar formulario de nuevo pedido
        const newOrderForm = document.getElementById('new-order-form');
        if (newOrderForm) {
            newOrderForm.onsubmit = handleNewOrderSubmit;
            console.log('✅ Event listener del formulario de pedido configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario new-order-form');
        }
        
        // Configurar formulario de nuevo pago
        const newPaymentForm = document.getElementById('new-payment-form');
        if (newPaymentForm) {
            newPaymentForm.onsubmit = handleNewPaymentSubmit;
            console.log('✅ Event listener del formulario de pago configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario new-payment-form');
        }
        
        // Configurar formulario de nuevo contacto
        const newContactForm = document.getElementById('new-contact-form');
        if (newContactForm) {
            newContactForm.onsubmit = handleNewContactSubmit;
            console.log('✅ Event listener del formulario de contacto configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario new-contact-form');
        }
        
        // Configurar formulario de nuevo producto
        const newProductForm = document.getElementById('new-product-form');
        if (newProductForm) {
            newProductForm.onsubmit = handleNewProductSubmit;
            console.log('✅ Event listener del formulario de producto configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario new-product-form');
        }
        
        // Configurar formulario de nuevo usuario
        const newUserForm = document.getElementById('new-user-form');
        if (newUserForm) {
            newUserForm.onsubmit = handleNewUserSubmit;
            console.log('✅ Event listener del formulario de usuario configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario new-user-form');
        }
        
        // Configurar formulario de edición de cliente
        const editClientForm = document.getElementById('edit-client-form');
        if (editClientForm) {
            editClientForm.onsubmit = handleEditClientSubmit;
            console.log('✅ Event listener del formulario de edición de cliente configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario edit-client-form');
        }
        
        // Configurar formulario de edición de pedido
        const editOrderForm = document.getElementById('edit-order-form');
        if (editOrderForm) {
            editOrderForm.onsubmit = handleEditOrderSubmit;
            console.log('✅ Event listener del formulario de edición de pedido configurado');
        } else {
            console.warn('⚠️ No se encontró el formulario edit-order-form');
        }
        
        // Configurar cierre de modales
        const closeModalBtns = document.querySelectorAll('.close-modal');
        console.log(`🔍 Encontrados ${closeModalBtns.length} botones de cerrar modal`);
        closeModalBtns.forEach(btn => {
            btn.onclick = function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    // Limpiar estilos inline forzados
                    modal.style.cssText = '';
                    console.log('✅ Modal cerrado');
                }
            };
        });
        
        // Configurar cierre de modales al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
                // Limpiar estilos inline forzados
                e.target.style.cssText = '';
                console.log('✅ Modal cerrado al hacer clic fuera');
            }
        });
        
        // Configuración específica para el modal de nuevo usuario
        const newUserModal = document.getElementById('new-user-modal');
        if (newUserModal) {
            console.log('🔧 Configurando eventos específicos para modal de nuevo usuario...');
            
            // Configurar todos los botones de cierre del modal de nuevo usuario
            const closeButtons = newUserModal.querySelectorAll('.close-modal, .cancel-btn');
            console.log(`🔍 Encontrados ${closeButtons.length} botones de cierre en modal de nuevo usuario`);
            
            closeButtons.forEach(btn => {
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🔧 Cerrando modal de nuevo usuario...');
                    
                    newUserModal.classList.remove('active');
                    newUserModal.style.cssText = 'display: none !important;';
                    
                    // Limpiar formulario
                    const form = newUserModal.querySelector('#new-user-form');
                    if (form) {
                        form.reset();
                    }
                    
                    console.log('✅ Modal de nuevo usuario cerrado exitosamente');
                };
            });
            
            // Configurar cierre al hacer clic fuera del modal
            newUserModal.onclick = function(e) {
                if (e.target === newUserModal) {
                    console.log('🔧 Cerrando modal de nuevo usuario (clic fuera)...');
                    newUserModal.classList.remove('active');
                    newUserModal.style.cssText = 'display: none !important;';
                    
                    // Limpiar formulario
                    const form = newUserModal.querySelector('#new-user-form');
                    if (form) {
                        form.reset();
                    }
                    
                    console.log('✅ Modal de nuevo usuario cerrado exitosamente (clic fuera)');
                }
            };
            
            console.log('✅ Eventos específicos del modal de nuevo usuario configurados');
        } else {
            console.warn('⚠️ Modal de nuevo usuario no encontrado para configurar eventos');
        }
        
        console.log('✅ Configuración de formularios completada');
    } catch (error) {
        console.error('❌ Error configurando formularios:', error);
    }
}

// Funciones para manejar productos en pedidos
function setupOrderProductHandlers() {
    const addProductBtn = document.getElementById('add-product-btn');
    const productSelector = document.getElementById('product-selector');
    const confirmAddBtn = document.getElementById('confirm-add-product');
    const cancelAddBtn = document.getElementById('cancel-add-product');
    const productSelect = document.getElementById('product-select');
    const productPrice = document.getElementById('product-price');

    if (addProductBtn) {
        addProductBtn.onclick = function() {
            productSelector.style.display = 'block';
            populateProductSelect();
            this.style.display = 'none';
        };
    }

    if (confirmAddBtn) {
        confirmAddBtn.onclick = function() {
            addProductToOrder();
        };
    }

    if (cancelAddBtn) {
        cancelAddBtn.onclick = function() {
            cancelAddProduct();
        };
    }

    if (productSelect) {
        productSelect.onchange = function() {
            const selectedProduct = products.find(p => p.id == this.value);
            if (selectedProduct) {
                productPrice.value = selectedProduct.precio;
            } else {
                productPrice.value = '';
            }
        };
    }
}

function populateProductSelect() {
    const productSelect = document.getElementById('product-select');
    if (!productSelect) return;

    productSelect.innerHTML = '<option value="">Seleccione un producto</option>';
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.nombre} - ${formatCurrency(product.precio)}`;
        productSelect.appendChild(option);
    });
}

function addProductToOrder() {
    const productId = document.getElementById('product-select').value;
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const price = parseFloat(document.getElementById('product-price').value);

    if (!productId || !quantity || !price || quantity <= 0 || price <= 0) {
        showNotification('Por favor complete todos los campos correctamente', 'error');
        return;
    }

    // Verificar si el producto ya está en el pedido
    const existingItemIndex = orderItems.findIndex(item => item.producto_id == productId);
    if (existingItemIndex !== -1) {
        showNotification('Este producto ya está agregado al pedido', 'error');
        return;
    }

    const selectedProduct = products.find(p => p.id == productId);
    const subtotal = quantity * price;

    const orderItem = {
        producto_id: productId,
        producto_nombre: selectedProduct.nombre,
        cantidad: quantity,
        precio: price,
        subtotal: subtotal
    };

    orderItems.push(orderItem);
    renderOrderProducts();
    updateOrderTotal();
    cancelAddProduct();
    
    showNotification('Producto agregado al pedido', 'success');
}

function cancelAddProduct() {
    const productSelector = document.getElementById('product-selector');
    const addProductBtn = document.getElementById('add-product-btn');
    
    productSelector.style.display = 'none';
    addProductBtn.style.display = 'inline-flex';
    
    // Limpiar campos
    document.getElementById('product-select').value = '';
    document.getElementById('product-quantity').value = '1';
    document.getElementById('product-price').value = '';
}

function renderOrderProducts() {
    const productsList = document.getElementById('order-products-list');
    const noProductsMessage = document.getElementById('no-products-message');
    const submitBtn = document.getElementById('submit-order-btn');

    // Validar que los elementos existan (el modal podría estar cerrado)
    if (!productsList || !noProductsMessage || !submitBtn) {
        console.log('⚠️ Elementos del modal de pedido no encontrados, probablemente el modal está cerrado');
        return;
    }

    if (orderItems.length === 0) {
        noProductsMessage.style.display = 'block';
        submitBtn.disabled = true;
        return;
    }

    noProductsMessage.style.display = 'none';
    submitBtn.disabled = false;

    const productsTable = `
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead style="background: #f9fafb;">
                    <tr>
                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Producto</th>
                        <th style="padding: 0.75rem; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Cantidad</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Precio Unit.</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Subtotal</th>
                        <th style="padding: 0.75rem; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderItems.map((item, index) => `
                        <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">${item.producto_nombre}</td>
                            <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.cantidad}</td>
                            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${formatCurrency(item.precio)}</td>
                            <td style="padding: 0.75rem; text-align: right; font-weight: 600; color: #10b981; border-bottom: 1px solid #e5e7eb;">${formatCurrency(item.subtotal)}</td>
                            <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">
                                <button type="button" onclick="removeProductFromOrder(${index})" class="btn-icon" style="color: #ef4444;" title="Eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    productsList.innerHTML = productsTable;
}

function removeProductFromOrder(index) {
    if (confirm('¿Está seguro de que desea eliminar este producto del pedido?')) {
        orderItems.splice(index, 1);
        renderOrderProducts();
        updateOrderTotal();
        showNotification('Producto eliminado del pedido', 'success');
    }
}

function updateOrderTotal() {
    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    const orderTotalElement = document.getElementById('order-total');
    if (orderTotalElement) {
        orderTotalElement.textContent = formatCurrency(total);
    } else {
        console.log('⚠️ Elemento order-total no encontrado, probablemente el modal está cerrado');
    }
}

function clearOrderItems() {
    orderItems = [];
    renderOrderProducts();
    updateOrderTotal();
}

// Función para mostrar modales con debugging mejorado
function showModal(modalId) {
    try {
        debugLog('MODAL', `Intentando mostrar modal: ${modalId}`);
        
        // Verificar que modalId sea válido
        if (!modalId || typeof modalId !== 'string') {
            throw new Error(`ID de modal inválido: ${modalId}`);
        }
        
        const modal = document.getElementById(modalId);
        if (!modal) {
            throw new Error(`No se encontró el modal con ID: ${modalId}`);
        }
        
        debugLog('MODAL', `Modal encontrado: ${modalId}`, {
            element: modal,
            currentDisplay: modal.style.display,
            classList: Array.from(modal.classList)
        });
        
        // Verificar que el modal tenga la clase correcta
        if (!modal.classList.contains('modal')) {
            console.warn(`⚠️ El elemento ${modalId} no tiene la clase 'modal'`);
        }
        
        // Mostrar el modal usando la clase active (para que funcione con las transiciones CSS)
        modal.classList.add('active');
        debugLog('MODAL', `Modal ${modalId} mostrado exitosamente`);
        
        // Configuraciones específicas por modal
        if (modalId === 'new-client-modal') {
            debugLog('MODAL', 'Configurando modal de nuevo cliente...');
            try {
                setupProvinceAndCityListeners();
                debugLog('MODAL', 'Configuración de provincia/ciudad completada');
            } catch (error) {
                console.error('❌ Error al configurar modal de nuevo cliente:', error);
                throw error;
            }
        } else if (modalId === 'new-order-modal' || modalId === 'new-payment-modal' || modalId === 'new-contact-modal') {
            debugLog('MODAL', `Configurando selects de clientes para ${modalId}...`);
            try {
                populateClientSelects(modalId);
                debugLog('MODAL', `Selects de clientes configurados para ${modalId}`);
                
                // Configuración específica para el modal de nuevo pedido
                if (modalId === 'new-order-modal') {
                    clearOrderItems(); // Limpiar productos del pedido anterior
                    setupOrderProductHandlers(); // Configurar manejadores de productos
                    debugLog('MODAL', 'Modal de nuevo pedido configurado con productos');
                }
            } catch (error) {
                console.error('❌ Error al cargar lista de clientes:', error);
                throw error;
            }
        } else if (modalId === 'edit-order-modal') {
            debugLog('MODAL', `Configurando selects de clientes para ${modalId}...`);
            try {
                populateClientSelects(modalId);
                clearEditOrderItems(); // Limpiar productos del pedido anterior
                setupEditOrderProductHandlers(); // Configurar manejadores de productos
                debugLog('MODAL', `Selects de clientes configurados para ${modalId}`);
                debugLog('MODAL', 'Modal de editar pedido configurado con productos');
            } catch (error) {
                console.error('❌ Error al cargar lista de clientes:', error);
                throw error;
            }
        }
        
        debugLog('MODAL', `Modal ${modalId} configurado completamente`);
        
    } catch (error) {
        console.error(`🚨 ERROR EN showModal(${modalId}):`, error);
        console.trace('Stack trace del error en showModal:');
        showNotification(`Error al abrir modal: ${error.message}`, 'error');
        
        // Intentar diagnóstico adicional
        console.log('🔍 DIAGNÓSTICO DEL ERROR:');
        console.log('- Todos los modales en el DOM:', document.querySelectorAll('.modal'));
        console.log('- Modal específico buscado:', document.getElementById(modalId));
        console.log('- Estado actual del DOM:', document.readyState);
        
        throw error;
    }
}

// Función para poblar los selects de clientes
function populateClientSelects(modalId) {
    let selectId = '';
    
    switch(modalId) {
        case 'new-order-modal':
            selectId = 'order-client-select';
            break;
        case 'new-payment-modal':
            selectId = 'payment-client-select';
            break;
        case 'new-contact-modal':
            selectId = 'contact-client-select';
            break;
        case 'edit-order-modal':
            selectId = 'edit-order-client-select';
            break;
        default:
            return;
    }
    
    const clientSelect = document.getElementById(selectId);
    if (!clientSelect) {
        console.warn(`⚠️ No se encontró el select ${selectId}`);
        return;
    }
    
    // Limpiar opciones existentes
    clientSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
    
    // Agregar clientes
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.nombre;
        clientSelect.appendChild(option);
    });
    
    console.log(`✅ Select ${selectId} poblado con ${clients.length} clientes`);
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
        cuit: formData.get('documento') || document.getElementById('client-rut-input').value,
        email: formData.get('email') || document.getElementById('client-email-input').value,
        telefono: formData.get('telefono') || document.getElementById('client-phone-input').value,
        direccion: formData.get('direccion') || document.getElementById('client-address-input').value,
        provincia: formData.get('provincia') || document.getElementById('client-province-input').value,
        ciudad: formData.get('ciudad') || document.getElementById('client-city-input').value,
        localidad: formData.get('localidad') || document.getElementById('client-locality-input').value,
        codigo_postal: formData.get('codigo_postal') || document.getElementById('client-zip-input').value
    };
    
    debugLog('FORM', 'Datos del cliente a enviar:', clientData);
    
    // Validar que los campos requeridos no estén vacíos
    const requiredFields = ['nombre', 'cuit', 'email', 'telefono', 'direccion'];
    const missingFields = requiredFields.filter(field => !clientData[field] || clientData[field].trim() === '');
    
    if (missingFields.length > 0) {
        console.error('❌ Campos requeridos faltantes:', missingFields);
        showNotification(`Campos requeridos faltantes: ${missingFields.join(', ')}`, 'error');
        return;
    }
    
    // Validar que no exista un cliente con el mismo documento
    const existingClient = clients.find(client => client.cuit === clientData.cuit.trim());
    if (existingClient) {
        showNotification(`Ya existe un cliente con el documento ${clientData.cuit}. Cliente: ${existingClient.nombre}`, 'error');
        return;
    }
    
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', 'Enviando petición POST a /api/clientes');
        debugLog('HTTP', 'Token de autorización:', token ? 'Presente' : 'Ausente');
        debugLog('HTTP', 'Cuerpo de la petición:', JSON.stringify(clientData, null, 2));
        
        const response = await fetch('/api/clientes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });
        
        debugLog('HTTP', 'Respuesta recibida:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        });
        
        if (response.ok) {
            showNotification('Cliente creado exitosamente', 'success');
            document.getElementById('new-client-modal').classList.remove('active');
            e.target.reset();
            await loadClients(); // Recargar la lista
        } else {
            console.error('❌ Error del servidor al crear cliente:', response.status, response.statusText);
            try {
                const errorData = await response.json();
                console.error('❌ Detalles del error:', errorData);
                showNotification(errorData.message || `Error del servidor: ${response.status}`, 'error');
            } catch (parseError) {
                console.error('❌ No se pudo parsear la respuesta de error:', parseError);
                const errorText = await response.text();
                console.error('❌ Respuesta del servidor:', errorText);
                showNotification(`Error del servidor: ${response.status} - ${response.statusText}`, 'error');
            }
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

// Función para manejar envío de nuevo pedido
async function handleNewOrderSubmit(e) {
    e.preventDefault();
    
    const clientId = document.getElementById('order-client-select').value;
    const description = document.getElementById('order-description').value;
    
    // Validar que hay productos en el pedido
    if (orderItems.length === 0) {
        showNotification('Debe agregar al menos un producto al pedido', 'error');
        return;
    }
    
    // Calcular el monto total
    const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    const orderData = {
        cliente_id: clientId,
        descripcion: description,
        monto: totalAmount,
        estado: 'active', // Cambiar a 'active' para compatibilidad con BD actual
        items: orderItems.map(item => ({
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            precio: item.precio
        }))
    };
    
    debugLog('ORDER', 'Datos del pedido a enviar:', orderData);
    
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/pedidos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            showNotification('Pedido creado exitosamente', 'success');
            clearOrderItems(); // Limpiar productos antes de cerrar el modal
            document.getElementById('new-order-modal').classList.remove('active');
            e.target.reset();
            await loadOrders();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error al crear pedido', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al crear pedido', 'error');
    }
}

// Función para manejar envío de nuevo pago
async function handleNewPaymentSubmit(e) {
    e.preventDefault();
    
    const paymentData = {
        cliente_id: document.getElementById('payment-client-select').value,
        monto: parseFloat(document.getElementById('payment-amount').value),
        metodo: document.getElementById('payment-method').value,
        referencia: document.getElementById('payment-reference').value
    };
    
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/pagos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });
        
        if (response.ok) {
            showNotification('Pago registrado exitosamente', 'success');
            document.getElementById('new-payment-modal').classList.remove('active');
            e.target.reset();
            await loadPayments();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error al registrar pago', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al registrar pago', 'error');
    }
}

// Función para manejar envío de nuevo contacto
async function handleNewContactSubmit(e) {
    e.preventDefault();
    
    const contactData = {
        cliente_id: document.getElementById('contact-client-select').value,
        nombre: document.getElementById('contact-name-input').value,
        email: document.getElementById('contact-email-input').value,
        telefono: document.getElementById('contact-phone-input').value,
        cargo: document.getElementById('contact-position-input').value,
        departamento: document.getElementById('contact-department-input').value
    };
    
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/contactos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        if (response.ok) {
            showNotification('Contacto creado exitosamente', 'success');
            document.getElementById('new-contact-modal').classList.remove('active');
            e.target.reset();
            await loadContacts();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error al crear contacto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al crear contacto', 'error');
    }
}

// Función para manejar envío de nuevo producto
async function handleNewProductSubmit(e) {
    e.preventDefault();
    
    const productData = {
        nombre: document.getElementById('product-name-input').value,
        descripcion: document.getElementById('product-description-input').value,
        precio: parseFloat(document.getElementById('product-price-input').value),
        stock: parseInt(document.getElementById('product-stock-input').value)
    };
    
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (response.ok) {
            showNotification('Producto creado exitosamente', 'success');
            document.getElementById('new-product-modal').classList.remove('active');
            e.target.reset();
            await loadProducts();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error al crear producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al crear producto', 'error');
    }
}

// Función para manejar envío de nuevo usuario
async function handleNewUserSubmit(e) {
    e.preventDefault();
    
    const userData = {
        nombre: document.getElementById('new-user-nombre').value,
        email: document.getElementById('new-user-email').value,
        perfil: document.getElementById('new-user-perfil').value,
        password: document.getElementById('new-user-password').value
    };
    
    debugLog('FORM', 'Datos del usuario a enviar:', { ...userData, password: '[OCULTA]' });
    
    // Validar que los campos requeridos no estén vacíos
    const requiredFields = ['nombre', 'email', 'perfil', 'password'];
    const missingFields = requiredFields.filter(field => !userData[field] || userData[field].trim() === '');
    
    if (missingFields.length > 0) {
        console.error('❌ Campos requeridos faltantes:', missingFields);
        showNotification(`Campos requeridos faltantes: ${missingFields.join(', ')}`, 'error');
        return;
    }
    
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', 'Enviando petición POST a /api/usuarios');
        
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            const result = await response.json();
            showNotification('Usuario creado exitosamente', 'success');
            document.getElementById('new-user-modal').classList.remove('active');
            e.target.reset();
            await loadUsersForAdmin(); // Recargar la lista de usuarios
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor al crear usuario:', response.status, errorData);
            showNotification(errorData.error || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

// Funciones de edición y eliminación
function editClient(clientId) {
    console.log('Editar cliente:', clientId);
    
    // Buscar el cliente en el array
    const client = clients.find(c => c.id == clientId);
    if (!client) {
        showNotification('Cliente no encontrado', 'error');
        return;
    }
    
    // Llenar el formulario de edición con los datos del cliente
    document.getElementById('edit-client-name').value = client.nombre || '';
    document.getElementById('edit-client-cuit').value = client.cuit || client.documento || '';
    document.getElementById('edit-client-email').value = client.email || '';
    document.getElementById('edit-client-phone').value = client.telefono || '';
    document.getElementById('edit-client-address').value = client.direccion || '';
    document.getElementById('edit-client-province').value = client.provincia || '';
    document.getElementById('edit-client-city').value = client.ciudad || '';
    document.getElementById('edit-client-locality').value = client.localidad || '';
    document.getElementById('edit-client-zip').value = client.codigo_postal || '';
    
    // Actualizar ciudades y localidades si hay provincia seleccionada
    if (client.provincia) {
        actualizarCiudades(client.provincia, 'edit-client-city');
        if (client.ciudad) {
            setTimeout(() => {
                document.getElementById('edit-client-city').value = client.ciudad;
                actualizarLocalidades(client.provincia, client.ciudad, 'edit-client-locality');
                setTimeout(() => {
                    document.getElementById('edit-client-locality').value = client.localidad || '';
                }, 100);
            }, 100);
        }
    }
    
    // Guardar el ID del cliente que se está editando
    document.getElementById('edit-client-modal').setAttribute('data-client-id', clientId);
    
    // Mostrar el modal
    showModal('edit-client-modal');
}

function deleteClient(clientId) {
    // Buscar el cliente para mostrar información en la confirmación
    const client = clients.find(c => c.id == clientId);
    if (!client) {
        showNotification('Cliente no encontrado', 'error');
        return;
    }
    
    // Mostrar confirmación con información del cliente
    const confirmMessage = `¿Está seguro de que desea eliminar este cliente?\n\nNombre: ${client.nombre}\nDocumento: ${client.cuit || client.documento || 'N/A'}\nEmail: ${client.email || 'N/A'}\n\nEsta acción no se puede deshacer y solo es posible si el cliente no tiene pedidos o pagos asociados.`;
    
    if (confirm(confirmMessage)) {
        deleteClientFromServer(clientId);
    }
}

async function deleteClientFromServer(clientId) {
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', `Enviando petición DELETE a /api/clientes/${clientId}`);
        
        const response = await fetch(`/api/clientes/${clientId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Cliente eliminado exitosamente', 'success');
            await loadClients(); // Recargar la lista
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor al eliminar cliente:', response.status, errorData);
            showNotification(errorData.error || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

function editOrder(orderId) {
    console.log('Editar pedido:', orderId);
    
    // Buscar el pedido en el array
    const order = orders.find(o => o.id == orderId);
    if (!order) {
        showNotification('Pedido no encontrado', 'error');
        return;
    }
    
    // Guardar el ID del pedido en el modal para usarlo al guardar
    document.getElementById('edit-order-modal').setAttribute('data-order-id', orderId);
    
    // Poblar el select de clientes primero
    populateClientSelects('edit-order-modal');
    
    // Llenar el modal con los datos del pedido (después de poblar el select)
    setTimeout(() => {
        document.getElementById('edit-order-client-select').value = order.cliente_id;
        document.getElementById('edit-order-description').value = order.descripcion;
        document.getElementById('edit-order-status').value = order.estado;
        
        // Deshabilitar el campo cliente para evitar cambios accidentales
        document.getElementById('edit-order-client-select').disabled = true;
        document.getElementById('edit-order-client-select').style.backgroundColor = '#f3f4f6';
        document.getElementById('edit-order-client-select').style.cursor = 'not-allowed';
    }, 100);
    
    // Cargar los productos del pedido
    loadEditOrderItems(orderId);
    
    // Mostrar el modal
    showModal('edit-order-modal');
}

// Función para cargar los productos de un pedido específico para edición
async function loadEditOrderItems(orderId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/pedidos/${orderId}/items`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const items = await response.json();
            editOrderItems = items.map(item => ({
                producto_id: item.producto_id,
                producto_nombre: item.producto_nombre,
                cantidad: item.cantidad,
                precio: parseFloat(item.precio),
                subtotal: item.cantidad * parseFloat(item.precio)
            }));
            
            renderEditOrderProducts();
            updateEditOrderTotal();
            debugLog('EDIT_ORDER', `Productos cargados para pedido ${orderId}:`, editOrderItems);
        } else {
            console.error('Error cargando items del pedido:', response.statusText);
            editOrderItems = [];
            renderEditOrderProducts();
            updateEditOrderTotal();
        }
    } catch (error) {
        console.error('Error cargando items del pedido:', error);
        editOrderItems = [];
        renderEditOrderProducts();
        updateEditOrderTotal();
    }
}

function deleteOrder(orderId) {
    // Buscar el pedido para mostrar información en la confirmación
    const order = orders.find(o => o.id == orderId);
    if (!order) {
        showNotification('Pedido no encontrado', 'error');
        return;
    }
    
    // Mostrar confirmación con información del pedido
    const confirmMessage = `¿Está seguro de que desea eliminar este pedido?\n\nPedido: #${order.numero_pedido}\nMonto: ${formatCurrency(order.monto)}\nCliente: ${order.cliente_nombre || 'N/A'}\n\nEsta acción no se puede deshacer.`;
    
    if (confirm(confirmMessage)) {
        deleteOrderFromServer(orderId);
    }
}

async function deleteOrderFromServer(orderId) {
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', `Enviando petición DELETE a /api/pedidos/${orderId}`);
        
        const response = await fetch(`/api/pedidos/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Pedido eliminado exitosamente', 'success');
            await loadOrders(); // Recargar la lista
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor al eliminar pedido:', response.status, errorData);
            showNotification(errorData.message || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

function editPayment(paymentId) {
    console.log('Editar pago:', paymentId);
    
    // Buscar el pago en el array
    const payment = payments.find(p => p.id == paymentId);
    if (!payment) {
        showNotification('Pago no encontrado', 'error');
        return;
    }
    
    // Crear modal de edición dinámicamente
    const editModal = document.createElement('div');
    editModal.className = 'modal active';
    editModal.style.cssText = `
        display: flex !important;
        z-index: 12000 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
    `;
    
    editModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; z-index: 12001 !important;">
            <div class="modal-header">
                <h2 class="modal-title">Editar Pago</h2>
                <button class="close-modal btn btn-secondary" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-payment-form-${payment.id}">
                <div class="mb-4">
                    <label for="edit-payment-client-${payment.id}">Cliente</label>
                    <select id="edit-payment-client-${payment.id}" class="input" required disabled style="background-color: #f3f4f6; color: #6b7280;">
                        <option value="">Seleccione un cliente</option>
                    </select>
                    <small style="color: #6b7280; font-size: 0.875rem;">El cliente no puede modificarse una vez creado el pago</small>
                </div>
                <div class="mb-4">
                    <label for="edit-payment-amount-${payment.id}">Monto</label>
                    <input type="number" id="edit-payment-amount-${payment.id}" class="input" step="0.01" value="${payment.monto}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-payment-method-${payment.id}">Método de Pago</label>
                    <select id="edit-payment-method-${payment.id}" class="input" required>
                        <option value="efectivo" ${payment.metodo === 'efectivo' ? 'selected' : ''}>Efectivo</option>
                        <option value="transferencia" ${payment.metodo === 'transferencia' ? 'selected' : ''}>Transferencia</option>
                        <option value="tarjeta" ${payment.metodo === 'tarjeta' ? 'selected' : ''}>Tarjeta</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="edit-payment-reference-${payment.id}">Referencia</label>
                    <input type="text" id="edit-payment-reference-${payment.id}" class="input" value="${payment.referencia || ''}" required>
                </div>
                <div class="flex justify-between">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(editModal);
    
    // Poblar select de clientes y preseleccionar el cliente actual
    const clientSelect = document.getElementById(`edit-payment-client-${payment.id}`);
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.nombre;
        if (client.id == payment.cliente_id) {
            option.selected = true;
        }
        clientSelect.appendChild(option);
    });
    
    // Manejar envío del formulario
    document.getElementById(`edit-payment-form-${payment.id}`).addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const paymentData = {
            cliente_id: payment.cliente_id, // Usar el cliente_id original, no del select
            monto: parseFloat(document.getElementById(`edit-payment-amount-${payment.id}`).value),
            metodo: document.getElementById(`edit-payment-method-${payment.id}`).value,
            referencia: document.getElementById(`edit-payment-reference-${payment.id}`).value
        };
        
        try {
            const token = localStorage.getItem('authToken');
            
            const response = await fetch(`/api/pagos/${payment.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });
            
            if (response.ok) {
                showNotification('Pago actualizado exitosamente', 'success');
                editModal.remove();
                await loadPayments();
            } else {
                const errorData = await response.json();
                showNotification(errorData.message || 'Error al actualizar pago', 'error');
            }
        } catch (error) {
            showNotification(`Error de conexión: ${error.message}`, 'error');
        }
    });
}

function deletePayment(paymentId) {
    // Buscar el pago para mostrar información en la confirmación
    const payment = payments.find(p => p.id == paymentId);
    if (!payment) {
        showNotification('Pago no encontrado', 'error');
        return;
    }
    
    // Mostrar confirmación con información del pago
    const confirmMessage = `¿Está seguro de que desea eliminar este pago?\n\nMonto: ${formatCurrency(payment.monto)}\nMétodo: ${payment.metodo}\nCliente: ${payment.cliente_nombre || 'N/A'}\nReferencia: ${payment.referencia || 'N/A'}\n\nEsta acción no se puede deshacer.`;
    
    if (confirm(confirmMessage)) {
        deletePaymentFromServer(paymentId);
    }
}

async function deletePaymentFromServer(paymentId) {
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', `Enviando petición DELETE a /api/pagos/${paymentId}`);
        
        const response = await fetch(`/api/pagos/${paymentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Pago eliminado exitosamente', 'success');
            await loadPayments(); // Recargar la lista
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor al eliminar pago:', response.status, errorData);
            showNotification(errorData.error || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

function viewProductDetails(productId) {
    console.log('Ver detalles del producto:', productId);
    
    const product = products.find(p => p.id == productId);
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal active';
    detailsModal.style.cssText = `
        display: flex !important;
        z-index: 12000 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
    `;
    
    detailsModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; z-index: 12001 !important;">
            <div class="modal-header">
                <h2 class="modal-title">Detalles del Producto</h2>
                <button class="close-modal btn btn-secondary" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 1rem;">
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 1rem 0; color: #1f2937;">Información del Producto</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <strong>Nombre:</strong><br>
                            ${product.nombre}
                        </div>
                        <div>
                            <strong>Precio:</strong><br>
                            ${formatCurrency(product.precio)}
                        </div>
                        <div>
                            <strong>Stock:</strong><br>
                            ${product.stock || 0} unidades
                        </div>
                        <div>
                            <strong>Estado:</strong><br>
                            <span style="color: ${product.stock > 0 ? '#10b981' : '#ef4444'};">
                                ${product.stock > 0 ? 'Disponible' : 'Sin stock'}
                            </span>
                        </div>
                    </div>
                    ${product.descripcion ? `
                        <div style="margin-top: 1rem;">
                            <strong>Descripción:</strong><br>
                            ${product.descripcion}
                        </div>
                    ` : ''}
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="editProduct(${product.id}); this.closest('.modal').remove();" style="background: #4f46e5; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-edit"></i> Editar Producto
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()" style="background: #6b7280; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(detailsModal);
}

function editProduct(productId) {
    console.log('Editar producto:', productId);
    
    // Buscar el producto en el array
    const product = products.find(p => p.id == productId);
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Crear modal de edición dinámicamente
    const editModal = document.createElement('div');
    editModal.className = 'modal active';
    editModal.style.cssText = `
        display: flex !important;
        z-index: 12000 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
    `;
    
    editModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; z-index: 12001 !important;">
            <div class="modal-header">
                <h2 class="modal-title">Editar Producto</h2>
                <button class="close-modal btn btn-secondary" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-product-form-${product.id}">
                <div class="mb-4">
                    <label for="edit-product-name-${product.id}">Nombre del Producto</label>
                    <input type="text" id="edit-product-name-${product.id}" class="input" value="${product.nombre}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-product-description-${product.id}">Descripción</label>
                    <textarea id="edit-product-description-${product.id}" class="input" rows="3">${product.descripcion || ''}</textarea>
                </div>
                <div class="mb-4">
                    <label for="edit-product-price-${product.id}">Precio</label>
                    <input type="number" id="edit-product-price-${product.id}" class="input" step="0.01" value="${product.precio}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-product-stock-${product.id}">Stock</label>
                    <input type="number" id="edit-product-stock-${product.id}" class="input" min="0" value="${product.stock || 0}" required>
                </div>
                <div class="flex justify-between">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(editModal);
    
    // Manejar envío del formulario
    document.getElementById(`edit-product-form-${product.id}`).addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const productData = {
            nombre: document.getElementById(`edit-product-name-${product.id}`).value,
            descripcion: document.getElementById(`edit-product-description-${product.id}`).value,
            precio: parseFloat(document.getElementById(`edit-product-price-${product.id}`).value),
            stock: parseInt(document.getElementById(`edit-product-stock-${product.id}`).value)
        };
        
        try {
            const token = localStorage.getItem('authToken');
            
            const response = await fetch(`/api/productos/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
            
            if (response.ok) {
                showNotification('Producto actualizado exitosamente', 'success');
                editModal.remove();
                await loadProducts();
            } else {
                const errorData = await response.json();
                showNotification(errorData.message || 'Error al actualizar producto', 'error');
            }
        } catch (error) {
            showNotification(`Error de conexión: ${error.message}`, 'error');
        }
    });
}

function deleteProduct(productId) {
    // Buscar el producto para mostrar información en la confirmación
    const product = products.find(p => p.id == productId);
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Mostrar confirmación con información del producto
    const confirmMessage = `¿Está seguro de que desea eliminar este producto?\n\nNombre: ${product.nombre}\nPrecio: ${formatCurrency(product.precio)}\nStock: ${product.stock || 0}\nDescripción: ${product.descripcion || 'N/A'}\n\nEsta acción no se puede deshacer.`;
    
    if (confirm(confirmMessage)) {
        deleteProductFromServer(productId);
    }
}

async function deleteProductFromServer(productId) {
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', `Enviando petición DELETE a /api/productos/${productId}`);
        
        const response = await fetch(`/api/productos/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Producto eliminado exitosamente', 'success');
            await loadProducts(); // Recargar la lista
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor al eliminar producto:', response.status, errorData);
            showNotification(errorData.error || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

function editContact(contactId) {
    console.log('Editar contacto:', contactId);
    
    // Buscar el contacto en el array
    const contact = contacts.find(c => c.id == contactId);
    if (!contact) {
        showNotification('Contacto no encontrado', 'error');
        return;
    }
    
    // Crear modal de edición dinámicamente
    const editModal = document.createElement('div');
    editModal.className = 'modal active';
    editModal.style.cssText = `
        display: flex !important;
        z-index: 12000 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
    `;
    
    editModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; z-index: 12001 !important;">
            <div class="modal-header">
                <h2 class="modal-title">Editar Contacto</h2>
                <button class="close-modal btn btn-secondary" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-contact-form-${contact.id}">
                <div class="mb-4">
                    <label for="edit-contact-client-${contact.id}">Cliente</label>
                    <select id="edit-contact-client-${contact.id}" class="input" required disabled style="background-color: #f3f4f6; color: #6b7280;">
                        <option value="">Seleccione un cliente</option>
                    </select>
                    <small style="color: #6b7280; font-size: 0.875rem;">El cliente no puede modificarse una vez creado el contacto</small>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-name-${contact.id}">Nombre Completo</label>
                    <input type="text" id="edit-contact-name-${contact.id}" class="input" value="${contact.nombre}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-email-${contact.id}">Email</label>
                    <input type="email" id="edit-contact-email-${contact.id}" class="input" value="${contact.email}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-phone-${contact.id}">Teléfono</label>
                    <input type="tel" id="edit-contact-phone-${contact.id}" class="input" value="${contact.telefono || ''}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-position-${contact.id}">Cargo</label>
                    <input type="text" id="edit-contact-position-${contact.id}" class="input" value="${contact.cargo || ''}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-department-${contact.id}">Departamento</label>
                    <input type="text" id="edit-contact-department-${contact.id}" class="input" value="${contact.departamento || ''}">
                </div>
                <div class="flex justify-between">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(editModal);
    
    // Poblar select de clientes y preseleccionar el cliente actual
    const clientSelect = document.getElementById(`edit-contact-client-${contact.id}`);
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.nombre;
        if (client.id == contact.cliente_id) {
            option.selected = true;
        }
        clientSelect.appendChild(option);
    });
    
    // Manejar envío del formulario
    document.getElementById(`edit-contact-form-${contact.id}`).addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const contactData = {
            cliente_id: contact.cliente_id, // Usar el cliente_id original, no del select
            nombre: document.getElementById(`edit-contact-name-${contact.id}`).value,
            email: document.getElementById(`edit-contact-email-${contact.id}`).value,
            telefono: document.getElementById(`edit-contact-phone-${contact.id}`).value,
            cargo: document.getElementById(`edit-contact-position-${contact.id}`).value,
            departamento: document.getElementById(`edit-contact-department-${contact.id}`).value
        };
        
        try {
            const token = localStorage.getItem('authToken');
            
            const response = await fetch(`/api/contactos/${contact.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
            
            if (response.ok) {
                showNotification('Contacto actualizado exitosamente', 'success');
                editModal.remove();
                await loadContacts();
            } else {
                const errorData = await response.json();
                showNotification(errorData.message || 'Error al actualizar contacto', 'error');
            }
        } catch (error) {
            showNotification(`Error de conexión: ${error.message}`, 'error');
        }
    });
}

function viewContactDetails(contactId) {
    console.log('Ver detalles del contacto:', contactId);
    
    const contact = contacts.find(c => c.id == contactId);
    if (!contact) {
        showNotification('Contacto no encontrado', 'error');
        return;
    }
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal active';
    detailsModal.style.cssText = `
        display: flex !important;
        z-index: 12000 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
    `;
    
    detailsModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; z-index: 12001 !important;">
            <div class="modal-header">
                <h2 class="modal-title">Detalles del Contacto</h2>
                <button class="close-modal btn btn-secondary" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 1rem;">
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 1rem 0; color: #1f2937;">Información del Contacto</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <strong>Nombre:</strong><br>
                            ${contact.nombre}
                        </div>
                        <div>
                            <strong>Email:</strong><br>
                            ${contact.email}
                        </div>
                        <div>
                            <strong>Teléfono:</strong><br>
                            ${contact.telefono || 'N/A'}
                        </div>
                        <div>
                            <strong>Cargo:</strong><br>
                            ${contact.cargo || 'N/A'}
                        </div>
                        <div>
                            <strong>Departamento:</strong><br>
                            ${contact.departamento || 'N/A'}
                        </div>
                        <div>
                            <strong>Cliente:</strong><br>
                            ${contact.cliente_nombre || 'N/A'}
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="editContact(${contact.id}); this.closest('.modal').remove();" style="background: #4f46e5; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-edit"></i> Editar Contacto
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()" style="background: #6b7280; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(detailsModal);
}

function deleteContact(contactId) {
    // Buscar el contacto para mostrar información en la confirmación
    const contact = contacts.find(c => c.id == contactId);
    if (!contact) {
        showNotification('Contacto no encontrado', 'error');
        return;
    }
    
    // Mostrar confirmación con información del contacto
    const confirmMessage = `¿Está seguro de que desea eliminar este contacto?\n\nNombre: ${contact.nombre}\nEmail: ${contact.email}\nTeléfono: ${contact.telefono || 'N/A'}\nCargo: ${contact.cargo || 'N/A'}\nCliente: ${contact.cliente_nombre || 'N/A'}\n\nEsta acción no se puede deshacer.`;
    
    if (confirm(confirmMessage)) {
        deleteContactFromServer(contactId);
    }
}

async function deleteContactFromServer(contactId) {
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', `Enviando petición DELETE a /api/contactos/${contactId}`);
        
        const response = await fetch(`/api/contactos/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Contacto eliminado exitosamente', 'success');
            await loadContacts(); // Recargar la lista
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor al eliminar contacto:', response.status, errorData);
            showNotification(errorData.message || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

// Función para manejar la edición de cliente
async function handleEditClientSubmit(e) {
    e.preventDefault();
    
    const clientId = document.getElementById('edit-client-modal').getAttribute('data-client-id');
    if (!clientId) {
        showNotification('Error: ID de cliente no encontrado', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const clientData = {
        nombre: document.getElementById('edit-client-name').value,
        cuit: document.getElementById('edit-client-cuit').value,
        email: document.getElementById('edit-client-email').value,
        telefono: document.getElementById('edit-client-phone').value,
        direccion: document.getElementById('edit-client-address').value,
        provincia: document.getElementById('edit-client-province').value,
        ciudad: document.getElementById('edit-client-city').value,
        localidad: document.getElementById('edit-client-locality').value,
        codigo_postal: document.getElementById('edit-client-zip').value
    };
    
    debugLog('FORM', 'Datos del cliente a actualizar:', clientData);
    
    // Validar que los campos requeridos no estén vacíos
    const requiredFields = ['nombre', 'cuit', 'email', 'telefono', 'direccion'];
    const missingFields = requiredFields.filter(field => !clientData[field] || clientData[field].trim() === '');
    
    if (missingFields.length > 0) {
        console.error('❌ Campos requeridos faltantes:', missingFields);
        showNotification(`Campos requeridos faltantes: ${missingFields.join(', ')}`, 'error');
        return;
    }
    
    // Validar que no exista otro cliente con el mismo documento (excepto el cliente actual)
    const existingClient = clients.find(client => client.cuit === clientData.cuit.trim() && client.id !== parseInt(clientId));
    if (existingClient) {
        showNotification(`Ya existe otro cliente con el documento ${clientData.cuit}. Cliente: ${existingClient.nombre}`, 'error');
        return;
    }
    
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', `Enviando petición PUT a /api/clientes/${clientId}`);
        
        const response = await fetch(`/api/clientes/${clientId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });
        
        if (response.ok) {
            showNotification('Cliente actualizado exitosamente', 'success');
            document.getElementById('edit-client-modal').classList.remove('active');
            await loadClients(); // Recargar la lista
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor al actualizar cliente:', response.status, errorData);
            showNotification(errorData.message || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

// Función para manejar la edición de pedido
async function handleEditOrderSubmit(e) {
    e.preventDefault();
    
    const orderId = document.getElementById('edit-order-modal').getAttribute('data-order-id');
    if (!orderId) {
        showNotification('Error: ID de pedido no encontrado', 'error');
        return;
    }

    // Habilitar temporalmente el campo cliente para obtener su valor
    const clientSelect = document.getElementById('edit-order-client-select');
    clientSelect.disabled = false;

    // Validar que hay productos en el pedido
    if (editOrderItems.length === 0) {
        showNotification('Debe tener al menos un producto en el pedido', 'error');
        // Volver a deshabilitar el campo cliente
        clientSelect.disabled = true;
        return;
    }

    // Calcular el monto total
    const totalAmount = editOrderItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    const orderData = {
        cliente_id: clientSelect.value,
        monto: totalAmount,
        descripcion: document.getElementById('edit-order-description').value,
        estado: document.getElementById('edit-order-status').value,
        items: editOrderItems.map(item => ({
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            precio: item.precio
        }))
    };
    
    debugLog('FORM', 'Datos del pedido a actualizar:', orderData);
    
    // Validar que los campos requeridos no estén vacíos
    if (!orderData.cliente_id || !orderData.descripcion || !orderData.estado) {
        showNotification('Todos los campos son requeridos', 'error');
        // Volver a deshabilitar el campo cliente
        clientSelect.disabled = true;
        return;
    }
    
    try {
        const token = localStorage.getItem('authToken');
        
        debugLog('HTTP', `Enviando petición PUT a /api/pedidos/${orderId}`);
        
        const response = await fetch(`/api/pedidos/${orderId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            showNotification('Pedido actualizado exitosamente', 'success');
            clearEditOrderItems(); // Limpiar productos antes de cerrar el modal
            document.getElementById('edit-order-modal').classList.remove('active');
            await loadOrders(); // Recargar la lista
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor al actualizar pedido:', response.status, errorData);
            showNotification(errorData.message || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error de red o conexión:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    } finally {
        // Volver a deshabilitar el campo cliente
        clientSelect.disabled = true;
    }
}

// Función para configurar botones del header con debugging mejorado
function setupHeaderButtons() {
    debugLog('BUTTONS', 'Iniciando configuración de botones del header...');
    
    try {
        // Lista de botones a configurar
        const buttonsConfig = [
            { id: 'new-client-btn', modal: 'new-client-modal', name: 'Nuevo Cliente (Header)' },
            { id: 'new-order-btn', modal: 'new-order-modal', name: 'Nuevo Pedido (Header)' },
            { id: 'new-payment-btn', modal: 'new-payment-modal', name: 'Nuevo Pago (Header)' },
            { id: 'new-order-btn-section', modal: 'new-order-modal', name: 'Nuevo Pedido (Sección)' },
            { id: 'new-payment-btn-section', modal: 'new-payment-modal', name: 'Nuevo Pago (Sección)' },
            { id: 'new-contact-btn-section', modal: 'new-contact-modal', name: 'Nuevo Contacto (Sección)' },
            { id: 'new-product-btn', modal: 'new-product-modal', name: 'Nuevo Producto' },
            { id: 'new-user-btn', modal: 'new-user-modal', name: 'Nuevo Usuario' }
        ];
        
        buttonsConfig.forEach(config => {
            try {
                debugLog('BUTTONS', `Configurando botón: ${config.name} (${config.id})`);
                
                const button = document.getElementById(config.id);
                if (!button) {
                    debugLog('BUTTONS', `⚠️ Botón no encontrado: ${config.id}`);
                    return;
                }
                
                debugLog('BUTTONS', `Botón encontrado: ${config.name}`, {
                    element: button,
                    tagName: button.tagName,
                    className: button.className,
                    innerHTML: button.innerHTML.substring(0, 50) + '...'
                });
                
                // Crear función onclick con manejo de errores específico para nuevo usuario
                if (config.id === 'new-user-btn') {
                    button.onclick = function() {
                        console.log('🔧 DEBUG: Botón Nuevo Usuario clickeado');
                        console.log('🔍 Verificando modal new-user-modal...');
                        
                        const modal = document.getElementById('new-user-modal');
                        console.log('📋 Modal existe:', !!modal);
                        console.log('📋 Modal classList:', modal ? Array.from(modal.classList) : 'N/A');
                        console.log('📋 Modal display:', modal ? modal.style.display : 'N/A');
                        console.log('📋 Modal computed display:', modal ? getComputedStyle(modal).display : 'N/A');
                        
                        if (modal) {
                            console.log('🎯 Aplicando clase active al modal...');
                            modal.classList.add('active');
                            console.log('✅ Clase active agregada');
                            console.log('📋 Modal classList después:', Array.from(modal.classList));
                            
                            // IMPORTANTE: Asegurar que el modal aparezca por encima del panel de administración
                            modal.style.cssText = `
                                display: flex !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                                z-index: 15000 !important;
                                position: fixed !important;
                                top: 0 !important;
                                left: 0 !important;
                                width: 100% !important;
                                height: 100% !important;
                                background-color: rgba(0, 0, 0, 0.7) !important;
                                align-items: center !important;
                                justify-content: center !important;
                            `;
                            
                            // También asegurar que el contenido del modal tenga z-index alto
                            const modalContent = modal.querySelector('.modal-content');
                            if (modalContent) {
                                modalContent.style.cssText = `
                                    z-index: 15001 !important;
                                    position: relative !important;
                                    background: white !important;
                                    padding: 2rem !important;
                                    border-radius: 8px !important;
                                    width: 90% !important;
                                    max-width: 500px !important;
                                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
                                `;
                            }
                            
                            console.log('✅ Modal forzado a aparecer por encima del panel de administración');
                            
                            // Verificar si el modal es visible después de agregar la clase
                            setTimeout(() => {
                                const computedStyle = getComputedStyle(modal);
                                console.log('🔍 Estilos computados después de 100ms:', {
                                    display: computedStyle.display,
                                    visibility: computedStyle.visibility,
                                    opacity: computedStyle.opacity,
                                    zIndex: computedStyle.zIndex
                                });
                            }, 100);
                        } else {
                            console.error('❌ Modal new-user-modal no encontrado en el DOM');
                            showNotification('Error: Modal de usuario no encontrado', 'error');
                        }
                    };
                } else {
                    // Para otros botones, usar la función normal
                    button.onclick = safeExecute(function() {
                        debugLog('CLICK', `Botón clickeado: ${config.name}`);
                        showModal(config.modal);
                    }, `Click ${config.name}`);
                }
                
                debugLog('BUTTONS', `✅ Botón configurado exitosamente: ${config.name}`);
                
            } catch (error) {
                console.error(`❌ Error configurando botón ${config.name}:`, error);
            }
        });
        
        // Verificar que todos los modales existan
        debugLog('BUTTONS', 'Verificando existencia de modales...');
        const modalIds = ['new-client-modal', 'new-order-modal', 'new-payment-modal', 'new-contact-modal', 'new-product-modal', 'new-user-modal'];
        modalIds.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                debugLog('BUTTONS', `✅ Modal encontrado: ${modalId}`);
            } else {
                console.warn(`⚠️ Modal no encontrado: ${modalId}`);
            }
        });
        
        // Configurar botón de volver al dashboard
        const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
        if (backToDashboardBtn) {
            backToDashboardBtn.onclick = function() {
                debugLog('CLICK', 'Volver al Dashboard clickeado');
                
                // Restaurar estilos normales del panel de administración
                const adminSection = document.getElementById('admin-profiles-section');
                if (adminSection) {
                    adminSection.style.cssText = 'display: none;';
                    console.log('✅ Estilos del panel de administración restaurados');
                }
                
                showSection('dashboard');
                updateHeaderTitle('dashboard');
                
                // Actualizar navegación activa
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                const dashboardNav = document.querySelector('.nav-item');
                if (dashboardNav) {
                    dashboardNav.classList.add('active');
                }
            };
            debugLog('BUTTONS', '✅ Botón "Volver al Dashboard" configurado');
        }
        
        debugLog('BUTTONS', 'Configuración de botones completada exitosamente');
        
    } catch (error) {
        console.error('🚨 ERROR CRÍTICO en setupHeaderButtons:', error);
        console.trace('Stack trace:');
        throw error;
    }
}

// Función para actualizar las estadísticas del dashboard
function updateDashboardStats() {
    console.log('📊 Actualizando estadísticas del dashboard...');
    
    try {
        // Actualizar total de clientes
        const totalClientsElement = document.getElementById('total-clients');
        if (totalClientsElement) {
            totalClientsElement.textContent = clients.length;
        }
        
        // Actualizar total de pedidos
        const totalOrdersElement = document.getElementById('total-orders');
        if (totalOrdersElement) {
            totalOrdersElement.textContent = orders.length;
        }
        
        // Actualizar total de productos
        const totalProductsElement = document.getElementById('total-products');
        if (totalProductsElement) {
            totalProductsElement.textContent = products.length;
        }
        
        console.log('✅ Estadísticas actualizadas');
    } catch (error) {
        console.error('❌ Error actualizando estadísticas:', error);
    }
}

// Función de diagnóstico completo del DOM
function runDOMDiagnostic() {
    debugLog('DIAGNOSTIC', 'Iniciando diagnóstico completo del DOM...');
    
    const report = {
        timestamp: new Date().toISOString(),
        domReady: document.readyState,
        elements: {},
        modals: {},
        buttons: {},
        forms: {},
        issues: []
    };
    
    try {
        // Verificar elementos críticos
        const criticalElements = [
            'sidebar', 'main-content', 'header', 'dashboard-section',
            'clientes-section', 'pedidos-section', 'pagos-section',
            'productos-section', 'contactos-section'
        ];
        
        criticalElements.forEach(id => {
            const element = document.getElementById(id);
            report.elements[id] = {
                exists: !!element,
                visible: element ? element.style.display !== 'none' : false,
                classList: element ? Array.from(element.classList) : []
            };
            
            if (!element) {
                report.issues.push(`Elemento crítico faltante: ${id}`);
            }
        });
        
        // Verificar modales
        const modalIds = ['new-client-modal', 'new-order-modal', 'new-payment-modal', 'new-contact-modal', 'new-product-modal'];
        modalIds.forEach(id => {
            const modal = document.getElementById(id);
            report.modals[id] = {
                exists: !!modal,
                hasModalClass: modal ? modal.classList.contains('modal') : false,
                isActive: modal ? modal.classList.contains('active') : false,
                display: modal ? modal.style.display : 'N/A'
            };
            
            if (!modal) {
                report.issues.push(`Modal faltante: ${id}`);
            }
        });
        
        // Verificar botones
        const buttonIds = [
            'new-client-btn', 'new-order-btn', 'new-payment-btn',
            'new-order-btn-section', 'new-payment-btn-section',
            'new-contact-btn-section', 'new-product-btn'
        ];
        
        buttonIds.forEach(id => {
            const button = document.getElementById(id);
            report.buttons[id] = {
                exists: !!button,
                hasOnclick: button ? typeof button.onclick === 'function' : false,
                tagName: button ? button.tagName : 'N/A'
            };
            
            if (!button) {
                report.issues.push(`Botón faltante: ${id}`);
            }
        });
        
        // Verificar formularios
        const formIds = [
            'new-client-form', 'new-order-form', 'new-payment-form',
            'new-contact-form', 'new-product-form'
        ];
        
        formIds.forEach(id => {
            const form = document.getElementById(id);
            report.forms[id] = {
                exists: !!form,
                hasOnsubmit: form ? typeof form.onsubmit === 'function' : false,
                tagName: form ? form.tagName : 'N/A'
            };
            
            if (!form) {
                report.issues.push(`Formulario faltante: ${id}`);
            }
        });
        
        // Verificar datos cargados
        report.dataStatus = {
            clients: clients.length,
            orders: orders.length,
            payments: payments.length,
            products: products.length,
            contacts: contacts.length
        };
        
        console.log('🔍 REPORTE DE DIAGNÓSTICO COMPLETO:', report);
        
        if (report.issues.length > 0) {
            console.warn('⚠️ PROBLEMAS DETECTADOS:', report.issues);
        } else {
            debugLog('DIAGNOSTIC', 'No se detectaron problemas críticos');
        }
        
        return report;
        
    } catch (error) {
        console.error('🚨 Error durante el diagnóstico:', error);
        report.issues.push(`Error en diagnóstico: ${error.message}`);
        return report;
    }
}

// === FUNCIONES DEL PANEL DE ADMINISTRACIÓN ===

// Función para cargar usuarios para el panel de administración
async function loadUsersForAdmin() {
    try {
        debugLog('ADMIN', 'Iniciando carga de usuarios...');
        
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('❌ No hay token de autenticación');
            showNotification('Error: No hay token de autenticación', 'error');
            return;
        }
        
        // Cargar permisos primero
        await loadPermissions();
        
        debugLog('ADMIN', 'Enviando petición GET a /api/usuarios');
        
        
        const response = await fetch('/api/usuarios', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        debugLog('ADMIN', `Respuesta recibida: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
            const users = await response.json();
            debugLog('ADMIN', `Usuarios recibidos:`, users);
            renderUsersTable(users);
            renderPermissionsTable(); // Agregar tabla de permisos
            debugLog('ADMIN', `✅ ${users.length} usuarios cargados exitosamente`);
        } else {
            const errorData = await response.text();
            console.error('❌ Error cargando usuarios:', response.status, response.statusText);
            console.error('❌ Detalles del error:', errorData);
            
            if (response.status === 403) {
                showNotification('Error: No tienes permisos para ver usuarios', 'error');
            } else {
                showNotification(`Error al cargar usuarios: ${response.status}`, 'error');
            }
        }
    } catch (error) {
        console.error('❌ Error de conexión cargando usuarios:', error);
        showNotification('Error de conexión al cargar usuarios', 'error');
    }
}

// Función para renderizar la tabla de usuarios
function renderUsersTable(users) {
    debugLog('ADMIN', 'Iniciando renderizado de tabla de usuarios...');
    
    let container = document.querySelector('.users-table-container');
    if (!container) {
        console.error('❌ No se encontró el contenedor .users-table-container');
        
        // Intentar encontrar contenedores alternativos
        const altContainer = document.querySelector('#admin-profiles-section .admin-panel');
        if (altContainer) {
            console.log('🔄 Creando contenedor de tabla de usuarios...');
            const newContainer = document.createElement('div');
            newContainer.className = 'users-table-container';
            newContainer.style.minHeight = '200px';
            newContainer.style.border = '1px solid #e5e7eb';
            newContainer.style.borderRadius = '8px';
            newContainer.style.padding = '1rem';
            newContainer.style.marginTop = '1rem';
            
            // Buscar si ya existe un h2 de "Usuarios"
            let usersHeader = altContainer.querySelector('h2');
            if (usersHeader && usersHeader.textContent.includes('Usuarios')) {
                // Insertar después del header
                usersHeader.parentNode.insertBefore(newContainer, usersHeader.nextSibling);
            } else {
                // Crear header y contenedor
                const header = document.createElement('h2');
                header.textContent = 'Usuarios';
                header.style.color = '#4f46e5';
                header.style.marginBottom = '1rem';
                altContainer.appendChild(header);
                altContainer.appendChild(newContainer);
            }
            
            container = newContainer;
            debugLog('ADMIN', 'Contenedor de usuarios creado exitosamente');
        } else {
            console.error('❌ No se pudo encontrar ningún contenedor para la tabla de usuarios');
            showNotification('Error: No se encontró el contenedor de usuarios', 'error');
            return;
        }
    }
    
    debugLog('ADMIN', `Renderizando ${users.length} usuarios`);
    
    // Agregar indicador visual de que el contenedor existe
    container.style.backgroundColor = '#f9fafb';
    container.style.border = '2px solid #10b981';
    
    if (users.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #6b7280; background: white; border-radius: 8px;">
                <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 1rem; display: block; color: #4f46e5;"></i>
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No hay usuarios registrados</p>
                <p style="font-size: 0.875rem; color: #9ca3af;">Usa el botón "Nuevo Usuario" para crear el primer usuario.</p>
            </div>
        `;
        debugLog('ADMIN', 'Mensaje de "no usuarios" renderizado');
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'clients-table admin-users-table';
    table.style.width = '100%';
    table.style.backgroundColor = 'white';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';
    table.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    
    table.innerHTML = `
        <thead>
            <tr style="background-color: #f3f4f6;">
                <th style="padding: 1rem; text-align: left; font-weight: 600; color: #374151;">Nombre</th>
                <th style="padding: 1rem; text-align: left; font-weight: 600; color: #374151;">Email</th>
                <th style="padding: 1rem; text-align: left; font-weight: 600; color: #374151;">Perfil</th>
                <th style="padding: 1rem; text-align: left; font-weight: 600; color: #374151;">Estado</th>
                <th style="padding: 1rem; text-align: left; font-weight: 600; color: #374151;">Fecha Creación</th>
                <th style="padding: 1rem; text-align: left; font-weight: 600; color: #374151;">Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${users.map((user, index) => `
                <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'}; border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 1rem; color: #111827;">${user.nombre}</td>
                    <td style="padding: 1rem; color: #6b7280;">${user.email}</td>
                    <td style="padding: 1rem;"><span class="badge badge-${user.perfil.toLowerCase()}" style="padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">${user.perfil}</span></td>
                    <td style="padding: 1rem;"><span class="badge ${user.activo ? 'badge-yes' : 'badge-no'}" style="padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">${user.activo ? 'Activo' : 'Inactivo'}</span></td>
                    <td style="padding: 1rem; color: #6b7280;">${user.created_at ? formatDate(user.created_at) : 'N/A'}</td>
                    <td style="padding: 1rem;">
                        <button onclick="editUser(${user.id})" class="btn btn-secondary" title="Editar usuario" style="margin-right: 0.5rem; padding: 0.5rem; border-radius: 4px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteUser(${user.id})" class="btn btn-secondary" title="Eliminar usuario" style="background-color: #dc2626; color: white; padding: 0.5rem; border-radius: 4px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
    
    // Agregar mensaje de confirmación visual
    const confirmationMsg = document.createElement('div');
    confirmationMsg.style.cssText = 'background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 4px; margin-top: 1rem; text-align: center; font-weight: 500;';
    confirmationMsg.textContent = `✅ ${users.length} usuario(s) cargado(s) exitosamente`;
    container.appendChild(confirmationMsg);
    
    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
        if (confirmationMsg.parentNode) {
            confirmationMsg.parentNode.removeChild(confirmationMsg);
        }
    }, 3000);
    
    debugLog('ADMIN', '✅ Tabla de usuarios renderizada exitosamente');
}

// Funciones placeholder para administración de usuarios
function editUser(userId) {
    console.log('Editar usuario:', userId);
    showNotification('Función de edición de usuarios en desarrollo', 'info');
}

function deleteUser(userId) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        console.log('Eliminar usuario:', userId);
        showNotification('Función de eliminación de usuarios en desarrollo', 'info');
    }
}

// Función de debugging específica para el panel de administración
window.debugAdminPanel = function() {
    console.log('🔧 DEBUG PANEL DE ADMINISTRACIÓN:');
    
    // Verificar si el usuario es administrador
    const currentUser = getCurrentUserFromAuth();
    console.log('👤 Usuario actual:', currentUser);
    console.log('🔑 Es administrador:', currentUser?.perfil === 'Administrador');
    
    // Verificar elementos del DOM
    const adminSection = document.getElementById('admin-profiles-section');
    console.log('📄 Sección admin existe:', !!adminSection);
    console.log('📄 Sección admin visible:', adminSection?.style.display !== 'none');
    console.log('📄 Sección admin display:', adminSection?.style.display);
    console.log('📄 Sección admin computed style:', adminSection ? getComputedStyle(adminSection).display : 'N/A');
    
    const adminPanel = document.querySelector('.admin-panel');
    console.log('📦 Panel admin existe:', !!adminPanel);
    console.log('📦 Panel admin visible:', adminPanel ? getComputedStyle(adminPanel).display : 'N/A');
    
    const usersContainer = document.querySelector('.users-table-container');
    console.log('📋 Contenedor usuarios existe:', !!usersContainer);
    console.log('📋 Contenedor usuarios innerHTML length:', usersContainer?.innerHTML?.length || 0);
    console.log('📋 Contenedor usuarios visible:', usersContainer ? getComputedStyle(usersContainer).display : 'N/A');
    
    // Verificar si hay tabla dentro del contenedor
    const table = usersContainer?.querySelector('table');
    console.log('📊 Tabla existe:', !!table);
    console.log('📊 Tabla visible:', table ? getComputedStyle(table).display : 'N/A');
    
    const newUserBtn = document.getElementById('new-user-btn');
    console.log('🆕 Botón nuevo usuario existe:', !!newUserBtn);
    console.log('🆕 Botón nuevo usuario tiene onclick:', typeof newUserBtn?.onclick === 'function');
    console.log('🆕 Botón nuevo usuario visible:', newUserBtn ? getComputedStyle(newUserBtn).display : 'N/A');
    
    // Verificar token
    const token = localStorage.getItem('authToken');
    console.log('🔐 Token presente:', !!token);
    
    // Verificar posicionamiento
    if (adminSection) {
        const rect = adminSection.getBoundingClientRect();
        console.log('📐 Posición de la sección admin:', {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0
        });
    }
    
    // Intentar cargar usuarios manualmente
    console.log('🔄 Intentando cargar usuarios...');
    loadUsersForAdmin();
};

// Función para forzar la visibilidad del panel de administración
window.forceShowAdminPanel = function() {
    console.log('🔧 FORZANDO VISIBILIDAD DEL PANEL DE ADMINISTRACIÓN...');
    
    // Primero, ocultar TODAS las otras secciones
    const allSections = document.querySelectorAll('#dashboard-section, #clientes-section, #pedidos-section, #pagos-section, #productos-section, #contactos-section, .page-content');
    allSections.forEach(section => {
        if (section.id !== 'admin-profiles-section' && !section.closest('#admin-profiles-section')) {
            section.style.display = 'none !important';
        }
    });
    
    const adminSection = document.getElementById('admin-profiles-section');
    if (adminSection) {
        // Forzar estilos de posicionamiento absoluto
        adminSection.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 9999 !important;
            background: #f3f4f6 !important;
            overflow-y: auto !important;
        `;
        console.log('✅ Sección admin forzada a pantalla completa');
    }
    
    const pageContent = adminSection?.querySelector('.page-content');
    if (pageContent) {
        pageContent.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            padding: 1rem 2rem !important;
            max-width: 1200px !important;
            margin: 0 auto !important;
            background: transparent !important;
        `;
        console.log('✅ Page content forzado a visible');
    }
    
    const adminPanel = document.querySelector('.admin-panel');
    if (adminPanel) {
        adminPanel.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            background: #ffffff !important;
            border: 3px solid #10b981 !important;
            padding: 2rem !important;
            margin: 1rem auto !important;
            border-radius: 8px !important;
            max-width: 1200px !important;
            width: 95% !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        `;
        console.log('✅ Panel admin forzado a visible');
    }
    
    const usersContainer = document.querySelector('.users-table-container');
    if (usersContainer) {
        usersContainer.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            background: #ffffff !important;
            border: 3px solid #3b82f6 !important;
            padding: 1rem !important;
            margin: 1rem 0 !important;
            border-radius: 8px !important;
            min-height: 200px !important;
            width: 100% !important;
            overflow: visible !important;
        `;
        console.log('✅ Contenedor usuarios forzado a visible');
        
        // Verificar contenido
        console.log('📋 Contenido del contenedor:', usersContainer.innerHTML.length, 'caracteres');
        
        // Si no hay contenido visible, agregar mensaje de prueba
        if (!usersContainer.innerHTML || usersContainer.innerHTML.trim() === '') {
            usersContainer.innerHTML = `
                <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 1rem; border-radius: 8px; text-align: center;">
                    <h3 style="color: #92400e; margin: 0 0 0.5rem 0;">⚠️ CONTENEDOR VACÍO</h3>
                    <p style="color: #92400e; margin: 0;">El contenedor existe pero no tiene contenido. Ejecutando carga de usuarios...</p>
                </div>
            `;
            
            // Intentar cargar usuarios
            setTimeout(() => {
                loadUsersForAdmin();
            }, 1000);
        } else {
            // Si hay contenido, asegurar que la tabla sea visible
            const table = usersContainer.querySelector('table');
            if (table) {
                table.style.cssText = `
                    display: table !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    width: 100% !important;
                    background: white !important;
                    border-collapse: collapse !important;
                `;
                console.log('✅ Tabla forzada a visible');
            }
        }
    }
    
    const newUserBtn = document.getElementById('new-user-btn');
    if (newUserBtn) {
        newUserBtn.style.cssText = `
            display: inline-block !important;
            visibility: visible !important;
            opacity: 1 !important;
            background-color: #4f46e5 !important;
            color: white !important;
            padding: 0.75rem 1.5rem !important;
            border: none !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            font-weight: 500 !important;
        `;
        console.log('✅ Botón nuevo usuario forzado a visible');
    }
    
    // Agregar mensaje de confirmación visual en pantalla
    const confirmationDiv = document.createElement('div');
    confirmationDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    confirmationDiv.textContent = '✅ Panel de administración forzado a mostrar';
    document.body.appendChild(confirmationDiv);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        if (confirmationDiv.parentNode) {
            confirmationDiv.parentNode.removeChild(confirmationDiv);
        }
    }, 5000);
    
    console.log('🎯 Panel de administración forzado a pantalla completa');
};

// === FUNCIONES DE DEBUGGING GLOBALES ===

// Hacer funciones disponibles globalmente para debugging manual
window.debugModal = function(modalId) {
    console.log(`🔧 DEBUG: Intentando abrir modal ${modalId}`);
    try {
        showModal(modalId);
        console.log(`✅ Modal ${modalId} abierto exitosamente`);
    } catch (error) {
        console.error(`❌ Error abriendo modal ${modalId}:`, error);
    }
};

// Función específica para debuggear el modal de nuevo usuario
window.debugNewUserModal = function() {
    console.log('🔧 DEBUG ESPECÍFICO: Modal de Nuevo Usuario');
    
    const modal = document.getElementById('new-user-modal');
    console.log('📋 Modal existe:', !!modal);
    
    if (modal) {
        console.log('📋 Modal classList inicial:', Array.from(modal.classList));
        console.log('📋 Modal display inicial:', modal.style.display);
        console.log('📋 Modal computed display inicial:', getComputedStyle(modal).display);
        
        // Intentar agregar clase active
        console.log('🎯 Agregando clase active...');
        modal.classList.add('active');
        
        console.log('📋 Modal classList después:', Array.from(modal.classList));
        
        // Forzar estilos inmediatamente con z-index alto
        console.log('⚠️ Forzando visibilidad con z-index alto...');
        modal.style.cssText = `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 15000 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-color: rgba(0, 0, 0, 0.7) !important;
            align-items: center !important;
            justify-content: center !important;
        `;
        
        // También asegurar que el contenido del modal tenga z-index alto
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.cssText = `
                z-index: 15001 !important;
                position: relative !important;
                background: white !important;
                padding: 2rem !important;
                border-radius: 8px !important;
                width: 90% !important;
                max-width: 500px !important;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
            `;
        }
        
        console.log('✅ Estilos forzados aplicados con z-index 15000');
        
        // Verificar estilos después de un momento
        setTimeout(() => {
            const computedStyle = getComputedStyle(modal);
            console.log('🔍 Estilos computados después de 200ms:', {
                display: computedStyle.display,
                visibility: computedStyle.visibility,
                opacity: computedStyle.opacity,
                zIndex: computedStyle.zIndex,
                position: computedStyle.position
            });
        }, 200);
        
        // Verificar contenido del modal
        const modalContentElement = modal.querySelector('.modal-content');
        console.log('📄 Modal content existe:', !!modalContentElement);
        
        const form = modal.querySelector('#new-user-form');
        console.log('📝 Formulario existe:', !!form);
        
        const inputs = modal.querySelectorAll('input, select');
        console.log('📝 Inputs encontrados:', inputs.length);
        
    } else {
        console.error('❌ Modal new-user-modal no encontrado');
        
        // Buscar todos los modales disponibles
        const allModals = document.querySelectorAll('.modal');
        console.log('📋 Modales disponibles:', Array.from(allModals).map(m => m.id));
    }
};

// Función para probar el botón de nuevo usuario
window.testNewUserButton = function() {
    console.log('🔧 DEBUG: Probando botón de nuevo usuario');
    
    const button = document.getElementById('new-user-btn');
    console.log('🔘 Botón existe:', !!button);
    
    if (button) {
        console.log('🔘 Botón onclick:', typeof button.onclick);
        console.log('🔘 Botón visible:', getComputedStyle(button).display !== 'none');
        
        // Simular click
        console.log('🖱️ Simulando click...');
        button.click();
    } else {
        console.error('❌ Botón new-user-btn no encontrado');
        
        // Buscar botones similares
        const allButtons = document.querySelectorAll('button');
        const userButtons = Array.from(allButtons).filter(btn => 
            btn.textContent.toLowerCase().includes('usuario') || 
            btn.id.includes('user')
        );
        console.log('🔘 Botones relacionados con usuario:', userButtons.map(btn => ({
            id: btn.id,
            text: btn.textContent.trim(),
            onclick: typeof btn.onclick
        })));
    }
};

window.runDiagnostic = function() {
    console.log('🔧 DEBUG: Ejecutando diagnóstico manual...');
    return runDOMDiagnostic();
};

window.testAllModals = function() {
    console.log('🔧 DEBUG: Probando todos los modales...');
    const modalIds = ['new-client-modal', 'new-order-modal', 'new-payment-modal', 'new-contact-modal', 'new-product-modal'];
    
    modalIds.forEach((modalId, index) => {
        setTimeout(() => {
            console.log(`Probando modal: ${modalId}`);
            try {
                showModal(modalId);
                setTimeout(() => {
                    const modal = document.getElementById(modalId);
                    if (modal) modal.classList.remove('active');
                }, 1000);
            } catch (error) {
                console.error(`Error con modal ${modalId}:`, error);
            }
        }, index * 2000);
    });
};

window.showDebugInfo = function() {
    console.log('🔧 DEBUG INFO:');
    console.log('- Clientes cargados:', clients.length);
    console.log('- Pedidos cargados:', orders.length);
    console.log('- Pagos cargados:', payments.length);
    console.log('- Productos cargados:', products.length);
    console.log('- Contactos cargados:', contacts.length);
    console.log('- Estado del DOM:', document.readyState);
    console.log('- Modales en DOM:', document.querySelectorAll('.modal').length);
    console.log('- Botones con onclick:', document.querySelectorAll('button[onclick], button').length);
};

// Función para monitorear clicks en tiempo real
window.enableClickMonitoring = function() {
    console.log('🔧 DEBUG: Habilitando monitoreo de clicks...');
    
    document.addEventListener('click', function(e) {
        console.log('👆 CLICK DETECTADO:', {
            target: e.target,
            tagName: e.target.tagName,
            id: e.target.id,
            className: e.target.className,
            innerHTML: e.target.innerHTML.substring(0, 50) + '...'
        });
    }, true);
    
    console.log('✅ Monitoreo de clicks habilitado');
};

// Función para probar la conectividad con el servidor
window.testServerConnection = async function() {
    console.log('🔧 DEBUG: Probando conexión con el servidor...');
    
    const token = localStorage.getItem('authToken');
    
    try {
        // Probar endpoint de verificación de auth
        console.log('1. Probando /api/auth/verify...');
        const authResponse = await fetch('/api/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Auth response:', authResponse.status, authResponse.statusText);
        
        // Probar endpoint de clientes (GET)
        console.log('2. Probando GET /api/clientes...');
        const clientsResponse = await fetch('/api/clientes', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Clients GET response:', clientsResponse.status, clientsResponse.statusText);
        
        // Probar con datos de prueba
        console.log('3. Probando POST /api/clientes con datos de prueba...');
        const testData = {
            nombre: 'Cliente de Prueba',
            cuit: '12345678',
            email: 'test@test.com',
            telefono: '123456789',
            direccion: 'Dirección de prueba',
            provincia: 'Buenos Aires',
            ciudad: 'La Plata',
            localidad: 'La Plata',
            codigo_postal: '1900'
        };
        
        const testResponse = await fetch('/api/clientes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        
        console.log('Test POST response:', testResponse.status, testResponse.statusText);
        
        if (!testResponse.ok) {
            const errorText = await testResponse.text();
            console.error('Error details:', errorText);
        } else {
            const result = await testResponse.json();
            console.log('Success result:', result);
        }
        
    } catch (error) {
        console.error('❌ Error en test de conexión:', error);
    }
};

// Función para restaurar estilos normales del panel de administración
function restoreAdminPanelStyles() {
    const adminSection = document.getElementById('admin-profiles-section');
    if (adminSection) {
        // Restaurar estilos normales
        adminSection.style.cssText = 'display: none;';
        
        // También restaurar estilos de elementos internos si existen
        const pageContent = adminSection.querySelector('.page-content');
        if (pageContent) {
            pageContent.style.cssText = '';
        }
        
        const adminPanel = adminSection.querySelector('.admin-panel');
        if (adminPanel) {
            adminPanel.style.cssText = '';
        }
        
        const usersContainer = adminSection.querySelector('.users-table-container');
        if (usersContainer) {
            usersContainer.style.cssText = '';
            
            const table = usersContainer.querySelector('table');
            if (table) {
                table.style.cssText = '';
            }
        }
        
        const newUserBtn = adminSection.querySelector('#new-user-btn');
        if (newUserBtn) {
            newUserBtn.style.cssText = '';
        }
        
        console.log('✅ Estilos del panel de administración restaurados a valores normales');
    }
}

// Funciones para mostrar detalles
function viewClientDetails(clientId) {
    console.log('Ver detalles del cliente:', clientId);
    
    const client = clients.find(c => c.id == clientId);
    if (!client) {
        showNotification('Cliente no encontrado', 'error');
        return;
    }
    
    // Buscar pedidos del cliente
    const clientOrders = orders.filter(order => order.cliente_id == clientId);
    
    // Buscar pagos del cliente
    const clientPayments = payments.filter(payment => payment.cliente_id == clientId);
    
    // Debug: mostrar datos encontrados
    console.log('🔍 Datos del cliente:', {
        clientId,
        clientName: client.nombre,
        ordersFound: clientOrders.length,
        paymentsFound: clientPayments.length,
        orders: clientOrders.map(o => ({ id: o.id, monto: o.monto, tipo: typeof o.monto })),
        payments: clientPayments.map(p => ({ id: p.id, monto: p.monto, tipo: typeof p.monto }))
    });
    
    // Calcular totales con conversión explícita a números
    const totalPedidos = clientOrders.reduce((sum, order) => {
        const monto = parseFloat(order.monto) || 0;
        return sum + monto;
    }, 0);
    
    const totalPagos = clientPayments.reduce((sum, payment) => {
        const monto = parseFloat(payment.monto) || 0;
        return sum + monto;
    }, 0);
    
    const saldoPendiente = totalPedidos - totalPagos;
    const saldoActual = parseFloat(client.saldo) || 0;
    
    // Debug: mostrar cálculos
    console.log('💰 Cálculos financieros:', {
        totalPedidos,
        totalPagos,
        saldoPendiente,
        saldoActual
    });
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal active';
    detailsModal.style.cssText = `
        display: flex !important;
        z-index: 12000 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
    `;
    
    detailsModal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto; z-index: 12001 !important;">
            <div class="modal-header">
                <h2 class="modal-title">Detalles del Cliente</h2>
                <button class="close-modal btn btn-secondary" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 1rem;">
                <!-- Información básica del cliente -->
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 1rem 0; color: #1f2937;">Información Personal</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <strong>Nombre:</strong><br>
                            ${client.nombre || 'N/A'}
                        </div>
                        <div>
                            <strong>CUIT/Documento:</strong><br>
                            ${client.cuit || client.documento || 'N/A'}
                        </div>
                        <div>
                            <strong>Email:</strong><br>
                            ${client.email || 'N/A'}
                        </div>
                        <div>
                            <strong>Teléfono:</strong><br>
                            ${client.telefono || 'N/A'}
                        </div>
                        <div>
                            <strong>Dirección:</strong><br>
                            ${client.direccion || 'N/A'}
                        </div>
                        <div>
                            <strong>Ubicación:</strong><br>
                            ${[client.localidad, client.ciudad, client.provincia].filter(Boolean).join(', ') || 'N/A'}
                            ${client.codigo_postal ? ` (CP: ${client.codigo_postal})` : ''}
                        </div>
                    </div>
                </div>

                <!-- Resumen financiero -->
                <div style="background: #f0f9ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #0ea5e9;">
                    <h3 style="margin: 0 0 1rem 0; color: #1f2937;">Resumen Financiero</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem; text-align: center;">
                        <div>
                            <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Total Pedidos</div>
                            <div style="font-size: 1.25rem; font-weight: bold; color: #0ea5e9;">
                                ${formatCurrency(totalPedidos)}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Total Pagos</div>
                            <div style="font-size: 1.25rem; font-weight: bold; color: #10b981;">
                                ${formatCurrency(totalPagos)}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Saldo Pendiente</div>
                            <div style="font-size: 1.25rem; font-weight: bold; color: ${saldoPendiente >= 0 ? '#ef4444' : '#10b981'};">
                                ${formatCurrency(saldoPendiente)}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Saldo Actual</div>
                            <div style="font-size: 1.25rem; font-weight: bold; color: ${saldoActual >= 0 ? '#10b981' : '#ef4444'};">
                                ${formatCurrency(saldoActual)}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Listado de pedidos -->
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 1rem 0; color: #1f2937; display: flex; align-items: center;">
                        <i class="fas fa-shopping-cart" style="margin-right: 0.5rem; color: #0ea5e9;"></i>
                        Pedidos (${clientOrders.length})
                    </h3>
                    ${clientOrders.length > 0 ? `
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead style="background: #f9fafb;">
                                    <tr>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Número</th>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Descripción</th>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Monto</th>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Estado</th>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${clientOrders.map((order, index) => `
                                        <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">${order.numero_pedido}</td>
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">${order.descripcion || 'Sin descripción'}</td>
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #0ea5e9;">${formatCurrency(parseFloat(order.monto) || 0)}</td>
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">
                                                <span class="status-badge status-${order.estado}" style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 500;">${translateOrderStatus(order.estado)}</span>
                                            </td>
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${formatDate(order.fecha)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <div style="background: #f9fafb; padding: 2rem; text-align: center; border-radius: 8px; color: #6b7280;">
                            <i class="fas fa-shopping-cart" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #d1d5db;"></i>
                            <p style="margin: 0;">No hay pedidos registrados para este cliente</p>
                        </div>
                    `}
                </div>

                <!-- Listado de pagos -->
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 1rem 0; color: #1f2937; display: flex; align-items: center;">
                        <i class="fas fa-credit-card" style="margin-right: 0.5rem; color: #10b981;"></i>
                        Pagos (${clientPayments.length})
                    </h3>
                    ${clientPayments.length > 0 ? `
                        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead style="background: #f9fafb;">
                                    <tr>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Monto</th>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Método</th>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Referencia</th>
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${clientPayments.map((payment, index) => `
                                        <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #10b981;">${formatCurrency(parseFloat(payment.monto) || 0)}</td>
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">${payment.metodo || 'N/A'}</td>
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${payment.referencia || 'Sin referencia'}</td>
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${formatDate(payment.fecha)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <div style="background: #f9fafb; padding: 2rem; text-align: center; border-radius: 8px; color: #6b7280;">
                            <i class="fas fa-credit-card" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #d1d5db;"></i>
                            <p style="margin: 0;">No hay pagos registrados para este cliente</p>
                        </div>
                    `}
                </div>

                <!-- Botones de acción -->
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="editClient(${client.id}); this.closest('.modal').remove();" style="background: #4f46e5; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-edit"></i> Editar Cliente
                    </button>
                    <button class="btn btn-success" onclick="showModal('new-order-modal'); document.getElementById('order-client-select').value='${client.id}'; this.closest('.modal').remove();" style="background: #10b981; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-plus"></i> Nuevo Pedido
                    </button>
                    <button class="btn btn-info" onclick="showModal('new-payment-modal'); document.getElementById('payment-client-select').value='${client.id}'; this.closest('.modal').remove();" style="background: #0ea5e9; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-credit-card"></i> Nuevo Pago
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()" style="background: #6b7280; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(detailsModal);
}

function viewOrderDetails(orderId) {
    console.log('Ver detalles del pedido:', orderId);
    
    const order = orders.find(o => o.id == orderId);
    if (!order) {
        showNotification('Pedido no encontrado', 'error');
        return;
    }
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal active';
    detailsModal.style.cssText = `
        display: flex !important;
        z-index: 12000 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
    `;
    
    // Cargar items del pedido y mostrar el modal
    loadOrderItems(orderId).then(items => {
        const itemsTable = items.length > 0 ? `
            <div style="margin-bottom: 1.5rem;">
                <h3 style="margin: 0 0 1rem 0; color: #1f2937; display: flex; align-items: center;">
                    <i class="fas fa-box" style="margin-right: 0.5rem; color: #6366f1;"></i>
                    Productos del Pedido (${items.length})
                </h3>
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Producto</th>
                                <th style="padding: 0.75rem; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Cantidad</th>
                                <th style="padding: 0.75rem; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Precio Unit.</th>
                                <th style="padding: 0.75rem; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map((item, index) => `
                                <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">
                                        <div>
                                            <div style="font-weight: 600;">${item.producto_nombre || 'Producto no encontrado'}</div>
                                            ${item.producto_descripcion ? `<div style="font-size: 0.875rem; color: #6b7280;">${item.producto_descripcion}</div>` : ''}
                                        </div>
                                    </td>
                                    <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.cantidad}</td>
                                    <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${formatCurrency(item.precio)}</td>
                                    <td style="padding: 0.75rem; text-align: right; font-weight: 600; color: #10b981; border-bottom: 1px solid #e5e7eb;">${formatCurrency(item.subtotal)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot style="background: #f0f9ff;">
                            <tr>
                                <td colspan="3" style="padding: 0.75rem; text-align: right; font-weight: 600; color: #0c4a6e; border-top: 2px solid #0ea5e9;">Total del Pedido:</td>
                                <td style="padding: 0.75rem; text-align: right; font-weight: bold; font-size: 1.1rem; color: #0ea5e9; border-top: 2px solid #0ea5e9;">${formatCurrency(order.monto)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        ` : `
            <div style="margin-bottom: 1.5rem;">
                <h3 style="margin: 0 0 1rem 0; color: #1f2937;">Productos del Pedido</h3>
                <div style="background: #f9fafb; padding: 2rem; text-align: center; border-radius: 8px; color: #6b7280;">
                    <i class="fas fa-box-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #d1d5db;"></i>
                    <p style="margin: 0;">No hay productos registrados para este pedido</p>
                </div>
            </div>
        `;

        detailsModal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; z-index: 12001 !important;">
                <div class="modal-header">
                    <h2 class="modal-title">Detalles del Pedido #${order.numero_pedido}</h2>
                    <button class="close-modal btn btn-secondary" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="padding: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                        <div>
                            <strong>Cliente:</strong><br>
                            ${order.cliente_nombre || 'N/A'}
                        </div>
                        <div>
                            <strong>Estado:</strong><br>
                            <span class="status-badge status-${order.estado}" style="padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; font-weight: 500;">
                                ${translateOrderStatus(order.estado)}
                            </span>
                        </div>
                        <div>
                            <strong>Fecha:</strong><br>
                            ${formatDate(order.fecha)}
                        </div>
                        <div>
                            <strong>Monto Total:</strong><br>
                            <span style="font-size: 1.2rem; font-weight: bold; color: #10b981;">
                                ${formatCurrency(order.monto)}
                            </span>
                        </div>
                    </div>
                    ${order.descripcion ? `
                        <div style="margin-bottom: 1.5rem;">
                            <strong>Descripción:</strong><br>
                            <div style="background: white; padding: 1rem; border-radius: 6px; border-left: 4px solid #6366f1; margin-top: 0.5rem;">
                                ${order.descripcion}
                            </div>
                        </div>
                    ` : ''}
                    ${itemsTable}
                    <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
                        <button class="btn btn-primary" onclick="editOrder(${order.id}); this.closest('.modal').remove();" style="background: #4f46e5; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                            <i class="fas fa-edit"></i> Editar Pedido
                        </button>
                        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()" style="background: #6b7280; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
                            <i class="fas fa-times"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    document.body.appendChild(detailsModal);
}

function viewPaymentDetails(paymentId) {
    console.log('Ver detalles del pago:', paymentId);
    
    const payment = payments.find(p => p.id == paymentId);
    if (!payment) {
        showNotification('Pago no encontrado', 'error');
        return;
    }
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal active';
    detailsModal.style.cssText = `
        display: flex !important;
        z-index: 12000 !important;
        background-color: rgba(0, 0, 0, 0.7) !important;
    `;
    
    detailsModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; z-index: 12001 !important;">
            <div class="modal-header">
                <h2 class="modal-title">Detalles del Pago</h2>
                <button class="close-modal btn btn-secondary" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 1rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <strong>Cliente:</strong><br>
                        ${payment.cliente_nombre || 'N/A'}
                    </div>
                    <div>
                        <strong>Monto:</strong><br>
                        <span style="font-size: 1.2rem; font-weight: bold; color: #10b981;">
                            ${formatCurrency(payment.monto)}
                        </span>
                    </div>
                    <div>
                        <strong>Método:</strong><br>
                        ${payment.metodo || 'N/A'}
                    </div>
                    <div>
                        <strong>Fecha:</strong><br>
                        ${formatDate(payment.fecha)}
                    </div>
                </div>
                <div style="margin-bottom: 1rem;">
                    <strong>Referencia:</strong><br>
                    ${payment.referencia || 'Sin referencia'}
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(detailsModal);
}

// Función para cargar items de un pedido específico
async function loadOrderItems(orderId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/pedidos/${orderId}/items`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const items = await response.json();
            return items;
        } else {
            console.error('Error cargando items del pedido:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error de red cargando items:', error);
        return [];
    }
}

// Función temporal para actualizar estructura de tabla pedidos
async function updatePedidosTableStructure() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/admin/update-pedidos-table', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Estructura de tabla actualizada:', result.message);
            showNotification('Estructura de base de datos actualizada correctamente', 'success');
        } else {
            console.error('❌ Error actualizando estructura:', response.status);
            showNotification('Error actualizando estructura de base de datos', 'error');
        }
    } catch (error) {
        console.error('❌ Error de red:', error);
        showNotification('Error de conexión al actualizar base de datos', 'error');
    }
}

// === FUNCIONES PARA EDITAR PEDIDO ===

function setupEditOrderProductHandlers() {
    const addProductBtn = document.getElementById('edit-add-product-btn');
    const confirmAddBtn = document.getElementById('edit-confirm-add-product');
    const cancelAddBtn = document.getElementById('edit-cancel-add-product');
    const productSelect = document.getElementById('edit-product-select');

    if (addProductBtn) {
        addProductBtn.onclick = () => {
            document.getElementById('edit-product-selector').style.display = 'block';
            populateEditProductSelect();
        };
    }

    if (confirmAddBtn) {
        confirmAddBtn.onclick = addProductToEditOrder;
    }

    if (cancelAddBtn) {
        cancelAddBtn.onclick = cancelEditAddProduct;
    }

    if (productSelect) {
        productSelect.onchange = (e) => {
            const selectedProduct = products.find(p => p.id == e.target.value);
            if (selectedProduct) {
                document.getElementById('edit-product-price').value = selectedProduct.precio;
            }
        };
    }
}

function populateEditProductSelect() {
    const productSelect = document.getElementById('edit-product-select');
    if (!productSelect) return;

    productSelect.innerHTML = '<option value="">Seleccione un producto</option>';
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.nombre;
        productSelect.appendChild(option);
    });
}

function addProductToEditOrder() {
    const productId = document.getElementById('edit-product-select').value;
    const quantity = parseInt(document.getElementById('edit-product-quantity').value);
    const price = parseFloat(document.getElementById('edit-product-price').value);

    if (!productId || !quantity || !price) {
        showNotification('Por favor complete todos los campos del producto', 'error');
        return;
    }

    const selectedProduct = products.find(p => p.id == productId);
    if (!selectedProduct) {
        showNotification('Producto no encontrado', 'error');
        return;
    }

    // Verificar si el producto ya está en la lista
    const existingIndex = editOrderItems.findIndex(item => item.producto_id == productId);
    if (existingIndex !== -1) {
        // Si ya existe, actualizar cantidad y precio
        editOrderItems[existingIndex].cantidad += quantity;
        editOrderItems[existingIndex].precio = price;
        editOrderItems[existingIndex].subtotal = editOrderItems[existingIndex].cantidad * price;
    } else {
        // Si no existe, agregar nuevo
        const newItem = {
            producto_id: productId,
            producto_nombre: selectedProduct.nombre,
            cantidad: quantity,
            precio: price,
            subtotal: quantity * price
        };
        editOrderItems.push(newItem);
    }

    renderEditOrderProducts();
    updateEditOrderTotal();
    cancelEditAddProduct();
    showNotification('Producto agregado al pedido', 'success');
}

function cancelEditAddProduct() {
    document.getElementById('edit-product-selector').style.display = 'none';
    document.getElementById('edit-product-select').value = '';
    document.getElementById('edit-product-quantity').value = '1';
    document.getElementById('edit-product-price').value = '';
}

function renderEditOrderProducts() {
    const productsList = document.getElementById('edit-order-products-list');
    const noProductsMessage = document.getElementById('edit-no-products-message');

    // Validar que los elementos existan
    if (!productsList || !noProductsMessage) {
        console.log('⚠️ Elementos del modal de editar pedido no encontrados');
        return;
    }

    if (editOrderItems.length === 0) {
        noProductsMessage.style.display = 'block';
        return;
    }

    noProductsMessage.style.display = 'none';

    const productsTable = `
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead style="background: #f9fafb;">
                    <tr>
                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Producto</th>
                        <th style="padding: 0.75rem; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Cantidad</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Precio Unit.</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Subtotal</th>
                        <th style="padding: 0.75rem; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${editOrderItems.map((item, index) => `
                        <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">${item.producto_nombre}</td>
                            <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.cantidad}</td>
                            <td style="padding: 0.75rem; text-align: right; border-bottom: 1px solid #e5e7eb;">${formatCurrency(item.precio)}</td>
                            <td style="padding: 0.75rem; text-align: right; font-weight: 600; color: #10b981; border-bottom: 1px solid #e5e7eb;">${formatCurrency(item.subtotal)}</td>
                            <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">
                                <button type="button" onclick="removeProductFromEditOrder(${index})" class="btn-icon" style="color: #ef4444;" title="Eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    productsList.innerHTML = productsTable;
}

function removeProductFromEditOrder(index) {
    if (confirm('¿Está seguro de que desea eliminar este producto del pedido?')) {
        editOrderItems.splice(index, 1);
        renderEditOrderProducts();
        updateEditOrderTotal();
        showNotification('Producto eliminado del pedido', 'success');
    }
}

function updateEditOrderTotal() {
    const total = editOrderItems.reduce((sum, item) => sum + item.subtotal, 0);
    const orderTotalElement = document.getElementById('edit-order-total');
    if (orderTotalElement) {
        orderTotalElement.textContent = formatCurrency(total);
    } else {
        console.log('⚠️ Elemento edit-order-total no encontrado');
    }
}

function clearEditOrderItems() {
    editOrderItems = [];
    renderEditOrderProducts();
    updateEditOrderTotal();
}

// Función para renderizar la tabla de permisos por perfil
function renderPermissionsTable() {
    debugLog('ADMIN', 'Iniciando renderizado de tabla de permisos...');
    
    // Verificar si el usuario actual es administrador
    const currentUser = getCurrentUserFromAuth();
    const isAdmin = currentUser?.perfil === 'Administrador';
    
    let container = document.querySelector('.perms-table-container');
    if (!container) {
        console.error('❌ No se encontró el contenedor .perms-table-container');
        
        // Intentar encontrar contenedores alternativos
        const altContainer = document.querySelector('#admin-profiles-section .admin-panel');
        if (altContainer) {
            console.log('🔄 Creando contenedor de tabla de permisos...');
            const newContainer = document.createElement('div');
            newContainer.className = 'perms-table-container';
            newContainer.style.minHeight = '200px';
            newContainer.style.border = '1px solid #e5e7eb';
            newContainer.style.borderRadius = '8px';
            newContainer.style.padding = '1rem';
            newContainer.style.marginTop = '2rem';
            
            // Buscar si ya existe un h2 de "Permisos por Perfil"
            let permsHeader = Array.from(altContainer.querySelectorAll('h2')).find(h => h.textContent.includes('Permisos'));
            if (permsHeader) {
                // Insertar después del header
                permsHeader.parentNode.insertBefore(newContainer, permsHeader.nextSibling);
            } else {
                // Crear header y contenedor
                const header = document.createElement('h2');
                header.textContent = 'Permisos por Perfil';
                header.style.color = '#4f46e5';
                header.style.marginBottom = '1rem';
                header.style.marginTop = '2rem';
                altContainer.appendChild(header);
                altContainer.appendChild(newContainer);
            }
            
            container = newContainer;
            debugLog('ADMIN', 'Contenedor de permisos creado exitosamente');
        } else {
            console.error('❌ No se pudo encontrar ningún contenedor para la tabla de permisos');
            showNotification('Error: No se encontró el contenedor de permisos', 'error');
            return;
        }
    }
    
    // Definir permisos por perfil (ahora almacenados globalmente para edición)
    window.permisosPorPerfil = {
        'Administrador': {
            clientes: { crear: true, leer: true, editar: true, eliminar: true },
            pedidos: { crear: true, leer: true, editar: true, eliminar: true },
            pagos: { crear: true, leer: true, editar: true, eliminar: true },
            productos: { crear: true, leer: true, editar: true, eliminar: true },
            contactos: { crear: true, leer: true, editar: true, eliminar: true },
            usuarios: { crear: true, leer: true, editar: true, eliminar: true }
        },
        'Vendedor': {
            clientes: { crear: true, leer: true, editar: true, eliminar: false },
            pedidos: { crear: true, leer: true, editar: true, eliminar: true },
            pagos: { crear: true, leer: true, editar: true, eliminar: true },
            productos: { crear: false, leer: true, editar: false, eliminar: false },
            contactos: { crear: true, leer: true, editar: true, eliminar: true },
            usuarios: { crear: false, leer: false, editar: false, eliminar: false }
        },
        'Produccion': {
            clientes: { crear: false, leer: true, editar: false, eliminar: false },
            pedidos: { crear: false, leer: true, editar: true, eliminar: false },
            pagos: { crear: false, leer: true, editar: false, eliminar: false },
            productos: { crear: true, leer: true, editar: true, eliminar: false },
            contactos: { crear: false, leer: true, editar: false, eliminar: false },
            usuarios: { crear: false, leer: false, editar: false, eliminar: false }
        }
    };
    
    debugLog('ADMIN', 'Renderizando tabla de permisos por perfil');
    
    // Agregar indicador visual de que el contenedor existe
    container.style.backgroundColor = '#f9fafb';
    container.style.border = '2px solid #8b5cf6';
    
    // Agregar mensaje informativo para administradores
    if (isAdmin) {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = 'background: #dbeafe; border: 1px solid #3b82f6; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; color: #1e40af;';
        infoDiv.innerHTML = `
            <i class="fas fa-info-circle" style="margin-right: 0.5rem;"></i>
            <strong>Modo Administrador:</strong> Puede modificar permisos usando los checkboxes. Los cambios se guardan automáticamente.
        `;
        container.appendChild(infoDiv);
    }
    
    const table = document.createElement('table');
    table.className = 'clients-table admin-permissions-table';
    table.style.width = '100%';
    table.style.backgroundColor = 'white';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';
    table.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    
    // Crear encabezados
    const modulos = ['clientes', 'pedidos', 'pagos', 'productos', 'contactos', 'usuarios'];
    const acciones = ['crear', 'leer', 'editar', 'eliminar'];
    
    let headerHTML = `
        <thead>
            <tr style="background-color: #f3f4f6;">
                <th style="padding: 1rem; text-align: left; font-weight: 600; color: #374151; border-right: 1px solid #e5e7eb;">Perfil</th>
                <th style="padding: 1rem; text-align: left; font-weight: 600; color: #374151; border-right: 1px solid #e5e7eb;">Módulo</th>
                <th style="padding: 0.5rem; text-align: center; font-weight: 600; color: #374151; border-right: 1px solid #e5e7eb;">Crear</th>
                <th style="padding: 0.5rem; text-align: center; font-weight: 600; color: #374151; border-right: 1px solid #e5e7eb;">Leer</th>
                <th style="padding: 0.5rem; text-align: center; font-weight: 600; color: #374151; border-right: 1px solid #e5e7eb;">Editar</th>
                <th style="padding: 0.5rem; text-align: center; font-weight: 600; color: #374151;">Eliminar</th>
            </tr>
        </thead>
    `;
    
    let bodyHTML = '<tbody>';
    let rowIndex = 0;
    
    Object.keys(window.permisosPorPerfil).forEach(perfil => {
        modulos.forEach((modulo, moduloIndex) => {
            const permisos = window.permisosPorPerfil[perfil][modulo];
            const isFirstModuleOfProfile = moduloIndex === 0;
            
            bodyHTML += `
                <tr style="background-color: ${rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb'}; border-bottom: 1px solid #e5e7eb;">
                    ${isFirstModuleOfProfile ? 
                        `<td rowspan="${modulos.length}" style="padding: 1rem; color: #111827; font-weight: 600; border-right: 1px solid #e5e7eb; vertical-align: top;">
                            <span class="badge badge-${perfil.toLowerCase()}" style="padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;">${perfil}</span>
                        </td>` : ''
                    }
                    <td style="padding: 1rem; color: #6b7280; text-transform: capitalize; border-right: 1px solid #e5e7eb;">${modulo}</td>
                    <td style="padding: 0.5rem; text-align: center; border-right: 1px solid #e5e7eb;">
                        ${isAdmin ? 
                            `<input type="checkbox" ${permisos.crear ? 'checked' : ''} 
                             onchange="updatePermission('${perfil}', '${modulo}', 'crear', this.checked)"
                             style="width: 18px; height: 18px; cursor: pointer;">` :
                            `<i class="fas ${permisos.crear ? 'fa-check text-green-600' : 'fa-times text-red-600'}" style="color: ${permisos.crear ? '#10b981' : '#ef4444'};"></i>`
                        }
                    </td>
                    <td style="padding: 0.5rem; text-align: center; border-right: 1px solid #e5e7eb;">
                        ${isAdmin ? 
                            `<input type="checkbox" ${permisos.leer ? 'checked' : ''} 
                             onchange="updatePermission('${perfil}', '${modulo}', 'leer', this.checked)"
                             style="width: 18px; height: 18px; cursor: pointer;">` :
                            `<i class="fas ${permisos.leer ? 'fa-check text-green-600' : 'fa-times text-red-600'}" style="color: ${permisos.leer ? '#10b981' : '#ef4444'};"></i>`
                        }
                    </td>
                    <td style="padding: 0.5rem; text-align: center; border-right: 1px solid #e5e7eb;">
                        ${isAdmin ? 
                            `<input type="checkbox" ${permisos.editar ? 'checked' : ''} 
                             onchange="updatePermission('${perfil}', '${modulo}', 'editar', this.checked)"
                             style="width: 18px; height: 18px; cursor: pointer;">` :
                            `<i class="fas ${permisos.editar ? 'fa-check text-green-600' : 'fa-times text-red-600'}" style="color: ${permisos.editar ? '#10b981' : '#ef4444'};"></i>`
                        }
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        ${isAdmin ? 
                            `<input type="checkbox" ${permisos.eliminar ? 'checked' : ''} 
                             onchange="updatePermission('${perfil}', '${modulo}', 'eliminar', this.checked)"
                             style="width: 18px; height: 18px; cursor: pointer;">` :
                            `<i class="fas ${permisos.eliminar ? 'fa-check text-green-600' : 'fa-times text-red-600'}" style="color: ${permisos.eliminar ? '#10b981' : '#ef4444'};"></i>`
                        }
                    </td>
                </tr>
            `;
            rowIndex++;
        });
    });
    
    bodyHTML += '</tbody>';
    
    table.innerHTML = headerHTML + bodyHTML;
    
    // Limpiar contenedor y agregar tabla
    const existingInfoDiv = container.querySelector('div[style*="background: #dbeafe"]');
    if (!existingInfoDiv && isAdmin) {
        // El div de info ya se agregó arriba
    }
    
    // Remover tabla anterior si existe
    const existingTable = container.querySelector('table');
    if (existingTable) {
        existingTable.remove();
    }
    
    container.appendChild(table);
    
    // Agregar botón de guardar para administradores
    if (isAdmin) {
        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn-primary';
        saveButton.style.cssText = 'margin-top: 1rem; background-color: #10b981; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;';
        saveButton.innerHTML = '<i class="fas fa-save" style="margin-right: 0.5rem;"></i>Guardar Permisos';
        saveButton.onclick = savePermissions;
        container.appendChild(saveButton);
    }
    
    // Agregar mensaje de confirmación visual
    const confirmationMsg = document.createElement('div');
    confirmationMsg.style.cssText = 'background: #8b5cf6; color: white; padding: 0.5rem 1rem; border-radius: 4px; margin-top: 1rem; text-align: center; font-weight: 500;';
    confirmationMsg.textContent = `✅ Tabla de permisos por perfil cargada exitosamente ${isAdmin ? '(Modo Edición)' : '(Solo Lectura)'}`;
    container.appendChild(confirmationMsg);
    
    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
        if (confirmationMsg.parentNode) {
            confirmationMsg.parentNode.removeChild(confirmationMsg);
        }
    }, 3000);
    
    debugLog('ADMIN', '✅ Tabla de permisos renderizada exitosamente');
}

// Funciones para administración de usuarios
async function editUser(userId) {
    console.log('Editar usuario:', userId);
    
    try {
        // Obtener datos del usuario
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/usuarios/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const user = await response.json();
        console.log('Datos del usuario obtenidos:', user);
        
        // Llenar el modal de edición
        const modal = document.getElementById('edit-user-modal');
        if (!modal) {
            showNotification('Error: Modal de edición no encontrado', 'error');
            return;
        }
        
        // Llenar los campos del formulario
        document.getElementById('edit-user-nombre').value = user.nombre || '';
        document.getElementById('edit-user-email').value = user.email || '';
        document.getElementById('edit-user-perfil').value = user.perfil || '';
        document.getElementById('edit-user-password').value = ''; // Limpiar campo de contraseña
        
        // Guardar el ID del usuario para el submit
        modal.setAttribute('data-user-id', userId);
        
        // Mostrar el modal
        modal.classList.add('active');
        modal.style.cssText = `
            display: flex !important;
            z-index: 12000 !important;
            background-color: rgba(0, 0, 0, 0.7) !important;
        `;
        
        // Configurar eventos de cierre si no están configurados
        const closeButtons = modal.querySelectorAll('.close-modal, .cancel-btn');
        closeButtons.forEach(btn => {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                modal.classList.remove('active');
                modal.style.cssText = 'display: none !important;';
                modal.removeAttribute('data-user-id');
            };
        });
        
        // Configurar submit del formulario
        const form = modal.querySelector('#edit-user-form');
        if (form) {
            form.onsubmit = async function(e) {
                e.preventDefault();
                await handleEditUserSubmit(e, userId);
            };
        }
        
        console.log('✅ Modal de edición de usuario abierto');
        
    } catch (error) {
        console.error('❌ Error obteniendo datos del usuario:', error);
        showNotification(`Error al cargar datos del usuario: ${error.message}`, 'error');
    }
}

async function handleEditUserSubmit(e, userId) {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const userData = {
            nombre: formData.get('nombre') || document.getElementById('edit-user-nombre').value,
            email: formData.get('email') || document.getElementById('edit-user-email').value,
            perfil: formData.get('perfil') || document.getElementById('edit-user-perfil').value
        };
        
        // Solo incluir contraseña si se proporciona
        const password = document.getElementById('edit-user-password').value;
        if (password && password.trim() !== '') {
            userData.password = password;
        }
        
        console.log('Datos de usuario a actualizar:', userData);
        
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            showNotification('Usuario actualizado exitosamente', 'success');
            
            // Cerrar modal
            const modal = document.getElementById('edit-user-modal');
            modal.classList.remove('active');
            modal.style.cssText = 'display: none !important;';
            modal.removeAttribute('data-user-id');
            
            // Recargar la tabla de usuarios
            await loadUsersForAdmin();
        } else {
            const errorData = await response.json();
            console.error('❌ Error del servidor:', response.status, errorData);
            showNotification(errorData.message || `Error del servidor: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error actualizando usuario:', error);
        showNotification(`Error de conexión: ${error.message}`, 'error');
    }
}

// Función para actualizar permisos en tiempo real
function updatePermission(perfil, modulo, accion, valor) {
    console.log(`Actualizando permiso: ${perfil} -> ${modulo} -> ${accion} = ${valor}`);
    
    // Verificar que el usuario sea administrador
    const currentUser = getCurrentUserFromAuth();
    if (currentUser?.perfil !== 'Administrador') {
        showNotification('Error: Solo los administradores pueden modificar permisos', 'error');
        return;
    }
    
    // Actualizar el valor en la estructura global
    if (window.permisosPorPerfil && window.permisosPorPerfil[perfil] && window.permisosPorPerfil[perfil][modulo]) {
        window.permisosPorPerfil[perfil][modulo][accion] = valor;
        console.log('✅ Permiso actualizado en memoria');
        
        // Mostrar notificación de cambio
        showNotification(`Permiso ${valor ? 'otorgado' : 'revocado'}: ${perfil} - ${modulo} - ${accion}`, 'info');
    } else {
        console.error('❌ Error: Estructura de permisos no encontrada');
        showNotification('Error: No se pudo actualizar el permiso', 'error');
    }
}

// Función para guardar permisos en el servidor
async function savePermissions() {
    console.log('Guardando permisos en el servidor...');
    
    // Verificar que el usuario sea administrador
    const currentUser = getCurrentUserFromAuth();
    if (currentUser?.perfil !== 'Administrador') {
        showNotification('Error: Solo los administradores pueden guardar permisos', 'error');
        return;
    }
    
    try {
        const token = localStorage.getItem('authToken');
        
        // Mostrar indicador de carga
        const saveButton = document.querySelector('.perms-table-container button');
        if (saveButton) {
            saveButton.disabled = true;
            saveButton.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Guardando...';
        }
        
        console.log('📤 Enviando permisos al servidor:', window.permisosPorPerfil);
        
        const response = await fetch('/api/permisos', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                permisos: window.permisosPorPerfil
            })
        });
        
        console.log('📥 Respuesta del servidor:', response.status, response.statusText);
        
        if (response.ok) {
            const result = await response.json();
            showNotification(`Permisos guardados exitosamente (${result.count} registros)`, 'success');
            console.log('✅ Permisos guardados en el servidor:', result);
        } else {
            // Intentar leer la respuesta como JSON
            let errorData;
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                errorData = await response.json();
            } else {
                // Si no es JSON, leer como texto (probablemente HTML de error)
                const textResponse = await response.text();
                console.error('❌ Respuesta no-JSON del servidor:', textResponse.substring(0, 200) + '...');
                errorData = { message: `Error del servidor: ${response.status}` };
            }
            
            console.error('❌ Error guardando permisos:', response.status, errorData);
            
            // Si no existe el endpoint, simular guardado local
            if (response.status === 404) {
                console.log('ℹ️ Endpoint de permisos no implementado, guardando localmente...');
                localStorage.setItem('permisosPorPerfil', JSON.stringify(window.permisosPorPerfil));
                showNotification('Permisos guardados localmente (endpoint en desarrollo)', 'warning');
            } else if (response.status === 403) {
                showNotification('Error: No tienes permisos para guardar configuraciones', 'error');
            } else {
                showNotification(errorData.message || `Error del servidor: ${response.status}`, 'error');
            }
        }
    } catch (error) {
        console.error('❌ Error de conexión guardando permisos:', error);
        
        // Guardar localmente como respaldo
        localStorage.setItem('permisosPorPerfil', JSON.stringify(window.permisosPorPerfil));
        showNotification('Permisos guardados localmente debido a error de conexión', 'warning');
    } finally {
        // Restaurar botón
        const saveButton = document.querySelector('.perms-table-container button');
        if (saveButton) {
            saveButton.disabled = false;
            saveButton.innerHTML = '<i class="fas fa-save" style="margin-right: 0.5rem;"></i>Guardar Permisos';
        }
    }
}

// Función para cargar permisos desde el servidor o localStorage
async function loadPermissions() {
    console.log('Cargando permisos...');
    
    try {
        const token = localStorage.getItem('authToken');
        
        const response = await fetch('/api/permisos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            window.permisosPorPerfil = data.permisos;
            console.log('✅ Permisos cargados desde el servidor');
        } else if (response.status === 404) {
            // Si no existe el endpoint, usar permisos por defecto o localStorage
            const savedPermissions = localStorage.getItem('permisosPorPerfil');
            if (savedPermissions) {
                window.permisosPorPerfil = JSON.parse(savedPermissions);
                console.log('✅ Permisos cargados desde localStorage');
            } else {
                console.log('ℹ️ Usando permisos por defecto');
            }
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error('❌ Error cargando permisos:', error);
        
        // Intentar cargar desde localStorage
        const savedPermissions = localStorage.getItem('permisosPorPerfil');
        if (savedPermissions) {
            window.permisosPorPerfil = JSON.parse(savedPermissions);
            console.log('✅ Permisos cargados desde localStorage como respaldo');
        } else {
            console.log('ℹ️ Usando permisos por defecto debido a error');
        }
    }
}

// Función para obtener estilos de color para estados de pedidos
function getOrderStatusStyle(status) {
    const styles = {
        'pendiente de pago': {
            backgroundColor: '#fef3c7',
            color: '#d97706',
            borderColor: '#f59e0b'
        },
        'fabricar': {
            backgroundColor: '#dbeafe',
            color: '#2563eb',
            borderColor: '#3b82f6'
        },
        'sale fabrica': {
            backgroundColor: '#f3e8ff',
            color: '#9333ea',
            borderColor: '#a855f7'
        },
        'completado': {
            backgroundColor: '#dcfce7',
            color: '#16a34a',
            borderColor: '#22c55e'
        }
    };
    
    const defaultStyle = {
        backgroundColor: '#f3f4f6',
        color: '#6b7280',
        borderColor: '#d1d5db'
    };
    
    const style = styles[status] || defaultStyle;
    
    return `
        background-color: ${style.backgroundColor};
        color: ${style.color};
        border: 1px solid ${style.borderColor};
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        text-align: center;
        display: inline-block;
        min-width: 100px;
        white-space: nowrap;
    `;
}
