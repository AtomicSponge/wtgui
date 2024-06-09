<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMain = () => {
  router.push('/')
}

</script>

<template>
  <h1>Test Menu B</h1>
  <button @click="goToMain">Main Menu</button>
</template>

<style lang="stylus" scoped>
</style>
