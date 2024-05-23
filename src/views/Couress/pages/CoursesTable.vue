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
    </v-data-table-server>

    <!--               The Coureses Add Form   Start !!        -->
    <div
      v-show="formPopUP"
      @click.self="toggelPopUp(formPopUP)"
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
import CoursesForm from './CoursesForm.vue'
import type { Coures } from '../models/courses'
import { mdiPlus } from '@mdi/js'

const search = ref('')
const loading = ref(false)
const courses = ref<Coures[]>([])
const formPopUP = ref(false)

const paginations = ref({
  page: 1,
  size: 10,
  Name: ''
})
const headers: any = [
  { title: 'اسم الدروة', align: 'start', sortable: false, key: 'name' },
  { title: 'السعر', key: 'carbs', align: 'center' },
  { title: 'تاريخ البدء', key: 'calories', align: 'center' },
  { title: 'تاريخ الانتهاء', key: 'fat', align: 'center' },
  { title: 'من الساعة', key: 'protein', align: 'center' },
  { title: 'الى الساعة', key: 'iron', align: 'center' }
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
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    iron: '1'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
    iron: '0'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
    iron: '6'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16,
    carbs: 23,
    protein: 6,
    iron: '7'
  }
]

const toggelPopUp = () => {
  formPopUP.value = !formPopUP.value
}
</script>
