<script setup lang="ts">
import { RouterView } from "vue-router";
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import LayoutWrapper from "./components/layouts/LayoutWrapper.vue";
import { useRoute } from "vue-router";
import Loading from 'vue-loading-overlay';

const route = useRoute()
const { 
  getIsLoading
} = storeToRefs(useUserStore())
const { } = useUserStore()

</script>

<template>
  <main >
    <div class="w-full bg-[rgba(0,0,0,0.5)] fixed flex justify-center items-center h-full z-50" v-if="getIsLoading">
      <Loading :active="getIsLoading" :isFullPage="true" />
    </div>
    <LayoutWrapper>
      <RouterView />
    </LayoutWrapper>
  </main>
</template>

<style scoped>
</style>
