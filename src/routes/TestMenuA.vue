<script setup lang="ts">
import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'

</script>

<template>
  <wtgui-menu title="Test Menu A" :scale="2" focus-color="pink" :opaquency="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <WTGuiLabel msg="This menu is scaled"/>
    <WTGuiButton msg="Main Menu" goto="/"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
