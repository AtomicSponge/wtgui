<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { inject, ref, computed, toRef, toValue, onMounted, onUpdated, onBeforeUnmount } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  /** Display label */
  label:string
  /** Show the close (OK) button */
  showClose:boolean
  /** Border thickness */
  borderSize?:number
  /** Sound file to play on open */
  soundOpen?:string
  /** Sound file to play on close */
  soundClose?:string
}>()

/** Model flag to show the message box */
const visible = defineModel()
/** Durration of the zoom animation */
const zoomTime:MsgBoxZoomTime = 300

/** Get scale from the menu props */
const scale = toValue(<number>inject('scale'))
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Open Audio file if provided from props */
let audioFileOpen:HTMLAudioElement
/** Close Audio file if provided from props */
let audioFileClose:HTMLAudioElement

/** Show the message box */
const outerShown = 'display: table;z-index: 99;'
/** Hide the message box */
const outerHidden = 'display: none;z-index: -99;'

/** Compute if the message box is visable or not */
const outerComputedStyle = computed(() => {
  return visible.value ? outerShown : outerHidden
})

/** Reference to the current style for the outer div */
const outerStyle = ref(toRef(outerComputedStyle))

/** Compute the general CSS to apply to the modal */
const modalComputedStyle = computed(() => {
  return `border-radius: ${32 * scale}px;padding: 2em;background-color: rgba(0, 0, 0, 0.95);` +
    `border: ${(props.borderSize || 6) * scale}px solid ${color}; color: ${color};` +
    `margin-left: auto;margin-right: auto;width: fit-content;max-width: ${800 * scale}px;`
})

/** Reference to the current modal CSS */
const modalStyle = ref(toRef(modalComputedStyle))

/** Reference to the modal zoom CSS */
const modalZoom = ref('modal-zoom')

/** Compute button focused CSS */
const buttonComputedStyle = computed(() => {
  return `border: ${3 * scale}px solid ${focusColor};` +
    `border-radius: ${16 * scale}px;color: ${color};`
})

/** Reference to the current button CSS */
const buttonStyle = ref(toRef(buttonComputedStyle))

/** Reference to the label */
const hiddenBtn = ref()
/** Reference to the confirm button */
const confirmBtn = ref()

/** Hide the modal on confirmation */
const hideModal = ():void => {
  if(props.soundClose !== undefined) audioFileClose.play()
  modalZoom.value += ' out'
  setTimeout(() => {
    modalZoom.value = 'modal-zoom'
    visible.value = false
  }, zoomTime)
}

onMounted(() => {
  //  If no confirmation button, close on keypress
  if(props.showClose === false) {
    hiddenBtn.value.addEventListener('keydown', hideModal)
  }
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
    setTimeout(() => {
      if(props.showClose) confirmBtn.value.focus()
      else hiddenBtn.value.focus()
    }, zoomTime)
  }
})

onBeforeUnmount(() => {
  //  Remove event listener
  hiddenBtn.value.removeEventListener('keydown', hideModal)
})
</script>

<template>
  <div :style="outerStyle" class="outer">
    <div class="middle">
      <div :style="modalStyle" :class="modalZoom">
        <h2>{{ props.label }}</h2>
        <button
          ref="confirmBtn"
          :style="buttonStyle"
          v-show="props.showClose"
          @keyup.esc="hideModal"
          @select="hideModal"
          @click="hideModal">
          OK
        </button>
        <button
          ref="hiddenBtn"
          class="hidden"
          v-show="!props.showClose">
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
}
.middle {
  display: table-cell;
  vertical-align: middle;
}
h2 {
  font-size: 1.4em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}
button {
  padding: 0.2em 0.6em;
  margin: 0.6em;
  font-size: 1.4em;
  font-weight: 800;
  font-family: inherit;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}
button:focus,
button:focus-visible {
  outline: none;
}
.hidden {
  border: none;
  padding: 0em 0em;
  margin: 0em;
}
.hidden:focus,
.hidden:focus-visible {
  outline: none;
}
.modal-zoom {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.3s;
  animation-name: zoom;
  animation-duration: 0.3s;
}
.out {
  animation-name: zoom-out;
  animation-duration: 0.3s;
}

/* Zoom in */
@-webkit-keyframes zoom {
  from { -webkit-transform:scale(1) }
  to { -webkit-transform:scale(2) }
}
@keyframes zoom {
  from { transform:scale(0.4) }
  to { transform:scale(1) }
}

/* Zoom out */
@-webkit-keyframes zoom-out {
  from { transform:scale(1) }
  to { transform:scale(0) }
}
@keyframes zoom-out {
  from { transform:scale(1) }
  to { transform:scale(0) }
}
</style>
