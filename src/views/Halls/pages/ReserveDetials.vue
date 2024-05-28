<template>
    <div>
    <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500">سعر الإجمالي : </span> {{ 200 }}د.ل
        </p>
        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500"> المتبقي : </span>{{ 300 }}د.ل
        </p>
    </div>
    <div>
        
        <v-btn size="large" class="mx-3" color="red" @click="closeModel"> إلغاء </v-btn>
      </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ReservationTable } from '../models/reserveModels';
import { getResHallByID } from '../hallReserve-services';

const hallsRes = ref<ReservationTable>()

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


// const onGetHallsRes = () => {
 
//   getResHallByID()
//     .then((response) => {
//       totalHalls.value = response.total
//       hallsRes.value = response.data
//       errorCheck.value = false
//     })
//     .catch(() => {
//       hallsRes.value = []
//       errorCheck.value = true
//     })
//     .finally(() => {
//       isLoading.value = false
//     })
// }

// onMounted(async () => {
//   onGetHallsRes(paginations.value)
// })


</script>