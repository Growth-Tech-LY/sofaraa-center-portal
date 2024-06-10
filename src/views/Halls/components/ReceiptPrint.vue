<template>
  <div class="mx-auto w-1/3 px-10 toPrint hidden print:flex flex-col items-center">
    <img class="w-96 mb-8" src="../../../assets/icons/sofaraaLogo2.png" alt="" />
    <div class="flex justify-between items-center text-lg mb-4 px-2 print:w-[110mm]">
      <p>التاريخ : 22/8/2022</p>
      <p>إيصال قبض</p>
    </div>
    <div class="border-2 font-bold border-black px-4 pt-4 h-44 pb-44 print:w-[110mm]">
      <p class="mb-8">أسم الزبون :  {{ toPrint?.customerManegentName }}</p>
      <div class="flex gap-32 items-center mb-8">
        <p>المبلغ و قدرة :{{ toPrint?.totalPrice }} </p>
        <p>نوع الدفع : {{ typeOfPayment }}</p>
      </div>
      <div class="flex gap-52 items-center mb-8">
        <p>المسلم :</p>
        <p class="mt-2">الختم :</p>
      </div>
    </div>  
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { ReservationTable } from '../models/reserveModels';
import { watchEffect } from 'vue';

const typeOfPayment= ref('')


const toPrint= ref<ReservationTable>()
const props = defineProps<{
  printContent: ReservationTable
}>()





watchEffect(() => {
  toPrint.value= props.printContent
})
watchEffect(() => {
  if (toPrint.value?.reservationsTypeId == 1) {
    typeOfPayment.value= 'نقدا'
  } else if (toPrint.value?.reservationsTypeId == 2) {
    typeOfPayment.value= 'بطاقة مصرفية'
  } else if (toPrint.value?.reservationsTypeId == 3)  {
    typeOfPayment.value= 'شيك'
  }
})

</script>

<style >
@page {
  size: A4;
  margin: 0;
  page-break-inside: avoid;
}

@media print {
  .toPrint {
    width: 210mm;
    height: 297mm;
   
  }
  
  /* ... the rest of the rules ... */
}
</style>
