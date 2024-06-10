<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <section>
    <slot></slot>
  </section>
</template>

<style lang="stylus" scoped>
section
  display flex
  flex-flow row nowrap
  place-items center
  color inherit
  background-color background-color rgba(0, 0, 0, 0.0)
</style>
