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
            <td><button @click="modificar(index)">Modificar</button></td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios'
  import { ref } from 'vue';
  
  const price = ref('');
  const title = ref('');
  const description = ref('');
  const image = ref('');
  const category = ref('');
  const productos = ref([]); 
  
  async function cargarProductos() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response.status === 200) {
        productos.value = response.data; 
        }
    } catch (error) {
      console.error('Error al cargar productos', error);
    }
  }
  
  function crear() {
    const nuevoProd = {
      price: price.value,
      title: title.value,
      description: description.value,
      image: image.value,
      category: category.value,
    };
  
    productos.value.push(nuevoProd);
  
    price.value = '';
    title.value = '';
    description.value = '';
    image.value = '';
    category.value = '';
  }
  
  cargarProductos();
  
  function modificar(index){
    
  }

  function eliminar(index){
    productos.value.splice(index, 1);
  }
  </script>
  
  <style scoped>
  </style>
  