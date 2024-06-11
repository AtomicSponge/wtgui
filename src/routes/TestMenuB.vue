<script setup lang="ts">
import { ref } from 'vue'

import WtguiMenu from '../components/WtguiMenu.vue'
import WtguiMenuRow from '../components/WtguiMenuRow.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'
import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiSelect from '../components/WTGuiSelect.vue'
import WTGuiMessageBox from '../components/WTGuiMessageBox.vue'

const selectionValues = [ 'Hello World', 'testing', 'test' ]
//const selectionValues = [ 1, 2, 3 ]
const startSelect = 1
const currentSelection = ref('')
const showMessageBox = ref(false)

</script>

<template>
  <wtgui-menu title="Test Menu B" color="yellow" border-color="yellow" :scale="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <wtgui-menu-row>
      <WTGuiLabel msg="Select me:"/>
      <WTGuiSelect
        :values="selectionValues"
        :default="startSelect"
        @selected="(v:string) => currentSelection = v"/>
    </wtgui-menu-row>
    <WTGuiButton msg="Click Me" :action="() => { showMessageBox = true }"/>
    <WTGuiButton msg="Main Menu" goto="/"/>
    <!-- Hidden until `click me` button is selected -->
    <WTGuiMessageBox :msg="currentSelection" v-model="showMessageBox"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
