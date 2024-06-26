<template>
  <div
    v-if="editPopUp && selectedStudent"
    class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
    @click.self="toggleEditModel"
  >
    <EditStudent :couresID="TheID" :studentDetails="selectedStudent" @update="getStudents" />
  </div>

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
      <template #[`item.actions`]="{ item }">
        <v-btn
          variant="text"
          class=""
          color="yellow-darken-2"
          :prepend-icon="mdiPencil"
          size="medium"
          @click="openEditStudent(item)"
        >
          <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
        </v-btn>
      </template>
    </v-data-table-server>
  </div>
</template>
<script setup lang="ts">
import { mdiPencil } from '@mdi/js'

import { onMounted, ref, watchEffect } from 'vue'
import { getStudentsByID } from '../CoursesService'
import EditStudent from './EditStudent.vue'
import type { studentInfo } from '../models/courses'
const props = defineProps<{
  trainingCouresReservationsId: string
}>()
const editPopUp = ref(false)
const TheID = ref<string>('')
const isloading = ref(true)
const search = ref('')
const studentsInCoures = ref<studentInfo[]>()

const selectedStudent = ref<studentInfo>()

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
const toggleEditModel = () => {
  editPopUp.value = !editPopUp.value
}
onMounted(() => {
  console.log(TheID.value)
  getStudents()
})

const getStudents = async () => {
  getStudentsByID(TheID.value)
    .then((response) => {
      isloading.value = true

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

const openEditStudent = (student: studentInfo) => {
  selectedStudent.value = student
  editPopUp.value = true
}
</script>
