<script setup lang="ts">
import { useRouter } from 'vue-router'

import WtguiMenu from '../components/WtguiMenu.vue'
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
  <wtgui-menu>
    <h1>Main Menu</h1>
    <WTGuiButton msg="Test Menu A" @click="goToTestA"/>
    <WTGuiButton msg="Test Menu B" @click="goToTestB"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
