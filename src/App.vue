<script setup lang="ts">
import { provide, computed } from 'vue'
import { useGamepad } from '@vueuse/core'

//  Set up the gamepad here so we can detect globally and inject into components
const { gamepads } = useGamepad()
provide('gamepad', computed(() => gamepads.value.find(g => g.mapping === 'standard')))
</script>

<template>
  <main>
    <RouterView/>
  </main>
</template>

<style scoped>
</style>
