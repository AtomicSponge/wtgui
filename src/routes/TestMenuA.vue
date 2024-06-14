<script setup lang="ts">
import { inject } from 'vue'

import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'

const scale = <number>inject('scale')
</script>

<template>
  <wtgui-menu title="Test Menu A" :scale="scale" focus-color="pink" :opaquency="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <WTGuiLabel label="This menu has no sound"/>
    <WTGuiButton label="Main Menu" goto="/"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
