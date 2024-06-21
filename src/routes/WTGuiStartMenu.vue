<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'
import { gamepadAPI } from '../lib/gamepadApi'

const router = useRouter()

const mainMenu = <string>inject('mainMenu')
const defaultScale = <number>inject('defaultScale')

const delay:MenuDelay = 300

/**
 * Go to the main menu on button press
 * @param event Input event
 */
const goToMainButton = (event:any) => {
  gamepadAPI.connect(event)
  setTimeout(() => {
    router.push(mainMenu)
  }, delay)
}

/**
 * Go to the main menu on key press
 * @param event Input event
 */
const goToMainKey = (event:any) => {
  event.preventDefault()
  setTimeout(() => {
    router.push(mainMenu)
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
  <wtgui-menu :scale="defaultScale">
    <WTGuiLabel label="Press a key or button"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
