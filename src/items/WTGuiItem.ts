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
import { testHex, testRgb, testPixel } from '../algorithms.js'

export interface WTGuiItemArgs {
  /** Item reference ID */
  id:string
  /** Item title */
  title:string
  /** Item font size */
  fontSize?:string
  /** Item font face */
  fontFace?:string
  /** Item foreground color */
  fgColor?:string
  /** Item border color */
  brColor?:string
  /** Item background color */
  bgColor?:string
  /** Item position X */
  posX:number
  /** Item position Y */
  posY:number
  /** Item width */
  width:number
  /** Item height */
  height:number
  /** Item border width */
  brWidth?:number
  /** Item border radius */
  radius?:number | Array<number>
  /** Item background image */
  bgImage?:string
  /** Background image offset X */
  imgOffsetX?:number
  /** Background image offset Y */
  imgOffsetY?:number
  /** Background image scaling */
  scaleImg?:boolean
}

/**
 * WTGui Menu Item base class
 * Extend this to create a new menu item type
 */
export class WTGuiItem {
  #id:string
  #title:string
  #fontSize:string
  #fontFace:string
  #bgColor:string
  #brColor:string
  #fgColor:string
  #posX:number
  #posY:number
  #width:number
  #height:number
  #brWidth:number
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
    this.#brWidth = args.brWidth || 1
    this.#radius = args.radius || 0
    this.#fontSize = args.fontSize || settings.itemFontSize
    this.#fontFace = args.fontFace || settings.fontFace
    this.#fgColor = args.fgColor || settings.itemFgColor
    this.#brColor = args.brColor || settings.itemBrColor
    this.#bgColor = args.bgColor || settings.itemBgColor

    this.#bgImage = args.bgImage || ''
    this.#imgOffsetX = args.imgOffsetX || 0
    this.#imgOffsetY = args.imgOffsetY || 0
    this.#scaleImg = args.scaleImg || false
    this.#canSelect = false
    this.#scrollable = false

    if(!testPixel(this.#fontSize))
      throw new WTGuiMenuItemError(`'${this.#fontSize}' - Bad pixel format when setting font size in item '${this.#id}`, this.constructor)
    if(!testRgb(this.#fgColor) && !testHex(this.#fgColor))
      throw new WTGuiMenuItemError(`'${this.#fgColor}' - Bad foreground color code in item '${this.#id}'.`, this.constructor)
    if(!testRgb(this.#brColor) && !testHex(this.#brColor))
      throw new WTGuiMenuItemError(`'${this.#brColor}' - Bad border color code in item '${this.#id}'.`, this.constructor)
    if(!testRgb(this.#bgColor) && !testHex(this.#bgColor))
      throw new WTGuiMenuItemError(`'${this.#bgColor}' - Bad background color code in item '${this.#id}'.`, this.constructor)
  }

  onLeft() {}
  onRight() {}
  onSelect(event?:Event, elmX?:number, elmY?:number) {}

  get id() { return this.#id }
  get title() { return this.#title }
  get font() { return this.#fontSize + ' ' + this.#fontFace }
  get bgColor() { return this.#bgColor }
  get brColor() { return this.#brColor }
  get fgColor() { return this.#fgColor }
  get bgImage() { return this.#bgImage }
  get posX() { return this.#posX }
  get posY() { return this.#posY }
  get width() { return this.#width }
  get height() { return this.#height }
  get brWidth() { return this.#brWidth }
  get radius() { return this.#radius }
  get imgOffsetX() { return this.#imgOffsetX }
  get imgOffsetY() { return this.#imgOffsetY }
  get scaleImg() { return this.#scaleImg }
  get canSelect() { return this.#canSelect }
  get scrollable() { return this.#scrollable }
}
