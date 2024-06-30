<template>
  <v-form
    v-model="form"
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-3/5 mx-auto py-16 px-16 rounded-lg shadow-lg overflow-y-scroll max-h-[75vh]"
  >
    <p class="text-xl">- إسناد طلبة الى الدورة</p>
    <div class="grid grid-cols-4 gap-2 p-4 mt-4" v-for="(item, index) in AllStudent" :key="index">
      <v-autocomplete
        class="col-span-2"
        chips
        variant="outlined"
        label="الطالب "
        :items="students"
        item-title="name"
        item-value="id"
        v-model="item.studentManagementId"
        :rules="[rules.required]"
      ></v-autocomplete>
      <v-text-field
        variant="outlined"
        label="المدفوع"
        prefix="د.ل"
        v-model="item.payedPrice"
        :rules="[rules.required, rules.notZero, rules.price]"
      ></v-text-field>
      <div class="flex items-center pb-4">
        <v-btn
          @click="addRow"
          v-show="index === AllStudent.length - 1"
          color="green"
          variant="text"
        >
          <v-icon :icon="mdiAccountPlus" color="green"> </v-icon
        ></v-btn>
        <v-btn class="" @click="deleteRow(index)" color="red" variant="text"
          ><v-icon :icon="mdiDeleteOutline" color="red"> </v-icon
        ></v-btn>
      </div>
    </div>
    <v-btn color="green" class="ml-2" @click="submitStudents" :disabled="!form">اضافة</v-btn>
    <v-btn color="red" @click="closeModel">الغاء</v-btn>
  </v-form>
  <v-snackbar v-model="showMessage" :timeout="2000" color="success" :location="'top left'">
    تم الأضافة الطلبة بنجاح
  </v-snackbar>
</template>
<script setup lang="ts">
import { getStudent } from '@/core/services/mainServices'
import type { postStudents, student } from '../models/courses'
import { onMounted, ref } from 'vue'
import { mdiAccountPlus, mdiDeleteOutline } from '@mdi/js'
import type { Student } from '@/core/models/Mainmodels'
import { postStudent } from '../CoursesService'

const form = ref(false)
const AllStudent = ref<student[]>([{ studentManagementId: null, payedPrice: 0 }])
const students = ref<Student[]>()
const showMessage = ref(false)

const props = defineProps<{
  trainingCouresReservationsId: string
  price: number
}>()

const emit = defineEmits<{
  close: []
  refresh: []
}>()
const closeModel = () => {
  emit('close')
}
const updateTable = () => {
  emit('refresh')
}
const rules = {
  required: (v: string) => !!v || 'الحقل اجباري',
  notZero: (v: number) => v != 0 || 'يجب ادخال قيمة',
  price: (n: number) => n <= props.price || 'أكبر من قيمة الدورة '
}

const onGetstudents = () => {
  getStudent().then((response) => {
    students.value = response
  })
}
const submitStudents = () => {
  console.log(AllStudent.value)

  const body: postStudents = {
    trainingCouresReservationsId: props.trainingCouresReservationsId,
    studentInfoManagement: AllStudent.value
  }
  postStudent(body)
    .then(() => {
      showMessage.value = true
      closeModel()
      updateTable()
    })
    .catch((error: any) => {
      console.log(error)
    })
    .finally(() => {
      AllStudent.value = [{ studentManagementId: null, payedPrice: 0 }]
    })
}

const addRow = () => {
  AllStudent.value.push({ studentManagementId: null, payedPrice: 0 })
}
const deleteRow = (index: number) => {
  if (AllStudent.value.length > 1) {
    AllStudent.value.splice(index, 1)
  }
}

onMounted(async () => {
  onGetstudents()
  console.log(props.trainingCouresReservationsId)
  console.log(props.price)
})
</script>
<style></style>
