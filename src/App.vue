<template>
  <RouterView v-if="isRouterAlive"></RouterView>
</template>

<script setup lang="ts">
import { provide, nextTick, ref } from 'vue';

let isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(function () {
    isRouterAlive.value = true
  })
}

provide('reload',reload)

</script>

<style scoped>

</style>