<template>
  <nav id="nav">
      <ul>
          <li><a href="#agregar"><i>Crear</i></a></li>
      </ul>
      <ul>
          <li><a href="#"><i>Cerrar sesión</i></a></li>
      </ul>
  </nav>
  <div class="table" id="table">
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
            <td><button @click="cargarDatosEdicion(index)">
            <a href="#edit"><i>Modificar</i></a>
              </button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="agregar" id="agregar">
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
    <br>
      <button @click="crear()">Agregar producto</button>
    </div>

    

<div v-if="productoEnEdicion" class="edit" id="edit">
  <h1>Editar</h1>
  <div class="input">
  <label for="">Título</label>
  <input type="text" name="title" id="title" v-model="productoEnEdicion.title">
</div>
<div class="input">
  <label for="">Precio</label>
  <input type="text" name="price" id="price" v-model="productoEnEdicion.price">
  </div>
  <div class="input">
  <label for="">Descripción</label>
  <input type="text" name="description" id="description" v-model="productoEnEdicion.description">
</div>
<div class="input">
  <label for="">Imagen</label>
  <input type="text" name="image" id="image" v-model="productoEnEdicion.image">
</div>
  <div class="input">
  <label for="">Categoría</label>
  <input type="text" name="category" id="category" v-model="productoEnEdicion.category">
  </div>
  <br>
  <button @click="actualizarProducto(producto)"><a href="#nav"><i>Modificar</i></a></button>
</div>
</template>

<script setup lang="ts">
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
  cargarProductos();
  async function crear() {
    const nuevoProd = {
      id: productos.value.length + 1,  
      price: price.value,
      title: title.value,
      description: description.value,
      image: image.value,
      category: category.value,
    };
    const response = await axios.post('https://fakestoreapi.com/products', nuevoProd);

    if (response.status === 200) {
      console.log('Producto creado exitosamente', response.data);
      alert('Producto creado exitosamente')
      // Agrega el nuevo producto a la lista localmente
      productos.value.push(response.data);

      // Limpia los campos después de la creación exitosa
      price.value = '';
      title.value = '';
      description.value = '';
      image.value = '';
      category.value = '';
    } else {
      console.error('Error al crear el producto');
    }
  }

  
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

async function cargarDatosEdicion(index) {
    // Cargar los datos del producto en el formulario de edición
    productoEnEdicion.value = {...productos.value[index]};
  }

  async function actualizarProducto(index) {
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
      alert('Producto actualizado exitosamente');
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
</script>

<style scoped>
nav {
    background-color: #333; 
    overflow: hidden;
    width: 100%;
    height: 70px;  
}
nav ul {
    list-style-type: none; 
 }
nav ul li {
    float: left; 
    margin-right: 20px; 
}
nav ul li a {
    text-decoration: none;
    color: white; 
}
button a {
    text-decoration: none;
    color: white; 
    font-style: normal;
  }
.agregar{
  padding: 20px; 
  background-color: #f9f9f9; 
  }
  .table{
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
.agregar{
  padding: 0 40px;
box-sizing: border-box;
}
.input input{
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  background: none;
  border: none; /* Elimina los bordes predeterminados */
  border-bottom: 1px solid #000; /* Establece el borde inferior */
  outline: none; /* Elimina el contorno predeterminado al hacer clic */
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
  background: #000000;
  border-radius: 25px;
  font-size: 18px;
  color: white;
  outline: none;
}
button:hover{
background: rgb(80, 74, 80);
transition: .5s;
}
</style>
