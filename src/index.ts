/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import type { App, Plugin } from 'vue'
import { gamepadAPI } from './lib/gamepadAPI'

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

/** Speed to scroll in milliseconds */
const scrollSpeed:ButtonScrollSpeed = 50
/** Track animation frames */
let gamepadPolling = 0

/**
 * Connect the gamepad and start polling
 * @param event Gamepad event
 */
const connectGamepad = (event:any):void => {
  gamepadAPI.connect(event)
  gamepadPolling = setInterval(gamepadCallback, scrollSpeed)
}

const gamepadCallback = ():void => {
  gamepadAPI.update()

  if (gamepadAPI.buttonPressed('DPad-Up', 'hold')) {
    console.log('up')
  }

  if (gamepadAPI.buttonPressed('DPad-Down', 'hold')) {
    console.log('down')
  }

  if (gamepadAPI.buttonPressed('DPad-Left', 'hold')) {
    console.log('left')
  }

  if (gamepadAPI.buttonPressed('DPad-Right', 'hold')) {
    console.log('right')
  }

  if (gamepadAPI.buttonPressed('A')) {
    console.log('A')
  }

  if (gamepadAPI.buttonPressed('B')) {
    console.log('B')
  }
}

//  Export plugin
export const WTGui:Plugin = {
  install: (app:App, options:WTGuiOptions) => {
    //  Register the menu component
    app.component('WtguiMenu', WtguiMenu)

    /**
     * Register options
     */
    if(options.gameTitle === undefined)
      console.warn('Must provide a Game Title option for WTGui!')
    app.provide('gameTitle', options.gameTitle)

    if(options.fontStyle === undefined) options.fontStyle = 'Arial'
    app.provide('fontStyle', options.fontStyle)

    if(options.titleColor === undefined) options.titleColor = 'rgb(255, 0, 0)'
    app.provide('titleColor', options.titleColor)

    if(options.borderColor === undefined) options.borderColor = 'rgb(255, 0, 0)'
    app.provide('borderColor', options.borderColor)

    if(options.itemColor === undefined) options.itemColor = 'rgb(255, 0, 0)'
    app.provide('itemColor', options.itemColor)

    if(options.focusColor === undefined) options.focusColor = 'rgb(100, 108, 255)'
    app.provide('focusColor', options.focusColor)

    if(options.mainMenuRoute === undefined) options.mainMenuRoute = '/main'
    app.provide('mainMenuRoute', options.mainMenuRoute)

    if(options.defaultScale === undefined) options.defaultScale = 2
    app.provide('defaultScale', options.defaultScale)

    //  Directive for gamepad input
    app.directive('wtgui-gamepad', {
      mounted() {
        window.addEventListener('gamepadconnected', connectGamepad)
      },

      beforeUnmount() {
        clearInterval(gamepadPolling)
        gamepadPolling = 0
        window.removeEventListener('gamepadconnected', gamepadAPI.disconnect)
      }
    })
  }
}
