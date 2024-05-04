/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import { WTGui } from './WTGui.js'

export interface actionBindings {
  actionBindings: {
    keys: {
      [index: string]: Array<string>
      up:Array<string>
      down:Array<string>
      left:Array<string>
      right:Array<string>
      select:Array<string>
      cancel:Array<string>
    },
    buttons: {
      [index: string]: Array<string>
      up:Array<string>
      down:Array<string>
      left:Array<string>
      right:Array<string>
      select:Array<string>
      cancel:Array<string>
    }
  }
}

interface settings extends actionBindings {
  /** Enable/disable debug mode */
  debugMode:boolean
  /** Size of the mouse hitbox */
  mouseSize:number
  /** Speed to scroll menu items */
  scrollSpeed:number
  /** Default font size/face */
  defaultFont:string
  /** Default menu to open when all are closed */
  defaultMenu:string
  /** Font to use for rendering FPS */
  fpsFont:string
  /** Color to use for rendering FPS */
  fpsColor:string
}

class WTGuiSettings {
  constructor() { return false }  //  Prevent direct construction

  static #settings:settings = {
    debugMode: false,
    mouseSize: Number(0),
    scrollSpeed: Number(100),
    defaultFont: '14px Arial',
    defaultMenu: 'main_menu',
    fpsFont: 'Bold 16px Arial',
    fpsColor: 'rgb(255,165,0)',

    actionBindings: {
      keys: {
        up: [ 'ArrowUp', 'W' ],
        down: [ 'ArrowDown', 'S' ],
        left: [ 'ArrowLeft', 'A' ],
        right: [ 'ArrowRight', 'D' ],
        select: [ ' ' ],
        cancel: [ 'Escape' ]
      },
      buttons: {
        up: [ 'idk' ],
        down: [ 'idk' ],
        left: [ 'idk' ],
        right: [ 'idk' ],
        select: [ 'idk' ],
        cancel: [ 'idk' ]
      }
    }
  }

  static #settingsLoaded = false

  static get settings() { return WTGuiSettings.#settings }

  static set setDebug(value:boolean) { WTGuiSettings.#settings.debugMode = value }

  /*
   * Load settings
   */
  /*static loadSettings = () => {
    if (WTGuiSettings.#settingsLoaded)
      throw new WTGuiError(`Settings already loaded!`, WTGuiSettings.loadSettings)
    //const settings = JSON.parse(
      //fs.readFileSync(`${WTGuiSettings.#settingsLocation}settings.json`, 'utf8'))
    WTGuiSettings.#settings = settings
    WTGuiSettings.#settingsLoaded = true
  }*/

  /*
   * Save input binding settings
   */
  static saveInputBindings = () => {
    //
  }
}

/**
 * WTGui settings
 */
export const settings = WTGuiSettings.settings

/**
 * Save the input bindings
 */
export const WTGuiSaveInputBindings = () => {
  try { WTGuiSettings.saveInputBindings() } catch (error) { throw error }
}

export const WTGuiEnableDebugging = () => {
  if(WTGui.data.initialized) {
    console.log(`Unable to start debugging while WTGui is running`)
    return
  }
  WTGuiSettings.setDebug = true
}
