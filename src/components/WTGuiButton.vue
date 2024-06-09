<script setup lang="ts">
import { computed, inject } from 'vue'

defineProps<{
  msg: string
}>()

const scale = <number>inject('scale')

const buttonStyle = computed(() => {
  return `border-radius: ${16 * scale}px;border: ${3 * scale}px solid;`
})
</script>

<template>
  <button :style="buttonStyle">{{ msg }}</button>
</template>

<style lang="stylus" scoped>
button
  padding 0.6em 1.2em
  margin 0.6em
  font-size 1.6em
  font-weight 800
  font-family inherit
  color inherit
  background-color inherit
  cursor pointer
  transition border-color 0.25s
button:hover
  border-color #646cff
button:focus,
button:focus-visible
  outline 4px auto -webkit-focus-ring-color
</style>
