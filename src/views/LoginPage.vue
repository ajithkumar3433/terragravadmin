<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';

const router = useRouter()
const email = ref('')
const password = ref('')
const {
  getAdmin
} = storeToRefs(useUserStore())
const {
  adminLogin
} = useUserStore()

onMounted(async () => {

})
const changeEmail = (value:string) =>{
  email.value = value
}
const changePassword = (value:string) =>{
  password.value = value
}
const logIn = async () =>{
  if(email.value === "") {
    alert('Please enter your email.')
    return
  }
  if(password.value === "") {
    alert('Please enter your password.')
    return
  }
  await adminLogin(email.value, password.value)
  if(getAdmin.value) router.push({name:'user'})
}

</script>

<template>
  <div class="w-full h-screen bg-black flex justify-center items-center">
    <div class="bg-gray-100 w-[400px] p-5 rounded-lg">
      <div class="flex justify-center items-end text-xl text-gray-900 font-bold">
        <span class="text-2xl mr-2 italic text-purple-600">Terragrav</span> Administrator
      </div>
      <div class="mt-3">
        <input type="text" id="email"
            class="bg-white  border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:border-blue-500 focus-visible:border-2 block w-full p-2 h-[48px]"
            placeholder="Enter your email" :value="email" @input="(e) => changeEmail((e.target as any).value)"/>
      </div>
      <div class="mt-3">
        <input type="password" id="password"
            class="bg-white  border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus-visible:border-blue-500 focus-visible:border-2 block w-full p-2 h-[48px]"
            placeholder="Enter your password" :value="password" @input="(e) => changePassword((e.target as any).value)" />
      </div>
      <div class="mt-3 w-full">
        <button class="bg-purple-700 hover:bg-purple-500 active:bg-purple-800 rounded-lg h-[48px] flex items-center justify-center w-full text-white font-medium" @click="()=>logIn()">
          Log in
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
