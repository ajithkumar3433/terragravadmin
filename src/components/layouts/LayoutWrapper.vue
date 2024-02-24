<script setup lang="ts">
  import {computed} from 'vue'
  import { useRoute } from 'vue-router'
  import DefaultLayout from './DefaultLayout.vue';
  import FullLayout from './FullLayout.vue';
  const route = useRoute()
  const defaulLayout = 'DefaultLayout'
  const layout = computed(()=>{
    return route.name === 'auth'?FullLayout:DefaultLayout;
  })
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<style scoped>
</style>
