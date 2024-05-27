import CoursesTable from '@/views/Couress/pages/CoursesTable.vue'
import ReserveHall from '@/views/Halls/pages/ReserveHall.vue'
import ReservedHallTable from '@/views/Halls/pages/ReservedHallTable.vue'
import testTem from '@/views/Halls/pages/testTem.vue'
import MainLayout from '@/views/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: '/hall-list',
          name: 'hall-list',
          component: ReservedHallTable
        },
        {
          path: '/hall-reserve',
          name: 'hall-reserve',
          component: ReserveHall
        },
        {
          path: '/Courses',
          name: 'Courses',
          component: CoursesTable
        },
        {
          path: '/test',
          name: 'test',
          component: testTem
        }
      ]
    }
  ]
})
router.beforeEach(async (to) => {
  const isAuthenticated: boolean = !!localStorage.getItem('token')
  console.log(isAuthenticated)

  if (!isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' }
  } else if (isAuthenticated && to.name == 'Login') {
    return { name: 'MainLayout' }
  }
})

export default router
