<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToTestA = () => {
  router.push('/testa')
}

const goToTestB = () => {
  router.push('/testb')
}

</script>

<template>
  <h1>Main Menu</h1>
  <button @click="goToTestA">Test Menu A</button>
  <button @click="goToTestB">Test Menu B</button>
</template>

<style lang="stylus" scoped>
</style>
