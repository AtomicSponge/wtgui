<script setup lang="ts">
import { ref } from 'vue'

import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiSelect from '../components/WTGuiSelect.vue'
import WTGuiInputSetting from '../components/WTGuiInputSetting.vue'
import WTGuiMessageBox from '../components/WTGuiMessageBox.vue'

const inputValue = ref('?')

const selectionValues = [ 'Hello World', 'testing', 'test' ]
//const selectionValues = [ 1, 2, 3 ]
const startSelect = 1
const currentSelection = ref('')
const showMessageBox = ref(false)

</script>

<template>
  <wtgui-menu title="Test Menu B" color="yellow" border-color="yellow" :scale="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <WTGuiInputSetting label="TESTING" v-model="inputValue"/>
    <WTGuiSelect
      label="Select me:"
      sound="./src/assets/click.wav"
      :values="selectionValues"
      :default-idx="startSelect"
      @selected="(v:string) => currentSelection = v"/>
    <WTGuiButton
      sound="./src/assets/click.wav"
      label="Click Me"
      :action="() => { showMessageBox = true }"/>
    <WTGuiButton
      sound="./src/assets/click.wav"
      label="Main Menu"
      goto="/"/>
    <!-- Hidden until `click me` button is selected -->
    <WTGuiMessageBox
      :label="currentSelection"
      :show-close="true"
      sound-open="./src/assets/click.wav"
      sound-close="./src/assets/click.wav"
      v-model="showMessageBox"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
