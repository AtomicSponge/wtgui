/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import type { App, Plugin } from 'vue'

//  Menu - regestered in plugin
import WtguiMenu from './components/WtguiMenu.vue'

//  Start menu - called via import
export { default as WTGuiStartMenu } from './routes/WTGuiStartMenu.vue'

//  Items - called via import
export { default as WTGuiButton } from './components/WTGuiButton.vue'
export { default as WTGuiInputSetting } from './components/WTGuiInputSetting.vue'
export { default as WTGuiLabel } from './components/WTGuiLabel.vue'
export { default as WTGuiMessageBox } from './components/WTGuiMessageBox.vue'
export { default as WTGuiSelect } from './components/WTGuiSelect.vue'

//  Export plugin
export const WTGui:Plugin = {
  install: (app:App) => {
    app.component('WtguiMenu', WtguiMenu)
  }
}
