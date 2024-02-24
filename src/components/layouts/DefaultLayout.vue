<script setup lang="ts">
  import HeaderBar from '@/components/layouts/HeaderBar.vue';
</script>


<template>
  <div class="w-full">
    <HeaderBar />
    <slot />
  </div>
</template>

<style scoped>
</style>
