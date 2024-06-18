<script setup lang="ts">
import { scaleStore } from '../stores/scaleStore'

import WTGuiButton from '../components/WTGuiButton.vue'

const scale = scaleStore()
</script>

<template>
  <wtgui-menu title="Main Menu" color="green" title-color="aqua" border-color="orange"
    :scale="scale.value" font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <WTGuiButton
      sound="./src/assets/click.wav"
      label="Test Menu A"
      goto="/testa"/>
    <WTGuiButton
      sound="./src/assets/click.wav"
      label="Test Menu B"
      goto="/testb"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
