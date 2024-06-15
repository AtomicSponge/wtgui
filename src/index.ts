/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import type { App, Plugin } from 'vue'

//  Menu
//export { default as WtguiMenu } from './WtguiMenu.vue'
import WtguiMenu from './components/WtguiMenu.vue'
//export { default as WtguiMenuRow } from './WtguiMenuRow.vue'
import WtguiMenuRow from './components/WtguiMenuRow.vue'

//  Items
export { default as WTGuiButton } from './components/WTGuiButton.vue'
export { default as WTGuiInputSetting } from './components/WTGuiInputSetting.vue'
export { default as WTGuiLabel } from './components/WTGuiLabel.vue'
export { default as WTGuiMessageBox } from './components/WTGuiMessageBox.vue'
export { default as WTGuiSelect } from './components/WTGuiSelect.vue'

export const WTGui:Plugin = {
  install: (app:App) => {
    app.component('WtguiMenu', WtguiMenu)
    app.component('WtguiMenuRow', WtguiMenuRow)
  }
}
