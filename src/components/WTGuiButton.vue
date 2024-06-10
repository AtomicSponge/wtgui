<script setup lang="ts">
import { ref, toValue, computed, inject } from 'vue'

defineProps<{
  msg: string
}>()

const scale = <number>inject('scale')

const buttonStyle = computed(() => {
  return `border-radius: ${16 * scale}px;border: ${3 * scale}px solid;`
})

const buttonFocusStyle = computed(() => {
  return `border-radius: ${16 * scale}px;border: ${3 * scale}px solid #646cff;`
})

const _btnStyle = toValue(buttonStyle)
const _btnFocusStyle = toValue(buttonFocusStyle)
const activeStyle = ref(_btnStyle)

const switchState = () => {
  if(activeStyle.value === _btnStyle)
    activeStyle.value = _btnFocusStyle
  else activeStyle.value = _btnStyle
}
</script>

<template>
  <button
    :style="activeStyle"
    @focusin="switchState"
    @focusout="switchState"
    @mouseenter="switchState"
    @mouseleave="switchState">
    {{ msg }}
  </button>
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
button:hover
  border-color #646cff
button:focus,
button:focus-visible
  border-color #646cff
</style>
