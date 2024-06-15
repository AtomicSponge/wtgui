/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import { defineStore } from 'pinia'

/** Store value for the inputSetting test */
export const inputStore = defineStore('input', {
  state: () => ({ value: '?' }),
  actions: { set (v:string) { this.value = v } }
})
