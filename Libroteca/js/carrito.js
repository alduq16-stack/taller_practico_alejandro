class Producto{
    constructor(id, nombre, precio, emoji){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.emoji = emoji;
    }
}
/* declarrar arreglo de productos */
const productos = [
    new Producto(1, "Teclado", 50.99, "⌨️"),
    new Producto(2, "Mouse", 12.49, "🖱️"),
    new Producto(3, "Celular", 1500.99, "📱"),
    new Producto(8, "Laptop", 800.49, "💻")
];
let carrito = [];
const catalogo  = document.getElementById("catalogo-estantes");
const lista     = document.getElementById("lista-carrito");
const precio    = document.getElementById("total-precio");

/* funcion para cargar los productos en el catalogo */

const cargarCatalogo = () => {
    console.log('llego a la funciion');
    productos.forEach( producto => {
        const div = document.createElement("div");
        div.classList.add('tarjeta');
        div.innerHTML = `
            <h2>${producto.emoji}</h2>
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Add</button>
        `;
        catalogo.appendChild(div);
    });
};
/* funcion para agregar productos al carrito  */
const agregarAlCarrito = (id) => {
    const producto = productos.find( prod => prod.id === id);
    carrito.push(producto);
    actualizarCarrito();
}
/* funcion para actualizar el carrito */
const actualizarCarrito = () => {
    lista.innerHTML = "";
    let total = 0;
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${producto.nombre}</span>
            <span>$${producto.precio}</span>
            <button style="background-color:red" onclick="eliminarDelCarrito(${producto.id})">X</button>
        `;
        lista.appendChild(li);
        total += producto.precio;
    });
    precio.textContent = total.toFixed(2);
};
const eliminarDelCarrito = (id) => {
    //carrito = carrito.filter( prod => prod.id !== id);
    carrito.splice(carrito.indexOf(id), 1);
    actualizarCarrito();
}
/* funcion vaciar carrito */
const vaciarCarrito = () => {
    carrito = [];
    actualizarCarrito();
}
cargarCatalogo();