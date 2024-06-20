<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, provide, onMounted, onUpdated, onBeforeUnmount } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  /** Title display for menu */
  title: { type: String, required: true },
  /** CSS Font type for menu */
  font:  { type: String, required: true },
  /** Scale factor for menu */
  scale: {
    type: Number,
    required: true,
    validator(value:number) {
      return [1, 2, 3, 4].includes(value)
    }
  },
  /** CSS color for menu */
  color: { type: String, default: 'rgb(255, 0, 0)' },
  /** CSS color for the title font */
  titleColor: { type: String, default: 'rgb(255, 0, 0)' },
  /** CSS focus color for menu */
  focusColor: { type: String, default: 'rgb(100, 108, 255)' },
  /** Border thickness */
  borderSize: { type: Number, default: 8 },
  /** CSS color for the menu border */
  borderColor: { type: String, default: 'rgb(255, 0, 0)' },
  /** Opaquency of the menu */
  opaquency: {
    type: Number,
    validator(value:number) {
      return (value >= 0.0 && value <= 1.0)
    },
    default: 0.30
  }
})

/** Compute the CSS style for the menu */
const menuStyle = computed(() => {
  return `color: ${props.color};font-size: ${props.scale}em;` +
    `border: ${(props.borderSize * props.scale)}px ` +
    `solid ${props.borderColor};font-family: ${props.font};` +
    `border-radius: ${(32 * props.scale)}px;` +
    `background-color: rgba(0, 0, 0, ${props.opaquency});`
})

/** Compute the CSS style for the title */
const titleStyle = computed(() => {
  return `color: ${props.titleColor};`
})

//  Compute scale so sub items can update
provide('scale', computed(() => { return props.scale }))
provide('color', props.color)
provide('focus-color', props.focusColor)

/** Reference to the menu */
const menu = ref()
/** Generated list of menu items */
let menuItems:Array<Element> = []
/** Current menu item */
let menuIdx = 0

/**
 * Navigate up or down in the menu
 * @param event Input event
 */
const navigateMenu = (event:any):void => {
  //  Prevent tab navigation
  if (event.key.toLowerCase() === 'tab') {
    event.preventDefault()
    return
  }

  //  Check if any items in the list are focused
  let focusCheck = false
  menuItems.forEach((item:Element) => {
    if(item === document.activeElement) focusCheck = true
  })
  //  Quit if not (prevents pop-up focus loss)
  if(!focusCheck) return

  switch (event.key.toLowerCase()) {
    case 'w':
    case 'arrowup':
      if (menuIdx > 0) --menuIdx
      document.getElementById(menuItems[menuIdx].id)?.focus()
      break
    case 's':
    case 'arrowdown':
      if (menuIdx < menuItems.length - 1) ++menuIdx
      document.getElementById(menuItems[menuIdx].id)?.focus()
      break
  }
}

/**
 * Give item focus on mouse over
 * @param event Mouse enter event
 */
const mouseFocus = (event:any):void => {
  event.preventDefault()
  menuItems.forEach((item:Element, idx:number) => {
    if(event.target.id === item.id) menuIdx = idx
  })
  event.target.focus()
}

const connectGamePad = (event:any):void => {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    event.gamepad.index,
    event.gamepad.id,
    event.gamepad.buttons.length,
    event.gamepad.axes.length,
  )
}

onMounted(() => {
  window.addEventListener('keydown', navigateMenu)
  window.addEventListener('gamepadconnected', connectGamePad)

  //  Get the menu items
  const focusable = menu.value.querySelectorAll(`[tabindex]:not([tabindex='-1'])`)
  focusable.forEach((item:Element) => {
    if (item.checkVisibility()) {
      menuItems.push(item)
      item.addEventListener('mouseenter', mouseFocus)
    }
  })
  //  Focus first menu item
  document.getElementById(menuItems[menuIdx].id)?.focus()
})

onUpdated(() => {
  document.getElementById(menuItems[menuIdx].id)?.focus()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', navigateMenu)
  window.removeEventListener('gamepadconnected', connectGamePad)
  menuItems.forEach((item:Element) => {
    item.removeEventListener('mouseenter', mouseFocus)
  })
})
</script>

<template>
  <section ref="menu" :style="menuStyle">
    <h1 :style="titleStyle">{{ title }}</h1>
    <slot></slot>
  </section>
</template>

<style lang="stylus" scoped>
section
  line-height 1.5
  font-weight 400
  padding 1.4em 3em
  display flex
  flex-flow column nowrap
  place-items center
h1
  font-size 2.6em
  margin-top 0.2em
  margin-bottom 0.2em
</style>
