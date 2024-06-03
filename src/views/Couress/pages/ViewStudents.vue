<template>
  <div
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-4/5 mx-auto py-16 px-16 rounded-lg shadow-lg max-h-[75%] overflow-y-scroll"
  >
    <p>جدول الطلبة</p>
    <v-data-table-server
      :headers="headers"
      :loading="isloading"
      :search="search"
      :items="studentsInCoures"
      v-model:items-per-page="paginations.size"
      :items-length="paginations.size"
    >
      <template #[`item.actions`]>
        <v-btn
          variant="text"
          class=""
          color="yellow-darken-2"
          :prepend-icon="mdiPencil"
          size="medium"
          @click="editPopUp = true"
        >
          <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
        </v-btn>
      </template>
    </v-data-table-server>
    <div
      v-if="editPopUp"
      class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      @click.self="editPopUp = false"
    >
      <EditStudent :couresID="TheID" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { mdiPencil } from '@mdi/js'
import type { Student } from '@/core/models/Mainmodels'
import { onMounted, ref, watchEffect } from 'vue'
import { getCoursesById } from '../CoursesService'
import EditStudent from './EditStudent.vue'
import type { postStudents, studentInfo } from '../models/courses'
const props = defineProps<{
  trainingCouresReservationsId: string
}>()
const editPopUp = ref(false)
const TheID = ref<string>('')
const isloading = ref(true)
const search = ref('')
const studentsInCoures = ref<studentInfo[]>()

const paginations = ref({
  page: 1,
  size: 10,
  Name: ''
})

const headers: any = [
  { title: 'اسم الطالب', key: 'studentName', align: 'start', sortable: false },

  { title: 'المدفوع ', key: 'payedPrice', align: 'center' },
  { title: ' المتبقي', key: 'restPrice', align: 'center' },
  { title: 'الأجرائات', key: 'actions' }
]

TheID.value = props.trainingCouresReservationsId

onMounted(() => {
  console.log(TheID.value)
  getStudents()
})

const getStudents = async () => {
  getCoursesById(TheID.value)
    .then((response) => {
      isloading.value = true
      console.log(response.data)
      studentsInCoures.value = response.data.studentInfo

      return response.data
    })
    .finally(() => {
      isloading.value = false
    })
}
watchEffect(() => {
  console.log(studentsInCoures.value)
})

// const students =ref<Student[]>()
const students = [
  {
    name: 'محمد',
    couresPrice: 500,
    payedprice: 300,
    restPrice: 200
  },
  {
    name: 'جلال',
    couresPrice: 500,
    payedprice: 300,
    restPrice: 200
  },
  {
    name: 'عبد السلام',
    couresPrice: 500,
    payedprice: 300,
    restPrice: 200
  },
  {
    name: ' الزقروبة',
    couresPrice: 500,
    payedprice: 1000000,
    restPrice: 0
  },
  {
    name: 'محسن',
    couresPrice: 500,
    payedprice: 300,
    restPrice: 200
  },
  {
    name: 'خالد',
    couresPrice: 500,
    payedprice: 300,
    restPrice: 200
  }
]
</script>
