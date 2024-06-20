/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

export const gamepadAPI:GamepadAPI = {
  controller: undefined,
  buttons: [],
  buttonsCache: [],
  buttonsStatus: [],
  axesStatus: [],

  connect(event:any) {
    console.log('connected')
    gamepadAPI.controller = event.gamepad
  },

  disconnect() {
    delete gamepadAPI.controller
  },

  update() {
    if(gamepadAPI.controller === undefined) return

    gamepadAPI.buttonsCache = []
    for (let k = 0; k < gamepadAPI.buttonsStatus.length; k++) {
      gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k]
    }

    const pressed = []
    if (gamepadAPI.controller.buttons) {
      for (let b = 0; b < gamepadAPI.controller.buttons.length; b++) {
        if (gamepadAPI.controller.buttons[b].pressed) {
          pressed.push(gamepadAPI.buttons[b])
        }
      }
    }

    const axes = []
    if (gamepadAPI.controller.axes) {
      for (let a = 0; a < gamepadAPI.controller.axes.length; a++) {
        axes.push(gamepadAPI.controller.axes[a].toFixed(2))
      }
    }

    gamepadAPI.axesStatus = axes
    gamepadAPI.buttonsStatus = pressed

    return pressed
  },

  buttonPressed() {}
}
