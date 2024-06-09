import { createRouter, createWebHistory } from 'vue-router'

const MainMenu = () => import('./routes/MainMenu.vue')

const routes = [
  { path: '/', component: MainMenu }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
