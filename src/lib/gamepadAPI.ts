/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Controls_Gamepad_API
 */

/** Speed to scroll in milliseconds */
const scrollSpeed:ButtonScrollSpeed = 50
/** Track animation frames */
let gamepadPolling = 0

const gamepadAPI:GamepadAPI = {
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

  /**
   * Connect a new gamepad
   * @param event Gamepad event
   */
  connect(event:any) {
    gamepadAPI.controller = event.gamepad
  },

  /** Disconnect gamepad */
  disconnect() {
    delete gamepadAPI.controller
  },

  /**
   * Poll gamepad
   * @returns Pressed buttons (for debugging)
   */
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

  /**
   * Check for a button press
   * @param button Button to test for
   * @param hold If button is being held
   * @returns If the button is a new press
   */
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

/**
 * Connect the gamepad and start polling
 * @param event Gamepad event
 */
export const connectGamepad = (event:any):void => {
  gamepadAPI.connect(event)
  gamepadPolling = setInterval(gamepadCallback, scrollSpeed)
}

/**
 * Disconnect the gamepad and stop polling
 */
export const disconnectGamepad = ():void => {
  clearInterval(gamepadPolling)
  gamepadPolling = 0
  gamepadAPI.disconnect
}

/**
 * Gamepad polling loop
 */
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
