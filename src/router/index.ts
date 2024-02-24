import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import UserPage from '@/views/UserPage.vue'
import ProjectPage from '@/views/ProjectPage.vue'
import PledgePage from '@/views/PledgePage.vue'
import SubmissionPage from '@/views/SubmissionPage.vue'
import MoneyRaisedPage from '@/views/MoneyRaisedPage.vue'
import Login from '@/views/LoginPage.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta:{
        layout:'DefaultLayout'
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Login,
    },
    {
      path: '/user',
      name: 'user',
      component: UserPage,
      meta:{
        layout:'DefaultLayout'
      }
    },
    {
      path: '/project',
      name: 'project',
      component: ProjectPage,
      meta:{
        layout:'DefaultLayout'
      }
    },
    {
      path: '/submission',
      name: 'submission',
      component: SubmissionPage,
      meta:{
        layout:'DefaultLayout'
      }
    },
    {
      path: '/pledge',
      name: 'pledge',
      component: PledgePage,
      meta:{
        layout:'DefaultLayout'
      }
    },
    {
      path: '/money',
      name: 'money',
      component: MoneyRaisedPage,
      meta:{
        layout:'DefaultLayout'
      }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // This ensures that if hash is provided to router.push it works as expected.
      //  & since we have used "behavior: 'smooth'" the browser will slowly come to this hash position.
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { 
      top: 0,
      behavior: 'smooth',
     }
  }
})

router.beforeEach((to, from, next)=>{
  const { getAdmin } = storeToRefs(useUserStore())
  if(to.name !=='auth'){
    if(getAdmin.value){
      next()
    }else{
      next('/auth')
    }
  }else{
    next()
  }
  
})

export default router
