/*------------------VARIABLES GLOBALES ------------------------- */

const formulario = document.querySelector("[data-formulario]");
let lista = document.querySelector("[data-lista]");
const url = "http://localhost:3001/Productos";

formulario.addEventListener("submit", crearProducto);


/*-------------------------FUNCIONES------------------ */

async function listarProductos() {
    try {
        let fetchProductos = await fetch(url);
        let datosProductos = await fetchProductos.json();
        
        // Limpiar la lista antes de actualizarla
        lista.innerHTML = '';

        datosProductos.forEach(producto => {
            let tarjeta = crearCardProducto(producto.foto, producto.nombre, producto.precio);
            lista.appendChild(tarjeta);
        });

    } catch (error) {
        console.error('Error al listar productos:', error);
    }
}

async function crearProducto(event) {
   
    try {
        event.preventDefault(); 
        let tituloNuevoProducto = document.querySelector("[data-titulo]").value;
        
        let precioNuevoProducto = document.querySelector("[data-precio]").value;
        let fotoNuevoProducto = document.querySelector("[data-url]").value;
      let fetchProductosPost = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                nombre: tituloNuevoProducto,
                precio: precioNuevoProducto,
                foto: fotoNuevoProducto
            })
        });

        const fetchProductosPostConvertido = await fetchProductosPost.json();
        console.log('Producto creado:', fetchProductosPostConvertido);

       

    } catch (error) {
        console.error('Error al crear producto:', error);
    }
}

function crearCardProducto(urlImagen, titulo, precio) {
    let cardProducto = document.createElement("div");
    cardProducto.className = "card";
    cardProducto.innerHTML = `
        <img id="imagenProducto" src="${urlImagen}" alt="Producto">
        <div class="card__conteiner">
            <h3 id="nombreProducto">${titulo}</h3>
            <p id="precioProducto">$${precio}</p>
            <span class="delete-icon"><i class="fa-solid fa-trash"></i></span>
        </div>
    `;
    return cardProducto;
}

// Listar productos al cargar la página
listarProductos();
