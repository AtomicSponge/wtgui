<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { computed, provide } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  /** Title display for menu */
  title: { type: String, required: true },
  /** CSS Font type for menu */
  font:  { type: String, required: true },
  /** Scale factor for menu */
  scale: {
    type: Number,
    required: true,
    validator(value:number) {
      return [1, 2, 3, 4].includes(value)
    }
  },
  /** CSS color for menu */
  color: { type: String, default: 'red' },
  /** CSS focus color for menu */
  focusColor: { type: String, default: '#646cff' },
  /** Border thickness */
  borderSize: { type: Number, default: 8 },
  /** CSS color for the menu border */
  borderColor: { type: String, default: 'red' },
  /** Opaquency of the menu */
  opaquency: {
    type: Number,
    validator(value:number) {
      return (value >= 0.0 && value <= 1.0)
    },
    default: 0.30
  }
})

/** Compute the CSS style for the menu */
const menuStyle = computed(() => {
  return `color: ${props.color};font-size: ${props.scale}em;` +
    `border: ${(props.borderSize * props.scale)}px ` +
    `solid ${props.borderColor};font-family: ${props.font};` +
    `border-radius: ${(32 * props.scale)}px;` +
    `background-color: rgba(0, 0, 0, ${props.opaquency})`
})

//  Compute scale so sub items can update
provide('scale', computed(() => { return props.scale }))
provide('color', props.color)
provide('focus-color', props.focusColor)
</script>

<template>
  <section :style="menuStyle">
    <h1>{{ title }}</h1>
    <slot></slot>
  </section>
</template>

<style lang="stylus" scoped>
section
  line-height 1.5
  font-weight 400
  padding 1.4em 3em
  display flex
  flex-flow column nowrap
  place-items center
h1
  font-size 3.0em
  margin-top 0.2em
  margin-bottom 0.2em
</style>
