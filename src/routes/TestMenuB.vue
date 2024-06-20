<script setup lang="ts">
import { ref } from 'vue'

import { inputStore } from '../stores/inputStore'
import { scaleStore } from '../stores/scaleStore'
import { selectionStore } from '../stores/selectionStore'

import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiSelect from '../components/WTGuiSelect.vue'
import WTGuiInputSetting from '../components/WTGuiInputSetting.vue'
import WTGuiMessageBox from '../components/WTGuiMessageBox.vue'

const scale = scaleStore()

const input = inputStore()
const selection = selectionStore()

const startIdx = selection.options.indexOf(selection.value)
const showMessageBox = ref(false)

</script>

<template>
  <wtgui-menu title="Test Menu B" color="yellow" title-color="orange" border-color="orange"
    :scale="scale.value" font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <WTGuiInputSetting
      label="Select this >"
      sound-open="./src/assets/open.wav"
      sound-close="./src/assets/close.wav"
      v-model="input.value"/>
    <WTGuiSelect
      label="Select me:"
      sound="./src/assets/click.wav"
      :values="selection.options"
      :default-idx="startIdx"
      @selected="(v:string) => selection.set(v)"/>
    <WTGuiButton
      sound="./src/assets/click.wav"
      label="Click Me"
      :action="() => { showMessageBox = true }"/>
    <WTGuiButton
      sound="./src/assets/click.wav"
      label="Main Menu"
      goto="/main"/>
    <!-- Hidden until `click me` button is selected -->
    <WTGuiMessageBox
      :label="selection.value"
      :show-close="true"
      sound-open="./src/assets/open.wav"
      sound-close="./src/assets/close.wav"
      v-model="showMessageBox"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
