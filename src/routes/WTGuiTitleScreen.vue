<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useGamepad } from '@vueuse/core'
import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'

const router = useRouter()

const { onConnected } = useGamepad()

/** Main menu route provided from options */
const mainMenuRoute = <string>inject('mainMenuRoute')
/** Game title from options */
const gameTitle = <string>inject('gameTitle')
/** Game title scale provided from options */
const defaultScale = <number>inject('defaultScale')

/** Delay for menu transition */
const delay:MenuDelay = 300

/**
 * Go to the main menu on input
 * @param event Input event
 */
const goToMain = (event?:any) => {
  if(event !== undefined) event.preventDefault()
  setTimeout(() => {
    router.push(mainMenuRoute)
  }, delay)
}

//  Gamepad was interacted with
onConnected(() => { goToMain() })

onMounted(() => {
  window.addEventListener('keydown', goToMain)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', goToMain)
})
</script>

<template>
  <wtgui-menu :title="gameTitle" :scale="defaultScale">
    <WTGuiLabel label="Press a key or button"/>
  </wtgui-menu>
</template>
