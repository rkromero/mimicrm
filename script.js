// Arrays para almacenar datos - VACÍOS (se cargan desde la base de datos)
let clients = [];

let orders = [];

let payments = [];

let products = [];

// Array para almacenar los contactos
let contacts = [];

// Array para almacenar las listas de precios
let priceLists = [];

// Función para cargar las listas de precios
function loadPriceLists() {
    // Los datos se cargan desde la base de datos vía API
    // Esta función se mantiene para compatibilidad pero ya no usa datos hardcodeados
    renderPriceListsTable();
}
