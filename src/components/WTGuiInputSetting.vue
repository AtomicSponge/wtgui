<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, toValue, inject, onMounted } from 'vue'
import WTGuiMessageBox from './WTGuiMessageBox.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  label: string
}>()

/** Get scale from the menu props */
const scale = <number>inject('scale')
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Model for tracking the setting value */
const settingValue = defineModel()

const inputStyle = computed(() => {
  return `border-radius: ${16 * scale}px;` +
    `border: ${3 * scale}px solid; color: ${color};`
})

const inputFocusedStyle = computed(() => {
  return `border-radius: ${16 * scale}px;` + 
    `border: ${3 * scale}px solid ${focusColor};` +
    `color: ${focusColor};`
})

const currentStyle = ref(toValue(inputStyle))

const inputField = ref()

/** Reference for displaying the input message box */
const showInputMessageBox = ref(false)
/** Reference for displaying the applied message box */
const showAppliedMessageBox = ref(false)

/** Set input CSS on focus in */
const focusIn = ():void => {
  currentStyle.value = toValue(inputFocusedStyle)
}

/** Set input CSS on focus out */
const focusOut = ():void => {
  currentStyle.value = toValue(inputStyle)
}

/**
 * On space, enter or click, ask for new input value
 * @param event Fired event
 */
const doInput = (event:any):void => {
  if(event.key === " " || event.key === "Enter" || event.type === 'click') {
    showInputMessageBox.value = true
    //  Set a listener for capturing a new value
    window.addEventListener('keydown', captureKey)
  }
}

/**
 * Capture a keypress
 * @param event Fired event
 */
const captureKey = (event:any):void => {
  if(showInputMessageBox.value && event.type) {
    window.removeEventListener('keydown', captureKey)
    showInputMessageBox.value = false
    settingValue.value = event.key
    setTimeout(() => {
      showAppliedMessageBox.value = true
    }, 100)
  }
}

onMounted(() => {
  //  Set the focus listener
  inputField.value.addEventListener('focusin', focusIn)
  inputField.value.addEventListener('focusout', focusOut)
  //  Set the input listener
  inputField.value.addEventListener('click', doInput)
  inputField.value.addEventListener('keyup', doInput)
})
</script>

<template>
  <div class="main">
    <h2>{{ props.label }}</h2>
    <div
      ref="inputField"
      class="input"
      :style="currentStyle"
      tabindex="0">
      {{ settingValue }}
    </div>
    <WTGuiMessageBox
      label="Press a key or button"
      :show-close="false"
      sound-open="./src/assets/click.wav"
      sound-close="./src/assets/click.wav"
      v-model="showInputMessageBox"/>
    <WTGuiMessageBox
      label="Setting applied"
      :show-close="true"
      sound-open="./src/assets/click.wav"
      sound-close="./src/assets/click.wav"
      v-model="showAppliedMessageBox"/>
  </div>
</template>

<style lang="stylus" scoped>
.main
  display flex
  flex-flow row nowrap
  place-items center
.input
  padding 0.2em 0.6em
  margin 0.6em
  font-size 1.6em
  font-weight 800
  cursor pointer
.input:focus,
.input:focus-visible
  outline none
</style>
