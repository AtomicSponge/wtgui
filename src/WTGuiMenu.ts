/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import { settings } from './WTGuiSettings.js'
import { WTGuiItem } from './items/WTGuiItem.js'
import { WTGuiMenuError } from './WTGuiError.js'
import { testHex, testRgb, testPixel } from './algorithms.js'

interface WTGuiMenuArgs {
  /** Menu reference ID */
  id:string
  /** Menu title */
  title?:string
  /** Menu title X position */
  titleX?:number
  /** Menu title Y position */
  titleY?:number
  /** Menu title text alignment */
  textAlign?:CanvasTextAlign
  /** Menu font size */
  fontSize?:string
  /** Menu font face */
  fontFace?:string
  /** Menu foreground color */
  fgColor?:string
  /** Menu border color */
  brColor?:string
  /** Menu background color */
  bgColor?:string
  /** Menu position X */
  posX:number
  /** Menu position Y */
  posY:number
  /** Menu width */
  width:number
  /** Menu height */
  height:number
  /** Menu border width */
  brWidth?:number
  /** Menu border radius */
  radius?:number | Array<number>
  /** Menu background image */
  bgImage?:string
  /** Backround image scaling */
  scaleImg?:number
  /** Backround image X offset */
  imgOffsetX?:number
  /** Backround image Y offset */
  imgOffsetY?:number
}

/**
 * WTGui Menu Object
 */
export class WTGuiMenu {
  #id:string
  #title:string
  #titleX:number
  #titleY:number
  #textAlign:CanvasTextAlign
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
  #scaleImg:number
  #imgOffsetX:number
  #imgOffsetY:number
  #items:Array<WTGuiItem>
  #selectableItems:Array<WTGuiItem>

  /**
   * 
   * @param args 
   */
  constructor(args:WTGuiMenuArgs) {
    this.#id = args.id
    this.#title = args.title || ''
    this.#titleX = args.titleX || 0
    this.#titleY = args.titleY || 0
    this.#textAlign = args.textAlign || 'start'
    this.#posX = args.posX
    this.#posY = args.posY
    this.#width = args.width
    this.#height = args.height
    this.#brWidth = args.brWidth || 1
    this.#radius = args.radius || 0
    this.#fontSize = args.fontSize || settings.menuFontSize
    this.#fontFace = args.fontFace || settings.fontFace
    this.#fgColor = args.fgColor || settings.menuFgColor
    this.#brColor = args.brColor || settings.menuBrColor
    this.#bgColor = args.bgColor || settings.menuBgColor
    this.#bgImage = args.bgImage || ''
    this.#scaleImg = args.scaleImg || 0
    this.#imgOffsetX = args.imgOffsetX || 0
    this.#imgOffsetY = args.imgOffsetY || 0
    this.#items = []
    this.#selectableItems = []

    if(!testPixel(this.#fontSize))
      throw new WTGuiMenuError(`'${this.#fontSize}' - Bad pixel format when setting font size in menu '${this.#id}`, this.constructor)
    if(!testRgb(this.#fgColor) && !testHex(this.#fgColor))
      throw new WTGuiMenuError(`'${this.#fgColor}' - Bad foreground color code in menu '${this.#id}'`, this.constructor)
    if(!testRgb(this.#brColor) && !testHex(this.#brColor))
      throw new WTGuiMenuError(`'${this.#brColor}' - Bad border color code in menu '${this.#id}'`, this.constructor)
    if(!testRgb(this.#bgColor) && !testHex(this.#bgColor))
      throw new WTGuiMenuError(`'${this.#bgColor}' - Bad background color code in menu '${this.#id}'`, this.constructor)
  }

  /**
   * Add an item to the menu
   * @param itemObj GUI Item object to add
   */
  addItem = (itemObj:WTGuiItem) => {
    if(!(itemObj instanceof WTGuiItem))  //  Verify proper item object
      throw new WTGuiMenuError(`Item is not a valid 'WTGuiItem' object.`, this.addItem)
    //  Verify item does not already exist
    if(this.#items.find(elm => elm.id === itemObj.id) !== undefined)
      throw new WTGuiMenuError(`Item ID '${itemObj.id}' already exists.`, this.addItem)
    this.#items.push(itemObj)  //  Add item
    if(itemObj.canSelect) this.#selectableItems.push(itemObj)
  }

  get id() { return this.#id }
  get title() { return this.#title }
  get titleX() { return this.#titleX }
  get titleY() { return this.#titleY }
  get textAlign() { return this.#textAlign }
  get font() { return this.#fontSize + ' ' + this.#fontFace }
  get bgColor() { return this.#bgColor }
  get brColor() { return this.#brColor }
  get fgColor() { return this.#fgColor }
  get posX() { return this.#posX }
  get posY() { return this.#posY }
  get width() { return this.#width }
  get height() { return this.#height }
  get brWidth() { return this.#brWidth }
  get radius() { return this.#radius }
  get bgImage() { return this.#bgImage }
  get scaleImg() { return this.#scaleImg }
  get imgOffsetX() { return this.#imgOffsetX }
  get imgOffsetY() { return this.#imgOffsetY }
  get items() { return this.#items }
  get selectableItems() { return this.#selectableItems }
}
