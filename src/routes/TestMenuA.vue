<script setup lang="ts">
import { ref, inject } from 'vue'

import { scaleStore } from '../stores/scaleStore'

import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'
import WTGuiSelect from '../components/WTGuiSelect.vue'

/** Main menu route provided from options */
const mainMenuRoute = <string>inject('mainMenuRoute')

const scale = scaleStore()
const scaleIdx = scale.options.indexOf(scale.value)
const currentScale = ref(scale.value)
</script>

<template>
  <wtgui-menu title="Test Menu A" :scale="scale.value" :opaquency="1">
    <WTGuiLabel
      label="This menu has no sound"
      font-color="pink"/>
    <WTGuiSelect
      label="Scale:"
      :values="scale.options"
      :default-idx="scaleIdx"
      @selected="(v:number) => currentScale = v"/>
    <WTGuiButton label="Apply" :action="() => { scale.set(currentScale) }"/>
    <WTGuiButton label="Main Menu" :goto="mainMenuRoute"/>
  </wtgui-menu>
</template>
