import CoursesTable from '@/views/Couress/pages/CoursesTable.vue'
import ReserveHall from '@/views/Halls/pages/ReserveHall.vue' 
import ReservedHallTable from '@/views/Halls/pages/ReservedHallTable.vue'
import testTem from '@/views/Halls/pages/testTem.vue'
import MainLayout from '@/views/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
        } ,
        {
          path: '/test',
          name: 'test',
          component: testTem
        }
      ]
    }
  ]
})

export default router
