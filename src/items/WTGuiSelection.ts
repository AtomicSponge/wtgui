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

export interface WTGuiSelectionArgs extends WTGuiItemArgs {
  //
}

/**
 * 
 * @extends WtGuiItem
 */
export class WTGuiSelection extends WTGuiItem {
  /**
   * 
   * @param args 
   */
  constructor(args:WTGuiSelectionArgs) {
    super(args)
  }
}
