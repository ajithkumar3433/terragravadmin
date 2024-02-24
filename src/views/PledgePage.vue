<script setup lang="ts">

</script>

<template>
  <div class="bg-white pt-20 px-10">
    <div class="flex items-center justify-between my-2 px-5">
      <div class="text-xl font-bold">
        Pledge management
      </div>
      <div class="bg-green-500 hover:bg-green-700 rounded-full flex items-center justify-center text-3xl w-[50px] h-[50px] text-white cursor-pointer shadow-lg">
        +
      </div>
    </div>
    <div class="p-5 shadow-lg rounded-lg">
      <div class="flex items-center border-b-2 border-gray-300 font-semibold py-2">
        <div class="basis-[5%] px-1">No</div>
        <div class="basis-[15%] px-1">Name</div>
        <div class="basis-[26%] px-1">Email</div>
        <div class="basis-[16%] px-1">Password</div>
        <div class="basis-[6%] px-1">Active</div>
        <div class="basis-[16%] px-1">Last Login</div>
        <div class="basis-[16%] px-1">Action</div>
      </div>
      <div class="flex items-center py-2">
        <div class="basis-[5%]"></div>
        <div class="basis-[15%] px-1">
          <input type="text" id="fullname"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Full name" />
        </div>
        <div class="basis-[26%] px-1">
          <input type="text" id="email"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Email" />
        </div>
        <div class="basis-[16%] px-1"></div>
        <div class="basis-[6%] px-1">
          <input type="checkbox" class="w-[20px] h-[20px] rounded border border-gray-100 bg-gray-300" />
        </div>
        <div class="basis-[16%] px-1">
          <input type="datetime" id="email"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Date" />
        </div>
        <div class="basis-[16%] px-1">
          <button class="bg-blue-500 hover:bg-blue-700 rounded-md px-5 py-1 text-white w-[100px]">
            Search
          </button>
        </div>
      </div>
      <div class="flex items-center border-b border-gray-300 py-2 cursor-pointer hover:bg-green-100">
        <div class="basis-[5%] px-1">1</div>
        <div class="basis-[15%] px-1">James Yamamoto</div>
        <div class="basis-[26%] px-1">mrtnsort@gmail.com</div>
        <div class="basis-[16%] px-1">aa234as!@#$adfa</div>
        <div class="basis-[6%] px-1">Yes</div>
        <div class="basis-[16%] px-1">2023-04-17 06:58</div>
        <div class="basis-[16%] px-1">
          <button class="bg-red-500 hover:bg-red-700 rounded-md px-5 py-1 text-white w-[100px]">
            Delete
          </button>
        </div>
      </div>
      <div class="flex items-center border-b border-gray-300 py-2 cursor-pointer hover:bg-green-100">
        <div class="basis-[5%] px-1">2</div>
        <div class="basis-[15%] px-1">David Zeeman</div>
        <div class="basis-[26%] px-1">david27017@gmail.com</div>
        <div class="basis-[16%] px-1">24arq$adfa</div>
        <div class="basis-[6%] px-1">No</div>
        <div class="basis-[16%] px-1">2023-04-17 06:58</div>
        <div class="basis-[16%] px-1">
          <button class="bg-red-500 hover:bg-red-700 rounded-md px-5 py-1 text-white w-[100px]">
            Delete
          </button>
        </div>
      </div>
      <div class="flex items-center border-b border-gray-300 py-2 cursor-pointer hover:bg-green-100">
        <div class="basis-[5%] px-1">3</div>
        <div class="basis-[15%] px-1">Steven Parise</div>
        <div class="basis-[26%] px-1">steven548@gmail.com</div>
        <div class="basis-[16%] px-1">a@#$5fw5234</div>
        <div class="basis-[6%] px-1">Yes</div>
        <div class="basis-[16%] px-1">2023-04-14 11:26</div>
        <div class="basis-[16%] px-1">
          <button class="bg-red-500 hover:bg-red-700 rounded-md px-5 py-1 text-white w-[100px]">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
