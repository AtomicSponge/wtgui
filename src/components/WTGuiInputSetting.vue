<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { inject, ref, computed, toRef, toValue, onMounted } from 'vue'
import WTGuiMessageBox from './WTGuiMessageBox.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  /** Display label for the input setting */
  label:string
  /** Sound for message box on open */
  soundOpen?:string
  /** Sound for message box on close */
  soundClose?:string
}>()

/** Get scale from the menu props */
const scale = toRef(<number>inject('scale'))
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Model for tracking the setting value */
const settingValue = defineModel()

/** Computed value for input CSS */
const inputStyle = computed(() => {
  return `border-radius: ${16 * toValue(scale)}px;` +
    `border: ${3 * toValue(scale)}px solid; color: ${color};`
})

/** Computed value for input focused CSS */
const inputFocusedStyle = computed(() => {
  return `border-radius: ${16 * toValue(scale)}px;` + 
    `border: ${3 * toValue(scale)}px solid ${focusColor};` +
    `color: ${focusColor};`
})

/** Reference to the current CSS style */
const currentStyle = ref(toRef(inputStyle))
/** Reference to the input capture field */
const inputField = ref()

/** Reference for displaying the input message box */
const showInputMessageBox = ref(false)

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
    setTimeout(() => {
      window.addEventListener('keydown', captureKey)
    }, 250)
  }
}

/**
 * Capture a keypress
 * @param event Fired event
 */
const captureKey = (event:any):void => {
  if(showInputMessageBox.value && event.type === 'keydown') {
    window.removeEventListener('keydown', captureKey)
    settingValue.value = event.key  
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
      :soundOpen
      :soundClose
      v-model="showInputMessageBox"/>
  </div>
</template>

<style lang="stylus" scoped>
h2
  font-size 1.6em
  line-height 0.2
  padding 0.2em 0em
  margin 0.3em 0.6em
.main
  display flex
  flex-flow row nowrap
  place-items center
.input
  padding 0.2em 0.6em
  margin 0.3em 0.6em
  font-size 1.6em
  font-weight 800
  cursor pointer
.input:focus,
.input:focus-visible
  outline none
</style>
