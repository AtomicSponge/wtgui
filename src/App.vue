<script setup lang="ts">
import { ref, provide } from 'vue'

const scaleOptions = [ 1, 2, 3, 4 ]
const scaleSelected = ref(1)

provide('scale', scaleSelected)
</script>

<template>
  <div class="scaler">
    Scale:
    <select v-model="scaleSelected">
      <option
        v-for="(scale, idx) in scaleOptions"
        :value="scale"
        :key="idx">
        {{ scale }}
      </option>
    </select>
  </div>

  <main>
    <RouterView />
  </main>
</template>

<style lang="stylus" scoped>
.scaler
  position absolute
  top 0px
  left 0px
  color white
  font-style Arial
</style>
