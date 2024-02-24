<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user.js';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import type { ISubmission } from '@/shared/interfaces'
const isSubmission = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const country = ref('')
const description = ref('')

const currentPage = ref(1)
const submissionsPerPage = ref(5)
const pageRef = ref(null)
const skipPages = ref(0)
const isDetail = ref(false)

const submission = ref({
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  description: '',
  createdAt: ''
} as ISubmission)

const {
  getSubmissions,
  getTotalCount
} = storeToRefs(useUserStore())
const {
  fetchAllSubmissions,
} = useUserStore()

onMounted(async () => {
  await fetchAllSubmissions(currentPage.value, submissionsPerPage.value, firstName.value, lastName.value, email.value, country.value, description.value)
  skipPages.value = (currentPage.value - 1) * submissionsPerPage.value
})

const changeFirstName = (value: string) => {
  firstName.value = value
}
const changeLastName = (value: string) => {
  lastName.value = value
}

const changeEmail = (value: string) => {
  email.value = value
}

const changeCountry = (value: string) => {
  country.value = value
}

const changeDescription = (value: string) => {
  description.value = value
}

const updateHandler = async (value: number) => {
  await fetchAllSubmissions(1, submissionsPerPage.value, firstName.value, lastName.value, email.value, country.value, description.value)
  currentPage.value = value
  skipPages.value = (currentPage.value - 1) * submissionsPerPage.value
}
const changeState = async (value: number) => {
  isDetail.value = !isDetail.value
  if (value !== 0) {
    submissionsPerPage.value = value
    currentPage.value = 1
    await fetchAllSubmissions(1, submissionsPerPage.value, firstName.value, lastName.value, email.value, country.value, description.value)
    skipPages.value = (currentPage.value - 1) * submissionsPerPage.value
  }
}
const search = async () => {
  await fetchAllSubmissions(1, submissionsPerPage.value, firstName.value, lastName.value, email.value, country.value, description.value)
}
const hideSubmission = () => {
  isSubmission.value = false
}
const showSubmission = (value: ISubmission) => {
  isSubmission.value = true
  submission.value = value as ISubmission
  console.log(submission)
}

</script>

<template>
  <div class="fixed h-screen w-full bg-[#00000030] z-40 flex items-center justify-center" v-if="isSubmission">
    <div class="fixed h-screen w-full bg-[#00000030]" @click="() => hideSubmission()"></div>
    <div class="mx-5 p-8 py-6 w-full lg:w-[500px] bg-white rounded-lg z-50">
      <div class="text-xl font-bold mb-3 flex justify-between items-center relative">
        <div>Submission Detail</div>
        <font-awesome-icon icon="fa-solid fa-xmark"
          class="absolute text-black text-xl -right-3 -top-1 hover:text-red-500 cursor-pointer"
          @click="() => hideSubmission()" />
      </div>
      <div class="mb-2">
        <span class="font-bold mr-1">First name:</span> {{ (submission as any).firstName }}
      </div>
      <div class="mb-2">
        <span class="font-bold mr-1">Last name:</span> {{ (submission as any).lastName }}
      </div>
      <div class="mb-2">
        <span class="font-bold mr-1">Email:</span> {{ (submission as any).email }}
      </div>
      <div class="mb-2">
        <span class="font-bold mr-1">Description:</span>
      </div>
      <div>
        {{ (submission as any).description }}
      </div>
    </div>
  </div>
  <div class="bg-white pt-20 px-10">
    <div class="flex items-center justify-between my-2 px-5">
      <div class="text-xl font-bold">
        Submission
      </div>
    </div>
    <div class="p-5 shadow-lg rounded-lg">
      <div class="flex items-center border-b-2 border-gray-300 font-semibold py-2">
        <div class="basis-[5%] px-1">No</div>
        <div class="basis-[15%] px-1">First name</div>
        <div class="basis-[15%] px-1">Last name</div>
        <div class="basis-[15%] px-1">Email</div>
        <div class="basis-[15%] px-1">Country</div>
        <div class="basis-[20%] px-1">Description</div>
        <div class="basis-[15%] px-1">Date</div>
      </div>
      <div class="flex items-center py-2">
        <div class="basis-[5%]"></div>
        <div class="basis-[15%] px-1">
          <input type="text" id="firstname"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="First name" :value="firstName" @input="(e) => changeFirstName((e.target as any).value)" />
        </div>
        <div class="basis-[15%] px-1">
          <input type="text" id="lastname"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Last name" :value="lastName" @input="(e) => changeLastName((e.target as any).value)" />
        </div>
        <div class="basis-[15%] px-1">
          <input type="text" id="email"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Email" :value="email" @input="(e) => changeEmail((e.target as any).value)" />
        </div>
        <div class="basis-[15%] px-1">
          <select name="" id="usertype1"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            :value="lastName" @change="(e) => changeFirstName((e.target as any).value)">
            <option value="">All</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
        <div class="basis-[20%] px-1">

        </div>
        <div class="basis-[10%] px-1">
          <button class="bg-blue-500 hover:bg-blue-700 rounded-md px-5 py-1 text-white w-[100px]" @click="() => search()">
            Search
          </button>
        </div>
      </div>
      <div class="flex items-center border-b border-gray-300 py-2 cursor-pointer hover:bg-green-100"
        v-for="(submission, index) in getSubmissions" @click="showSubmission(submission as ISubmission)">
        <div class="basis-[5%] px-1">{{ skipPages + index + 1 }}</div>
        <div class="basis-[15%] px-1">{{ submission.firstName }}</div>
        <div class="basis-[15%] px-1">{{ submission.lastName }}</div>
        <div class="basis-[15%] px-1">{{ submission.email }}</div>
        <div class="basis-[15%] px-1">{{ submission.country }}</div>
        <div class="basis-[20%] px-1 flex justify-start truncate">
          {{ submission.description }}
        </div>
        <div class="basis-[15%] px-1">{{ submission.createdAt }}</div>
      </div>
      <div class="py-4 pt-10 md:flex justify-between grid grid-cols-1 gap-5 items-center">
        <div class="rounded-md h-[40px] px-2 flex justify-center items-center">
          <v-pagination v-model="currentPage" :pages="Math.ceil(getTotalCount / submissionsPerPage)" :range-size="1"
            activeColor="transparent" hideFirstButton hideLastButton @update:modelValue="updateHandler" class="" />
        </div>
        <div class="relative flex justify-end" ref="pageRef">
          <div
            class="border rounded-md drop-shadow-md px-3 h-[40px] flex justify-center items-center select-none cursor-pointer "
            @click="changeState(0)">
            <div>{{ submissionsPerPage }} Rows</div>
            <div class="cursor-pointer">
              <font-awesome-icon icon="fa-solid fa-angle-down " class="ml-3" v-show="!isDetail" />
              <font-awesome-icon icon="fa-solid fa-angle-up" class="ml-3" v-show="isDetail" />
            </div>
          </div>
          <div class="bg-[#fefefe] absolute w-full -top-[105px] w-[120px]" v-show="isDetail">
            <div
              class="hover:bg-blue-100 px-3 h-[35px] border-b border-r border-l flex justify-start items-center select-none cursor-pointer"
              @click="changeState(5)">
              5 Rows
            </div>
            <div
              class="hover:bg-blue-100 px-3 h-[35px] border-b border-r border-l flex justify-start items-center select-none cursor-pointer"
              @click="changeState(10)">
              10 Rows
            </div>
            <div
              class="hover:bg-blue-100 px-3 h-[35px] border-b border-r border-l flex justify-start items-center select-none cursor-pointer"
              @click="changeState(20)">
              20 Rows
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.Page-active {
  color: #06BDE9 !important;
  border: none !important;
}

.Page {
  font-weight: 600;

  &:hover {
    border: none !important;
  }
}

.PaginationControl {
  margin-bottom: 4px;
}
</style>
