<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import WtguiMenu from '../components/WtguiMenu.vue'
import WTGuiLabel from '../components/WTGuiLabel.vue'

const router = useRouter()

/** Main menu route provided from options */
const mainMenuRoute = <string>inject('mainMenuRoute')
/** Game title from options */
const gameTitle = <string>inject('gameTitle')
/** Game title scale provided from options */
const defaultScale = <number>inject('defaultScale')

const delay:MenuDelay = 300

/**
 * Go to the main menu on input
 * @param event Input event
 */
const goToMain = (event:any) => {
  event.preventDefault()
  setTimeout(() => {
    router.push(mainMenuRoute)
  }, delay)
}

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

<style lang="stylus" scoped>
</style>
