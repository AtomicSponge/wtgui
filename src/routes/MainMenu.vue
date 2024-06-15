<script setup lang="ts">
import { inject } from 'vue'

import WTGuiButton from '../components/WTGuiButton.vue'

const scale = <number>inject('scale')
</script>

<template>
  <wtgui-menu title="Main Menu" color="green" border-color="orange" :scale="scale"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <wtgui-menu-row>
      <WTGuiButton
        sound="./src/assets/click.wav"
        label="Test Menu A"
        goto="/testa"/>
      <WTGuiButton
        sound="./src/assets/click.wav"
        label="Test Menu B"
        goto="/testb"/>
    </wtgui-menu-row>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
