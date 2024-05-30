<template>
  <div
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-4/5 mx-auto py-16 px-16 rounded-lg shadow-lg"
  >
    <p>اسناد طلبة الى الدورة</p>
    <div
      class="grid grid-cols-4 gap-2 p-4 mt-4"
      v-for="(item, index) in AllStudent"
      :key="item.studentManagementId"
    >
      <v-autocomplete
        class="col-span-2"
        chips
        variant="outlined"
        label="الطالب "
        :items="students"
        item-title="name"
        v-model="item.studentManagementId"
      ></v-autocomplete>
      <v-text-field
        variant="outlined"
        label="المدفوع"
        prefix="د.ل"
        v-model="item.payedPrice"
      ></v-text-field>
      <div>
        <v-btn :icon="mdiPlus" color="green" class="ml-2"></v-btn>
        <v-btn :icon="mdiDeleteOutline" color="red" class=""></v-btn>
      </div>
    </div>
    <v-btn color="green" class="ml-2" @click="submitStudents">اضافة</v-btn>
    <v-btn color="red">الغاء</v-btn>
  </div>
  <v-snackbar v-model="showMessage" :timeout="2000" color="success" :location="'top left'">
    تم التعديل بنجاح
  </v-snackbar>
</template>
<script setup lang="ts">
import { getStudent } from '@/core/services/mainServices'
import type { postStudents, student } from '../models/courses'
import { onMounted, reactive, ref } from 'vue'
import { mdiPlus, mdiDeleteOutline } from '@mdi/js'
import type { Student } from '@/core/models/Mainmodels'
import { postStudent } from '../CoursesService'

const AllStudent = ref<student[]>([{ studentManagementId: '', payedPrice: 0 }])
const students = ref<Student[]>()
const showMessage = ref(false)
const props = defineProps<{
  trainingCouresReservationsId: string
}>()

const onGetstudents = () => {
  getStudent().then((response) => {
    students.value = response
  })
}
const submitStudents = () => {
  const body: postStudents = {
    trainingCouresReservationsId: props.trainingCouresReservationsId,
    student: AllStudent.value
  }
  postStudent(body)
    .then(() => {
      showMessage.value = true
      console.log(body)
    })
    .catch((error: any) => {
      console.log(error)
    })
}

onMounted(async () => {
  onGetstudents()
  console.log(props.trainingCouresReservationsId)
})
</script>
