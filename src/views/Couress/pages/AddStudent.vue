<template>
  <div
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-2/5 mx-auto py-16 px-16 rounded-lg shadow-lg"
  >
    <p>اسناد طلبة الى الدورة</p>
    <div class="grid grid-cols-1 p-4 mt-4">
      <v-autocomplete
        chips
        variant="outlined"
        label="الطالب "
        :items="AllStudent"
        item-title="name"
      ></v-autocomplete>
      <v-text-field variant="outlined" label="المدفوع" prefix="د.ل"></v-text-field>
      <v-text-field variant="outlined" label="الباقي" disabled prefix="د.ل"></v-text-field>
    </div>
    <v-btn color="green" class="ml-2">اضافة</v-btn>
    <v-btn color="red">الغاء</v-btn>
  </div>
</template>
<script setup lang="ts">
import { getStudent } from '@/core/services/mainServices'
import type { Student } from '@/core/models/Mainmodels'
import { onMounted, ref } from 'vue'
const AllStudent = ref<Student[]>()

getStudent().then((response) => {
  AllStudent.value = response
})

onMounted(async () => {
  getStudent()
})
</script>
