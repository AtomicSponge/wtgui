<script setup lang="ts">
import WtguiMenu from '../components/WtguiMenu.vue'
import WtguiMenuRow from '../components/WtguiMenuRow.vue'
import WTGuiButton from '../components/WTGuiButton.vue'

</script>

<template>
  <wtgui-menu title="Main Menu" color="green" border-color="green" :scale="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <wtgui-menu-row>
      <WTGuiButton label="Test Menu A" goto="/testa"/>
      <WTGuiButton label="Test Menu B" goto="/testb"/>
    </wtgui-menu-row>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
