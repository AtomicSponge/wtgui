<script setup lang="ts">
import { useRouter } from 'vue-router'

import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'
import WTGuiButton from '../components/WTGuiButton.vue'

const router = useRouter()

const goToMain = () => {
  router.push('/')
}

</script>

<template>
  <wtgui-menu>
    <WTGuiLabel msg="Test Menu B"/>
    <WTGuiButton msg="Main Menu" @click="goToMain"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
