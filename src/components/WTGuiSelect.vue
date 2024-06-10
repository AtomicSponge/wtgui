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
  /** List of values to display in selection */
  values:Array<string>
  /** Index of the default selected item */
  default?:number
}>()

const emit = defineEmits<{
  /** Emit selected value from the props array */
  (e: 'selected', value:string):void
}>()

/** Selected index */
const idx = ref(0)
/** Reference to the CSS style of the display text */
const selectStyle = ref('')

/** Get scale from the menu props */
const scale = <number>inject('scale')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

/** Compute button CSS */
const buttonStyle = computed(() => {
  return `border-radius: ${16 * scale}px;` +
  `border: ${3 * scale}px solid; color: inherit;`
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

/**
 * Make a button active
 * @param event Event information
 */
const makeActive = (event:any) => {
  if(event.currentTarget.id === 'btnLeft')
    activeStyleLeft.value = toValue(buttonFocusStyle)
  if(event.currentTarget.id === 'btnRight')
    activeStyleRight.value = toValue(buttonFocusStyle)
}

/**
 * Make a button inactive
 * @param event Event information
 */
const makeInactive = (event:any) => {
  if(event.currentTarget.id === 'btnLeft')
    activeStyleLeft.value = toValue(buttonStyle)
  if(event.currentTarget.id === 'btnRight')
    activeStyleRight.value = toValue(buttonStyle)
}

/** Decrease index on left select */
const selectLeft = () => {
  if(idx.value > 0) --idx.value
  emit('selected', `${props.values[idx.value]}`)
}

/** Increase index on right select */
const selectRight = () => {
  if(idx.value < props.values.length - 1) ++idx.value
  emit('selected', `${props.values[idx.value]}`)
}

//  On mount, set the width to the max array element length
onMounted(() => {
  const longest = props.values.reduce((a, b) => {
    return a.length > b.length ? a : b
  })
  const width = Math.round(longest.length / 2)
  selectStyle.value = `width: ${width}em`

  //  If default was set, set default index
  if(props.default) idx.value = props.default
  emit('selected', `${props.values[idx.value]}`)
})
</script>

<template>
  <div>
    <button
      id="btnLeft"
      :style="activeStyleLeft"
      @focusin="makeActive"
      @focusout="makeInactive"
      @mouseenter="makeActive"
      @mouseleave="makeInactive"
      @click="selectLeft"
      @select="selectLeft">
      &#8592;
    </button>
    <h2 :style="selectStyle">{{ values[idx] }}</h2>
    <button
      id="btnRight"
      :style="activeStyleRight"
      @focusin="makeActive"
      @focusout="makeInactive"
      @mouseenter="makeActive"
      @mouseleave="makeInactive"
      @click="selectRight"
      @select="selectRight">
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
