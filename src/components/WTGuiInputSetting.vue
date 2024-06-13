<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, toValue, inject, onMounted } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  label: string
}>()

/** Get scale from the menu props */
const scale = <number>inject('scale')
/** Get color from the menu props */
const color = <string>inject('color')
/** Get focus color from the menu props */
const focusColor = <string>inject('focus-color')

</script>

<template>
  <div class="main">
    <h2>{{ props.label }}</h2>
    <div class="input">
      ?
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.main
  display flex
  flex-flow row nowrap
  place-items center
.input
  border 1px solid
</style>
