/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router.ts'
import './style.styl'

//import { WTGui } from '@wtfsystems/wtgui'
import { WTGui } from './index.ts'

//  Optional, but recommended
const pinia = createPinia()

createApp(App)
  .use(WTGui, {
    gameTitle: 'WTGui Test',
    fontStyle: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    titleColor: 'aqua',
    borderColor: 'orange',
    itemColor: 'rgb(0, 255, 0)'
  })
  .use(router)
  .use(pinia)
  .mount('#app')
