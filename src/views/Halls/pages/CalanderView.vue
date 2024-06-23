<template>
  <div class="calendar-container is-light-mode">
    <Qalendar :events="events" :config="config" />
  </div>
 
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { Qalendar } from 'qalendar'
import { getResHallTaple } from '../hallReserve-services'
import type { PaginationParamas } from '@/core/models/pagination-params'
import type { ReservationTable } from '../models/reserveModels'

const hallsReservation = ref<ReservationTable[]>([])

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
  locale: string,
  
}

// Events data
const events = ref<Event[]>([])

// Configuration data
const config = ref<Config>({
  week: {
    startsOn: 'saturday',
    nDays: 7,
    scrollToHour: 7,
    dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNameFormat: (dayName: string) => dayName // If the library allows formatting function
  },
  locale: 'ar-AR'
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
        start: convertDateFormat('2024/6/12 12:05'),
        end: convertDateFormat('2024/6/12 13:35')
      },
      color: getRandomColor(),
      isEditable: true,
      id: reservation.id || 'unknown-id',
      description: `CustomerName : ${reservation.customerManegentName}, CustomerPhoneNumber: ${reservation.customerManegentPhonenumber}`
    }))
  }
})

onMounted(() => {
  ongetData()
})

const getRandomColor = () => {
    const colors = ['red', 'blue', 'yellow', 'green'];
  return colors[Math.floor(Math.random() * colors.length)];

}

const convertDateFormat = (dateStr: any) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// Example usage
const originalDateStr = '2024/6/12 13:35'
const formattedDateStr = convertDateFormat(originalDateStr)
console.log(formattedDateStr) // Outputs: 2024-06-12 13:35
</script>

<style>

@import 'qalendar/dist/style.css';
.calendar-container {
  width: 100%;
  height: 800px;
  padding-block:2rem; 
}
</style>
