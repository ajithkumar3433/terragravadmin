<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import router from '@/router'
import config from '@/shared/config'
const profileMenu = ref(null)
const isMenu = ref(false)

const { getAdmin } = storeToRefs(useUserStore())
const { adminLogOut } = useUserStore()

onMounted(() => {
  document.addEventListener('click', hideMenu)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', hideMenu)
})
const hideMenu = (e: any) => {
  if (!(profileMenu.value as any).contains(e.target)) {
    isMenu.value = false;
  }
}
const logOut = () =>{
  adminLogOut()
  router.push({name:'auth'})
}
const changeMenuState = () => {
  isMenu.value = !isMenu.value
}
const getURL = () =>{
  return (getAdmin.value as any)?config.imageURL+(getAdmin.value as any).avatar:config.imageURL+'default.jpg'
}
</script>

<template>
  <div class="w-full fixed h-[80px] z-20">
    <div class="bg-white dark:bg-[#1e1e1e] shadow-lg border-b-2 py-3 px-5 md:px-[60px] w-full">
      <nav class="flex justify-between w-full">
        <RouterLink to="/" class="flex items-center text-xl font-bold">
          <div class="text-blue-500 ">
            <span class="text-2xl text-purple-500 italic">Terragrav</span> Admin Panel
          </div>
        </RouterLink>
        <div class="flex items-center gap-10">
          <div>
            <ul class="flex flex-auto space-x-10 select-none text-lg">
            <RouterLink to="/user">
              <li class="hover:text-blue-500 cursor-pointer font-medium text-base flex items-center">
                <span>User</span>
              </li>
            </RouterLink>
            <RouterLink to="/project">
              <li class=" hover:text-blue-500 cursor-pointer font-medium text-base flex items-center">
                <span>Project</span>
              </li>
            </RouterLink>
            <RouterLink to="/submission">
              <li class=" hover:text-blue-500 cursor-pointer font-medium text-base flex items-center">
                <span>Submission</span>
              </li>
            </RouterLink>
          </ul>
          </div>
          <div class="relative" ref="profileMenu">
            <div class="flex items-center text-black dark:text-[#DDDDDD]" @click="() => changeMenuState()">
              <span class="w-[48px]">
                <img :src="getURL()" alt="avatar" class="rounded-full" />
              </span>
              <span class="text-sm whitespace-nowrap select-none ml-2 dark:text-[#DDDDDD] md:block hidden">
                {{ getAdmin && (getAdmin as any).name }}
              </span>
              <font-awesome-icon icon="fa-solid fa-angle-down " class="ml-1" />
            </div>
            <div class="absolute bg-white dark:bg-[#1e1e1e] top-[60px] -right-[20px] w-[100px] md:w-full drop-shadow-lg"
              v-if="isMenu">
              <div class="px-3 py-2 hover:bg-sky-100 dark:hover:bg-[#252527] dark:text-[#DDDDDD] cursor-pointer"
                @click="()=>logOut()">Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
