<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  //  Title display for menu
  title:String
  color?:String
  borderSize?:String
  borderColor?:String
}>()

const menuStyle = computed(() => {
  return `color: ${(props.color || 'red')};` +
    `border: ${(props.borderSize || '3px')} solid ${(props.borderColor || 'red')};`
})
</script>

<template>
  <section :style="menuStyle">
    <h1>{{ title }}</h1>
    <slot></slot>
  </section>
</template>

<style lang="stylus" scoped>
section
  border 3px solid red
  padding 32px
  border-radius 32px
  display flex
  flex-flow column nowrap
  place-items center
  color red
  background-color inherit
h1
  font-size 2.8em
  margin-top 12px
  margin-bottom 24px
</style>
