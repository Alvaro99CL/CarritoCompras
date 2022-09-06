//constantes
// const carrito = document.getElementById('carrito')
const carrito = document.querySelector('#carrito') 
//para seleccionar el tbody btn carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
//boton limpiar carrito.
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
//lista de cursos
const listaCursos = document.querySelector('#lista-cursos');

//variables
let articuloCarrito = [];


cargarEventlistener();

//recomendado: crear una funcion para cargar un event listener.
function cargarEventlistener(){
    //cuando agregar un curso presionando "Agregar al Carrito"
    //como prevenir el event bobling
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click' , eliminarCurso);

    vaciarCarritoBtn.addEventListener('click' , ()=> {
        console.log('vaciando carrito');
        articuloCarrito = [];
        limpiarHtml();
    })
}

//funciones:
function agregarCurso(e){
    //para evitar que suba a la pagina
    e.preventDefault();
    //para fijar el click solo en el boton con clase agregar-carrito.
    if(e.target.classList.contains('agregar-carrito')){
        console.log('Agregar Curso al carrito...');
        //falta leer ahora los elementos superiores.
        //console.log(e.target.parentElement.parentElement);//subir dos niveles
        const cursoSeleccionado = (e.target.parentElement.parentElement);
        leerDatosCurso(cursoSeleccionado);
    }
    
    // console.log(e.target.classList);
}

function eliminarCurso(e){
    // console.log(e.target.classList)
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId =e.target.getAttribute('data-id');
        articuloCarrito = articuloCarrito.filter( carrito => carrito.id !== cursoId); 
    }

    carritoHTML();
}

function leerDatosCurso(curso){
    // console.log(curso);

    //Crear un objeto para leer la informacion.
    const infoCurso = {
        image: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        //esta dentro de una clase-->  .precio  y un span -->selector
        precio: curso.querySelector('.precio span').textContent,
        //acceder al id que esta en el LINK -->a y obtener un atributo del selector.
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //verificar si existe el elemento en el carrito
    const existe = articuloCarrito.some( curso => curso.id === infoCurso.id  )
    if( existe ){
        //actualizamos cantidad
        const cursos = articuloCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;//objeto actualizado
            }
            else{
                return curso;//objetos no duplicados
            }
        })
        articuloCarrito = [...cursos];
    }else{
        articuloCarrito = [...articuloCarrito , infoCurso];
    }
    // console.log(infoCurso);
    // console.log(infoCurso);            
    console.log(articuloCarrito);
    carritoHTML();
}

//mostrar carrito en el html
function carritoHTML(){
    //limpiar html
    limpiarHtml();

    //recorrete carrito.
    articuloCarrito.forEach( (curso)=> {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.image}" width="100" ></td>
            <td> ${curso.titulo}</td>
            <td> ${curso.precio}</td>
            <td> ${curso.cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id=${curso.id} > X </div> </td>
        `;
        //agrega el html en el TBODY        
        contenedorCarrito.appendChild(row);
        
    } );

}

function limpiarHtml(){
    //forma lenta de borrar html.
    // contenedorCarrito.innerHTML ='';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
    
}


