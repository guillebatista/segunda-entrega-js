// Array para almacenar los productos seleccionados
const carro = [];

let contenedorProds = document.getElementById('misProductos');
let tablaCompra = document.getElementById('tablaCompra');
let filtroInput = document.getElementById('filtro');

// Se cargan las cartas de los productos
function renderizarProductos(listaProds) {
    contenedorProds.innerHTML = '';
    for (const prod of listaProds) {
        contenedorProds.innerHTML += `
    <div class="card col-sm-2">
        <img class="card-img-top" src=${prod.foto} alt="Card image cap">
        <div class="card-body text-center">
            <h3 class="card-title">${prod.nombre}</h3>
            <p class="card-text">$ ${prod.precio}</p>
            <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
        </div>
    </div>
    `;
    }
}

// Se agregan productos al carrito
contenedorProds.addEventListener('click', (event) => {
    if (event.target.classList.contains('compra')) {
        const productId = parseInt(event.target.id);
        const productoSeleccionado = productos.find((producto) => producto.id === productId);
        if (productoSeleccionado) {
            agregarACarrito(productoSeleccionado);
            totalElement.textContent = `Tu total es de $: ${calcularTotal()}`;
        }
    }
});

renderizarProductos(productos);

// Se agregan productos a la tabla
function agregarACarrito(producto) {
    producto.cantidad = 1;
    carro.push(producto);
    console.table(carro);
    tablaCompra.innerHTML += `
    <tr>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td><button class="btn btn-danger eliminar" data-id="${producto.id}">Eliminar</button></td>
    </tr>
  `;
}

// Calcular el total
function calcularTotal() {
    let total = 0;
    for (const producto of carro) {
        total += producto.precio * producto.cantidad;
    }
    return total;
}

// Muestra el total
let totalElement = document.getElementById('total');
totalElement.textContent = `Total a pagar $: ${calcularTotal()}`;

// Función para eliminar productos
function eliminarDelCarrito(productId) {
    const index = carro.findIndex((producto) => producto.id === productId);
    if (index !== -1) {
        carro.splice(index, 1);
    }
}

// Si se quita un producto, recalcula el total
tablaCompra.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar')) {
        const productId = parseInt(event.target.dataset.id);
        eliminarDelCarrito(productId);
        event.target.parentElement.parentElement.remove();
        totalElement.textContent = `Total a pagar $: ${calcularTotal()}`;
    }
});

filtroInput.addEventListener('keyup', () => {
    const filtro = filtroInput.value.toLowerCase();
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(filtro)
    );
    renderizarProductos(productosFiltrados);
});

const btnFiltrar = document.getElementById('btnFiltrar');
btnFiltrar.addEventListener('click', filtrarProductos);


const filtroTraining = document.getElementById('filtroTraining');
const filtroRunning = document.getElementById('filtroRunning');
const filtroHombre = document.getElementById('filtroHombre');
const filtroMujer = document.getElementById('filtroMujer');
const filtroUnisex = document.getElementById('filtroUnisex');

filtroTraining.addEventListener('click', aplicarFiltro);
filtroRunning.addEventListener('click', aplicarFiltro);
filtroHombre.addEventListener('click', aplicarFiltro);
filtroMujer.addEventListener('click', aplicarFiltro);
filtroUnisex.addEventListener('click', aplicarFiltro);

//aplicar filtros
function aplicarFiltro() {
    const filtro = filtroInput.value.toLowerCase();
    const precioMaximo = parseFloat(document.getElementById('precioMaximo').value);
    const productosFiltrados = productos.filter((producto) => {
        const nombreProducto = producto.nombre.toLowerCase();
        const precioProducto = producto.precio;
        const actividadProducto = producto.actividad.toLowerCase();
        const generoProducto = producto.genero.toLowerCase();

        if (
            nombreProducto.includes(filtro) &&
            (!precioMaximo || precioProducto <= precioMaximo) &&
            (filtroTraining.checked ? actividadProducto === 'training' : true) &&
            (filtroRunning.checked ? actividadProducto === 'running' : true) &&
            (filtroHombre.checked ? generoProducto === 'hombre' : true) &&
            (filtroMujer.checked ? generoProducto === 'mujer' : true) &&
            (filtroUnisex.checked ? generoProducto === 'unisex' : true)
        ) {
            return true;
        }

        return false;
    });

    renderizarProductos(productosFiltrados);
}

function filtrarProductos() {
    aplicarFiltro();
}

btnFiltrar.addEventListener('click', filtrarProductos);


// Limitar mínimo de caracteres en el nombre
const nombreInput = document.getElementById('nombre');
nombreInput.addEventListener('focus', () => {
    console.log('Campo de nombre en foco');
});

nombreInput.addEventListener('blur', () => {
    if (nombreInput.value.length <= 2) {
        alert('El nombre debe tener más de 2 caracteres');
    }
});



// Evento para chequear el correo bien introducido
const emailInput = document.getElementById('email');

emailInput.addEventListener('focus', () => {
    console.log('Campo de correo en foco');
});

emailInput.addEventListener('blur', () => {
    const emailValue = emailInput.value;
    if (!emailValue.includes('@') || !emailValue.includes('.')) {
        alert('El correo electrónico no es válido');
    }
});
