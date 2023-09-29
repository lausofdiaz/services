<template>
    <div class="inicioSesion">
      <h1>Inicio de Sesión</h1>
      <label for="">Usuario</label>
      <input type="text" v-model="username">
      <br>
      <label for="">Contraseña</label>
      <input type="password" v-model="password">
      <br>
      <button  @click="iniciarSesion">Iniciar Sesión</button>
    </div>
    <Crud></Crud>
  </template>
  
  <style scoped>
 
  </style>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import Crud from '../views/Crud.vue'
  import axios from 'axios'
  import { ref } from 'vue';
   
  const username = ref('');
  const password = ref('');
  const router = useRouter();
  
  async function iniciarSesion() {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username.value,
        password: password.value
      });
  
      if (response.status === 200) {
        console.log('Inicio de sesión exitoso');
        console.log(response.data); 
        const token = response.data.token;
        alert("Inicio de sesión exitoso");
        router.push(`/Crud?token=${token}`);
      
      } else {
        console.error('Inicio de sesión fallido');
        alert("Inicio de sesión fallido")
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert("Error al iniciar sesión")
      username.value='';
      password.value='';
    }
  }
  </script>
  