import { createRouter, createWebHistory } from 'vue-router'
import IniciarSesion from '../views/IniciarSesion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/IniciarSesion',
      name: 'IniciarSesion',
      component: IniciarSesion
    }
  ]
})

export default router
