<template>
 
    <div class="inicioSesion">
     
      <h1>Inicio de Sesión</h1>
     <div class="form">
      <div  class="iniciarSes">
      <input type="text" v-model="username" placeholder="Usuario">

    </div>
    <div class="iniciarSes">
      <input type="password" v-model="password" placeholder="Contraseña">
    </div>
      <button  @click="iniciarSesion">Iniciar Sesión</button>
    <div class="re"></div>
    <br>
  </div>
    </div>

    <!--<Crud></Crud>
      <label for="">mor_2314</label><br>
      <label for="">83r5^_</label><br>
    -->
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import axios from 'axios'
  import { ref } from 'vue';
  import  Crud  from "../views/Crud.vue";
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
        localStorage.setItem('token', token);
        alert("Inicio de sesión exitoso");
        router.push({ name: 'Crud', query: { token } });

      }else {
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
  
<style scoped>
.inicioSesion{
position:absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 400px;
background: white;
border-radius: 10px;

}
.inicioSesion h1{
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid silver;
  
}
.inicioSesion .form{
padding: 0 40px;
box-sizing: border-box;
}
.form .iniciarSes{
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}
.iniciarSes input{
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}

.iniciarSes span::before{
  content: '';
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #6c3483;
  transition:.5s ;
}


.iniciarSes input:focus ~ span::before,
.iniciarSes input:focus ~ span::before{
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
.re{
  margin: 30px 0;
}
</style>