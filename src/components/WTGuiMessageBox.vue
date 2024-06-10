<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  msg: string
}>()

const modalStyle = ref('display: hidden;')
</script>

<template>
  <div :style="modalStyle"></div>
</template>

<style lang="stylus" scoped>
</style>
