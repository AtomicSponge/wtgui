<script setup lang="ts">
import { provide, computed } from 'vue'
import { useGamepad } from '@vueuse/core'

//  Configure gamepad here then provide
const { gamepads } = useGamepad()
const gamepad = computed(() => gamepads.value.find(g => g.mapping === 'standard'))

provide('gamepad', gamepad)
</script>

<template>
  <main>
    <RouterView/>
  </main>
</template>

<style scoped>
</style>
