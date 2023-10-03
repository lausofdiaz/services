import { createRouter, createWebHistory } from 'vue-router'
import IniciarSesion from '../views/IniciarSesion.vue'
import Crud from '../views/Crud.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'IniciarSesion',
      component: IniciarSesion
    },
    {
      path: '/Crud',
      name: 'Crud',
      component: Crud,
      meta: { requiresAuth: true }, 
    }
  ]
})

export default router
