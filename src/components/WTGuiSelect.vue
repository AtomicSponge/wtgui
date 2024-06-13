<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, toValue, inject, onMounted } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  /** Display label */
  label?:string
  /** List of values to display in selection */
  values:Array<any>
  /** Index of the default selected item */
  defaultIdx?:number
  /** Sound file to play */
  sound?:string
}>()

const emit = defineEmits<{
  /** Emit selected value from the props array */
  (e: 'selected', value:any):void
}>()

/** Selected index */
const idx = ref(0)
/** Reference to the CSS style of the display text */
const selectStyle = ref('')

/** Get scale from the menu props */
const scale = <number>inject('scale')
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Audio file if provided from props */
let audioFile:HTMLAudioElement
/** Globaly store calculated width */
let width:Number = 0

/** Compute button CSS */
const buttonStyle = computed(() => {
  return `border-radius: ${16 * scale}px;` +
  `border: ${3 * scale}px solid; color: ${color};`
})

/** Compute button focus CSS */
const buttonFocusStyle = computed(() => {
  return `border-radius: ${16 * scale}px;` + 
  `border: ${3 * scale}px solid ${focusColor};` +
  `color: ${focusColor};`
})

/** Reference to the left button active style */
const activeStyleLeft = ref(toValue(buttonStyle))
/** Reference to the right button active style */
const activeStyleRight = ref(toValue(buttonStyle))
/** Reference to the selection for input focusing */
const selectFocus = ref()

/**
 * Make a button active
 * @param event Event information
 */
const makeActive = (event:any):void => {
  if(event.currentTarget.id === 'btnLeft')
    activeStyleLeft.value = toValue(buttonFocusStyle)
  if(event.currentTarget.id === 'btnRight')
    activeStyleRight.value = toValue(buttonFocusStyle)
}

/**
 * Make a button inactive
 * @param event Event information
 */
const makeInactive = (event:any):void => {
  if(event.currentTarget.id === 'btnLeft')
    activeStyleLeft.value = toValue(buttonStyle)
  if(event.currentTarget.id === 'btnRight')
    activeStyleRight.value = toValue(buttonStyle)
}

/** Decrease index on left select */
const selectLeft = (event:any):void => {
  //  If the event was fired from the selection, animate button
  if(event.currentTarget.id === 'selection') {
    activeStyleLeft.value = toValue(buttonFocusStyle)
    setTimeout(() => {
      activeStyleLeft.value = toValue(buttonStyle)
    }, 100)
  }
  if(props.sound !== undefined) audioFile.play()
  if(idx.value > 0) --idx.value
  emit('selected', `${props.values[idx.value]}`)
}

/** Increase index on right select */
const selectRight = (event:any):void => {
  //  If the event was fired from the selection, animate button
  if(event.currentTarget.id === 'selection') {
    activeStyleRight.value = toValue(buttonFocusStyle)
    setTimeout(() => {
      activeStyleRight.value = toValue(buttonStyle)
    }, 100)
  }
  if(props.sound !== undefined) audioFile.play()
  if(idx.value < props.values.length - 1) ++idx.value
  emit('selected', `${props.values[idx.value]}`)
}

/** Set selection CSS on focus in */
const focusIn = ():void => {
  selectStyle.value = `width: ${width}em; color: ${focusColor};`
}

/** Set selection CSS on focus out */
const focusOut = ():void => {
  selectStyle.value = `width: ${width}em; color: ${color};`
}

onMounted(() => {
  //  Set the focus listener
  selectFocus.value.addEventListener('focusin', focusIn)
  selectFocus.value.addEventListener('focusout', focusOut)

  //  Set the width to the max array element length
  const longest = props.values.reduce((a, b) => {
    return a.length > b.length ? a : b
  })
  width = Math.round(longest.length / 2)
  selectStyle.value = `width: ${width}em; color: ${color};`

  //  If default was set, set default index
  if(props.defaultIdx) idx.value = props.defaultIdx
  emit('selected', `${props.values[idx.value]}`)

  //  Load audio if provided in props
  if(props.sound === undefined) return
  audioFile = new Audio(props.sound)
})
</script>

<template>
  <div>
    <h2 v-show="props.label">{{ props.label }}</h2>
    <audio v-show="props.sound" :src="props.sound"></audio>
    <button
      id="btnLeft"
      tabindex="-1"
      :style="activeStyleLeft"
      @mouseenter="makeActive"
      @mouseleave="makeInactive"
      @click="selectLeft">
      &#8592;
    </button>
    <h2
      id="selection"
      ref="selectFocus"
      :style="selectStyle"
      tabindex="0"
      @keyup.left="selectLeft"
      @keyup.right="selectRight"
      @keyup.a="selectLeft"
      @keyup.d="selectRight">
      {{ values[idx] }}
    </h2>
    <button
      id="btnRight"
      tabindex="-1"
      :style="activeStyleRight"
      @mouseenter="makeActive"
      @mouseleave="makeInactive"
      @click="selectRight">
      &#8594;
    </button>
  </div>
</template>

<style lang="stylus" scoped>
div
  display flex
  flex-flow row nowrap
  place-items center
h2
  font-size 1.6em
  margin-top 0.2em
  margin-bottom 0.2em
h2:focus,
h2:focus-visible
  outline none
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
