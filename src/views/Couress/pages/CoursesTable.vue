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

      <!--    ||  The Coureses Add Form   End !   ||                   -->

      <!-- [    <<    The Coureses Add Form   Start   >>      ]  -->

      <div
        v-if="studentPopUp"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
        @click="studentPopUp = false"
      >
        <AddStudent />
      </div>

      <!--[    <<    The Coureses Add Form   END !!   >>      ] -->

      <!--      <<  [    The Edit start       ] >>                        -->
      <div
        v-if="editPopUp"
        @click.self="toggelEdit"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <CoursesEditForm />
      </div>
      <!-- <<[   The Edit End     ]>> -->

      <!-- The Delete Start -->
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
      <!-- The Delete End -->
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
        <div>
          <v-btn
            class="ml-3"
            color="blue-darken-2"
            variant="text"
            size="medium"
            :prepend-icon="mdiAccountMultiplePlus"
            @click="studentPopUp = true"
          >
            <v-tooltip activator="parent" location="bottom">اسناد طالب لدورة</v-tooltip>
          </v-btn>
          <v-btn
            variant="text"
            class="ml-3"
            color="yellow-darken-2"
            :prepend-icon="mdiPencil"
            size="medium"
            @click="openEdit"
          >
            <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
          </v-btn>

          <v-btn
            color="deep-orange-darken-1"
            variant="text"
            size="medium"
            :prepend-icon="mdiDelete"
            @click="openDeleteModal(item)"
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
import type { Coures } from '../models/courses'
import { mdiPlus, mdiPencil, mdiDelete, mdiAccountMultiplePlus } from '@mdi/js'
import { getCourses } from '../CoursesService'
import CoursesEditForm from './CoursesEditForm.vue'
import type { PaginationParamas } from '@/core/models/pagination-params'
import AddStudent from './AddStudent.vue'

const search = ref('')
const loading = ref(false)
const courses = ref<Coures[]>([])
const studentPopUp = ref(false)
const formPopUP = ref(false)
const editPopUp = ref(false)
const confirmDelete = ref(false)
const courseIdDelete = ref<string>('')
const totalCustomers = ref(0)
const paginations = ref({
  page: 1,
  size: 10,
  Name: ''
})
const headers: any = [
  { title: 'id', align: 'start', key: 'id' },
  { title: 'اسم الدروة', key: 'couresManagementId', align: 'start', sortable: false },
  { title: 'عدد الأفراد ', key: 'couresManagementId', align: 'start' },
  { title: 'السعر', key: 'couresManagementId', align: 'center' },
  { title: 'تاريخ البدء', key: 'dateStart', align: 'center' },
  { title: 'تاريخ الانتهاء', key: 'endDate', align: 'center' },
  { title: 'من الساعة', key: 'fromTime', align: 'center' },
  { title: 'الى الساعة', key: 'toTime', align: 'center' },
  { title: 'الأجرائات', key: 'actions', align: 'center' }
]

const test = [
  {
    id: '300',
    name: 'English for Libya',
    STcount: '50',
    price: '600',
    dateStart: '14/5/2023',
    endDate: '14/6/2023',
    fromTime: '8:00',
    toTime: '12:30'
  },
  {
    id: '300',
    name: 'English for Libya',
    STcount: '50',
    price: '600',
    dateStart: '14/5/2023',
    endDate: '14/6/2023',
    fromTime: '8:00',
    toTime: '12:30'
  },
  {
    id: '300',
    name: 'English for Libya',
    STcount: '50',
    price: '600',
    dateStart: '14/5/2023',
    endDate: '14/6/2023',
    fromTime: '8:00',
    toTime: '12:30'
  },
  {
    id: '300',
    name: 'English for Libya',
    STcount: '50',
    price: '600',
    dateStart: '14/5/2023',
    endDate: '14/6/2023',
    fromTime: '8:00',
    toTime: '12:30'
  }
]

const openEdit = () => {
  toggelEdit()
}
// const openAddStudent=(){

// }
// const toggelStudent = () => {
//   formPopUP.value = !formPopUP.value
// }
const toggelForm = () => {
  formPopUP.value = !formPopUP.value
}
const toggelEdit = () => {
  editPopUp.value = !editPopUp.value
}
const toggelStudent = () => {
  studentPopUp.value = !studentPopUp.value
}
const openDeleteModal = (item: Coures) => {
  console.log(item.id)

  courseIdDelete.value = item.id
  confirmDelete.value = true
}

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
