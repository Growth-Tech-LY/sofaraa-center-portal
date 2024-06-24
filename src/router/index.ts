import CoursesTable from '@/views/Couress/pages/CoursesTable.vue'
import ReserveHall from '@/views/Halls/pages/ReserveHall.vue'
import ReservedHallTable from '@/views/Halls/pages/ReservedHallTable.vue'
// import LandingPage from '@/views/LandingPage.vue'
import MainLayout from '@/views/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import EditResrvedHall from '@/views/Halls/pages/EditResrvedHall.vue'
import CalanderView from '@/views/Halls/pages/CalanderView.vue'
import CoursesEditForm from '@/views/Couress/pages/CoursesEditForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage
    },
    // {
    //   path: '/',
    //   name: 'landingPage',
    //   component: LandingPage
    // },
    {
      path: '/dashboard',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: '/reservations',
          children: [
            {
              path: '',
              name: 'reservations-list',
              component: ReservedHallTable
            },
            {
              path: 'add',
              name: 'hall-reserve',
              component: ReserveHall
            },
            {
              path: ':id/edit',
              name: 'edit-reserved',
              component: EditResrvedHall
            },
            
            {
              path: 'calander',
              name: 'calander',
              component: CalanderView
            }
          ]
        },

        {
          path: '/Courses',
          children: [
            {
              path: '',
              name: 'coureses-list',
              component: CoursesTable
            },
            {
              path: 'edit/:id',
              name: 'edit-courese',
              component: CoursesEditForm
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const isAuthenticated: boolean = !!localStorage.getItem('token')
  console.log(isAuthenticated)

  // if (!isAuthenticated && to.name !== 'Login' && to.name !== 'landingPage') {
  //   return { name: 'landingPage' }
  // }
  if (!isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' }
  }

  // if (isAuthenticated && (to.name == 'Login' || to.name == 'landingPage')) {
  //   return { name: 'MainLayout' }
  // }

  if (isAuthenticated && to.name == 'Login') {
    return { name: 'MainLayout' }
  }
})

export default router
