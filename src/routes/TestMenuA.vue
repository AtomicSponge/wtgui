<script setup lang="ts">
import { ref } from 'vue'

import { scaleStore } from '../stores/scaleStore'

import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'
import WTGuiSelect from '../components/WTGuiSelect.vue'

const scale = scaleStore()
const scaleIdx = scale.options.indexOf(scale.value)
const currentScale = ref(scale.value)
</script>

<template>
  <wtgui-menu title="Test Menu A" :scale="scale.value" focus-color="pink" :opaquency="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <WTGuiLabel
      label="This menu has no sound"
      font-color="pink"/>
    <WTGuiSelect
      label="Scale:"
      :values="scale.options"
      :default-idx="scaleIdx"
      @selected="(v:number) => currentScale = v"/>
    <WTGuiButton label="Apply" :action="() => { scale.set(currentScale) }"/>
    <WTGuiButton label="Main Menu" goto="/"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
