<script setup lang="ts">
import { useRouter } from 'vue-router'

import WtguiMenu from '../components/WtguiMenu.vue'

const router = useRouter()

const goToMain = () => {
  router.push('/')
}

</script>

<template>
  <wtgui-menu>
    <h1>Test Menu B</h1>
    <button @click="goToMain">Main Menu</button>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
