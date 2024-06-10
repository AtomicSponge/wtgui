<script setup lang="ts">
import { computed, provide } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  font:  {
    type: String,
    required: true
  },
  scale: {
    type: Number,
    required: true,
    validator(value) {
      return [1, 2, 3, 4].includes(<number>value)
    }
  },
  color: {
    type: String,
    default: 'red'
  },
  borderSize: {
    type: Number,
    default: 6
  },
  borderColor: {
    type: String,
    default: 'red'
  }
})

const menuStyle = computed(() => {
  return `color: ${props.color};font-size: ${props.scale}em;` +
    `border: ${(props.borderSize * props.scale)}px ` +
    `solid ${props.borderColor};font-family: ${props.font};` +
    `border-radius: ${(32 * props.scale)}px;`
})

provide('scale', props.scale)
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
  background-color rgba(0, 0, 0, 0.0)
h1
  font-size 3.0em
  margin-top 0.2em
  margin-bottom 0.2em
</style>
