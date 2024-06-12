# API Examples

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { WtguiMenu, WtguiMenuRow, WTGuiLabel, WTGuiButton, WTGuiSelect, WTGuiMessageBox } from '@wtfsystems/wtgui'

const selectionValues = [ 'Hello World', 'testing', 'test' ]
const startSelect = 1
const currentSelection = ref('')
const showMessageBox = ref(false)

</script>

<template>
  <wtgui-menu title="Test Menu B" color="yellow" border-color="yellow" :scale="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <wtgui-menu-row>
      <WTGuiLabel label="Select me:"/>
      <WTGuiSelect
        sound="./src/assets/click.wav"
        :values="selectionValues"
        :default="startSelect"
        @selected="(v:string) => currentSelection = v"/>
    </wtgui-menu-row>
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
      sound="./src/assets/click.wav"
      :label="currentSelection"
      v-model="showMessageBox"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
```
