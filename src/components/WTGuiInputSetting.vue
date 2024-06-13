<!--
  @wtfsystems/wtgui
  By:  Matthew Evans
  copyright MIT see LICENSE.md
-->

<script setup lang="ts">
import { ref, computed, toValue, inject, onMounted } from 'vue'
import WTGuiMessageBox from './WTGuiMessageBox.vue'

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

const value = defineModel()

const showInputMessageBox = ref(false)
const showAppliedMessageBox = ref(false)

</script>

<template>
  <div class="main">
    <h2>{{ props.label }}</h2>
    <div class="input" tabindex="0">
      {{ value }}
    </div>
    <WTGuiMessageBox
      label="Press a key or button"
      :show-close="false"
      sound-open="./src/assets/click.wav"
      sound-close="./src/assets/click.wav"
      v-model="showInputMessageBox"/>
    <WTGuiMessageBox
      label="Setting applied"
      :show-close="true"
      sound-open="./src/assets/click.wav"
      sound-close="./src/assets/click.wav"
      v-model="showAppliedMessageBox"/>
  </div>
</template>

<style lang="stylus" scoped>
.main
  display flex
  flex-flow row nowrap
  place-items center
.input
  border 3px solid
  border-radius 16px
  padding 0.2em 0.6em
  margin 0.6em
  font-size 1.6em
  font-weight 800
  cursor pointer
.input:focus,
.input:focus-visible
  outline none
</style>
