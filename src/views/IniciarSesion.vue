<template>
     <div class="inicioSesion">
        <h1>Inicio de Sesión</h1>
        <label for="">Usuario</label>
        <input type="text" v-model="username">
        <br>
        <label for="">Contraseña</label>
        <input type="password" v-model="password">
        <br>
        <button type="button" @click="iniciarSesion()">Iniciar Sesión</button>
    </div>
</template>
<style scoped>
</style>

<script setup lang="ts">
import axios from 'axios'
import { ref, defineProps, defineEmits } from 'vue';

const username = ref('');
const password = ref('');
const inicioSe = ref([]);


function iniciarSesion(){
    const datos = {
        username: username.value,
        password: password.value
    }; 

console.log(datos)
}

</script>