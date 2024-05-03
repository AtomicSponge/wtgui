/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import { settings } from '../WTGuiSettings.js'
import { WTGuiMenuItemError } from '../WTGuiError.js'
import { testHex, testRgb } from '../algorithms.js'

export interface WTGuiItemArgs {
  /** */
  id:string
  /** */
  title:string
  /** */
  font?:string
  /** */
  bgColor?:string
  /** */
  fgColor?:string
  /** */
  posX:number
  /** */
  posY:number
  /** */
  width:number
  /** */
  height:number
  /** */
  radius?:number | Array<number>
  /** */
  bgImage?:string
  /** */
  imgOffsetX?:number
  /** */
  imgOffsetY?:number
  /** */
  scaleImg?:boolean
}

/**
 * WTGui Menu Item base class
 * Extend this to create a new menu item type
 */
export class WTGuiItem {
  #id:string
  #title:string
  #font:string
  #bgColor:string
  #fgColor:string
  #posX:number
  #posY:number
  #width:number
  #height:number
  #radius:number | Array<number>
  #bgImage:string
  #imgOffsetX:number
  #imgOffsetY:number
  #scaleImg:boolean

  #canSelect:boolean
  #scrollable:boolean

  constructor(args:WTGuiItemArgs) {
    if(this.constructor === WTGuiItem)
      throw new WTGuiMenuItemError(`'WTGuiItem' is an interface class.`, this.constructor)
    this.#id = args.id
    this.#title = args.title
    this.#posX = args.posX
    this.#posY = args.posY
    this.#width = args.width
    this.#height = args.height
    this.#radius = args.radius || 0
    this.#font = args.font || settings.defaultFont
    this.#bgColor = args.bgColor || settings.defaultItemColor
    this.#fgColor = args.fgColor || settings.defaultFontColor

    this.#bgImage = args.bgImage || ''
    this.#imgOffsetX = args.imgOffsetX || 0
    this.#imgOffsetY = args.imgOffsetY || 0
    this.#scaleImg = args.scaleImg || false
    this.#canSelect = false
    this.#scrollable = false

    if(!testRgb(this.#bgColor) && !testHex(this.#bgColor))
      throw new WTGuiMenuItemError(`'${this.#bgColor}' - Bad background color code in item '${this.#id}'.`, this.constructor)
    if(!testRgb(this.#fgColor) && !testHex(this.#fgColor))
      throw new WTGuiMenuItemError(`'${this.#fgColor}' - Bad foreground color code in item '${this.#id}'.`, this.constructor)
  }

  onLeft() {}
  onRight() {}
  onSelect(event?:Event, elmX?:number, elmY?:number) {}

  get id() { return this.#id }
  get title() { return this.#title }
  get font() { return this.#font }
  get bgColor() { return this.#bgColor }
  get fgColor() { return this.#fgColor }
  get bgImage() { return this.#bgImage }
  get posX() { return this.#posX }
  get posY() { return this.#posY }
  get width() { return this.#width }
  get height() { return this.#height }
  get radius() { return this.#radius }
  get imgOffsetX() { return this.#imgOffsetX }
  get imgOffsetY() { return this.#imgOffsetY }
  get scaleImg() { return this.#scaleImg }
  get canSelect() { return this.#canSelect }
  get scrollable() { return this.#scrollable }
}
