<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, toValue, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { WTGuiError } from './WTGuiError.ts'

defineOptions({
  inheritAttrs: false
})

const router = useRouter()

const props = defineProps<{
  /** Display label for the button */
  label:string
  /** Go to a menu */
  goto?:string
  /** Set action function */
  action?:Function
  /** Sound file to play */
  sound?:string
}>()

/** Get scale from the menu props */
const scale = <number>inject('scale')
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Audio file if provided from props */
let audioFile:HTMLAudioElement

/** Compute button CSS */
const buttonStyle = computed(() => {
  return `border: ${3 * scale}px solid ${color};border-radius: ${16 * scale}px;`
})

/** Compute button focused CSS */
const buttonFocusStyle = computed(() => {
  return `border: ${3 * scale}px solid ${focusColor};border-radius: ${16 * scale}px;`
})

/** Reference to the button's current style */
const currentStyle = ref(toValue(buttonStyle))

/** Make a button active */
const makeActive = ():void => {
  currentStyle.value = toValue(buttonFocusStyle)
}

/** Make a button inactive */
const makeInactive = ():void => {
  currentStyle.value = toValue(buttonStyle)
}

/** Go to a menu */
const goToMenu = ():void => {
  if(props.goto === undefined) return
  if(props.sound !== undefined) audioFile.play()
  router.push(props.goto)
}

/** Perform an action function */
const doAction = ():void => {
  if(props.action === undefined) return
  if(props.sound !== undefined) audioFile.play()
  props.action()
}

onMounted(() => {
  if(props.goto && props.action)
    throw new WTGuiError(`Only define either 'action' OR 'goto' properties!`, onMounted)
  
  //  On mount, load audio if provided
  if(props.sound === undefined) return
  audioFile = new Audio(props.sound)
})
</script>

<template>
  <audio v-show="props.sound" :src="props.sound"></audio>
  <!-- Render goToMenu button -->
  <div v-show="props.goto !== undefined">
    <button
      :style="currentStyle"
      @focusin="makeActive"
      @focusout="makeInactive"
      @mouseenter="makeActive"
      @mouseleave="makeInactive"
      @click="goToMenu"
      @select="goToMenu">
      {{ label }}
    </button>
  </div>
  <!-- Render action button -->
  <div v-show="props.action !== undefined">
    <button
      :style="currentStyle"
      @focusin="makeActive"
      @focusout="makeInactive"
      @mouseenter="makeActive"
      @mouseleave="makeInactive"
      @click="doAction"
      @select="doAction">
      {{ label }}
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
button:focus,
button:focus-visible
  outline none
</style>
