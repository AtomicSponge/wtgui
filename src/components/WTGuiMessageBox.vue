<script setup lang="ts">
import { ref, computed, toValue, inject } from 'vue'

defineProps<{
  msg: string
}>()

const scale = <number>inject('scale')
const focusColor = <string>inject('focus-color')

const generalStyle = computed(() => {
  return `border-radius: ${16 * scale}px;` +
  `border: ${3 * scale}px solid; color: inherit;` +
  `flex-flow: column nowrap;place-items: center;`
})

const modalHidden = 'display: hidden;'
const modalVisable = 'display: flex;'

const modalCSS = `${generalStyle} ${modalHidden}`

const modalStyle = ref(modalCSS)

const buttonStyle = computed(() => {
  return `border-radius: ${16 * scale}px;border: ${3 * scale}px solid;`
})

const buttonFocusStyle = computed(() => {
  return `border-radius: ${16 * scale}px;border: ${3 * scale}px solid ${focusColor};`
})

const _btnStyle = toValue(buttonStyle)
const _btnFocusStyle = toValue(buttonFocusStyle)
const btnActiveStyle = ref(_btnStyle)

/** Make a button active */
const makeActive = () => {
  btnActiveStyle.value = _btnFocusStyle
}

/** Make a button inactive */
const makeInactive = () => {
  btnActiveStyle.value = _btnStyle
}
</script>

<template>
  <div :style="modalStyle">
    <div>{{ msg }}</div>
    <div>
      <button
        :style="btnActiveStyle"
        @focusin="makeActive"
        @focusout="makeInactive"
        @mouseenter="makeActive"
        @mouseleave="makeInactive">
        OK
      </button>
    </div>
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
  background-color inherit
  cursor pointer
button:focus,
button:focus-visible
  outline none
</style>
