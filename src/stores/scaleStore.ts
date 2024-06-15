/**
 * @author Matthew Evans
 * @module wtfsystems/wtgui
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import { defineStore } from 'pinia'

interface State {
  options:Array<number>
  value:number
}

/** Store value for the Scale test */
export const scaleStore = defineStore('scale', {
  state: ():State => ({
    options: [ 1, 2, 3, 4 ],
    value: 1
  }),
  actions: { set(v:number) { this.value = v } }
})
