import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: () => import('../views/AboutView.vue')},
    { path: '/library', name: 'library', component: () => import('../views/PhotoLibrary.vue')},
    { path: '/camera', name: 'camera', component: () => import('../views/CameraDisplay.vue')},
  ]
})

export default router
