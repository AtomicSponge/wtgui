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

</script>

<template>
  <wtgui-menu title="Test Menu B" color="yellow" border-color="yellow" :scale="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <wtgui-menu-row>
      <WTGuiLabel msg="Select me:"/>
      <WTGuiSelect :values="[ 'Hello World', 'testing', 'test' ]" :default="1"/>
    </wtgui-menu-row>
    <WTGuiButton msg="Click Me" @click=""/>
    <WTGuiButton msg="Main Menu" @click="goToMain"/>

    <WTGuiMessageBox msg="TESTING!"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
