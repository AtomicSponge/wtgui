<script setup lang="ts">
import { useRouter } from 'vue-router'

import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiButton from '../components/WTGuiButton.vue'
import WTGuiSelect from '../components/WTGuiSelect.vue'

const router = useRouter()

const goToMain = () => {
  router.push('/')
}

</script>

<template>
  <wtgui-menu title="Test Menu B" color="yellow" border-color="yellow" :scale="1"
    font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <WTGuiSelect :values="[ 'Hello World' ]"/>
    <WTGuiButton msg="Main Menu" @click="goToMain"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
