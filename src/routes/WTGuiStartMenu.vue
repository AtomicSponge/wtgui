<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'
import { gamepadAPI } from '../lib/gamepadApi'

const router = useRouter()

/** Main menu route provided from options */
const mainMenuRoute = <string>inject('mainMenuRoute')
/** Game title from options */
const gameTitle = <string>inject('gameTitle')
/** Game title scale provided from options */
const defaultScale = <number>inject('defaultScale')

const delay:MenuDelay = 300

/**
 * Go to the main menu on button press
 * @param event Input event
 */
const goToMainButton = (event:any) => {
  //  Register a gamepad
  gamepadAPI.connect(event)
  setTimeout(() => {
    router.push(mainMenuRoute)
  }, delay)
}

/**
 * Go to the main menu on key press
 * @param event Input event
 */
const goToMainKey = (event:any) => {
  event.preventDefault()
  setTimeout(() => {
    router.push(mainMenuRoute)
  }, delay)
}

onMounted(() => {
  window.addEventListener('gamepadconnected', goToMainButton)
  window.addEventListener('keydown', goToMainKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('gamepadconnected', goToMainButton)
  window.removeEventListener('keydown', goToMainKey)
})
</script>

<template>
  <wtgui-menu :title="gameTitle" :scale="defaultScale">
    <WTGuiLabel label="Press a key or button"/>
  </wtgui-menu>
</template>

<style lang="stylus" scoped>
</style>
