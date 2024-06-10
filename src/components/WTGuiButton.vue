<script setup lang="ts">
import { ref, toValue, computed, inject } from 'vue'

defineProps<{
  msg: string
}>()

const scale = <number>inject('scale')
const focusColor = <string>inject('focus-color')

const buttonStyle = computed(() => {
  return `border-radius: ${16 * scale}px;border: ${3 * scale}px solid;`
})

const buttonFocusStyle = computed(() => {
  return `border-radius: ${16 * scale}px;border: ${3 * scale}px solid ${focusColor};`
})

const _btnStyle = toValue(buttonStyle)
const _btnFocusStyle = toValue(buttonFocusStyle)
const activeStyle = ref(_btnStyle)

const makeActive = () => {
  activeStyle.value = _btnFocusStyle
}

const makeInactive = () => {
  activeStyle.value = _btnStyle
}
</script>

<template>
  <div>
    <button
      :style="activeStyle"
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
  transition border-color 0.25s
button:focus,
button:focus-visible
  outline none
</style>
