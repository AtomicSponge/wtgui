<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, toRef, toValue, inject } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  /** Message to display */
  msg:string
  /** Border thickness */
  borderSize?:number
}>()

/** Model flag to show the message box */
const visible = defineModel()

/** Get scale from the menu props */
const scale = <number>inject('scale')
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Compute the general CSS to apply to the modal */
const modalGeneralStyle = computed(() => {
  return `border-radius: ${32 * scale}px;padding: 2em;` +
  `border: ${(props.borderSize || 6) * scale}px solid ${color}; color: ${color};` +
  `background-color: rgba(0, 0, 0, 0.95);`
})

/** Modal's hidden CSS */
const modalHidden = `display: none; ${toValue(modalGeneralStyle)}`
/** Modal's display CSS */
const modalVisible = `display: flex;flex-flow: column nowrap;place-items: center;`+
  `z-index: 99;position: absolute;${toValue(modalGeneralStyle)}`

/** Compute the current modal CSS */
const modalComputedStyle = computed(() => {
  return visible.value ? modalVisible : modalHidden
})
/** Reference to the current modal CSS */
const modalStyle = ref(toRef(modalComputedStyle))

/** Compute button CSS */
const buttonStyle = computed(() => {
  return `border: ${3 * scale}px solid ${color};border-radius: ${16 * scale}px;` +
    `color: ${color}`
})

/** Compute button focused CSS */
const buttonFocusStyle = computed(() => {
  return `border: ${3 * scale}px solid ${focusColor};border-radius: ${16 * scale}px;` +
    `color: ${color}`
})

/** Reference to the current button CSS */
const btnCurrentStyle = ref(toValue(buttonStyle))

/** Make a button active */
const makeBtnActive = ():void => {
  btnCurrentStyle.value = toValue(buttonFocusStyle)
}

/** Make a button inactive */
const makeBtnInactive = ():void => {
  btnCurrentStyle.value = toValue(buttonStyle)
}

/** Hide the modal on confirmation */
const hideModal = ():void => {
  visible.value = false
}
</script>

<template>
  <div :style="modalStyle">
    <h2>{{ msg }}</h2>
    <button
      :style="btnCurrentStyle"
      @focusin="makeBtnActive"
      @focusout="makeBtnInactive"
      @mouseenter="makeBtnActive"
      @mouseleave="makeBtnInactive"
      @select="hideModal"
      @click="hideModal">
      OK
    </button>
  </div>
</template>

<style lang="stylus" scoped>
h2
  font-size 1.6em
  margin-top 0.2em
  margin-bottom 0.2em
button
  padding 0.2em 0.6em
  margin 0.6em
  font-size 1.6em
  font-weight 800
  font-family inherit
  background-color rgba(0, 0, 0, 0)
  cursor pointer
button:focus,
button:focus-visible
  outline none
</style>
