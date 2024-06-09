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
  <wtgui-menu title="Main Menu" border-color="green">
    <wtgui-menu-row>
      <WTGuiButton msg="Test Menu A" @click="goToTestA"/>
      <WTGuiButton msg="Test Menu B" @click="goToTestB"/>
    </wtgui-menu-row>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
