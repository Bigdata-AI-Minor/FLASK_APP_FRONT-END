import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URLL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: () => import('../views/AboutView.vue')},
    { path: '/library', name: 'library', component: () => import('../views/PhotoLibrary.vue')},
    { path: '/camera', name: 'camera', component: () => import('../views/CameraDisplay.vue')},
    { path: '/profile', name: 'profile', component: () => import('../views/Profile.vue')},
    { path: '/prediction/:image', name: 'prediction', component: () => import('../views/PredectionDecision.vue')},
    { path: '/predictionmodify/:image', name: 'predictionmodify', component: () => import('../views/PredectionChange.vue')},
    { path: '/predictionconfirm/:image', name: 'predictionconfirm', component: () => import('../views/PredictionConfirmation.vue')},
    { path: '/details/:image', name: 'imagedetails', component: () => import('../views/ImageDetails.vue')},
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue')}
  ]
})

export default router
