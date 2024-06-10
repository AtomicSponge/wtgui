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
  msg:String
}>()
</script>

<template>
  <h2>{{ msg }}</h2>
</template>

<style lang="stylus" scoped>
h2
  font-size 1.6em
  line-height 0.2
  padding-left 0.6em
  padding-right 0.6em
</style>
