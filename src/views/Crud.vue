<template>
    <div class="crud">
      <div class="agregar">
      <h1>Agregar producto</h1>
      <div class="input">
      <label for="">Título del producto</label>
      <input type="text" name="" id="title" v-model="title">
    </div>
    <div class="input">
      <label for="">Precio del producto</label>
      <input type="text" name="" id="price" v-model="price">
    </div>
    <div class="input">
      <label for="">Descripción del producto</label>
      <input type="text" name="" id="description" v-model="description">
    </div>
    <div class="input">
      <label for="">Imagen del producto</label>
      <input type="text" name="" id="image" v-model="image">
    </div>
    <div class="input">
      <label for="">Categoría del producto</label>
      <input type="text" name="" id="category" v-model="category">
    </div>
      <button @click="crear(nuevoProd)">Agregar producto</button>
    </div>
    <div class="table">
     <table class="tabla">
        <thead>
          <tr>
            <th>Precio</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Categoría</th>
            <th>Borrar</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) of productos" :key="index">
            <td>{{ producto.price }}</td>
            <td>{{ producto.title }}</td>
            <td>{{ producto.description }}</td>
            <td><img :src="producto.image" style="width:100px; height: 100px;;"/></td>
            <td>{{ producto.category }}</td>
            <td><button @click="eliminar(index)">Borrar</button></td>
            <td><button @click="editarProducto(index)">Modificar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
      <div v-if="productoEnEdicion">
      <h1>Editar</h1>
      <label for="">title</label>
      <input type="text" name="" id="title" v-model="productoEnEdicion.title">
      <br>
      <label for="">price</label>
      <input type="text" name="" id="price" v-model="productoEnEdicion.price">
      <br>
      <label for="">description</label>
      <input type="text" name="" id="description" v-model="productoEnEdicion.description">
      <br>
      <label for="">image</label>
      <input type="text" name="" id="image" v-model="productoEnEdicion.image">
      <br>
      <label for="">category</label>
      <input type="text" name="" id="category" v-model="productoEnEdicion.category">
      <br>
      <button @click="actualizarProducto">Modificar</button>
      <button @click="cerrar">Cerrar</button>
    </div>
  </template>
  <style scoped>
  .crud{
    display: grid;
    grid-template-areas: "agregar table";
    gap: 0px;
    position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
  }
  .agregar{
    grid-area: agregar;
  padding: 20px; /* Añade espacio interno para los elementos */
  background-color: #f9f9f9; /* Fondo gris claro */
  }
  .table{
   grid-area: table;
  overflow-x: auto; /* Agrega una barra de desplazamiento horizontal si es necesario */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px; /* Añade espacio interno para los elementos */
  max-height: 500px; /* Altura máxima para evitar el desbordamiento */

  }
  h1, tr th{
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid silver;
  
}
.crud .agregar{
  padding: 0 40px;
box-sizing: border-box;
}

.input input{
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}
.input span::before{
  content: '';
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #6c3483;
  transition:.5s ;
}
.input input:focus ~ span::before,
.input input:focus ~ span::before{
  width: 100%;
}
button{
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #6c3483;
  border-radius: 25px;
  font-size: 18px;
  color: white;
  outline: none;
}
button:hover{
border-color: purple;
transition: .5s;
}
/* Estilos para la tabla */
.table {
  width: 100%;
  overflow-x: auto; /* Agrega una barra de desplazamiento horizontal si es necesario */
}

.tabla {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #fff;
  margin-bottom: 20px; /* Espacio en la parte inferior de la tabla */
}

/* Estilos para las cabeceras de la tabla */
.tabla th {
  background-color: #6c3483;
  color: white;
  text-align: left;
  padding: 10px;
  border: 1px solid #6c3483;
}

/* Estilos para las celdas de la tabla */
.tabla td {
  padding: 10px;
  border: 1px solid #ccc;
}

/* Estilos para las filas impares */
.tabla tr:nth-child(odd) {
  background-color: #f2f2f2;
}

/* Estilos para las celdas de encabezado y resaltar fila al pasar el ratón */
.tabla th, .tabla td {
  text-align: left;
}

/* Estilos para resaltar la fila al pasar el ratón por encima */
.tabla tr:hover {
  background-color: #e0e0e0;
}

/* Estilos para el ancho de las columnas (ajusta según tus necesidades) */
/* .tabla th:nth-child(1), .tabla td:nth-child(1) {
  width: 20%;
}
.tabla th:nth-child(2), .tabla td:nth-child(2) {
  width: 30%;
}
...
*/

  </style>
  
  <script setup lang="ts">
  import router from '@/router';
import axios from 'axios'
  import { ref } from 'vue';
  const id = ref('');
  const price = ref('');
  const title = ref('');
  const description = ref('');
  const image = ref('');
  const category = ref('');
  const productos = ref([]); 
  const productoEnEdicion = ref(null);
  const productId = ref('');
  
  async function cargarProductos() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response.status === 200) {
        productos.value = response.data; 
        console.log("productsossssss",productos)
        }
    } catch (error) {
      console.error('Error al cargar productos', error);
    }
  }
  
  function crear() {
    const nuevoProd = {
      id: productos.value.length + 1,  
      price: price.value,
      title: title.value,
      description: description.value,
      image: image.value,
      category: category.value,
    };
    productos.value.push(nuevoProd);
    console.log(nuevoProd)
    console.log(nuevoProd.price)
    price.value = '';
    title.value = '';
    description.value = '';
    image.value = '';
    category.value = '';
  }
  cargarProductos();

   async function eliminar(index) {
  const productoAEliminar = productos.value[index];

  try {
    const response = await axios.delete(`https://fakestoreapi.com/products/${productoAEliminar.id}`);

    if (response.status === 200) {
      console.log('Producto eliminado exitosamente');
      // Elimina el producto localmente
      productos.value.splice(index, 1);
    } else {
      console.error('Error al eliminar el producto');
    }
  } catch (error) {
    console.error('Error al eliminar el producto', error);
  }
}


function editarProducto(index) {
  // Verifica si productoEnEdicion.value es null o si su propiedad id no es válida
  if (!productos.value[index].id) {
    console.error('El producto seleccionado para edición no tiene un ID válido');
    return;
  }

  // Establece el producto seleccionado para edición
  productoEnEdicion.value = productos.value[index];
}
async function actualizarProducto() {
  try {
    // Verifica que productoEnEdicion.value no sea null y tenga una propiedad id
    if (!productoEnEdicion.value || !productoEnEdicion.value.id) {
      console.error('El producto en edición es inválido o no tiene un ID');
      return;
    }

    const response = await axios.put(`https://fakestoreapi.com/products/${productoEnEdicion.value.id}`, {
      title: productoEnEdicion.value.title,
      price: productoEnEdicion.value.price,
      description: productoEnEdicion.value.description,
      image: productoEnEdicion.value.image,
      category: productoEnEdicion.value.category
    });

    if (response.status === 200) {
      console.log('Producto actualizado exitosamente');
      const index = productos.value.findIndex(p => p.id === productoEnEdicion.value.id);
      productos.value[index] = response.data;
      productoEnEdicion.value = null;
    } else {
      console.error('Error al actualizar el producto');
    }
  } catch (error) {
    console.error('Error al actualizar el producto', error);
  }
}
function cerrar(){

  console.log("CErrar app")
}  </script>
  
