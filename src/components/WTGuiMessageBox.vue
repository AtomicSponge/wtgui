<script setup lang="ts">
import { ref, computed, toValue, inject } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  msg:string
  borderSize?:number
}>()

const scale = <number>inject('scale')
const color = <string>inject('color')
const focusColor = <string>inject('focus-color')

const modalGeneralStyle = computed(() => {
  return `border-radius: ${32 * scale}px;padding: 2em;` +
  `border: ${(props.borderSize || 6) * scale}px solid ${color}; color: ${color};` +
  `background-color: rgba(0, 0, 0, 0.95);`
})

const modalHidden = `display: none; ${toValue(modalGeneralStyle)}`
const modalVisable = `display: flex;flex-flow: column nowrap;place-items: center;`+
  `z-index: 99;position: absolute;${toValue(modalGeneralStyle)}`

const modalStyle = ref(modalVisable)

const buttonStyle = computed(() => {
  return `border: ${3 * scale}px solid ${color};border-radius: ${16 * scale}px;` +
    `color: ${color}`
})

const buttonFocusStyle = computed(() => {
  return `border: ${3 * scale}px solid ${focusColor};border-radius: ${16 * scale}px;` +
    `color: ${color}`
})

const btnCurrentStyle = ref(toValue(buttonStyle))

/** Make a button active */
const makeBtnActive = () => {
  btnCurrentStyle.value = toValue(buttonFocusStyle)
}

/** Make a button inactive */
const makeBtnInactive = () => {
  btnCurrentStyle.value = toValue(buttonStyle)
}

/** Hide the modal on confirmation */
const hideModal = () => {
  modalStyle.value = modalHidden
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
