<template>
  <div class="calendar-container is-light-mode relative">
    <Qalendar :events="events" :config="config" />
  </div>
  <!-- <div class="flex justify-between py-4 z-[999] bg-white border border-blue-400">
    <p class="bg-white border-2 border-red-200 absolute top-20 right-28 min-w-32">الأحد</p>
    <p class="bg-white border-2 border-red-200 absolute top-20 right-72 min-w-32">الأثنين</p>
    <p class="bg-white border-2 border-red-200 absolute top-20 right-[28rem] min-w-32">الثلاثاء</p>
    <p class="bg-white border-2 border-red-200 absolute top-20 right-[38rem] min-w-32">الإربعاء</p>
    <p class="bg-white border-2 border-red-200 absolute top-20 left-[28rem] min-w-32">الخميس</p>
    <p class="bg-white border-2 border-red-200 absolute top-20 left-72 min-w-32">الجمعة</p>
    <p class="bg-white border-2 border-red-200 absolute top-20 left-[%3] min-w-32">السبت</p>
  </div> -->
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { Qalendar } from 'qalendar'
import { getResHallTaple } from '../hallReserve-services'
import type { PaginationParamas } from '@/core/models/pagination-params'
import type { ReservationTable } from '../models/reserveModels'
import { watch } from 'vue'

const hallsReservation = ref<ReservationTable[]>([])
// const currentMode = ref('week')

// Define types for events and config
interface Event {
  title: string
  with: string
  time: {
    start: string
    end: string
  }
  color: string
  isEditable: boolean
  id: string
  description?: string
}

interface Config {
  week: {
    startsOn: string
    nDays: number
    scrollToHour: number
    dayNames: string[]
    dayNameFormat?: (dayName: string) => string
  }
  locale: string
  // showCurrentTime: Boolean
}

// Events data
const events = ref<Event[]>([])

// Configuration data
const config = ref<Config>({
  week: {
    startsOn: 'sunday',
    nDays: 7,
    scrollToHour: 5 | 7,
    dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNameFormat: (dayNames: string) => dayNames // If the library allows formatting function
  },
  locale: 'ar-AR'
  // showCurrentTime: true
})

const paginations = ref<PaginationParamas>({
  page: 1,
  size: 10,
  customerName: '',
  Hallname: '',
  startDate: '',
  endDate: '',
  phoneNumber: ''
})

const ongetData = () => {
  getResHallTaple(paginations.value).then((response) => {
    hallsReservation.value = response.data
  })
}

watchEffect(() => {
  if (hallsReservation.value.length > 0) {
    events.value = hallsReservation.value.map((reservation) => ({
      title: reservation.hall_ManagementName,
      with: reservation.customerManegentName || 'N/A',
      time: {
        start: convertDateFormat(`${reservation.startDate} ${reservation.fromTime}:00`),
        end: convertDateFormat(`${reservation.endDate} ${reservation.toTime}:00`)
      },
      color: getRandomColor(),
      isEditable: true,
      id: reservation.id || 'unknown-id',
      description: ` رقم الزبون :${reservation.customerManegentPhonenumber}
     <p>  سعر الإجمالي : ${reservation.totalPrice}</p>
     <p>   المتبقي: ${reservation.restPrice}</p>
      `
    }))
  }
})

onMounted(() => {
  ongetData()
})

const getRandomColor = () => {
  const colors = ['red', 'blue', 'yellow', 'green']
  return colors[Math.floor(Math.random() * colors.length)]
}

const convertDateFormat = (dateStr: string) => {
  // Split the date and time parts
  const dateParts = dateStr.split(' ')
  if (dateParts.length !== 2) {
    console.error('Invalid date format:', dateStr)
    return '0000-00-00 00:00'
  }

  const [datePart, timePart] = dateParts
  const [day, month, year] = datePart.split('/').map((part) => part.padStart(2, '0'))

  const date = new Date(`${year}-${month}-${day} ${timePart}`)

  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateStr)
    return '0000-00-00 00:00'
  }

  const formattedYear = date.getFullYear()
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0')
  const formattedDay = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${formattedYear}-${formattedMonth}-${formattedDay} ${hours}:${minutes}`
}

// Example usage
const originalDateStr = '27/06/2024 11:00'
const formattedDateStr = convertDateFormat(originalDateStr)
console.log(formattedDateStr) // Outputs: 2024-06-27 11:00

// watch(
//   () => currentMode.value,
//   (newMode, oldMode) => {
//     console.log('Calendar mode changed from', oldMode, 'to', newMode)
//     // Add any additional logic you want to execute when the mode changes
//   }
// )
</script>

<style>
@import 'qalendar/dist/style.css';
.calendar-container {
  width: 100%;
  height: 800px;
  padding-block: 2rem;
}
</style>
