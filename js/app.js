//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    
    // cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarrito.addEventListener('click', ()=>{
        articulosCarrito = [];

        //eliminamos el html
        limpiarHTML();
    })
}

// funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSelecciondo = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecciondo);
    }
}

//elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        // console.log(e.target.getAttribute('data-id'));
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        // iterar sobre el carrito y mostrar el html
        carritoHTML();
        
    } else {
        
    }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si el curso existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizar cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son ducplicados
            }
        });

        articulosCarrito = [...cursos];
    } else {
        //agregar elemento al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
        console.log(articulosCarrito);
    }



    // carritohtml
    carritoHTML();

}

// muestra el carrito de compras

function carritoHTML() {

    // limpiar el html
    limpiarHTML();
    //recorre el carrito
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('TR');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#"  class="borrar-curso" data-id = "${id}">X</a></td>
        `;
        // agrega el html al carrito
        contenedorCarrito.appendChild(row);
    });
}

//elimina cursos del tbody

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}