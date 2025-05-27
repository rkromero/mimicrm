// Arrays para almacenar datos
let clients = [
    {
        id: 1,
        name: "Juan Pérez",
        cuit: "20-12345678-9",
        email: "juan@example.com",
        phone: "912345678",
        balance: 150000,
        priceListId: 1
    },
    {
        id: 2,
        name: "María González",
        cuit: "27-98765432-1",
        email: "maria@example.com",
        phone: "987654321",
        balance: 75000,
        priceListId: 2
    },
    {
        id: 3,
        name: "Carlos Rodríguez",
        cuit: "23-45678912-3",
        email: "carlos@example.com",
        phone: "945678123",
        balance: 250000,
        priceListId: 1
    },
    {
        id: 4,
        name: "Ana Martínez",
        cuit: "27-78912345-6",
        email: "ana@example.com",
        phone: "978912345",
        balance: 50000,
        priceListId: 2
    },
    {
        id: 5,
        name: "Pedro Sánchez",
        cuit: "20-32165498-7",
        email: "pedro@example.com",
        phone: "932165498",
        balance: 180000,
        priceListId: 1
    }
];

let orders = [
    {
        id: 1,
        orderNumber: "0003568",
        clientId: 1,
        items: [
            { productId: 1, quantity: 10, price: 15000 },
            { productId: 2, quantity: 1000, price: 500 }
        ],
        amount: 165000,
        description: "Pedido de materiales de construcción",
        date: new Date('2024-01-15'),
        status: "active"
    },
    {
        id: 2,
        orderNumber: "0003569",
        clientId: 2,
        items: [
            { productId: 3, quantity: 2, price: 25000 },
            { productId: 4, quantity: 5, price: 8000 }
        ],
        amount: 90000,
        description: "Pedido de herramientas eléctricas",
        date: new Date('2024-02-01'),
        status: "active"
    }
];

let payments = [
    {
        id: 1,
        clientId: 1,
        orderId: 1,
        amount: 50000,
        method: "transferencia",
        reference: "TRF-001",
        date: new Date('2024-01-20')
    },
    {
        id: 2,
        clientId: 2,
        orderId: 2,
        amount: 25000,
        method: "efectivo",
        reference: "EFE-001",
        date: new Date('2024-02-05')
    },
    {
        id: 3,
        clientId: 3,
        orderId: 3,
        amount: 100000,
        method: "tarjeta",
        reference: "TAR-001",
        date: new Date('2024-02-20')
    },
    {
        id: 4,
        clientId: 1,
        orderId: 1,
        amount: 50000,
        method: "transferencia",
        reference: "TRF-002",
        date: new Date('2024-02-25')
    },
    {
        id: 5,
        clientId: 4,
        orderId: 5,
        amount: 40000,
        method: "efectivo",
        reference: "EFE-002",
        date: new Date('2024-03-12')
    },
    {
        id: 6,
        clientId: 5,
        orderId: 6,
        amount: 90000,
        method: "transferencia",
        reference: "TRF-003",
        date: new Date('2024-03-18')
    }
];

let products = [
    {
        id: 1,
        name: "Cemento Portland",
        description: "Cemento de alta resistencia para construcción",
        price: 15000
    },
    {
        id: 2,
        name: "Ladrillos Cerámicos",
        description: "Ladrillos huecos 12x18x33",
        price: 500
    },
    {
        id: 3,
        name: "Arena Fina",
        description: "Arena fina para revoque, por m³",
        price: 25000
    },
    {
        id: 4,
        name: "Hierro 8mm",
        description: "Hierro nervado para construcción, barra 12m",
        price: 8000
    },
    {
        id: 5,
        name: "Membrana Asfáltica",
        description: "Membrana con aluminio 40kg x 10m",
        price: 45000
    }
];

// Array para almacenar los contactos
let contacts = [];

// Array para almacenar las listas de precios
let priceLists = [];

// Función para cargar las listas de precios
function loadPriceLists() {
    // Aquí normalmente cargaríamos los datos desde un backend
    // Por ahora usaremos datos de ejemplo
    priceLists = [
        {
            id: 1,
            name: "Lista General",
            description: "Precios generales para todos los clientes",
            discount: 0,
            created_at: new Date('2024-01-01').toISOString(),
            updated_at: new Date('2024-01-01').toISOString()
        },
        {
            id: 2,
            name: "Lista Mayoristas",
            description: "Precios especiales para mayoristas",
            discount: 15,
            created_at: new Date('2024-01-15').toISOString(),
            updated_at: new Date('2024-01-15').toISOString()
        }
    ];
    renderPriceListsTable();
}

// Listado de provincias y localidades de Argentina
const provinciasYLocalidades = {
    'Buenos Aires': {
        ciudades: ['La Plata', 'Mar del Plata', 'Bahia Blanca', 'Tandil', 'Pergamino', 'Quilmes', 'Avellaneda', 'San Nicolas', 'Tigre', 'Moron', 'Lomas de Zamora', 'San Isidro', 'Vicente Lopez', 'Tres de Febrero', 'Lanus', 'General Pueyrredon', 'San Martin', 'Florencio Varela', 'Berazategui', 'Almirante Brown'],
        localidades: {
            'La Plata': ['Centro', 'Gonnet', 'City Bell', 'Los Hornos', 'Tolosa'],
            'Mar del Plata': ['Centro', 'La Perla', 'Playa Grande', 'Playa Chica', 'Centro Norte'],
            'Bahia Blanca': ['Centro', 'Ingeniero White', 'Villa Mitre', 'Villa Rosas', 'Villa Harding Green']
        }
    },
    'Ciudad Autonoma de Buenos Aires': {
        ciudades: ['Buenos Aires'],
        localidades: {
            'Buenos Aires': ['Retiro', 'San Nicolas', 'Monserrat', 'Puerto Madero', 'San Telmo', 'La Boca', 'Barracas', 'Constitucion', 'San Cristobal', 'Balvanera', 'Almagro', 'Boedo', 'Caballito', 'Flores', 'Floresta', 'Velez Sarsfield', 'Villa Luro', 'Villa Santa Rita', 'Villa del Parque', 'Villa Devoto', 'Villa Pueyrredon', 'Villa Urquiza', 'Coghlan', 'Saavedra', 'Villa Ortuzar', 'Chacarita', 'Colegiales', 'Palermo', 'Recoleta', 'Recoleta Norte', 'Belgrano', 'Nunez', 'Colegiales', 'Las Canitas', 'Palermo Chico', 'Palermo Soho', 'Palermo Hollywood', 'Palermo Viejo']
        }
    },
    'Catamarca': {
        ciudades: ['San Fernando del Valle de Catamarca', 'Andalgala', 'Belen', 'Santa Maria', 'Tinogasta'],
        localidades: {
            'San Fernando del Valle de Catamarca': ['Centro', 'Villa Cubas', 'Choya', 'El Pantanillo']
        }
    },
    'Chaco': {
        ciudades: ['Resistencia', 'Presidencia Roque Saenz Pena', 'Villa Angela', 'Charata', 'General San Martin'],
        localidades: {
            'Resistencia': ['Centro', 'Don Bosco', 'Villa San Juan', 'Villa San Martin']
        }
    },
    'Chubut': {
        ciudades: ['Rawson', 'Comodoro Rivadavia', 'Puerto Madryn', 'Trelew', 'Esquel'],
        localidades: {
            'Rawson': ['Centro', 'Playa Union', 'Puerto Rawson']
        }
    },
    'Cordoba': {
        ciudades: ['Cordoba', 'Villa Maria', 'Rio Cuarto', 'San Francisco', 'Villa Carlos Paz', 'Alta Gracia'],
        localidades: {
            'Cordoba': ['Centro', 'Nueva Cordoba', 'Güemes', 'Alberdi', 'Cerro de las Rosas']
        }
    },
    'Corrientes': {
        ciudades: ['Corrientes', 'Goya', 'Mercedes', 'Paso de los Libres', 'Bella Vista'],
        localidades: {
            'Corrientes': ['Centro', 'Camba Cua', 'Laguna Seca', 'Pago Largo']
        }
    },
    'Entre Rios': {
        ciudades: ['Parana', 'Concordia', 'Gualeguaychu', 'Concepcion del Uruguay', 'Villaguay'],
        localidades: {
            'Parana': ['Centro', 'San Martin', 'Villa Urquiza', 'Villa Elisa']
        }
    },
    'Formosa': {
        ciudades: ['Formosa', 'Clorinda', 'Pirane', 'El Colorado', 'Las Lomitas'],
        localidades: {
            'Formosa': ['Centro', 'San Francisco', 'Villa del Carmen']
        }
    },
    'Jujuy': {
        ciudades: ['San Salvador de Jujuy', 'Palpala', 'Libertador General San Martin', 'Perico', 'La Quiaca'],
        localidades: {
            'San Salvador de Jujuy': ['Centro', 'Alto Comedero', 'Los Perales']
        }
    },
    'La Pampa': {
        ciudades: ['Santa Rosa', 'General Pico', 'Toay', 'Realico', 'General Acha'],
        localidades: {
            'Santa Rosa': ['Centro', 'Villa Germinal', 'Villa Parque']
        }
    },
    'La Rioja': {
        ciudades: ['La Rioja', 'Chilecito', 'Aimogasta', 'Chamical', 'Chepes'],
        localidades: {
            'La Rioja': ['Centro', 'Villa San Nicolas', 'Villa Parque']
        }
    },
    'Mendoza': {
        ciudades: ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Guaymallen', 'Lujan de Cuyo'],
        localidades: {
            'Mendoza': ['Centro', 'Quinta Seccion', 'Primera Seccion', 'Segunda Seccion']
        }
    },
    'Misiones': {
        ciudades: ['Posadas', 'Obera', 'Eldorado', 'Puerto Iguazu', 'Apostoles'],
        localidades: {
            'Posadas': ['Centro', 'Villa Cabello', 'Itaembé Guazú']
        }
    },
    'Neuquen': {
        ciudades: ['Neuquen', 'Cutral Co', 'Plottier', 'Zapala', 'Centenario'],
        localidades: {
            'Neuquen': ['Centro', 'Confluencia', 'Villa Maria']
        }
    },
    'Rio Negro': {
        ciudades: ['Viedma', 'Bariloche', 'General Roca', 'Cipolletti', 'Villa Regina'],
        localidades: {
            'Viedma': ['Centro', 'Villa del Mar', 'Villa Ojo de Agua']
        }
    },
    'Salta': {
        ciudades: ['Salta', 'San Ramon de la Nueva Oran', 'Tartagal', 'General Guemes', 'Metan'],
        localidades: {
            'Salta': ['Centro', 'Villa San Lorenzo', 'Cerro San Bernardo']
        }
    },
    'San Juan': {
        ciudades: ['San Juan', 'Rawson', 'Chimbas', 'Rivadavia', 'Pocito'],
        localidades: {
            'San Juan': ['Centro', 'Villa Krause', 'Villa Paula']
        }
    },
    'San Luis': {
        ciudades: ['San Luis', 'Villa Mercedes', 'Merlo', 'La Punta', 'Justo Daract'],
        localidades: {
            'San Luis': ['Centro', 'Villa Mercedes', 'La Punta']
        }
    },
    'Santa Cruz': {
        ciudades: ['Rio Gallegos', 'Caleta Olivia', 'El Calafate', 'Pico Truncado', 'Puerto Deseado'],
        localidades: {
            'Rio Gallegos': ['Centro', 'Villa Maria', 'Villa Obrera']
        }
    },
    'Santa Fe': {
        ciudades: ['Santa Fe', 'Rosario', 'Rafaela', 'Venado Tuerto', 'Reconquista'],
        localidades: {
            'Santa Fe': ['Centro', 'Villa del Parque', 'Villa Guadalupe']
        }
    },
    'Santiago del Estero': {
        ciudades: ['Santiago del Estero', 'La Banda', 'Termas de Rio Hondo', 'Anatuya', 'Fernandez'],
        localidades: {
            'Santiago del Estero': ['Centro', 'Villa Ojo de Agua', 'Villa San Martin']
        }
    },
    'Tierra del Fuego': {
        ciudades: ['Ushuaia', 'Rio Grande', 'Tolhuin'],
        localidades: {
            'Ushuaia': ['Centro', 'Villa Las Cotorras', 'Villa Herminita']
        }
    },
    'Tucuman': {
        ciudades: ['San Miguel de Tucuman', 'Tafi Viejo', 'Yerba Buena', 'Concepcion', 'Aguilares'],
        localidades: {
            'San Miguel de Tucuman': ['Centro', 'Villa 9 de Julio', 'Villa Lujan']
        }
    }
};

// Función para actualizar las ciudades según la provincia seleccionada
function actualizarCiudades(provincia, selectId = 'client-city-input') {
    const ciudadSelect = document.getElementById(selectId);
    if (!ciudadSelect) return;
    
    ciudadSelect.innerHTML = '<option value="">Seleccione una ciudad</option>';
    
    if (provincia && provinciasYLocalidades[provincia]) {
        provinciasYLocalidades[provincia].ciudades.forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad;
            option.textContent = ciudad;
            ciudadSelect.appendChild(option);
        });
    }
}

// Función para actualizar las localidades según la ciudad seleccionada
function actualizarLocalidades(provincia, ciudad, selectId = 'client-locality-input') {
    const localidadSelect = document.getElementById(selectId);
    if (!localidadSelect) return;
    
    localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
    
    if (provincia && ciudad && provinciasYLocalidades[provincia] && provinciasYLocalidades[provincia].localidades[ciudad]) {
        provinciasYLocalidades[provincia].localidades[ciudad].forEach(localidad => {
            const option = document.createElement('option');
            option.value = localidad;
            option.textContent = localidad;
            localidadSelect.appendChild(option);
        });
    }
}

// Actualizar saldos de clientes basados en pedidos y pagos
clients.forEach(client => {
    const clientOrders = orders.filter(order => order.clientId === client.id);
    const clientPayments = payments.filter(payment => payment.clientId === client.id);
    
    const totalOrders = clientOrders.reduce((sum, order) => sum + order.amount, 0);
    const totalPayments = clientPayments.reduce((sum, payment) => sum + payment.amount, 0);
    
    client.balance = totalOrders - totalPayments;
});

// Elementos del DOM
const newClientBtn = document.getElementById('new-client-btn');
const newOrderBtn = document.getElementById('new-order-btn');
const newPaymentBtn = document.getElementById('new-payment-btn');
const addOrderBtn = document.getElementById('add-order-btn');
const addPaymentBtn = document.getElementById('add-payment-btn');
const clientSearch = document.getElementById('client-search');
const clientsList = document.getElementById('clients-list');
const clientDetails = document.getElementById('client-details');
const transactionsList = document.getElementById('transactions-list');

// Modales
const newClientModal = document.getElementById('new-client-modal');
const newOrderModal = document.getElementById('new-order-modal');
const newPaymentModal = document.getElementById('new-payment-modal');

// Formularios
const newClientForm = document.getElementById('new-client-form');
const newPaymentForm = document.getElementById('new-payment-form');

// Variable para almacenar el cliente seleccionado
let selectedClientId = null;

// Variables para el menú
const toggleMenuBtn = document.getElementById('toggle-menu');
const sidebarMenu = document.getElementById('sidebar-menu');
const mainContent = document.getElementById('main-content');

// Funciones auxiliares
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-CL').format(new Date(date));
}

// Función para mostrar/ocultar modales
function showModal(modalOrType, clientId = null) {
    let modal;
    
    // Si es una string, determinar qué tipo de modal crear
    if (typeof modalOrType === 'string') {
        switch(modalOrType) {
            case 'newPayment':
                modal = createNewPaymentModal();
                break;
            default:
                console.error('Tipo de modal no reconocido');
                return;
        }
    } else {
        modal = modalOrType;
    }

    if (!modal) {
        console.error('No se pudo crear el modal');
        return;
    }

    if (clientId) {
        const client = clients.find(c => c.id === clientId);
        if (client && modal.id === 'new-payment-modal') {
            const clientSelect = document.getElementById('payment-client-select');
            if (clientSelect) {
                clientSelect.value = clientId;
                clientSelect.disabled = true;
            }
            
            const clientInfo = document.createElement('div');
            clientInfo.className = 'mb-4';
            clientInfo.innerHTML = `
                <div class="badge badge-success">
                    <i class="fas fa-user"></i> Registrando pago para: ${client.name}
                </div>
            `;
            
            const form = modal.querySelector('form');
            if (form && form.firstChild) {
                form.insertBefore(clientInfo, form.firstChild);
            }
        }
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    const clientInfo = modal.querySelector('.badge');
    if (clientInfo) {
        clientInfo.remove();
    }
    
    const clientSelect = modal.querySelector('select[id$="-client-select"]');
    if (clientSelect) {
        clientSelect.disabled = false;
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Funciones para el menú
function toggleMenu() {
    sidebarMenu.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

// Funciones para mostrar la lista de clientes
function showClientsList() {
    showClientsDetails();
}

// Función para mostrar detalles del cliente
function showClientDetails(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const clientOrders = orders.filter(order => order.clientId === clientId);
    const clientPayments = payments.filter(payment => payment.clientId === clientId);
    const clientContacts = contacts.filter(contact => contact.clientId === clientId);

    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showClientsList()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Detalles del Cliente</h1>
            </div>
            <div class="flex items-center gap-2">
                <button class="btn btn-primary" onclick="showNewOrderModal(${clientId})">
                    <i class="fas fa-shopping-cart"></i> Nuevo Pedido
                </button>
                <button class="btn btn-primary" onclick="showModal('newPayment', ${clientId})">
                    <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                </button>
                <button class="btn btn-primary" onclick="showNewContactModal(${clientId})">
                    <i class="fas fa-user-plus"></i> Nuevo Contacto
                </button>
            </div>
        </header>
        
        <div class="page-content">
            <div class="table-container mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h2>Información del Cliente</h2>
                    <button class="btn btn-secondary" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </div>
                <table>
                    <tr>
                        <th>Nombre</th>
                        <td>${client.name}</td>
                    </tr>
                    <tr>
                        <th>Documento</th>
                        <td>${client.cuit}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${client.email}</td>
                    </tr>
                    <tr>
                        <th>Teléfono</th>
                        <td>${client.phone}</td>
                    </tr>
                    <tr>
                        <th>Dirección de Entrega</th>
                        <td>${client.address || '-'}</td>
                    </tr>
                    <tr>
                        <th>Provincia</th>
                        <td>${client.province || '-'}</td>
                    </tr>
                    <tr>
                        <th>Localidad</th>
                        <td>${client.city || '-'}</td>
                    </tr>
                    <tr>
                        <th>Código Postal</th>
                        <td>${client.zip || '-'}</td>
                    </tr>
                    <tr>
                        <th>Saldo</th>
                        <td>${formatCurrency(client.balance)}</td>
                    </tr>
                </table>
            </div>

            <div class="table-container mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h2>Contactos</h2>
                    <button class="btn btn-primary" onclick="showNewContactModal(${clientId})">
                        <i class="fas fa-user-plus"></i> Nuevo Contacto
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Cargo</th>
                            <th>Departamento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clientContacts.map(contact => `
                            <tr>
                                <td>${contact.name}</td>
                                <td>${contact.email}</td>
                                <td>${contact.phone}</td>
                                <td>${contact.position}</td>
                                <td>${contact.department}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="editContact(${contact.id})">
                                        <i class="fas fa-edit"></i> Editar
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="table-container mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h2>Pedidos</h2>
                    <button class="btn btn-primary" onclick="showNewOrderModal(${clientId})">
                        <i class="fas fa-plus"></i> Crear Pedido
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>N° Pedido</th>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clientOrders.map(order => `
                            <tr>
                                <td>${order.orderNumber}</td>
                                <td>${order.date.toLocaleDateString()}</td>
                                <td>${order.description}</td>
                                <td>${formatCurrency(order.amount)}</td>
                                <td>${( () => { const badge = getOrderStatusBadge(order.status); return `<span class=\"${badge.cls}\">${badge.text}</span>`; })()}</td>
                                <td>
                                    <div class="flex gap-2">
                                        <button class="btn btn-secondary" onclick="printOrder(${order.id})">
                                            <i class="fas fa-print"></i> Imprimir
                                        </button>
                                        <button class="btn btn-primary" onclick="editOrder(${order.id})">
                                            <i class="fas fa-edit"></i> Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Pagos</h2>
                    <button class="btn btn-primary" onclick="showModal('newPayment', ${clientId})">
                        <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Método</th>
                            <th>Referencia</th>
                            <th>Monto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clientPayments.map(payment => `
                            <tr>
                                <td>${payment.date.toLocaleDateString()}</td>
                                <td>${payment.method}</td>
                                <td>${payment.reference}</td>
                                <td>${formatCurrency(payment.amount)}</td>
                                <td>
                                    <div class="flex gap-2">
                                        <button class="btn btn-secondary" onclick="editPayment(${payment.id})">
                                            <i class="fas fa-edit"></i> Editar
                                        </button>
                                        <button class="btn btn-danger" onclick="deletePayment(${payment.id})">
                                            <i class="fas fa-trash"></i> Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Función para generar el extracto de impresión
function generatePrintStatement(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const clientTransactions = [
        ...orders
            .filter(o => o.clientId === clientId)
            .map(order => ({
                type: 'order',
                date: order.date,
                amount: order.amount,
                description: order.description
            })),
        ...payments
            .filter(p => p.clientId === clientId)
            .map(payment => ({
                type: 'payment',
                date: payment.date,
                amount: payment.amount,
                description: `Pago - ${payment.method} (${payment.reference})`
            }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const printStatement = document.createElement('div');
    printStatement.className = 'print-statement';
    
    printStatement.innerHTML = `
        <div class="print-header">
            <h1>Extracto de Cuenta</h1>
            <p>Fecha: ${formatDate(new Date())}</p>
        </div>
        
        <div class="print-client-info">
            <h2>Datos del Cliente</h2>
            <p><strong>Nombre:</strong> ${client.name}</p>
            <p><strong>CUIT/CUIL:</strong> ${client.cuit}</p>
            <p><strong>Email:</strong> ${client.email}</p>
            <p><strong>Teléfono:</strong> ${client.phone}</p>
            <p><strong>Saldo Actual:</strong> ${formatCurrency(client.balance)}</p>
        </div>
        
        <div class="print-transactions">
            <h2>Historial de Transacciones</h2>
            ${clientTransactions.map(transaction => `
                <div class="print-transaction-item">
                    <div>
                        <strong>${formatDate(transaction.date)}</strong><br>
                        ${transaction.description}
                    </div>
                    <div class="${transaction.type === 'payment' ? 'credit' : 'debit'}">
                        ${transaction.type === 'payment' ? '+' : '-'}${formatCurrency(transaction.amount)}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="print-total">
            Saldo Final: ${formatCurrency(client.balance)}
        </div>
    `;

    // Agregar el extracto al documento
    document.body.appendChild(printStatement);
    
    // Imprimir
    window.print();
    
    // Remover el extracto después de imprimir
    setTimeout(() => {
        printStatement.remove();
    }, 1000);
}

function updateDashboard() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;

    // Calcular saldo total por cobrar (solo saldos positivos)
    const totalDebt = clients.reduce((total, client) => {
        return total + (client.balance > 0 ? client.balance : 0);
    }, 0);

    // Calcular cantidad total de clientes
    const totalClients = clients.length;

    // Calcular clientes con pedidos en los últimos 30 días
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const clientsWithRecentOrders = clients.filter(client => {
        const clientOrders = orders.filter(order => order.clientId === client.id);
        return clientOrders.some(order => new Date(order.date) >= thirtyDaysAgo);
    }).length;

    // Calcular clientes con diferencia > 30 días entre último pedido y pago
    const clientsWithDelayedPayments = clients.filter(client => {
        const clientOrders = orders.filter(order => order.clientId === client.id);
        const clientPayments = payments.filter(payment => payment.clientId === client.id);
        
        if (clientOrders.length === 0 || clientPayments.length === 0) return false;
        
        const lastOrder = new Date(Math.max(...clientOrders.map(order => new Date(order.date))));
        const lastPayment = new Date(Math.max(...clientPayments.map(payment => new Date(payment.date))));
        
        const diffDays = Math.floor((lastOrder - lastPayment) / (1000 * 60 * 60 * 24));
        return diffDays > 30;
    }).length;

    dashboardContent.innerHTML = `
        <div class="dashboard-grid">
            <div class="dashboard-card" onclick="showDebtDetails()">
                <div class="dashboard-card-header">
                    <div class="dashboard-card-icon warning">
                        <i class="fas fa-money-bill-wave"></i>
                    </div>
                    <div class="dashboard-card-title">Saldo Total por Cobrar</div>
                </div>
                <div class="dashboard-card-value">${formatCurrency(totalDebt)}</div>
                <div class="dashboard-card-footer">
                    <span>Click para ver detalles</span>
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
            
            <div class="dashboard-card" onclick="showClientsDetails()">
                <div class="dashboard-card-header">
                    <div class="dashboard-card-icon primary">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="dashboard-card-title">Total de Clientes</div>
                </div>
                <div class="dashboard-card-value">${totalClients}</div>
                <div class="dashboard-card-footer">
                    <span>Click para ver detalles</span>
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
            
            <div class="dashboard-card" onclick="showRecentOrdersDetails()">
                <div class="dashboard-card-header">
                    <div class="dashboard-card-icon success">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="dashboard-card-title">Clientes con Pedidos Recientes</div>
                </div>
                <div class="dashboard-card-value">${clientsWithRecentOrders}</div>
                <div class="dashboard-card-footer">
                    <span>Click para ver detalles</span>
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
            
            <div class="dashboard-card" onclick="showDelayedPaymentsDetails()">
                <div class="dashboard-card-header">
                    <div class="dashboard-card-icon error">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="dashboard-card-title">Clientes con Pagos Atrasados</div>
                </div>
                <div class="dashboard-card-value">${clientsWithDelayedPayments}</div>
                <div class="dashboard-card-footer">
                    <span>Click para ver detalles</span>
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    `;
}

// Funciones para mostrar detalles de cada indicador
function showDebtDetails() {
    const mainContent = document.querySelector('.main-content');
    const clientsWithDebt = clients.filter(client => client.balance > 0)
        .sort((a, b) => b.balance - a.balance);

    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showDashboard()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Detalle de Saldos por Cobrar</h1>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Documento</th>
                            <th>Saldo</th>
                            <th>Último Pedido</th>
                            <th>Último Pago</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clientsWithDebt.map(client => {
                            const clientOrders = orders.filter(order => order.clientId === client.id);
                            const clientPayments = payments.filter(payment => payment.clientId === client.id);
                            const lastOrder = clientOrders.length > 0 
                                ? new Date(Math.max(...clientOrders.map(order => new Date(order.date))))
                                : null;
                            const lastPayment = clientPayments.length > 0
                                ? new Date(Math.max(...clientPayments.map(payment => new Date(payment.date))))
                                : null;
                            
                            return `
                                <tr>
                                    <td>${client.name}</td>
                                    <td>${client.cuit}</td>
                                    <td>${formatCurrency(client.balance)}</td>
                                    <td>${lastOrder ? lastOrder.toLocaleDateString() : 'Sin pedidos'}</td>
                                    <td>${lastPayment ? lastPayment.toLocaleDateString() : 'Sin pagos'}</td>
                                    <td>
                                        <button class="btn btn-secondary" onclick="showClientDetails(${client.id})">
                                            <i class="fas fa-eye"></i> Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function showClientsDetails() {
    const mainContent = document.querySelector('.main-content');
    const sortedClients = [...getVisibleClientes()].sort((a, b) => a.name.localeCompare(b.name));

    mainContent.innerHTML = `
        <header class="header flex justify-between items-center">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showDashboard()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Listado de Clientes</h1>
            </div>
            <div class="flex items-center gap-2">
                <button class="btn btn-success" onclick="downloadClientsExcel()">
                    <i class="fas fa-file-excel"></i> Descargar Excel
                </button>
                <button class="btn btn-primary" id="new-client-btn">
                    <i class="fas fa-user-plus"></i> Nuevo Cliente
                </button>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Listado de Clientes</h2>
                    <div class="flex gap-2">
                        <input type="text" class="input" placeholder="Buscar cliente..." id="clients-search">
                    </div>
                </div>
                <table>
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
                        ${sortedClients.map(client => `
                            <tr>
                                <td>${client.name}</td>
                                <td>${client.cuit}</td>
                                <td>${client.email}</td>
                                <td>${client.phone}</td>
                                <td>${formatCurrency(client.balance)}</td>
                                <td>
                                    <div class="flex gap-2">
                                        <button class="btn btn-secondary" onclick="showClientDetails(${client.id})">
                                            <i class="fas fa-eye"></i> Ver Detalles
                                        </button>
                                        <button class="btn btn-primary" onclick="showModal('newPayment', ${client.id})">
                                            <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Event listener para la búsqueda
    const clientsSearch = document.getElementById('clients-search');
    if (clientsSearch) {
        clientsSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredClients = clients.filter(client => 
                client.name.toLowerCase().includes(searchTerm) ||
                client.cuit.toLowerCase().includes(searchTerm) ||
                client.email.toLowerCase().includes(searchTerm)
            );
            
            const clientsTable = document.querySelector('.table-container table tbody');
            if (clientsTable) {
                clientsTable.innerHTML = filteredClients.map(client => `
                    <tr>
                        <td>${client.name}</td>
                        <td>${client.cuit}</td>
                        <td>${client.email}</td>
                        <td>${client.phone}</td>
                        <td>${formatCurrency(client.balance)}</td>
                        <td>
                            <div class="flex gap-2">
                                <button class="btn btn-secondary" onclick="showClientDetails(${client.id})">
                                    <i class="fas fa-eye"></i> Ver Detalles
                                </button>
                                <button class="btn btn-primary" onclick="showModal('newPayment', ${client.id})">
                                    <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
        });
    }

    // Event listener para el botón de nuevo cliente
    const newClientBtn = document.getElementById('new-client-btn');
    if (newClientBtn) {
        newClientBtn.addEventListener('click', () => {
            // Siempre crear un nuevo modal fresco
            const modal = createNewClientModal();
            showModal(modal);
        });
    }
}

function showRecentOrdersDetails() {
    const mainContent = document.querySelector('.main-content');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const clientsWithRecentOrders = clients.filter(client => {
        const clientOrders = orders.filter(order => order.clientId === client.id);
        return clientOrders.some(order => new Date(order.date) >= thirtyDaysAgo);
    });

    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showDashboard()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Clientes con Pedidos Recientes</h1>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Listado de Pedidos Recientes</h2>
                    <div class="flex gap-2">
                        <input type="text" class="input" placeholder="Buscar pedido..." id="recent-orders-search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>N° Pedido</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Productos</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clientsWithRecentOrders.map(client => {
                            const clientOrders = orders.filter(order => order.clientId === client.id)
                                .sort((a, b) => new Date(b.date) - new Date(a.date));
                            const lastOrder = clientOrders[0];
                            
                            return `
                                <tr>
                                    <td>${lastOrder.orderNumber}</td>
                                    <td>${new Date(lastOrder.date).toLocaleDateString()}</td>
                                    <td>${client.name}</td>
                                    <td>${lastOrder.items.map(item => `${item.productId} (${item.quantity})`).join(', ')}</td>
                                    <td>${formatCurrency(lastOrder.amount)}</td>
                                    <td>${( () => { const badge = getOrderStatusBadge(lastOrder.status); return `<span class=\"${badge.cls}\">${badge.text}</span>`; })()}</td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-secondary" onclick="showClientDetails(${client.id})">
                                                <i class="fas fa-eye"></i> Ver Detalles
                                            </button>
                                            <button class="btn btn-primary" onclick="showModal(newPaymentModal, ${client.id})">
                                                <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Event listener para la búsqueda
    const recentOrdersSearch = document.getElementById('recent-orders-search');
    if (recentOrdersSearch) {
        recentOrdersSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredOrders = orders.filter(order => {
                const client = clients.find(c => c.id === order.clientId);
                return (
                    client?.name.toLowerCase().includes(searchTerm) ||
                    order.description.toLowerCase().includes(searchTerm) ||
                    order.amount.toString().includes(searchTerm)
                );
            });

            const recentOrdersTable = document.querySelector('#recent-orders-list tbody');
            if (recentOrdersTable) {
                recentOrdersTable.innerHTML = filteredOrders.map(order => {
                    const client = clients.find(c => c.id === order.clientId);
                    return `
                        <tr>
                            <td>${order.orderNumber}</td>
                            <td>${new Date(order.date).toLocaleDateString()}</td>
                            <td>${client ? client.name : 'Cliente no encontrado'}</td>
                            <td>${order.description}</td>
                            <td>${formatCurrency(order.amount)}</td>
                            <td>${( () => { const badge = getOrderStatusBadge(order.status); return `<span class=\"${badge.cls}\">${badge.text}</span>`; })()}</td>
                            <td>
                                <div class="flex gap-2">
                                    <button class="btn btn-secondary" onclick="showClientDetails(${order.clientId})">
                                        <i class="fas fa-eye"></i> Ver Detalles
                                    </button>
                                    <button class="btn btn-primary" onclick="showModal(newPaymentModal, ${order.clientId})">
                                        <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        });
    }
}

function showDelayedPaymentsDetails() {
    const mainContent = document.querySelector('.main-content');
    
    const clientsWithDelayedPayments = clients.filter(client => {
        const clientOrders = orders.filter(order => order.clientId === client.id);
        const clientPayments = payments.filter(payment => payment.clientId === client.id);
        
        if (clientOrders.length === 0 || clientPayments.length === 0) return false;
        
        const lastOrder = new Date(Math.max(...clientOrders.map(order => new Date(order.date))));
        const lastPayment = new Date(Math.max(...clientPayments.map(payment => new Date(payment.date))));
        
        const diffDays = Math.floor((lastOrder - lastPayment) / (1000 * 60 * 60 * 24));
        return diffDays > 30;
    });

    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showDashboard()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Clientes con Pagos Atrasados</h1>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Listado de Clientes con Pagos Atrasados</h2>
                    <div class="flex gap-2">
                        <input type="text" class="input" placeholder="Buscar cliente..." id="delayed-payments-search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Último Pedido</th>
                            <th>Último Pago</th>
                            <th>Días de Atraso</th>
                            <th>Saldo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clientsWithDelayedPayments.map(client => {
                            const clientOrders = orders.filter(order => order.clientId === client.id);
                            const clientPayments = payments.filter(payment => payment.clientId === client.id);
                            
                            const lastOrder = new Date(Math.max(...clientOrders.map(order => new Date(order.date))));
                            const lastPayment = new Date(Math.max(...clientPayments.map(payment => new Date(payment.date))));
                            const diffDays = Math.floor((lastOrder - lastPayment) / (1000 * 60 * 60 * 24));
                            
                            return `
                                <tr>
                                    <td>${client.name}</td>
                                    <td>${client.cuit}</td>
                                    <td>${lastOrder.toLocaleDateString()}</td>
                                    <td>${lastPayment.toLocaleDateString()}</td>
                                    <td>${diffDays} días</td>
                                    <td>${formatCurrency(client.balance)}</td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-secondary" onclick="showClientDetails(${client.id})">
                                                <i class="fas fa-eye"></i> Ver Detalles
                                            </button>
                                            <button class="btn btn-primary" onclick="showModal(newPaymentModal, ${client.id})">
                                                <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Event listener para la búsqueda
    const delayedPaymentsSearch = document.getElementById('delayed-payments-search');
    if (delayedPaymentsSearch) {
        delayedPaymentsSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredClients = clients.filter(client => 
                client.name.toLowerCase().includes(searchTerm) ||
                client.cuit.toLowerCase().includes(searchTerm) ||
                client.email.toLowerCase().includes(searchTerm)
            );
            
            const delayedPaymentsTable = document.querySelector('#delayed-payments-list tbody');
            if (delayedPaymentsTable) {
                delayedPaymentsTable.innerHTML = filteredClients.map(client => `
                    <tr>
                        <td>${client.name}</td>
                        <td>${client.cuit}</td>
                        <td>${client.email}</td>
                        <td>${client.phone}</td>
                        <td>${formatCurrency(client.balance)}</td>
                        <td>
                            <div class="flex gap-2">
                                <button class="btn btn-secondary" onclick="showClientDetails(${client.id})">
                                    <i class="fas fa-eye"></i> Ver Detalles
                                </button>
                                <button class="btn btn-primary" onclick="showModal(newPaymentModal, ${client.id})">
                                    <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
        });
    }
}

function showAllOrders() {
    const mainContent = document.querySelector('.main-content');
    const sortedOrders = [...getVisiblePedidos()].sort((a, b) => new Date(b.date) - new Date(a.date));

    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showDashboard()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Listado de Pedidos</h1>
            </div>
            <div class="flex items-center gap-2">
                <button class="btn btn-success" onclick="downloadOrdersExcel()">
                    <i class="fas fa-file-excel"></i> Descargar Excel
                </button>
                <button id="new-order-btn" class="btn btn-primary">
                    <i class="fas fa-shopping-cart"></i> Nuevo Pedido
                </button>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Todos los Pedidos</h2>
                    <div class="flex gap-2 items-center">
                        <input type="text" class="input" placeholder="Buscar pedido..." id="orders-search">
                        <select id="order-status-filter" class="input">
                            <option value="all">Todos los estados</option>
                            <option value="active">Activos</option>
                            <option value="completed">Finalizados</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>N° Pedido</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Productos</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedOrders.map(order => {
                            const client = clients.find(c => c.id === order.clientId);
                            const orderProducts = order.items.map(item => {
                                const product = products.find(p => p.id === item.productId);
                                return product ? `${product.name} (${item.quantity})` : 'Producto no encontrado';
                            }).join(', ');
                            return `
                                <tr>
                                    <td>${order.orderNumber}</td>
                                    <td>${new Date(order.date).toLocaleDateString()}</td>
                                    <td>${client ? client.name : 'Cliente no encontrado'}</td>
                                    <td>${orderProducts}</td>
                                    <td>${formatCurrency(order.amount)}</td>
                                    <td>${( () => { const badge = getOrderStatusBadge(order.status); return `<span class=\"${badge.cls}\">${badge.text}</span>`; })()}</td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-secondary" onclick="showOrderDetails(${order.id})" title="Ver Detalles">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary" onclick="editOrder(${order.id})" title="Editar Pedido">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-secondary" onclick="printOrder(${order.id})" title="Imprimir Pedido">
                                                <i class="fas fa-print"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Reconectar event listeners
    const newOrderBtn = document.getElementById('new-order-btn');
    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', () => {
            const modal = createNewOrderModal();
            showModal(modal);
        });
    }

    // Event listener para la búsqueda y filtro
    const ordersSearch = document.getElementById('orders-search');
    const statusFilter = document.getElementById('order-status-filter');

    function updateOrdersTable() {
        const searchTerm = ordersSearch.value.toLowerCase();
        const statusValue = statusFilter.value;

        const filteredOrders = orders.filter(order => {
            const client = clients.find(c => c.id === order.clientId);
            const matchesSearch = (
                client?.name.toLowerCase().includes(searchTerm) ||
                order.description.toLowerCase().includes(searchTerm) ||
                order.amount.toString().includes(searchTerm)
            );
            const matchesStatus = statusValue === 'all' || order.status === statusValue;
            return matchesSearch && matchesStatus;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        const ordersTable = document.querySelector('table tbody');
        if (ordersTable) {
            ordersTable.innerHTML = filteredOrders.map(order => {
                const client = clients.find(c => c.id === order.clientId);
                return `
                    <tr>
                        <td>${order.orderNumber}</td>
                        <td>${new Date(order.date).toLocaleDateString()}</td>
                        <td>${client ? client.name : 'Cliente no encontrado'}</td>
                        <td>${order.description}</td>
                        <td>${formatCurrency(order.amount)}</td>
                        <td>${( () => { const badge = getOrderStatusBadge(order.status); return `<span class=\"${badge.cls}\">${badge.text}</span>`; })()}</td>
                        <td>
                            <div class="flex gap-2">
                                <button class="btn btn-secondary" onclick="showClientDetails(${order.clientId})">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-primary" onclick="showModal(newPaymentModal, ${order.clientId})">
                                    <i class="fas fa-money-bill-wave"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    if (ordersSearch) {
        ordersSearch.addEventListener('input', updateOrdersTable);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', updateOrdersTable);
    }
}

// Agregar nueva función para mostrar detalles del pedido
function showOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const client = clients.find(c => c.id === order.clientId);

    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showAllOrders()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Detalles del Pedido #${order.orderNumber}</h1>
            </div>
            <div class="flex items-center gap-2">
                <button class="btn btn-primary" onclick="editOrder(${order.id})">
                    <i class="fas fa-edit"></i> Editar Pedido
                </button>
                <button class="btn btn-secondary" onclick="printOrder(${order.id})">
                    <i class="fas fa-print"></i> Imprimir
                </button>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container mb-4">
                <h2>Información del Pedido</h2>
                <table>
                    <tr>
                        <th>N° Pedido</th>
                        <td>${order.orderNumber}</td>
                    </tr>
                    <tr>
                        <th>Fecha</th>
                        <td>${new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>Estado</th>
                        <td>${( () => { const badge = getOrderStatusBadge(order.status); return `<span class=\"${badge.cls}\">${badge.text}</span>`; })()}</td>
                    </tr>
                    <tr>
                        <th>Descripción</th>
                        <td>${order.description}</td>
                    </tr>
                </table>
            </div>

            <div class="table-container mb-4">
                <h2>Información del Cliente</h2>
                <table>
                    <tr>
                        <th>Nombre</th>
                        <td>${client ? client.name : 'Cliente no encontrado'}</td>
                    </tr>
                    <tr>
                        <th>Documento</th>
                        <td>${client ? client.cuit : '-'}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${client ? client.email : '-'}</td>
                    </tr>
                    <tr>
                        <th>Teléfono</th>
                        <td>${client ? client.phone : '-'}</td>
                    </tr>
                </table>
            </div>

            <div class="table-container">
                <h2>Productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => {
                            const product = products.find(p => p.id === item.productId);
                            return `
                                <tr>
                                    <td>${product ? product.name : 'Producto no encontrado'}</td>
                                    <td>${item.quantity}</td>
                                    <td>${formatCurrency(item.price)}</td>
                                    <td>${formatCurrency(item.price * item.quantity)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="3" class="text-right">Total:</th>
                            <td class="font-bold">${formatCurrency(order.amount)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
}

function showAllPayments() {
    const mainContent = document.querySelector('.main-content');
    const sortedPayments = [...getVisiblePagos()].sort((a, b) => new Date(b.date) - new Date(a.date));

    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showDashboard()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Listado de Pagos</h1>
            </div>
            <div class="flex items-center gap-2">
                <button class="btn btn-success" onclick="downloadPaymentsExcel()">
                    <i class="fas fa-file-excel"></i> Descargar Excel
                </button>
                <button id="new-payment-btn" class="btn btn-primary" onclick="showModal('newPayment')">
                    <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                </button>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Todos los Pagos</h2>
                    <div class="flex gap-2">
                        <input type="text" class="input" placeholder="Buscar pago..." id="payments-search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Método</th>
                            <th>Referencia</th>
                            <th>Monto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedPayments.map(payment => {
                            const client = clients.find(c => c.id === payment.clientId);
                            return `
                                <tr>
                                    <td>${new Date(payment.date).toLocaleDateString()}</td>
                                    <td>${client ? client.name : 'Cliente no encontrado'}</td>
                                    <td>${payment.method}</td>
                                    <td>${payment.reference}</td>
                                    <td>${formatCurrency(payment.amount)}</td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-secondary" onclick="showClientDetails(${payment.clientId})">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary" onclick="editPayment(${payment.id})">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Reconectar event listeners
    const newPaymentBtn = document.getElementById('new-payment-btn');
    if (newPaymentBtn) {
        newPaymentBtn.addEventListener('click', () => showModal('newPayment'));
    }

    // Event listener para la búsqueda
    const paymentsSearch = document.getElementById('payments-search');
    if (paymentsSearch) {
        paymentsSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredPayments = payments.filter(payment => {
                const client = clients.find(c => c.id === payment.clientId);
                return (
                    client?.name.toLowerCase().includes(searchTerm) ||
                    payment.method.toLowerCase().includes(searchTerm) ||
                    payment.reference.toLowerCase().includes(searchTerm) ||
                    payment.amount.toString().includes(searchTerm)
                );
            });

            const paymentsTable = document.querySelector('table tbody');
            if (paymentsTable) {
                paymentsTable.innerHTML = filteredPayments.map(payment => {
                    const client = clients.find(c => c.id === payment.clientId);
                    return `
                        <tr>
                            <td>${new Date(payment.date).toLocaleDateString()}</td>
                            <td>${client ? client.name : 'Cliente no encontrado'}</td>
                            <td>${payment.method}</td>
                            <td>${payment.reference}</td>
                            <td>${formatCurrency(payment.amount)}</td>
                            <td>
                                <div class="flex gap-2">
                                    <button class="btn btn-secondary" onclick="showClientDetails(${payment.clientId})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-primary" onclick="editPayment(${payment.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        });
    }
}

function showDashboard() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <h1>Dashboard</h1>
            </div>
            <div class="flex items-center gap-2">
                <button id="new-client-btn" class="btn btn-primary">
                    <i class="fas fa-user-plus"></i> Nuevo Cliente
                </button>
                <button id="new-order-btn" class="btn btn-primary">
                    <i class="fas fa-shopping-cart"></i> Nuevo Pedido
                </button>
                <button id="new-payment-btn" class="btn btn-primary">
                    <i class="fas fa-money-bill-wave"></i> Nuevo Pago
                </button>
            </div>
        </header>
        <div class="page-content">
            <div id="dashboard-content"></div>
        </div>
    `;
    
    // Reconectar event listeners para los botones
    const newClientBtn = document.getElementById('new-client-btn');
    const newOrderBtn = document.getElementById('new-order-btn');
    const newPaymentBtn = document.getElementById('new-payment-btn');
    
    if (newClientBtn) newClientBtn.addEventListener('click', () => showModal(newClientModal));
    if (newOrderBtn) newOrderBtn.addEventListener('click', () => {
        const modal = createNewOrderModal();
        showModal(modal);
    });
    if (newPaymentBtn) newPaymentBtn.addEventListener('click', () => showModal('newPayment'));
    
    updateDashboard();
}

// Crear el modal de nuevo cliente
function createNewClientModal() {
    const modalHtml = `
        <div class="modal" id="new-client-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Nuevo Cliente</h2>
                    <button class="close-modal btn btn-secondary">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="new-client-form">
                    <div class="mb-4">
                        <label for="client-name-input">Nombre Completo</label>
                        <input type="text" id="client-name-input" class="input" required>
                    </div>
                    <div class="mb-4">
                        <label for="client-rut-input">Documento</label>
                        <input type="text" id="client-rut-input" class="input" required>
                    </div>
                    <div class="mb-4">
                        <label for="client-email-input">Email</label>
                        <input type="email" id="client-email-input" class="input" required>
                    </div>
                    <div class="mb-4">
                        <label for="client-phone-input">Teléfono</label>
                        <input type="tel" id="client-phone-input" class="input" required>
                    </div>
                    <div class="mb-4">
                        <label for="client-address-input">Dirección de Entrega</label>
                        <input type="text" id="client-address-input" class="input" required>
                    </div>
                    <div class="mb-4">
                        <label for="client-province-input">Provincia</label>
                        <select id="client-province-input" class="input" required>
                            <option value="">Seleccione una provincia</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="Ciudad Autonoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
                            <option value="Catamarca">Catamarca</option>
                            <option value="Chaco">Chaco</option>
                            <option value="Chubut">Chubut</option>
                            <option value="Cordoba">Córdoba</option>
                            <option value="Corrientes">Corrientes</option>
                            <option value="Entre Rios">Entre Ríos</option>
                            <option value="Formosa">Formosa</option>
                            <option value="Jujuy">Jujuy</option>
                            <option value="La Pampa">La Pampa</option>
                            <option value="La Rioja">La Rioja</option>
                            <option value="Mendoza">Mendoza</option>
                            <option value="Misiones">Misiones</option>
                            <option value="Neuquen">Neuquén</option>
                            <option value="Rio Negro">Río Negro</option>
                            <option value="Salta">Salta</option>
                            <option value="San Juan">San Juan</option>
                            <option value="San Luis">San Luis</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="Santiago del Estero">Santiago del Estero</option>
                            <option value="Tierra del Fuego">Tierra del Fuego</option>
                            <option value="Tucuman">Tucumán</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="client-city-input">Ciudad</label>
                        <select id="client-city-input" class="input">
                            <option value="">Seleccione una ciudad</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="client-locality-input">Localidad</label>
                        <select id="client-locality-input" class="input">
                            <option value="">Seleccione una localidad</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="client-zip-input">Código Postal</label>
                        <input type="text" id="client-zip-input" class="input" required>
                    </div>
                    <div class="flex justify-between">
                        <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Eliminar el modal existente si hay uno
    const existingModal = document.getElementById('new-client-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Agregar el nuevo modal al documento
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Configurar el formulario después de crearlo
    const newClientForm = document.getElementById('new-client-form');
    if (newClientForm) {
        newClientForm.addEventListener('submit', handleNewClientSubmit);
    }

    // Agregar event listeners para cerrar el modal
    const modal = document.getElementById('new-client-modal');
    if (modal) {
        // Cerrar al hacer clic en la X
        const closeButton = modal.querySelector('.modal-header .close-modal');
        if (closeButton) {
            closeButton.addEventListener('click', () => hideModal(modal));
        }

        // Cerrar al hacer clic en el botón Cancelar
        const cancelButton = modal.querySelector('.flex .close-modal');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => hideModal(modal));
        }

        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    }
    return modal;
}

// Función para manejar el envío del formulario de nuevo cliente
function handleNewClientSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('client-name-input');
    const cuitInput = document.getElementById('client-rut-input');
    const emailInput = document.getElementById('client-email-input');
    const phoneInput = document.getElementById('client-phone-input');
    
    // Verificar que todos los elementos existan
    if (!nameInput || !cuitInput || !emailInput || !phoneInput) {
        showNotification('Error: No se encontraron todos los campos del formulario', 'error');
        return;
    }

    // Validar que todos los campos estén completos
    if (!nameInput.value || !cuitInput.value || !emailInput.value || !phoneInput.value) {
        showNotification('Por favor complete todos los campos', 'error');
        return;
    }

    // Validar que el documento no esté duplicado
    const documentExists = clients.some(client => client.cuit.toLowerCase() === cuitInput.value.toLowerCase());
    if (documentExists) {
        showNotification('Ya existe un cliente con este documento', 'error');
        return;
    }
    
    const currentUser = getCurrentUser();
    const newClient = {
        id: clients.length + 1,
        name: nameInput.value.trim(),
        cuit: cuitInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        balance: 0,
        creadoPor: currentUser ? currentUser.id : null
    };
    
    clients.push(newClient);
    updateClientSelect('order-client-select');
    updateClientSelect('payment-client-select');
    showClientsList();
    // Cerrar el modal de nuevo cliente correctamente
    const modal = document.getElementById('new-client-modal');
    if (modal) hideModal(modal);
    // Limpiar el formulario
    newClientForm.reset();
    // Mostrar notificación de éxito
    showNotification('Cliente agregado correctamente', 'success');
}

function updateClientSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    // Limpiar opciones existentes
    select.innerHTML = '<option value="">Seleccione un cliente</option>';

    // Agregar clientes ordenados alfabéticamente
    const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name));
    sortedClients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = `${client.name} (${client.cuit})`;
        select.appendChild(option);
    });
}

// Función para generar el siguiente número de pedido
function generateNextOrderNumber() {
    const lastOrder = orders.reduce((max, order) => {
        const currentNumber = parseInt(order.orderNumber);
        return currentNumber > max ? currentNumber : max;
    }, 3567);
    return (lastOrder + 1).toString().padStart(7, '0');
}

function createNewOrderModal() {
    // Eliminar modal existente si hay uno
    const existingModal = document.getElementById('new-order-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modalHtml = `
        <div class="modal" id="new-order-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Nuevo Pedido</h2>
                    <button class="close-modal btn btn-secondary">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="new-order-form">
                    <div class="mb-4">
                        <label for="order-client-select">Cliente</label>
                        <select id="order-client-select" class="input" required>
                            <option value="">Seleccione un cliente</option>
                            ${getVisibleClientes().map(client => `
                                <option value="${client.id}">${client.name} (${client.cuit})</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="mb-4">
                        <label>Productos</label>
                        <div id="order-products" class="border rounded p-4">
                            <div id="product-list">
                                <!-- Los items de productos se agregarán aquí dinámicamente -->
                            </div>
                            <button type="button" class="btn btn-secondary mt-2" id="add-product-btn">
                                <i class="fas fa-plus"></i> Agregar Producto
                            </button>
                        </div>
                    </div>
                    <div class="mb-4">
                        <div class="flex justify-between items-center">
                            <label class="font-bold">Total del Pedido:</label>
                            <div class="text-xl font-bold" id="order-total">$0</div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="order-description">Descripción</label>
                        <textarea id="order-description" class="input" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="order-status">Estado</label>
                        <select id="order-status" class="input" required>
                            <option value="pendiente" selected>Pendiente de pago</option>
                            <option value="preparar">Preparar pedido</option>
                            <option value="fabrica">Sale de fabrica</option>
                            <option value="entregado">Entregado</option>
                            <option value="completado">Completado</option>
                        </select>
                    </div>
                    <div class="flex justify-between">
                        <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = document.getElementById('new-order-modal');
    const form = document.getElementById('new-order-form');
    const addProductBtn = document.getElementById('add-product-btn');
    const productList = document.getElementById('product-list');
    const orderTotal = document.getElementById('order-total');

    // Función para agregar una nueva línea de producto
    function addProductLine() {
        const productLine = document.createElement('div');
        productLine.className = 'flex gap-2 items-center mb-2 product-line';
        productLine.innerHTML = `
            <div class="flex-1">
                <select class="input w-full product-select" required>
                    <option value="">Seleccione un producto</option>
                    ${products.map(product => `
                        <option value="${product.id}" 
                                data-price="${product.price}"
                                data-name="${product.name}">
                            ${product.name} - ${formatCurrency(product.price)}
                        </option>
                    `).join('')}
                </select>
            </div>
            <div class="w-32">
                <input type="number" class="input w-full product-quantity" 
                       min="1" value="1" required placeholder="Cantidad">
            </div>
            <div class="w-32">
                <input type="number" class="input w-full product-price" 
                       min="0" step="0.01" required placeholder="Precio">
            </div>
            <div class="w-32 text-right product-subtotal font-bold">
                ${formatCurrency(0)}
            </div>
            <button type="button" class="btn btn-danger remove-product" title="Eliminar producto">
                <i class="fas fa-trash"></i>
            </button>
        `;

        productList.appendChild(productLine);

        // Event listeners para la línea de producto
        const select = productLine.querySelector('.product-select');
        const quantity = productLine.querySelector('.product-quantity');
        const price = productLine.querySelector('.product-price');
        const subtotal = productLine.querySelector('.product-subtotal');
        const removeBtn = productLine.querySelector('.remove-product');

        // Inicializar el precio cuando se selecciona un producto
        select.addEventListener('change', () => {
            const selectedOption = select.selectedOptions[0];
            if (selectedOption && selectedOption.value) {
                price.value = parseFloat(selectedOption.dataset.price);
                updateSubtotal();
            }
        });

        function updateSubtotal() {
            const selectedOption = select.selectedOptions[0];
            if (selectedOption && selectedOption.value) {
                const priceValue = parseFloat(price.value) || 0;
                const qty = parseInt(quantity.value) || 0;
                const total = priceValue * qty;
                subtotal.textContent = formatCurrency(total);
                updateOrderTotal();
            }
        }

        select.addEventListener('change', updateSubtotal);
        quantity.addEventListener('input', updateSubtotal);
        price.addEventListener('input', updateSubtotal);
        quantity.addEventListener('change', () => {
            if (parseInt(quantity.value) < 1) {
                quantity.value = 1;
            }
            updateSubtotal();
        });

        removeBtn.addEventListener('click', () => {
            if (productList.children.length > 1) {
                productLine.remove();
                updateOrderTotal();
            } else {
                showNotification('Debe haber al menos un producto en el pedido', 'error');
            }
        });

        // Trigger initial price set and update
        const event = new Event('change');
        select.dispatchEvent(event);
    }

    // Función para actualizar el total del pedido
    function updateOrderTotal() {
        const productLines = Array.from(productList.children);
        let total = 0;
        productLines.forEach(line => {
            const select = line.querySelector('.product-select');
            const quantityInput = line.querySelector('.product-quantity');
            const priceInput = line.querySelector('.product-price');
            if (select && quantityInput && priceInput && select.value) {
                const price = parseFloat(priceInput.value) || 0;
                const qty = parseInt(quantityInput.value) || 0;
                total += price * qty;
            }
        });
        orderTotal.textContent = formatCurrency(total);
    }

    // Event listeners
    addProductBtn.addEventListener('click', addProductLine);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientId = parseInt(document.getElementById('order-client-select').value);
        const description = document.getElementById('order-description').value;
        const productLines = Array.from(productList.children);
        
        // Validar que haya al menos un producto seleccionado
        const validProductLines = productLines.filter(line => {
            const select = line.querySelector('.product-select');
            return select.value !== '';
        });

        if (validProductLines.length === 0) {
            showNotification('Debe seleccionar al menos un producto', 'error');
            return;
        }
        
        const items = validProductLines.map(line => {
            const select = line.querySelector('.product-select');
            const quantity = line.querySelector('.product-quantity');
            const price = line.querySelector('.product-price');
            
            return {
                productId: parseInt(select.value),
                quantity: parseInt(quantity.value),
                price: parseFloat(price.value)
            };
        });

        const amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const status = document.getElementById('order-status').value;

        const newOrder = {
            id: orders.length + 1,
            orderNumber: generateNextOrderNumber(),
            clientId,
            items,
            amount,
            description,
            date: new Date(),
            status: status
        };

        orders.push(newOrder);
        
        // Actualizar saldo del cliente
        const client = clients.find(c => c.id === newOrder.clientId);
        if (client) {
            client.balance += newOrder.amount;
        }

        hideModal(modal);
        showNotification('Pedido registrado correctamente', 'success');
        
        if (document.querySelector('.page-content')) {
            showClientDetails(newOrder.clientId);
        } else {
            showClientsList();
        }
    });

    modal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => hideModal(modal));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    });

    // Agregar primera línea de producto por defecto
    addProductLine();

    return modal;
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover la notificación después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la vista de clientes
    showDashboard();
    
    // Actualizar selectores de clientes
    updateClientSelect('order-client-select');
    updateClientSelect('payment-client-select');
    
    // Event listeners para los botones de cerrar modales
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            hideModal(modal);
        });
    });
    
    // Event listeners para los botones de nuevo
    newClientBtn.addEventListener('click', () => {
        // Siempre crear un nuevo modal fresco
        const modal = createNewClientModal();
        showModal(modal);
    });
    newOrderBtn.addEventListener('click', () => {
        const modal = createNewOrderModal();
        showModal(modal);
    });
    newPaymentBtn.addEventListener('click', () => showModal('newPayment'));
    
    // Event listeners para los formularios
    newClientForm.addEventListener('submit', handleNewClientSubmit);
    newPaymentForm.addEventListener('submit', handleNewPaymentSubmit);
    
    // Event listener para la búsqueda de clientes
    const clientSearch = document.getElementById('client-list-search');
    if (clientSearch) {
        clientSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredClients = clients.filter(client => 
                client.name.toLowerCase().includes(searchTerm) ||
                client.cuit.toLowerCase().includes(searchTerm) ||
                client.email.toLowerCase().includes(searchTerm)
            );
            
            const clientsTable = document.querySelector('#clients-list table tbody');
            if (clientsTable) {
                clientsTable.innerHTML = filteredClients.map(client => `
                    <tr>
                        <td>${client.name}</td>
                        <td>${client.cuit}</td>
                        <td>${client.email}</td>
                        <td>${client.phone}</td>
                        <td>${formatCurrency(client.balance)}</td>
                        <td>
                            <div class="flex gap-2">
                                <button class="btn btn-secondary" onclick="showClientDetails(${client.id})">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-primary" onclick="showModal(newPaymentModal, ${client.id})">
                                    <i class="fas fa-money-bill-wave"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
        });
    }

    // Cerrar modales al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });

    // Navegación del menú lateral
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // ...código...
            const section = item.querySelector('span').textContent.trim().toLowerCase();
            switch(section) {
                case 'dashboard':
                    showDashboard();
                    break;
                case 'clientes':
                    showClientsDetails();
                    break;
                case 'pedidos':
                    showAllOrders();
                    break;
                case 'pagos':
                    showAllPayments();
                    break;
                case 'productos':
                    showProducts();
                    break;
                case 'contactos':
                    showContacts();
                    break;
                case 'lista de precios':
                    showPriceListsSection();
                    break;
            }
        });
    });

    // Event listener para el botón de contactos
    const contactsNavItem = document.querySelector('.nav-item[data-section="contactos"]');
    if (contactsNavItem) {
        contactsNavItem.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            contactsNavItem.classList.add('active');
            showContacts();
        });
    }

    // Listener para provincia en creación de cliente
    const provinciaInput = document.getElementById('client-province-input');
    if (provinciaInput) {
        provinciaInput.addEventListener('change', (e) => {
            actualizarCiudades(e.target.value, 'client-city-input');
            // Limpiar localidad cuando cambia la provincia
            const localidadSelect = document.getElementById('client-locality-input');
            if (localidadSelect) {
                localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
            }
        });
    }

    // Listener para ciudad en creación de cliente
    const ciudadInput = document.getElementById('client-city-input');
    if (ciudadInput) {
        ciudadInput.addEventListener('change', (e) => {
            const provincia = document.getElementById('client-province-input').value;
            actualizarLocalidades(provincia, e.target.value, 'client-locality-input');
        });
    }

    // Listener para provincia en edición de cliente
    const editProvinciaInput = document.getElementById('edit-client-province');
    if (editProvinciaInput) {
        editProvinciaInput.addEventListener('change', (e) => {
            actualizarCiudades(e.target.value, 'edit-client-city');
            // Limpiar localidad cuando cambia la provincia
            const localidadSelect = document.getElementById('edit-client-locality');
            if (localidadSelect) {
                localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
            }
        });
    }

    // Listener para ciudad en edición de cliente
    const editCiudadInput = document.getElementById('edit-client-city');
    if (editCiudadInput) {
        editCiudadInput.addEventListener('change', (e) => {
            const provincia = document.getElementById('edit-client-province').value;
            actualizarLocalidades(provincia, e.target.value, 'edit-client-locality');
        });
    }

    // Event listener para el botón de nuevo contacto
    setTimeout(() => {
        const newContactBtn = document.getElementById('new-contact-btn');
        if (newContactBtn) {
            newContactBtn.onclick = () => {
                showNewContactModal();
            };
        }
    }, 0);
});

// Función para editar un pago
function editPayment(paymentId) {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;

    // Formatear la fecha para el input date
    const fechaPago = new Date(payment.date);
    const fechaFormateada = fechaPago.toISOString().split('T')[0];

    // Crear modal de edición
    const editModal = document.createElement('div');
    editModal.className = 'modal';
    editModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Editar Pago</h2>
                <button class="close-modal btn btn-secondary">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-payment-form">
                <div class="mb-4">
                    <label for="edit-payment-amount">Monto</label>
                    <input type="number" id="edit-payment-amount" class="input" value="${payment.amount}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-payment-date">Fecha de Pago</label>
                    <input type="date" id="edit-payment-date" class="input" value="${fechaFormateada}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-payment-method">Método de Pago</label>
                    <select id="edit-payment-method" class="input" required>
                        <option value="efectivo" ${payment.method === 'efectivo' ? 'selected' : ''}>Efectivo</option>
                        <option value="transferencia" ${payment.method === 'transferencia' ? 'selected' : ''}>Transferencia</option>
                        <option value="tarjeta" ${payment.method === 'tarjeta' ? 'selected' : ''}>Tarjeta</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="edit-payment-reference">Referencia</label>
                    <input type="text" id="edit-payment-reference" class="input" value="${payment.reference}" required>
                </div>
                <div class="flex justify-between">
                    <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;

    // Agregar el modal al documento
    document.body.appendChild(editModal);

    // Mostrar el modal usando la clase active
    setTimeout(() => {
        editModal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';

    // Manejar el cierre del modal
    const closeButtons = editModal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            editModal.classList.remove('active');
            setTimeout(() => {
                editModal.remove();
            }, 300);
            document.body.style.overflow = '';
        });
    });

    // Manejar el envío del formulario
    const editForm = editModal.querySelector('#edit-payment-form');
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener los nuevos valores
        const newAmount = parseFloat(document.getElementById('edit-payment-amount').value);
        const newMethod = document.getElementById('edit-payment-method').value;
        const newReference = document.getElementById('edit-payment-reference').value;
        const newDate = new Date(document.getElementById('edit-payment-date').value);

        // Calcular la diferencia en el monto
        const amountDiff = newAmount - payment.amount;

        // Actualizar el pago
        payment.amount = newAmount;
        payment.method = newMethod;
        payment.reference = newReference;
        payment.date = newDate;

        // Actualizar el saldo del cliente
        const client = clients.find(c => c.id === payment.clientId);
        if (client) {
            client.balance -= amountDiff;
        }

        // Actualizar la vista
        showClientDetails(payment.clientId);

        // Cerrar el modal con animación
        editModal.classList.remove('active');
        setTimeout(() => {
            editModal.remove();
        }, 300);
        document.body.style.overflow = '';

        // Mostrar notificación de éxito
        showNotification('Pago actualizado correctamente', 'success');
    });

    // Cerrar el modal al hacer clic fuera
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.classList.remove('active');
            setTimeout(() => {
                editModal.remove();
            }, 300);
            document.body.style.overflow = '';
        }
    });
}

// Función para editar un pedido
function editOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Crear modal de edición
    const editModal = document.createElement('div');
    editModal.className = 'modal';
    editModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Editar Pedido #${order.orderNumber}</h2>
                <button class="close-modal btn btn-secondary">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-order-form">
                <div class="mb-4">
                    <label>Cliente</label>
                    <div class="input bg-gray-100">
                        ${clients.find(c => c.id === order.clientId)?.name || 'Cliente no encontrado'}
                    </div>
                </div>
                <div class="mb-4">
                    <label>Productos</label>
                    <div id="edit-order-products" class="border rounded p-4">
                        <div id="edit-product-list">
                            <!-- Los items de productos se agregarán aquí dinámicamente -->
                        </div>
                        <button type="button" class="btn btn-secondary mt-2" id="edit-add-product-btn">
                            <i class="fas fa-plus"></i> Agregar Producto
                        </button>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between items-center">
                        <label class="font-bold">Total del Pedido:</label>
                        <div class="text-xl font-bold" id="edit-order-total">$0</div>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="edit-order-description">Descripción</label>
                    <textarea id="edit-order-description" class="input" required>${order.description}</textarea>
                </div>
                <div class="mb-4">
                    <label for="edit-order-status">Estado</label>
                    <select id="edit-order-status" class="input" required>
                        <option value="pendiente" ${order.status === 'pendiente' ? 'selected' : ''}>Pendiente de pago</option>
                        <option value="preparar" ${order.status === 'preparar' ? 'selected' : ''}>Preparar pedido</option>
                        <option value="fabrica" ${order.status === 'fabrica' ? 'selected' : ''}>Sale de fabrica</option>
                        <option value="entregado" ${order.status === 'entregado' ? 'selected' : ''}>Entregado</option>
                        <option value="completado" ${order.status === 'completado' ? 'selected' : ''}>Completado</option>
                    </select>
                </div>
                <div class="flex justify-between">
                    <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    <button type="button" class="btn btn-secondary" onclick="printOrder(${order.id})"><i class="fas fa-print"></i> Imprimir</button>
                </div>
            </form>
        </div>
    `;

    // Agregar el modal al documento
    document.body.appendChild(editModal);
    
    // Mostrar el modal
    setTimeout(() => {
        editModal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';

    const productList = editModal.querySelector('#edit-product-list');
    const addProductBtn = editModal.querySelector('#edit-add-product-btn');
    const orderTotal = editModal.querySelector('#edit-order-total');

    // Función para agregar una nueva línea de producto
    function addProductLine(item = null) {
        const productLine = document.createElement('div');
        productLine.className = 'flex gap-2 items-center mb-2 product-line';
        productLine.innerHTML = `
            <div class="flex-1">
                <select class="input w-full product-select" required>
                    <option value="">Seleccione un producto</option>
                    ${products.map(product => `
                        <option value="${product.id}" 
                                data-price="${product.price}"
                                data-name="${product.name}"
                                ${item && item.productId === product.id ? 'selected' : ''}>
                            ${product.name} - ${formatCurrency(product.price)}
                        </option>
                    `).join('')}
                </select>
            </div>
            <div class="w-32">
                <input type="number" class="input w-full product-quantity" 
                       min="1" value="${item ? item.quantity : 1}" required placeholder="Cantidad">
            </div>
            <div class="w-32">
                <input type="number" class="input w-full product-price" 
                       min="0" step="0.01" value="${item ? item.price : ''}" required placeholder="Precio">
            </div>
            <div class="w-32 text-right product-subtotal font-bold">
                ${formatCurrency(item ? item.price * item.quantity : 0)}
            </div>
            <button type="button" class="btn btn-danger remove-product" title="Eliminar producto">
                <i class="fas fa-trash"></i>
            </button>
        `;

        productList.appendChild(productLine);

        // Event listeners para la línea de producto
        const select = productLine.querySelector('.product-select');
        const quantity = productLine.querySelector('.product-quantity');
        const price = productLine.querySelector('.product-price');
        const subtotal = productLine.querySelector('.product-subtotal');
        const removeBtn = productLine.querySelector('.remove-product');

        // Inicializar el precio cuando se selecciona un producto y no hay un item previo
        if (!item) {
            select.addEventListener('change', () => {
                const selectedOption = select.selectedOptions[0];
                if (selectedOption && selectedOption.value) {
                    price.value = parseFloat(selectedOption.dataset.price);
                    updateSubtotal();
                }
            });
        }

        function updateSubtotal() {
            const selectedOption = select.selectedOptions[0];
            if (selectedOption && selectedOption.value) {
                const priceValue = parseFloat(price.value) || 0;
                const qty = parseInt(quantity.value) || 0;
                const total = priceValue * qty;
                subtotal.textContent = formatCurrency(total);
                updateOrderTotal();
            }
        }

        select.addEventListener('change', updateSubtotal);
        quantity.addEventListener('input', updateSubtotal);
        price.addEventListener('input', updateSubtotal);
        quantity.addEventListener('change', () => {
            if (parseInt(quantity.value) < 1) {
                quantity.value = 1;
            }
            updateSubtotal();
        });

        removeBtn.addEventListener('click', () => {
            if (productList.children.length > 1) {
                productLine.remove();
                updateOrderTotal();
            } else {
                showNotification('Debe haber al menos un producto en el pedido', 'error');
            }
        });

        // Si no hay un item previo, trigger el evento change para inicializar el precio
        if (!item) {
            const event = new Event('change');
            select.dispatchEvent(event);
        }
    }

    // Función para actualizar el total del pedido
    function updateOrderTotal() {
        const productLines = Array.from(productList.children);
        let total = 0;
        productLines.forEach(line => {
            const select = line.querySelector('.product-select');
            const quantityInput = line.querySelector('.product-quantity');
            const priceInput = line.querySelector('.product-price');
            if (select && quantityInput && priceInput && select.value) {
                const price = parseFloat(priceInput.value) || 0;
                const qty = parseInt(quantityInput.value) || 0;
                total += price * qty;
            }
        });
        orderTotal.textContent = formatCurrency(total);
    }

    // Agregar los productos existentes
    order.items.forEach(item => {
        addProductLine(item);
    });

    // Event listener para agregar nuevo producto
    addProductBtn.addEventListener('click', () => addProductLine());

    // Manejar el envío del formulario
    const editForm = editModal.querySelector('#edit-order-form');
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener los nuevos valores
        const newDescription = document.getElementById('edit-order-description').value;
        const newStatus = document.getElementById('edit-order-status').value;
        const productLines = Array.from(productList.children);
        
        // Validar que haya al menos un producto seleccionado
        const validProductLines = productLines.filter(line => {
            const select = line.querySelector('.product-select');
            return select.value !== '';
        });

        if (validProductLines.length === 0) {
            showNotification('Debe seleccionar al menos un producto', 'error');
            return;
        }

        // Obtener el monto anterior para calcular la diferencia
        const previousAmount = order.amount;
        
        // Actualizar los items del pedido
        const newItems = validProductLines.map(line => {
            const select = line.querySelector('.product-select');
            const quantity = line.querySelector('.product-quantity');
            const price = line.querySelector('.product-price');
            
            return {
                productId: parseInt(select.value),
                quantity: parseInt(quantity.value),
                price: parseFloat(price.value)
            };
        });

        const newAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Actualizar el pedido
        order.items = newItems;
        order.amount = newAmount;
        order.description = newDescription;
        order.status = newStatus;

        // Actualizar el saldo del cliente
        const client = clients.find(c => c.id === order.clientId);
        if (client) {
            client.balance += (newAmount - previousAmount);
        }

        // Actualizar la vista
        showClientDetails(order.clientId);

        // Cerrar el modal con animación
        editModal.classList.remove('active');
        setTimeout(() => {
            editModal.remove();
        }, 300);
        document.body.style.overflow = '';

        // Mostrar notificación de éxito
        showNotification('Pedido actualizado correctamente', 'success');
    });

    // Event listeners para cerrar el modal
    editModal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            editModal.classList.remove('active');
            setTimeout(() => {
                editModal.remove();
            }, 300);
            document.body.style.overflow = '';
        });
    });

    // Cerrar el modal al hacer clic fuera
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.classList.remove('active');
            setTimeout(() => {
                editModal.remove();
            }, 300);
            document.body.style.overflow = '';
        }
    });
}

// Función para editar un cliente
function editClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    // Obtener el modal y los campos
    const modal = document.getElementById('edit-client-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Setear valores actuales
    document.getElementById('edit-client-name').value = client.name;
    document.getElementById('edit-client-cuit').value = client.cuit;
    document.getElementById('edit-client-email').value = client.email;
    document.getElementById('edit-client-phone').value = client.phone;
    document.getElementById('edit-client-address').value = client.address || '';
    document.getElementById('edit-client-province').value = client.province || '';
    actualizarCiudades(client.province, 'edit-client-city');
    document.getElementById('edit-client-city').value = client.city || '';
    document.getElementById('edit-client-zip').value = client.zip || '';

    // Listener para provincia
    document.getElementById('edit-client-province').addEventListener('change', (e) => {
        actualizarCiudades(e.target.value, 'edit-client-city');
    });

    // Cerrar modal
    modal.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };
    });

    // Guardar cambios
    const form = document.getElementById('edit-client-form');
    form.onsubmit = function(e) {
        e.preventDefault();
        client.name = document.getElementById('edit-client-name').value;
        client.cuit = document.getElementById('edit-client-cuit').value;
        client.email = document.getElementById('edit-client-email').value;
        client.phone = document.getElementById('edit-client-phone').value;
        client.address = document.getElementById('edit-client-address').value;
        client.province = document.getElementById('edit-client-province').value;
        client.city = document.getElementById('edit-client-city').value;
        client.zip = document.getElementById('edit-client-zip').value;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        showClientDetails(clientId);
        showNotification('Cliente actualizado correctamente', 'success');
    };
}

// Función para manejar el envío del formulario de nuevo pago
function handleNewPaymentSubmit(e) {
    e.preventDefault();
    
    const clientSelect = document.getElementById('payment-client-select');
    const amountInput = document.getElementById('payment-amount');
    const methodSelect = document.getElementById('payment-method');
    const referenceInput = document.getElementById('payment-reference');
    const dateInput = document.getElementById('payment-date');
    
    const newPayment = {
        id: payments.length + 1,
        clientId: parseInt(clientSelect.value),
        amount: parseFloat(amountInput.value),
        method: methodSelect.value,
        reference: referenceInput.value,
        date: new Date(dateInput.value)
    };
    
    payments.push(newPayment);
    
    // Actualizar saldo del cliente
    const client = clients.find(c => c.id === newPayment.clientId);
    if (client) {
        client.balance -= newPayment.amount;
    }
    
    if (document.querySelector('.page-content')) {
        showClientDetails(newPayment.clientId);
    } else {
        showClientsList();
    }
    
    hideModal(newPaymentModal);
    
    // Mostrar notificación de éxito
    showNotification('Pago registrado correctamente', 'success');
}

// Crear el modal de nuevo producto
function createNewProductModal() {
    const modalHtml = `
        <div class="modal" id="new-product-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Nuevo Producto</h2>
                    <button class="close-modal btn btn-secondary">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="new-product-form">
                    <div class="mb-4">
                        <label for="product-name-input">Nombre</label>
                        <input type="text" id="product-name-input" class="input" required>
                    </div>
                    <div class="mb-4">
                        <label for="product-description-input">Descripción</label>
                        <textarea id="product-description-input" class="input" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="product-price-input">Precio</label>
                        <input type="number" id="product-price-input" class="input" required>
                    </div>
                    <div class="flex justify-between">
                        <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = document.getElementById('new-product-modal');
    const form = document.getElementById('new-product-form');
    
    // Configurar event listeners
    modal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => hideModal(modal));
    });
    
    form.addEventListener('submit', handleNewProductSubmit);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    });
    
    return modal;
}

// Función para manejar el envío del formulario de nuevo producto
function handleNewProductSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('product-name-input');
    const descriptionInput = document.getElementById('product-description-input');
    const priceInput = document.getElementById('product-price-input');
    
    const newProduct = {
        id: products.length + 1,
        name: nameInput.value.trim(),
        description: descriptionInput.value.trim(),
        price: parseFloat(priceInput.value)
    };
    
    products.push(newProduct);
    showProducts();
    hideModal(document.getElementById('new-product-modal'));
    showNotification('Producto agregado correctamente', 'success');
}

// Función para mostrar la lista de productos
function showProducts() {
    const mainContent = document.querySelector('.main-content');
    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
    const user = getCurrentUser();
    const esAdmin = user && user.perfil === 'Administrador';

    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <h1>Productos</h1>
            </div>
            <div class="flex items-center gap-2">
                ${esAdmin ? `<button id="new-product-btn" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Nuevo Producto
                </button>` : ''}
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Listado de Productos</h2>
                    <div class="flex gap-2">
                        <input type="text" class="input" placeholder="Buscar producto..." id="products-search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedProducts.map(product => `
                            <tr>
                                <td>${product.name}</td>
                                <td>${product.description}</td>
                                <td>${formatCurrency(product.price)}</td>
                                <td>
                                    <div class="flex gap-2">
                                        ${esAdmin ? `<button class="btn btn-secondary" onclick="editProduct(${product.id})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                                            <i class="fas fa-trash"></i>
                                        </button>` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Reconectar event listeners
    if (esAdmin) {
        const newProductBtn = document.getElementById('new-product-btn');
        if (newProductBtn) {
            newProductBtn.addEventListener('click', () => {
                const modal = document.getElementById('new-product-modal') || createNewProductModal();
                showModal(modal);
            });
        }
    }

    // Event listener para la búsqueda
    const productsSearch = document.getElementById('products-search');
    if (productsSearch) {
        productsSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.price.toString().includes(searchTerm)
            );

            const productsTable = document.querySelector('table tbody');
            if (productsTable) {
                productsTable.innerHTML = filteredProducts.map(product => `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${formatCurrency(product.price)}</td>
                        <td>
                            <div class="flex gap-2">
                                ${esAdmin ? `<button class="btn btn-secondary" onclick="editProduct(${product.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                                    <i class="fas fa-trash"></i>
                                </button>` : ''}
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
        });
    }
}

// Función para editar un producto
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const editModal = document.createElement('div');
    editModal.className = 'modal';
    editModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Editar Producto</h2>
                <button class="close-modal btn btn-secondary">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-product-form">
                <div class="mb-4">
                    <label for="edit-product-name">Nombre</label>
                    <input type="text" id="edit-product-name" class="input" value="${product.name}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-product-description">Descripción</label>
                    <textarea id="edit-product-description" class="input" required>${product.description}</textarea>
                </div>
                <div class="mb-4">
                    <label for="edit-product-price">Precio</label>
                    <input type="number" id="edit-product-price" class="input" value="${product.price}" required>
                </div>
                <div class="flex justify-between">
                    <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(editModal);
    
    setTimeout(() => {
        editModal.classList.add('active');
    }, 10);

    const form = editModal.querySelector('#edit-product-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        product.name = document.getElementById('edit-product-name').value.trim();
        product.description = document.getElementById('edit-product-description').value.trim();
        product.price = parseFloat(document.getElementById('edit-product-price').value);
        
        showProducts();
        hideModal(editModal);
        setTimeout(() => editModal.remove(), 300);
        showNotification('Producto actualizado correctamente', 'success');
    });

    editModal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            hideModal(editModal);
            setTimeout(() => editModal.remove(), 300);
        });
    });

    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            hideModal(editModal);
            setTimeout(() => editModal.remove(), 300);
        }
    });
}

// Función para eliminar un producto
function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const confirmModal = document.createElement('div');
    confirmModal.className = 'modal';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Confirmar Eliminación</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="p-4">
                <p>¿Está seguro que desea eliminar el producto "${product.name}"?</p>
                <p class="text-sm text-gray-600 mt-2">Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary close-modal">Cancelar</button>
                <button class="btn btn-danger" id="confirm-delete">Eliminar</button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);
    
    setTimeout(() => {
        confirmModal.classList.add('active');
    }, 10);

    // Event listener para confirmar eliminación
    const confirmButton = confirmModal.querySelector('#confirm-delete');
    confirmButton.addEventListener('click', () => {
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            showProducts();
            hideModal(confirmModal);
            setTimeout(() => confirmModal.remove(), 300);
            showNotification('Producto eliminado correctamente', 'success');
        }
    });

    // Event listeners para cerrar el modal
    confirmModal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            hideModal(confirmModal);
            setTimeout(() => confirmModal.remove(), 300);
        });
    });

    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            hideModal(confirmModal);
            setTimeout(() => confirmModal.remove(), 300);
        }
    });
}

// Función auxiliar para mostrar el modal de nuevo pedido con cliente preseleccionado
function showNewOrderModal(clientId = null) {
    const modal = createNewOrderModal();
    if (clientId) {
        const clientSelect = modal.querySelector('#order-client-select');
        if (clientSelect) {
            clientSelect.value = clientId;
            clientSelect.disabled = true;
        }
    }
    showModal(modal);
}

// Función para eliminar un pago
function deletePayment(paymentId) {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;

    const confirmModal = document.createElement('div');
    confirmModal.className = 'modal';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Confirmar Eliminación</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="p-4">
                <p>¿Está seguro que desea eliminar el pago de ${formatCurrency(payment.amount)} con referencia "${payment.reference}"?</p>
                <p class="text-sm text-gray-600 mt-2">Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary close-modal">Cancelar</button>
                <button class="btn btn-danger" id="confirm-delete">Eliminar</button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmModal);
    
    setTimeout(() => {
        confirmModal.classList.add('active');
    }, 10);

    // Event listener para confirmar eliminación
    const confirmButton = confirmModal.querySelector('#confirm-delete');
    confirmButton.addEventListener('click', () => {
        const index = payments.findIndex(p => p.id === paymentId);
        if (index !== -1) {
            // Actualizar saldo del cliente
            const client = clients.find(c => c.id === payment.clientId);
            if (client) {
                client.balance += payment.amount; // Aumentar el saldo ya que se elimina el pago
            }
            
            payments.splice(index, 1);
            showClientDetails(payment.clientId);
            hideModal(confirmModal);
            setTimeout(() => confirmModal.remove(), 300);
            showNotification('Pago eliminado correctamente', 'success');
        }
    });

    // Event listeners para cerrar el modal
    confirmModal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            hideModal(confirmModal);
            setTimeout(() => confirmModal.remove(), 300);
        });
    });

    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            hideModal(confirmModal);
            setTimeout(() => confirmModal.remove(), 300);
        }
    });
}

// Función para mostrar la lista de contactos
function showContacts() {
    console.log('showContacts ejecutada');
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showDashboard()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Contactos</h1>
            </div>
            <div class="flex items-center gap-2">
                <button id="new-contact-btn" class="btn btn-primary">
                    <i class="fas fa-user-plus"></i> Nuevo Contacto
                </button>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Listado de Contactos</h2>
                    <div class="flex gap-2">
                        <input type="text" class="input" placeholder="Buscar contacto..." id="contacts-search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Empresa</th>
                            <th>Cargo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="contacts-list">
                        ${contacts.map(contact => {
                            const client = clients.find(c => c.id === contact.clientId);
                            return `
                                <tr>
                                    <td>${contact.name}</td>
                                    <td>${contact.email}</td>
                                    <td>${contact.phone}</td>
                                    <td>${client ? client.name : 'Cliente no encontrado'}</td>
                                    <td>${contact.position}</td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-secondary" onclick="editContact('${contact.id}')">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger" onclick="deleteContact('${contact.id}')">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Event listener para el botón de nuevo contacto
    const newContactBtn = document.getElementById('new-contact-btn');
    if (newContactBtn) {
        newContactBtn.addEventListener('click', () => {
            const modal = document.getElementById('new-contact-modal');
            if (modal) {
                // ACTUALIZA el select de clientes SOLO con los visibles
                const clientSelect = document.getElementById('contact-client-select');
                if (clientSelect) {
                    clientSelect.innerHTML = `
                        <option value="">Seleccione un cliente</option>
                        ${getVisibleClientes().map(client => `
                            <option value="${client.id}">${client.name} (${client.cuit})</option>
                        `).join('')}
                    `;
                }
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Event listener para la búsqueda de contactos
    const contactsSearch = document.getElementById('contacts-search');
    if (contactsSearch) {
        contactsSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredContacts = contacts.filter(contact => {
                const client = clients.find(c => c.id === contact.clientId);
                return (
                    contact.name.toLowerCase().includes(searchTerm) ||
                    contact.email.toLowerCase().includes(searchTerm) ||
                    contact.phone.toLowerCase().includes(searchTerm) ||
                    (client && client.name.toLowerCase().includes(searchTerm))
                );
            });

            const contactsTable = document.querySelector('#contacts-list');
            if (contactsTable) {
                contactsTable.innerHTML = filteredContacts.map(contact => {
                    const client = clients.find(c => c.id === contact.clientId);
                    return `
                        <tr>
                            <td>${contact.name}</td>
                            <td>${contact.email}</td>
                            <td>${contact.phone}</td>
                            <td>${client ? client.name : 'Cliente no encontrado'}</td>
                            <td>${contact.position}</td>
                            <td>
                                <div class="flex gap-2">
                                    <button class="btn btn-secondary" onclick="editContact('${contact.id}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-danger" onclick="deleteContact('${contact.id}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        });
    }
}

// Función para manejar el envío del formulario de nuevo contacto
function handleNewContactSubmit(e) {
    e.preventDefault();
    
    const clientSelect = document.getElementById('contact-client-select');
    const clientId = clientSelect.value;
    const name = document.getElementById('contact-name-input').value;
    const email = document.getElementById('contact-email-input').value;
    const phone = document.getElementById('contact-phone-input').value;
    const position = document.getElementById('contact-position-input').value;
    const department = document.getElementById('contact-department-input').value;

    // Validar campos requeridos
    if (!clientId || !name || !email || !phone || !position) {
        showNotification('Por favor complete todos los campos requeridos', 'error');
        return;
    }

    // Crear nuevo contacto
    const newContact = {
        id: Date.now().toString(),
        clientId: parseInt(clientId), // Asegurarnos de que sea un número
        name: name,
        email: email,
        phone: phone,
        position: position,
        department: department || ''
    };

    // Agregar el contacto al array
    contacts.push(newContact);

    // Cerrar el modal
    const modal = document.getElementById('new-contact-modal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
    }, 300);

    // Mostrar notificación de éxito
    showNotification('Contacto agregado exitosamente', 'success');

    // Actualizar la vista
    showClientDetails(parseInt(clientId));
}

// Función para editar un contacto
function editContact(contactId) {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Editar Contacto</h2>
                <button class="close-modal btn btn-secondary" title="Cerrar" aria-label="Cerrar modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="edit-contact-form">
                <div class="mb-4">
                    <label for="edit-contact-name">Nombre Completo</label>
                    <input type="text" id="edit-contact-name" class="input" value="${contact.name}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-email">Email</label>
                    <input type="email" id="edit-contact-email" class="input" value="${contact.email}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-phone">Teléfono</label>
                    <input type="tel" id="edit-contact-phone" class="input" value="${contact.phone}" required>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-position">Cargo</label>
                    <select id="edit-contact-position" class="input" required>
                        <option value="">Seleccione un cargo</option>
                        <option value="Dueño" ${contact.position === 'Dueño' ? 'selected' : ''}>Dueño</option>
                        <option value="Gerente de compras" ${contact.position === 'Gerente de compras' ? 'selected' : ''}>Gerente de compras</option>
                        <option value="Gerente Comercial" ${contact.position === 'Gerente Comercial' ? 'selected' : ''}>Gerente Comercial</option>
                        <option value="Logistica" ${contact.position === 'Logistica' ? 'selected' : ''}>Logistica</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="edit-contact-department">Departamento</label>
                    <input type="text" id="edit-contact-department" class="input" value="${contact.department || ''}">
                </div>
                <div class="flex justify-between">
                    <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </form>
        </div>
    `;

    // Agregar el modal al documento
    document.body.appendChild(editModal);

    // Mostrar el modal usando la clase active
    setTimeout(() => {
        editModal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';

    // Manejar el cierre del modal
    const closeButtons = editModal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            editModal.classList.remove('active');
            setTimeout(() => {
                editModal.remove();
            }, 300);
            document.body.style.overflow = '';
        });
    });

    // Manejar el envío del formulario
    const editForm = editModal.querySelector('#edit-contact-form');
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener los nuevos valores
        const newName = document.getElementById('edit-contact-name').value;
        const newEmail = document.getElementById('edit-contact-email').value;
        const newPhone = document.getElementById('edit-contact-phone').value;
        const newPosition = document.getElementById('edit-contact-position').value;
        const newDepartment = document.getElementById('edit-contact-department').value;

        // Actualizar el contacto
        contact.name = newName;
        contact.email = newEmail;
        contact.phone = newPhone;
        contact.position = newPosition;
        contact.department = newDepartment;

        // Actualizar la vista
        showClientDetails(contact.clientId);

        // Cerrar el modal con animación
        editModal.classList.remove('active');
        setTimeout(() => {
            editModal.remove();
        }, 300);
        document.body.style.overflow = '';

        // Mostrar notificación de éxito
        showNotification('Contacto actualizado correctamente', 'success');
    });
}

// Función para eliminar un contacto
function deleteContact(contactId) {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    // Crear modal de confirmación
    const confirmModal = document.createElement('div');
    confirmModal.className = 'modal';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Confirmar Eliminación</h2>
                <button class="close-modal btn btn-secondary" title="Cerrar" aria-label="Cerrar modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>¿Está seguro que desea eliminar el contacto "${contact.name}"?</p>
                <p>Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary close-modal">Cancelar</button>
                <button class="btn btn-danger" id="confirm-delete">Eliminar</button>
            </div>
        </div>
    `;

    // Agregar el modal al documento
    document.body.appendChild(confirmModal);

    // Mostrar el modal usando la clase active
    setTimeout(() => {
        confirmModal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';

    // Manejar el cierre del modal
    const closeButtons = confirmModal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            confirmModal.classList.remove('active');
            setTimeout(() => {
                confirmModal.remove();
            }, 300);
            document.body.style.overflow = '';
        });
    });

    // Manejar la confirmación de eliminación
    const confirmButton = confirmModal.querySelector('#confirm-delete');
    confirmButton.addEventListener('click', () => {
        // Eliminar el contacto
        const contactIndex = contacts.findIndex(c => c.id === contactId);
        if (contactIndex !== -1) {
            contacts.splice(contactIndex, 1);
        }

        // Actualizar la vista
        showClientDetails(contact.clientId);

        // Cerrar el modal con animación
        confirmModal.classList.remove('active');
        setTimeout(() => {
            confirmModal.remove();
        }, 300);
        document.body.style.overflow = '';

        // Mostrar notificación de éxito
        showNotification('Contacto eliminado correctamente', 'success');
    });
}

// Función para mostrar el modal de nuevo contacto
function showNewContactModal(clientId = null) {
    console.log('showNewContactModal ejecutada', clientId);
    // Eliminar el modal existente si hay uno
    const existingModal = document.getElementById('new-contact-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Crear nuevo modal
    const modal = document.createElement('div');
    modal.id = 'new-contact-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Nuevo Contacto</h2>
                <button class="close-modal btn btn-secondary" title="Cerrar" aria-label="Cerrar modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="new-contact-form">
                <div class="mb-4">
                    <label for="contact-client-select">Cliente</label>
                    <select id="contact-client-select" class="input" ${clientId ? 'disabled' : ''} required>
                        <option value="">Seleccione un cliente</option>
                        ${clients.map(client => `
                            <option value="${client.id}" ${clientId === client.id ? 'selected' : ''}>
                                ${client.name} (${client.cuit})
                            </option>
                        `).join('')}
                    </select>
                </div>
                <div class="mb-4">
                    <label for="contact-name-input">Nombre Completo</label>
                    <input type="text" id="contact-name-input" class="input" required>
                </div>
                <div class="mb-4">
                    <label for="contact-email-input">Email</label>
                    <input type="email" id="contact-email-input" class="input" required>
                </div>
                <div class="mb-4">
                    <label for="contact-phone-input">Teléfono</label>
                    <input type="tel" id="contact-phone-input" class="input" required>
                </div>
                <div class="mb-4">
                    <label for="contact-position-input">Cargo</label>
                    <select id="contact-position-input" class="input" required>
                        <option value="">Seleccione un cargo</option>
                        <option value="Dueño">Dueño</option>
                        <option value="Gerente de compras">Gerente de compras</option>
                        <option value="Gerente Comercial">Gerente Comercial</option>
                        <option value="Logistica">Logistica</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="contact-department-input">Departamento</label>
                    <input type="text" id="contact-department-input" class="input">
                </div>
                <div class="flex justify-between">
                    <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Agregar event listeners
    const form = modal.querySelector('#new-contact-form');
    form.addEventListener('submit', handleNewContactSubmit);

    // Event listeners para cerrar el modal
    modal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
            document.body.style.overflow = '';
        });
    });

    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
            document.body.style.overflow = '';
        }
    });

    // Mostrar el modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para imprimir un pedido estilo factura
function printOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const client = clients.find(c => c.id === order.clientId);
    if (!client) return;

    // HTML de la factura
    const facturaHTML = `
        <html>
        <head>
            <title>Factura de Pedido</title>
            <style>
                body { font-family: Arial, sans-serif; color: #222; background: #fff; }
                .factura-container { max-width: 700px; margin: 40px auto; border: 1px solid #ccc; padding: 32px; box-shadow: 0 0 16px #eee; }
                h1 { text-align: center; margin-bottom: 0; }
                hr { margin: 16px 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 16px; }
                th, td { border: 1px solid #ccc; padding: 8px; }
                th { background: #f5f5f5; }
                .total { text-align: right; font-size: 1.2em; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="factura-container">
                <h1>Factura de Pedido</h1>
                <hr>
                <div style="margin-bottom: 20px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 1.1em;">Datos del Cliente</h2>
                    <p><strong>Nombre:</strong> ${client.name}</p>
                    <p><strong>Documento:</strong> ${client.cuit}</p>
                    <p><strong>Email:</strong> ${client.email}</p>
                    <p><strong>Teléfono:</strong> ${client.phone}</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 1.1em;">Datos del Pedido</h2>
                    <p><strong>N° Pedido:</strong> ${order.orderNumber}</p>
                    <p><strong>Fecha:</strong> ${order.date.toLocaleDateString()}</p>
                    <p><strong>Descripción:</strong> ${order.description}</p>
                    <p><strong>Estado:</strong> ${order.status === 'active' ? 'Activo' : 'Finalizado'}</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 1.1em;">Productos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => {
                                const product = products.find(p => p.id === item.productId);
                                return `<tr>
                                    <td>${product ? product.name : 'Producto'}</td>
                                    <td style='text-align:center;'>${item.quantity}</td>
                                    <td style='text-align:right;'>${formatCurrency(item.price)}</td>
                                    <td style='text-align:right;'>${formatCurrency(item.price * item.quantity)}</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="total">
                    <strong>Total del Pedido: ${formatCurrency(order.amount)}</strong>
                </div>
            </div>
        </body>
        </html>
    `;

    // Abrir nueva ventana e imprimir
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(facturaHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
}

// Crear el modal de nuevo pago
function createNewPaymentModal() {
    // Eliminar el modal existente si hay uno
    const existingModal = document.getElementById('new-payment-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modalHtml = `
        <div class="modal" id="new-payment-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Nuevo Pago</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <form id="new-payment-form">
                    <div class="mb-4">
                        <label for="payment-client-select">Cliente</label>
                        <select id="payment-client-select" class="input" required>
                            <option value="">Seleccione un cliente</option>
                            ${getVisibleClientes().map(client => `
                                <option value="${client.id}">${client.name} (${client.cuit})</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="payment-amount">Monto</label>
                        <input type="number" id="payment-amount" class="input" required>
                    </div>
                    <div class="mb-4">
                        <label for="payment-date">Fecha de Pago</label>
                        <input type="date" id="payment-date" class="input" value="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    <div class="mb-4">
                        <label for="payment-method">Método de Pago</label>
                        <select id="payment-method" class="input" required>
                            <option value="efectivo">Efectivo</option>
                            <option value="transferencia">Transferencia</option>
                            <option value="tarjeta">Tarjeta</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="payment-reference">Referencia</label>
                        <input type="text" id="payment-reference" class="input" required>
                    </div>
                    <div class="flex justify-between">
                        <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = document.getElementById('new-payment-modal');
    const form = modal.querySelector('#new-payment-form');
    
    // Configurar event listeners
    form.addEventListener('submit', handleNewPaymentSubmit);
    
    modal.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => hideModal(modal));
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    });
    
    return modal;
}

// Agrego función auxiliar para obtener clase y texto de estado
function getOrderStatusBadge(status) {
    switch (status) {
        case 'pendiente':
            return {text: 'Pendiente de pago', cls: 'badge badge-warning'};
        case 'preparar':
            return {text: 'Preparar pedido', cls: 'badge badge-success'};
        case 'fabrica':
            return {text: 'Sale de fabrica', cls: 'badge badge-info'};
        case 'entregado':
            return {text: 'Entregado', cls: 'badge badge-secondary'};
        case 'completado':
            return {text: 'Completado', cls: 'badge badge-purple'};
        default:
            return {text: status, cls: 'badge'};
    }
}

// Delegación global para el botón Nuevo Contacto

document.body.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'new-contact-btn') {
        showNewContactModal();
    }
});

// Integración del sistema de perfiles
document.addEventListener('DOMContentLoaded', function() {
    // Cargar scripts del sistema de perfiles
    // loadScript('roles.js');
    // loadScript('users.js');
    // loadScript('permissions.js');
    
    // Actualizar nombre del usuario actual
    updateCurrentUserName();
    
    // Configurar menú de administración de perfiles
    const adminProfilesNav = document.getElementById('admin-profiles-nav');
    if (adminProfilesNav) {
        adminProfilesNav.style.display = checkAccess(getCurrentUser(), 'AdminPanel', 'ver') ? '' : 'none';
        adminProfilesNav.addEventListener('click', function(e) {
            e.preventDefault();
            showAdminProfilesSection(); // Cambiado de showAdminProfilesPanel a showAdminProfilesSection
        });
    }
    
    // Configurar botón de perfil de usuario
    const userProfileBtn = document.getElementById('user-profile-btn');
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', showUserProfile);
    }
});

function updateCurrentUserName() {
    const userNameSpan = document.getElementById('current-user-name');
    if (userNameSpan) {
        const user = getCurrentUser();
        userNameSpan.textContent = user ? user.nombre : 'Usuario';
    }
}

function showAdminProfilesSection() {
    // Ocultar el contenido principal
    document.querySelector('.main-content').style.display = 'none';
    
    // Mostrar la sección de administración
    const section = document.getElementById('admin-profiles-section');
    if (section) {
        section.style.display = '';
        renderUserTable();
        renderPermsTables();
        
        // Configurar el botón de volver
        const backBtn = document.getElementById('back-to-dashboard-btn');
        if (backBtn) {
            backBtn.onclick = function() {
                section.style.display = 'none';
                document.querySelector('.main-content').style.display = '';
            };
        }
    }
}

function renderAdminProfilesUI() {
    renderProfileSelect();
    renderUserTable();
    renderPermsTables();
}

function renderProfileSelect() {
    const section = document.getElementById('admin-profiles-section');
    if (!section) return;
    const perfilSelect = section.querySelector('#new-user-perfil');
    if (perfilSelect) {
        perfilSelect.innerHTML = [
            'Administrador',
            'Vendedor',
            'Produccion',
            'Gerente de ventas'
        ].map(role => `<option value="${role}">${role}</option>`).join('');
    }
}

// Actualizar el event listener del formulario de nuevo usuario para recargar la UI
function setupNewUserForm() {
    const section = document.getElementById('admin-profiles-section');
    if (!section) return;
    const newUserForm = section.querySelector('#new-user-form');
    if (newUserForm) {
        newUserForm.onsubmit = function(e) {
            e.preventDefault();
            const nombre = section.querySelector('#new-user-nombre').value.trim();
            const email = section.querySelector('#new-user-email').value.trim();
            const perfil = section.querySelector('#new-user-perfil').value;
            if (!nombre || !email || !perfil) return;
            const newId = USERS.length > 0 ? Math.max(...USERS.map(u => u.id)) + 1 : 1;
            USERS.push({ id: newId, nombre, email, perfil });
            showNotification('Usuario creado', 'success');
            renderAdminProfilesUI();
            setupNewUserForm();
            newUserForm.reset();
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupNewUserForm();
});

// Modificar renderUserTable para recargar la UI tras editar
function renderUserTable() {
    const section = document.getElementById('admin-profiles-section');
    if (!section) return;
    const tableContainer = section.querySelector('.users-table-container');
    if (!tableContainer) return;
    
    const currentUser = getCurrentUser();
    const esAdmin = currentUser && currentUser.perfil === 'Administrador';
    
    if (USERS.length === 0) {
        tableContainer.innerHTML = '<div class="no-results" style="padding:2em;text-align:center;color:#888;"><i class="fas fa-user-slash" style="font-size:2em;"></i><br>No hay usuarios registrados.</div>';
        return;
    }
    
    let html = `<table class="admin-users-table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Contraseña</th>
                <th>Acción</th>
                ${esAdmin ? '<th> </th>' : ''}
            </tr>
        </thead>
        <tbody>
            ${USERS.map(user => `
                <tr>
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td>
                        <select class="user-profile-select" data-userid="${user.id}">
                            <option value="Administrador" ${user.perfil === 'Administrador' ? 'selected' : ''}>Administrador</option>
                            <option value="Vendedor" ${user.perfil === 'Vendedor' ? 'selected' : ''}>Vendedor</option>
                            <option value="Produccion" ${user.perfil === 'Produccion' ? 'selected' : ''}>Producción</option>
                            <option value="Gerente de ventas" ${user.perfil === 'Gerente de ventas' ? 'selected' : ''}>Gerente de ventas</option>
                        </select>
                    </td>
                    <td>${user.password ? '••••••' : ''}</td>
                    <td>
                        <button class="btn btn-primary save-profile-btn" data-userid="${user.id}">Guardar</button>
                        <button class="btn btn-secondary edit-user-btn" data-userid="${user.id}">Editar</button>
                    </td>
                    ${esAdmin ? `<td><button class="btn btn-secondary loguear-btn" data-userid="${user.id}">LOGUEAR</button></td>` : ''}
                </tr>
            `).join('')}
        </tbody>
    </table>`;
    
    tableContainer.innerHTML = html;
    
    // Botón Guardar
    tableContainer.querySelectorAll('.save-profile-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-userid'));
            const select = tableContainer.querySelector(`.user-profile-select[data-userid='${userId}']`);
            if (select) {
                setUserProfile(userId, select.value);
                showNotification('Perfil actualizado', 'success');
                renderUserTable();
            }
        });
    });
    
    // Botón Editar
    tableContainer.querySelectorAll('.edit-user-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-userid'));
            openEditUserModal(userId);
        });
    });
    
    // Botón LOGUEAR (solo admin)
    if (esAdmin) {
        tableContainer.querySelectorAll('.loguear-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-userid'));
                loguearComoUsuario(userId);
            });
        });
    }
}

function renderPermsTables() {
    const section = document.getElementById('admin-profiles-section');
    if (!section) return;
    const permsContainer = section.querySelector('.perms-table-container');
    if (!permsContainer) return;
    let html = '';
    Object.entries(ROLES).forEach(([role, modules]) => {
        html += `<div class="perms-role-block">
            <h4 style="font-size:1.1em;color:#4f46e5;margin-bottom:0.5em;">${role}</h4>
            <table class="admin-perms-table">
                <thead>
                    <tr>
                        <th>Módulo</th>
                        <th>Ver</th>
                        <th>Crear</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(modules).map(([mod, actions]) => {
                        const perms = ['ver','crear','editar','eliminar'];
                        return `<tr>
                            <td>${mod}</td>
                            ${perms.map(perm => `
                                <td><input type="checkbox" class="perm-checkbox" data-role="${role}" data-mod="${mod}" data-perm="${perm}" ${actions.includes(perm) ? 'checked' : ''}></td>
                            `).join('')}
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>`;
    });
    html += '<div style="text-align:right;"><button class="btn btn-primary" id="save-perms-btn">Guardar Permisos</button></div>';
    permsContainer.innerHTML = html;
    const saveBtn = permsContainer.querySelector('#save-perms-btn');
    if (saveBtn) {
        saveBtn.onclick = function() {
            permsContainer.querySelectorAll('.perm-checkbox').forEach(cb => {
                const role = cb.getAttribute('data-role');
                const mod = cb.getAttribute('data-mod');
                const perm = cb.getAttribute('data-perm');
                if (cb.checked) {
                    if (!ROLES[role][mod].includes(perm)) ROLES[role][mod].push(perm);
                } else {
                    ROLES[role][mod] = ROLES[role][mod].filter(p => p !== perm);
                }
            });
            showNotification('Permisos actualizados', 'success');
            renderPermsTables();
        };
    }
}

// Variables globales del sistema de perfiles
let ROLES = {};
let USERS = [];
let currentUserId = 1;

// Sistema de perfiles y permisos
function getCurrentUser() {
    return USERS.find(u => u.id === currentUserId);
}

function checkAccess(user, module, action) {
    if (!user || !user.perfil) return false;
    const role = ROLES[user.perfil];
    if (!role) return false;
    const allowed = role[module];
    return allowed && allowed.includes(action);
}

function setUserProfile(userId, newProfile) {
    const user = USERS.find(u => u.id === userId);
    if (user) user.perfil = newProfile;
}

// Cargar datos de perfiles
async function loadProfilesData() {
    try {
        // Cargar roles
        const rolesResponse = await fetch('roles.json');
        ROLES = await rolesResponse.json();

        // Cargar usuarios
        const usersResponse = await fetch('users.json');
        USERS = await usersResponse.json();
        
        console.log('Datos cargados:', { ROLES, USERS }); // Para depuración
        
        // Asegurarse de que los usuarios tengan IDs numéricos
        USERS = USERS.map(user => ({
            ...user,
            id: parseInt(user.id)
        }));
    } catch (error) {
        console.error('Error cargando datos de perfiles:', error);
        // Inicializar con datos por defecto si hay error
        ROLES = {
            admin: {
                AdminPanel: ['ver', 'crear', 'editar', 'eliminar']
            },
            vendedor: {
                AdminPanel: ['ver']
            }
        };
        USERS = [
            {
                id: 1,
                nombre: 'Admin',
                email: 'admin@example.com',
                perfil: 'admin',
                password: 'admin123'
            }
        ];
    }
}

// Integración del sistema de perfiles
document.addEventListener('DOMContentLoaded', async function() {
    // Cargar datos de perfiles
    await loadProfilesData();
    
    // Actualizar nombre del usuario actual
    updateCurrentUserName();
    
    // Configurar menú de administración de perfiles
    const adminProfilesNav = document.getElementById('admin-profiles-nav');
    if (adminProfilesNav) {
        adminProfilesNav.style.display = checkAccess(getCurrentUser(), 'AdminPanel', 'ver') ? '' : 'none';
        adminProfilesNav.addEventListener('click', function(e) {
            e.preventDefault();
            showAdminProfilesSection();
        });
    }
    
    // Configurar botón de perfil de usuario
    const userProfileBtn = document.getElementById('user-profile-btn');
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', showUserProfile);
    }
});

// Configurar el botón de nuevo usuario
document.addEventListener('DOMContentLoaded', function() {
    const newUserBtn = document.getElementById('new-user-btn');
    if (newUserBtn) {
        newUserBtn.addEventListener('click', function() {
            const modal = document.getElementById('new-user-modal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('active');
            }
        });
    }

    // Configurar el formulario de nuevo usuario
    const newUserForm = document.getElementById('new-user-form');
    if (newUserForm) {
        newUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('new-user-nombre').value;
            const email = document.getElementById('new-user-email').value;
            const perfil = document.getElementById('new-user-perfil').value;
            
            // Crear nuevo usuario
            const newUser = {
                id: USERS.length + 1,
                nombre: nombre,
                email: email,
                perfil: perfil
            };
            
            USERS.push(newUser);
            
            // Actualizar la tabla de usuarios
            renderUserTable();
            
            // Cerrar el modal
            const modal = document.getElementById('new-user-modal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
            
            // Limpiar el formulario
            newUserForm.reset();
            
            // Mostrar notificación
            showNotification('Usuario creado correctamente', 'success');
        });
    }

    // Configurar botones de cerrar modal
    document.querySelectorAll('#new-user-modal .close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = document.getElementById('new-user-modal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
        });
    });
});

// --- Sidebar user menu ---
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el nombre del usuario logueado en el sidebar
    function updateSidebarUserName() {
        const user = getCurrentUser();
        const sidebarUser = document.getElementById('sidebar-current-user');
        if (sidebarUser) {
            sidebarUser.textContent = user ? user.nombre : 'Usuario';
        }
    }
    updateSidebarUserName();

    // Lógica de despliegue del menú
    const userBtn = document.getElementById('sidebar-user-btn');
    const userDropdown = document.getElementById('sidebar-user-dropdown');
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userBtn.classList.toggle('active');
            userDropdown.classList.toggle('show');
        });
        // Cerrar el menú si se hace click fuera
        document.addEventListener('click', function(e) {
            if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userBtn.classList.remove('active');
                userDropdown.classList.remove('show');
            }
        });
    }

    // Opción de configuración de usuario
    const configBtn = document.getElementById('sidebar-user-config');
    if (configBtn) {
        configBtn.addEventListener('click', function(e) {
            e.preventDefault();
            userBtn.classList.remove('active');
            userDropdown.classList.remove('show');
            showUserProfile();
        });
    }

    // Opción de cerrar sesión
    const logoutBtn = document.getElementById('sidebar-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof logout === 'function') {
                logout();
            }
            window.location.href = 'login.html';
        });
    }
});

// --- Configuración de usuario ---
function showUserProfile() {
    const modal = document.getElementById('user-config-modal');
    if (!modal) return;
    const user = getCurrentUser();
    // Rellenar datos
    document.getElementById('user-config-nombre').value = user ? user.nombre : '';
    document.getElementById('user-config-email').value = user ? user.email : '';
    document.getElementById('user-config-perfil').value = user ? user.perfil : '';
    // Avatar
    const avatarPreview = document.getElementById('user-avatar-preview');
    if (user && user.avatar) {
        avatarPreview.src = user.avatar;
    } else {
        avatarPreview.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user ? user.nombre : 'Usuario')}`;
    }
    // Tema
    const theme = localStorage.getItem('theme') || 'light';
    document.getElementById('user-theme-select').value = theme;
    // Mostrar modal
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Lógica del modal de configuración de usuario
(function() {
    const modal = document.getElementById('user-config-modal');
    if (!modal) return;
    // Cerrar modal
    modal.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };
    });
    // Cambiar avatar
    const avatarInput = document.getElementById('user-avatar-input');
    const avatarPreview = document.getElementById('user-avatar-preview');
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                avatarPreview.src = evt.target.result;
                // Guardar en el usuario actual (frontend)
                const user = getCurrentUser();
                if (user) user.avatar = evt.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    // Guardar cambios
    const form = document.getElementById('user-config-form');
    form.onsubmit = function(e) {
        e.preventDefault();
        const user = getCurrentUser();
        if (user) {
            user.nombre = document.getElementById('user-config-nombre').value;
            user.email = document.getElementById('user-config-email').value;
            // Avatar ya se actualizó si se cambió
        }
        // Tema
        const theme = document.getElementById('user-theme-select').value;
        localStorage.setItem('theme', theme);
        setTheme(theme);
        // Actualizar nombre en UI
        updateCurrentUserName();
        const sidebarUser = document.getElementById('sidebar-current-user');
        if (sidebarUser) sidebarUser.textContent = user ? user.nombre : 'Usuario';
        // Cerrar modal
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        showNotification('Datos actualizados', 'success');
    };
    // Cambiar tema al seleccionar
    document.getElementById('user-theme-select').addEventListener('change', function(e) {
        setTheme(e.target.value);
    });
})();

// Función para aplicar el tema
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('theme-dark');
    } else {
        document.body.classList.remove('theme-dark');
    }
}
// Aplicar tema al cargar
(function() {
    const theme = localStorage.getItem('theme') || 'light';
    setTheme(theme);
})();

// --- Protección de rutas: redirigir si no está autenticado ---
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('currentUserId')) {
        if (!window.location.href.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Obtener usuario actual desde localStorage
function getCurrentUser() {
    const id = parseInt(localStorage.getItem('currentUserId'));
    return USERS.find(u => u.id === id);
}

// --- Integrar logout con el sistema ---
function handleLogout() {
    if (typeof logout === 'function') {
        logout();
        window.location.href = 'login.html';
    }
}
// Reemplazar en el menú lateral la función de cerrar sesión
const sidebarLogout = document.getElementById('sidebar-logout');
if (sidebarLogout) {
    sidebarLogout.onclick = function(e) {
        e.preventDefault();
        handleLogout();
    };
}

// Lógica para el modal de edición de usuario
function openEditUserModal(userId) {
    // Cerrar todos los modales antes de abrir el de edición
    document.querySelectorAll('.modal').forEach(m => {
        m.classList.remove('active');
        m.style.display = 'none';
    });

    console.log('Abriendo modal para editar usuario:', userId);
    
    const user = USERS.find(u => u.id === userId);
    if (!user) {
        console.error('Usuario no encontrado:', userId);
        return;
    }
    console.log('Usuario encontrado:', user);

    const modal = document.getElementById('edit-user-modal');
    if (!modal) {
        console.error('Modal no encontrado en el DOM');
        return;
    }

    // Establecer valores actuales
    const nameInput = modal.querySelector('#edit-user-nombre');
    const emailInput = modal.querySelector('#edit-user-email');
    const profileSelect = modal.querySelector('#edit-user-perfil');
    const passwordInput = modal.querySelector('#edit-user-password');

    if (nameInput) nameInput.value = user.nombre;
    if (emailInput) emailInput.value = user.email;
    if (profileSelect) profileSelect.value = user.perfil;
    if (passwordInput) passwordInput.value = user.password;

    // Mostrar el modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Manejar el envío del formulario
    const form = modal.querySelector('form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            
            // Actualizar usuario
            const updatedUser = {
                ...user,
                nombre: nameInput.value,
                email: emailInput.value,
                perfil: profileSelect.value,
                password: passwordInput.value || user.password // Mantener contraseña actual si no se cambia
            };

            // Actualizar en el array de usuarios
            const userIndex = USERS.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                USERS[userIndex] = updatedUser;
                saveUsersData();
                renderUserTable();
                showNotification('Usuario actualizado correctamente', 'success');
            }

            // Cerrar modal
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };
    }

    // Manejar cierre del modal
    const closeButtons = modal.querySelectorAll('.close-modal, .cancel-btn');
    closeButtons.forEach(button => {
        button.onclick = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };
    });

    // Cerrar al hacer clic fuera del modal
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };
}

// Guardar usuarios en localStorage
function saveUsersData() {
    localStorage.setItem('USERS', JSON.stringify(USERS));
}

// Cargar usuarios desde localStorage
function loadUsersData() {
    const data = localStorage.getItem('USERS');
    if (data) {
        USERS = JSON.parse(data);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadUsersData();
    // ... el resto de tu código ...
});

function logout() {
    // Elimina la sesión del usuario
    localStorage.removeItem('currentUserId');
    // Si guardas más datos de sesión, elimínalos aquí
    // Por ejemplo: localStorage.removeItem('token');
}

// --- Vista Fábrica ---
function showFabricaView() {
    const mainContent = document.querySelector('.main-content');
    const pedidosFabrica = orders.filter(order => order.status === 'preparar');
    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <button class="btn btn-secondary" onclick="showDashboard()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Pedidos en Fábrica</h1>
            </div>
        </header>
        <div class="page-content">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Pedidos a Preparar</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>N° Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Productos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pedidosFabrica.map(order => {
                            const client = clients.find(c => c.id === order.clientId);
                            return `
                                <tr>
                                    <td>${order.orderNumber}</td>
                                    <td>${client ? client.name : 'Cliente no encontrado'}</td>
                                    <td>${new Date(order.date).toLocaleDateString()}</td>
                                    <td>${order.items.map(item => {
                                        const product = products.find(p => p.id === item.productId);
                                        return product ? `${product.name} (${item.quantity})` : '';
                                    }).join(', ')}</td>
                                    <td>
                                        <div class="flex gap-2">
                                            <button class="btn btn-secondary" onclick="showOrderDetails(${order.id})" title="Ver Detalles">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary" onclick="printGuiaCarga(${order.id})">
                                                <i class="fas fa-file-alt"></i> Imprimir Guía de Carga
                                            </button>
                                            <button class="btn btn-primary" onclick="printEtiquetaEnvio(${order.id})">
                                                <i class="fas fa-tag"></i> Imprimir Etiqueta
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Imprimir Guía de Carga (solo datos del cliente y productos/cantidades)
function printGuiaCarga(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const client = clients.find(c => c.id === order.clientId);
    if (!client) return;
    const guiaHTML = `
        <html>
        <head>
            <title>Guía de Carga</title>
            <style>
                body { font-family: Arial, sans-serif; color: #222; background: #fff; }
                .guia-container { max-width: 600px; margin: 40px auto; border: 1px solid #ccc; padding: 32px; box-shadow: 0 0 16px #eee; }
                h1 { text-align: center; margin-bottom: 0; }
                hr { margin: 16px 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 16px; }
                th, td { border: 1px solid #ccc; padding: 8px; }
                th { background: #f5f5f5; }
            </style>
        </head>
        <body>
            <div class="guia-container">
                <h1>Guía de Carga</h1>
                <hr>
                <div style="margin-bottom: 20px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 1.1em;">Datos del Cliente</h2>
                    <p><strong>Nombre:</strong> ${client.name}</p>
                    <p><strong>Documento:</strong> ${client.cuit}</p>
                    <p><strong>Email:</strong> ${client.email}</p>
                    <p><strong>Teléfono:</strong> ${client.phone}</p>
                    <p><strong>Dirección:</strong> ${client.address || '-'}</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 1.1em;">Productos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => {
                                const product = products.find(p => p.id === item.productId);
                                return `<tr>
                                    <td>${product ? product.name : 'Producto'}</td>
                                    <td style='text-align:center;'>${item.quantity}</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
        </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(guiaHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
}

// Imprimir Etiqueta de Envío (solo datos del cliente y dirección)
function printEtiquetaEnvio(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const client = clients.find(c => c.id === order.clientId);
    if (!client) return;
    const etiquetaHTML = `
        <html>
        <head>
            <title>Etiqueta de Envío</title>
            <style>
                body { font-family: Arial, sans-serif; color: #222; background: #fff; }
                .etiqueta-container { max-width: 400px; margin: 40px auto; border: 2px dashed #6366f1; padding: 32px; box-shadow: 0 0 16px #eee; }
                h2 { text-align: center; margin-bottom: 16px; font-size: 1.3em; }
                .datos { font-size: 1.1em; }
                .datos strong { display: inline-block; width: 90px; }
            </style>
        </head>
        <body>
            <div class="etiqueta-container">
                <h2>Etiqueta de Envío</h2>
                <div class="datos">
                    <p><strong>Cliente:</strong> ${client.name}</p>
                    <p><strong>Dirección:</strong> ${client.address || '-'}</p>
                    <p><strong>Ciudad:</strong> ${client.city || '-'}</p>
                    <p><strong>Provincia:</strong> ${client.province || '-'}</p>
                    <p><strong>CP:</strong> ${client.zip || '-'}</p>
                </div>
            </div>
        </body>
        </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(etiquetaHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
        // Cambiar estado del pedido a 'fabrica' (sale de fabrica)
        order.status = 'fabrica';
        showFabricaView();
        showNotification('Etiqueta impresa y estado actualizado a "Sale de fabrica"', 'success');
    };
}

// Agregar event listener para el menú Fábrica

document.addEventListener('DOMContentLoaded', function() {
    const fabricaNav = document.getElementById('fabrica-nav');
    if (fabricaNav) {
        fabricaNav.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            fabricaNav.classList.add('active');
            showFabricaView();
        });
    }
});

// --- FILTRO DE DATOS SEGÚN PERFIL ---
function getVisibleClientes() {
    const user = getCurrentUser();
    if (user && user.perfil === 'Vendedor') {
        return clients.filter(c => c.creadoPor === user.id);
    }
    if (user && user.perfil === 'Gerente de ventas') {
        // Ver todos los clientes creados por cualquier vendedor
        return clients.filter(c => {
            const creador = USERS.find(u => u.id === c.creadoPor);
            return creador && creador.perfil === 'Vendedor';
        });
    }
    return clients;
}

function getVisiblePedidos() {
    const user = getCurrentUser();
    if (user && user.perfil === 'Vendedor') {
        return orders.filter(p => p.creadoPor === user.id);
    }
    if (user && user.perfil === 'Gerente de ventas') {
        return orders.filter(p => {
            const creador = USERS.find(u => u.id === p.creadoPor);
            return creador && creador.perfil === 'Vendedor';
        });
    }
    return orders;
}

function getVisiblePagos() {
    const user = getCurrentUser();
    if (user && user.perfil === 'Vendedor') {
        return payments.filter(p => p.creadoPor === user.id);
    }
    if (user && user.perfil === 'Gerente de ventas') {
        return payments.filter(p => {
            const creador = USERS.find(u => u.id === p.creadoPor);
            return creador && creador.perfil === 'Vendedor';
        });
    }
    return payments;
}

function getVisibleContactos() {
    const user = getCurrentUser();
    if (user && user.perfil === 'Vendedor') {
        const clientesIds = getVisibleClientes().map(c => c.id);
        return contacts.filter(cto => clientesIds.includes(cto.clientId));
    }
    if (user && user.perfil === 'Gerente de ventas') {
        const clientesIds = getVisibleClientes().map(c => c.id);
        return contacts.filter(cto => clientesIds.includes(cto.clientId));
    }
    return contacts;
}

// --- LOGUEAR COMO USUARIO (SOLO ADMIN) ---
function loguearComoUsuario(userId) {
    const adminUser = getCurrentUser();
    if (adminUser && adminUser.perfil === 'Administrador') {
        // Guardar el ID del admin original si no está guardado
        if (!localStorage.getItem('adminOriginalId')) {
            localStorage.setItem('adminOriginalId', adminUser.id);
        }
        localStorage.setItem('currentUserId', userId);
        location.reload();
    }
}

function volverASesionAdministrador() {
    const adminId = localStorage.getItem('adminOriginalId');
    if (adminId) {
        localStorage.setItem('currentUserId', adminId);
        localStorage.removeItem('adminOriginalId');
        location.reload();
    }
}

function mostrarBotonVolverAdmin() {
    if (localStorage.getItem('adminOriginalId')) {
        if (!document.getElementById('btn-volver-admin')) {
            const btn = document.createElement('button');
            btn.id = 'btn-volver-admin';
            btn.textContent = 'Volver a sesión administrador';
            btn.style.position = 'fixed';
            btn.style.bottom = '30px';
            btn.style.right = '30px';
            btn.style.zIndex = '2000';
            btn.className = 'btn btn-primary';
            btn.onclick = volverASesionAdministrador;
            document.body.appendChild(btn);
        }
    } else {
        const btn = document.getElementById('btn-volver-admin');
        if (btn) btn.remove();
    }
}

document.addEventListener('DOMContentLoaded', mostrarBotonVolverAdmin);

// ... existing code ...
// Actualizar select de clientes al abrir el modal de nuevo pago
function openNewPaymentModal() {
    const modal = document.getElementById('new-payment-modal');
    if (modal) {
        const clientSelect = document.getElementById('payment-client-select');
        if (clientSelect) {
            clientSelect.innerHTML = `
                <option value="">Seleccione un cliente</option>
                ${getVisibleClientes().map(client => `
                    <option value="${client.id}">${client.name} (${client.cuit})</option>
                `).join('')}
            `;
        }
        showModal(modal);
    }
}

// Actualizar select de clientes al abrir el modal de nuevo contacto
function openNewContactModal() {
    const modal = document.getElementById('new-contact-modal');
    if (modal) {
        const clientSelect = document.getElementById('contact-client-select');
        if (clientSelect) {
            clientSelect.innerHTML = `
                <option value="">Seleccione un cliente</option>
                ${getVisibleClientes().map(client => `
                    <option value="${client.id}">${client.name} (${client.cuit})</option>
                `).join('')}
            `;
        }
        showModal(modal);
    }
}

// Reemplazo los event listeners para los botones de nuevo pago y nuevo contacto
// Para pagos
// const newPaymentBtn = document.getElementById('new-payment-btn'); // Eliminada para evitar redeclaración
if (newPaymentBtn) {
    newPaymentBtn.addEventListener('click', openNewPaymentModal);
}
// Para contactos
const newContactBtn = document.getElementById('new-contact-btn');
if (newContactBtn) {
    newContactBtn.addEventListener('click', openNewContactModal);
}
// ... existing code ...

document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    if (user && user.perfil === 'Produccion') {
        // Oculta todos los items del menú excepto Fábrica
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
            if (!item.id || item.id !== 'fabrica-nav') {
                item.style.display = 'none';
            } else {
                item.style.display = '';
            }
        });
    }
    // Ocultar 'Administrar Perfiles' para Gerente de ventas
    if (user && user.perfil === 'Gerente de ventas') {
        const adminProfilesNav = document.getElementById('admin-profiles-nav');
        if (adminProfilesNav) {
            adminProfilesNav.style.display = 'none';
        }
    }
    setTimeout(ocultarMenuParaProduccion, 100);
});

function ocultarMenuParaProduccion() {
    const user = getCurrentUser();
    if (user && user.perfil === 'Produccion') {
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
            if (!item.id || item.id !== 'fabrica-nav') {
                item.style.display = 'none';
            } else {
                item.style.display = '';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // ... otros inicializadores ...
    setTimeout(ocultarMenuParaProduccion, 100); // Espera breve para asegurar que el DOM y usuario estén listos
});

// ... existing code ...
// --- MENÚ DE USUARIO EN EL SIDEBAR ---
function setupSidebarUserMenu() {
    const userInfo = document.querySelector('.sidebar-user .user-info');
    const userMenu = document.querySelector('.sidebar-user .user-menu');
    if (!userInfo || !userMenu) return;

    // Mostrar/ocultar menú al hacer clic
    userInfo.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenu.style.display = (userMenu.style.display === 'flex') ? 'none' : 'flex';
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target) && !userInfo.contains(e.target)) {
            userMenu.style.display = 'none';
        }
    });

    // Preferencias de usuario
    const prefBtn = document.getElementById('user-preferences');
    if (prefBtn) {
        prefBtn.addEventListener('click', function(e) {
            e.preventDefault();
            userMenu.style.display = 'none';
            // Mostrar modal de edición de usuario
            const modal = document.getElementById('user-config-modal');
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Cerrar sesión
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            userMenu.style.display = 'none';
            // Cerrar sesión y redirigir
            localStorage.removeItem('currentUserId');
            window.location.href = 'login.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', setupSidebarUserMenu);
// ... existing code ...

// Funciones para Listas de Precios
function loadPriceLists() {
    fetch('price-lists.json')
        .then(response => response.json())
        .then(data => {
            priceLists = data.price_lists || [];
            const tableBody = document.getElementById('price-lists-table-body');
            if (!tableBody) {
                console.error('No se encontró el elemento price-lists-table-body');
                return;
            }
            tableBody.innerHTML = '';
            
            priceLists.forEach(list => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${list.name}</td>
                    <td>${list.description}</td>
                    <td>${new Date(list.created_at).toLocaleDateString()}</td>
                    <td>${list.discount ? list.discount + '%' : '-'}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm" onclick="editPriceList(${list.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deletePriceList(${list.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error cargando listas de precios:', error));
}

function savePriceList() {
    const name = document.getElementById('price-list-name').value;
    const description = document.getElementById('price-list-description').value;
    const discount = parseFloat(document.getElementById('price-list-discount').value);
    
    const editingId = document.getElementById('price-list-id')?.value;
    if (editingId) {
        // Editar existente
        const idx = priceLists.findIndex(l => l.id == editingId);
        if (idx !== -1) {
            priceLists[idx].name = name;
            priceLists[idx].description = description;
            priceLists[idx].discount = discount;
            priceLists[idx].updated_at = new Date().toISOString();
        }
    } else {
        // Nueva lista
        const newList = {
            id: Date.now(),
            name,
            description,
            discount,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        priceLists.push(newList);
    }
    // Aquí iría la lógica para guardar en el backend
    console.log('Listas de precios actualizadas:', priceLists);
    // Cerrar modal y recargar lista
    const modal = document.getElementById('new-price-list-modal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
    renderPriceListsTable();
}

function renderPriceListsTable() {
    const tableBody = document.getElementById('price-lists-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    priceLists.forEach(list => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${list.name}</td>
            <td>${list.description}</td>
            <td>${new Date(list.created_at).toLocaleDateString()}</td>
            <td>${list.discount ? list.discount + '%' : '-'}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editPriceList(${list.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deletePriceList(${list.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editPriceList(id) {
    const list = priceLists.find(l => l.id == id);
    if (!list) return;
    const modal = document.getElementById('new-price-list-modal');
    const form = document.getElementById('new-price-list-form');
    // Reemplazo el contenido del formulario con los valores actuales
    form.innerHTML = `
        <input type="hidden" id="price-list-id" value="${list.id}">
        <div class="mb-4">
            <label for="price-list-name">Nombre</label>
            <input type="text" id="price-list-name" class="input" required value="${list.name}">
        </div>
        <div class="mb-4">
            <label for="price-list-description">Descripción</label>
            <textarea id="price-list-description" class="input" required>${list.description}</textarea>
        </div>
        <div class="mb-4">
            <label for="price-list-discount">% Descuento</label>
            <input type="number" id="price-list-discount" class="input" min="0" max="100" step="0.01" required value="${list.discount ?? ''}">
        </div>
        <div class="flex justify-between">
            <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
    `;
    // Mostrar modal
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
    // Cerrar modal
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.onclick = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        };
    });
    // Enviar formulario
    form.onsubmit = (e) => {
        e.preventDefault();
        savePriceList();
    };
}

function deletePriceList(id) {
    if (confirm('¿Está seguro de eliminar esta lista de precios?')) {
        priceLists = priceLists.filter(l => l.id != id);
        renderPriceListsTable();
    }
}

window.showPriceListsSection = function showPriceListsSection() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <header class="header">
            <div class="flex items-center gap-2">
                <h1>Listas de Precios</h1>
            </div>
            <div class="flex items-center gap-2">
                <button class="btn btn-primary new-price-list-btn">
                    <i class="fas fa-plus"></i> Nueva Lista
                </button>
            </div>
        </header>
        <div class="page-content" id="listas-precios-section">
            <div class="table-container">
                <div class="flex justify-between items-center mb-4">
                    <h2>Listas de Precios</h2>
                    <div class="flex gap-2">
                        <input type="text" class="input" placeholder="Buscar lista..." id="price-list-search">
                        <button class="btn btn-primary new-price-list-btn">
                            <i class="fas fa-plus"></i> Nueva Lista
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="clients-table">
                        <thead>
                            <tr>
                                <th>Nombre de Lista</th>
                                <th>Descripción</th>
                                <th>Fecha de Creación</th>
                                <th>% Descuento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="price-lists-table-body">
                            <!-- Las listas de precios se cargarán aquí dinámicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    // Asignar event listener a todos los botones de nueva lista
    document.querySelectorAll('.new-price-list-btn').forEach(btn => {
        btn.addEventListener('click', createNewPriceListModal);
    });
    // Cargar las listas de precios
    loadPriceLists();
}

window.createNewPriceListModal = function createNewPriceListModal() {
    const modal = document.getElementById('new-price-list-modal');
    const form = document.getElementById('new-price-list-form');
    // Reemplazo el contenido del formulario
    form.innerHTML = `
        <div class="mb-4">
            <label for="price-list-name">Nombre</label>
            <input type="text" id="price-list-name" class="input" required>
        </div>
        <div class="mb-4">
            <label for="price-list-description">Descripción</label>
            <textarea id="price-list-description" class="input" required></textarea>
        </div>
        <div class="mb-4">
            <label for="price-list-discount">% Descuento</label>
            <input type="number" id="price-list-discount" class="input" min="0" max="100" step="0.01" required>
        </div>
        <div class="flex justify-between">
            <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
    `;
    // Limpiar formulario
    form.reset();
    // Mostrar modal correctamente
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
    // Cerrar modal
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.onclick = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        };
    });
    // Enviar formulario
    form.onsubmit = (e) => {
        e.preventDefault();
        savePriceList();
    };
}

// Arrays para almacenar datos

// Función para cargar las listas de precios en los selectores
function loadPriceListSelectors() {
    const selectors = [
        document.getElementById('client-price-list'),
        document.getElementById('edit-client-price-list')
    ];

    selectors.forEach(selector => {
        if (selector) {
            // Limpiar opciones existentes excepto la primera
            while (selector.options.length > 1) {
                selector.remove(1);
            }

            // Agregar las listas de precios
            priceLists.forEach(list => {
                const option = document.createElement('option');
                option.value = list.id;
                option.textContent = list.name;
                selector.appendChild(option);
            });
        }
    });
}

// ... existing code ...

// Modificar la función showNewClientModal para cargar las listas de precios
function showNewClientModal() {
    const modal = document.getElementById('new-client-modal');
    modal.style.display = 'block';
    loadPriceListSelectors();
}

// Modificar la función showEditClientModal para cargar las listas de precios
function showEditClientModal(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const modal = document.getElementById('edit-client-modal');
    const form = document.getElementById('edit-client-form');

    // Cargar las listas de precios
    loadPriceListSelectors();

    // Llenar el formulario con los datos del cliente
    document.getElementById('edit-client-name').value = client.name;
    document.getElementById('edit-client-cuit').value = client.cuit;
    document.getElementById('edit-client-email').value = client.email;
    document.getElementById('edit-client-phone').value = client.phone;
    document.getElementById('edit-client-address').value = client.address || '';
    document.getElementById('edit-client-province').value = client.province || '';
    document.getElementById('edit-client-city').value = client.city || '';
    document.getElementById('edit-client-locality').value = client.locality || '';
    document.getElementById('edit-client-zip').value = client.zip || '';
    document.getElementById('edit-client-price-list').value = client.priceListId || '';

    // Guardar el ID del cliente en el formulario
    form.dataset.clientId = clientId;

    modal.style.display = 'block';
}

// ... existing code ...

// Función para guardar un nuevo cliente
function saveNewClient(event) {
    event.preventDefault();
    
    const name = document.getElementById('client-name').value;
    const cuit = document.getElementById('client-cuit').value;
    const email = document.getElementById('client-email').value;
    const phone = document.getElementById('client-phone').value;
    const address = document.getElementById('client-address').value;
    const province = document.getElementById('client-province').value;
    const city = document.getElementById('client-city').value;
    const locality = document.getElementById('client-locality').value;
    const zip = document.getElementById('client-zip').value;
    const priceListId = parseInt(document.getElementById('client-price-list').value);

    const newClient = {
        id: clients.length + 1,
        name,
        cuit,
        email,
        phone,
        address,
        province,
        city,
        locality,
        zip,
        balance: 0,
        priceListId
    };

    clients.push(newClient);
    renderClientsTable();
    closeNewClientModal();
}

// Función para guardar la edición de un cliente
function saveEditClient(event) {
    event.preventDefault();
    
    const clientId = parseInt(document.getElementById('edit-client-form').dataset.clientId);
    const clientIndex = clients.findIndex(c => c.id === clientId);
    
    if (clientIndex === -1) return;

    const name = document.getElementById('edit-client-name').value;
    const cuit = document.getElementById('edit-client-cuit').value;
    const email = document.getElementById('edit-client-email').value;
    const phone = document.getElementById('edit-client-phone').value;
    const address = document.getElementById('edit-client-address').value;
    const province = document.getElementById('edit-client-province').value;
    const city = document.getElementById('edit-client-city').value;
    const locality = document.getElementById('edit-client-locality').value;
    const zip = document.getElementById('edit-client-zip').value;
    const priceListId = parseInt(document.getElementById('edit-client-price-list').value);

    clients[clientIndex] = {
        ...clients[clientIndex],
        name,
        cuit,
        email,
        phone,
        address,
        province,
        city,
        locality,
        zip,
        priceListId
    };

    renderClientsTable();
    closeEditClientModal();
}

function renderClientsTable() {
    const tbody = document.querySelector('#clients-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    clients.forEach(client => {
        const priceList = priceLists.find(list => list.id === client.priceListId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.cuit}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${client.address || ''}</td>
            <td>${client.province || ''}</td>
            <td>${client.city || ''}</td>
            <td>${client.locality || ''}</td>
            <td>${client.zip || ''}</td>
            <td>${priceList ? priceList.name : 'Sin lista'}</td>
            <td>$${client.balance.toLocaleString()}</td>
            <td>
                <button onclick="showEditClientModal(${client.id})" class="btn-edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteClient(${client.id})" class="btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// === FUNCIONES PARA DESCARGAR EXCEL ===

// Función para descargar clientes en Excel
function downloadClientsExcel() {
    const visibleClients = getVisibleClientes();
    
    // Preparar los datos para Excel
    const excelData = visibleClients.map(client => {
        const priceList = priceLists.find(list => list.id === client.priceListId);
        return {
            'Nombre': client.name,
            'Documento': client.cuit,
            'Email': client.email,
            'Teléfono': client.phone,
            'Dirección': client.address || '',
            'Provincia': client.province || '',
            'Ciudad': client.city || '',
            'Localidad': client.locality || '',
            'Código Postal': client.zip || '',
            'Lista de Precios': priceList ? priceList.name : 'Sin lista',
            'Saldo': client.balance
        };
    });

    // Crear el libro de trabajo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    // Generar el archivo y descargarlo
    const fileName = `clientes_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    showNotification('Archivo Excel de clientes descargado exitosamente', 'success');
}

// Función para descargar pedidos en Excel
function downloadOrdersExcel() {
    const visibleOrders = getVisiblePedidos();
    
    // Preparar los datos para Excel
    const excelData = visibleOrders.map(order => {
        const client = clients.find(c => c.id === order.clientId);
        const orderProducts = order.items ? order.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return product ? `${product.name} (${item.quantity})` : 'Producto no encontrado';
        }).join(', ') : order.description;
        
        return {
            'N° Pedido': order.orderNumber,
            'Fecha': new Date(order.date).toLocaleDateString(),
            'Cliente': client ? client.name : 'Cliente no encontrado',
            'Productos': orderProducts,
            'Descripción': order.description,
            'Monto': order.amount,
            'Estado': order.status === 'active' ? 'Activo' : 'Finalizado'
        };
    });

    // Crear el libro de trabajo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos');

    // Generar el archivo y descargarlo
    const fileName = `pedidos_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    showNotification('Archivo Excel de pedidos descargado exitosamente', 'success');
}

// Función para descargar pagos en Excel
function downloadPaymentsExcel() {
    const visiblePayments = getVisiblePagos();
    
    // Preparar los datos para Excel
    const excelData = visiblePayments.map(payment => {
        const client = clients.find(c => c.id === payment.clientId);
        const order = orders.find(o => o.id === payment.orderId);
        
        return {
            'Fecha': new Date(payment.date).toLocaleDateString(),
            'Cliente': client ? client.name : 'Cliente no encontrado',
            'N° Pedido': order ? order.orderNumber : 'Sin pedido asociado',
            'Método de Pago': payment.method,
            'Referencia': payment.reference,
            'Monto': payment.amount
        };
    });

    // Crear el libro de trabajo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pagos');

    // Generar el archivo y descargarlo
    const fileName = `pagos_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    showNotification('Archivo Excel de pagos descargado exitosamente', 'success');
}

// === VERIFICACIÓN DE AUTENTICACIÓN ===

// Función para verificar si el usuario está autenticado
async function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    const currentUser = localStorage.getItem('currentUser');
    
    if (!token || !currentUser) {
        // No hay token o usuario, redirigir al login
        window.location.href = '/login.html';
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
            // Token inválido, limpiar localStorage y redirigir
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            window.location.href = '/login.html';
            return false;
        }
        
        const data = await response.json();
        // Actualizar datos del usuario si es necesario
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        // Configurar el usuario actual para el sistema legacy
        const user = data.user;
        document.getElementById('current-user-name').textContent = user.nombre;
        
        return true;
        
    } catch (error) {
        console.error('Error verificando autenticación:', error);
        // En caso de error, redirigir al login
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        window.location.href = '/login.html';
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

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', async function() {
    const isAuthenticated = await checkAuthentication();
    
    if (isAuthenticated) {
        // Usuario autenticado, inicializar la aplicación
        loadPriceLists();
        updateDashboard();
        
        // Configurar el botón de logout
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        }
    }
});
