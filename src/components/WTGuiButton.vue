<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <button type="button">{{ msg }}</button>
</template>

<style lang="stylus" scoped>
button
  border-radius 32px
  border 3px solid
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
