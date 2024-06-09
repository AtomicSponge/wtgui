<script setup lang="ts">
import { computed, provide } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  //  Title display for menu
  title:String
  font:String
  color?:String
  borderSize?:String
  borderColor?:String
  scale?:String
}>()

const menuStyle = computed(() => {
  return `color: ${(props.color || 'red')};font-size: ${props.scale || 1}em;` +
    `border: ${(props.borderSize || '6px')} solid ${(props.borderColor || 'red')};` +
    `font-family: ${props.font}`
})

provide('scale', props.scale || 1)
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
  padding 32px
  border-radius 32px
  display flex
  flex-flow column nowrap
  place-items center
  background-color rgba(0, 0, 0, 0.0)
h1
  font-size 3.4em
  margin-top 12px
  margin-bottom 24px
</style>
