/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Controls_Gamepad_API
 */

export const gamepadAPI:GamepadAPI = {
  controller: undefined,
  buttons: [
    'B', 'A', 'Y', 'X', 'LB', 'RB', 'LT', 'RT',
    'Back', 'Start', 'Axis-Left', 'Axis-Right',
    'DPad-Up', 'DPad-Down', 'DPad-Left', 'DPad-Right',
    '', 'Power'
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
