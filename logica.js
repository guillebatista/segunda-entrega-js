console.table(productos);

// array para almacenar los productos seleccionados
const carro = [];

let contenedorProds = document.getElementById('misprods');
let tablaCompra = document.getElementById('tablaCompra');

function renderizarProductos(listaProds) {
    contenedorProds.innerHTML = '';
    //se cargan las cartas de los productos
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

//se agregan productos al carrito

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
        <td>${producto.id}</td>
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

// Muestra el total:
let totalElement = document.getElementById('total');
totalElement.textContent = `Total a pagar $: ${calcularTotal()}`;

//Funcion para eliminar productos

function eliminarDelCarrito(productId) {
    const index = carro.findIndex((producto) => producto.id === productId);
    if (index !== -1) {
        carro.splice(index, 1);
    }
}
//si se quita producto recalcula el total

tablaCompra.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar')) {
        const productId = parseInt(event.target.dataset.id);
        eliminarDelCarrito(productId);
        event.target.parentElement.parentElement.remove();
        totalElement.textContent = `Total a pagar $: ${calcularTotal()}`;
    }
});


//limitar minimo de caracteres en el nombre
let nombre = document.getElementById('nombre');
nombre.onkeyup = () => {
    if (nombre.value.length < 3) {
        console.log('Nombre de menos de 3 caracteres');
        nombre.style.color = 'red';
    } else {
        nombre.style.color = 'black';
    }
}

//evento para chequear el correo bien introducido
let email = document.getElementById('email');
email.addEventListener('input', () => {
    if (!email.value.includes('@') || !email.value.includes('.')) {
        document.getElementById('mensaje').innerText = '';
    } else {
        document.getElementById('mensaje').innerText = '';
    }
})








