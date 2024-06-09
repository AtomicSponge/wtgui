<script setup lang="ts">
import { useRouter } from 'vue-router'

import WtguiMenu from '../components/WtguiMenu.vue'

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
    <button @click="goToTestA">Test Menu A</button>
    <button @click="goToTestB">Test Menu B</button>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
