<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import WtguiMenu from '../components/WtguiMenu.vue'
import WtguiMenuRow from '../components/WtguiMenuRow.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'
import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiSelect from '../components/WTGuiSelect.vue'
import WTGuiMessageBox from '../components/WTGuiMessageBox.vue'

const router = useRouter()

const goToMain = () => {
  router.push('/')
}

const selectionValues = [ 'Hello World', 'testing', 'test' ]
const startSelect = 1
const currentSelection = ref('')
const visible = ref(false)

</script>

<template>
  <wtgui-menu title="Test Menu B" color="yellow" border-color="yellow" :scale="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <wtgui-menu-row>
      <WTGuiLabel msg="Select me:"/>
      <WTGuiSelect
        :values="selectionValues"
        :default="startSelect"
        @selected="(v) => currentSelection = v"/>
    </wtgui-menu-row>
    <WTGuiButton msg="Click Me" @click="visible = true"/>
    <WTGuiButton msg="Main Menu" @click="goToMain"/>
    <!-- Hidden until `click me` button is selected -->
    <WTGuiMessageBox :msg="currentSelection" v-model="visible"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
