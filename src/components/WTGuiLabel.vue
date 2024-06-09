<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <h2>{{ msg }}</h2>
</template>

<style lang="stylus" scoped>
h2
  font-size 2.0em
  line-height 0.8
</style>
