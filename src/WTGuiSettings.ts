/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import { WTGui } from "./WTGui.js"
import { WTGuiError } from "./WTGuiError.js"
import { testHex, testRgb } from './algorithms.js'

interface actionBindings {
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

export class WTGuiSettings {
  constructor() { return false }  //  Prevent direct construction

  static #settings:settings = {
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
        select: [ ' ', 'Enter' ],
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

  /** Get the GUI settings */
  static get settings() { return WTGuiSettings.#settings }

  /** Set the mouse size */
  static set mouseSize(size:number) {
    if(WTGui.data.initialized) return
    WTGuiSettings.#settings.mouseSize = size
  }
  /** Set the scroll speed */
  static set scrollSpeed(speed:number) {
    if(WTGui.data.initialized) return
    WTGuiSettings.#settings.scrollSpeed = speed
  }
  /** Set the default font */
  static set defaultFont(font:string) {
    if(WTGui.data.initialized) return
    WTGuiSettings.#settings.defaultFont = font
  }
  /** Set the FPS font */
  static set fpsFont(font:string) {
    if(WTGui.data.initialized) return
    WTGuiSettings.#settings.fpsFont = font
  }
  /** Set the FPS color */
  static set fpsColor(color:string) {
    if(WTGui.data.initialized) return
    if(!testRgb(color) && !testHex(color))
      throw new WTGuiError(`'${color}' - Bad color code while setting fps font color!`, WTGuiSettings.fpsColor)
    WTGuiSettings.#settings.fpsColor = color
  }

  /**
   * Save input binding settings
   */
  static saveInputBindings = () => {
    //
  }

  /**
   * Load input binding settings
   */
  static loadInputBindings = () => {
    if(WTGui.data.initialized) return
  }
}

/**
 * WTGui settings
 */
export const settings = WTGuiSettings.settings
