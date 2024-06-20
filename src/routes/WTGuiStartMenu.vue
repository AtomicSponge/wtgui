<script setup lang="ts">
import { ref, computed, provide, onMounted, onUpdated, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'
import { gamepadAPI } from '../lib/gamepadApi'

const router = useRouter()

const delay:MainMenuDelay = 300

const goToMainButton = (event:any) => {
  gamepadAPI.connect(event)
  setTimeout(() => {
    router.push('/main')
  }, delay)
}

const goToMainKey = (event:any) => {
  event.preventDefault()
  setTimeout(() => {
    router.push('/main')
  }, delay)
}

onMounted(() => {
  window.addEventListener('gamepadconnected', goToMainButton)
  window.addEventListener('keydown', goToMainKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('gamepadconnected', gamepadAPI.disconnect)
  window.removeEventListener('keydown', goToMainKey)
})
</script>

<template>
  <wtgui-menu title="Game Title" color="green" title-color="aqua" border-color="orange"
  :scale="2" font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">
    <WTGuiLabel
      label="Press a key or button"
      font-color="pink"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
