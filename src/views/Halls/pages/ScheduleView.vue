<template>
  <!-- component -->
  <div class="bg-white md:py-8 px-4 lg:max-w-7xl lg:mx-auto lg:px-8 flex gap-8">
    <p class="text-2xl font-bold text-gray-800 mb-8">قاعة : {{ 'Test' }}</p>
    <div class="w-1/2 flex gap-8 justify-center items-center">
        <v-autocomplete
          transition="slide-y-transition"
          v-model="month"
          :items="monthCalander"
          label="أختيار الشهر"
          item-title="name"
          item-value="value"
          placeholder="أختيار الشهر"
          variant="outlined"
          :return-object="true"
        ></v-autocomplete>
        <v-text-field
        class="mb-6"
         v-model="year"
          variant="outlined"
          label="أدخل السنة "
          hide-details
          type="number"
        ></v-text-field>
      </div>
  </div>
  <div class="bg-white md:py-8 px-4 lg:max-w-7xl lg:mx-auto lg:px-8">
    <p class="text-4xl font-bold text-gray-800 mb-8">March 2024</p>
    <div class="inline-flex flex-col space-y-1 items-start justify-start h-full w-full">
      <!-- <div class="inline-flex space-x-28 items-start justify-start pr-24 h-full w-full">
        <p class="w-12 h-full text-sm font-medium text-gray-800 ml-12 uppercase">السبت</p>
        <p class="w-12 h-full text-sm font-medium text-gray-800 uppercase">الأحد</p>
        <p class="w-12 h-full text-sm font-medium text-gray-800 uppercase">الإثنين</p>
        <p class="w-12 h-full text-sm font-medium text-gray-800 uppercase">الثلاثاء</p>
        <p class="w-12 h-full text-sm font-medium text-gray-800 uppercase">الإربعاء</p>
        <p class="w-12 h-full text-sm font-medium text-gray-800 uppercase">الخميس</p>
        <p class="w-12 h-full text-sm font-medium text-gray-800 uppercase">الجمعة</p>
      </div> -->

      <div class="flex flex-col items-start justify-start">
        <div class="inline-flex items-center justify-start h-full w-full">
          <div
            :class="bgColor"
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">01</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">02</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">03</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">04</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">05</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">06</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">07</p>
          </div>
        </div>
        <div class="inline-flex items-center justify-start w-full h-full">
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">08</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">09</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">10</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">11</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">12</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">13</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">14</p>
          </div>
        </div>
        <div class="inline-flex items-center justify-start w-full h-full">
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">15</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">16</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">17</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">18</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">19</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">20</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">21</p>
          </div>
        </div>
        <div class="inline-flex items-center justify-start h-full w-full">
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">22</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">23</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">24</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">25</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">26</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">27</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">28</p>
          </div>
        </div>
        <div class="inline-flex items-center justify-start w-full h-full">
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">29</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">30</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="text-sm font-medium text-gray-800">31</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="opacity-50 text-sm font-medium text-gray-800">01</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="opacity-50 text-sm font-medium text-gray-800">02</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="opacity-50 text-sm font-medium text-gray-800">03</p>
          </div>
          <div
            class="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200"
          >
            <p class="opacity-50 text-sm font-medium text-gray-800">04</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DatePaginationParamas } from '@/core/models/pagination-params'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { HallScheduleByMonth } from '../hallReserve-services'
import {monthCalander} from '../models/MonthCalander'

const route = useRoute()
const receivedHallID = String(route.params.id)

const year = ref<number>()
const month = ref<number>()


const bgColor = ref('')

const ReservationsChalander = [
  {
    title: 'Reservated',
    value: 'bg-red-300'
  },
  {
    title: 'notReservated',
    value: 'bg-green-300'
  }
]

// const monthCalander = [
//   {
//     name: 'شهر 1',
//     value: 1
//   },
//   {
//     name: 'شهر 2',
//     value: 2
//   },
//   {
//     name: 'شهر 3',
//     value: 3
//   },
//   {
//     name: 'شهر 4',
//     value: 4
//   },
//   {
//     name: 'شهر 5',
//     value: 5
//   },
//   {
//     name: 'شهر 6',
//     value: 6
//   },
//   {
//     name: 'شهر 7',
//     value:7
//   },
//   {
//     name: 'شهر 8',
//     value: 8
//   },
//   {
//     name: 'شهر 9',
//     value: 9
//   },
//   {
//     name: 'شهر 10',
//     value: 10
//   },
//   {
//     name: 'شهر 11',
//     value: 11
//   },
//   {
//     name: 'شهر 12',
//     value: 12
//   },
// ]

// const  onGetSehedule = (paginations : DatePaginationParamas) => {
//   HallScheduleByMonth(paginations)
// }

// onMounted(()=> {
//   onGetSehedule(paginations.value)

//     if (ReservationsChalander[0].title == 'Reservated') {
//         bgColor.value= ReservationsChalander[0].value
//     }

// })
</script>
