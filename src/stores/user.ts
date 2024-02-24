import { defineStore } from "pinia"
import axios from "axios"
import config from "@/shared/config"
import type {
  IUser,
  IProject,
  ISubmission
} from "@/shared/interfaces"

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    isLoading: false,
    users: [] as Array<IUser>,
    projects: [] as Array<IProject>,
    submissions: [] as Array<ISubmission>,
    access_token: "" as string,
    totalCount: 0 as number,
    admin: null
  }),
  getters: {
    getUsers: (state) => state.users,
    getAdmin: (state) => state.admin,
    getProjects: (state) => state.projects,
    getSubmissions: (state) => state.submissions,
    getAccessToken: (state) => state.access_token,
    getIsLoading: (state) => state.isLoading,
    getTotalCount: (state) => state.totalCount
  },
  actions: {
    async adminLogin(email: string, password: string) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.post(config.api.AUTH_LOGIN, {
          email: email,
          password: password
        })
        if(response.data.success){
          this.admin = response.data.admin
          this.access_token = response.data.accessToken
        }
        else alert(response.data.message)
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    adminLogOut() {
      this.admin = null
      this.access_token = ''
    },
    async fetchAllUsers(
      currentPage: number,
      usersPerPage: number,
      name: string,
      email: string,
      userType: string,
      active: string
    ) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.get(config.api.CRUD_USER + '?current=' + currentPage + '&pages=' + usersPerPage + '&name=' + name + '&email=' + email + '&priority=' + userType + '&active=' + active)
        if (response.data.success) {
          this.users = response.data.users
          this.totalCount = response.data.totalCount
        } else {
          alert(response.data.message)
        }
        this.isLoading = false;
        console.log(this.isLoading)
        return;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async fetchAllProjects(
      currentPage: number,
      projectsPerPage: number,
      mainType: string,
      subType: string,
      customType: string,
      title: string,
      location: string,
      active: string
    ) {
      try {
        this.isLoading = true
        console.log(this.isLoading)
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.get(config.api.CRUD_PROJECT + '?current=' + currentPage + '&pages=' + projectsPerPage + '&mainType=' + mainType + '&subType=' + subType + '&customType=' + customType + '&title=' + title + '&location=' + location + '&active=' + active)
        console.log(response.data)
        if (response.data.success) {
          this.projects = response.data.projects
          this.totalCount = response.data.totalCount
        } else {
          alert(response.data.message)
        }
        this.isLoading = false;
        console.log(this.isLoading)
        return;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async fetchAllSubmissions(
      currentPage: number,
      submissionsPerPage: number,
      firstName: string,
      lastName: string,
      email: string,
      country: string,
      description: string
    ) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.get(config.api.CRUD_SUBMISSION + '?current=' + currentPage + '&pages=' + submissionsPerPage + '&firstName=' + firstName + '&lastName=' + lastName + '&email=' + email + '&country=' + country + '&description=' + description)
        if (response.data.success) {
          this.submissions = response.data.submissions
          this.totalCount = response.data.totalCount
        } else {
          // alert(response.data.message)
        }
        this.isLoading = false;
        console.log(this.isLoading)
        return;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async registerUser(
      name: string,
      email: string,
      password: string,
      priority: string,
      current: number,
      usersPerPage: number
    ) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.post(config.api.CRUD_USER, {
          name: name,
          email: email,
          password: password,
          priority: priority,
          current: current,
          pages: usersPerPage
        })
        if (response.data.success) {
          this.users = response.data.users
        }
        this.isLoading = false;
        return response;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async registerProject(
      mainType: string,
      subType: string,
      customType: string,
      title: string,
      description: string,
      funding: number,
      startDate: string,
      endDate: string,
      reward: string,
      location: string,
      image: Array<any>,
      video: string,
      collaborators: string,
      story: string,
      minimumValue: number
    ) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.post(config.api.CRUD_PROJECT, {
          mainType: mainType,
          subType: subType,
          customType: customType,
          title: title,
          description: description,
          funding: funding,
          startDate: startDate,
          endDate: endDate,
          reward: reward,
          location: location,
          images: image,
          videos: video,
          collaborators: collaborators,
          story: story,
          minimumValue: minimumValue
        })
        if (response.data.success) {
          this.projects = response.data.projects
        }
        this.isLoading = false;
        return response;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async resetUserPasword(
      id: string,
      password: string,
      current: number,
      usersPerPage: number
    ) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.put(config.api.CRUD_USER + 'reset/' + id, {
          password: password,
          current: current,
          pages: usersPerPage
        })
        if (response.data.success) {
          this.users = response.data.users
        }
        this.isLoading = false;
        return response;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async verifyUserAccount(
      id: string,
      active: string,
      current: number,
      usersPerPage: number
    ) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.put(config.api.CRUD_USER + 'verify/' + id, {
          active: active,
          current: current,
          pages: usersPerPage
        })
        if (response.data.success) {
          this.users = response.data.users
        }
        this.isLoading = false;
        return response;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async verifyProject(
      id: string,
      active: string,
      current: number,
      projectsPerPage: number
    ) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.put(config.api.CRUD_PROJECT + 'verify/' + id, {
          active: active,
          current: current,
          pages: projectsPerPage
        })
        if (response.data.success) {
          this.projects = response.data.projects
        }
        this.isLoading = false;
        return response;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async updateUser(
      id: string,
      name: string,
      email: string,
      password: string,
      priority: string,
      current: number,
      usersPerPage: number
    ) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        console.log(id)
        const response = await axios.put(config.api.CRUD_USER + id, {
          name: name,
          email: email,
          password: password,
          priority: priority,
          current: current,
          pages: usersPerPage
        })
        if (response.data.success) {
          this.users = response.data.users
        }
        this.isLoading = false;
        return response;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async removeUser(id: string, currentPage: number, usersPerPage: number) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.delete(config.api.CRUD_USER + id + '/?current=' + currentPage + '&pages=' + usersPerPage)
        if (response.data.success) {
          this.users = response.data.users
          this.totalCount = this.totalCount - 1
        } else {
          alert(response.data.message)
        }
        this.isLoading = false;
        return response;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
    async removeProject(id: string, currentPage: number, projectsPerPage: number) {
      try {
        this.isLoading = true
        axios.defaults.headers.common["Authorization"] =
          "terragrav-" + this.access_token;
        const response = await axios.delete(config.api.CRUD_PROJECT + id + '/?current=' + currentPage + '&pages=' + projectsPerPage)
        if (response.data.success) {
          this.projects = response.data.projects
          this.totalCount = this.totalCount - 1
        } else {
          alert(response.data.message)
        }
        this.isLoading = false;
        return response;
      } catch (e) {
        this.isLoading = false;
        if (
          (e as any).response.data.message &&
          (e as any).response.data.message === "Unauthenticated."
        ) {
          alert("Invalid request")
        }
      }
    },
  },
  persist: {
    enabled: true,
  },
});