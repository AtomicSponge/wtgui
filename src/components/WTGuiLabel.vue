<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { inject, ref, computed, toRef, toValue, watch, onMounted, onBeforeUnmount } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  /** Display label */
  label:string
  /** Font color */
  fontColor?:string
}>()

const labelStyle = computed(() => {
  return `color: ${props.fontColor || 'inherit'}`
})

</script>

<template>
  <div><h2 :style="labelStyle">{{ label }}</h2></div>
</template>

<style lang="stylus" scoped>
h2
  font-size 1.4em
  line-height 0.2
  padding-left 0.6em
  padding-right 0.6em
</style>
