/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

interface GamepadAPI {
  controller:Gamepad | undefined
  connect:(event:any)=>void
  disconnect:()=>void
  update:()=>void
  buttonPressed:()=>void
  buttons:Array<string>
  buttonsCache:Array<string>
  buttonsStatus:Array<string>
  axesStatus:Array<number>
}

export const gamepadAPI:GamepadAPI = {
  controller: undefined,
  connect(event:any) {
    console.log('connected')
    gamepadAPI.controller = event.gamepad
  },
  disconnect() {
    delete gamepadAPI.controller
  },
  update() {},
  buttonPressed() {},
  buttons: [],
  buttonsCache: [],
  buttonsStatus: [],
  axesStatus: [],
}
