/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import { defineStore } from 'pinia'

export const inputStore = defineStore('input', {
  state: () => ({ value: '?' }),
  actions: { set (v:string) { this.value = v } }
})
