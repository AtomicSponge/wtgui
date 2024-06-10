<script setup lang="ts">
import { useRouter } from 'vue-router'

import WtguiMenu from '../components/WtguiMenu.vue'
import WtguiMenuRow from '../components/WtguiMenuRow.vue'
import WTGuiButton from '../components/WTGuiButton.vue'

const router = useRouter()

const goToTestA = () => {
  router.push('/testa')
}

const goToTestB = () => {
  router.push('/testb')
}

</script>

<template>
  <wtgui-menu title="Main Menu" color="green" border-color="green" :scale="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <wtgui-menu-row>
      <WTGuiButton msg="Test Menu A" @click="goToTestA" @select="goToTestA"/>
      <WTGuiButton msg="Test Menu B" @click="goToTestB" @select="goToTestB"/>
    </wtgui-menu-row>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
