class Producto{
    constructor(id, categoria, nombre, precio, emoji){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.emoji = emoji;
    }
}
/* declarar arreglo de productos */
const productos = [
    // Tecnología
    new Producto(1, "Tecnología", "Laptop", 800.49, "💻"),
    new Producto(2, "Tecnología", "Smartphone", 650.00, "📱"),
    new Producto(3, "Tecnología", "Tablet", 420.75, "📲"),
    new Producto(4, "Tecnología", "Audífonos Bluetooth", 85.99, "🎧"),

    // Hogar
    new Producto(5, "Hogar", "Licuadora", 120.50, "🧃"),
    new Producto(6, "Hogar", "Microondas", 230.00, "🍽️"),
    new Producto(7, "Hogar", "Aspiradora", 310.40, "🧹"),
    new Producto(8, "Hogar", "Cafetera", 95.90, "☕"),

    // Deportes
    new Producto(9, "Deportes", "Balón de Fútbol", 35.00, "⚽"),
    new Producto(10, "Deportes", "Bicicleta", 480.00, "🚲"),
    new Producto(11, "Deportes", "Mancuernas", 60.75, "🏋️"),
    new Producto(12, "Deportes", "Zapatillas Running", 110.20, "👟"),

    // Oficina
    new Producto(13, "Oficina", "Silla Ergonómica", 190.99, "🪑"),
    new Producto(14, "Oficina", "Escritorio", 250.00, "🧑‍💼"),
    new Producto(15, "Oficina", "Impresora", 175.80, "🖨️"),
    new Producto(16, "Oficina", "Cuaderno", 8.50, "📒"),

    // Alimentos
    new Producto(17, "Alimentos", "Arroz 5kg", 18.40, "🍚"),
    new Producto(18, "Alimentos", "Aceite Vegetal", 12.30, "🛢️"),
    new Producto(19, "Alimentos", "Café Molido", 22.90, "☕"),
    new Producto(20, "Alimentos", "Chocolate", 6.75, "🍫")

    
];
const catalogo    = document.getElementById("catalogo-tabla");
const inputBuscar = document.getElementById("input-group-1");

const listarCategorias = () => {
    const ulCategorias = document.getElementById("categorias-productos");
    ulCategorias.innerHTML = ""; 
    const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];

    categoriasUnicas.forEach(categoria => {
        const li = document.createElement("li");
        li.textContent = categoria;
        li.classList.add(
            "cursor-pointer",
            "px-2",
            "py-1",
            "rounded",
            "hover:bg-neutral-primary-light"
        );
        li.addEventListener("click", () => {
            filtrarPorCategoria(categoria);
        });
        ulCategorias.appendChild(li);
    });
};

const filtrarPorCategoria = (categoria) => {
    catalogo.innerHTML = ""; 
    const productosFiltrados = productos.filter(
        producto => producto.categoria === categoria
    );
    productosFiltrados.forEach(producto => {
        const tr = document.createElement("tr");
        tr.classList.add(
            "bg-neutral-primary-soft",
            "border-b",
            "border-default",
            "hover:bg-neutral-secondary-medium"
        );
        tr.innerHTML = `
            <td class="w-4 p-4">
                <div class="flex items-center">
                    <input type="checkbox" onclick="favorito(${producto.id})" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft">
                </div>
            </td>
            <td class="px-6 py-4 font-medium">${producto.nombre}</td>
            <td class="px-6 py-4">${producto.categoria} </td>
            <td class="px-6 py-4">$${producto.precio.toFixed(2)} </td>
            <td class="px-6 py-4 text-lg"> ${producto.emoji}</td>
        `;

        catalogo.appendChild(tr);
    });
};

const favorito = (id) => {
    const producto = productos.find(prod => prod.id === id);
    alert(`Has marcado como favorito: ${producto.nombre} ${producto.emoji}`);
};
const buscarProductos = (texto) => {
    const textoEnMinusculas = texto.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoEnMinusculas) ||
        producto.categoria.toLowerCase().includes(textoEnMinusculas)
    );
    renderizarTabla(productosFiltrados);
};

inputBuscar.addEventListener("input", (e) => {
    buscarProductos(e.target.value);
});

const renderizarTabla = (listaProductos) => {
    catalogo.innerHTML = "";

    listaProductos.forEach(producto => {
        const tr = document.createElement("tr");
        tr.className = "bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium";

        tr.innerHTML = `
            <td class="w-4 p-4">
                <input type="checkbox" onclick="favorito(${producto.id})" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium">
            </td>
            <td class="px-6 py-4 font-medium">${producto.nombre}</td>
            <td class="px-6 py-4">${producto.categoria}</td>
            <td class="px-6 py-4">$${producto.precio.toFixed(2)}</td>
            <td class="px-6 py-4 text-lg">${producto.emoji}</td>
        `;

        catalogo.appendChild(tr);
    });
};

listarCategorias();