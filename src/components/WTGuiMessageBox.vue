<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, onUpdated, toRef, toValue, onMounted, inject } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  /** Display label */
  label:string
  /** Border thickness */
  borderSize?:number
  /** Sound file to play on open */
  soundOpen?:string
  /** Sound file to play on close */
  soundClose?:string
}>()

/** Model flag to show the message box */
const visible = defineModel()

/** Get scale from the menu props */
const scale = <number>inject('scale')
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Open Audio file if provided from props */
let audioFileOpen:HTMLAudioElement
/** Close Audio file if provided from props */
let audioFileClose:HTMLAudioElement

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

/** Reference to the modal zoom CSS */
const modalZoom = ref('modal-zoom')

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

/** Reference to the confirm button */
const confirmBtn = ref()

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
  if(props.soundClose !== undefined) audioFileClose.play()
  modalZoom.value += ' out'
  setTimeout(() => {
    modalZoom.value = 'modal-zoom'
    visible.value = false
  }, 300)
}

onMounted(() => {
  //  Load audio if provided
  if(props.soundOpen !== undefined)
    audioFileOpen = new Audio(props.soundOpen)
  if(props.soundClose !== undefined)
    audioFileClose = new Audio(props.soundClose)
})

onUpdated(() => {
  //  Play audio and give focus
  if(toValue(visible) === true) {
    if(props.soundOpen !== undefined) audioFileOpen.play()
    confirmBtn.value.focus()
  }
})
</script>

<template>
  <div :style="modalStyle" :class="modalZoom">
    <h2>{{ label }}</h2>
    <button
      ref="confirmBtn"
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

/* Zoom in */
@-webkit-keyframes zoom
  from { -webkit-transform:scale(1) }
  to { -webkit-transform:scale(2) }
@keyframes zoom
  from { transform:scale(0.4) }
  to { transform:scale(1) }

/* Zoom out */
@-webkit-keyframes zoom-out
  from { transform:scale(1) }
  to { transform:scale(0) }
@keyframes zoom-out
  from { transform:scale(1) }
  to { transform:scale(0) }

.modal-zoom
  -webkit-animation-name zoom
  -webkit-animation-duration 0.3s
  animation-name zoom
  animation-duration 0.3s
.out
  animation-name zoom-out
  animation-duration 0.3s
</style>
