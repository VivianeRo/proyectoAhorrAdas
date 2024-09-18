const botonNav = document.getElementById('botonNav');
const ulNav = document.getElementById('ulNav');
const navBotonCerrar = document.getElementById('navBotonCerrar');


botonNav.addEventListener('click', function(){
    ulNav.style.display = 'flex'
    botonNav.style.display='none'
    navBotonCerrar.style.display = 'flex'
    console.log('funcionando')
    
})
navBotonCerrar.addEventListener('click', function(){
    botonNav.style.display = 'flex';
    ulNav.style.display = 'none'
    navBotonCerrar.style.display ='none'
})

const pantallaPrincipal = document.getElementById('pantallaPrincipal');
const navCategoria = document.getElementById('navCategoria');
const seccionCategorias = document.getElementById('seccionCategorias')
const navBalance = document.getElementById('navBalance');
const navReporte = document.getElementById('navReporte');
const seccionReportes = document.getElementById('seccionReportes')

navCategoria.addEventListener('click', function(){
    pantallaPrincipal.style.display = 'none'
    seccionCategorias.style.display = 'flex'
     seccionReportes.style.display ='none'


    //console.log('funcionando')

    

})

navBalance.addEventListener('click', function(){
    pantallaPrincipal.style.display ='flex'
    seccionReportes.style.display ='none'
    seccionCategorias.style.display ='none'
     seccionReportes.style.display ='none'

})

navReporte.addEventListener('click', function(){
    pantallaPrincipal.style.display ='none';
     seccionReportes.style.display = 'flex'
     seccionCategorias.style.display ='none'
})



//Categorias

const categoriasIniciales = [
  { id: "7caf8fd1-bae0-445d-8a3c-2d37821de7cf", nombre: "Comida" },
  { id: "8834d59d-4ecd-440a-ae94-0ee5d9226e20", nombre: "Servicios" },
  { id: "943c9869-33a6-48ba-90ba-96c964b670eb", nombre: "Salidas" },
  { id: "6ad1d218-41ef-405d-b271-1a51023c4b7b", nombre: "Educación" },
  { id: "07b4489a-13c5-48c7-bcb3-c70d234cc811", nombre: "Transporte" },
  { id: "0d352eb4-dea8-4065-a08d-5de5c14ea37e", nombre: "Trabajo" },
  
];

// Función para consultar categorías desde localStorage
const consultarCategorias = () => {
  const categorias = localStorage.getItem('categorias');
  if (categorias) {
      return JSON.parse(categorias); 
  } else {
      
      localStorage.setItem('categorias', JSON.stringify(categoriasIniciales));
      return categoriasIniciales;  
  }
};


const cargarSelectCategoriasFiltros = () => {
  const selectCategoriasFiltros = document.getElementById('selectCategoriaFiltros');
  selectCategoriasFiltros.innerHTML = ""; 
  const categorias = consultarCategorias();

  categorias.forEach(categoria => {
      selectCategoriasFiltros.innerHTML += `
          <option value="${categoria.nombre}" id="${categoria.id}">${categoria.nombre}</option>
      `;
  });
};


const cargarCategoriasEnLista = () => {
  const categoriaLista = document.getElementById('categoriaLista');
  categoriaLista.innerHTML = ""; 
  const categorias = consultarCategorias(); 

  categorias.forEach(categoria => {
      categoriaLista.innerHTML += `
          <p class="bg-emerald-100 rounded p-1 m-2" id="${categoria.id}">${categoria.nombre}</p>
      `;
  });
};


const botonCargaCategoria = document.getElementById('botonCargaCategoria');
const inputCargaCategorias = document.getElementById('inputCargaCategorias');

botonCargaCategoria.addEventListener('click', function(e) {
  e.preventDefault(); 

  const nuevaCategoria = {
      id: uuidv4(), 
      nombre: inputCargaCategorias.value, 
  };

  
  const categoriasActuales = consultarCategorias();
  const nuevoArrayCategorias = [...categoriasActuales, nuevaCategoria];
  
  
  localStorage.setItem("categorias", JSON.stringify(nuevoArrayCategorias));

  
  cargarSelectCategoriasFiltros();
  cargarCategoriasEnLista();

  
  inputCargaCategorias.value = '';
});

cargarSelectCategoriasFiltros();
cargarCategoriasEnLista();

const operacionesBotton = document.getElementById('operacionesBotton');
const nuevaOperacion = document.getElementById('nueva-operacion')

operacionesBotton.addEventListener('click',function(e){
    pantallaPrincipal.style.display= 'none';
    nuevaOperacion.style.display= 'flex'

})
const descripcionFormulario = document.getElementById('descripcionFormulario');

// SECCION DESCRIPCION
  const descripcionFormularioInicial=[
    'id','descripcion','monto','tipo','categoria','fecha'
  ]
  const consultarDescripcion = () => {
    const descripcion = localStorage.getItem("descripciones");
  
    if (descripcion) {
      return JSON.parse(descripcion);
    } else {
      
      localStorage.setItem("descripciones", JSON.stringify(descripcionFormularioInicial));
    }
  };
  
  consultarDescripcion();
  console.log('funcionando',consultarDescripcion);
  console.log(descripcionFormularioInicial)

  const descripcionFormularioNuevo = () =>{
    const containerDescripcionFormularioNuevo = document.getElementById('containerDescripcionFormularioNuevo');
    containerDescripcionFormularioNuevo.innerHTML = '';
    const formulario = consultarDescripcion();
    formulario.forEach(descripcion =>{
      containerDescripcionFormularioNuevo.innerHTML += `<div>
        <p class="mb-[10px]"  id="${descripcion.id}>${descripcion}</p>
        <span id="${descripcion.id}>${descripcion.descripcion}</span>
       </div>
        <p class="mb-[10px]" id="${monto.id}>${monto}</p>
        <span>${monto.monto}</span>
         <div class="fecha" id="${fecha.id}>
        <p class="mb-[10px]">id="${fecha.data}</p>
        <span>15/05/20024</span>
       </div>
       <div class="containerDescripcionFormularioBoton">
        <p>Acciones</p>
        <button class="text-cyan-600 p-1 m-2 gap-2">editar</button>
        <button class="text-cyan-600 p-1 m-2 gap-2">eliminar</button>
       </div>
       `
    });
    /* selectCategoriasFiltros.innerHTML = ""; 
  const categorias = consultarCategorias();

  categorias.forEach(categoria => {
      selectCategoriasFiltros.innerHTML += `
          <option value="${categoria.nombre}" id="${categoria.id}">${categoria.nombre}</option>
      `;
  }); */
  }

  descripcionFormulario.addEventListener('submit', function(e){
    const operacion = {
      id: uuidv4(),
      descripcion: e.target.descripcion.value,
      monto: e.target.monto.value,
      tipo:e.target.selectTipoOperacion.value,
      categoria:e.target.selectCategoriaOperacion.value,
      fecha:e.target.date.value
    }


  })
 
  
  /*const cargarCategoriasSelectFiltros = () => {
    const selectCategoriasFiltro = document.getElementById(
      "select-filtros-categorias"
    );
  
    selectCategoriasFiltro.innerHTML = "";
  
    consultarCategorias().forEach((categoria) => {
      // selectCategoriasFiltro.innerHTML += `
      //     <option value="${categoria.nombre.toLowerCase()}" class="" id="${
      //   categoria.id
      // }" >${categoria.nombre}</option>
      //     `;
  
      selectCategoriasFiltro.innerHTML += `
         <option value="${categoria.nombre.toLowerCase()}" class="" id="${
        categoria.id
      }">${categoria.nombre}</option>`;
    });
  
    // Esta funcionalidad de editar la vemos la próxima
    //   const btnEditarCategoria = document.getElementById("idDelBoton")
  
    //   btnEditarCategoria.addEventListener("click", () => editarCategoria())
  };
  console.log(cargarCategoriasSelectFiltros)
  
  cargarCategoriasSelectFiltros();*/

//para que aparesca el formulario



// Seccion operacion
const operacion = JSON.parse(localStorage.getItem("operaciones")) || [];



















































