/**
 * 
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

import { WTGuiItem } from './WTGuiItem.js'
import type { WTGuiItemArgs } from './WTGuiItem.js'
import { WTGuiMenuItemError } from '../WTGuiError.js'

export interface WTGuiTextInputArgs extends WTGuiItemArgs {
  /** */
  size:number
}

/**
 * 
 * @extends WTGuiItem
 */
export class WTGuiTextInput extends WTGuiItem {
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
  constructor(args:WTGuiTextInputArgs) {
    var args = args || {}
    super(args)

    this.#canSelect = true
    this.#scrollable = false

    if(args.size === undefined || typeof(args.size) !== 'number')
      throw new WTGuiMenuItemError(`Must define input size as a number.`, WTGuiTextInput.constructor)
    this.#size = args.size
  }

  onSelect() {
    //
  }

  get size() { return this.#size }
  get canSelect() { return this.#canSelect }
  get scrollable() { return this.#scrollable }
}
