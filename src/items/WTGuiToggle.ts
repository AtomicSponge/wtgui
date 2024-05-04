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

interface WTGuiToggleArgs extends WTGuiItemArgs {
  /** */
  onLeft:Function
  /** */
  onRight:Function
}

/**
 * 
 * @extends WTGuiItem
 */
export class WTGuiToggle extends WTGuiItem {
  #onLeft:Function
  #onRight:Function

  #canSelect:boolean
  #scrollable:boolean

  /**
   * 
   * @param args 
   */
  constructor(args:WTGuiToggleArgs) {
    super(args)
    this.#canSelect = true
    this.#scrollable = true

    if(args.onLeft === undefined || !(args.onLeft instanceof Function))
      throw new WTGuiMenuItemError(`Must define left toggle.`, WTGuiToggle.constructor)
    this.#onLeft = args.onLeft
    if(args.onRight === undefined || !(args.onRight instanceof Function))
      throw new WTGuiMenuItemError(`Must define right toggle.`, WTGuiToggle.constructor)
    this.#onRight = args.onRight
  }

  onSelect() {
    //
  }

  onLeft() { this.#onLeft() }
  onRight() { this.#onRight() }

  get canSelect() { return this.#canSelect }
  get scrollable() { return this.#scrollable }
}
