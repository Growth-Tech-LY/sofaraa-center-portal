<template>
  <div
    class="mt-20 bg-white border-t-8 border-[#BF3B74] mx-auto p-7 rounded-lg shadow-lg w-1/2 max-h-screen "
  >
    <div class="flex justify-between">
      <p class="text-2xl">-تفاصيل الحجز</p>
      <v-btn size="large" color="pink-darken-2" @click="closeModel"> الرجوع </v-btn>
    </div>

    <div class="mt-10 rounded-md pt-8 py-8">
      <div class="grid grid-cols-3 justify-center items-center w-11/12 mx-auto">
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500">أسم القاعة: </span> {{ hallResInfo?.customerManegentName }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> أسم الزبون : </span>{{ hallResInfo?.customerManegentName }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> رقم الزبون : </span>{{ hallResInfo?.customerManegentPhonenumber }}
        </p>
        <p   class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> الخدمات المختارة : </span>{{ hallResInfo?.serviceManagementName }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> عدد الأفراد : </span>{{ hallResInfo?.numberOfIndividuals }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> التوقيت من : </span>{{ hallResInfo?.fromTime }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> التوقيت إلي : </span>{{ hallResInfo?.toTime }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> التاريخ من : </span>{{ hallResInfo?.startDate }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> التاريخ إلي : </span>{{ hallResInfo?.endDate }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> عدد الساعات/الأسابيع / الأشهر : </span
          >{{ hallResInfo?.numberOfRquiredHours }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> نوع الحجز : </span>{{ typeOfRes }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> طريقة الدفع : </span>{{ typeOfPayment }}
        </p>
        <p class="ms-3 py-1 tetx-sm text-start pr-1 font-bold bg-gray-200 text-gray-900  mt-4">
          <span class="text-blue-500"> نوع الباقة : </span>{{ hallResInfo?.packageType }}        </p>
  
      </div>
      <div class="mt-8">
        <p class="ms-3 py-1 text-2xl font-bold bg-gray-100 text-gray-800 text-center mt-4">
          <span class="text-red-500"> الإجمالي : </span>{{ hallResInfo?.totalPrice }}د.ل
        </p>
        <p class="ms-3 py-1 text-2xl bg-gray-100 font-bold text-gray-800 text-center mt-4">
          <span class="text-red-500"> المدفوع : </span>{{ hallResInfo?.payedPrice }}د.ل
        </p>
        <p class="ms-3 py-1 text-2xl bg-gray-100 font-bold text-gray-800 text-center mt-4">
          <span class="text-red-500"> المتبقي : </span>{{ hallResInfo?.restPrice }}د.ل
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import type { ReservationTable } from '../models/reserveModels'
import { getResHallByID } from '../hallReserve-services'


const hallResInfo = ref<ReservationTable>()
const typeOfRes = ref('')
const typeOfPayment = ref('')
const props = defineProps<{
  id: string
}>()
const receivedID = ref<string>('')

const emit = defineEmits<{
  closeIt: []
}>()

const closeModel = () => {
  emit('closeIt')
}

const onGetHallsRes = () => {
  getResHallByID(props.id)
    .then((response) => {
      hallResInfo.value = response
      
    })
    .catch((error) => {
      console.log(error)
    })
  // .finally(() => {
  //   isLoading.value = false
  // })
}

onMounted(async () => {
  onGetHallsRes()
})

watchEffect(() => {
  if (hallResInfo.value?.reservationsTypeId == 1) {
    typeOfRes.value= 'مبدئ'
  } else if (hallResInfo.value?.reservationsTypeId == 2) {
    typeOfRes.value= 'نهائي'
  }
})

watchEffect(() => {
  if (hallResInfo.value?.reservationsTypeId == 1) {
    typeOfPayment.value= 'نقدا'
  } else if (hallResInfo.value?.reservationsTypeId == 2) {
    typeOfPayment.value= 'بطاقة مصرفية'
  } else if (hallResInfo.value?.reservationsTypeId == 3)  {
    typeOfPayment.value= 'شيك'
  }
}) 
</script>
