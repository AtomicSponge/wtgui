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

export interface WTGuiLabelArgs extends WTGuiItemArgs {
  //
}

/**
 * WTGui Item Label
 * @extends WTGuiItem
 */
export class WTGuiLabel extends WTGuiItem {
  /** */
  #canSelect:boolean

  /**
   * 
   * @param args 
   */
  constructor(args:WTGuiLabelArgs) {
    super(args)
    this.#canSelect = false
  }

  get canSelect() { return this.#canSelect }
}
