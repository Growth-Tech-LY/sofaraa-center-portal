<template>

  <div
    class="mt-16 bg-white border-t-[20px] border-[#BF3B74] w-5/6 mx-auto p-7 sm:p-0 max-h-screen rounded-lg shadow-lg print:hidden"
  >
    <div ref="printSection" class="mx-auto w-1/3 px-10 ">
      <img class="w-96 mb-8 sm:mb-0" src="../../../assets/icons/sofaraaLogo2.png" alt="" />
      <div class="flex justify-between items-center text-lg mb-4 px-2 print:w-[110mm]">
        <p>التاريخ : 22/8/2022</p>
        <p>إيصال قبض</p>
      </div>
      <div class="border-2 font-bold border-black px-4 pt-4 h-44 pb-44 print:w-[110mm]">
        <p class="mb-8">أسم الزبون : {{ reservedhall?.customerManegentName }}</p>
        <div class="flex gap-32 items-center mb-8 sm:mb-0">
          <p>المبلغ و قدرة : {{ reservedhall?.totalPrice }}</p>
          <p>نوع الدفع : {{typeOfPayment}}</p>
        </div>
        <div class="flex gap-52 items-center mb-8 sm:mb-0">
          <p>المسلم :</p>
          <p class="mt-2">الختم :</p>
        </div>
      </div>
    </div>
    <div class="print:hidden flex gap-4 mr-8 pb-2">
      <v-btn @click="print" color="pink-darken-2">طباعة </v-btn>
      <v-btn @click="closeModel" color="red-darken-2">إغلاق </v-btn>
    </div>
  </div>
  

  <ReceiptPrint :printContent="reservedhall" />

</template>

<script lang="ts" setup>
import { onMounted, ref , watchEffect } from 'vue'
import ReceiptPrint from '../components/ReceiptPrint.vue';
import type { ReservationTable } from '../models/reserveModels';
import { getResHallByID } from '../hallReserve-services';

const typeOfPayment = ref('')
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

const printSection = ref<HTMLElement | null>(null)

const print = () => {
  if (printSection.value) {

    window.print()
  }
}

onMounted( () => {
 
  getResHallByID(props.id) .then((response)=> {
    reservedhall.value = response
  
  })
})



watchEffect(() => {
  if (reservedhall.value?.reservationsTypeId == 1) {
    typeOfPayment.value= 'نقدا'
  } else if (reservedhall.value?.reservationsTypeId == 2) {
    typeOfPayment.value= 'بطاقة مصرفية'
  } else if (reservedhall.value?.reservationsTypeId == 3)  {
    typeOfPayment.value= 'شيك'
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
  /* ... the rest of the rules ... */
}
</style>
