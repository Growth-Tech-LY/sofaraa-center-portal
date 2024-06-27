<template>
  <div
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-1/3 mx-auto py-16 px-16 rounded-lg shadow-lg"
  >
    <p>تعدل المدفوعات -</p>
    <v-form class="py-4 px-5 mt-4" v-model="form">
      <div class="mt-2">
        <v-text-field label=" اسم الطالب" variant="outlined" v-model="studentName"></v-text-field>
      </div>
      <div class="mt-2">
        <v-text-field
          label=" القيمة المدفوعة "
          variant="outlined"
          v-model="payedPrice"
          type="number"
          :rules="[rules.price, rules.PositiveNumber]"
        ></v-text-field>
      </div>
      <div class="mt-2 flex">
        <v-icon :icon="mdiCashClock" color="orange-darken-3"></v-icon>
        <p class="pr-3 font-bold">المدفوع السابق :</p>
        <p class="text-xl font-semibold text-orange-500">{{ studentDetails.payedPrice }}</p>
      </div>

      <div class="mt-4 flex">
        <v-icon :icon="mdiCash" color="red"></v-icon>
        <p class="pr-3 font-bold">القيمة المتبقية :</p>
        <p class="text-xl font-semibold text-red-500">{{ restPrice }}</p>
      </div>
      <div class="mt-12 flex justify-around w-1/2">
        <v-btn color="green" @click="PaidUpdate" :disabled="!form">تأكيد</v-btn>
        <v-btn color="red" @click="closeModel">إلغاء</v-btn>
      </div>
    </v-form>
    <v-snackbar :timeout="2000" color="success" :location="'top left'" v-model="DoneMsg">
      تمت عملية بنجاح
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { mdiCashClock, mdiCash, mdiCashPlus } from '@mdi/js'
import type { studentInfo } from '../models/courses'
import { UpdateStudentPayed } from '../CoursesService'
const payedPrice = ref<number>(0)
const couresIdEdit = ref('')
const DoneMsg = ref(false)
const form = ref(false)
const studentName = ref('')
const props = defineProps<{
  couresID: string
  studentDetails: studentInfo
}>()
const restPrice = ref<number>(props.studentDetails.restPrice)
const studentID = props.studentDetails.studentManagementId
const rules = {
  price: (n: number) => n <= props.studentDetails.restPrice || 'أكبر من قيمة المتبقية ',
  PositiveNumber: (n: number) => n > 0 || 'لايمكن وضع قيمة سالبة !!'
}
const emit = defineEmits<{
  update: []
  close: []
}>()
const updateModel = () => {
  emit('update')
}
const closeModel = () => {
  emit('close')
}

couresIdEdit.value = props.couresID
onMounted(() => {
  console.log(couresIdEdit.value)
  console.log(props.studentDetails.studentManagementId)
})
watchEffect(() => {
  studentName.value = props.studentDetails.studentName
  restPrice.value = props.studentDetails.restPrice - payedPrice.value
})

const PaidUpdate = () => {
  UpdateStudentPayed({
    updateStudentInfos: [
      {
        trainingCourseReservationsId: couresIdEdit.value,
        studentManagementId: studentID,
        restPrice: restPrice.value
      }
    ]
  })
    .then(() => {
      DoneMsg.value = true
      updateModel()
    })
    .finally(() => {})
}
</script>
