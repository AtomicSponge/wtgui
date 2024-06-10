<script setup lang="ts">
import { ref, computed, toValue, inject } from 'vue'

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
const activeStyleLeft = ref(_btnStyle)
const activeStyleRight = ref(_btnStyle)

const makeActive = (event:any) => {
  if(event.currentTarget.id === 'btnLeft')
    activeStyleLeft.value = _btnFocusStyle
  if(event.currentTarget.id === 'btnRight')
    activeStyleRight.value = _btnFocusStyle
}

const makeInactive = (event:any) => {
  if(event.currentTarget.id === 'btnLeft')
    activeStyleLeft.value = _btnStyle
  if(event.currentTarget.id === 'btnRight')
    activeStyleRight.value = _btnStyle
}
</script>

<template>
  <div>
    <button
      id="btnLeft"
      :style="activeStyleLeft"
      @focusin="makeActive"
      @focusout="makeInactive"
      @mouseenter="makeActive"
      @mouseleave="makeInactive">
      &#8592;
    </button>
    <h2>{{ msg }}</h2>
    <button
      id="btnRight"
      :style="activeStyleRight"
      @focusin="makeActive"
      @focusout="makeInactive"
      @mouseenter="makeActive"
      @mouseleave="makeInactive">
      &#8594;
    </button>
  </div>
</template>

<style lang="stylus" scoped>
div
  display flex
  flex-flow row nowrap
  place-items center
button
  padding 0.4em 0.8em
  margin 0.6em
  font-size 1.6em
  font-weight 800
  font-family inherit
  color inherit
  background-color inherit
  cursor pointer
button:focus,
button:focus-visible
  outline none
</style>
