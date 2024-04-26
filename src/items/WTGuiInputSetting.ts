/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import { WTGuiItem } from "./WTGuiItem.js"
import type { WTGuiItemArgs } from "./WTGuiItem.js"
import { WTGuiMenuItemError } from "../WTGuiError.js"

export interface WTGuiInputSettingArgs extends WTGuiItemArgs {
  /** */
  type:string
  /** */
  onSelect:Function
}

/**
 * 
 * @extends WTGuiItem
 */
export class WTGuiInputSetting extends WTGuiItem {
  /** */
  #onSelect:Function
  /** */
  #size:number

  /** */
  #canSelect:boolean
  /** */
  #scrollable:boolean

  /**
   * 
   * @param args 
   */
  constructor(args:WTGuiInputSettingArgs) {
    super(args)
    this.#canSelect = true
    this.#scrollable = false
    this.#size = 0

    if(args.type === undefined || args.type === null)
      throw new WTGuiMenuItemError(`Must define input setting type.`, WTGuiInputSetting.constructor)
    if(args.type.toLowerCase() === 'key') {
      //
    } else if(args.type.toLowerCase() === 'button') {
      //
    } else {
      throw new WTGuiMenuItemError(`Input setting type must be 'key' or 'button'.`, WTGuiInputSetting.constructor)
    }

    this.#onSelect = args.onSelect
  }

  onselect() { this.#onSelect() }

  get size() { return this.#size }
  get canSelect() { return this.#canSelect }
  get scrollable() { return this.#scrollable }
}
