<script setup lang="ts">
import { provide, computed } from 'vue'
import { useGamepad, mapGamepadToXbox360Controller } from '@vueuse/core'

//  Configure gamepad here then provide
const { gamepads } = useGamepad()
const gamepad = computed(() => gamepads.value.find(g => g.mapping === 'standard'))
const controller = mapGamepadToXbox360Controller(gamepad)

provide('controller', controller)
</script>

<template>
  <main>
    <RouterView/>
  </main>
</template>

<style scoped>
</style>
