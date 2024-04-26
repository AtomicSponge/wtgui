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
import { testRgb } from './algorithms.js'

export interface WTGuiMenuArgs {
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
  bgImage?:string
  /** */
  scaleImg?:number
  /** */
  imgOffsetX?:number
  /** */
  imgOffsetY?:number
  /** */
  selectableItems:Array<WTGuiItem>
}

/**
 * WTGui Menu Object
 */
export class WTGuiMenu {
  #id:string
  #title:string
  #font:string
  #bgColor:string
  #fgColor:string
  #posX:number
  #posY:number
  #width:number
  #height:number
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
    this.#title = args.title
    this.#posX = args.posX
    this.#posY = args.posY
    this.#width = args.width
    this.#height = args.height
    this.#font = args.font || settings.defaultFont
    this.#bgColor = args.bgColor || settings.defaultMenuColor
    this.#fgColor = args.fgColor || settings.defaultFontColor
    this.#bgImage = args.bgImage || ''
    this.#scaleImg = args.scaleImg || 0
    this.#imgOffsetX = args.imgOffsetX || 0
    this.#imgOffsetY = args.imgOffsetY || 0
    this.#items = []
    this.#selectableItems = []

    if(!testRgb(this.#bgColor))
      throw new WTGuiMenuError(`'${this.#bgColor}' - Bad color code`, this.constructor)
    if(!testRgb(this.#fgColor))
      throw new WTGuiMenuError(`'${this.#fgColor}' - Bad color code`, this.constructor)
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
  get font() { return this.#font }
  get bgColor() { return this.#bgColor }
  get fgColor() { return this.#fgColor }
  get posX() { return this.#posX }
  get posY() { return this.#posY }
  get width() { return this.#width }
  get height() { return this.#height }
  get bgImage() { return this.#bgImage }
  get scaleImg() { return this.#scaleImg }
  get imgOffsetX() { return this.#imgOffsetX }
  get imgOffsetY() { return this.#imgOffsetY }
  get items() { return this.#items }
  get selectableItems() { return this.#selectableItems }
}
