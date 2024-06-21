/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

export const gamepadAPI:GamepadAPI = {
  controller: undefined,
  //  Works, but need to figure out mappings
  buttons: [
    'DPad-Up','DPad-Down','DPad-Left','DPad-Right',
    'Start','Back','Axis-Left','Axis-Right',
    'LB','RB','Power','A','B','X','Y'
  ],
  buttonsCache: [],
  buttonsStatus: [],
  axesStatus: [],

  connect(event:any) {
    gamepadAPI.controller = event.gamepad
  },

  disconnect() {
    delete gamepadAPI.controller
  },

  update() {
    if(gamepadAPI.controller === undefined) return

    gamepadAPI.buttonsCache = []
    for (let i = 0; i < gamepadAPI.buttonsStatus.length; i++) {
      gamepadAPI.buttonsCache[i] = gamepadAPI.buttonsStatus[i]
    }

    const pressed = []
    if (gamepadAPI.controller.buttons) {
      for (let j = 0; j < gamepadAPI.controller.buttons.length; j++) {
        if (gamepadAPI.controller.buttons[j].pressed) {
          pressed.push(gamepadAPI.buttons[j])
        }
      }
    }

    const axes = []
    if (gamepadAPI.controller.axes) {
      for (let k = 0; k < gamepadAPI.controller.axes.length; k++) {
        axes.push(Number(gamepadAPI.controller.axes[k].toFixed(2)))
      }
    }

    gamepadAPI.axesStatus = axes
    gamepadAPI.buttonsStatus = pressed

    return pressed
  },

  buttonPressed(button, hold) {
    let newPress = false

    for (let i = 0; i < gamepadAPI.buttonsStatus.length; i++) {
      if (gamepadAPI.buttonsStatus[i] === button) {
        newPress = true
        if (!hold) {
          for (let j = 0; j < gamepadAPI.buttonsCache.length; j++) {
            newPress = (gamepadAPI.buttonsCache[j] !== button)
          }
        }
      }
    }
    return newPress
  }
}
