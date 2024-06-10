<script setup lang="ts">
import { ref, computed, toValue, inject, onMounted } from 'vue'

const props = defineProps<{
  values: Array<String>
}>()

const idx = ref(0)
const selectStyle = ref('')

const scale = <number>inject('scale')
const focusColor = <string>inject('focus-color')

const buttonStyle = computed(() => {
  return `border-radius: ${16 * scale}px;` +
  `border: ${3 * scale}px solid; color: inherit;`
})

const buttonFocusStyle = computed(() => {
  return `border-radius: ${16 * scale}px;` + 
  `border: ${3 * scale}px solid ${focusColor};` +
  `color: ${focusColor};`
})

const _btnStyle = toValue(buttonStyle)
const _btnFocusStyle = toValue(buttonFocusStyle)
const activeStyleLeft = ref(_btnStyle)
const activeStyleRight = ref(_btnStyle)

/**
 * Make a button active
 * @param event Event information
 */
const makeActive = (event:any) => {
  if(event.currentTarget.id === 'btnLeft')
    activeStyleLeft.value = _btnFocusStyle
  if(event.currentTarget.id === 'btnRight')
    activeStyleRight.value = _btnFocusStyle
}

/**
 * Make a button inactive
 * @param event Event information
 */
const makeInactive = (event:any) => {
  if(event.currentTarget.id === 'btnLeft')
    activeStyleLeft.value = _btnStyle
  if(event.currentTarget.id === 'btnRight')
    activeStyleRight.value = _btnStyle
}

/** Decrease index on left select */
const selectLeft = () => {
  if(idx.value > 0) --idx.value
}

/** Increase index on right select */
const selectRight = () => {
  if(idx.value < props.values.length - 1) ++idx.value
}

onMounted(() => {
  const longest = props.values.reduce((a, b) => {
    return a.length > b.length ? a : b
  })
  const width = Math.round(longest.length / 2)
  selectStyle.value = `width: ${width}em`
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
      @click="selectLeft">
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
