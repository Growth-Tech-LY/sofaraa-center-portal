<template>
  <div class="pt-6">
    <div class="flex w-5/6 mx-auto">
      <v-btn
        class="mt-4 text-white"
        color="green-accent-4"
        rounded="lg"
        :prepend-icon="mdiPlus"
        @click="toggelForm"
        >اضافة حجز</v-btn
      >
      <div class="flex flex-col w-1/2">
        <p class="w-3/4 text-gray-700 mx-auto pr-3">البحث</p>
        <v-text-field
          v-model="search"
          class="w-3/4 mx-auto"
          density="compact"
          placeholder="بحث اسم الباقة ..... "
          hide-details
        ></v-text-field>
      </div>
      <!--               The Coureses Add Form   Start       -->

      <div
        v-show="formPopUP"
        @click.self="toggelForm"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <CoursesForm
          @close="toggelForm"
          @refresh="
            onOptionsChange({
              page: paginations.page,
              itemsPerPage: paginations.size
            })
          "
        />
      </div>

      <!-- The viewStudents start -->
      <div
        v-if="viewStudents"
        @click.self="viewStudents = false"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <ViewStudents :trainingCouresReservationsId="courseId" @close="viewStudents = false" />
      </div>

      <!-- [     The Coureses Add Form Start           >>      ]  -->

      <div
        v-if="studentPopUp"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
        @click.self="studentPopUp = false"
      >
        <AddStudent :trainingCouresReservationsId="courseId" />
      </div>

      <!--  <<  [        The Edit start          ] >>       -->
      <div
        v-if="editPopUp"
        @click.self="toggelEdit"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <CoursesEditForm />
      </div>

      <!--              The Delete Start           -->
      <div
        @click.self="confirmDelete = false"
        v-show="confirmDelete"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005] flex justify-center items-center"
      >
        <div>
          <v-card>
            <v-card-title class="text-h5">هل أنت متأكد من حذف الدورة؟ </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mt-4 text-white"
                color="green-accent-4"
                rounded="lg"
                @click="confirmDelete = false"
                >إلغاء</v-btn
              >
              <v-btn class="mt-4 text-white" color="red-darken-2" rounded="lg">نعم</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
    <v-data-table-server
      v-model:items-per-page="paginations.size"
      :headers="headers"
      :items="courses"
      :items-length="paginations.size"
      :loading="loading"
      :search="search"
      item-value="name"
    >
      <!-- The  Actions  in the table  Start -->

      <template #[`item.actions`]="{ item }">
        <div class="grid grid-cols-2 gap-y-2">
          <v-btn
            class=""
            color="blue-darken-2"
            variant="text"
            size="medium"
            :prepend-icon="mdiAccountEye"
            @click="OpenViewstudent(item)"
            :trainingCouresReservationsId="courseId"
          >
            <v-tooltip activator="parent" location="bottom">عرض الطالبة </v-tooltip>
          </v-btn>
          <v-btn
            class=""
            color="green"
            variant="text"
            size="medium"
            :prepend-icon="mdiAccountMultiplePlus"
            @click="OpenAddstudent(item)"
            :trainingCouresReservationsId="courseId"
          >
            <v-tooltip activator="parent" location="bottom">اسناد طالب لدورة</v-tooltip>
          </v-btn>
          <v-btn
            variant="text"
            class=""
            color="yellow-darken-2"
            :prepend-icon="mdiPencil"
            size="medium"
          >
            <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
          </v-btn>

          <v-btn
            color="deep-orange-darken-1"
            variant="text"
            size="medium"
            :prepend-icon="mdiDelete"
          >
            <v-tooltip activator="parent" location="bottom">حذف</v-tooltip>
          </v-btn>
        </div>
      </template>

      <!-- The  Actions  in the table  End !! -->
    </v-data-table-server>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue'
import CoursesForm from './CoursesAddForm.vue'
import type { Coures, postStudents } from '../models/courses'
import { mdiPlus, mdiPencil, mdiDelete, mdiAccountMultiplePlus, mdiAccountEye } from '@mdi/js'
import { getCourses } from '../CoursesService'
import CoursesEditForm from './CoursesEditForm.vue'
import type { PaginationParamas } from '@/core/models/pagination-params'
import AddStudent from './AddStudent.vue'
import ViewStudents from './ViewStudents.vue'
const search = ref('')
const loading = ref(false)
const courses = ref<Coures[]>([])
const studentPopUp = ref(false)
const formPopUP = ref(false)
const editPopUp = ref(false)
const confirmDelete = ref(false)
const viewStudents = ref(false)
const courseId = ref<string>('')
const totalCustomers = ref(0)

const paginations = ref({
  page: 1,
  size: 10,
  Name: ''
})
const headers: any = [
  { title: 'اسم الدورة', key: 'couresManagementName', align: 'start', sortable: false },
  { title: ' الأستاذ ', key: 'teacherManagementName', align: 'start' },
  { title: ' سعر  ', key: 'price', align: 'start' },
  { title: ' القاعة', key: 'hall_managementName', align: 'center' },
  { title: ' الخدمة', key: 'serviceManagementName', align: 'center' },
  { title: 'تاريخ البدء', key: 'startDate', align: 'center' },
  { title: 'تاريخ الانتهاء', key: 'endDate', align: 'center' },
  { title: ' الساعات ', key: 'numberOfRquiredHours', align: 'center' },
  { title: ' الطلبة ', key: 'numberOfIndividuals', align: 'center' },
  { title: 'الأجرائات', key: 'actions', align: 'center' }
]

// const test = [
//   {
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },

//   {
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },

//   {
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },

//   {
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },

//   {
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },

//   {
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },

//   {
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   }
// ]

const openEdit = () => {
  toggelEdit()
}

// const toggelStudent = () => {
//   formPopUP.value = !formPopUP.value
// }
const toggelForm = () => {
  formPopUP.value = !formPopUP.value
}
const toggelEdit = () => {
  editPopUp.value = !editPopUp.value
}
const OpenAddstudent = (item: Coures) => {
  studentPopUp.value = true
  courseId.value = item.id
}
const OpenViewstudent = (item: Coures) => {
  viewStudents.value = true
  courseId.value = item.id
}
// const openDeleteModal = (item: Coures) => {
//   console.log(item.id)

//   courseIdDelete.value = item.id
//   confirmDelete.value = true
// }

onMounted(async () => {
  onGetCourse(paginations.value)
})
const onGetCourse = (paginations: PaginationParamas) => {
  loading.value = true
  getCourses(paginations)
    .then((response) => {
      totalCustomers.value = response.total
      courses.value = response.data
      console.log(response)
    })
    .finally(() => {
      loading.value = false
    })
}

const onOptionsChange = ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
  paginations.value = {
    page: page,
    size: itemsPerPage,
    Name: search.value
  }
  // onGetCourse(paginations)
}
</script>
