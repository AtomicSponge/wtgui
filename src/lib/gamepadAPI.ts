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
const scrollSpeed:ButtonScrollSpeed = 100
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
 * Fakes keyboard input
 */
const gamepadCallback = ():void => {
  gamepadAPI.update()

  if (gamepadAPI.buttonPressed('DPad-Up', 'hold')) {
    const event = new KeyboardEvent('keydown', { key: 'w', code: 'KeyW' })
    window.dispatchEvent(event)
  }

  if (gamepadAPI.buttonPressed('DPad-Down', 'hold')) {
    const event = new KeyboardEvent('keydown', { key: 's', code: 'KeyS' })
    window.dispatchEvent(event)
  }

  if (gamepadAPI.buttonPressed('DPad-Left', 'hold')) {
    const event = new KeyboardEvent('keydown', { key: 'a', code: 'KeyA' })
    window.dispatchEvent(event)
  }

  if (gamepadAPI.buttonPressed('DPad-Right', 'hold')) {
    const event = new KeyboardEvent('keydown', { key: 'd', code: 'KeyD' })
    window.dispatchEvent(event)
  }

  if (gamepadAPI.buttonPressed('A')) {
    const eventa = new KeyboardEvent('keydown', { key: ' ', code: 'Space' })
    window.dispatchEvent(eventa)
    const eventb = new KeyboardEvent('keyup', { key: ' ', code: 'Space' })
    window.dispatchEvent(eventb)
  }

  if (gamepadAPI.buttonPressed('B')) {
    const eventa = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' })
    window.dispatchEvent(eventa)
    const eventb = new KeyboardEvent('keyup', { key: 'Escape', code: 'Escape' })
    window.dispatchEvent(eventb)
  }
}
