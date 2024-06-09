<script setup lang="ts">
defineProps<{
  title:String
}>()
</script>

<template>
  <section>
    <h1>{{ title }}</h1>
    <slot></slot>
  </section>
</template>

<style lang="stylus" scoped>
section
  border 3px solid red
  padding 12px
  border-radius 12px
  display flex
  flex-flow column nowrap
  place-items center
  color red
  background-color inherit
h1
  font-size 2.8em
  line-height 0.8
</style>
