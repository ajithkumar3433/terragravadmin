<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user.js';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import type { IUser, IProject } from '@/shared/interfaces'

const mainType = ref([
  {
    title: 'Art',
    subs: [
      'Theatre',
      'Dance',
      'Photography',
      'Sculpting'
    ]
  },
  {
    title: 'Illustration',
    subs: [
      'Comics',
      'Cartoon',
      'Fashion',
      'Concept art',
      'Wood art'
    ]
  },
  {
    title: 'Tech Design',
    subs: []
  },
  {
    title: 'Film',
    subs: [
      'Video',
      'Short films',
      'Animated films',
    ]
  },
  {
    title: 'Food',
    subs: []
  },
  {
    title: 'Games',
    subs: []
  },
  {
    title: 'Music',
    subs: []
  },
  {
    title: 'Publishing',
    subs: [
      'Journalism',
      'Book Publishing'
    ]
  },
])
const isDeleteModal = ref(false)
const isAddModal = ref(false)
const title = ref('')
const description = ref('')
const selectedProject = ref('')
const selectedMainType = ref(mainType.value[0].title)
const selectedSubType = ref(mainType.value.filter((type: any) => type.title === selectedMainType.value)[0]?.subs[0] ? mainType.value.filter((type: any) => type.title === selectedMainType.value)[0]?.subs[0] : '')
const customType = ref('')
const funding = ref(0)
const currentPage = ref(1)
const projectsPerPage = ref(5)
const isDetail = ref(false)
const pageRef = ref(null)
const skipPages = ref(0)
const searchMainType = ref('')
const searchSubType = ref('')
const searchCustomType = ref('')
const searchLocation = ref('')
const searchTitle = ref('')
const searchActive = ref('')
const modalTitle = ref('')
const isVerifyModal = ref(false)
const startDate = ref('')
const endDate = ref('')
const reward = ref('')
const location = ref('')
const collaborators = ref('')
const story = ref('')
const minimumValue = ref(0)
const videoURL =  ref('')
const errorMessage = ref('');

const imageRef = ref()
const videoRef = ref()
const imageFiles = ref([] as Array<any>)
const videoFiles = ref([] as Array<any>)
const {
  getProjects,
  getTotalCount
} = storeToRefs(useUserStore())
const {
  fetchAllProjects,
  registerProject,
  removeProject,
  // updateProject,
  verifyProject
} = useUserStore()

onMounted(async () => {
  await fetchAllProjects(currentPage.value, projectsPerPage.value, searchMainType.value, searchSubType.value, searchCustomType.value, searchTitle.value, searchLocation.value, searchActive.value)
  skipPages.value = (currentPage.value - 1) * projectsPerPage.value
  document.addEventListener('click', hideMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', hideMenu)
})

const changeMainType = (value: string) => {
  selectedMainType.value = value
  selectedSubType.value = mainType.value.filter((type: any) => type.title === selectedMainType.value)[0]?.subs[0]
}
const changeSubType = (value: string) => {
  selectedSubType.value = value
}
const changeCustomType = (value: string) => {
  customType.value = value
}
const changeTitle = (value: string) => {
  title.value = value
}
const changeDescription = (value: string) => {
  description.value = value
}
const changeFunding = (value: number) => {
  funding.value = value
}
const changeStartDate = (value: any) => {
  startDate.value = value
}
const changeEndDate = (value: any) => {
  endDate.value = value
}
const changeReward = (value: string) => {
  reward.value = value
}
const changeLocation = (value: string) => {
  location.value = value
}
const changeCollaborators = (value: string) => {
  collaborators.value = value
}
const changeStory = (value: string) => {
  story.value = value
}
const changeMinimumValue = (value: number) => {
  minimumValue.value = value
}
const changeVideoURL = (value:string)=>{
  videoURL.value = value
}
const hideMenu = (e: any) => {
  if (!(pageRef.value as any).contains(e.target)) {
    isDetail.value = false;
  }
}

const showAddModal = (type: string, id: string) => {
  if (type === 'add') {
    modalTitle.value = 'Add new project'
  } else {
    modalTitle.value = 'Edit project'
  }
  isAddModal.value = true
}
const hideAddModal = () => {
  isAddModal.value = false
}
const showDeleteModal = (value: string) => {
  isDeleteModal.value = true
  selectedProject.value = value
}
const hideDeleteModal = () => {
}

const deleteProject = async () => {
  const response = await removeProject(selectedProject.value, currentPage.value, projectsPerPage.value)
  currentPage.value=1
  skipPages.value = (currentPage.value-1)*projectsPerPage.value
  alert((response as any).data.message)
  if ((response as any).data.success) isDeleteModal.value = false
}
const updateHandler = async (value: number) => {
  await fetchAllProjects(value, projectsPerPage.value, searchMainType.value, searchSubType.value, searchCustomType.value, searchTitle.value, searchLocation.value, searchActive.value)
  currentPage.value = value
  skipPages.value = (currentPage.value - 1) * projectsPerPage.value
}
const changeState = async (value: number) => {
  isDetail.value = !isDetail.value
  if (value !== 0) {
    projectsPerPage.value = value
    currentPage.value = 1
    await fetchAllProjects(currentPage.value, projectsPerPage.value, searchMainType.value, searchSubType.value, searchCustomType.value, searchTitle.value, searchLocation.value, searchActive.value)
    skipPages.value = (currentPage.value - 1) * projectsPerPage.value
  }
}
const changeSearchMainType = (value: string) => {
  searchMainType.value = value
}
const changeSearchSubType = (value: string) => {
  searchSubType.value = value
}
const changeSearchCustomType = (value: string) => {
  searchCustomType.value = value
}
const changeSearchActive = (value: string) => {
  searchActive.value = value
}
const changeSearchLocation = (value: string) => {
  searchLocation.value = value
}
const changeSearchTitle = (value: string) => {
  searchTitle.value = value
}
const search = async () => {
  await fetchAllProjects(1, projectsPerPage.value, searchMainType.value, searchSubType.value, searchCustomType.value, searchTitle.value, searchLocation.value, searchActive.value)
}
const selectUser = (value: string) => {
}
const hideVerifyModal = () => {
  isVerifyModal.value = false
}
const showVerifyModal = (value: string) => {
  isVerifyModal.value = true
  selectedProject.value = value
}
const setActive = async (value: string) => {
  const response = await verifyProject(selectedProject.value, value, currentPage.value, projectsPerPage.value)
  alert((response as any).data.message)
  if ((response as any).data.success) isVerifyModal.value = false
}
const selectImage = () => {
  imageRef.value.click()
}
// const onImageFileChange = (e: any) => {
//   imageFiles.value = Array.from(e.target.files)
// }
const onImageFileChange = async (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  const files = Array.from(inputElement.files || []);
  const compressedBlobs = [];

  for (const file of files) {
    try {
      if (!file) {
        return; // No file selected, do nothing
      }

      if (file.size > 2 * 1024 * 1024) {
        // Display an error message to the user
        errorMessage.value =
          "The file exceeds the maximum file size of 2MB. Please choose a smaller file.";
        return;
      }
      errorMessage.value = "";

      const compressedBlob = await compressImage(file);
      console.log(compressedBlob)
      compressedBlobs.push(compressedBlob);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  }
  imageFiles.value = compressedBlobs;
};


const compressImage = (file: File) => {
  return new Promise(async (resolve, reject) => {
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 800;
        const maxHeight = 600;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            file.type,
            0.4 // Adjust the compression quality here (0.7 for 70% quality)
          );
        } else {
          // Handle the case where ctx is null, if needed
          reject(new Error("Canvas context is null."));
        }
      };

      img.onerror = (error) => {
        reject(error);
      };
    } catch (error) {
      reject(error);
    }
  });
};


const selectVideo = () => {
  videoRef.value.click()
}
const onVideoFileChange = (e: any) => {
  videoFiles.value = Array.from(e.target.files)
}
const projectAction = async (value: string) => {
  if (customType.value === "" || title.value === "" || description.value === "" || funding.value === 0 || reward.value === "" || location.value === "" || collaborators.value === "" || story.value === "") {
    alert("Please fill out all fields")
    return
  }
  let response
  if (value === 'Add new project') {
    response = await registerProject(selectedMainType.value, selectedSubType.value, customType.value, title.value, description.value, funding.value, startDate.value, endDate.value, reward.value, location.value, imageFiles.value, videoURL.value, collaborators.value, story.value,minimumValue.value)
    currentPage.value = 1
    skipPages.value = (currentPage.value - 1) * projectsPerPage.value
  } else {

  }
  alert((response as any).data.message)
  if ((response as any).data.success) isAddModal.value = false
}
const getImageURL = (image: any) => {
  return URL.createObjectURL(image)
}

</script>

<template>
  <div class="fixed h-screen w-full bg-[#00000030] z-40 flex items-center justify-center" v-if="isAddModal">
    <div class="fixed h-screen w-full bg-[#00000030]" @click="() => hideAddModal()"></div>
    <div class="mx-5 p-8 py-6 w-full lg:w-[800px] bg-white rounded-lg z-50">
      <div class="text-xl font-bold mb-3 flex justify-between items-center relative px-2">
        <div>{{ modalTitle }}</div>
        <font-awesome-icon icon="fa-solid fa-xmark"
          class="absolute text-black text-xl -right-3 -top-1 hover:text-red-500 cursor-pointer"
          @click="() => hideAddModal()" />
      </div>
      <div class="overflow-auto scrollbar px-2 h-[calc(100vh-200px)]">
        <div class="mb-2 mt-4">
          <div class="grid grid-cols-2 gap-2">
            <div class="col-span-2 sm:col-span-1">
              <div class="mb-1 font-semibold">
                Main category
              </div>
              <select name="" id="maincate"
                class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
                :value="selectedMainType" @change="(e) => changeMainType((e.target as any).value)">
                <option v-for="(type, index) in mainType" :key="'mainType_' + index" :value="type.title">{{ type.title }}
                </option>
              </select>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <div class="mb-1 font-semibold">
                Sub category
              </div>
              <select name="" id="subcate"
                class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
                :value="selectedSubType" @change="(e) => changeSubType((e.target as any).value)">
                <option v-for="(subType, index) in mainType.filter((type: any) => type.title === selectedMainType)[0].subs"
                  :key="'mainType_' + index" :value="subType">{{ subType }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Custom category
          </div>
          <input type="text" id="customcate"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter custom category" :value="customType"
            @input="(e) => changeCustomType((e.target as any).value)" />
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Title
          </div>
          <input type="text" id="projecttitle"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter project title" :value="title" @input="(e) => changeTitle((e.target as any).value)" />
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Description
          </div>
          <textarea id="description"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2 h-[100px]"
            placeholder="Enter project description" :value="description"
            @input="(e) => changeDescription((e.target as any).value)" />
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Total funding
          </div>
          <div class="relative">
            <input type="number" id="totalfunding"
              class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2 pl-7"
              placeholder="Enter total funding amount" :value="funding"
              @input="(e) => changeFunding((e.target as any).value)" />
            <div class="absolute top-2 left-3">$</div>
          </div>
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Campaign period
          </div>
          <div class="flex gap-1 items-center">
            <input type="date" id="projecttitle"
              class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
              placeholder="Enter project title" :value="startDate"
              @input="(e) => changeStartDate((e.target as any).value)" />
            <div>~</div>
            <input type="date" id="projecttitle"
              class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
              placeholder="Enter project title" :value="endDate" @input="(e) => changeEndDate((e.target as any).value)" />
          </div>
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Rewards
          </div>
          <textarea id="reward"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2 h-[100px]"
            placeholder="Enter project rewards" :value="reward" @input="(e) => changeReward((e.target as any).value)" />
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Location
          </div>
          <input type="text" id="projecttitle"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter location" :value="location" @input="(e) => changeLocation((e.target as any).value)" />
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Images
          </div>
          <div class="grid grid-cols-4 gap-2 mb-2">
            <div class="col-span-4 sm:col-span-2 md:col-span-1" v-for="(image, index) in imageFiles">
              <img :src="getImageURL(image)" :alt="'image_' + index">
            </div>
          </div>
          <input type="file" multiple hidden ref="imageRef" @change="onImageFileChange" />
          <button class="bg-sky-500 hover:bg-sky-700 rounded-md px-2 py-2 text-white w-[150px]"
            @click="() => selectImage()">
            Select images
          </button>
          <div v-if="errorMessage" class="text-red-500 mt-2">
            {{ errorMessage }}
          </div>
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Video
          </div>
          <input type="text" id="projecttitle"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter video url" :value="videoURL" @input="(e) => changeVideoURL((e.target as any).value)" />
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Collaborators
          </div>
          <input type="text" id="projecttitle"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter collaborators" :value="collaborators"
            @input="(e) => changeCollaborators((e.target as any).value)" />
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Story
          </div>
          <textarea id="reward"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2 h-[100px]"
            placeholder="Enter your story" :value="story" @input="(e) => changeStory((e.target as any).value)" />
        </div>
        <div class="mb-2 mt-4">
          <div class="mb-1 font-semibold">
            Minimum deposit value
          </div>
          <div class="relative">
            <input type="number" id="totalfunding"
              class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2 pl-7"
              placeholder="Enter value" :value="minimumValue"
              @input="(e) => changeMinimumValue((e.target as any).value)" />
            <div class="absolute top-2 left-3">$</div>
          </div>
        </div>
      </div>
      <div class="mt-5 flex justify-end items-center">
        <button class="bg-green-500 hover:bg-green-700 rounded-md px-5 py-2 text-white w-[100px]"
          @click="() => projectAction('Add new project')">
          {{ modalTitle === 'Add new project' ? 'Add' : 'Update' }}
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
        <button class="bg-red-500 hover:bg-red-700 rounded-md px-5 py-2 text-white w-[100px]" @click="() => deleteProject()">
          Delete
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
        <button class="bg-red-500 hover:bg-red-700 rounded-md px-5 py-2 text-white w-[100px]"
          @click="() => setActive('No')">
          Deny
        </button>
        <button class="bg-green-500 hover:bg-green-700 rounded-md px-5 py-2 text-white w-[100px]"
          @click="() => setActive('Yes')">
          Approve
        </button>
      </div>
    </div>
  </div>
  <div class="bg-white pt-20 px-10">
    <div class="flex items-center justify-between my-2 px-5">
      <div class="text-xl font-bold">
        Project management
      </div>
      <div
        class="bg-green-500 hover:bg-green-700 rounded-full flex items-center justify-center text-3xl w-[50px] h-[50px] text-white cursor-pointer shadow-lg"
        @click="() => showAddModal('add', '')">
        +
      </div>
    </div>
    <div class="p-5 shadow-lg rounded-lg overflow-auto schrollbar w-full">
      <div class="flex items-center border-b-2 border-gray-300 font-semibold py-2">
        <div class="basis-[3%] px-1">No</div>
        <div class="basis-[8%] px-1">MainType</div>
        <div class="basis-[8%] px-1">SubType</div>
        <div class="basis-[8%] px-1">CustomType</div>
        <div class="basis-[12%] px-1">Title</div>
        <div class="basis-[10%] px-1">Funding</div>
        <div class="basis-[10%] px-1">StartDate</div>
        <div class="basis-[10%] px-1">EndDate</div>
        <div class="basis-[10%] px-1">Location</div>
        <div class="basis-[7.5%] px-1">MinimumValue</div>
        <div class="basis-[6%] px-1">Active</div>
        <div class="basis-[7.5%] px-1">Action</div>
      </div>
      <div class="flex items-center py-2 w-full">
        <div class="basis-[3%]"></div>
        <div class="basis-[8%] px-1">
          <input type="text" id="mainType"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter main type" :value="searchMainType"
            @input="(e) => changeSearchMainType((e.target as any).value)" />
        </div>
        <div class="basis-[8%] px-1">
          <input type="text" id="subType"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter sub type" :value="searchSubType"
            @input="(e) => changeSearchSubType((e.target as any).value)" />
        </div>
        <div class="basis-[8%] px-1">
          <input type="text" id="customType"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter custom type" :value="searchCustomType"
            @input="(e) => changeSearchCustomType((e.target as any).value)" />
        </div>
        <div class="basis-[12%] px-1">
          <input type="text" id="searchTitle"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter title" :value="searchTitle"
            @input="(e) => changeSearchTitle((e.target as any).value)" />
        </div>
        <div class="basis-[10%] px-1">

        </div>
        <div class="basis-[10%] px-1">

        </div>
        <div class="basis-[10%] px-1">

        </div>
        <div class="basis-[10%] px-1">
          <input type="text" id="location"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2"
            placeholder="Enter location" :value="searchLocation"
            @input="(e) => changeSearchLocation((e.target as any).value)" />
        </div>
        <div class="basis-[7.5%] px-1">

        </div>
        <div class="basis-[6%] px-1">
          <select name="" id="usertype1"
            class="bg-white dark:bg-[#252527] dark:border-gray-800 dark:text-[#DDDDDD] focus-visible:outline-1 focus-visible:outline-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2" :value="searchActive" @input="(e)=>changeSearchActive((e.target as any).value)">
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="basis-[7.5%] px-1">
          <button class="bg-blue-500 hover:bg-blue-700 rounded-md px-5 py-1 text-white w-[100px]" @click="() => search()">
            Search
          </button>
        </div>
      </div>
      <div class="flex items-center border-b border-gray-300 py-2 cursor-pointer hover:bg-green-100 w-full"
        v-for="(project, index) in getProjects" @click="() => selectUser(project._id)">
        <div class="basis-[3%] px-1" @click="showAddModal('edit', project._id)">{{ skipPages + index + 1 }}</div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', project._id)">{{ project.mainType }}</div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', project._id)">{{ project.subType }}</div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', project._id)">{{ project.customType }}
        </div>
        <div class="basis-[12%] px-1" @click="showAddModal('edit', project._id)">{{ project.title }}
        </div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', project._id)">{{ project.funding }}
        </div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', project._id)">{{ project.startDate }}
        </div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', project._id)">{{ project.endDate }}
        </div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', project._id)">{{ project.location }}
        </div>
        <div class="basis-[10%] px-1" @click="showAddModal('edit', project._id)">{{ project.minimumValue }}
        </div>
        <div class="basis-[6%] px-1 flex justify-center" @click="showAddModal('edit', project._id)">
          <div class="text-xl text-green-500 font-bold" v-if="project.active === 'Yes'">
            ✓
          </div>
          <div class="text-xl text-red-500 font-bold" v-if="project.active === 'No'">
            X
          </div>
        </div>
        <div class="basis-[7.5%] px-1 flex gap-1">
          <button class="bg-red-500 hover:bg-red-700 rounded-md px-2 py-1 text-white w-[50px]"
            @click="() => showDeleteModal(project._id)">
            Del
          </button>
          <button class="bg-green-500 hover:bg-green-700 rounded-md px-3 py-1 text-white w-[80px]"
            @click="() => showVerifyModal(project._id)">
            Verify
          </button>
        </div>
      </div>
      <div class="py-4 pt-10 md:flex justify-between grid grid-cols-1 gap-5 items-center w-full">
        <div class="rounded-md h-[40px] px-2 flex justify-center items-center">
          <v-pagination v-model="currentPage" :pages="Math.ceil(getTotalCount / projectsPerPage)" :range-size="1"
            activeColor="transparent" hideFirstButton hideLastButton @update:modelValue="updateHandler" class="" />
        </div>
        <div class="relative flex justify-end" ref="pageRef">
          <div
            class="border rounded-md drop-shadow-md px-3 h-[40px] flex justify-center items-center select-none cursor-pointer "
            @click="changeState(0)">
            <div>{{ projectsPerPage }} Rows</div>
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

.scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: white;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.8);
  border-radius: 100vh;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 1);
}</style>