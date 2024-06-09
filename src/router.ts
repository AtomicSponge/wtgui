/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import { createRouter, createWebHistory } from 'vue-router'

const MainMenu = () => import('./routes/MainMenu.vue')
const TestMenuA = () => import('./routes/TestMenuA.vue')
const TestMenuB = () => import('./routes/TestMenuB.vue')

const routes = [
  { path: '/', component: MainMenu },
  { path: '/testa', component: TestMenuA },
  { path: '/testb', component: TestMenuB }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
