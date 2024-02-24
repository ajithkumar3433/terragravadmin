<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user.js';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import type { IUser } from '@/shared/interfaces'

const isAddModal = ref(false)
const isDeleteModal = ref(false)
const currentUser = ref('')
const fullname = ref('')
const email = ref('')
const userType = ref('Investor')
const password = ref('')
const currentPage = ref(1)
const usersPerPage = ref(5)
const isDetail = ref(false)
const pageRef = ref(null)
const skipPages = ref(0)
const searchFullname = ref('')
const searchEmail = ref('')
const searchUserType = ref('')
const searchActive = ref('')
const modalTitle = ref('')
const isResetModal = ref(false)
const resetPassword = ref('')
const isVerifyModal = ref(false)

const {
  getUsers,
  getTotalCount
} = storeToRefs(useUserStore())
const {
  fetchAllUsers,
  registerUser,
  removeUser,
  updateUser,
  resetUserPasword,
  verifyUserAccount
} = useUserStore()

onMounted(async () => {
  await fetchAllUsers(currentPage.value, usersPerPage.value, searchFullname.value, searchEmail.value, searchUserType.value, searchActive.value)
  skipPages.value = (currentPage.value-1)*usersPerPage.value
  document.addEventListener('click', hideMenu)
})

onBeforeUnmount(()=>{
  document.removeEventListener('click', hideMenu)
})

const hideMenu = (e:any) =>{
  if (!(pageRef.value as any).contains(e.target)) {
    isDetail.value = false;
  }
}

const showAddModal = (type:string, id:string) => {
  currentUser.value = id
  if(type==='add'){
    fullname.value = ''
    email.value = ''
    userType.value = 'Investor'
    password.value = ''
    modalTitle.value = 'Add new user'
  }else{
    let temp = getUsers.value.filter((user:IUser)=> user._id === currentUser.value)[0]
    console.log(temp)
    fullname.value = temp.name
    email.value = temp.email
    userType.value = temp.priority
    password.value = temp.password
    modalTitle.value = 'Edit user'
  }
  isAddModal.value = true
}
const hideAddModal = () => {
  isAddModal.value = false
}
const showDeleteModal = (value: string) => {
  isDeleteModal.value = true
  currentUser.value = value
}
const hideDeleteModal = () => {
  isDeleteModal.value = false
}
const changeFullname = (value: string) => {
  fullname.value = value
}
const changePassword = (value: string) => {
  password.value = value
}
const changeEmail = (value: string) => {
  email.value = value
}
const changeUserType = (value: string) => {
  userType.value = value
}
const userAction = async (value:string) => {
  if (fullname.value === "" || password.value === "" || email.value === "") {
    alert("Please fill out all fields")
    return
  }
  console.log(value)
  let response
  if(value === 'Add new user'){
    response = await registerUser(fullname.value, email.value, password.value, userType.value, 1, usersPerPage.value)
    currentPage.value=1
    skipPages.value = (currentPage.value-1)*usersPerPage.value
  }else{
    response = await updateUser(currentUser.value, fullname.value, email.value, password.value, userType.value, 1, usersPerPage.value)
  }
  skipPages.value = 0
  currentPage.value = 1
  alert((response as any).data.message)
  if ((response as any).data.success) isAddModal.value = false
}
const deleteUser = async () => {
  const response = await removeUser(currentUser.value, 1, usersPerPage.value)
  currentPage.value=1
  skipPages.value = (currentPage.value-1)*usersPerPage.value
  alert((response as any).data.message)
  if ((response as any).data.success) isDeleteModal.value = false
}
const updateHandler = async (value: number) => {
  await fetchAllUsers(value, usersPerPage.value, searchFullname.value, searchEmail.value, searchUserType.value, searchActive.value)
  currentPage.value = value
  skipPages.value = (currentPage.value-1)*usersPerPage.value
}
const changeState = async (value:number) =>{
  isDetail.value = !isDetail.value
  if(value!==0){
    usersPerPage.value = value
    currentPage.value = 1
    await fetchAllUsers(currentPage.value, usersPerPage.value, searchFullname.value, searchEmail.value, searchUserType.value, searchActive.value)
    skipPages.value = (currentPage.value-1)*usersPerPage.value
  }
}
const changeSearchFullname = (value:string) =>{
  searchFullname.value = value
}
const changeSearchEmail = (value:string) =>{
  searchEmail.value = value
}
const changeSearchUserType = (value:string) =>{
  searchUserType.value = value
}
const changeSearchActive = (value:string) =>{
  searchActive.value = value
}
const search = async () =>{
  console.log(searchFullname.value, searchEmail.value, searchUserType.value, searchActive.value)
  await fetchAllUsers(1, usersPerPage.value, searchFullname.value, searchEmail.value, searchUserType.value, searchActive.value)
}
const selectUser = (value:string) =>{
  currentUser.value = value
  console.log(currentUser.value)
}
const hideResetModal = () =>{
  isResetModal.value = false
}
const changeResetPassword = (value:string) =>{
  resetPassword.value = value
}
const resetPasswordFunc = async () =>{
  const response = await resetUserPasword(currentUser.value, resetPassword.value, currentPage.value, usersPerPage.value)
  alert((response as any).data.message)
  if ((response as any).data.success) isResetModal.value = false
}
const showResetModal = (value:string) =>{
  currentUser.value = value
  isResetModal.value = true
}
const hideVerifyModal = () =>{
  isVerifyModal.value = false
}
const showVerifyModal = (value:string) =>{
  currentUser.value = value
  isVerifyModal.value = true
}
const setActive = async (value:string) =>{
  const response = await verifyUserAccount(currentUser.value, value, currentPage.value, usersPerPage.value)
  alert((response as any).data.message)
  if ((response as any).data.success) isVerifyModal.value = false
}
</script>

<template>
  <div class="fixed h-screen w-full bg-[#00000030] z-40 flex items-center justify-center" v-if="isAddModal">
    <div class="fixed h-screen w-full bg-[#00000030]" @click="() => hideAddModal()"></div>
    <div class="mx-5 p-8 py-6 w-full lg:w-[500px] bg-white rounded-lg z-50">
      <div class="text-xl font-bold mb-3 flex justify-between items-center relative">
        <div>{{ modalTitle }}</div>
        <font-awesome-icon icon="fa-solid fa-xmark"
          class="absolute text-black text-xl -right-3 -top-1 hover:text-red-500 cursor-pointer"
          @click="() => hideAddModal()" />
      </div>
      <div class="mb-2">
        <div class="mb-1 font-semibold">
          Full name
        </div>
        <input type="text" id="fullname"
          class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
          placeholder="Enter fullname" :value="fullname" @input="(e) => changeFullname((e.target as any).value)" />
      </div>
      <div class="mb-2">
        <div class="mb-1 font-semibold">
          Email
        </div>
        <input type="text" id="email"
          class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
          placeholder="Enter email" :value="email" @input="(e) => changeEmail((e.target as any).value)" />
      </div>
      <div class="mb-2" v-if="modalTitle==='Add new user'">
        <div class="mb-1 font-semibold">
          Password
        </div>
        <input type="password" id="password"
          class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
          placeholder="Enter password" :value="password" @input="(e) => changePassword((e.target as any).value)" />
      </div>
      <div class="mb-2">
        <div class="mb-1 font-semibold">
          User type
        </div>
        <select name="" id="usertype"
          class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
          :value="userType" @change="(e) => changeUserType((e.target as any).value)">
          <option value="Administrator">Administrator</option>
          <option value="Idea owner">Idea owner</option>
          <option value="Investor">Investor</option>
        </select>
      </div>
      <div class="mt-5 flex justify-end items-center">
        <button class="bg-green-500 hover:bg-green-700 rounded-md px-5 py-2 text-white w-[100px]"
          @click="() => userAction(modalTitle)">
          {{modalTitle==='Add new user'?'Add':'Update'}}
        </button>
      </div>
    </div>
  </div>
  <div class="fixed h-screen w-full bg-[#00000030] z-40 flex items-center justify-center" v-if="isDeleteModal">
    <div class="fixed h-screen w-full bg-[#00000030]" @click="() => hideDeleteModal()"></div>
    <div class="mx-5 p-8 py-6 w-full lg:w-[500px] bg-white rounded-lg z-50">
      <div class="text-xl font-bold mb-3 flex justify-between items-center relative">
        <div>Delete user</div>
        <font-awesome-icon icon="fa-solid fa-xmark"
          class="absolute text-black text-xl -right-3 -top-1 hover:text-red-500 cursor-pointer"
          @click="() => hideDeleteModal()" />
      </div>
      <div class="font-medium">
        Are you going to delete this user permanantly?
      </div>
      <div class="mt-5 flex justify-end items-center">
        <button class="bg-red-500 hover:bg-red-700 rounded-md px-5 py-2 text-white w-[100px]" @click="() => deleteUser()">
          Delete
        </button>
      </div>
    </div>
  </div>
  <div class="fixed h-screen w-full bg-[#00000030] z-40 flex items-center justify-center" v-if="isResetModal">
    <div class="fixed h-screen w-full bg-[#00000030]" @click="() => hideResetModal()"></div>
    <div class="mx-5 p-8 py-6 w-full lg:w-[500px] bg-white rounded-lg z-50">
      <div class="text-xl font-bold mb-3 flex justify-between items-center relative">
        <div>Reset password</div>
        <font-awesome-icon icon="fa-solid fa-xmark"
          class="absolute text-black text-xl -right-3 -top-1 hover:text-red-500 cursor-pointer"
          @click="() => hideResetModal()" />
      </div>
      <div class="mb-2">
        <div class="mb-1 font-semibold">
          Password
        </div>
        <input type="password" id="resetpassword"
          class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
          placeholder="Enter password" :value="resetPassword" @input="(e) => changeResetPassword((e.target as any).value)" />
      </div>
      <div class="mt-5 flex justify-end items-center">
        <button class="bg-blue-500 hover:bg-blue-700 rounded-md px-5 py-2 text-white w-[100px]" @click="() => resetPasswordFunc()">
          Reset
        </button>
      </div>
    </div>
  </div>
  <div class="fixed h-screen w-full bg-[#00000030] z-40 flex items-center justify-center" v-if="isVerifyModal">
    <div class="fixed h-screen w-full bg-[#00000030]" @click="() => hideVerifyModal()"></div>
    <div class="mx-5 p-8 py-6 w-full lg:w-[500px] bg-white rounded-lg z-50">
      <div class="text-xl font-bold mb-3 flex justify-between items-center relative">
        <div>Verify account</div>
        <font-awesome-icon icon="fa-solid fa-xmark"
          class="absolute text-black text-xl -right-3 -top-1 hover:text-red-500 cursor-pointer"
          @click="() => hideVerifyModal()" />
      </div>

      <div class="mt-5 flex justify-end items-center gap-2">
        <button class="bg-red-500 hover:bg-red-700 rounded-md px-5 py-2 text-white w-[100px]" @click="() => setActive('No')">
          Deny
        </button>
        <button class="bg-green-500 hover:bg-green-700 rounded-md px-5 py-2 text-white w-[100px]" @click="() => setActive('Yes')">
          Approve
        </button>
      </div>
    </div>
  </div>
  <div class="bg-white pt-20 px-10">
    <div class="flex items-center justify-between my-2 px-5">
      <div class="text-xl font-bold">
        User management
      </div>
      <div
        class="bg-green-500 hover:bg-green-700 rounded-full flex items-center justify-center text-3xl w-[50px] h-[50px] text-white cursor-pointer shadow-lg"
        @click="() => showAddModal('add','')">
        +
      </div>
    </div>
    <div class="p-5 shadow-lg rounded-lg">
      <div class="flex items-center border-b-2 border-gray-300 font-semibold py-2">
        <div class="basis-[5%] px-1">No</div>
        <div class="basis-[15%] px-1">Name</div>
        <div class="basis-[20%] px-1">Email</div>
        <div class="basis-[10%] px-1">User type</div>
        <!-- <div class="basis-[16%] px-1">Password</div> -->
        <div class="basis-[6%] px-1">Active</div>
        <div class="basis-[18%] px-1">Last Login</div>
        <div class="basis-[26%] px-1">Action</div>
      </div>
      <div class="flex items-center py-2">
        <div class="basis-[5%]"></div>
        <div class="basis-[15%] px-1">
          <input type="text" id="fullname1"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Full name" :value="searchFullname" @input="(e)=>changeSearchFullname((e.target as any).value)" />
        </div>
        <div class="basis-[20%] px-1">
          <input type="text" id="email1"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Email" :value="searchEmail" @input="(e)=>changeSearchEmail((e.target as any).value)" />
        </div>
        <div class="basis-[10%] px-1">
          <select name="" id="usertype1"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"  :value="searchUserType" @change="(e)=>changeSearchUserType((e.target as any).value)">
            <option value="">All</option>
            <option value="Administrator">Administrator</option>
            <option value="Idea owner">Idea owner</option>
            <option value="Investor">Investor</option>
          </select>
        </div>
        <!-- <div class="basis-[16%] px-1"></div> -->
        <div class="basis-[6%] px-1">
          <select name="" id="usertype1"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2" :value="searchActive" @input="(e)=>changeSearchActive((e.target as any).value)">
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="basis-[18%] px-1">

        </div>
        <div class="basis-[10%] px-1">
          <button class="bg-blue-500 hover:bg-blue-700 rounded-md px-5 py-1 text-white w-[100px]" @click="()=>search()">
            Search
          </button>
        </div>
      </div>
      <div class="flex items-center border-b border-gray-300 py-2 cursor-pointer hover:bg-green-100"
        v-for="(user, index) in getUsers" @click="()=>selectUser(user._id)">
        <div class="basis-[5%] px-1" @click="showAddModal('edit', user._id)">{{ skipPages+index + 1 }}</div>
        <div class="basis-[15%] px-1" @click="showAddModal('edit', user._id)">{{ user.name }}</div>
        <div class="basis-[20%] px-1" @click="showAddModal('edit', user._id)">{{ user.email }}</div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', user._id)">{{ user.priority }}
        </div>
        <!-- <div class="basis-[16%] px-1 truncate" @click="showAddModal('edit')">{{ user.password }}</div> -->
        <div class="basis-[6%] px-1 flex justify-center" @click="showAddModal('edit', user._id)">
          <div class="text-xl text-green-500 font-bold" v-if="user.active==='Yes'">
            ✓
          </div>
          <div class="text-xl text-red-500 font-bold" v-if="user.active==='No'">
            X
          </div>
        </div>
        <div class="basis-[18%] px-1" @click="showAddModal('edit', user._id)">{{ user.lastLogin }}</div>
        <div class="basis-[26%] px-1 flex gap-1">
          <button class="bg-red-500 hover:bg-red-700 rounded-md px-5 py-1 text-white w-[100px]"
            @click="() => showDeleteModal(user._id)">
            Delete
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 rounded-md px-5 py-1 text-white w-[80px]"
            @click="() => showResetModal(user._id)">
            Reset
          </button>
          <button class="bg-green-500 hover:bg-green-700 rounded-md px-5 py-1 text-white w-[100px]"
            @click="() => showVerifyModal(user._id)">
            Verify
          </button>
        </div>
      </div>
      <div class="py-4 pt-10 md:flex justify-between grid grid-cols-1 gap-5 items-center">
        <div class="rounded-md h-[40px] px-2 flex justify-center items-center">
          <v-pagination
            v-model="currentPage"
            :pages="Math.ceil(getTotalCount/usersPerPage)"
            :range-size="1"
            activeColor="transparent"
            hideFirstButton
            hideLastButton
            @update:modelValue="updateHandler"
            class=""
          />
        </div>
        <div class="relative flex justify-end" ref="pageRef">
          <div class="border rounded-md drop-shadow-md px-3 h-[40px] flex justify-center items-center select-none cursor-pointer " @click="changeState(0)">
            <div>{{usersPerPage}} Rows</div>
            <div class="cursor-pointer">
              <font-awesome-icon icon="fa-solid fa-angle-down " class="ml-3" v-show="!isDetail"
                 />
              <font-awesome-icon icon="fa-solid fa-angle-up" class="ml-3" v-show="isDetail"
                 />
            </div>
          </div>
          <div class="bg-[#fefefe] absolute w-full -top-[105px] w-[120px]" v-show="isDetail">
            <div class="hover:bg-blue-100 px-3 h-[35px] border-b border-r border-l flex justify-start items-center select-none cursor-pointer" @click="changeState(5)">
              5 Rows
            </div>
            <div class="hover:bg-blue-100 px-3 h-[35px] border-b border-r border-l flex justify-start items-center select-none cursor-pointer" @click="changeState(10)">
              10 Rows
            </div>
            <div class="hover:bg-blue-100 px-3 h-[35px] border-b border-r border-l flex justify-start items-center select-none cursor-pointer" @click="changeState(20)">
              20 Rows
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.Page-active{
  color:#06BDE9 !important;
  border: none !important;
}
.Page{
  font-weight: 600;
  &:hover{
    border: none !important;
  }
}
.PaginationControl{
  margin-bottom: 4px;
}
</style>
