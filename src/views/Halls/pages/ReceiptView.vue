<template>
  <div
    class="mt-16 bg-white border-t-[20px] border-[#BF3B74] w-5/6 mx-auto p-7 sm:p-0 max-h-screen rounded-lg shadow-lg"
  >
    <div ref="printSection" class="mx-auto w-1/3 px-10">
      <img class="w-96 mb-8 sm:mb-0" src="../../../assets/icons/sofaraaLogo2.png" alt="" />
      <div class="flex justify-between items-center text-lg lg:mb-4 lg:px-2 print:w-[110mm]">
        <p>التاريخ : {{ currentDate }}</p>
        <p>إيصال قبض</p>
      </div>
      <div class="border-2 font-bold border-black px-2 lg:px-4 lg:pt-4 lg:h-44 lg:pb-44 min-w-96 print:w-[110mm]">
        <p class="mb-8">أسم الزبون : {{ reservedhall?.customerManegentName }}</p>
        <div class="flex gap-32 items-center lg:mb-8 sm:mb-0">
          <p>المبلغ و قدرة : {{ reservedhall?.totalPrice }}</p>
          <p>نوع الدفع : {{ typeOfPayment }}</p>
        </div>
        <div class="flex gap-52 items-center lg:mb-8 sm:mb-0">
          <p>المسلم :</p>
          <p class="mt-2">الختم :</p>
        </div>
      </div>
    </div>
    <div class= "flex lg:gap-4 mr-8 lg:pb-2">
      <v-btn @click="onPrintCard" color="pink-darken-2">طباعة </v-btn>
      <v-btn @click="closeModel" color="red-darken-2">إغلاق </v-btn>
    </div>
  </div>

  <div ref="componentRef">
    <ReceiptPrint :printContent="reservedhall!" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import ReceiptPrint from '../components/ReceiptPrint.vue'
import type { ReservationTable } from '../models/reserveModels'
import { getResHallByID } from '../hallReserve-services'
import { useVueToPrint } from 'vue-to-print';

const typeOfPayment = ref('')
const currentDate = ref('')
const loading = ref(false)

const reservedhall = ref<ReservationTable>()

const props = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  close: []
}>()

const closeModel = () => {
  emit('close')
}

const componentRef = ref()
const { handlePrint } = useVueToPrint({
  content: () => componentRef.value,
  documentTitle: 'إيصال صرف',
  removeAfterPrint: true,
  bodyClass:'onPrint',
  onAfterPrint: () => {
  
  }
})


const onPrintCard =  () => {
  setTimeout(() => {
    handlePrint()
  }, 50)
}

const printSection = ref<HTMLElement | null>(null)





onMounted(() => {
  getResHallByID(props.id).then((response) => {
    reservedhall.value = response
  })

  const now = new Date()
  const formattedDate = now.toLocaleDateString('en', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  currentDate.value = formattedDate
})

watchEffect(() => {
  if (reservedhall.value?.reservationsTypeId == 1) {
    typeOfPayment.value = 'نقدا'
  } else if (reservedhall.value?.reservationsTypeId == 2) {
    typeOfPayment.value = 'بطاقة مصرفية'
  } else if (reservedhall.value?.reservationsTypeId == 3) {
    typeOfPayment.value = 'شيك'
  }
})
</script>

<style>
@page {
  size: A4;
  margin: 0;
}

@media print {
  .toPrint {
    width: 210mm;
    height: 297mm;
  }

  .onPrint {
    direction: rtl;
  }

  /* ... the rest of the rules ... */
}
</style>
