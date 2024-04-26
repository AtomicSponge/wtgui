/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import { WTGui } from "../WTGui.js"
import { WTGuiItem } from "./WTGuiItem.js"
import type { WTGuiItemArgs } from "./WTGuiItem.js"
import { WTGuiError } from "../WTGuiError.js"

export interface WTGuiActionArgs extends WTGuiItemArgs {
  /** */
  actionType?:string
  /** */
  menuName?:string
  /** */
  onSelect?:Function
  /** */
  allMenus?:boolean
}

/**
 * WTGui Item Action
 * @extends WTGuiItem
 */
export class WTGuiAction extends WTGuiItem {
  #actionType:string
  #menuName:string
  #onSelect:Function
  #allMenus:boolean

  /** */
  #canSelect:boolean
  /** */
  #scrollable:boolean

  /**
   * 
   * @param args 
   */
  constructor(args:WTGuiActionArgs) {
    super(args)
    this.#canSelect = true
    this.#scrollable = false
    this.#actionType = args.actionType || ''
    this.#menuName = args.menuName || ''
    this.#onSelect = () => {}
    this.#allMenus = args.allMenus || false

    if(args.actionType === undefined) {
      if(args.onSelect === undefined)
        throw new WTGuiError(`Must define an action!`, this.constructor)
      this.#onSelect = args.onSelect
    }

    if(args.actionType === 'open_menu') {
      if(args.menuName === undefined)
        throw new WTGuiError(`Must define a menu name!`, this.constructor)
      this.#onSelect = () => { WTGui.openMenu(this.#menuName) }
    }

    if(args.actionType === 'close_menu') {
      this.#onSelect = () => { WTGui.closeMenu(this.#allMenus) }
    }
  }

  onSelect() { this.#onSelect() }

  get actionType() { return this.#actionType }
  get menuName() { return this.#menuName }
  get canSelect() { return this.#canSelect }
  get scrollable() { return this.#scrollable }
}
