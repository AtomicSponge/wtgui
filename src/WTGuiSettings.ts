/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import fs from 'fs'
import path from 'node:path'

import { WTGuiError } from "./WTGuiError.js"

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

export interface settings extends actionBindings {
  /** Enable/disable debug mode */
  debugMode:boolean
  /** Width of the gui */
  width:number
  /** Height of the gui */
  height:number
  /** Size of the mouse hitbox */
  mouseSize:number
  /** Speed to scroll menu items */
  scrollSpeed:number
  /** Background color for gui context */
  clearColor:string
  /** Default font size/face */
  defaultFont:string
  /** Default font color */
  defaultFontColor:string
  /** Default menu background color */
  defaultMenuColor:string
  /** Default item background color */
  defaultItemColor:string
  /** Default menu to open when all are closed */
  defaultMenu:string
  /** Font to use for rendering FPS */
  fpsFont:string
  /** Color to use for rendering FPS */
  fpsColor:string
}

export class WTGuiSettings {
  constructor() { return false }

  static #settings:settings = {
    debugMode: false,
    width: Number(0),
    height: Number(0),
    mouseSize: Number(0),
    scrollSpeed: Number(100),
    clearColor: 'rgb(142,142,142)',
    defaultFont: '14px Arial',
    defaultFontColor: 'rgb(255,255,255)',
    defaultMenuColor: 'rgb(0,0,0)',
    defaultItemColor: 'rgb(255,165,0)',
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

  static #settingsLocation = path.normalize(`${process.env.npm_config_local_prefix}/`)

  static get settings() { return WTGuiSettings.#settings }

  /*
   * Save settings
   */
  static loadSettings = () => {
    if (WTGuiSettings.#settingsLoaded)
      throw new WTGuiError(`Settings already loaded!`, WTGuiSettings.loadSettings)
    const settings = JSON.parse(
      fs.readFileSync(`${WTGuiSettings.#settingsLocation}settings.json`, 'utf8'))
    WTGuiSettings.#settings = settings
    WTGuiSettings.#settingsLoaded = true
  }

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
