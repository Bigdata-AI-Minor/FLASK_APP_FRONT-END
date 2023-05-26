import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: () => import('../views/AboutView.vue')},
    { path: '/library', name: 'library', component: () => import('../views/PhotoLibrary.vue')},
    { path: '/camera', name: 'camera', component: () => import('../views/CameraDisplay.vue')},
    { path: '/profile', name: 'profile', component: () => import('../views/Profile.vue')},
    { path: '/prediction', name: 'prediction', component: () => import('../views/PredectionDecision.vue')},
    { path: '/predictionmodify', name: 'predictionmodify', component: () => import('../views/PredectionChange.vue')}
  ]
})

export default router
