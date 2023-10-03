<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IniciarSesion from './views/IniciarSesion.vue'
import Crud from './views/Crud.vue'
</script>

<template>
<main>
  <section>
 <!-- <IniciarSesion></IniciarSesion>-->
     <Crud></Crud> 
   </section>
</main> 
</template>
<style scoped>
section{
margin: 0;
padding: 0;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
height: 100%;
background: rgb(186, 207, 228);
}

</style>

