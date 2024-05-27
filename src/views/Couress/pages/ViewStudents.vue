<template>
  <div
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-4/5 mx-auto py-16 px-16 rounded-lg shadow-lg"
  >
    <p>جدول الطلبة</p>
    <v-data-table-server
      :headers="headers"
      :loading="isloading"
      :search="search"
      :items="students"
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
        >
          <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
        </v-btn>
      </template>
    </v-data-table-server>
  </div>
</template>
<script setup lang="ts">
import { mdiPencil } from '@mdi/js'
import type { Student } from '@/core/models/Mainmodels'
import { ref } from 'vue'
const isloading = ref(false)
const search = ref('')
const paginations = ref({
  page: 1,
  size: 10,
  Name: ''
})

const headers: any = [
  { title: 'اسم الطالب', key: 'name', align: 'start', sortable: false },
  { title: 'السعر', key: 'couresPrice', align: 'center' },
  { title: 'المدفوع ', key: 'payedprice', align: 'center' },
  { title: ' المتبقي', key: 'restPrice', align: 'center' },
  { title: 'الأجرائات', key: 'actions' }
]

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
