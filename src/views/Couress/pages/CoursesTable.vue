<template>
  <div class="pt-6">
    <div class="flex w-5/6 mx-auto">
      <v-btn
        class="mt-4 text-white"
        color="green-accent-4"
        rounded="lg"
        :prepend-icon="mdiPlus"
        @click="toggelPopUp"
        >اضافة باقة</v-btn
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
      <!-- The Edit start  -->
      <div
        v-if="editPopUp"
        @click.self="toggelPopUp2"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <CoursesEditForm />
      </div>
      <!-- The Edit End  -->

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
              <v-btn
                class="mt-4 text-white"
                color="red-darken-2"
                rounded="lg"
                @click="deleteCourseConfirm()"
                >نعم</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </div>
      </div>
      <!-- The Delete End -->
    </div>
    <v-data-table-server
      v-model:items-per-page="paginations.page"
      :headers="headers"
      :items="desserts"
      :items-length="paginations.size"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
    >
      <!-- The  Actions  in the table  Start -->

      <template #[`item.actions`]="{ item }">
        <div>
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

    <!--               The Coureses Add Form   Start       -->
    <div
      v-show="formPopUP"
      @click.self="toggelPopUp"
      class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
    >
      <CoursesForm
        @close="toggelPopUp"
        @refresh="
          onOptionsChange({
            page: paginations.page,
            itemsPerPage: paginations.size
          })
        "
      />
    </div>
    <!--               The Coureses Add Form   End !!        -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CoursesForm from './CoursesAddForm.vue'
import type { Coures } from '../models/courses'
import { mdiPlus, mdiPencil, mdiDelete } from '@mdi/js'
import type { PaginationParamas } from '@/models/Pagination'
import CoursesEditForm from './CoursesEditForm.vue'
import { title } from 'process'

const search = ref('')
const loading = ref(false)
const courses = ref<Coures[]>([])
const formPopUP = ref(false)
const editPopUp = ref(false)
const confirmDelete = ref(false)
const courseIdDelete = ref<string>('')
const paginations = ref({
  page: 1,
  size: 10,
  Name: ''
})
const headers: any = [
  { title: 'id', align: 'start', key: 'id' },
  { title: 'اسم الدروة', align: 'start', sortable: false, key: 'name' },
  { title: 'السعر', key: 'carbs', align: 'center' },
  { title: 'تاريخ البدء', key: 'calories', align: 'center' },
  { title: 'تاريخ الانتهاء', key: 'fat', align: 'center' },
  { title: 'من الساعة', key: 'protein', align: 'center' },
  { title: 'الى الساعة', key: 'iron', align: 'center' },
  { title: 'الأجرائات', key: 'actions', align: 'start' }
]
const onOptionsChange = ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
  paginations.value = {
    page: page,
    size: itemsPerPage,
    Name: search.value
  }
  // getPackage(paginations.value)
}
const desserts = [
  {
    id: '1',
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    iron: '1'
  },
  {
    id: '2',
    name: 'Jelly bean',
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
    iron: '0'
  },
  {
    id: '3',
    name: 'KitKat',
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
    iron: '6'
  },
  {
    id: '4',
    name: 'Eclair',
    calories: 262,
    fat: 16,
    carbs: 23,
    protein: 6,
    iron: '7'
  }
]

const openEdit = () => {
  toggelPopUp2()
}

const toggelPopUp = () => {
  formPopUP.value = !formPopUP.value
}
const toggelPopUp2 = () => {
  editPopUp.value = !editPopUp.value
}

const openDeleteModal = (item: Coures) => {
  console.log(item.id)

  courseIdDelete.value = item.id
  confirmDelete.value = true
}
// const getCourse = async (paginations: PaginationParamas) => {
//   loading.value = true
//   getCourses(paginations)
//     .then((response) => {
//       console.log(response.total)

//       totalCourses.value = response.total
//       courses.value = response.data
//       errorCheck.value = false
//     })
//     .catch(() => {
//       courses.value = []
//       errorCheck.value = true
//     })
//     .finally(() => {
//       isLoading.value = false
//     })
// }
</script>
