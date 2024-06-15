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
  .use(WTGui)
  .use(router)
  .use(pinia)
  .mount('#app')
