<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, toValue, inject } from 'vue'

defineProps<{
  /** Display message for the button */
  msg:string
}>()

/** Get scale from the menu props */
const scale = <number>inject('scale')
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Compute button CSS */
const buttonStyle = computed(() => {
  return `border: ${3 * scale}px solid ${color};border-radius: ${16 * scale}px;`
})

/** Compute button focused CSS */
const buttonFocusStyle = computed(() => {
  return `border: ${3 * scale}px solid ${focusColor};border-radius: ${16 * scale}px;`
})

/** Reference to the button's current style */
const currentStyle = ref(toValue(buttonStyle))

/** Make a button active */
const makeActive = () => {
  currentStyle.value = toValue(buttonFocusStyle)
}

/** Make a button inactive */
const makeInactive = () => {
  currentStyle.value = toValue(buttonStyle)
}
</script>

<template>
  <div>
    <button
      :style="currentStyle"
      @focusin="makeActive"
      @focusout="makeInactive"
      @mouseenter="makeActive"
      @mouseleave="makeInactive">
      {{ msg }}
    </button>
  </div>
</template>

<style lang="stylus" scoped>
button
  padding 0.6em 1.2em
  margin 0.6em
  font-size 1.4em
  font-weight 800
  font-family inherit
  color inherit
  background-color inherit
  cursor pointer
button:focus,
button:focus-visible
  outline none
</style>
