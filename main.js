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


    

    

})

navBalance.addEventListener('click', function(){
    pantallaPrincipal.style.display ='flex'
    seccionReportes.style.display ='none'
    seccionCategorias.style.display ='none'
     seccionReportes.style.display ='none'
     nuevaOperacion.style.display= 'none'

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
  const categoriaOperaciones = document.getElementById('categoriaOperaciones');
 
  selectCategoriasFiltros.innerHTML = ""; 
  categoriaOperaciones.innerHTML = "";
  const categorias = consultarCategorias();

  categorias.forEach(categoria => {
      selectCategoriasFiltros.innerHTML += `
          <option value="${categoria.nombre}" id="${categoria.id}">${categoria.nombre}</option>
      `;
      categoriaOperaciones.innerHTML += `
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
        <div class="flex gap-[30px] justify-between">
          <p class="bg-emerald-100 rounded p-1 m-2" id="${categoria.id}">${categoria.nombre}</p>
          <button class="text-cyan-600 btn-edit" data-id="${categoria.id}" data-nombre="${categoria.nombre}">Editar</button>
          <button class="text-cyan-600 btn-delete" data-id="${categoria.id}">Eliminar</button>
        </div>
      `;
    
  });
   
   document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', eliminarCategoria);
  });

  document.querySelectorAll('.btn-edit').forEach(button => {
    button.addEventListener('click', editarCategoria);
  });
};
const eliminarCategoria = (e) => {
  const categoriaId = e.target.getAttribute('data-id');
  let categorias = consultarCategorias();
  
  
  categorias = categorias.filter(categoria => categoria.id !== categoriaId);
  
  
  localStorage.setItem('categorias', JSON.stringify(categorias));

  
  cargarCategoriasEnLista();
  cargarSelectCategoriasFiltros();
};
const editarCategoria = (e) => {
  const categoriaId = e.target.getAttribute('data-id');
  const categoriaNombre = e.target.getAttribute('data-nombre');
  
  
  document.getElementById('categoriaId').value = categoriaId;
  document.getElementById('nombreCategoria').value = categoriaNombre;
  
  
  document.getElementById('formularioEditarCategoria').style.display = 'block';
   seccionCategorias.style.display ='none'

};
document.getElementById('editarCategoriaForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const categoriaId = document.getElementById('categoriaId').value;
  const nombreCategoria = document.getElementById('nombreCategoria').value;

  let categorias = consultarCategorias();
  const categoriaIndex = categorias.findIndex(categoria => categoria.id === categoriaId);

  if (categoriaIndex !== -1) {
    categorias[categoriaIndex].nombre = nombreCategoria;  
    localStorage.setItem('categorias', JSON.stringify(categorias));  
  }

  
  cargarCategoriasEnLista();
  cargarSelectCategoriasFiltros();
  document.getElementById('formularioEditarCategoria').style.display = 'none';
  seccionCategorias.style.display='flex'
});






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


// SECCION DESCRIPCION

// Seccion operacion
const operacion = JSON.parse(localStorage.getItem("operaciones")) || [];





















































