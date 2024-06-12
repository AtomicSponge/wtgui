<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

defineProps<{
  /** Display label */
  label:string
}>()
</script>

<template>
  <div><h2>{{ label }}</h2></div>
</template>

<style lang="stylus" scoped>
h2
  font-size 1.6em
  line-height 0.2
  padding-left 0.6em
  padding-right 0.6em
</style>
