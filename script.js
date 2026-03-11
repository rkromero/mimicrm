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

// Funciones de utilidad
function formatCurrency(amount) {
    if (amount === null || amount === undefined || isNaN(amount)) return '$ 0,00';
    
    // Convertir a número si es string
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(numAmount)) return '$ 0,00';
    
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(numAmount);
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
    return new Date(date).toLocaleDateString('es-ES');
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
        
        // Aplicar el tema guardado del usuario
        if (user.tema === 'dark') {
            document.body.classList.add('theme-dark');
        } else {
            document.body.classList.remove('theme-dark');
        }
        
        // Mostrar panel de administración si el usuario es administrador
        if (user.perfil === 'Administrador') {
            const adminNav = document.getElementById('admin-profiles-nav');
            if (adminNav) {
                adminNav.style.display = 'block';
                
            }
        }
        
        // Configurar visibilidad del menú para perfil Produccion
        if (user.perfil === 'Produccion') {
            // Usar setTimeout para asegurar que el DOM esté completamente cargado
            setTimeout(() => {
                configurarMenuProduccion();
            }, 100);
        }
        
        // Configurar visibilidad del menú para perfil Vendedor
        if (user.perfil === 'Vendedor') {
            setTimeout(() => {
                configurarMenuVendedor();
            }, 100);
        }
        
        // Configurar visibilidad del menú para perfil Gerente de ventas
        if (user.perfil === 'Gerente de ventas') {
            setTimeout(() => {
                configurarMenuGerenteVentas();
            }, 100);
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

function openDynamicModal(modalEl) {
    saveScroll();
    document.body.appendChild(modalEl);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modalEl.classList.add('active');
        trapFocus(modalEl);
    });
    modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) {
            closeDynamicModal(modalEl);
        }
    });
}

function closeDynamicModal(modalEl) {
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
    restoreScroll();
    setTimeout(() => modalEl.remove(), 300);
}

// Función para hacer logout
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    window.location.href = '/login.html';
}

// Función para configurar el menú específicamente para usuarios de Producción
function configurarMenuProduccion() {
    
    
    try {
        // Array de textos de navegación a ocultar para producción
        const textosAOcultar = [
            'Dashboard',
            'Clientes',  
            'Pedidos',
            'Pagos',
            'Productos',
            'Contactos',
            'Administrar Perfiles'
        ];
        
        // Obtener todos los elementos de navegación
        const navItems = document.querySelectorAll('.nav-item');
        
        // Ocultar elementos basándose en el texto del span
        navItems.forEach(navItem => {
            const span = navItem.querySelector('span');
            if (span && textosAOcultar.includes(span.textContent.trim())) {
                navItem.style.display = 'none';
                
            }
        });
        
        // Asegurar que el elemento de Fábrica esté visible
        const fabricaNav = document.getElementById('fabrica-nav');
        if (fabricaNav) {
            fabricaNav.style.display = 'block';
            
            
            // Hacer click automáticamente en Fábrica para mostrarla por defecto
            setTimeout(() => {
                fabricaNav.click();
                
            }, 200);
        } else {
            console.error('❌ Elemento fabrica-nav no encontrado');
        }
        
        // También ocultar los botones del header para usuarios de producción
        const headerButtons = [
            'new-client-btn',
            'new-order-btn', 
            'new-payment-btn'
        ];
        
        headerButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.style.display = 'none';
                
            }
        });
        
        
        
    } catch (error) {
        console.error('❌ Error configurando menú para producción:', error);
    }
}

// === FUNCIONES DE CARGA DE DATOS DESDE API ===

// Función para cargar clientes desde la API
async function loadClients(force) {
    if (!force && isCacheFresh('clients') && clients.length > 0) { renderClientsTable(); return; }
    showClientsSkeleton();
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/clientes', {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            clients = await response.json();
            setCache('clients');
            renderClientsTable();
            populateClientVendorFilter();
        } else {
            console.error('Error cargando clientes:', response.statusText);
            showNotification('No se pudieron cargar los clientes. Intentá de nuevo.', 'error');
            const c = document.getElementById('clients-list');
            if (c) c.innerHTML = '<p class="text-center" style="padding:2rem;color:#6b7280">Error al cargar clientes</p>';
        }
    } catch (error) {
        console.error('Error cargando clientes:', error);
        showNotification('Error de conexión al cargar clientes.', 'error');
        const c = document.getElementById('clients-list');
        if (c) c.innerHTML = '<p class="text-center" style="padding:2rem;color:#6b7280">Error de conexión</p>';
    }
}

// Función para cargar productos desde la API
async function loadProducts(force) {
    if (!force && isCacheFresh('products') && products.length > 0) { renderProductsTable(); return; }
    showTableSkeleton('products-table-body', 4, 5);
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/productos', {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            products = await response.json();
            setCache('products');
            renderProductsTable();
        } else {
            console.error('Error cargando productos:', response.statusText);
            showNotification('No se pudieron cargar los productos.', 'error');
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
        showNotification('Error de conexión al cargar productos.', 'error');
    }
}

// Función para cargar pedidos desde la API
async function loadOrders(force) {
    if (!force && isCacheFresh('orders') && orders.length > 0) { renderOrdersTable(); return; }
    showTableSkeleton('orders-table-body', 8, 6);
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/pedidos', {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            orders = await response.json();
            setCache('orders');
            renderOrdersTable();
            populateVendorFilter();

            const pedidosSection = document.getElementById('pedidos-section');
            if (pedidosSection && pedidosSection.style.display !== 'none') {
                setupOrdersSearch();
            }

            const fabricaSection = document.getElementById('fabrica-section');
            if (fabricaSection && fabricaSection.style.display !== 'none') {
                renderFabricaTable();
            }
        } else {
            console.error('Error cargando pedidos:', response.statusText);
            showNotification('No se pudieron cargar los pedidos.', 'error');
        }
    } catch (error) {
        console.error('Error cargando pedidos:', error);
        showNotification('Error de conexión al cargar pedidos.', 'error');
    }
}

// Función para cargar pagos desde la API
async function loadPayments(force) {
    if (!force && isCacheFresh('payments') && payments.length > 0) { renderPaymentsTable(); return; }
    showTableSkeleton('payments-table-body', 7, 6);
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/pagos', {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            payments = await response.json();
            setCache('payments');
            renderPaymentsTable();
        } else {
            console.error('Error cargando pagos:', response.statusText);
            showNotification('No se pudieron cargar los pagos.', 'error');
        }
    } catch (error) {
        console.error('Error cargando pagos:', error);
        showNotification('Error de conexión al cargar pagos.', 'error');
    }
}

// Función para cargar contactos desde la API
async function loadContacts(force) {
    if (!force && isCacheFresh('contacts') && contacts.length > 0) { renderContactsTable(); return; }
    showTableSkeleton('contacts-table-body', 7, 5);
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/contactos', {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            contacts = await response.json();
            setCache('contacts');
            renderContactsTable();
        } else {
            console.error('Error cargando contactos:', response.statusText);
            showNotification('No se pudieron cargar los contactos.', 'error');
        }
    } catch (error) {
        console.error('Error cargando contactos:', error);
        showNotification('Error de conexión al cargar contactos.', 'error');
    }
}

// === FUNCIONES DE RENDERIZADO ===

// Función para renderizar la tabla de clientes
function populateClientVendorFilter() {
    const select = document.getElementById('client-filter-vendedor');
    if (!select) return;
    const vendors = [...new Set(clients.map(c => c.ultimo_vendedor).filter(Boolean))].sort();
    const current = select.value;
    select.innerHTML = '<option value="">Todos</option>' +
        vendors.map(v => `<option value="${v}"${v === current ? ' selected' : ''}>${v}</option>`).join('');
}

function applyClientsVendorFilter() {
    const vendedor = document.getElementById('client-filter-vendedor')?.value || '';
    const filtered = vendedor ? clients.filter(c => c.ultimo_vendedor === vendedor) : null;
    renderClientsTable(filtered);
}

function resetClientsVendorFilter() {
    const select = document.getElementById('client-filter-vendedor');
    if (select) select.value = '';
    const search = document.getElementById('clients-search');
    if (search) search.value = '';
    renderClientsTable();
}

function renderClientsTable(clientsToRender = null) {
    const container = document.getElementById('clients-list');
    if (!container) return;
    const list = clientsToRender || clients;

    if (list.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-users empty-state-icon"></i><div class="empty-state-title">Sin clientes registrados</div><div class="empty-state-desc">Usá el botón "Nuevo Cliente" para agregar el primero.</div></div>';
        updateSectionCount('clientes-count', 0);
        return;
    }
    updateSectionCount('clientes-count', list.length);
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
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
    
    if (isMobile) {
        // Crear vista de cards para móvil
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'mobile-cards-container';
        
        // Crear tabla oculta para desktop
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-responsive';
        tableContainer.style.display = 'none';
        
        const table = document.createElement('table');
        table.className = 'clients-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Localidad</th>
                    <th>Teléfono</th>
                    <th>Vendedor</th>
                    <th>Saldo Pendiente</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="clients-table-body">
                ${list.map(client => {
                    const saldoPendiente = (client.total_pedidos || 0) - (client.total_pagos || 0);
                    const saldoStyle = getSaldoStyle(saldoPendiente);
                    return `
                        <tr>
                            <td>${(client.nombre || client.name || '') + ' ' + (client.apellido || '')}</td>
                            <td>${client.documento || client.cuit}</td>
                            <td>${client.localidad || '-'}</td>
                            <td>${client.telefono || client.phone}</td>
                            <td style="color:#6b7280; font-size:0.85rem;">${client.ultimo_vendedor || '-'}</td>
                            <td>
                                <span style="${saldoStyle}">
                                    ${formatCurrency(saldoPendiente)}
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

        // Crear cards para móvil
        list.forEach(client => {
            const saldoPendiente = (client.total_pedidos || 0) - (client.total_pagos || 0);
            const saldoStyle = getSaldoStyle(saldoPendiente);

            const card = document.createElement('div');
            card.className = 'mobile-card';
            card.innerHTML = `
                <div class="mobile-card-header">
                    <div class="mobile-card-title">${(client.nombre || client.name || '') + ' ' + (client.apellido || '')}</div>
                </div>
                <div class="mobile-card-content">
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Documento:</span>
                        <span class="mobile-card-value">${client.documento || client.cuit}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Localidad:</span>
                        <span class="mobile-card-value">${client.localidad || '-'}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Teléfono:</span>
                        <span class="mobile-card-value">${client.telefono || client.phone}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Vendedor:</span>
                        <span class="mobile-card-value">${client.ultimo_vendedor || '-'}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Saldo Pendiente:</span>
                        <span class="mobile-card-value" style="${saldoStyle}">
                            ${formatCurrency(saldoPendiente)}
                        </span>
                    </div>
                </div>
                <div class="mobile-card-actions">
                    <button onclick="viewClientDetails(${client.id}).catch(console.error)" class="btn btn-primary">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button onclick="editClient(${client.id})" class="btn btn-secondary">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button onclick="deleteClient(${client.id})" class="btn btn-secondary" style="color: #dc2626;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
        
        tableContainer.appendChild(table);
        container.innerHTML = '';
        container.appendChild(cardsContainer);
        container.appendChild(tableContainer);
    } else {
        // Crear vista de tabla para desktop
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-responsive';
        
        const table = document.createElement('table');
        table.className = 'clients-table';
        
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Localidad</th>
                    <th>Teléfono</th>
                    <th>Vendedor</th>
                    <th>Saldo Pendiente</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="clients-table-body">
                ${list.map(client => {
                    const saldoPendiente = (client.total_pedidos || 0) - (client.total_pagos || 0);
                    const saldoStyle = getSaldoStyle(saldoPendiente);

                    return `
                        <tr>
                            <td>${(client.nombre || client.name || '') + ' ' + (client.apellido || '')}</td>
                            <td>${client.documento || client.cuit}</td>
                            <td>${client.localidad || '-'}</td>
                            <td>${client.telefono || client.phone}</td>
                            <td style="color:#6b7280; font-size:0.85rem;">${client.ultimo_vendedor || '-'}</td>
                            <td>
                                <span style="${saldoStyle}">
                                    ${formatCurrency(saldoPendiente)}
                                </span>
                            </td>
                            <td>
                                <button onclick="viewClientDetails(${client.id}).catch(console.error)" class="btn-icon" title="Ver detalles">
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
        
        tableContainer.appendChild(table);
        container.innerHTML = '';
        container.appendChild(tableContainer);
    }
    
    // Configurar búsqueda de clientes
    setupClientsSearch();
}

// Función para configurar la búsqueda de clientes
function setupClientsSearch() {
    const searchInput = document.getElementById('clients-search');
    if (!searchInput) return;
    
    // Limpiar listeners previos
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);
    
    newSearchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Búsqueda en cards móviles
            const cards = document.querySelectorAll('.mobile-card');
            cards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                
                if (cardText.includes(searchTerm) || searchTerm === '') {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            // Búsqueda en tabla desktop
            const tableBody = document.getElementById('clients-table-body');
            if (!tableBody) return;
            
            const rows = tableBody.querySelectorAll('tr');
            rows.forEach(row => {
                const clientName = row.cells[0].textContent.toLowerCase();
                const clientDocument = row.cells[1].textContent.toLowerCase();
                const clientLocalidad = row.cells[2].textContent.toLowerCase();
                const clientPhone = row.cells[3].textContent.toLowerCase();
                
                // Buscar en nombre, documento, localidad y teléfono
                const matches = clientName.includes(searchTerm) || 
                              clientDocument.includes(searchTerm) || 
                              clientLocalidad.includes(searchTerm) || 
                              clientPhone.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    }, 250));
}

// Función para renderizar la tabla de pedidos
function renderOrdersTable(filteredOrders = null) {
    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;
    
    // Usar filteredOrders si se proporciona, sino usar orders
    const ordersToRender = filteredOrders || orders;
    
    if (ordersToRender.length === 0) {
        const msg = (filteredOrders !== null) ? 'No hay pedidos que coincidan con tu búsqueda.' : 'Todavía no hay pedidos registrados.';
        tbody.innerHTML = '<tr><td colspan="10"><div class="empty-state"><i class="fas fa-shopping-cart empty-state-icon"></i><div class="empty-state-title">Sin pedidos</div><div class="empty-state-desc">' + msg + '</div></div></td></tr>';
        const pg = document.getElementById('orders-pagination');
        if (pg) pg.innerHTML = '';
        updateSectionCount('pedidos-count', 0);
        return;
    }
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Obtener el contenedor padre (table-responsive)
        const tableContainer = tbody.closest('.table-responsive');
        if (!tableContainer) return;
        
        // Crear vista de cards para móvil
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'mobile-cards-container';
        
        // Crear cards para móvil
        ordersToRender.forEach(order => {
            const card = document.createElement('div');
            card.className = 'mobile-card';
            card.innerHTML = `
                <div class="mobile-card-header">
                    <div class="mobile-card-title">${order.numero_pedido}</div>
                </div>
                <div class="mobile-card-content">
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Cliente:</span>
                        <span class="mobile-card-value">${(order.cliente_nombre || '') + ' ' + (order.cliente_apellido || '')}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Descripción:</span>
                        <span class="mobile-card-value">${order.descripcion || 'Sin descripción'}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Monto:</span>
                        <span class="mobile-card-value">${formatCurrency(order.monto)}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Estado:</span>
                        <span class="mobile-card-value" style="${getOrderStatusStyle(order.estado)}">
                            ${translateOrderStatus(order.estado)}
                        </span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Fecha:</span>
                        <span class="mobile-card-value">${formatDate(order.fecha)}</span>
                    </div>
                </div>
                <div class="mobile-card-actions">
                    <button onclick="viewOrderDetails(${order.id})" class="btn btn-primary">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button onclick="editOrder(${order.id})" class="btn btn-secondary">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button onclick="deleteOrder(${order.id})" class="btn btn-secondary" style="color: #dc2626;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
        
        // Ocultar la tabla y mostrar las cards
        tableContainer.style.display = 'none';
        tableContainer.parentNode.insertBefore(cardsContainer, tableContainer.nextSibling);
    } else {
        // Mostrar la tabla y ocultar las cards si existen
        const tableContainer = tbody.closest('.table-responsive');
        if (tableContainer) {
            tableContainer.style.display = 'block';
        }
        
        // Remover cards si existen
        const existingCards = document.querySelector('#pedidos-section .mobile-cards-container');
        if (existingCards) {
            existingCards.remove();
        }
        
        // Paginación
        if (!paginationState.orders) paginationState.orders = 1;
        const _totalOrders = ordersToRender.length;
        const _startO = (paginationState.orders - 1) * PAGE_SIZE;
        const _pageOrders = ordersToRender.slice(_startO, _startO + PAGE_SIZE);
        updateSectionCount('pedidos-count', _totalOrders);

        // Resetear select-all al re-renderizar
        const selectAll = document.getElementById('orders-select-all');
        if (selectAll) selectAll.checked = false;

        // Renderizar tabla normal (página actual)
        tbody.innerHTML = _pageOrders.map(order => `
            <tr data-order-id="${order.id}">
                <td><input type="checkbox" class="order-checkbox" value="${order.id}" onchange="onOrderCheckboxChange()"></td>
                <td>${order.numero_pedido}</td>
                <td>${order.cliente_nombre || 'N/A'}</td>
                <td>${order.cliente_apellido || 'N/A'}</td>
                <td>${order.descripcion || 'Sin descripción'}</td>
                <td>${formatCurrency(order.monto)}</td>
                <td>
                    <span style="${getOrderStatusStyle(order.estado)}">
                        ${translateOrderStatus(order.estado)}
                    </span>
                </td>
                <td><div class="vendor-cell">${getInitialsAvatar(order.vendedor_asignado_nombre || '')}${order.vendedor_asignado_nombre || 'N/A'}</div></td>
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

        renderPagination('orders-pagination', paginationState.orders, _totalOrders, function(page) {
            paginationState.orders = page;
            renderOrdersTable(filteredOrders);
        });
    }
    
    // Configurar ordenamiento de columnas después de renderizar
    setupOrdersTableSorting();
}

// Variables para el estado del ordenamiento
let currentOrderSort = { column: '', direction: '' };

// Función para configurar la búsqueda de pedidos
function setupOrdersSearch() {
    const searchInput = document.getElementById('orders-search');
    if (!searchInput) return;
    
    // Limpiar listeners previos
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);
    
    newSearchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();

        if (!searchTerm) {
            // Si no hay término de búsqueda, mostrar todos los pedidos
            renderOrdersTable();
            return;
        }

        // Filtrar pedidos por nombre y apellido del cliente
        const filteredOrders = orders.filter(order => {
            const clientName = (order.cliente_nombre || '').toLowerCase();
            const clientLastName = (order.cliente_apellido || '').toLowerCase();
            const fullName = `${clientName} ${clientLastName}`.trim();

            return clientName.includes(searchTerm) ||
                   clientLastName.includes(searchTerm) ||
                   fullName.includes(searchTerm);
        });

        // Renderizar la tabla con los pedidos filtrados
        renderOrdersTable(filteredOrders);
    }, 250));
}

// Función para configurar el ordenamiento de la tabla de pedidos
function setupOrdersTableSorting() {
    const sortableHeaders = document.querySelectorAll('#pedidos-section .sortable');
    
    sortableHeaders.forEach(header => {
        // Remover listeners previos
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        newHeader.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            
            // Determinar dirección del ordenamiento
            let direction = 'asc';
            if (currentOrderSort.column === column && currentOrderSort.direction === 'asc') {
                direction = 'desc';
            }
            
            // Actualizar estado de ordenamiento
            currentOrderSort = { column, direction };
            
            // Actualizar estilos de encabezados
            sortableHeaders.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            this.classList.add(direction === 'asc' ? 'sort-asc' : 'sort-desc');
            
            // Ordenar los pedidos
            const sortedOrders = sortOrders(orders.slice(), column, direction);
            
            // Renderizar tabla ordenada
            renderOrdersTable(sortedOrders);
        });
    });
}

// Función para ordenar los pedidos según la columna y dirección
function sortOrders(ordersArray, column, direction) {
    return ordersArray.sort((a, b) => {
        let valueA, valueB;
        
        switch(column) {
            case 'numero_pedido':
                valueA = a.numero_pedido || '';
                valueB = b.numero_pedido || '';
                break;
            case 'cliente_nombre':
                valueA = (a.cliente_nombre || '').toLowerCase();
                valueB = (b.cliente_nombre || '').toLowerCase();
                break;
            case 'cliente_apellido':
                valueA = (a.cliente_apellido || '').toLowerCase();
                valueB = (b.cliente_apellido || '').toLowerCase();
                break;
            case 'descripcion':
                valueA = (a.descripcion || '').toLowerCase();
                valueB = (b.descripcion || '').toLowerCase();
                break;
            case 'monto':
                valueA = parseFloat(a.monto) || 0;
                valueB = parseFloat(b.monto) || 0;
                break;
            case 'estado':
                valueA = (a.estado || '').toLowerCase();
                valueB = (b.estado || '').toLowerCase();
                break;
            case 'fecha':
                valueA = new Date(a.fecha || 0);
                valueB = new Date(b.fecha || 0);
                break;
            default:
                return 0;
        }
        
        let comparison = 0;
        if (valueA < valueB) {
            comparison = -1;
        } else if (valueA > valueB) {
            comparison = 1;
        }
        
        return direction === 'desc' ? -comparison : comparison;
    });
}

// Función para renderizar la tabla de pagos
function renderPaymentsTable() {
    const tbody = document.getElementById('payments-table-body');
    if (!tbody) return;
    
    updateSectionCount('pagos-count', payments.length);
    if (payments.length === 0) {
        const tableContainer = tbody.closest('.table-responsive');
        if (tableContainer) tableContainer.style.display = 'none';
        const existingEmpty = tbody.closest('section')?.querySelector('.empty-state');
        if (!existingEmpty) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.innerHTML = `<div class="empty-state-icon"><i class="fas fa-credit-card"></i></div><div class="empty-state-title">Sin pagos registrados</div><div class="empty-state-desc">Los pagos aparecerán aquí una vez registrados.</div>`;
            tbody.closest('section')?.querySelector('.table-container, .table-responsive')?.parentNode?.appendChild(emptyDiv);
        }
        return;
    }
    const existingEmpty2 = tbody.closest('section')?.querySelector('.empty-state');
    if (existingEmpty2) existingEmpty2.remove();
    const tableContainer2 = tbody.closest('.table-responsive');
    if (tableContainer2) tableContainer2.style.display = 'block';
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Obtener el contenedor padre (table-responsive)
        const tableContainer = tbody.closest('.table-responsive');
        if (!tableContainer) return;
        
        // Crear vista de cards para móvil
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'mobile-cards-container';
        
        // Crear cards para móvil
        payments.forEach(payment => {
            const card = document.createElement('div');
            card.className = 'mobile-card';
            card.innerHTML = `
                <div class="mobile-card-header">
                    <div class="mobile-card-title">${payment.cliente_nombre || 'Cliente no encontrado'}</div>
                </div>
                <div class="mobile-card-content">
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Monto:</span>
                        <span class="mobile-card-value">${formatCurrency(payment.monto)}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Método:</span>
                        <span class="mobile-card-value">${payment.metodo}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Referencia:</span>
                        <span class="mobile-card-value">${payment.referencia || 'Sin referencia'}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Fecha:</span>
                        <span class="mobile-card-value">${formatDate(payment.fecha)}</span>
                    </div>
                </div>
                <div class="mobile-card-actions">
                    <button onclick="viewPaymentDetails(${payment.id})" class="btn btn-primary">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button onclick="editPayment(${payment.id})" class="btn btn-secondary">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button onclick="deletePayment(${payment.id})" class="btn btn-secondary" style="color: #dc2626;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
        
        // Ocultar la tabla y mostrar las cards
        tableContainer.style.display = 'none';
        tableContainer.parentNode.insertBefore(cardsContainer, tableContainer.nextSibling);
    } else {
        // Mostrar la tabla y ocultar las cards si existen
        const tableContainer = tbody.closest('.table-responsive');
        if (tableContainer) {
            tableContainer.style.display = 'block';
        }
        
        // Remover cards si existen
        const existingCards = document.querySelector('#pagos-section .mobile-cards-container');
        if (existingCards) {
            existingCards.remove();
        }
        
        // Renderizar tabla normal
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
}

// Función para renderizar la tabla de productos
function renderProductsTable() {
    const tbody = document.getElementById('products-table-body');
    updateSectionCount('productos-count', products.length);

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state"><div class="empty-state-icon"><i class="fas fa-box"></i></div><div class="empty-state-title">Sin productos registrados</div><div class="empty-state-desc">Usa el botón "Nuevo Producto" para crear el primero.</div></div></td></tr>`;
        const pc = document.getElementById('products-pagination');
        if (pc) pc.innerHTML = '';
        return;
    }

    const PROD_PAGE_SIZE = 10;
    if (!paginationState.products) paginationState.products = 1;
    const total = products.length;
    const start = (paginationState.products - 1) * PROD_PAGE_SIZE;
    const pageProducts = products.slice(start, start + PROD_PAGE_SIZE);

    tbody.innerHTML = pageProducts.map(product => `
        <tr>
            <td>${product.nombre}</td>
            <td>${product.descripcion || '-'}</td>
            <td>${formatCurrency(product.precio)}</td>
            <td>
                <button onclick="viewProductDetails(${product.id})" class="btn-icon" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="editProduct(${product.id})" class="btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteProduct(${product.id})" class="btn-icon" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    renderPagination('products-pagination', paginationState.products, total, function(page) {
        paginationState.products = page;
        renderProductsTable();
    });
}

// Función para renderizar la tabla de contactos
function renderContactsTable() {
    const tbody = document.getElementById('contacts-table-body');
    if (!tbody) return;
    
    updateSectionCount('contactos-count', contacts.length);
    if (contacts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="empty-state-icon"><i class="fas fa-address-book"></i></div><div class="empty-state-title">Sin contactos registrados</div><div class="empty-state-desc">Agrega contactos para mantener el seguimiento.</div></div></td></tr>`;
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

// Función para mostrar notificaciones (sistema con cola)
function showNotification(message, type = 'success') {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }

    // Limitar a 4 notificaciones simultáneas
    while (container.children.length >= 4) {
        dismissNotification(container.firstChild);
    }

    const icons = {
        success: 'fa-check-circle',
        error:   'fa-exclamation-circle',
        info:    'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type] || icons.success}"></i>
            <span>${message}</span>
            <button class="notification-close" title="Cerrar"><i class="fas fa-times"></i></button>
        </div>
    `;

    container.appendChild(notification);

    // Animar entrada
    requestAnimationFrame(() => requestAnimationFrame(() => notification.classList.add('show')));

    // Cerrar al hacer clic
    notification.querySelector('.notification-close').addEventListener('click', () => dismissNotification(notification));

    // Auto-dismiss
    notification._dismissTimer = setTimeout(() => dismissNotification(notification), 4500);
}

function dismissNotification(notification) {
    if (!notification || !notification.parentNode) return;
    clearTimeout(notification._dismissTimer);
    notification.classList.add('hide');
    setTimeout(() => { if (notification.parentNode) notification.remove(); }, 350);
}

// Diálogo de confirmación premium (reemplaza confirm() nativo)
function showConfirm({ title = 'Confirmar acción', message = '', detail = '', confirmText = 'Confirmar', confirmClass = 'btn-danger', cancelText = 'Cancelar' } = {}) {
    return new Promise((resolve) => {
        const dialog = document.getElementById('confirm-dialog');
        if (!dialog) { resolve(false); return; }

        dialog.querySelector('#confirm-dialog-title').textContent = title;
        dialog.querySelector('#confirm-dialog-message').textContent = message;

        const detailEl = dialog.querySelector('#confirm-dialog-detail');
        if (detail) { detailEl.innerHTML = detail; detailEl.style.display = 'block'; }
        else { detailEl.textContent = ''; detailEl.style.display = 'none'; }

        const okBtn = dialog.querySelector('#confirm-ok-btn');
        okBtn.textContent = confirmText;
        okBtn.className = `btn ${confirmClass}`;

        const cancelBtn = dialog.querySelector('#confirm-cancel-btn');
        cancelBtn.textContent = cancelText;

        dialog.classList.add('active');
        setTimeout(() => okBtn.focus(), 50);

        function cleanup() {
            dialog.classList.remove('active');
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
            dialog.removeEventListener('keydown', onKey);
        }
        function onOk()    { cleanup(); resolve(true); }
        function onCancel(){ cleanup(); resolve(false); }
        function onKey(e)  { if (e.key === 'Escape') { cleanup(); resolve(false); } }

        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
        dialog.addEventListener('keydown', onKey);
    });
}

// Helper para estado de carga en botones de formulario
function setButtonLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
        btn.disabled = true;
        btn.dataset.originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
    } else {
        btn.disabled = false;
        if (btn.dataset.originalHtml) { btn.innerHTML = btn.dataset.originalHtml; delete btn.dataset.originalHtml; }
    }
}

// Helper para mostrar skeleton en tablas (tbody)
function showTableSkeleton(tbodyId, cols = 5, rows = 6) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    const widths = [45, 60, 75, 55, 40, 80, 65, 50];
    let html = '';
    for (let i = 0; i < rows; i++) {
        html += '<tr class="skeleton-tr">';
        for (let c = 0; c < cols; c++) {
            const w = widths[(i * cols + c) % widths.length];
            html += `<td><div class="skeleton-line" style="width:${w}%"></div></td>`;
        }
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

// Helper para mostrar skeleton en clients-list (div)
function showClientsSkeleton() {
    const container = document.getElementById('clients-list');
    if (!container) return;
    const rows = [[65,25],[78,32],[52,28],[70,20],[61,35],[74,22]];
    let html = '<div class="skeleton-table">';
    rows.forEach(([w1, w2]) => {
        html += `<div class="skeleton-row-wrapper"><div class="skeleton-line" style="width:${w1}%"></div><div class="skeleton-line short" style="width:${w2}%"></div></div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// === HELPERS PREMIUM — BATCH 2 ===

// ─── DEBOUNCE (Item 2) ───
function debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ─── CACHE LOCAL (Item 4) ───
const dataCache = {};
const CACHE_TTL = 90 * 1000;
function isCacheFresh(key) { return dataCache[key] && (Date.now() - dataCache[key].timestamp < CACHE_TTL); }
function setCache(key)      { dataCache[key] = { timestamp: Date.now() }; }
function invalidateCache(...keys) { keys.forEach(k => delete dataCache[k]); }

// ─── AVATAR INITIALS (Item 22) ───
function getInitialsAvatar(name, size) {
    size = size || 26;
    const colors = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#14b8a6','#f97316'];
    const words = (name || '').trim().split(/\s+/);
    const initials = words.length >= 2
        ? (words[0][0] + words[words.length-1][0]).toUpperCase()
        : (words[0] || '?')[0].toUpperCase();
    const colorIndex = (name || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
    return '<span class="avatar-initials" style="background:' + colors[colorIndex] + ';width:' + size + 'px;height:' + size + 'px">' + initials + '</span>';
}

// ─── SECTION COUNTER (Item 23) ───
function updateSectionCount(countId, count) {
    const el = document.getElementById(countId);
    if (!el) return;
    el.textContent = count;
    el.style.display = count > 0 ? '' : 'none';
}

// ─── PAGINACIÓN (Item 1) ───
const PAGE_SIZE = 50;
const paginationState = {};

function renderPagination(containerId, currentPage, totalItems, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    let html = '<div class="pagination">';
    html += '<button class="pagination-btn" id="' + containerId + '-prev"' + (currentPage === 1 ? ' disabled' : '') + '><i class="fas fa-chevron-left"></i></button>';

    let prevEllipsis = false;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
            prevEllipsis = false;
            html += '<button class="pagination-btn' + (i === currentPage ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
        } else if (!prevEllipsis && Math.abs(i - currentPage) > 1) {
            prevEllipsis = true;
            html += '<span class="pagination-ellipsis">…</span>';
        }
    }

    html += '<button class="pagination-btn" id="' + containerId + '-next"' + (currentPage === totalPages ? ' disabled' : '') + '><i class="fas fa-chevron-right"></i></button>';
    html += '<span class="pagination-info">Página ' + currentPage + ' de ' + totalPages + ' (' + totalItems + ' registros)</span>';
    html += '</div>';

    container.innerHTML = html;
    const prevBtn = container.querySelector('#' + containerId + '-prev');
    const nextBtn = container.querySelector('#' + containerId + '-next');
    if (prevBtn) prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
    container.querySelectorAll('.pagination-btn[data-page]').forEach(function(btn) {
        btn.addEventListener('click', () => onPageChange(parseInt(btn.dataset.page)));
    });
}

// ─── FOCUS TRAP (Item 11) ───
function trapFocus(element) {
    const selectors = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(element.querySelectorAll(selectors));
    if (!focusable.length) return function() {};
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    function handler(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
        else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
    }
    element.addEventListener('keydown', handler);
    setTimeout(function() { if (first) first.focus(); }, 50);
    return function() { element.removeEventListener('keydown', handler); };
}

// ─── SCROLL RESTORATION (Item 12) ───
var _savedScrollY = 0;
function saveScroll()    { _savedScrollY = window.scrollY; }
function restoreScroll() { setTimeout(function() { window.scrollTo({ top: _savedScrollY, behavior: 'instant' }); }, 10); }

// ─── COMMAND PALETTE (Item 14) ───
var _cpSelectedIndex = 0;
var _cpCurrentResults = [];

function initCommandPalette() {
    const overlay = document.getElementById('command-palette-overlay');
    const input   = document.getElementById('command-palette-input');
    if (!overlay || !input) return;

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            overlay.classList.contains('active') ? closeCommandPalette() : openCommandPalette();
        }
    });

    const hint = document.getElementById('nav-search-hint');
    if (hint) hint.addEventListener('click', openCommandPalette);

    input.addEventListener('input', debounce(renderCommandResults, 150));
    input.addEventListener('keydown', handleCommandKey);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeCommandPalette(); });
}

function openCommandPalette() {
    const overlay = document.getElementById('command-palette-overlay');
    const input   = document.getElementById('command-palette-input');
    if (!overlay || !input) return;
    overlay.classList.add('active');
    input.value = '';
    setTimeout(function() { input.focus(); }, 30);
    renderCommandResults();
}

function closeCommandPalette() {
    const overlay = document.getElementById('command-palette-overlay');
    if (overlay) overlay.classList.remove('active');
}

function renderCommandResults() {
    const input     = document.getElementById('command-palette-input');
    const container = document.getElementById('command-palette-results');
    if (!container || !input) return;
    const query = (input.value || '').toLowerCase().trim();

    _cpCurrentResults = [];
    let html = '';

    if (!query) {
        const actions = [
            { icon: 'fa-user-plus',       label: 'Nuevo Cliente',  action: 'new-client'  },
            { icon: 'fa-shopping-cart',   label: 'Nuevo Pedido',   action: 'new-order'   },
            { icon: 'fa-money-bill-wave', label: 'Nuevo Pago',     action: 'new-payment' },
        ];
        html += '<div class="command-result-group-label">Acciones rápidas</div>';
        actions.forEach(function(a, i) {
            _cpCurrentResults.push({ type: 'action', action: a.action });
            html += '<div class="command-result-item" data-idx="' + i + '"><i class="fas ' + a.icon + '"></i><span class="command-result-item-title">' + a.label + '</span></div>';
        });
    } else {
        const matchClients = clients.filter(function(c) {
            const name = ((c.nombre || '') + ' ' + (c.apellido || '')).toLowerCase();
            return name.includes(query) || (c.cuit || c.documento || '').includes(query);
        }).slice(0, 5);

        const matchOrders = orders.filter(function(o) {
            const name = ((o.cliente_nombre || '') + ' ' + (o.cliente_apellido || '')).toLowerCase();
            return name.includes(query) || (o.numero_pedido || '').toLowerCase().includes(query);
        }).slice(0, 5);

        if (matchClients.length) {
            html += '<div class="command-result-group-label">Clientes</div>';
            matchClients.forEach(function(c) {
                const idx = _cpCurrentResults.length;
                _cpCurrentResults.push({ type: 'client', id: c.id });
                html += '<div class="command-result-item" data-idx="' + idx + '"><i class="fas fa-user"></i><span class="command-result-item-title">' + ((c.nombre||'') + ' ' + (c.apellido||'')).trim() + '</span><span class="command-result-item-sub">' + (c.cuit || c.documento || '') + '</span></div>';
            });
        }
        if (matchOrders.length) {
            html += '<div class="command-result-group-label">Pedidos</div>';
            matchOrders.forEach(function(o) {
                const idx = _cpCurrentResults.length;
                _cpCurrentResults.push({ type: 'order', id: o.id });
                html += '<div class="command-result-item" data-idx="' + idx + '"><i class="fas fa-shopping-cart"></i><span class="command-result-item-title">' + o.numero_pedido + ' — ' + ((o.cliente_nombre||'') + ' ' + (o.cliente_apellido||'')).trim() + '</span><span class="command-result-item-sub">' + formatCurrency(o.monto) + '</span></div>';
            });
        }
        if (!matchClients.length && !matchOrders.length) {
            html = '<div class="command-palette-empty"><i class="fas fa-search"></i>Sin resultados para "' + query + '"</div>';
        }
    }

    container.innerHTML = html;
    _cpSelectedIndex = 0;
    _updateCpSelection();
    container.querySelectorAll('.command-result-item').forEach(function(item) {
        item.addEventListener('click', function() { _executeCpItem(parseInt(item.dataset.idx)); });
    });
}

function handleCommandKey(e) {
    const items = document.querySelectorAll('#command-palette-results .command-result-item');
    if (e.key === 'ArrowDown')  { e.preventDefault(); _cpSelectedIndex = Math.min(_cpSelectedIndex + 1, items.length - 1); _updateCpSelection(); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); _cpSelectedIndex = Math.max(_cpSelectedIndex - 1, 0); _updateCpSelection(); }
    else if (e.key === 'Enter')     { e.preventDefault(); _executeCpItem(_cpSelectedIndex); }
    else if (e.key === 'Escape')    { closeCommandPalette(); }
}

function _updateCpSelection() {
    document.querySelectorAll('#command-palette-results .command-result-item').forEach(function(item, i) {
        item.classList.toggle('selected', i === _cpSelectedIndex);
    });
}

function _executeCpItem(idx) {
    const result = _cpCurrentResults[idx];
    if (!result) return;
    closeCommandPalette();
    if (result.type === 'action') {
        const map = { 'new-client': 'new-client-btn', 'new-order': 'new-order-btn', 'new-payment': 'new-payment-btn' };
        const btn = document.getElementById(map[result.action]);
        if (btn) btn.click();
    } else if (result.type === 'client') {
        const navItem = Array.from(document.querySelectorAll('.nav-item')).find(function(n) { return n.textContent.includes('Clientes'); });
        if (navItem) navItem.click();
        setTimeout(function() { viewClientDetails(result.id).catch(console.error); }, 600);
    } else if (result.type === 'order') {
        const navItem = Array.from(document.querySelectorAll('.nav-item')).find(function(n) { return n.textContent.includes('Pedidos'); });
        if (navItem) navItem.click();
        setTimeout(function() { viewOrderDetails(result.id); }, 600);
    }
}

// === FILTROS RÁPIDOS DE PEDIDOS ===

const ordersActiveFilter = { estado: '', vendedor: '' };

function setOrderEstadoFilter(btn, estado) {
    ordersActiveFilter.estado = estado;
    document.querySelectorAll('.order-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    paginationState.orders = 1;
    applyOrdersFilter();
}

function applyOrdersFilter() {
    ordersActiveFilter.vendedor = document.getElementById('order-filter-vendedor')?.value || '';
    paginationState.orders = 1;
    let filtered = orders;
    if (ordersActiveFilter.estado) {
        filtered = filtered.filter(o => o.estado === ordersActiveFilter.estado);
    }
    if (ordersActiveFilter.vendedor) {
        filtered = filtered.filter(o => (o.vendedor_asignado_nombre || '') === ordersActiveFilter.vendedor);
    }
    renderOrdersTable(filtered.length < orders.length ? filtered : null);
}

function resetOrdersFilter() {
    ordersActiveFilter.estado = '';
    ordersActiveFilter.vendedor = '';
    document.querySelectorAll('.order-filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.order-filter-btn[data-filter-estado=""]');
    if (allBtn) allBtn.classList.add('active');
    const vendSelect = document.getElementById('order-filter-vendedor');
    if (vendSelect) vendSelect.value = '';
    const search = document.getElementById('orders-search');
    if (search) search.value = '';
    paginationState.orders = 1;
    renderOrdersTable();
}

function populateVendorFilter() {
    const select = document.getElementById('order-filter-vendedor');
    if (!select) return;
    const vendors = [...new Set(orders.map(o => o.vendedor_asignado_nombre).filter(Boolean))].sort();
    const current = select.value;
    select.innerHTML = '<option value="">Todos</option>' +
        vendors.map(v => `<option value="${v}"${v === current ? ' selected' : ''}>${v}</option>`).join('');
}

// === EDICIÓN MASIVA DE PEDIDOS ===

function onOrderCheckboxChange() {
    const checked = document.querySelectorAll('.order-checkbox:checked');
    const toolbar = document.getElementById('bulk-toolbar');
    const countEl = document.getElementById('bulk-count');
    if (checked.length > 0) {
        toolbar.style.display = 'flex';
        countEl.textContent = `${checked.length} pedido${checked.length > 1 ? 's' : ''} seleccionado${checked.length > 1 ? 's' : ''}`;
    } else {
        toolbar.style.display = 'none';
    }
    // Sync select-all
    const all = document.querySelectorAll('.order-checkbox');
    const selectAll = document.getElementById('orders-select-all');
    if (selectAll) selectAll.checked = all.length > 0 && checked.length === all.length;
}

function toggleSelectAllOrders(checked) {
    document.querySelectorAll('.order-checkbox').forEach(cb => { cb.checked = checked; });
    onOrderCheckboxChange();
}

function clearBulkSelection() {
    document.querySelectorAll('.order-checkbox').forEach(cb => { cb.checked = false; });
    const selectAll = document.getElementById('orders-select-all');
    if (selectAll) selectAll.checked = false;
    document.getElementById('bulk-toolbar').style.display = 'none';
    document.getElementById('bulk-status-select').value = '';
}

async function applyBulkStatus() {
    const estado = document.getElementById('bulk-status-select').value;
    if (!estado) { showNotification('Seleccioná un estado', 'warning'); return; }
    const ids = [...document.querySelectorAll('.order-checkbox:checked')].map(cb => parseInt(cb.value));
    if (ids.length === 0) return;

    const confirmed = await showConfirm({
        title: 'Cambio masivo de estado',
        message: `¿Cambiar ${ids.length} pedido${ids.length > 1 ? 's' : ''} a "${translateOrderStatus(estado)}"?`,
        confirmText: 'Aplicar',
        confirmClass: 'btn-primary'
    });
    if (!confirmed) return;

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/pedidos/bulk/estado', {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids, estado })
        });
        if (response.ok) {
            const data = await response.json();
            showNotification(`${data.updated} pedido${data.updated > 1 ? 's' : ''} actualizados a "${translateOrderStatus(estado)}"`, 'success');
            clearBulkSelection();
            invalidateCache('orders');
            await loadOrders(true);
        } else {
            const err = await response.json();
            showNotification(err.error || 'Error al actualizar', 'error');
        }
    } catch (error) {
        showNotification('Error de conexión', 'error');
    }
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

// Función para capturar errores en funciones específicas
function safeExecute(fn, context = 'Unknown') {
    return function(...args) {
        try {
            
            const result = fn.apply(this, args);
            
            // Si es una promesa, manejar errores async
            if (result && typeof result.catch === 'function') {
                return result.catch(error => {
                    console.error(`🚨 Error en ${context}:`, error);
                    showNotification(`Error en ${context}: ${error.message}`, 'error');
                    throw error;
                });
            }
            
            
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
        
        
        
        // Verificar autenticación
        
        const isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            
            return;
        }
        
        
        // Carga inicial: solo clientes y productos (necesarios para selects en formularios)
        // Pedidos, pagos y contactos se cargan al navegar a cada sección (carga diferida)
        try { await loadClients(); } catch(e) { console.error('Error cargando clientes:', e); }
        try { await loadProducts(); } catch(e) { console.error('Error cargando productos:', e); }
        
        // Configurar componentes con manejo de errores
        
        setupNavigation();
        
        
        setupForms();
        
        
        setupHeaderButtons();
        
        
        setupUserMenu();
        
        
        setupModals();
        
        // Configurar toggle switches para transporte
        setupTransportToggles();
        
        setupDashboardCards();
        initCommandPalette();
        
        // Configurar menú móvil
        setupMobileMenu();
        
        // Inicializar mejoras móviles
        setTimeout(() => {
            initializeMobileEnhancements();
        }, 100);
        
        // Cargar datos iniciales del dashboard
        
        try {
            await loadPendingCollections();
            
        } catch (error) {
            console.error('Error cargando datos del dashboard:', error);
        }
        
        // Mostrar dashboard por defecto
        
        showSection('dashboard');
        updateHeaderTitle('dashboard');
        
        // Marcar dashboard como activo en la navegación
        
        // Inicializar gráfico de ventas por vendedor
        try {
            initializeVentasVendedorChart();
        } catch (error) {
            console.error('Error inicializando gráfico de ventas:', error);
        }
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        const dashboardNav = document.querySelector('.nav-item');
        if (dashboardNav) {
            dashboardNav.classList.add('active');
        }
        
        
        
        
        // Ejecutar diagnóstico final
        setTimeout(() => {
            
            const diagnosticReport = runDOMDiagnostic();
            
            // Hacer el reporte disponible globalmente para debugging
            
            
            
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
    
    
    // Configurar navegación del sidebar
    const navItems = document.querySelectorAll('.nav-item');
    
    
    navItems.forEach((item, index) => {
        // Usar onclick en lugar de addEventListener para evitar duplicados
        item.onclick = function(e) {
            e.preventDefault();
            
            
            try {
                // Remover clase active de todos los items
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                
                // Agregar clase active al item clickeado
                this.classList.add('active');
                
                // Obtener la sección desde el data-section o el texto
                const section = this.getAttribute('data-section') || this.textContent.trim().toLowerCase();
                
                
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
            
            logoutUser();
        };
        
    }
    
    
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
    
    
    // Restaurar estilos del panel de administración si no estamos navegando a él
    if (section !== 'administrar perfiles' && section !== 'admin') {
        restoreAdminPanelStyles();
    }
    
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.page-content, #admin-profiles-section, #pedidos-section, #pagos-section, #productos-section, #contactos-section, #dashboard-section, #clientes-section, #fabrica-section');
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
            // Cargar datos frescos del servidor
            loadClients();
            break;
        case 'pedidos':
            document.getElementById('pedidos-section').style.display = 'block';
            // Cargar datos frescos del servidor
            loadOrders();
            // Configurar búsqueda después de cargar los datos
            setTimeout(() => {
                setupOrdersSearch();
            }, 200);
            break;
        case 'pagos':
            document.getElementById('pagos-section').style.display = 'block';
            // Cargar datos frescos del servidor
            loadPayments();
            break;
        case 'productos':
            document.getElementById('productos-section').style.display = 'block';
            // Cargar datos frescos del servidor
            loadProducts();
            break;
        case 'contactos':
            document.getElementById('contactos-section').style.display = 'block';
            // Cargar datos frescos del servidor
            loadContacts();
            break;
        case 'fábrica':
            document.getElementById('fabrica-section').style.display = 'block';
            // Cargar datos frescos del servidor
            loadOrders();
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
    
    
}

// Función para configurar formularios
function setupForms() {
    
    
    try {
        // Configurar formulario de nuevo cliente
        const newClientForm = document.getElementById('new-client-form');
        if (newClientForm) {
            newClientForm.onsubmit = handleNewClientSubmit;
            
        } else {
            console.warn('⚠️ No se encontró el formulario new-client-form');
        }
        
        // Configurar formulario de nuevo pedido
        const newOrderForm = document.getElementById('new-order-form');
        if (newOrderForm) {
            newOrderForm.onsubmit = handleNewOrderSubmit;
            
        } else {
            console.warn('⚠️ No se encontró el formulario new-order-form');
        }
        
        // Configurar formulario de nuevo pago
        const newPaymentForm = document.getElementById('new-payment-form');
        if (newPaymentForm) {
            newPaymentForm.onsubmit = handleNewPaymentSubmit;
            
        } else {
            console.warn('⚠️ No se encontró el formulario new-payment-form');
        }
        
        // Configurar formulario de nuevo contacto
        const newContactForm = document.getElementById('new-contact-form');
        if (newContactForm) {
            newContactForm.onsubmit = handleNewContactSubmit;
            
        } else {
            console.warn('⚠️ No se encontró el formulario new-contact-form');
        }
        
        // Configurar formulario de nuevo producto
        const newProductForm = document.getElementById('new-product-form');
        if (newProductForm) {
            newProductForm.onsubmit = handleNewProductSubmit;
            
        } else {
            console.warn('⚠️ No se encontró el formulario new-product-form');
        }
        
        // Configurar formulario de nuevo usuario
        const newUserForm = document.getElementById('new-user-form');
        if (newUserForm) {
            newUserForm.onsubmit = handleNewUserSubmit;
            
        } else {
            console.warn('⚠️ No se encontró el formulario new-user-form');
        }
        
        // Configurar formulario de edición de cliente
        const editClientForm = document.getElementById('edit-client-form');
        if (editClientForm) {
            editClientForm.onsubmit = handleEditClientSubmit;
            
        } else {
            console.warn('⚠️ No se encontró el formulario edit-client-form');
        }
        
        // Configurar formulario de edición de pedido
        const editOrderForm = document.getElementById('edit-order-form');
        if (editOrderForm) {
            editOrderForm.onsubmit = handleEditOrderSubmit;
            
        } else {
            console.warn('⚠️ No se encontró el formulario edit-order-form');
        }
        
        // Configurar cierre de modales
        const closeModalBtns = document.querySelectorAll('.close-modal');
        
        closeModalBtns.forEach(btn => {
            btn.onclick = function() {
                const modal = this.closest('.modal');
                if (modal) {
                    if (modal.id) {
                        closeModal(modal.id);
                    } else {
                        closeDynamicModal(modal);
                    }
                }
            };
        });
        
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                if (e.target.id) {
                    closeModal(e.target.id);
                } else {
                    closeDynamicModal(e.target);
                }
            }
        });
        
        // Configuración específica para el modal de nuevo usuario
        const newUserModal = document.getElementById('new-user-modal');
        if (newUserModal) {
            
            
            // Configurar todos los botones de cierre del modal de nuevo usuario
            const closeButtons = newUserModal.querySelectorAll('.close-modal, .cancel-btn');
            
            
            closeButtons.forEach(btn => {
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    
                    newUserModal.style.display = 'none';
                    newUserModal.classList.remove('active');
                    
                    // Limpiar formulario
                    const form = newUserModal.querySelector('#new-user-form');
                    if (form) {
                        form.reset();
                    }
                    
                    
                };
            });
            
            // Configurar cierre al hacer clic fuera del modal
            newUserModal.onclick = function(e) {
                if (e.target === newUserModal) {
                    
                    newUserModal.style.display = 'none';
                    newUserModal.classList.remove('active');
                    
                    // Limpiar formulario
                    const form = newUserModal.querySelector('#new-user-form');
                    if (form) {
                        form.reset();
                    }
                    
                    
                }
            };
            
            
        } else {
            console.warn('⚠️ Modal de nuevo usuario no encontrado para configurar eventos');
        }
        
        
    } catch (error) {
        console.error('❌ Error configurando formularios:', error);
    }
}

// Funciones para manejar productos en pedidos
function setupOrderProductHandlers() {
    const addProductBtn = document.getElementById('add-product-btn');
    const clearProductsBtn = document.getElementById('clear-products-btn');
    const productSelector = document.getElementById('product-selector');
    const confirmAddBtn = document.getElementById('confirm-add-product');
    const cancelAddBtn = document.getElementById('cancel-add-product');
    const productSelect = document.getElementById('product-select');

    console.log('🔍 SETUP HANDLERS - Elementos encontrados:', {
        addProductBtn: !!addProductBtn,
        clearProductsBtn: !!clearProductsBtn,
        productSelector: !!productSelector,
        confirmAddBtn: !!confirmAddBtn,
        cancelAddBtn: !!cancelAddBtn,
        productSelect: !!productSelect
    });

    if (addProductBtn && productSelector && confirmAddBtn && cancelAddBtn && productSelect) {
        // Botón agregar producto
        addProductBtn.addEventListener('click', () => {
            console.log('🔍 Clic en Agregar Producto');
            productSelector.style.display = 'block';
            populateProductSelect();
        });

        // Botón limpiar productos
        if (clearProductsBtn) {
            clearProductsBtn.addEventListener('click', async () => {
                if (orderItems.length === 0) {
                    showNotification('No hay productos para limpiar', 'info');
                    return;
                }
                const confirmed = await showConfirm({
                    title: 'Limpiar productos',
                    message: '¿Estás seguro de que querés limpiar todos los productos del pedido?',
                    confirmText: 'Limpiar',
                    cancelText: 'Cancelar'
                });
                if (confirmed) {
                    clearOrderItems();
                    showNotification('Productos limpiados correctamente', 'success');
                }
            });
        }

        // Botón confirmar agregar
        confirmAddBtn.addEventListener('click', () => {
            console.log('🔍 CLIC EN CONFIRMAR AGREGAR PRODUCTO');
            addProductToOrder();
        });

        // Botón cancelar agregar
        cancelAddBtn.addEventListener('click', cancelAddProduct);

        // Cambio en select de producto para actualizar precio
        productSelect.addEventListener('change', function() {
            const selectedProductId = this.value;
            if (selectedProductId) {
                const product = products.find(p => p.id == selectedProductId);
                if (product) {
                    document.getElementById('product-price').value = product.precio;
                }
            } else {
                document.getElementById('product-price').value = '';
            }
        });

        console.log('✅ Event listeners de productos configurados correctamente');
        } else {
        console.error('❌ Error: No se pudieron encontrar todos los elementos necesarios para configurar los manejadores de productos');
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

    console.log('🔍 AGREGAR PRODUCTO - Intentando agregar:', {
        productId,
        quantity,
        price,
        orderItemsActuales: orderItems.length,
        orderItemsContenido: orderItems
    });

    if (!productId || !quantity || !price || quantity <= 0 || price <= 0) {
        showNotification('Por favor complete todos los campos correctamente', 'error');
        return;
    }

    // Verificar si el producto ya está en el pedido
    const existingItemIndex = orderItems.findIndex(item => item.producto_id == productId);
    console.log('🔍 VERIFICANDO DUPLICADO:', {
        productId,
        existingItemIndex,
        existeProducto: existingItemIndex !== -1
    });
    
    if (existingItemIndex !== -1) {
        showNotification('Este producto ya está agregado al pedido', 'error');
        console.log('❌ PRODUCTO DUPLICADO - no se agregará');
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

    console.log('✅ AGREGANDO PRODUCTO:', orderItem);
    orderItems.push(orderItem);
    console.log('🔍 ORDERITEMS DESPUÉS:', orderItems);
    
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
    const submitBtn = document.getElementById('submit-order-btn');

    console.log('🔍 RENDER PRODUCTOS - Iniciando render:', {
        productsList: !!productsList,
        submitBtn: !!submitBtn,
        orderItemsLength: orderItems.length,
        orderItems: orderItems
    });

    // Validar que los elementos existan (el modal podría estar cerrado)
    if (!productsList || !submitBtn) {
        console.log('❌ RENDER - Elementos del modal no encontrados');
        return;
    }

    if (orderItems.length === 0) {
        // Si no hay productos, mostrar mensaje
        productsList.innerHTML = `
            <div id="no-products-message" style="text-align: center; padding: 2rem; color: #6b7280; background: #f9fafb; border-radius: 8px;">
                <i class="fas fa-box-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #d1d5db;"></i>
                <p style="margin: 0;">No hay productos agregados al pedido</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Haga clic en "Agregar Producto" para comenzar</p>
            </div>
        `;
        submitBtn.disabled = true;
        console.log('📝 RENDER - Mostrando mensaje de no productos');
        return;
    }

    // Si hay productos, mostrar la tabla
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

    console.log('✅ RENDER - Generando tabla con', orderItems.length, 'productos');
    productsList.innerHTML = productsTable;
    console.log('✅ RENDER - Tabla insertada en DOM');
}

async function removeProductFromOrder(index) {
    const confirmed = await showConfirm({
        title: 'Eliminar producto',
        message: '¿Querés eliminar este producto del pedido?',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
    });
    if (confirmed) {
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
        
    }
}

function clearOrderItems() {
    orderItems = [];
    renderOrderProducts();
    updateOrderTotal();
}

// Función para mostrar modales con debugging mejorado
async function showModal(modalId) {
    try {
        
        
        // Verificar que modalId sea válido
        if (!modalId || typeof modalId !== 'string') {
            throw new Error(`ID de modal inválido: ${modalId}`);
        }
        
        const modal = document.getElementById(modalId);
        if (!modal) {
            throw new Error(`No se encontró el modal con ID: ${modalId}`);
        }
        
        
        
        // Verificar que el modal tenga la clase correcta
        if (!modal.classList.contains('modal')) {
            console.warn(`⚠️ El elemento ${modalId} no tiene la clase 'modal'`);
        }
        
        const existingActiveModals = document.querySelectorAll('.modal.active');
        const baseZIndex = 10000;
        const modalZIndex = baseZIndex + (existingActiveModals.length * 100);
        
        modal.style.display = 'block';
        modal.style.zIndex = modalZIndex;
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.zIndex = modalZIndex + 1;
        }

        requestAnimationFrame(() => {
            modal.classList.add('active');
            const mc = modal.querySelector('.modal-content');
            if (mc) mc.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        });
        
        // Configuraciones específicas por modal
        if (modalId === 'new-client-modal') {
            
            try {
                setupProvinceAndCityListeners();
                
            } catch (error) {
                console.error('❌ Error al configurar modal de nuevo cliente:', error);
                throw error;
            }
        } else if (modalId === 'new-order-modal' || modalId === 'new-payment-modal' || modalId === 'new-contact-modal') {
            
            try {
                populateClientSelects(modalId);
                
                
                // Configuración específica para el modal de nuevo pedido
                if (modalId === 'new-order-modal') {
                    // NO limpiar productos automáticamente aquí - solo configurar handlers
                    setupOrderProductHandlers(); // Configurar manejadores de productos
                    
                    // Cargar vendedores
                    await populateVendorSelects();
                    
                    // Solo limpiar si no hay productos o si es un nuevo pedido
                    if (orderItems.length === 0) {
                        console.log('🔍 Modal nuevo pedido - no hay productos, inicializando lista vacía');
                    } else {
                        console.log('🔍 Modal nuevo pedido - manteniendo productos existentes:', orderItems.length);
                        renderOrderProducts(); // Re-renderizar los productos existentes
                        updateOrderTotal(); // Actualizar el total
                    }
                }
            } catch (error) {
                console.error('❌ Error al cargar lista de clientes:', error);
                throw error;
            }
        } else if (modalId === 'edit-order-modal') {
            
            try {
                populateClientSelects(modalId);
                clearEditOrderItems(); // Limpiar productos del pedido anterior
                setupEditOrderProductHandlers(); // Configurar manejadores de productos
                
                
            } catch (error) {
                console.error('❌ Error al cargar lista de clientes:', error);
                throw error;
            }
        }
        
        console.log(`✅ Modal ${modalId} abierto correctamente`);
        
    } catch (error) {
        console.error(`🚨 ERROR EN showModal(${modalId}):`, error);
        console.trace('Stack trace del error en showModal:');
        showNotification(`Error al abrir modal: ${error.message}`, 'error');
        
        // Intentar diagnóstico adicional
        
        
        
        
        
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
        option.textContent = `${client.nombre || ''} ${client.apellido || ''}`.trim() || 'Cliente sin nombre';
        clientSelect.appendChild(option);
    });
    
    
}

// Función para poblar selects de vendedores
async function populateVendorSelects() {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/usuarios/vendedores', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const vendedores = await response.json();
            
            // Poblar selector de nuevo pedido
            const newOrderVendorSelect = document.getElementById('order-vendor-select');
            if (newOrderVendorSelect) {
                newOrderVendorSelect.innerHTML = '<option value="">Seleccione un vendedor (opcional)</option>';
                vendedores.forEach(vendedor => {
                    const option = document.createElement('option');
                    option.value = vendedor.id;
                    option.textContent = `${vendedor.nombre} (${vendedor.email})`;
                    newOrderVendorSelect.appendChild(option);
                });
            }
            
            // Poblar selector de editar pedido
            const editOrderVendorSelect = document.getElementById('edit-order-vendor-select');
            if (editOrderVendorSelect) {
                editOrderVendorSelect.innerHTML = '<option value="">Seleccione un vendedor (opcional)</option>';
                vendedores.forEach(vendedor => {
                    const option = document.createElement('option');
                    option.value = vendedor.id;
                    option.textContent = `${vendedor.nombre} (${vendedor.email})`;
                    editOrderVendorSelect.appendChild(option);
                });
            }
        } else {
            console.error('❌ Error cargando vendedores:', response.status);
        }
    } catch (error) {
        console.error('❌ Error cargando vendedores:', error);
    }
}

// Función para configurar listeners de provincia y ciudad
function setupProvinceAndCityListeners() {
    // Función simplificada - ya no necesita manejar dependencias entre provincia/ciudad/localidad
    // Los campos de ciudad y localidad ahora son de texto libre
    console.log('✅ Campos de ciudad y localidad configurados como texto libre');
}

// Función para manejar envío de nuevo cliente
async function handleNewClientSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const clientData = {
        nombre: formData.get('nombre') || document.getElementById('client-name-input').value,
        apellido: formData.get('apellido') || document.getElementById('client-lastname-input').value,
        cuit: formData.get('documento') || document.getElementById('client-rut-input').value,
        email: formData.get('email') || document.getElementById('client-email-input').value,
        telefono: formData.get('telefono') || document.getElementById('client-phone-input').value,
        direccion: formData.get('direccion') || document.getElementById('client-address-input').value,
        provincia: formData.get('provincia') || document.getElementById('client-province-input').value,
        ciudad: formData.get('ciudad') || document.getElementById('client-city-input').value,
        localidad: formData.get('localidad') || document.getElementById('client-locality-input').value,
        codigo_postal: formData.get('codigo_postal') || document.getElementById('client-zip-input').value
    };
    
    
    
    // Validar que los campos requeridos no estén vacíos
    const requiredFields = ['nombre', 'apellido', 'cuit', 'email', 'telefono', 'direccion'];
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
            closeModal('new-client-modal');
            e.target.reset();
            invalidateCache('clients'); await loadClients(true);
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
    const vendorId = document.getElementById('order-vendor-select').value;
    
    // Validar que hay productos en el pedido
    if (orderItems.length === 0) {
        showNotification('Debe agregar al menos un producto al pedido', 'error');
        return;
    }
    
    // Validar campos de transporte si el toggle está activado
    const transportToggle = document.getElementById('order-transport-toggle');
    if (transportToggle && transportToggle.checked) {
        const transportName = document.getElementById('order-transport-name').value.trim();
        const transportAddress = document.getElementById('order-transport-address').value.trim();
        
        if (!transportName) {
            showNotification('El nombre del transporte es obligatorio cuando se utiliza transporte', 'error');
            return;
        }
        
        if (!transportAddress) {
            showNotification('La dirección del transporte es obligatoria cuando se utiliza transporte', 'error');
            return;
        }
    }
    
    // Calcular el monto total
    const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    const orderData = {
        cliente_id: clientId,
        descripcion: description,
        monto: totalAmount,
        estado: 'pendiente de pago', // Estado por defecto según los nuevos requerimientos
        vendedor_asignado_id: vendorId || null, // Si no se selecciona, será null y el backend usará el usuario actual
        nombre_transporte: document.getElementById('order-transport-name').value,
        direccion_transporte: document.getElementById('order-transport-address').value,
        items: orderItems.map(item => ({
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            precio: item.precio
        }))
    };
    
    
    
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
            const result = await response.json();
            showNotification('Pedido creado exitosamente', 'success');
            closeModal('new-order-modal');
            
            // OPTIMIZACIÓN: Agregar el nuevo pedido usando la nueva función
            await addNewOrderToLocal(result.id);
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
            closeModal('new-payment-modal');
            e.target.reset();
            invalidateCache('payments'); await loadPayments(true);
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
            closeModal('new-contact-modal');
            e.target.reset();
            invalidateCache('contacts'); await loadContacts(true);
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
        precio: parseFloat(document.getElementById('product-price-input').value)
    };
    
    console.log('🔍 Creando producto:', productData);
    
    // Validar que los campos requeridos no estén vacíos
    if (!productData.nombre || !productData.precio) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
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
            closeModal('new-product-modal');
            document.getElementById('new-product-form').reset();
            invalidateCache('products'); await loadProducts(true);
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error al crear producto', 'error');
        }
    } catch (error) {
        showNotification(`Error de conexión: ${error.message}`, 'error');
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
            closeModal('new-user-modal');
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
    
    
    // Buscar el cliente en el array
    const client = clients.find(c => c.id == clientId);
    if (!client) {
        showNotification('Cliente no encontrado', 'error');
        return;
    }
    
    // Llenar el formulario de edición con los datos del cliente
    document.getElementById('edit-client-name').value = client.nombre || '';
    document.getElementById('edit-client-lastname').value = client.apellido || '';
    document.getElementById('edit-client-cuit').value = client.cuit || client.documento || '';
    document.getElementById('edit-client-email').value = client.email || '';
    document.getElementById('edit-client-phone').value = client.telefono || '';
    document.getElementById('edit-client-address').value = client.direccion || '';
    document.getElementById('edit-client-province').value = client.provincia || '';
    document.getElementById('edit-client-city').value = client.ciudad || '';
    document.getElementById('edit-client-locality').value = client.localidad || '';
    document.getElementById('edit-client-zip').value = client.codigo_postal || '';
    
    // Guardar el ID del cliente que se está editando
    document.getElementById('edit-client-modal').setAttribute('data-client-id', clientId);
    
    // Mostrar el modal
    showModal('edit-client-modal');
}

async function deleteClient(clientId) {
    const client = clients.find(c => c.id == clientId);
    if (!client) { showNotification('Cliente no encontrado', 'error'); return; }

    const confirmed = await showConfirm({
        title: 'Eliminar cliente',
        message: 'Esta acción no se puede deshacer. Solo es posible si el cliente no tiene pedidos ni pagos asociados.',
        detail: `<strong>${(client.nombre || '') + ' ' + (client.apellido || '')}</strong>${client.email ? '<br>' + client.email : ''}${client.cuit || client.documento ? '<br>Doc: ' + (client.cuit || client.documento) : ''}`,
        confirmText: 'Eliminar'
    });
    if (confirmed) deleteClientFromServer(clientId);
}

async function deleteClientFromServer(clientId) {
    try {
        const token = localStorage.getItem('authToken');
        
        
        
        const response = await fetch(`/api/clientes/${clientId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Cliente eliminado exitosamente', 'success');
            invalidateCache('clients'); await loadClients(true);
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

async function editOrder(orderId) {
    try {
        console.log('🔍 EDIT ORDER - Iniciando edición del pedido:', orderId);
        
        // Guardar el ID del pedido en el modal para usarlo al guardar
        document.getElementById('edit-order-modal').setAttribute('data-order-id', orderId);
        
        // Poblar el select de clientes primero
        populateClientSelects('edit-order-modal');
        
        // Cargar datos frescos del pedido desde la base de datos
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/pedidos/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error al cargar pedido: ${response.status}`);
        }
        
        const order = await response.json();
        console.log('✅ EDIT ORDER - Datos del pedido cargados:', order);
        
        // Llenar el modal con los datos del pedido (después de poblar el select)
        setTimeout(async () => {
            document.getElementById('edit-order-client-select').value = order.cliente_id;
            document.getElementById('edit-order-description').value = order.descripcion;
            document.getElementById('edit-order-status').value = order.estado;
            
            // Cargar datos de transporte y configurar toggle
            const transportName = order.nombre_transporte || '';
            const transportAddress = order.direccion_transporte || '';
            const hasTransport = transportName || transportAddress;
            
            // Configurar toggle basado en si el pedido tiene datos de transporte
            const transportToggle = document.getElementById('edit-order-transport-toggle');
            if (transportToggle) {
                transportToggle.checked = hasTransport;
                toggleTransportFields('edit-order-transport-fields', hasTransport);
            }
            
            // Cargar datos de transporte
            document.getElementById('edit-order-transport-name').value = transportName;
            document.getElementById('edit-order-transport-address').value = transportAddress;
            
            // Cargar vendedores y seleccionar el actual
            await populateVendorSelects();
            const vendorSelect = document.getElementById('edit-order-vendor-select');
            if (vendorSelect && order.vendedor_asignado_id) {
                vendorSelect.value = order.vendedor_asignado_id;
            }
            
            // Deshabilitar el campo cliente para evitar cambios accidentales
            document.getElementById('edit-order-client-select').disabled = true;
            document.getElementById('edit-order-client-select').style.backgroundColor = '#f3f4f6';
            document.getElementById('edit-order-client-select').style.cursor = 'not-allowed';
        }, 100);
        
        // Mostrar/ocultar botón de eliminar según perfil
        const deleteBtn = document.getElementById('edit-order-delete-btn');
        const currentUser = getCurrentUserFromAuth();
        if (deleteBtn) {
            deleteBtn.style.display = currentUser?.perfil === 'Administrador' ? 'inline-flex' : 'none';
        }

        // Mostrar el modal primero
        showModal('edit-order-modal');
        
        // Cargar los productos del pedido después de que el modal esté abierto
        setTimeout(async () => {
            await loadEditOrderItems(orderId);
        }, 300);
        
    } catch (error) {
        console.error('❌ EDIT ORDER - Error:', error);
        showNotification(`Error al cargar pedido: ${error.message}`, 'error');
    }
}

async function deleteOrderFromEditModal() {
    const modal = document.getElementById('edit-order-modal');
    const orderId = modal.getAttribute('data-order-id');
    if (!orderId) return;

    const order = orders.find(o => o.id == orderId);
    const orderLabel = order ? `#${order.numero_pedido}` : `#${orderId}`;

    const confirmed = await showConfirm({
        title: 'Eliminar pedido',
        message: 'Esta acción no se puede deshacer.',
        detail: `<strong>Pedido ${orderLabel}</strong>${order ? '<br>' + (order.cliente_nombre || '') : ''}`,
        confirmText: 'Eliminar'
    });
    if (confirmed) {
        closeModal('edit-order-modal');
        deleteOrderFromServer(orderId);
    }
}

// Helper para eliminar pedido desde modal de detalles (onclick inline)
async function confirmAndDeleteOrderFromModal(btn, orderId, orderNum) {
    const confirmed = await showConfirm({
        title: 'Eliminar pedido',
        message: 'Esta acción no se puede deshacer.',
        detail: `<strong>Pedido #${orderNum}</strong>`,
        confirmText: 'Eliminar'
    });
    if (confirmed) {
        closeDynamicModal(btn.closest('.modal'));
        deleteOrderFromServer(orderId);
    }
}

// Función para cargar los productos de un pedido específico para edición
async function loadEditOrderItems(orderId) {
    try {
        console.log('🔍 LOAD EDIT ORDER ITEMS - Iniciando carga para pedido:', orderId);
        
        // LIMPIAR DATOS ANTERIORES ANTES DE CARGAR NUEVOS
        clearEditOrderItems();
        
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/pedidos/${orderId}/items`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const items = await response.json();
            console.log('✅ LOAD EDIT ORDER ITEMS - Items recibidos de la API:', items);
            
            editOrderItems = items.map(item => ({
                producto_id: item.producto_id,
                producto_nombre: item.producto_nombre,
                cantidad: item.cantidad,
                precio: parseFloat(item.precio),
                subtotal: item.cantidad * parseFloat(item.precio)
            }));
            
            console.log('✅ LOAD EDIT ORDER ITEMS - Items procesados:', editOrderItems);
            
            // Add a small delay before rendering products to ensure DOM is ready
            setTimeout(() => {
                renderEditOrderProducts();
                updateEditOrderTotal();
            }, 50); // Small delay
            
        } else {
            console.error('❌ LOAD EDIT ORDER ITEMS - Error del servidor:', response.statusText);
            editOrderItems = [];
            setTimeout(() => {
                renderEditOrderProducts();
                updateEditOrderTotal();
            }, 50); // Small delay even on error
        }
    } catch (error) {
        console.error('❌ LOAD EDIT ORDER ITEMS - Error de red:', error);
        editOrderItems = [];
        setTimeout(() => {
            renderEditOrderProducts();
            updateEditOrderTotal();
        }, 50); // Small delay even on error
    }
}

async function deleteOrder(orderId) {
    const order = orders.find(o => o.id == orderId);
    if (!order) { showNotification('Pedido no encontrado', 'error'); return; }

    const confirmed = await showConfirm({
        title: 'Eliminar pedido',
        message: 'Esta acción no se puede deshacer.',
        detail: `<strong>Pedido #${order.numero_pedido}</strong><br>${order.cliente_nombre || ''}<br>${formatCurrency(order.monto)}`,
        confirmText: 'Eliminar'
    });
    if (confirmed) deleteOrderFromServer(orderId);
}

async function deleteOrderFromServer(orderId) {
    try {
        const token = localStorage.getItem('authToken');
        
        
        
        const response = await fetch(`/api/pedidos/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Pedido eliminado exitosamente', 'success');
            invalidateCache('orders'); await loadOrders(true);
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
    
    
    // Buscar el pago en el array
    const payment = payments.find(p => p.id == paymentId);
    if (!payment) {
        showNotification('Pago no encontrado', 'error');
        return;
    }
    
    // Crear modal de edición dinámicamente
    const editModal = document.createElement('div');
    editModal.className = 'modal';
    editModal.style.cssText = 'display: block; z-index: 12000;';
    
    editModal.innerHTML = `
        <div class="modal-content" style="z-index: 12001;">
            <div class="modal-header">
                <h2 class="modal-title">Editar Pago</h2>
                <button class="close-modal btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-payment-form-${payment.id}" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
                <div class="modal-body">
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
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;
    
    openDynamicModal(editModal);
    
    // Poblar select de clientes y preseleccionar el cliente actual
    const clientSelect = document.getElementById(`edit-payment-client-${payment.id}`);
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = `${client.nombre || ''} ${client.apellido || ''}`.trim() || 'Cliente sin nombre';
        if (client.id == payment.cliente_id) {
            option.selected = true;
        }
        clientSelect.appendChild(option);
    });
    
    // Manejar envío del formulario
    document.getElementById(`edit-payment-form-${payment.id}`).addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('[type="submit"]');
        setButtonLoading(submitBtn, true);

        const paymentData = {
            cliente_id: payment.cliente_id,
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
                invalidateCache('payments'); await loadPayments(true);
            } else {
                const errorData = await response.json();
                showNotification(errorData.message || 'Error al actualizar pago', 'error');
                setButtonLoading(submitBtn, false);
            }
        } catch (error) {
            showNotification(`Error de conexión: ${error.message}`, 'error');
            setButtonLoading(submitBtn, false);
        }
    });
}

async function deletePayment(paymentId) {
    const payment = payments.find(p => p.id == paymentId);
    if (!payment) { showNotification('Pago no encontrado', 'error'); return; }

    const confirmed = await showConfirm({
        title: 'Eliminar pago',
        message: 'Esta acción no se puede deshacer.',
        detail: `<strong>${formatCurrency(payment.monto)}</strong> — ${payment.metodo}<br>${payment.cliente_nombre || ''}${payment.referencia ? '<br>Ref: ' + payment.referencia : ''}`,
        confirmText: 'Eliminar'
    });
    if (confirmed) deletePaymentFromServer(paymentId);
}

async function deletePaymentFromServer(paymentId) {
    try {
        const token = localStorage.getItem('authToken');
        
        
        
        const response = await fetch(`/api/pagos/${paymentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Pago eliminado exitosamente', 'success');
            invalidateCache('payments'); await loadPayments(true);
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
    
    
    const product = products.find(p => p.id == productId);
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal';
    detailsModal.style.cssText = `
        display: block; z-index: 12000;
    `;
    
    detailsModal.innerHTML = `
        <div class="modal-content" style="z-index: 12001;">
            <div class="modal-header">
                <h2 class="modal-title">Detalles del Producto</h2>
                <button class="close-modal btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="editProduct(${product.id}); closeDynamicModal(this.closest('.modal'));" style="background: #4f46e5; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer;">
                    <i class="fas fa-edit"></i> Editar Producto
                </button>
                <button class="btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))" style="background: #6b7280; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer;">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
        </div>
    `;
    
    openDynamicModal(detailsModal);
}

function editProduct(productId) {
    
    
    // Buscar el producto en el array
    const product = products.find(p => p.id == productId);
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Crear modal de edición dinámicamente
    const editModal = document.createElement('div');
    editModal.className = 'modal';
    editModal.style.cssText = `
        display: block; z-index: 12000;
    `;
    
    editModal.innerHTML = `
        <div class="modal-content" style="z-index: 12001;">
            <div class="modal-header">
                <h2 class="modal-title">Editar Producto</h2>
                <button class="close-modal btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-product-form-${product.id}" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
                <div class="modal-body">
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
                        <input type="number" id="edit-product-price-${product.id}" class="input" step="0.01" min="0.01" value="${product.precio}" required>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;
    
    openDynamicModal(editModal);
    
    // Manejar envío del formulario
    document.getElementById(`edit-product-form-${product.id}`).addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('[type="submit"]');
        setButtonLoading(submitBtn, true);

        const productData = {
            nombre: document.getElementById(`edit-product-name-${product.id}`).value,
            descripcion: document.getElementById(`edit-product-description-${product.id}`).value,
            precio: parseFloat(document.getElementById(`edit-product-price-${product.id}`).value)
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
                invalidateCache('products'); await loadProducts(true);
            } else {
                const errorData = await response.json();
                console.error('❌ FRONTEND - Error del servidor:', response.status, errorData);
                showNotification(errorData.error || errorData.message || 'Error al actualizar producto', 'error');
                setButtonLoading(submitBtn, false);
            }
        } catch (error) {
            console.error('❌ FRONTEND - Error de conexión:', error);
            showNotification(`Error de conexión: ${error.message}`, 'error');
            setButtonLoading(submitBtn, false);
        }
    });
}

async function deleteProduct(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) { showNotification('Producto no encontrado', 'error'); return; }

    const confirmed = await showConfirm({
        title: 'Eliminar producto',
        message: 'Esta acción no se puede deshacer.',
        detail: `<strong>${product.nombre}</strong><br>${formatCurrency(product.precio)}${product.descripcion ? '<br>' + product.descripcion : ''}`,
        confirmText: 'Eliminar'
    });
    if (confirmed) deleteProductFromServer(productId);
}

async function deleteProductFromServer(productId) {
        try {
            const token = localStorage.getItem('authToken');
            
        
        
        const response = await fetch(`/api/productos/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Producto eliminado exitosamente', 'success');
            invalidateCache('products'); await loadProducts(true);
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
    
    
    // Buscar el contacto en el array
    const contact = contacts.find(c => c.id == contactId);
    if (!contact) {
        showNotification('Contacto no encontrado', 'error');
        return;
    }
    
    // Crear modal de edición dinámicamente
    const editModal = document.createElement('div');
    editModal.className = 'modal';
    editModal.style.cssText = `
        display: block; z-index: 12000;
    `;
    
    editModal.innerHTML = `
        <div class="modal-content" style="z-index: 12001;">
            <div class="modal-header">
                <h2 class="modal-title">Editar Contacto</h2>
                <button class="close-modal btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-contact-form-${contact.id}" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
                <div class="modal-body">
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
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;
    
    openDynamicModal(editModal);
    
    // Poblar select de clientes y preseleccionar el cliente actual
    const clientSelect = document.getElementById(`edit-contact-client-${contact.id}`);
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = `${client.nombre || ''} ${client.apellido || ''}`.trim() || 'Cliente sin nombre';
        if (client.id == contact.cliente_id) {
            option.selected = true;
        }
        clientSelect.appendChild(option);
    });
    
    // Manejar envío del formulario
    document.getElementById(`edit-contact-form-${contact.id}`).addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('[type="submit"]');
        setButtonLoading(submitBtn, true);

        const contactData = {
            cliente_id: contact.cliente_id,
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
                invalidateCache('contacts'); await loadContacts(true);
            } else {
                const errorData = await response.json();
                showNotification(errorData.message || 'Error al actualizar contacto', 'error');
                setButtonLoading(submitBtn, false);
            }
        } catch (error) {
            showNotification(`Error de conexión: ${error.message}`, 'error');
            setButtonLoading(submitBtn, false);
        }
    });
}

function viewContactDetails(contactId) {
    
    
    const contact = contacts.find(c => c.id == contactId);
    if (!contact) {
        showNotification('Contacto no encontrado', 'error');
        return;
    }
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal';
    detailsModal.style.cssText = `
        display: block; z-index: 12000;
    `;
    
    detailsModal.innerHTML = `
        <div class="modal-content" style="z-index: 12001;">
            <div class="modal-header">
                <h2 class="modal-title">Detalles del Contacto</h2>
                <button class="close-modal btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="editContact(${contact.id}); closeDynamicModal(this.closest('.modal'));" style="background: #4f46e5; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer;">
                    <i class="fas fa-edit"></i> Editar Contacto
                </button>
                <button class="btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))" style="background: #6b7280; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer;">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
        </div>
    `;
    
    openDynamicModal(detailsModal);
}

async function deleteContact(contactId) {
    const contact = contacts.find(c => c.id == contactId);
    if (!contact) { showNotification('Contacto no encontrado', 'error'); return; }

    const confirmed = await showConfirm({
        title: 'Eliminar contacto',
        message: 'Esta acción no se puede deshacer.',
        detail: `<strong>${contact.nombre}</strong>${contact.cargo ? ' — ' + contact.cargo : ''}<br>${contact.email || ''}${contact.cliente_nombre ? '<br>' + contact.cliente_nombre : ''}`,
        confirmText: 'Eliminar'
    });
    if (confirmed) deleteContactFromServer(contactId);
}

async function deleteContactFromServer(contactId) {
    try {
        const token = localStorage.getItem('authToken');
        
        
        
        const response = await fetch(`/api/contactos/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Contacto eliminado exitosamente', 'success');
            invalidateCache('contacts'); await loadContacts(true);
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
        apellido: document.getElementById('edit-client-lastname').value,
        cuit: document.getElementById('edit-client-cuit').value,
        email: document.getElementById('edit-client-email').value,
        telefono: document.getElementById('edit-client-phone').value,
        direccion: document.getElementById('edit-client-address').value,
        provincia: document.getElementById('edit-client-province').value,
        ciudad: document.getElementById('edit-client-city').value,
        localidad: document.getElementById('edit-client-locality').value,
        codigo_postal: document.getElementById('edit-client-zip').value
    };
    
    
    
    // Validar que los campos requeridos no estén vacíos
    const requiredFields = ['nombre', 'apellido', 'cuit', 'email', 'telefono', 'direccion'];
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
            closeModal('edit-client-modal');
            invalidateCache('clients'); await loadClients(true);
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

    // Validar campos de transporte si el toggle está activado
    const transportToggle = document.getElementById('edit-order-transport-toggle');
    if (transportToggle && transportToggle.checked) {
        const transportName = document.getElementById('edit-order-transport-name').value.trim();
        const transportAddress = document.getElementById('edit-order-transport-address').value.trim();
        
        if (!transportName) {
            showNotification('El nombre del transporte es obligatorio cuando se utiliza transporte', 'error');
            // Volver a deshabilitar el campo cliente
            clientSelect.disabled = true;
            return;
        }
        
        if (!transportAddress) {
            showNotification('La dirección del transporte es obligatoria cuando se utiliza transporte', 'error');
            // Volver a deshabilitar el campo cliente
            clientSelect.disabled = true;
            return;
        }
    }

    // Calcular el monto total
    const totalAmount = editOrderItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    const orderData = {
        cliente_id: clientSelect.value,
        monto: totalAmount,
        descripcion: document.getElementById('edit-order-description').value,
        estado: document.getElementById('edit-order-status').value,
        vendedor_asignado_id: document.getElementById('edit-order-vendor-select').value || null,
        nombre_transporte: document.getElementById('edit-order-transport-name').value,
        direccion_transporte: document.getElementById('edit-order-transport-address').value,
        items: editOrderItems.map(item => ({
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            precio: item.precio
        }))
    };
    
    
    
    // Validar que los campos requeridos no estén vacíos
    if (!orderData.cliente_id || !orderData.estado) {
        showNotification('Cliente y estado son requeridos', 'error');
        // Volver a deshabilitar el campo cliente
        clientSelect.disabled = true;
        return;
    }
    
    try {
        const token = localStorage.getItem('authToken');
        
        
        
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
            closeModal('edit-order-modal'); // Usar la función closeModal en lugar del método manual
            
            // OPTIMIZACIÓN: Actualizar solo el pedido modificado en lugar de recargar todo
            await updateSingleOrder(orderId);
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
    
    
    try {
        // Lista de botones a configurar
        const buttonsConfig = [
            { id: 'new-client-btn', modal: 'new-client-modal', name: 'Nuevo Cliente (Header)' },
            { id: 'new-client-btn-section', modal: 'new-client-modal', name: 'Nuevo Cliente (Sección)' },
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
                
                
                const button = document.getElementById(config.id);
                if (!button) {
                    
                    return;
                }
                
                
                
                // Crear función onclick con manejo de errores específico para nuevo usuario
                if (config.id === 'new-user-btn') {
                    button.onclick = function() {
                        
                        
                        
                        const modal = document.getElementById('new-user-modal');
                        
                        
                        
                        
                        
                        if (modal) {
                            
                            modal.classList.add('active');
                            
                            
                            
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
                            
                            
                            
                            // Verificar si el modal es visible después de agregar la clase
                            setTimeout(() => {
                                const computedStyle = getComputedStyle(modal);
                                
                            }, 100);
                        } else {
                            console.error('❌ Modal new-user-modal no encontrado en el DOM');
                            showNotification('Error: Modal de usuario no encontrado', 'error');
                        }
                    };
                } else if (config.id === 'new-order-btn' || config.id === 'new-order-btn-section') {
                    // Para botones de nuevo pedido, limpiar toggle y campos de transporte
                    button.onclick = safeExecute(function() {
                        // Limpiar toggle y campos de transporte
                        const transportToggle = document.getElementById('order-transport-toggle');
                        if (transportToggle) {
                            transportToggle.checked = false;
                            toggleTransportFields('order-transport-fields', false);
                        }
                        
                        showModal(config.modal);
                    }, `Click ${config.name}`);
                } else {
                    // Para otros botones, usar la función normal
                    button.onclick = safeExecute(function() {
                        
                        showModal(config.modal);
                    }, `Click ${config.name}`);
                }
                
                
                
            } catch (error) {
                console.error(`❌ Error configurando botón ${config.name}:`, error);
            }
        });
        
        // Verificar que todos los modales existan
        
        const modalIds = ['new-client-modal', 'new-order-modal', 'new-payment-modal', 'new-contact-modal', 'new-product-modal', 'new-user-modal'];
        modalIds.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                
            } else {
                console.warn(`⚠️ Modal no encontrado: ${modalId}`);
            }
        });
        
        // Configurar botón de volver al dashboard
        const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
        if (backToDashboardBtn) {
            backToDashboardBtn.onclick = function() {
                
                
                // Restaurar estilos normales del panel de administración
                const adminSection = document.getElementById('admin-profiles-section');
                if (adminSection) {
                    adminSection.style.cssText = 'display: none;';
                    
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
            
        }
        
        
        
    } catch (error) {
        console.error('🚨 ERROR CRÍTICO en setupHeaderButtons:', error);
        console.trace('Stack trace:');
        throw error;
    }
}

// Función para actualizar las estadísticas del dashboard
function updateDashboardStats() {
    
    
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
        
        
    } catch (error) {
        console.error('❌ Error actualizando estadísticas:', error);
    }
}

// Función de diagnóstico completo del DOM
function runDOMDiagnostic() {
    
    
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
        // Verificar elementos críticos por ID
        const criticalElements = [
            'sidebar', 'dashboard-section',
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
        
        // Verificar elementos críticos por clase
        const criticalClasses = ['main-content', 'header'];
        criticalClasses.forEach(className => {
            const element = document.querySelector(`.${className}`);
            report.elements[className] = {
                exists: !!element,
                visible: element ? element.style.display !== 'none' : false,
                classList: element ? Array.from(element.classList) : []
            };
            
            if (!element) {
                report.issues.push(`Elemento crítico faltante: ${className}`);
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
        
        
        
        if (report.issues.length > 0) {
            console.warn('⚠️ PROBLEMAS DETECTADOS:', report.issues);
        } else {
            
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
        
        
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('❌ No hay token de autenticación');
            showNotification('Error: No hay token de autenticación', 'error');
            return;
        }
        
        // Cargar permisos primero
        await loadPermissions();
        
        

        const response = await fetch('/api/usuarios', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        
        
        if (response.ok) {
            const users = await response.json();
            
            renderUsersTable(users);
            renderPermissionsTable(); // Agregar tabla de permisos
            
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
    
    
    let container = document.querySelector('.users-table-container');
    if (!container) {
        console.error('❌ No se encontró el contenedor .users-table-container');
        
        // Intentar encontrar contenedores alternativos
        const altContainer = document.querySelector('#admin-profiles-section .admin-panel');
        if (altContainer) {
            
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
            
        } else {
            console.error('❌ No se pudo encontrar ningún contenedor para la tabla de usuarios');
            showNotification('Error: No se encontró el contenedor de usuarios', 'error');
            return;
        }
    }
    
    
    
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
    
    
}

// Funciones placeholder para administración de usuarios
function editUser(userId) {
    
    showNotification('Función de edición de usuarios en desarrollo', 'info');
}

async function deleteUser(userId) {
    const confirmed = await showConfirm({
        title: 'Eliminar usuario',
        message: '¿Estás seguro de que querés eliminar este usuario? Esta acción no se puede deshacer.',
        confirmText: 'Eliminar'
    });
    if (confirmed) {
        showNotification('Función de eliminación de usuarios en desarrollo', 'info');
    }
}

// Función de debugging específica para el panel de administración
window.debugAdminPanel = function() {
    
    
    // Verificar si el usuario es administrador
    const currentUser = getCurrentUserFromAuth();
    
    
    
    // Verificar elementos del DOM
    const adminSection = document.getElementById('admin-profiles-section');
    
    
    
    
    
    const adminPanel = document.querySelector('.admin-panel');
    
    
    
    const usersContainer = document.querySelector('.users-table-container');
    
    
    
    
    // Verificar si hay tabla dentro del contenedor
    const table = usersContainer?.querySelector('table');
    
    
    
    const newUserBtn = document.getElementById('new-user-btn');
    
    
    
    
    // Verificar token
    const token = localStorage.getItem('authToken');
    
    
    // Verificar posicionamiento
    if (adminSection) {
        const rect = adminSection.getBoundingClientRect();
        
    }
    
    // Intentar cargar usuarios manualmente
    
    loadUsersForAdmin();
};

// Función para forzar la visibilidad del panel de administración
window.forceShowAdminPanel = function() {
    
    
    // Primero, ocultar TODAS las otras secciones
    const allSections = document.querySelectorAll('#dashboard-section, #clientes-section, #pedidos-section, #pagos-section, #productos-section, #contactos-section, .page-content, #fabrica-section');
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
        
        
        // Verificar contenido
        
        
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
    
    
};

// === FUNCIONES DE DEBUGGING GLOBALES ===

// Hacer funciones disponibles globalmente para debugging manual
window.debugModal = function(modalId) {
    
    try {
        showModal(modalId);
        
    } catch (error) {
        console.error(`❌ Error abriendo modal ${modalId}:`, error);
    }
};

// Función específica para debuggear el modal de nuevo usuario
window.debugNewUserModal = function() {
    
    
    const modal = document.getElementById('new-user-modal');
    
    
    if (modal) {
        
        
        
        
        // Intentar agregar clase active
        
        modal.classList.add('active');
        
        
        
        // Forzar estilos inmediatamente con z-index alto
        
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
        
        
        
        // Verificar estilos después de un momento
        setTimeout(() => {
            const computedStyle = getComputedStyle(modal);
            
        }, 200);
        
        // Verificar contenido del modal
        const modalContentElement = modal.querySelector('.modal-content');
        
        
        const form = modal.querySelector('#new-user-form');
        
        
        const inputs = modal.querySelectorAll('input, select');
        
        
    } else {
        console.error('❌ Modal new-user-modal no encontrado');
        
        // Buscar todos los modales disponibles
        const allModals = document.querySelectorAll('.modal');
        
    }
};

// Función para probar el botón de nuevo usuario
window.testNewUserButton = function() {
    
    
    const button = document.getElementById('new-user-btn');
    
    
    if (button) {
        
        
        
        // Simular click
        
        button.click();
    } else {
        console.error('❌ Botón new-user-btn no encontrado');
        
        // Buscar botones similares
        const allButtons = document.querySelectorAll('button');
        const userButtons = Array.from(allButtons).filter(btn => 
            btn.textContent.toLowerCase().includes('usuario') || 
            btn.id.includes('user')
        );
        
    }
};

window.testAllModals = function() {
    
    const modalIds = ['new-client-modal', 'new-order-modal', 'new-payment-modal', 'new-contact-modal', 'new-product-modal'];
    
    modalIds.forEach((modalId, index) => {
        setTimeout(() => {
            
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

// Función para monitorear clicks en tiempo real
window.enableClickMonitoring = function() {
    
    
    document.addEventListener('click', function(e) {
        
    }, true);
    
    
};

// Función para probar la conectividad con el servidor
window.testServerConnection = async function() {
    
    
    const token = localStorage.getItem('authToken');
    
    try {
        // Probar endpoint de verificación de auth
        
        const authResponse = await fetch('/api/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        
        // Probar endpoint de clientes (GET)
        
        const clientsResponse = await fetch('/api/clientes', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        
        // Probar con datos de prueba
        
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
        
        
        
        if (!testResponse.ok) {
            const errorText = await testResponse.text();
            console.error('Error details:', errorText);
        } else {
            const result = await testResponse.json();
            
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
        
        
    }
}

// Funciones para mostrar detalles
async function viewClientDetails(clientId) {
    
    
    // Primero buscar en el array local de clientes
    let client = clients.find(c => c.id == clientId);
    
    // Si no se encuentra en el array local, obtener desde la API
    if (!client) {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/clientes/${clientId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                client = await response.json();
            } else {
                showNotification('Cliente no encontrado', 'error');
                return;
            }
        } catch (error) {
            console.error('Error obteniendo cliente desde API:', error);
            showNotification('Error al obtener datos del cliente', 'error');
            return;
        }
    }
    
    // Asegurar que pedidos y pagos estén cargados (pueden estar vacíos por lazy loading)
    if (orders.length === 0) await loadOrders(true);
    if (payments.length === 0) await loadPayments(true);

    // Buscar pedidos del cliente
    const clientOrders = orders.filter(order => order.cliente_id == clientId);

    // Buscar pagos del cliente
    const clientPayments = payments.filter(payment => payment.cliente_id == clientId);
    
    // Debug: mostrar datos encontrados
    
    
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
    
    // Debug: mostrar cálculos
    
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal';
    detailsModal.style.cssText = `
        display: block; z-index: 12000;
    `;
    
    detailsModal.innerHTML = `
        <div class="modal-content" style="z-index: 12001;">
            <div class="modal-header">
                <h2 class="modal-title">Detalles del Cliente</h2>
                <button class="close-modal btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <!-- Información básica del cliente -->
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 1rem 0; color: #1f2937;">Información Personal</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <strong>Nombre:</strong><br>
                            ${(client.nombre || client.name || '') + ' ' + (client.apellido || '')}
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
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center;">
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
                                        <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Vendedor</th>
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
                                            <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${order.vendedor_asignado_nombre || 'N/A'}</td>
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

            </div>
            <div class="modal-actions" style="flex-wrap: wrap; gap: 0.5rem;">
                <button class="btn btn-whatsapp" onclick="openWhatsAppChat('${client.telefono}', '${(client.nombre || client.name || '') + ' ' + (client.apellido || '')}')" style="background: #25D366; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                </button>
                <button class="btn btn-primary" onclick="editClient(${client.id}); closeDynamicModal(this.closest('.modal'));" style="background: #4f46e5; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-success" onclick="showModal('new-order-modal'); document.getElementById('order-client-select').value='${client.id}'; closeDynamicModal(this.closest('.modal'));" style="background: #10b981; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
                    <i class="fas fa-plus"></i> Pedido
                </button>
                <button class="btn btn-info" onclick="showModal('new-payment-modal'); document.getElementById('payment-client-select').value='${client.id}'; closeDynamicModal(this.closest('.modal'));" style="background: #0ea5e9; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
                    <i class="fas fa-credit-card"></i> Pago
                </button>
                <button class="btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))" style="background: #6b7280; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
        </div>
    `;
    
    openDynamicModal(detailsModal);
}

// Función para abrir WhatsApp con mensaje al cliente
function openWhatsAppChat(clientPhone, clientName) {
    if (!clientPhone) {
        showNotification('El cliente no tiene un número de teléfono registrado', 'error');
        return;
    }
    
    // Limpiar el número de teléfono (remover espacios, guiones, paréntesis)
    let cleanPhone = clientPhone.toString().replace(/[\s\-\(\)\+]/g, '');
    
    // Si el número no empieza con código de país, agregar +54 (Argentina)
    if (!cleanPhone.startsWith('54') && !cleanPhone.startsWith('+54')) {
        // Si empieza con 0, removerlo (formato local argentino)
        if (cleanPhone.startsWith('0')) {
            cleanPhone = cleanPhone.substring(1);
        }
        cleanPhone = '54' + cleanPhone;
    }
    
    // Mensaje predeterminado
    const mensaje = `Hola ${clientName || 'estimado cliente'},`;
    
    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp en una nueva ventana/pestaña
    window.open(whatsappURL, '_blank');
    
    console.log(`📱 Abriendo WhatsApp para ${clientName} (${cleanPhone})`);
}

function viewOrderDetails(orderId) {
    
    
    const order = orders.find(o => o.id == orderId);
    if (!order) {
        showNotification('Pedido no encontrado', 'error');
            return;
        }
        
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal';
    detailsModal.style.cssText = `
        display: block; z-index: 12000;
    `;
    
    // Cargar items del pedido y mostrar el modal
    loadOrderItems(orderId).then(items => {
        console.log('🔍 VIEW ORDER DETAILS - Items cargados:', {
            orderId,
            itemsCount: items.length,
            items: items,
            orderEstado: order.estado
        });
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
            <div class="modal-content" style="z-index: 12001;">
                <div class="modal-header">
                    <h2 class="modal-title">Detalles del Pedido #${order.numero_pedido}</h2>
                    <button class="close-modal btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
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
                    ${(order.nombre_transporte || order.direccion_transporte) ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="margin: 0 0 1rem 0; color: #1f2937; display: flex; align-items: center;">
                                <i class="fas fa-truck" style="margin-right: 0.5rem; color: #6366f1;"></i>
                                Información de Transporte
                            </h3>
                            <div style="background: white; padding: 1rem; border-radius: 6px; border-left: 4px solid #6366f1;">
                                ${order.nombre_transporte ? `
                                    <div style="margin-bottom: 0.75rem;">
                                        <strong>Nombre del Transporte:</strong><br>
                                        <span style="color: #374151;">${order.nombre_transporte}</span>
                                    </div>
                                ` : ''}
                                ${order.direccion_transporte ? `
                                    <div>
                                        <strong>Dirección del Transporte:</strong><br>
                                        <span style="color: #374151;">${order.direccion_transporte}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                    ${itemsTable}
                </div>
                <div style="flex-shrink: 0; border-top: 1px solid #e2e8f0; background: #f8fafc;">
                    <div style="display: flex; gap: 0.5rem; padding: 0.75rem 1.5rem; border-bottom: 1px solid #e9ecef; justify-content: center;">
                        <button class="btn" onclick="printInvoice(${order.id})" style="background: #f59e0b; color: white; padding: 0.5rem 0.9rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; white-space: nowrap;" title="Imprimir Proforma">
                            <i class="fas fa-file-invoice"></i> Proforma
                        </button>
                        <button class="btn" onclick="printShippingLabel(${order.id})" style="background: #06b6d4; color: white; padding: 0.5rem 0.9rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; white-space: nowrap;" title="Etiqueta">
                            <i class="fas fa-tag"></i> Etiqueta
                        </button>
                        <button class="btn" onclick="printDeliveryReceipt(${order.id})" style="background: #10b981; color: white; padding: 0.5rem 0.9rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; white-space: nowrap;" title="Remito">
                            <i class="fas fa-print"></i> Remito
                        </button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1.5rem;">
                        ${getCurrentUserFromAuth()?.perfil === 'Administrador' ? `
                        <button class="btn" onclick="confirmAndDeleteOrderFromModal(this, ${order.id}, '${order.numero_pedido}')" style="background: #dc2626; color: white; padding: 0.6rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 0.85rem;" title="Eliminar Pedido">
                            <i class="fas fa-trash-alt"></i> Eliminar
                        </button>
                        ` : '<div></div>'}
                        <div style="display: flex; gap: 0.75rem; margin-left: auto;">
                            <button class="btn" onclick="editOrder(${order.id}); closeDynamicModal(this.closest('.modal'));" style="background: #4f46e5; color: white; padding: 0.6rem 1.25rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">
                                <i class="fas fa-edit"></i> Editar Pedido
                            </button>
                            <button class="btn" onclick="closeDynamicModal(this.closest('.modal'))" style="background: #6b7280; color: white; padding: 0.6rem 1.25rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
                `;
                
                // Agregar el modal al DOM después de cargar los items
                openDynamicModal(detailsModal);
            }).catch(error => {
                console.error('❌ VIEW ORDER DETAILS - Error cargando items:', error);
                showNotification('Error al cargar los productos del pedido', 'error');
            });
}

// Función para imprimir remito de entrega
async function printDeliveryReceipt(orderId) {
    try {
        // Encontrar el pedido
        const order = orders.find(o => o.id == orderId);
        if (!order) {
            showNotification('Pedido no encontrado', 'error');
            return;
        }
        
        // Encontrar el cliente completo
        const client = clients.find(c => c.id == order.cliente_id);
        if (!client) {
            showNotification('Cliente no encontrado', 'error');
            return;
        }
        
        // Cargar los items del pedido
        const items = await loadOrderItems(orderId);
        
        // Generar el HTML del remito
        const receiptHTML = generateDeliveryReceiptHTML(order, client, items);
        
        // Abrir ventana de impresión
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(receiptHTML);
        printWindow.document.close();
        
        // Esperar a que cargue y después imprimir
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            // Cerrar la ventana después de imprimir (opcional)
            printWindow.onafterprint = function() {
                printWindow.close();
            };
        };
        
    } catch (error) {
        console.error('Error generando remito:', error);
        showNotification('Error al generar el remito de entrega', 'error');
    }
}

// Función para generar el HTML del remito de entrega
function generateDeliveryReceiptHTML(order, client, items) {
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const itemsRows = items.map(item => `
        <tr>
            <td style="padding: 6px; border-bottom: 1px solid #ccc;">${item.producto_nombre || 'Producto'}</td>
            <td style="padding: 6px; text-align: center; border-bottom: 1px solid #ccc;">${item.cantidad}</td>
            <td style="padding: 6px; border-bottom: 1px solid #ccc;">${item.producto_descripcion || '-'}</td>
        </tr>
    `).join('');
    
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Remito de Entrega - ${order.numero_pedido}</title>
    <style>
        @media print {
            @page {
                margin: 0.3in;
                size: A4;
            }
            body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                max-height: 100vh;
                overflow: hidden;
            }
            .receipt-body {
                page-break-inside: avoid;
            }
            .signature-section {
                page-break-inside: avoid;
            }
        }
        
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
            font-size: 14px;
            line-height: 1.3;
        }
        
        .receipt-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }
        
        .receipt-left {
            text-align: left;
        }
        
        .receipt-right {
            text-align: right;
        }
        
        .company-logo {
            margin-bottom: 3px;
        }
        
        .company-logo img {
            display: block;
            max-height: 60px;
            max-width: 150px;
            object-fit: contain;
        }
        
        .receipt-title {
            font-size: 18px;
            font-weight: bold;
            margin: 8px 0;
            color: #000;
        }
        
        .receipt-number {
            font-size: 16px;
            color: #000;
            margin-bottom: 3px;
        }
        
        .receipt-date {
            font-size: 14px;
            color: #000;
        }
        
        .receipt-body {
            margin-bottom: 15px;
        }
        
        .client-section {
            margin-bottom: 15px;
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 6px;
            border-left: 4px solid #000;
        }
        
        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: #000;
            margin-bottom: 8px;
            text-transform: uppercase;
        }
        
        .client-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }
        
        .info-item {
            margin-bottom: 6px;
        }
        
        .info-label {
            font-weight: bold;
            color: #000;
            font-size: 16px;
        }
        
        .info-value {
            color: #333;
            margin-left: 5px;
            font-size: 16px;
        }
        
        .products-section {
            margin-bottom: 15px;
        }
        
        .products-table {
            width: 100%;
            border-collapse: collapse;
            border: 2px solid #000;
            border-radius: 6px;
            overflow: hidden;
        }
        
        .products-table th {
            background-color: #000;
            color: white;
            padding: 8px 6px;
            text-align: left;
            font-weight: bold;
            font-size: 14px;
        }
        
        .products-table td {
            padding: 6px;
            border-bottom: 1px solid #ccc;
            font-size: 16px;
        }
        
        .products-table tr:nth-child(even) {
            background-color: #f5f5f5;
        }
        
        .signature-section {
            margin-top: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
        
        .signature-box {
            text-align: center;
            border-top: 2px solid #000;
            padding-top: 8px;
            margin-top: 30px;
        }
        
        .signature-label {
            font-weight: bold;
            color: #000;
            font-size: 14px;
        }
        
        .footer {
            margin-top: 15px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 10px;
        }
        
        .order-status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: bold;
            background-color: #f0f0f0;
            color: #000;
        }
        
        .important-note {
            background-color: #f9f9f9;
            border: 1px solid #666;
            border-radius: 6px;
            padding: 8px;
            margin: 12px 0;
            font-size: 16px;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="receipt-header">
        <div class="receipt-left">
            <div class="company-logo">
                <img src="img/logo-mimi.png" alt="MIMI" style="max-height: 60px; max-width: 150px; object-fit: contain;">
            </div>
            <div style="font-size: 13px; color: #333; margin-bottom: 3px;">CUIT: 30-71751033-6</div>
            <div style="font-size: 13px; color: #333; margin-bottom: 8px;">Dirección: José Ignacio de la Rosa 6276, Capital Federal</div>
            <div class="receipt-title">REMITO DE ENTREGA</div>
            <div class="receipt-number">Nº ${order.numero_pedido}</div>
            ${order.vendedor_asignado_nombre ? `
                <div style="font-size: 14px; color: #333; margin-top: 3px;">
                    <strong>Vendedor:</strong> ${order.vendedor_asignado_nombre}
                </div>
            ` : ''}
        </div>
        <div class="receipt-right">
            <div class="receipt-date">${currentDate}</div>
        </div>
    </div>
    
    <div class="receipt-body">
        <div class="client-section">
            <div class="section-title">📋 Datos del Cliente</div>
            <div class="client-info">
                <div class="info-item">
                    <span class="info-label">Nombre:</span>
                    <span class="info-value">${client.nombre || ''} ${client.apellido || ''}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Documento:</span>
                    <span class="info-value">${client.documento || client.cuit || 'No especificado'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Teléfono:</span>
                    <span class="info-value">${client.telefono || 'No especificado'}</span>
                </div>
                <div class="info-item" style="grid-column: 1 / -1;">
                    <span class="info-label">Dirección de Entrega:</span>
                    <span class="info-value">${client.direccion || 'No especificada'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Localidad:</span>
                    <span class="info-value">${client.localidad || 'No especificada'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ciudad:</span>
                    <span class="info-value">${client.ciudad || 'No especificada'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Provincia:</span>
                    <span class="info-value">${client.provincia || 'No especificada'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Código Postal:</span>
                    <span class="info-value">${client.codigo_postal || 'No especificado'}</span>
                </div>
            </div>
            
            <div style="margin-top: 10px;">
                <div class="info-item">
                    <span class="info-label">Fecha del Pedido:</span>
                    <span class="info-value">${formatDate(order.fecha)}</span>
                </div>
            </div>
        </div>
        
        <div class="products-section">
            <div class="section-title">📦 Productos a Entregar</div>
            <table class="products-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th style="width: 100px; text-align: center;">Cantidad</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsRows}
                </tbody>
            </table>
        </div>
        
        ${order.descripcion ? `
            <div class="important-note">
                <strong>📝 Notas del Pedido:</strong><br>
                ${order.descripcion}
            </div>
        ` : ''}
        
        ${(order.nombre_transporte || order.direccion_transporte) ? `
            <div class="important-note">
                <strong>🚚 Transporte a Utilizar:</strong><br>
                ${order.nombre_transporte ? `
                    <strong>Nombre del Transporte:</strong> ${order.nombre_transporte}<br>
                ` : ''}
                ${order.direccion_transporte ? `
                    <strong>Dirección del Transporte:</strong> ${order.direccion_transporte}
                ` : ''}
            </div>
        ` : ''}
        
        <div class="important-note">
            <strong>⚠️ Importante:</strong> Este remito debe ser firmado por el cliente al momento de la entrega. 
            Verificar que los productos entregados coincidan con lo detallado en este documento.
        </div>
        
        <div style="margin: 15px 0; padding: 10px; border: 2px solid #000; border-radius: 6px; background-color: #f9f9f9;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <strong style="font-size: 16px; color: #000;">CANTIDAD DE BULTOS:</strong>
                <div style="width: 100px; height: 30px; border: 2px solid #000; background-color: white; display: inline-block;"></div>
            </div>
        </div>
    </div>
    
    <div class="signature-section">
        <div>
            <div class="signature-box">
                <div class="signature-label">Firma del Cliente</div>
            </div>
        </div>
        <div>
            <div class="signature-box">
                <div class="signature-label">Firma del Repartidor</div>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p style="margin: 5px 0;"><strong>MIMI CRM</strong> - Sistema de Gestión</p>
        <p style="margin: 5px 0;">Remito generado el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}</p>
    </div>
</body>
</html>
    `;
}

// Función para imprimir etiqueta de envío
async function printShippingLabel(orderId) {
    try {
        // Encontrar el pedido
        const order = orders.find(o => o.id == orderId);
        if (!order) {
            showNotification('Pedido no encontrado', 'error');
            return;
        }
        
        // Encontrar el cliente completo
        const client = clients.find(c => c.id == order.cliente_id);
        if (!client) {
            showNotification('Cliente no encontrado', 'error');
            return;
        }
        
        // Generar el HTML de la etiqueta
        const labelHTML = generateShippingLabelHTML(client);
        
        // Abrir ventana de impresión
        const printWindow = window.open('', '_blank', 'width=400,height=600');
        printWindow.document.write(labelHTML);
        printWindow.document.close();
        
        // Esperar a que cargue y después imprimir
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            // Cerrar la ventana después de imprimir (opcional)
            printWindow.onafterprint = function() {
                printWindow.close();
            };
        };
        
    } catch (error) {
        console.error('Error generando etiqueta:', error);
        showNotification('Error al generar la etiqueta de envío', 'error');
    }
}

// Función para generar el HTML de la etiqueta de envío
function generateShippingLabelHTML(client) {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Etiqueta de Envío - ${client.nombre} ${client.apellido}</title>
    <style>
        @media print {
            @page {
                margin: 0.1in;
                size: A4;
            }
            body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                height: 54vh; /* 20% más grande que 45% = 54% */
                overflow: hidden;
            }
            .shipping-label {
                height: 100%;
                max-height: 54vh;
            }
        }
        
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 6px;
            font-size: 16px;
            line-height: 1.2;
            background: white;
            height: 54vh;
            overflow: hidden;
        }
        
        .shipping-label {
            border: 2px solid #000;
            padding: 12px;
            background: white;
            height: 100%;
            max-height: 54vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
        }
        
        .label-header {
            text-align: center;
            margin-bottom: 12px;
            border-bottom: 1px solid #000;
            padding-bottom: 6px;
        }
        
        .company-logo {
            margin-bottom: 3px;
        }
        
        .company-logo img {
            display: block;
            max-height: 30px;
            max-width: 75px;
            object-fit: contain;
            margin: 0 auto;
        }
        
        .label-title {
            font-size: 18px;
            font-weight: bold;
            color: #000;
        }
        
        .recipient-info {
            flex-grow: 1;
            margin-bottom: 12px;
        }
        
        .recipient-name {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        .address-section {
            margin-bottom: 10px;
        }
        
        .address-line {
            font-size: 18px;
            margin-bottom: 4px;
            line-height: 1.3;
        }
        
        .field-label {
            font-weight: bold;
            color: #333;
            font-size: 14px;
            margin-right: 5px;
        }
        
        .phone-section {
            margin-top: 10px;
            padding-top: 6px;
            border-top: 1px solid #ccc;
        }
        
        .phone-label {
            font-weight: bold;
            font-size: 14px;
            color: #666;
            margin-bottom: 4px;
        }
        
        .phone-number {
            font-size: 18px;
            font-weight: bold;
        }
        
        .label-footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 6px;
        }
        
        .postal-code {
            font-size: 20px;
            font-weight: bold;
            margin-top: 6px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="shipping-label">
        <div class="label-header">
            <div class="company-logo">
                <img src="img/logo-mimi.png" alt="MIMI" style="max-height: 30px; max-width: 75px; object-fit: contain;">
            </div>
            <div class="label-title">ETIQUETA DE ENVÍO</div>
        </div>
        
        <div class="recipient-info">
            <div class="recipient-name">
                ${client.nombre} ${client.apellido}
            </div>
            
            <div class="address-section">
                <div class="address-line">
                    <span class="field-label">Domicilio:</span>${client.direccion}
                </div>
                <div class="address-line">
                    <span class="field-label">Localidad:</span>${client.localidad}
                </div>
                <div class="address-line">
                    <span class="field-label">Ciudad:</span>${client.ciudad}
                </div>
                <div class="address-line">
                    <span class="field-label">Provincia:</span>${client.provincia}
                </div>
                <div class="postal-code">
                    <span class="field-label">Código Postal:</span>${client.codigo_postal}
                </div>
            </div>
            
            <div class="phone-section">
                <div class="phone-label">TELÉFONO:</div>
                <div class="phone-number">${client.telefono}</div>
            </div>
        </div>
        
        <div class="label-footer">
            <div>Generado el ${new Date().toLocaleDateString('es-ES')}</div>
            <div>
                <img src="img/logo-mimi.png" alt="MIMI" style="max-height: 15px; max-width: 40px; object-fit: contain; vertical-align: middle; margin-right: 5px;">
                <strong>Sistema de Gestión</strong>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}

// Función para imprimir proforma
async function printInvoice(orderId) {
    try {
        // Encontrar el pedido
        const order = orders.find(o => o.id == orderId);
        if (!order) {
            showNotification('Pedido no encontrado', 'error');
            return;
        }
        
        // Encontrar el cliente completo
        const client = clients.find(c => c.id == order.cliente_id);
        if (!client) {
            showNotification('Cliente no encontrado', 'error');
            return;
        }
        
        // Cargar los items del pedido
        const items = await loadOrderItems(orderId);
        
        // Generar el HTML de la proforma
        const invoiceHTML = generateInvoiceHTML(order, client, items);
        
        // Abrir ventana de impresión
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
        
        // Esperar a que cargue y después imprimir
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            // Cerrar la ventana después de imprimir (opcional)
            printWindow.onafterprint = function() {
                printWindow.close();
            };
        };
        
    } catch (error) {
        console.error('Error generando proforma:', error);
        showNotification('Error al generar la proforma', 'error');
    }
}

// Función para generar el HTML de la proforma argentina
function generateInvoiceHTML(order, client, items) {
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Calcular subtotales y totales
    const subtotal = items.reduce((sum, item) => {
        const itemSubtotal = parseFloat(item.subtotal) || 0;
        return sum + itemSubtotal;
    }, 0);
    const iva = 0; // IVA en 0
    const total = subtotal; // Total igual al subtotal
    
    const itemsRows = items.map(item => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ccc; text-align: left;">${item.producto_nombre || 'Producto'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ccc; text-align: center;">${item.cantidad}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ccc; text-align: right;">${formatCurrency(item.precio)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ccc; text-align: right;">${formatCurrency(item.subtotal)}</td>
        </tr>
    `).join('');
    
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proforma - ${order.numero_pedido}</title>
    <style>
        @media print {
            @page {
                margin: 0.5in;
                size: A4;
            }
            body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
        }
        
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            font-size: 16px;
            line-height: 1.4;
            background: white;
        }
        
        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
        }
        
        .invoice-left {
            text-align: left;
        }
        
        .invoice-right {
            text-align: right;
        }
        
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
        }
        
        .company-details {
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
        }
        
        .invoice-title {
            font-size: 22px;
            font-weight: bold;
            margin: 10px 0;
            color: #000;
        }
        
        .invoice-number {
            font-size: 18px;
            color: #000;
            margin-bottom: 5px;
        }
        
        .invoice-date {
            font-size: 16px;
            color: #000;
        }
        
        .invoice-body {
            margin-bottom: 30px;
        }
        
        .client-section {
            margin-bottom: 25px;
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #000;
        }
        
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #000;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        .client-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .info-item {
            margin-bottom: 8px;
        }
        
        .info-label {
            font-weight: bold;
            color: #000;
            font-size: 16px;
        }
        
        .info-value {
            color: #333;
            margin-left: 5px;
            font-size: 16px;
        }
        
        .products-section {
            margin-bottom: 25px;
        }
        
        .products-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        
        .products-table th {
            background-color: #f0f0f0;
            padding: 10px 8px;
            text-align: left;
            font-weight: bold;
            border-bottom: 2px solid #000;
            font-size: 17px;
        }
        
        .products-table td {
            padding: 8px;
            border-bottom: 1px solid #ccc;
            font-size: 16px;
        }
        
        .totals-section {
            margin-top: 20px;
            border-top: 2px solid #000;
            padding-top: 15px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 18px;
        }
        
        .total-row.final {
            font-size: 22px;
            font-weight: bold;
            color: #000;
            border-top: 1px solid #000;
            padding-top: 10px;
            margin-top: 10px;
        }
        
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 15px;
        }
        
        .important-note {
            background-color: #f9f9f9;
            border: 1px solid #666;
            border-radius: 6px;
            padding: 10px;
            margin: 20px 0;
            font-size: 15px;
            color: #333;
        }
        
        .fiscal-info {
            background-color: #e8f4fd;
            border: 1px solid #0066cc;
            border-radius: 6px;
            padding: 10px;
            margin: 20px 0;
            font-size: 15px;
            color: #0066cc;
        }
    </style>
</head>
<body>
    <div class="invoice-header">
        <div class="invoice-left">
            <div class="company-name">MIMI</div>
            <div class="company-details">CUIT: 30-71751033-6</div>
            <div class="company-details">Dirección: José Ignacio de la Rosa 6276, Capital Federal</div>
            <div class="company-details">Condición IVA: Responsable Inscripto</div>
            <div class="invoice-title">PROFORMA</div>
            <div class="invoice-number">Nº ${order.numero_pedido}</div>
        </div>
        <div class="invoice-right">
            <div class="invoice-date">Fecha: ${currentDate}</div>
            <div style="margin-top: 10px; font-size: 15px; color: #666;">
                <div>Punto de Venta: 0001</div>
                <div>Comprobante: PROFORMA</div>
            </div>
        </div>
    </div>
    
    <div class="invoice-body">
        <div class="client-section">
            <div class="section-title">📋 Datos del Cliente</div>
            <div class="client-info">
                <div class="info-item">
                    <span class="info-label">Razón Social:</span>
                    <span class="info-value">${client.nombre || ''} ${client.apellido || ''}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">CUIT/DNI:</span>
                    <span class="info-value">${client.documento || 'No especificado'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Teléfono:</span>
                    <span class="info-value">${client.telefono || 'No especificado'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${client.email || 'No especificado'}</span>
                </div>
                <div class="info-item" style="grid-column: 1 / -1;">
                    <span class="info-label">Dirección:</span>
                    <span class="info-value">${client.direccion || 'No especificada'}, ${client.localidad || ''}, ${client.ciudad || ''}, ${client.provincia || ''}</span>
                </div>
            </div>
        </div>
        
        <div class="products-section">
            <div class="section-title">📦 Detalle de Productos</div>
            <table class="products-table">
                <thead>
                    <tr>
                        <th style="width: 40%;">Descripción</th>
                        <th style="width: 15%; text-align: center;">Cantidad</th>
                        <th style="width: 20%; text-align: right;">Precio Unit.</th>
                        <th style="width: 25%; text-align: right;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsRows}
                </tbody>
            </table>
        </div>
        
        <div class="totals-section">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="total-row">
                <span>IVA 21%:</span>
                <span>${formatCurrency(iva)}</span>
            </div>
            <div class="total-row final">
                <span>TOTAL:</span>
                <span>${formatCurrency(total)}</span>
            </div>
        </div>
        
        ${order.descripcion ? `
            <div class="important-note">
                <strong>📝 Observaciones:</strong><br>
                ${order.descripcion}
            </div>
        ` : ''}
        
        <div class="fiscal-info">
            <strong>ℹ️ Información Fiscal:</strong><br>
            • Este documento es una proforma según normativa AFIP<br>
            • No corresponde IVA discriminado<br>
            • Conserve este comprobante para su contabilidad
        </div>
    </div>
    
    <div class="footer">
        <p><strong>MIMI</strong> - CUIT: 30-71751033-6 - Responsable Inscripto</p>
        <p>José Ignacio de la Rosa 6276, Capital Federal</p>
        <p>Proforma generada el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}</p>
    </div>
</body>
</html>
    `;
}

function viewPaymentDetails(paymentId) {
    
    
    const payment = payments.find(p => p.id == paymentId);
    if (!payment) {
        showNotification('Pago no encontrado', 'error');
        return;
    }
    
    // Crear modal de detalles dinámicamente
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal';
    detailsModal.style.cssText = `
        display: block; z-index: 12000;
    `;
    
    detailsModal.innerHTML = `
        <div class="modal-content" style="z-index: 12001;">
            <div class="modal-header">
                <h2 class="modal-title">Detalles del Pago</h2>
                <button class="close-modal btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeDynamicModal(this.closest('.modal'))">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    openDynamicModal(detailsModal);
}

// Función para actualizar un solo pedido en el array local
async function updateSingleOrder(orderId) {
    try {
        console.log('🔄 UPDATE SINGLE ORDER - Actualizando pedido:', orderId);
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/pedidos/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const updatedOrder = await response.json();
            console.log('✅ UPDATE SINGLE ORDER - Pedido actualizado:', updatedOrder);
            
            // Actualizar en el array local
            const orderIndex = orders.findIndex(o => o.id == orderId);
            if (orderIndex !== -1) {
                orders[orderIndex] = updatedOrder;
                console.log('✅ UPDATE SINGLE ORDER - Array local actualizado');
            } else {
                console.warn('⚠️ UPDATE SINGLE ORDER - Pedido no encontrado en array local, agregando...');
                orders.unshift(updatedOrder); // Agregar al inicio si no existe
            }
            
            // Re-renderizar la tabla
            renderOrdersTable();
            
            // Si la sección de fábrica está visible, también actualizarla
            const fabricaSection = document.getElementById('fabrica-section');
            if (fabricaSection && fabricaSection.style.display !== 'none') {
                renderFabricaTable();
            }
            
            console.log('✅ UPDATE SINGLE ORDER - Tabla actualizada exitosamente');
        } else {
            console.error('❌ UPDATE SINGLE ORDER - Error del servidor:', response.status);
            throw new Error(`Error del servidor: ${response.status}`);
        }
    } catch (error) {
        console.error('❌ UPDATE SINGLE ORDER - Error:', error);
        console.log('🔄 UPDATE SINGLE ORDER - Fallback: recargando todos los pedidos...');
        // Fallback: recargar todo si falla
        invalidateCache('orders'); await loadOrders(true);
    }
}

// Función para agregar un nuevo pedido al array local
async function addNewOrderToLocal(orderId) {
    try {
        console.log('🔄 ADD NEW ORDER - Agregando nuevo pedido:', orderId);
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/pedidos/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const newOrder = await response.json();
            console.log('✅ ADD NEW ORDER - Nuevo pedido obtenido:', newOrder);
            
            // Agregar al inicio del array (pedidos más recientes primero)
            orders.unshift(newOrder);
            console.log('✅ ADD NEW ORDER - Array local actualizado');
            
            // Re-renderizar la tabla
            renderOrdersTable();
            
            // Si la sección de fábrica está visible, también actualizarla
            const fabricaSection = document.getElementById('fabrica-section');
            if (fabricaSection && fabricaSection.style.display !== 'none') {
                renderFabricaTable();
            }
            
            console.log('✅ ADD NEW ORDER - Tabla actualizada exitosamente');
        } else {
            console.error('❌ ADD NEW ORDER - Error del servidor:', response.status);
            throw new Error(`Error del servidor: ${response.status}`);
        }
    } catch (error) {
        console.error('❌ ADD NEW ORDER - Error:', error);
        console.log('🔄 ADD NEW ORDER - Fallback: recargando todos los pedidos...');
        // Fallback: recargar todo si falla
        invalidateCache('orders'); await loadOrders(true);
    }
}

// Función para cargar items de un pedido específico
async function loadOrderItems(orderId) {
    try {
        console.log('🔍 LOAD ORDER ITEMS - Iniciando carga para pedido:', orderId);
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/pedidos/${orderId}/items`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const items = await response.json();
            console.log('✅ LOAD ORDER ITEMS - Items cargados exitosamente:', {
                orderId,
                itemsCount: items.length,
                items: items
            });
            return items;
        } else {
            console.error('❌ LOAD ORDER ITEMS - Error del servidor:', response.status);
            return [];
        }
    } catch (error) {
        console.error('❌ LOAD ORDER ITEMS - Error de red:', error);
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
    const clearProductsBtn = document.getElementById('edit-clear-products-btn');
    const confirmAddBtn = document.getElementById('edit-confirm-add-product');
    const cancelAddBtn = document.getElementById('edit-cancel-add-product');
    const productSelect = document.getElementById('edit-product-select');

    if (addProductBtn) {
        addProductBtn.onclick = () => {
            document.getElementById('edit-product-selector').style.display = 'block';
            populateEditProductSelect();
        };
    }

    // Botón limpiar productos
    if (clearProductsBtn) {
        clearProductsBtn.addEventListener('click', async () => {
            if (editOrderItems.length === 0) {
                showNotification('No hay productos para limpiar', 'info');
                return;
            }
            const confirmed = await showConfirm({
                title: 'Limpiar productos',
                message: '¿Estás seguro de que querés limpiar todos los productos del pedido?',
                confirmText: 'Limpiar',
                cancelText: 'Cancelar'
            });
            if (confirmed) {
                clearEditOrderItems();
                showNotification('Productos limpiados correctamente', 'success');
            }
        });
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
    console.log('🔍 RENDER EDIT ORDER PRODUCTS - Iniciando renderizado');
    console.log('🔍 RENDER EDIT ORDER PRODUCTS - editOrderItems:', editOrderItems);
    
    const productsList = document.getElementById('edit-order-products-list');
    const noProductsMessage = document.getElementById('edit-no-products-message');

    // Validar que los elementos existan
    if (!productsList || !noProductsMessage) {
        console.error('❌ RENDER EDIT ORDER PRODUCTS - Elementos del DOM no encontrados. Esto es crítico y no debería ocurrir si el modal está abierto y la estructura HTML es correcta.');
        return;
    }

    console.log('✅ RENDER EDIT ORDER PRODUCTS - Elementos encontrados, renderizando...');
    renderEditOrderProductsInternal(productsList, noProductsMessage);
}

function renderEditOrderProductsInternal(productsList, noProductsMessage) {
    console.log('🔍 RENDER EDIT ORDER PRODUCTS INTERNAL - editOrderItems:', editOrderItems);
    
    if (editOrderItems.length === 0) {
        console.log('📝 RENDER EDIT ORDER PRODUCTS INTERNAL - No hay productos, mostrando mensaje');
        noProductsMessage.style.display = 'block';
        return;
    }

    console.log('📝 RENDER EDIT ORDER PRODUCTS INTERNAL - Renderizando', editOrderItems.length, 'productos');
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

async function removeProductFromEditOrder(index) {
    const confirmed = await showConfirm({
        title: 'Eliminar producto',
        message: '¿Querés eliminar este producto del pedido?',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
    });
    if (confirmed) {
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
        
    }
}

function clearEditOrderItems() {
    editOrderItems = [];
    renderEditOrderProducts();
    updateEditOrderTotal();
}

// Función para renderizar la tabla de permisos por perfil
function renderPermissionsTable() {
    
    
    // Verificar si el usuario actual es administrador
    const currentUser = getCurrentUserFromAuth();
    const isAdmin = currentUser?.perfil === 'Administrador';
    
    let container = document.querySelector('.perms-table-container');
    if (!container) {
        console.error('❌ No se encontró el contenedor .perms-table-container');
        
        // Intentar encontrar contenedores alternativos
        const altContainer = document.querySelector('#admin-profiles-section .admin-panel');
        if (altContainer) {
            
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
    
    
}

// Funciones para administración de usuarios
async function editUser(userId) {
    
    
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
        document.getElementById('edit-user-comision').value = user.comision || 0;
        document.getElementById('edit-user-password').value = '';
        
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
            perfil: formData.get('perfil') || document.getElementById('edit-user-perfil').value,
            comision: parseFloat(document.getElementById('edit-user-comision').value) || 0
        };
        
        // Solo incluir contraseña si se proporciona
        const password = document.getElementById('edit-user-password').value;
        if (password && password.trim() !== '') {
            userData.password = password;
        }
        
        
        
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
    
    
    // Verificar que el usuario sea administrador
    const currentUser = getCurrentUserFromAuth();
    if (currentUser?.perfil !== 'Administrador') {
        showNotification('Error: Solo los administradores pueden modificar permisos', 'error');
        return;
    }
    
    // Actualizar el valor en la estructura global
    if (window.permisosPorPerfil && window.permisosPorPerfil[perfil] && window.permisosPorPerfil[perfil][modulo]) {
        window.permisosPorPerfil[perfil][modulo][accion] = valor;
        
        
        // Mostrar notificación de cambio
        showNotification(`Permiso ${valor ? 'otorgado' : 'revocado'}: ${perfil} - ${modulo} - ${accion}`, 'info');
    } else {
        console.error('❌ Error: Estructura de permisos no encontrada');
        showNotification('Error: No se pudo actualizar el permiso', 'error');
    }
}

// Función para guardar permisos en el servidor
async function savePermissions() {
    
    
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
        
        
        
        if (response.ok) {
            const result = await response.json();
            showNotification(`Permisos guardados exitosamente (${result.count} registros)`, 'success');
            
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
            
        } else if (response.status === 404) {
            // Si no existe el endpoint, usar permisos por defecto o localStorage
            const savedPermissions = localStorage.getItem('permisosPorPerfil');
            if (savedPermissions) {
                window.permisosPorPerfil = JSON.parse(savedPermissions);
                
            } else {
                
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
            
        } else {
            
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

// Función para renderizar la tabla de pedidos en fábrica (solo estado 'fabricar')
function renderFabricaTable() {
    const tbody = document.getElementById('fabrica-table-body');
    const countElement = document.getElementById('fabrica-count');
    
    if (!tbody) {
        console.error('❌ No se encontró el elemento fabrica-table-body');
        return;
    }
    
    // Filtrar solo pedidos en estado 'fabricar'
    const pedidosFabrica = orders.filter(order => order.estado === 'fabricar');
    
    // Actualizar contador
    if (countElement) {
        countElement.textContent = pedidosFabrica.length;
    }
    
    if (pedidosFabrica.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center" style="padding: 2rem; color: #6b7280;">
                    <i class="fas fa-tools" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #d1d5db;"></i>
                    <p style="margin: 0;">No hay pedidos pendientes para fabricar</p>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Los pedidos aparecerán aquí cuando estén en estado "Fabricar"</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = pedidosFabrica.map(order => `
        <tr style="background: ${order.estado === 'fabricar' ? '#f0f9ff' : '#ffffff'};">
            <td>${order.numero_pedido}</td>
            <td>${(order.cliente_nombre || '') + ' ' + (order.cliente_apellido || '') || 'N/A'}</td>
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
                <button onclick="markAsProduced(${order.id})" class="btn btn-success" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-left: 0.5rem;" title="Marcar como 'Sale Fábrica'">
                    <i class="fas fa-check"></i> Producido
                </button>
            </td>
        </tr>
    `).join('');
    
    
}

// Función para marcar un pedido como producido (cambiar estado a 'sale fabrica')
async function markAsProduced(orderId) {
    const confirmed = await showConfirm({
        title: 'Confirmar producción',
        message: '¿Confirmás que este pedido está terminado y listo para salir de fábrica?',
        confirmText: 'Confirmar',
        confirmClass: 'btn-primary',
        cancelText: 'Cancelar'
    });
    if (!confirmed) return;
    
    try {
        // Encontrar el pedido en el array local
        const order = orders.find(o => o.id === orderId);
        if (!order) {
            showNotification('Pedido no encontrado', 'error');
            return;
        }
        
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/pedidos/${orderId}/estado`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: 'sale fabrica' })
        });
        
        if (response.ok) {
            showNotification('Pedido marcado como producido exitosamente', 'success');
            
            // OPTIMIZACIÓN: Actualizar solo el pedido modificado en lugar de recargar todo
            await updateSingleOrder(orderId);
            
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error al actualizar el pedido', 'error');
        }
    } catch (error) {
        console.error('❌ Error marcando pedido como producido:', error);
        showNotification('Error al actualizar el estado del pedido', 'error');
    }
}

// Función para configurar el menú del usuario con comportamiento click
function setupUserMenu() {
    
    
    try {
        const userInfo = document.querySelector('.sidebar-user .user-info');
        const userMenu = document.querySelector('.sidebar-user .user-menu');
        
        if (!userInfo || !userMenu) {
            console.error('❌ Elementos del menú del usuario no encontrados');
            return;
        }
        
        // Agregar event listener para click en la información del usuario
        userInfo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle la clase 'show' en el menú
            userMenu.classList.toggle('show');
            
            
        });
        
        // Cerrar el menú al hacer click fuera de él
        document.addEventListener('click', function(e) {
            const sidebarUser = document.querySelector('.sidebar-user');
            
            // Si el click no fue dentro del área del usuario, cerrar el menú
            if (sidebarUser && !sidebarUser.contains(e.target)) {
                userMenu.classList.remove('show');
            }
        });
        
        // Prevenir que el menú se cierre al hacer click dentro de él
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Configurar el botón de preferencias de usuario
        const userPreferencesBtn = document.getElementById('user-preferences');
        if (userPreferencesBtn) {
            userPreferencesBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Cerrar el menú del usuario
                userMenu.classList.remove('show');
                
                
                // Abrir modal de preferencias
                abrirModalPreferencias();
                
                
            });
        }
        
        
        
    } catch (error) {
        console.error('❌ Error configurando menú del usuario:', error);
    }
}

// Función para abrir el modal de preferencias de usuario
function abrirModalPreferencias() {
    
    
    try {
        const modal = document.getElementById('user-config-modal');
        const currentUser = getCurrentUserFromAuth();
        
        if (!modal) {
            console.error('❌ Modal de preferencias no encontrado');
            return;
        }
        
        if (!currentUser) {
            console.error('❌ No se pudo obtener información del usuario actual');
            return;
        }
        
        // Cargar datos del usuario en el formulario
        const nombreInput = document.getElementById('user-config-nombre');
        const emailInput = document.getElementById('user-config-email');
        const perfilInput = document.getElementById('user-config-perfil');
        const temaSelect = document.getElementById('user-theme-select');
        const avatarPreview = document.getElementById('user-avatar-preview');
        
        if (nombreInput) nombreInput.value = currentUser.nombre || '';
        if (emailInput) emailInput.value = currentUser.email || '';
        if (perfilInput) perfilInput.value = currentUser.perfil || '';
        if (temaSelect) temaSelect.value = currentUser.tema || 'light';
        
        // Configurar avatar
        if (avatarPreview) {
            if (currentUser.avatar) {
                avatarPreview.src = currentUser.avatar;
            } else {
                // Generar avatar con iniciales
                const iniciales = currentUser.nombre ? currentUser.nombre.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
                avatarPreview.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(iniciales)}&background=6366f1&color=fff&size=80`;
            }
        }
        
        // Configurar el event listener del formulario si no existe
        const form = document.getElementById('user-config-form');
        if (form && !form.hasAttribute('data-configured')) {
            form.addEventListener('submit', handleUserConfigSubmit);
            form.setAttribute('data-configured', 'true');
        }
        
        // Configurar el selector de tema
        if (temaSelect && !temaSelect.hasAttribute('data-configured')) {
            temaSelect.addEventListener('change', handleThemeChange);
            temaSelect.setAttribute('data-configured', 'true');
        }
        
        // Configurar el input de avatar
        const avatarInput = document.getElementById('user-avatar-input');
        const avatarLabel = document.querySelector('.avatar-label');
        if (avatarInput && avatarLabel && !avatarInput.hasAttribute('data-configured')) {
            avatarLabel.addEventListener('click', () => avatarInput.click());
            avatarInput.addEventListener('change', handleAvatarChange);
            avatarInput.setAttribute('data-configured', 'true');
        }
        
        // Mostrar el modal
        modal.style.display = 'flex';
        modal.classList.add('active');
        
        
        
    } catch (error) {
        console.error('❌ Error abriendo modal de preferencias:', error);
    }
}

// Función para manejar el cambio de tema
function handleThemeChange(e) {
    const tema = e.target.value;
    
    
    try {
        // Aplicar el tema inmediatamente
        if (tema === 'dark') {
            document.body.classList.add('theme-dark');
        } else {
            document.body.classList.remove('theme-dark');
        }
        
        // Guardar en localStorage temporalmente (se guardará permanentemente al enviar el formulario)
        const currentUser = getCurrentUserFromAuth();
        if (currentUser) {
            currentUser.tema = tema;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        
        
    } catch (error) {
        console.error('❌ Error aplicando tema:', error);
    }
}

// Función para manejar el cambio de avatar
function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    
    
    try {
        // Verificar que sea una imagen
        if (!file.type.startsWith('image/')) {
            showNotification('Por favor selecciona un archivo de imagen válido', 'error');
            return;
        }
        
        // Verificar tamaño (máximo 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showNotification('La imagen debe ser menor a 2MB', 'error');
            return;
        }
        
        // Leer la imagen y mostrar preview
        const reader = new FileReader();
        reader.onload = function(event) {
            const avatarPreview = document.getElementById('user-avatar-preview');
            if (avatarPreview) {
                avatarPreview.src = event.target.result;
                
            }
        };
        reader.readAsDataURL(file);
        
    } catch (error) {
        console.error('❌ Error procesando avatar:', error);
        showNotification('Error procesando la imagen', 'error');
    }
}

// Función para manejar el envío del formulario de preferencias
async function handleUserConfigSubmit(e) {
    e.preventDefault();
    
    
    try {
        const currentUser = getCurrentUserFromAuth();
        if (!currentUser) {
            showNotification('Error: No se pudo obtener información del usuario', 'error');
            return;
        }
        
        const formData = new FormData(e.target);
        const nombre = document.getElementById('user-config-nombre').value;
        const email = document.getElementById('user-config-email').value;
        const tema = document.getElementById('user-theme-select').value;
        const avatarPreview = document.getElementById('user-avatar-preview');
        
        // Validaciones básicas
        if (!nombre.trim() || !email.trim()) {
            showNotification('Nombre y email son requeridos', 'error');
            return;
        }
        
        // Preparar datos para enviar al servidor
        const userData = {
            nombre: nombre.trim(),
            email: email.trim(),
            tema: tema
        };
        
        // Si hay un avatar nuevo, incluirlo
        if (avatarPreview && avatarPreview.src.startsWith('data:')) {
            userData.avatar = avatarPreview.src;
        }
        
        // Enviar al servidor (simular por ahora, ya que no tenemos endpoint)
        
        
        // Actualizar localStorage
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Actualizar elementos de la interfaz
        const userNameElement = document.getElementById('current-user-name');
        if (userNameElement) {
            userNameElement.textContent = updatedUser.nombre;
        }
        
        // Aplicar el tema
        if (tema === 'dark') {
            document.body.classList.add('theme-dark');
        } else {
            document.body.classList.remove('theme-dark');
        }
        
        // Cerrar modal
        const modal = document.getElementById('user-config-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
        }
        
        showNotification('Preferencias guardadas correctamente', 'success');
        
        
    } catch (error) {
        console.error('❌ Error guardando preferencias:', error);
        showNotification('Error guardando preferencias', 'error');
    }
}

// Función para configurar el comportamiento de todos los modales
function setupModals() {
    console.log('✅ Configurando modales...');
    
    try {
        // Configurar todos los botones de cerrar modal
        const closeButtons = document.querySelectorAll('.close-modal, .cancel-btn');
        closeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Encontrar el modal padre
                const modal = this.closest('.modal');
                if (modal) {
                    closeModal(modal);
                }
            });
        });
        
        // Configurar cierre al hacer click fuera del modal (en el overlay)
        const modales = document.querySelectorAll('.modal');
        modales.forEach(modal => {
            modal.addEventListener('click', function(e) {
                // Solo cerrar si se hizo click directamente en el modal (overlay), no en su contenido
                if (e.target === this) {
                    closeModal(this);
                    console.log(`✅ Modal ${this.id} cerrado por clic fuera`);
                }
            });
        });
        
        // Configurar tecla Escape para cerrar modales
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modalActivo = document.querySelector('.modal.active, .modal[style*="display: block"], .modal[style*="display:block"]');
                if (modalActivo) {
                    closeModal(modalActivo);
                    console.log(`✅ Modal ${modalActivo.id} cerrado con Escape`);
                }
            }
        });
        
        console.log('✅ Modales configurados correctamente');
        
    } catch (error) {
        console.error('❌ Error configurando modales:', error);
    }
}

// Función para configurar toggle switches de transporte
function setupTransportToggles() {
    console.log('🔧 Configurando toggle switches de transporte...');
    
    try {
        // Configurar toggle para nuevo pedido
        const newOrderToggle = document.getElementById('order-transport-toggle');
        if (newOrderToggle) {
            newOrderToggle.addEventListener('change', function() {
                toggleTransportFields('order-transport-fields', this.checked);
            });
        }
        
        // Configurar toggle para editar pedido
        const editOrderToggle = document.getElementById('edit-order-transport-toggle');
        if (editOrderToggle) {
            editOrderToggle.addEventListener('change', function() {
                toggleTransportFields('edit-order-transport-fields', this.checked);
            });
        }
        
        console.log('✅ Toggle switches de transporte configurados correctamente');
        
    } catch (error) {
        console.error('❌ Error configurando toggle switches de transporte:', error);
    }
}

// Función para mostrar/ocultar campos de transporte
function toggleTransportFields(containerId, show) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (show) {
        container.classList.remove('hidden');
        container.classList.add('visible');
    } else {
        container.classList.remove('visible');
        container.classList.add('hidden');
        
        // Limpiar campos cuando se ocultan
        const inputs = container.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.value = '';
        });
    }
}

// Función para configurar el menú específicamente para usuarios Vendedores
function configurarMenuVendedor() {
    
    
    try {
        // Ocultar la sección de Fábrica para vendedores
        const fabricaNav = document.getElementById('fabrica-nav');
        if (fabricaNav) {
            fabricaNav.style.display = 'none';
            
        } else {
            
        }
        
        
        
    } catch (error) {
        console.error('❌ Error configurando menú para vendedor:', error);
    }
}

// Función para configurar el menú específicamente para Gerentes de ventas
function configurarMenuGerenteVentas() {
    console.log('🔧 Configurando menú para Gerente de ventas...');
    
    try {
        // Array de textos de navegación a ocultar para Gerente de ventas
        const textosAOcultar = [
            'Fábrica',
            'Administrar Perfiles'
        ];
        
        // Obtener todos los elementos de navegación
        const navItems = document.querySelectorAll('.nav-item');
        
        // Ocultar elementos basándose en el texto del span
        navItems.forEach(navItem => {
            const span = navItem.querySelector('span');
            if (span && textosAOcultar.includes(span.textContent.trim())) {
                navItem.style.display = 'none';
                console.log(`✅ Ocultado: ${span.textContent.trim()}`);
            }
        });
        
        // Asegurar que otros elementos importantes estén visibles
        const elementosVisibles = ['dashboard', 'clientes', 'pedidos', 'pagos', 'productos', 'contactos'];
        elementosVisibles.forEach(elementId => {
            const element = document.getElementById(`${elementId}-nav`) || 
                           document.querySelector(`[href="#${elementId}"]`) ||
                           document.querySelector(`.nav-item:has(span:contains("${elementId}"))`);
            if (element) {
                element.style.display = 'block';
            }
        });
        
        console.log('✅ Menú configurado para Gerente de ventas');
        
    } catch (error) {
        console.error('❌ Error configurando menú para Gerente de ventas:', error);
    }
}





// Función para cargar datos de cobros pendientes
async function loadPendingCollections() {
    
    
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('❌ No hay token de autenticación');
            return;
        }

        const response = await fetch('/api/cobros/pendientes', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            // Actualizar monto pendiente
            const pendingAmountElement = document.getElementById('pending-amount');
            if (pendingAmountElement) {
                pendingAmountElement.textContent = formatCurrency(data.pendingAmount);
            }
            
            // Actualizar ratio pedidos vs pagos
            const pendingRatioElement = document.getElementById('pending-ratio');
            if (pendingRatioElement) {
                const ratio = data.totalOrders > 0 ? 
                    ((data.totalPayments / data.totalOrders) * 100).toFixed(1) + '%' : 
                    '0%';
                pendingRatioElement.textContent = ratio;
            }
            
            
            return data;
        } else {
            console.error('❌ Error cargando cobros pendientes:', response.status);
            return { pendingAmount: 0, totalOrders: 0, totalPayments: 0 };
        }
    } catch (error) {
        console.error('❌ Error de conexión cargando cobros pendientes:', error);
        return { pendingAmount: 0, totalOrders: 0, totalPayments: 0 };
    }
}

// Función para configurar los event listeners de las nuevas tarjetas
function setupDashboardCards() {
    
    
    try {
        // Configurar tarjeta de cobros pendientes
        const pendingCollectionsCard = document.getElementById('pending-collections-card');
        if (pendingCollectionsCard) {
            pendingCollectionsCard.addEventListener('click', async function() {
                
                showPendingCollectionsModal();
            });
        }
        
        // Configurar tarjeta de clientes inactivos
        const inactiveClientsCard = document.getElementById('inactive-clients-card');
        if (inactiveClientsCard) {
            inactiveClientsCard.addEventListener('click', async function() {
                
                showInactiveClientsModal();
            });
        }
        
        // Cargar datos iniciales de clientes inactivos
        loadInactiveClients();
        
    } catch (error) {
        console.error('❌ Error configurando tarjetas del dashboard:', error);
    }
}



// Función para mostrar el modal de cobros pendientes
async function showPendingCollectionsModal() {
    
    
    try {
        const modal = document.getElementById('pending-collections-modal');
        const tableBody = document.getElementById('pending-collections-table-body');
        
        if (!modal || !tableBody) {
            console.error('❌ Elementos del modal no encontrados');
            return;
        }
        
        // Limpiar cards móviles anteriores si existen
        const existingCardsContainer = modal.querySelector('.mobile-cards-container');
        if (existingCardsContainer) {
            existingCardsContainer.remove();
        }
        
        // Asegurar que la tabla esté visible
        const table = modal.querySelector('.table-responsive');
        if (table) {
            table.style.display = 'block';
        }
        
        // Cargar datos detallados de cobros pendientes
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('❌ No hay token de autenticación');
            return;
        }

        const response = await fetch('/api/cobros/pendientes/detalle', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            // Actualizar resumen
            document.getElementById('summary-total-orders').textContent = formatCurrency(data.summary.totalOrders);
            document.getElementById('summary-total-payments').textContent = formatCurrency(data.summary.totalPayments);
            document.getElementById('summary-pending-amount').textContent = formatCurrency(data.summary.pendingAmount);
            
            // Limpiar contenido
            tableBody.innerHTML = '';
            
            // Verificar si estamos en móvil
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Crear container para las cards
                const cardsContainer = document.createElement('div');
                cardsContainer.className = 'mobile-cards-container';
                cardsContainer.style.cssText = `
                    display: grid;
                    gap: 1rem;
                    padding: 0.5rem;
                `;
                
                // Ocultar tabla y mostrar cards
                const table = document.querySelector('#pending-collections-modal .table-responsive');
                table.style.display = 'none';
                
                // Crear cards para cada cliente
                data.clients.forEach(client => {
                    const pendingAmount = client.totalOrders - client.totalPayments;
                    
                    // Solo mostrar clientes con saldo pendiente > 0
                    if (pendingAmount > 0) {
                        const card = document.createElement('div');
                        card.className = 'client-card';
                        card.style.cssText = `
                            background: white;
                            border: 1px solid #e5e7eb;
                            border-radius: 12px;
                            padding: 1rem;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            cursor: pointer;
                            transition: all 0.2s ease;
                            border-left: 4px solid #dc2626;
                        `;
                        
                        card.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: #1f2937;">${client.nombre || ''}${client.apellido ? ' ' + client.apellido : ''}</h3>
                                    <p style="margin: 0; font-size: 1.2rem; font-weight: bold; color: #dc2626;">
                                        Debe: ${formatCurrency(pendingAmount)}
                                    </p>
                                </div>
                                <div style="color: #6b7280;">
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        `;
                        
                        // Hacer la card clickeable para abrir ficha del cliente
                        card.addEventListener('click', () => {
                            closeModal('pending-collections-modal');
                            setTimeout(() => {
                                viewClientDetails(client.id).catch(console.error);
                            }, 100);
                        });
                        
                        // Efectos hover/touch
                        card.addEventListener('mouseenter', () => {
                            card.style.transform = 'translateY(-2px)';
                            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                        });
                        
                        card.addEventListener('mouseleave', () => {
                            card.style.transform = 'translateY(0)';
                            card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        });
                        
                        cardsContainer.appendChild(card);
                    }
                });
                
                // Agregar las cards al modal
                const modalBody = document.querySelector('#pending-collections-modal .modal-body');
                modalBody.appendChild(cardsContainer);
                
            } else {
                // Vista de escritorio - tabla normal
                const table = document.querySelector('#pending-collections-modal .table-responsive');
                table.style.display = 'block';
                
                // Llenar tabla con datos de clientes
                data.clients.forEach(client => {
                    const percentagePaid = client.totalOrders > 0 ? 
                        ((client.totalPayments / client.totalOrders) * 100).toFixed(1) : 
                        0;
                    
                    const pendingAmount = client.totalOrders - client.totalPayments;
                    
                    // Solo mostrar clientes con saldo pendiente > 0
                    if (pendingAmount > 0) {
                        const row = document.createElement('tr');
                        
                        row.innerHTML = `
                            <td>${client.nombre || ''}${client.apellido ? ' ' + client.apellido : ''}</td>
                            <td>${client.provincia || '-'}</td>
                            <td>${formatCurrency(client.totalOrders)}</td>
                            <td>${formatCurrency(client.totalPayments)}</td>
                            <td style="color: #dc2626; font-weight: bold;">
                                ${formatCurrency(pendingAmount)}
                            </td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <div style="background: #e5e7eb; border-radius: 10px; height: 8px; flex: 1; overflow: hidden;">
                                        <div style="background: ${percentagePaid >= 80 ? '#059669' : percentagePaid >= 50 ? '#f59e0b' : '#dc2626'}; height: 100%; width: ${percentagePaid}%; transition: width 0.3s;"></div>
                                    </div>
                                    <span style="font-size: 0.8rem; font-weight: 500;">${percentagePaid}%</span>
                                </div>
                            </td>
                            <td>
                                <div style="display: flex; gap: 0.4rem; white-space: nowrap;">
                                    <button class="btn btn-primary" onclick="viewClientDetails(${client.id}).catch(console.error)" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-success" onclick="showModal('new-payment-modal'); populateClientSelects('new-payment-modal'); document.getElementById('payment-client-select').value = ${client.id};" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">
                                        <i class="fas fa-money-bill-wave"></i>
                                    </button>
                                </div>
                            </td>
                        `;
                        
                        tableBody.appendChild(row);
                    }
                });
            }
            
            // Configurar búsqueda
            const searchInput = document.getElementById('pending-collections-search');
            if (searchInput) {
                // Limpiar listeners anteriores
                const newSearchInput = searchInput.cloneNode(true);
                searchInput.parentNode.replaceChild(newSearchInput, searchInput);
                
                newSearchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    
                    if (isMobile) {
                        // Búsqueda en cards móviles
                        const cards = document.querySelectorAll('.client-card');
                        cards.forEach(card => {
                            const clientName = card.querySelector('h3').textContent.toLowerCase();
                            
                            if (clientName.includes(searchTerm)) {
                                card.style.display = '';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    } else {
                        // Búsqueda en tabla de escritorio
                        const rows = tableBody.querySelectorAll('tr');
                        rows.forEach(row => {
                            const clientName = row.cells[0].textContent.toLowerCase();
                            
                            if (clientName.includes(searchTerm)) {
                                row.style.display = '';
                            } else {
                                row.style.display = 'none';
                            }
                        });
                    }
                });
            }
            
            // Mostrar modal
            modal.style.display = 'flex';
            modal.classList.add('active');
            
            
        } else {
            console.error('❌ Error cargando detalles de cobros pendientes:', response.status);
            showNotification('Error al cargar detalles de cobros pendientes', 'error');
        }
    } catch (error) {
        console.error('❌ Error mostrando modal de cobros pendientes:', error);
        showNotification('Error al mostrar detalles de cobros pendientes', 'error');
    }
}

// Función centralizada para cerrar modales
function closeModal(modalId) {
    const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
    if (!modal) {
        console.warn(`⚠️ Modal no encontrado: ${modalId}`);
        return;
    }
    
    try {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        const finishClose = () => {
            modal.style.display = 'none';
            modal.style.zIndex = '';
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) modalContent.style.zIndex = '';

            const form = modal.querySelector('form');
            if (form) form.reset();

            if (modal.id === 'new-order-modal') {
                clearOrderItems();
            } else if (modal.id === 'edit-order-modal') {
                clearEditOrderItems();
            } else if (modal.id === 'pending-collections-modal') {
                const cardsContainer = modal.querySelector('.mobile-cards-container');
                if (cardsContainer) cardsContainer.remove();
                const table = modal.querySelector('.table-responsive');
                if (table) table.style.display = 'block';
            }
        };

        setTimeout(finishClose, 300);
        
        console.log(`✅ Modal ${modal.id} cerrado correctamente`);
    } catch (error) {
        console.error(`❌ Error cerrando modal ${modal.id}:`, error);
    }
}

function clearOrderItems() {
    orderItems = [];
    renderOrderProducts();
    updateOrderTotal();
}

// ============================================
// FUNCIONALIDAD MÓVIL RESPONSIVE MEJORADA
// ============================================

// Función para configurar el menú móvil
function setupMobileMenu() {
    console.log('🔧 Configurando menú móvil...');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    console.log('📱 Elementos encontrados:', {
        menuToggle: !!menuToggle,
        sidebar: !!sidebar,
        overlay: !!overlay
    });
    
    if (!menuToggle || !sidebar || !overlay) {
        console.warn('⚠️ Elementos del menú móvil no encontrados');
        console.log('menuToggle:', menuToggle);
        console.log('sidebar:', sidebar);
        console.log('overlay:', overlay);
        return;
    }
    
    // Función para abrir el menú
    function openMobileMenu() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        // Animar el botón hamburguesa
        menuToggle.style.transform = 'rotate(90deg)';
    }
    
    // Función para cerrar el menú
    function closeMobileMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
        
        // Restaurar el botón hamburguesa
        menuToggle.style.transform = 'rotate(0deg)';
    }
    
    // Event listener para el botón hamburguesa
    menuToggle.addEventListener('click', function(e) {
        console.log('🍔 Click en menú hamburguesa');
        e.preventDefault();
        e.stopPropagation();
        
        if (sidebar.classList.contains('active')) {
            console.log('📱 Cerrando menú móvil');
            closeMobileMenu();
        } else {
            console.log('📱 Abriendo menú móvil');
            openMobileMenu();
        }
    });
    
    // Event listener para el overlay
    overlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
    });
    
    // Cerrar menú al hacer click en un item de navegación (móvil)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setTimeout(() => closeMobileMenu(), 150); // Pequeño delay para UX
            }
        });
    });
    
    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // En desktop, asegurar que el menú esté visible y el overlay oculto
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            menuToggle.style.transform = 'rotate(0deg)';
        }
        
        // Re-renderizar clientes si la sección está activa
        const clientsSection = document.getElementById('clientes-section');
        if (clientsSection && clientsSection.style.display !== 'none') {
            renderClientsTable();
        }
    });
    
    // Manejar gestos de swipe para cerrar el menú
    let startX = 0;
    let startY = 0;
    
    sidebar.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    sidebar.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Si el swipe es hacia la izquierda y es más horizontal que vertical
        if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
            closeMobileMenu();
        }
        
        startX = 0;
        startY = 0;
    });
    
    console.log('✅ Menú móvil configurado correctamente');
}

// Función para hacer las tablas completamente responsive
function setupResponsiveTables() {
    const tables = document.querySelectorAll('.clients-table');
    
    tables.forEach(table => {
        // Agregar scroll horizontal suave
        const tableContainer = table.closest('.table-responsive');
        if (tableContainer) {
            tableContainer.style.overflowX = 'auto';
            tableContainer.style.webkitOverflowScrolling = 'touch';
        }
        
        // Hacer la primera columna sticky en móvil
        if (window.innerWidth <= 768) {
            const firstColumnCells = table.querySelectorAll('th:first-child, td:first-child');
            firstColumnCells.forEach(cell => {
                cell.style.position = 'sticky';
                cell.style.left = '0';
                cell.style.backgroundColor = cell.tagName === 'TH' ? 'var(--secondary-color)' : 'var(--background-white)';
                cell.style.zIndex = '10';
                cell.style.boxShadow = '2px 0 5px rgba(0, 0, 0, 0.1)';
            });
        }
    });
}

// Función para mejorar la experiencia táctil
function setupTouchEnhancements() {
    // Mejorar botones para dispositivos táctiles
    const buttons = document.querySelectorAll('.btn, .btn-icon, .nav-item, .quick-action-btn');
    
    buttons.forEach(button => {
        // Agregar feedback táctil
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Prevenir zoom en inputs en iOS
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.style.fontSize !== '16px') {
            input.style.fontSize = '16px';
        }
    });
}

// Función para optimizar el rendimiento en móviles
function setupMobilePerformance() {
    // Usar passive listeners para mejor rendimiento
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    
    // Optimizar animaciones para móviles
    if (window.innerWidth <= 768) {
        // Reducir animaciones en dispositivos de bajo rendimiento
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
        }
    }
}

// Función para manejar la orientación del dispositivo
function setupOrientationHandling() {
    function handleOrientationChange() {
        // Pequeño delay para que el navegador termine de cambiar la orientación
        setTimeout(() => {
            // Recalcular el viewport height para móviles
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            // Reconfigurar tablas si es necesario
            setupResponsiveTables();
            
            // Si el menú está abierto en landscape, cerrarlo
            if (window.innerWidth > window.innerHeight && window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.querySelector('.sidebar-overlay');
                if (sidebar && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }, 100);
    }
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Ejecutar una vez al cargar
    handleOrientationChange();
}

// Función para mejorar la accesibilidad en móviles
function setupMobileAccessibility() {
    // Agregar labels aria para screen readers
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Mejorar navegación por teclado en móviles
    document.addEventListener('keydown', function(e) {
        // Cerrar menú con Escape
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.focus();
                }
            }
        }
    });
}

// Función principal para inicializar todas las mejoras móviles
function initializeMobileEnhancements() {
    try {
        setupMobileMenu();
        setupResponsiveTables();
        setupTouchEnhancements();
        setupMobilePerformance();
        setupOrientationHandling();
        setupMobileAccessibility();
        
        console.log('✅ Todas las mejoras móviles inicializadas correctamente');
    } catch (error) {
        console.error('❌ Error inicializando mejoras móviles:', error);
    }
}

// Agregar las mejoras móviles al DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mejoras móviles después de un pequeño delay
    setTimeout(() => {
        initializeMobileEnhancements();
    }, 100);
});

// Detectar si es un dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// Aplicar optimizaciones específicas para móviles
if (isMobileDevice()) {
    // Prevenir zoom al hacer doble tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Mejorar el scroll en iOS
    document.body.style.webkitOverflowScrolling = 'touch';
}

// Función para cargar clientes sin actividad reciente
async function loadInactiveClients() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('❌ No hay token de autenticación');
            return;
        }

        const response = await fetch('/api/clientes/inactivos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            // Actualizar el contador en la tarjeta
            const countElement = document.getElementById('inactive-clients-count');
            if (countElement) {
                countElement.textContent = data.length;
            }
            
            return data;
        } else {
            console.error('❌ Error cargando clientes inactivos:', response.status);
            return [];
        }
    } catch (error) {
        console.error('❌ Error de conexión cargando clientes inactivos:', error);
        return [];
    }
}

// Función para diagnosticar clientes inactivos
async function diagnosticarClientesInactivos() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('❌ No hay token de autenticación');
            return;
        }

        console.log('🔍 Ejecutando diagnóstico de clientes inactivos...');
        
        const response = await fetch('/api/debug/clientes-inactivos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('📊 Diagnóstico completo:', data);
            
            // Mostrar resumen en consola
            console.log('📋 RESUMEN DEL DIAGNÓSTICO:');
            console.log(`📊 Total de clientes activos: ${data.summary.totalClients}`);
            console.log(`📊 Clientes con pedidos: ${data.summary.clientsWithOrders}`);
            console.log(`📊 Clientes sin pedidos: ${data.summary.clientsWithoutOrders}`);
            console.log(`📊 Pedidos en los últimos 30 días: ${data.summary.recentOrders}`);
            console.log(`📊 Clientes con pedidos >30 días: ${data.summary.oldOrders}`);
            console.log(`📊 Esperados inactivos: ${data.summary.expectedInactive}`);
            console.log(`📊 Encontrados inactivos: ${data.summary.actualInactive}`);
            
            // Mostrar ejemplos de clientes con pedidos muy antiguos
            console.log('🔍 EJEMPLOS DE CLIENTES CON PEDIDOS MUY ANTIGUOS:');
            data.veryOldOrders.forEach((client, index) => {
                console.log(`${index + 1}. ${client.nombre} - Último pedido: ${client.ultimo_pedido} (${client.dias_sin_actividad} días sin actividad)`);
            });
            
            // Mostrar resultado de la consulta original
            console.log('🔍 RESULTADO DE LA CONSULTA ORIGINAL:');
            data.originalQuery.forEach((client, index) => {
                console.log(`${index + 1}. ${client.nombre} - Último pedido: ${client.ultimo_pedido} (${client.dias_sin_actividad} días sin actividad)`);
            });
            
            // Mostrar alerta con resumen
            const mensaje = `DIAGNÓSTICO COMPLETO:
            
📊 Total clientes activos: ${data.summary.totalClients}
📊 Clientes con pedidos: ${data.summary.clientsWithOrders}
📊 Clientes sin pedidos: ${data.summary.clientsWithoutOrders}
📊 Pedidos últimos 30 días: ${data.summary.recentOrders}
📊 Clientes con pedidos >30 días: ${data.summary.oldOrders}
📊 Esperados inactivos: ${data.summary.expectedInactive}
📊 Encontrados inactivos: ${data.summary.actualInactive}

Revisa la consola para más detalles.`;
            
            alert(mensaje);
            
        } else {
            console.error('❌ Error en diagnóstico:', response.statusText);
            alert('Error al ejecutar el diagnóstico. Revisa la consola.');
        }
    } catch (error) {
        console.error('❌ Error en diagnóstico:', error);
        alert('Error de conexión al ejecutar el diagnóstico.');
    }
}

// Función para mostrar el modal de clientes inactivos
async function showInactiveClientsModal() {
    try {
        const modal = document.getElementById('inactive-clients-modal');
        const tableBody = document.getElementById('inactive-clients-table-body');
        
        if (!modal || !tableBody) {
            console.error('❌ Elementos del modal no encontrados');
            return;
        }
        
        // Mostrar modal con animación slide-in
        await showModal('inactive-clients-modal');

        // Cargar datos
        const clientes = await loadInactiveClients();
        
        // Limpiar tabla
        tableBody.innerHTML = '';
        
        if (clientes.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: #6b7280;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 2rem; margin-bottom: 1rem;"></i>
                        <br>¡Excelente! Todos los clientes han tenido actividad reciente.
                    </td>
                </tr>
            `;
            return;
        }
        
        // Verificar si estamos en móvil
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Crear container para las cards
            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'mobile-cards-container';
            cardsContainer.style.cssText = `
                display: grid;
                gap: 1rem;
                padding: 0.5rem;
            `;
            
            // Ocultar tabla y mostrar cards
            const table = document.querySelector('#inactive-clients-modal .table-responsive');
            table.style.display = 'none';
            
            // Crear cards para cada cliente
            clientes.forEach(cliente => {
                const card = document.createElement('div');
                card.className = 'client-card';
                card.style.cssText = `
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                `;
                
                const ultimoPedido = cliente.ultimo_pedido ? 
                    new Date(cliente.ultimo_pedido).toLocaleDateString('es-ES') : 
                    'Sin pedidos';
                
                const diasSinActividad = cliente.dias_sin_actividad || 
                    Math.floor((new Date() - new Date(cliente.created_at)) / (1000 * 60 * 60 * 24));
                
                const waPhoneM = (cliente.telefono || '').replace(/\D/g, '');
                const waMsgM = encodeURIComponent(`Hola ${cliente.nombre}${cliente.apellido ? ' ' + cliente.apellido : ''}, te contactamos desde MIMI para retomar contacto. ¿Podemos ayudarte con algún pedido?`);
                card.innerHTML = `
                    <div style="margin-bottom: 0.5rem;">
                        <h4 style="margin: 0; color: #1f2937; font-weight: 600;">${cliente.nombre}${cliente.apellido ? ' ' + cliente.apellido : ''}</h4>
                        <div style="font-size: 0.8rem; color: #6b7280;">${cliente.provincia || ''}</div>
                    </div>
                    <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">
                        <div><strong>Último pedido:</strong> ${ultimoPedido}</div>
                        <div><strong>Días sin actividad:</strong> <span style="color: #dc2626; font-weight: 600;">${diasSinActividad}</span></div>
                        <div><strong>Total histórico:</strong> ${formatCurrency(cliente.total_historico)}</div>
                    </div>
                    <div style="font-size: 0.875rem; color: #6b7280;">
                        <div><strong>Teléfono:</strong> ${cliente.telefono || 'No disponible'}</div>
                        <div><strong>Email:</strong> ${cliente.email || 'No disponible'}</div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        ${waPhoneM ? `<a href="https://wa.me/${waPhoneM}?text=${waMsgM}" target="_blank" style="background: #25d366; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.875rem; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fab fa-whatsapp"></i> WhatsApp</a>` : ''}
                        <button onclick="verCliente(${cliente.id})"
                                style="background: #6b7280; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.875rem; cursor: pointer;">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </div>
                `;
                
                cardsContainer.appendChild(card);
            });
            
            modal.querySelector('.modal-body').appendChild(cardsContainer);
        } else {
            // Mostrar tabla para desktop
            const table = document.querySelector('#inactive-clients-modal .table-responsive');
            table.style.display = 'block';
            
            clientes.forEach(cliente => {
                const ultimoPedido = cliente.ultimo_pedido ? 
                    new Date(cliente.ultimo_pedido).toLocaleDateString('es-ES') : 
                    'Sin pedidos';
                
                const diasSinActividad = cliente.dias_sin_actividad || 
                    Math.floor((new Date() - new Date(cliente.created_at)) / (1000 * 60 * 60 * 24));
                
                const row = document.createElement('tr');
                const waPhone = (cliente.telefono || '').replace(/\D/g, '');
                const waMsg = encodeURIComponent(`Hola ${cliente.nombre}${cliente.apellido ? ' ' + cliente.apellido : ''}, te contactamos desde MIMI para retomar contacto. ¿Podemos ayudarte con algún pedido?`);
                row.innerHTML = `
                    <td>
                        <div style="font-weight: 600; color: #1f2937;">${cliente.nombre}${cliente.apellido ? ' ' + cliente.apellido : ''}</div>
                        <div style="font-size: 0.8rem; color: #6b7280;">${cliente.provincia || 'Sin provincia'}</div>
                    </td>
                    <td>${ultimoPedido}</td>
                    <td>
                        <span style="color: #dc2626; font-weight: 600;">${diasSinActividad} días</span>
                    </td>
                    <td>${formatCurrency(cliente.total_historico)}</td>
                    <td>
                        <div style="font-size: 0.875rem;">
                            <div><i class="fas fa-phone"></i> ${cliente.telefono || 'No disponible'}</div>
                            <div><i class="fas fa-envelope"></i> ${cliente.email || 'No disponible'}</div>
                        </div>
                    </td>
                    <td>
                        <div style="display: flex; gap: 0.25rem;">
                            ${waPhone ? `<a href="https://wa.me/${waPhone}?text=${waMsg}" target="_blank" class="btn btn-success" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"><i class="fab fa-whatsapp"></i></a>` : ''}
                            <button onclick="verCliente(${cliente.id})"
                                    class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
        
        // Configurar búsqueda
        const searchInput = document.getElementById('inactive-clients-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const rows = tableBody.querySelectorAll('tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        }
        
    } catch (error) {
        console.error('❌ Error mostrando modal de clientes inactivos:', error);
    }
}

// Función para contactar cliente
function contactarCliente(nombre, telefono, email) {
    let mensaje = `Contactando a ${nombre}\n\n`;
    
    if (telefono && telefono !== 'No disponible') {
        mensaje += `📞 Teléfono: ${telefono}\n`;
    }
    
    if (email && email !== 'No disponible') {
        mensaje += `📧 Email: ${email}\n`;
    }
    
    if (!telefono || telefono === 'No disponible') {
        mensaje += '\n⚠️ No hay teléfono disponible';
    }
    
    if (!email || email === 'No disponible') {
        mensaje += '\n⚠️ No hay email disponible';
    }
    
    alert(mensaje);
}

// Función para ver detalles del cliente
function verCliente(clienteId) {
    // Cerrar modal actual
    const modal = document.getElementById('inactive-clients-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Mostrar detalles del cliente usando la función existente
    viewClientDetails(clienteId).catch(error => {
        console.error('Error mostrando detalles del cliente:', error);
        showNotification('Error al mostrar detalles del cliente', 'error');
    });
}

// ========================================
// GRÁFICO DE VENTAS POR VENDEDOR
// ========================================

let ventasVendedorChart = null;

// Función para inicializar el gráfico de ventas por vendedor
function initializeVentasVendedorChart() {
    const ctx = document.getElementById('ventasVendedorChart');
    if (!ctx) return;
    
    // Configurar fechas por defecto (último mes)
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    document.getElementById('fecha-desde').value = lastMonth.toISOString().split('T')[0];
    document.getElementById('fecha-hasta').value = today.toISOString().split('T')[0];
    
    // Crear gráfico vacío inicial
    ventasVendedorChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Total Ventas ($)',
                data: [],
                backgroundColor: [
                    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
                    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
                ],
                borderColor: [
                    '#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed',
                    '#0891b2', '#65a30d', '#ea580c', '#db2777', '#4f46e5'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Ventas: ${formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
    
    // Configurar eventos
    document.getElementById('cargar-ventas-btn').addEventListener('click', cargarDatosVentas);
    document.getElementById('exportar-ventas-btn').addEventListener('click', exportarDatosVentas);
    
    // Cargar datos iniciales
    cargarDatosVentas();
}

// Filtros rápidos de fecha para ventas por vendedor
function filtroRapidoVentas(periodo) {
    const hoy = new Date();
    let desde, hasta;

    if (periodo === 'mes') {
        desde = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        hasta = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    } else if (periodo === 'mes-pasado') {
        desde = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
        hasta = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
    } else if (periodo === 'año') {
        desde = new Date(hoy.getFullYear(), 0, 1);
        hasta = new Date(hoy.getFullYear(), 11, 31);
    }

    const fmt = d => d.toISOString().split('T')[0];
    document.getElementById('fecha-desde').value = fmt(desde);
    document.getElementById('fecha-hasta').value = fmt(hasta);
    cargarDatosVentas();
}

// Función para cargar datos de ventas por vendedor
async function cargarDatosVentas() {
    try {
        const fechaDesde = document.getElementById('fecha-desde').value;
        const fechaHasta = document.getElementById('fecha-hasta').value;
        
        if (!fechaDesde || !fechaHasta) {
            showNotification('Por favor selecciona un rango de fechas', 'error');
            return;
        }
        
        if (fechaDesde > fechaHasta) {
            showNotification('La fecha desde no puede ser mayor que la fecha hasta', 'error');
            return;
        }
        
        // Mostrar loading
        const btn = document.getElementById('cargar-ventas-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        btn.disabled = true;
        
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/dashboard/ventas-por-vendedor?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar datos');
        }
        
        const data = await response.json();
        
        // Actualizar métricas de resumen
        document.getElementById('total-ventas-chart').textContent = formatCurrency(data.resumen.totalVentas);
        document.getElementById('total-pedidos-chart').textContent = data.resumen.totalPedidos;
        document.getElementById('promedio-pedido-chart').textContent = formatCurrency(data.resumen.promedioGeneral);
        
        // Actualizar gráfico
        actualizarGraficoVentas(data.ventas);
        
        // Actualizar tabla
        actualizarTablaVentas(data.ventas);
        
        showNotification('Datos cargados correctamente', 'success');
        
    } catch (error) {
        console.error('Error cargando datos de ventas:', error);
        showNotification('Error al cargar los datos', 'error');
    } finally {
        // Restaurar botón
        const btn = document.getElementById('cargar-ventas-btn');
        btn.innerHTML = '<i class="fas fa-search"></i> Filtrar';
        btn.disabled = false;
    }
}

// Función para actualizar el gráfico
function actualizarGraficoVentas(ventas) {
    if (!ventasVendedorChart) return;
    
    const labels = ventas.map(v => v.vendedor_nombre);
    const data = ventas.map(v => parseFloat(v.total_ventas));
    
    ventasVendedorChart.data.labels = labels;
    ventasVendedorChart.data.datasets[0].data = data;
    ventasVendedorChart.update();
}

// Función para actualizar la tabla
function actualizarTablaVentas(ventas) {
    const tableBody = document.getElementById('ventas-vendedor-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (ventas.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: #6b7280;">
                    No hay datos de ventas para el período seleccionado
                </td>
            </tr>
        `;
        return;
    }
    
    ventas.forEach(venta => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.innerHTML = `
            <td>
                <div style="font-weight: 600; color: #1f2937;">${venta.vendedor_nombre}</div>
            </td>
            <td style="color: #6b7280;">${venta.vendedor_email}</td>
            <td style="text-align: center; font-weight: 600;">${venta.cantidad_pedidos}</td>
            <td style="font-weight: 600; color: #059669;">${formatCurrency(venta.total_ventas)}</td>
            <td style="color: #6b7280;">${formatCurrency(venta.promedio_por_pedido)}</td>
            <td style="text-align: center;">
                <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">
                    ${venta.porcentaje}%
                </span>
            </td>
            <td style="text-align: center; color: #6b7280;">${parseFloat(venta.comision_porcentaje || 0).toFixed(1)}%</td>
            <td style="font-weight: 600; color: #7c3aed;">${formatCurrency(venta.comision_monto || 0)}</td>
        `;
        
        // Agregar evento click para mostrar pedidos del vendedor
        row.addEventListener('click', () => {
            showVendorOrders(venta.vendedor_nombre, venta.vendedor_email, venta.cantidad_pedidos, venta.total_ventas);
        });
        
        tableBody.appendChild(row);
    });
}

// Función para mostrar pedidos de un vendedor específico
async function showVendorOrders(vendorName, vendorEmail, totalOrders, totalSales) {
    try {
        // Actualizar información del vendedor en el modal
        document.getElementById('vendor-name-display').textContent = vendorName;
        document.getElementById('vendor-email-display').textContent = vendorEmail;
        document.getElementById('vendor-total-orders').textContent = totalOrders;
        document.getElementById('vendor-total-sales').textContent = formatCurrency(totalSales);
        
        // Mostrar el modal
        showModal('vendor-orders-modal');
        
        // Cargar los pedidos del vendedor
        await loadVendorOrders(vendorName);
        
    } catch (error) {
        console.error('Error al mostrar pedidos del vendedor:', error);
        showNotification('Error al cargar los pedidos del vendedor', 'error');
    }
}

// Función para cargar pedidos de un vendedor específico
async function loadVendorOrders(vendorName) {
    try {
        const token = localStorage.getItem('authToken');
        const fechaDesde = document.getElementById('fecha-desde').value;
        const fechaHasta = document.getElementById('fecha-hasta').value;
        
        // Construir URL con parámetros
        let url = `/api/pedidos/vendedor/${encodeURIComponent(vendorName)}`;
        const params = new URLSearchParams();
        
        if (fechaDesde) params.append('fecha_desde', fechaDesde);
        if (fechaHasta) params.append('fecha_hasta', fechaHasta);
        
        if (params.toString()) {
            url += '?' + params.toString();
        }
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const orders = await response.json();
            renderVendorOrders(orders);
        } else {
            throw new Error(`Error del servidor: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Error al cargar pedidos del vendedor:', error);
        showNotification('Error al cargar los pedidos', 'error');
    }
}

// Función para renderizar los pedidos del vendedor
function renderVendorOrders(orders) {
    const tableBody = document.getElementById('vendor-orders-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (orders.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: #6b7280;">
                    No hay pedidos para este vendedor en el período seleccionado
                </td>
            </tr>
        `;
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 600; color: #1f2937;">${order.numero_pedido}</td>
            <td>${order.cliente_nombre} ${order.cliente_apellido}</td>
            <td style="color: #6b7280;">${order.descripcion || 'Sin descripción'}</td>
            <td style="font-weight: 600; color: #059669;">${formatCurrency(order.monto)}</td>
            <td>
                <span class="status-badge status-${order.estado.replace(' ', '-')}">
                    ${order.estado}
                </span>
            </td>
            <td style="color: #6b7280;">${formatDate(order.fecha)}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="viewOrderDetails(${order.id})" class="btn-icon" title="Ver detalles">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="editOrder(${order.id})" class="btn-icon" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para exportar datos de ventas
function exportarDatosVentas() {
    try {
        const table = document.getElementById('ventas-vendedor-table');
        const fechaDesde = document.getElementById('fecha-desde').value;
        const fechaHasta = document.getElementById('fecha-hasta').value;
        
        if (!table) {
            showNotification('No hay datos para exportar', 'error');
            return;
        }
        
        // Crear workbook
        const wb = XLSX.utils.book_new();
        
        // Obtener datos de la tabla
        const wsData = [];
        const headers = ['Vendedor', 'Email', 'Cantidad Pedidos', 'Total Ventas', 'Promedio por Pedido', 'Porcentaje'];
        wsData.push(headers);
        
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const rowData = [];
                cells.forEach(cell => {
                    // Extraer solo el texto, sin HTML
                    rowData.push(cell.textContent.trim());
                });
                wsData.push(rowData);
            }
        });
        
        // Crear worksheet
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        
        // Agregar worksheet al workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Ventas por Vendedor');
        
        // Generar nombre del archivo
        const fileName = `ventas_por_vendedor_${fechaDesde}_${fechaHasta}.xlsx`;
        
        // Descargar archivo
        XLSX.writeFile(wb, fileName);
        
        showNotification('Archivo exportado correctamente', 'success');
        
    } catch (error) {
        console.error('Error exportando datos:', error);
        showNotification('Error al exportar los datos', 'error');
    }
}

