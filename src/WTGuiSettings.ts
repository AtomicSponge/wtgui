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
import { testHex, testRgb, testPixel } from './algorithms.js'

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
  /** Width of the menu drawing area */
  viewWidth:number
  /** Height of the menu drawing area */
  viewHeight:number
  /** Size of the mouse hitbox */
  mouseSize:number
  /** Speed to scroll menu items */
  scrollSpeed:number
  /** Default menu to open when all are closed */
  defaultMenu:string
  /** Global menu foreground color setting */
  menuFgColor:string
  /** Global menu border color setting */
  menuBrColor:string
  /** Global menu background color setting */
  menuBgColor:string
  /** Global item foreground color setting */
  itemFgColor:string
  /** Global item border color setting */
  itemBrColor:string
  /** Global item background color setting */
  itemBgColor:string
  /** Global menu font size */
  menuFontSize:string
  /** Global item font size */
  itemFontSize:string
  /** Global font face */
  fontFace:string
  /** Font to use for rendering FPS */
  fpsFont:string
  /** Color to use for rendering FPS */
  fpsColor:string
}

export class WTGuiSettings {
  constructor() { return false }  //  Prevent direct construction

  static #settings:settings = {
    viewWidth: Number(0),
    viewHeight: Number(0),
    mouseSize: Number(0),
    scrollSpeed: Number(100),
    defaultMenu: 'main_menu',
    menuFgColor: 'rgb(255,255,255)',
    menuBrColor: 'rgb(255,0,0)',
    menuBgColor: 'rgb(0,0,0,0)',
    itemFgColor: 'rgb(255,255,255)',
    itemBrColor: 'rgb(0,255,0)',
    itemBgColor: 'rgb(0,255,0)',
    menuFontSize: '24px',
    itemFontSize: '16px',
    fontFace: 'Arial',
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

  static set viewWidth(size:number) {
    if(WTGui.data.initialized) return
    WTGuiSettings.#settings.viewWidth = size
  }
  static set viewHeight(size:number) {
    if(WTGui.data.initialized) return
    WTGuiSettings.#settings.viewHeight = size
  }
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
  /** Set the menu foreground color */
  static set menuFgColor(color:string) {
    if(WTGui.data.initialized) return
    if(!testRgb(color) && !testHex(color))
      throw new WTGuiError(`'${color}' - Bad color code while setting menu foreground color!`, WTGuiSettings.menuFgColor)
    WTGuiSettings.#settings.menuFgColor = color
  }
  /** Set the menu border color */
  static set menuBrColor(color:string) {
    if(WTGui.data.initialized) return
    if(!testRgb(color) && !testHex(color))
      throw new WTGuiError(`'${color}' - Bad color code while setting menu border color!`, WTGuiSettings.menuBrColor)
    WTGuiSettings.#settings.menuBrColor = color
  }
  /** Set the menu background color */
  static set menuBgColor(color:string) {
    if(WTGui.data.initialized) return
    if(!testRgb(color) && !testHex(color))
      throw new WTGuiError(`'${color}' - Bad color code while setting menu background color!`, WTGuiSettings.menuBgColor)
    WTGuiSettings.#settings.menuBgColor = color
  }
  /** Set the menu foreground color */
  static set itemFgColor(color:string) {
    if(WTGui.data.initialized) return
    if(!testRgb(color) && !testHex(color))
      throw new WTGuiError(`'${color}' - Bad color code while setting menu foreground color!`, WTGuiSettings.itemFgColor)
    WTGuiSettings.#settings.itemFgColor = color
  }
  /** Set the menu border color */
  static set itemBrColor(color:string) {
    if(WTGui.data.initialized) return
    if(!testRgb(color) && !testHex(color))
      throw new WTGuiError(`'${color}' - Bad color code while setting menu border color!`, WTGuiSettings.itemBrColor)
    WTGuiSettings.#settings.itemBrColor = color
  }
  /** Set the menu background color */
  static set itemBgColor(color:string) {
    if(WTGui.data.initialized) return
    if(!testRgb(color) && !testHex(color))
      throw new WTGuiError(`'${color}' - Bad color code while setting menu background color!`, WTGuiSettings.itemBgColor)
    WTGuiSettings.#settings.itemBgColor = color
  }
  /** Set the global menu font size */
  static set menuFontSize(fontSize:string) {
    if(WTGui.data.initialized) return
    if(!testPixel(fontSize))
      throw new WTGuiError(`'${fontSize}' - Bad pixel format when setting menu font size!`, WTGuiSettings.menuFontSize)
    WTGuiSettings.#settings.menuFontSize = fontSize
  }
  /** Set the global item font size */
  static set itemFontSize(fontSize:string) {
    if(WTGui.data.initialized) return
    if(!testPixel(fontSize))
      throw new WTGuiError(`'${fontSize}' - Bad pixel format when setting item font size!`, WTGuiSettings.itemFontSize)
    WTGuiSettings.#settings.itemFontSize = fontSize
  }
  /** Set the global font face */
  static set fontFace(fontFace:string) {
    if(WTGui.data.initialized) return
    WTGuiSettings.#settings.fontFace = fontFace
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
  static loadInputBindings = (_data:actionBindings) => {
    if(WTGui.data.initialized) return
  }
}

/**
 * WTGui settings
 */
export const settings = WTGuiSettings.settings
