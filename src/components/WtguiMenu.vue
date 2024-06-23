<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, provide, inject, onMounted, onUpdated, onBeforeUnmount } from 'vue'

defineOptions({
  inheritAttrs: false
})

/** Font style from options */
const fontStyle = <string>inject('fontStyle')
/** Title color from options */
const titleColor = <string>inject('titleColor')
/** Border color from options */
const borderColor = <string>inject('borderColor')
/** Item color from options */
const itemColor = <string>inject('itemColor')
/** Focus color from options */
const focusColor = <string>inject('focusColor')
/** Detected controller */
const controller = <any>inject('controller')

const props = defineProps({
  /** Title display for menu */
  title: { type: String, required: true },
  /** CSS Font type for menu */
  font:  { type: String, default: undefined },
  /** Scale factor for menu */
  scale: {
    type: Number,
    required: true,
    validator(value:number) {
      return [1, 2, 3, 4].includes(value)
    }
  },
  /** CSS color for menu */
  color: { type: String, default: undefined },
  /** CSS color for the title font */
  titleColor: { type: String, default: undefined },
  /** CSS focus color for menu */
  focusColor: { type: String, default: undefined },
  /** Border thickness */
  borderSize: { type: Number, default: 8 },
  /** CSS color for the menu border */
  borderColor: { type: String, default: undefined },
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
  return `color: ${props.color || itemColor};font-size: ${props.scale}em;` +
    `border: ${(props.borderSize * props.scale)}px ` +
    `solid ${props.borderColor || borderColor};` +
    `font-family: ${props.font || fontStyle};` +
    `border-radius: ${(32 * props.scale)}px;` +
    `background-color: rgba(0, 0, 0, ${props.opaquency});`
})

/** Compute the CSS style for the title */
const titleStyle = computed(() => {
  return `color: ${props.titleColor || titleColor};`
})

//  Provides to sub-items
//  Compute scale so sub items can update
provide('scale', computed(() => { return props.scale }))
provide('color', props.color || itemColor)
provide('focus-color', props.focusColor || focusColor)

/** Reference to the menu */
const menu = ref()
/** Generated list of menu items */
let menuItems:Array<Element> = []
/** Current menu item */
let menuIdx = 0
/** Track animation frame for polling controller */
let pollingFrame = 0

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

  if (menuItems[menuIdx] === undefined) return

  //  Check if any items in the list are focused
  let focusCheck = false
  menuItems.forEach((item:Element) => {
    if(item === document.activeElement) focusCheck = true
  })
  //  Quit if not (prevents pop-up focus loss)
  if (!focusCheck) return

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
    if(event.target.id === item.id){
      menuIdx = idx
      document.getElementById(menuItems[menuIdx].id)?.focus()
    }
  })
}

/**
 * Poll input from controller on animation frames
 * @param _lastframe 
 */
const pollController = (_lastframe:DOMHighResTimeStamp) => {
  if (controller.value === null) {
    //  End early if no controller detected
    pollingFrame = window.requestAnimationFrame(pollController)
  }
  if (controller.value.dpad.up.pressed) {
    if (menuIdx > 0) --menuIdx
    document.getElementById(menuItems[menuIdx].id)?.focus()
  }
  if (controller.value.dpad.down.pressed) {
    if (menuIdx < menuItems.length - 1) ++menuIdx
    document.getElementById(menuItems[menuIdx].id)?.focus()
  }

  pollingFrame = window.requestAnimationFrame(pollController)
}

onMounted(() => {
  window.addEventListener('keydown', navigateMenu)

  //  Get the menu items
  const focusable = menu.value.querySelectorAll(`[tabindex]:not([tabindex='-1'])`)
  focusable.forEach((item:Element) => {
    if (item.checkVisibility()) {
      menuItems.push(item)
      item.addEventListener('mouseenter', mouseFocus)
      item.addEventListener('mouseleave', mouseFocus)
    }
  })
  //  Focus first menu item
  if (menuItems[menuIdx] !== undefined)
    document.getElementById(menuItems[menuIdx].id)?.focus()

  //  Start polling controller
  pollingFrame = window.requestAnimationFrame(pollController)
})

onUpdated(() => {
  if (menuItems[menuIdx] !== undefined)
    document.getElementById(menuItems[menuIdx].id)?.focus()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', navigateMenu)
  menuItems.forEach((item:Element) => {
    item.removeEventListener('mouseenter', mouseFocus)
    item.removeEventListener('mouseleave', mouseFocus)
  })
  window.cancelAnimationFrame(pollingFrame)
})
</script>

<template>
  <section ref="menu" :style="menuStyle">
    <h1 :style="titleStyle">{{ title }}</h1>
    <slot></slot>
  </section>
</template>

<style scoped>
section {
  line-height: 1.5;
  font-weight: 400;
  padding: 1.4em 3em;
  display: flex;
  flex-flow: column nowrap;
  place-items: center;
}
h1 {
  font-size: 2.6em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}
</style>
