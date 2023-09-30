<template>
    <div class="crud">
      <h1>Crud</h1>
      <label for="">title</label>
      <input type="text" name="" id="title" v-model="title">
      <br>
      <label for="">price</label>
      <input type="text" name="" id="price" v-model="price">
      <br>
      <label for="">description</label>
      <input type="text" name="" id="description" v-model="description">
      <br>
      <label for="">image</label>
      <input type="text" name="" id="image" v-model="image">
      <br>
      <label for="">category</label>
      <input type="text" name="" id="category" v-model="category">
      <br>
      <button @click="crear(nuevoProd)">Agregar</button>
     <table class="tabla">
        <thead>
          <tr>
            <th>price</th>
            <th>title</th>
            <th>description</th>
            <th>image</th>
            <th>category</th>
            <th>borrar</th>
            <th>modificar</th>
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
            <td><button @click="editarProducto (index)">Modificar</button></td>
            
          </tr>
        </tbody>
      </table>

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
      id: productos.value.length + 1, // Utiliza la longitud de la matriz como ID
      price: price.value,
      title: title.value,
      description: description.value,
      image: image.value,
      category: category.value,
    };
    productos.value.push(nuevoProd);
    console.log(nuevoProd)
    console.log(nuevoProd.price)
    console.log(nuevoProd.id)
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
}


  </script>
  
  <style scoped>
  </style>
  