<template>
  <v-form v-model="form">
    <div
      class="mt-20 bg-white border-t-8 border-[#BF3B74] mx-auto p-8 rounded-lg shadow-lg w-1/2 max-h-screen"
    >
      <p class="text-2xl mb-4">تعديل المتبقي</p>
      <div class="grid grid-cols-2 gap-5 text-xl text-pink-800">
        <p>
          أسم الزبون : <span class="text-black"> {{ hallResInfo?.customerManegentName }}</span>
        </p>
        <p>
          رقم الزبون :
          <span class="text-black"> {{ hallResInfo?.customerManegentPhonenumber }}</span>
        </p>
        <p>
          أسم القاعة : <span class="text-black">{{ hallResInfo?.hall_ManagementName }}</span>
        </p>

        <p>
          الإجمالي: <span class="text-black"> {{ hallResInfo?.totalPrice }}</span>
        </p>
        <p>
          المدفوع: <span class="text-black"> {{ hallResInfo?.payedPrice }}</span>
        </p>
        <p>
          المتبقي: <span class="text-black"> {{ hallResInfo?.restPrice }}</span>
        </p>

        <v-text-field
          :rules="[rules.price, rules.required]"
          v-show="submitRest"
          class="text-black"
          v-model="editRestPrice"
          :prepend-icon="mdiCash"
          label="تعديل قيمة المتبقي"
          item-title="label"
          item-value="value"
          placeholder="تعديل قيمة المتبقي"
          variant="outlined"
          type="number"
        ></v-text-field>
        <p v-show="!submitRest" class="text-2xl">تم دفع القيمة بالكامل</p>
      </div>
      <div class="flex pt-2 lg:gap-4 mr-8 mt-2 lg:pb-2 lg:mt-8">
        <v-btn :disabled="!form" v-if="submitRest" @click="submit" color="pink-darken-2"
          >تعديل
        </v-btn>
        <v-btn @click="closeModel" color="red-darken-2">إغلاق </v-btn>
      </div>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import type { ReservationTable } from '../models/reserveModels'
import { getResHallByID, putRestPrice } from '../hallReserve-services'
import { mdiCash } from '@mdi/js'
const props = defineProps<{
  id: string
}>()

const form = ref(false)
const hallResInfo = ref<ReservationTable>()
const editRestPrice = ref<number>()
const submitRest = ref(true)

const emit = defineEmits<{
  close: []
  refresh: []
  editDone: []
}>()

const closeModel = () => {
  emit('close')
}
const refreshModel = () => {
  emit('refresh')
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
const succesfullyEdit = () => {
  emit('editDone')
}

onMounted(() => {
  onGetHallsRes()
})

const submit = () => {
  if (editRestPrice.value) {
    const body = {
      id: props.id,
      restPrice: editRestPrice.value
    }
    putRestPrice(body).then(() => {
      closeModel()
      refreshModel()
      succesfullyEdit()
    })
  }
}

const rules = {
  required: (v: string) => !!v || 'الحقل اجباري',
  price: (n: number) => {
    const restPrice = hallResInfo.value?.restPrice
    if (restPrice === null || restPrice === undefined) {
      return 'قيمة إجمالي المتبقي غير محددة'
    }
    return n <= restPrice || 'أكبر من قيمة إجمالي المتبقي'
  }
}

watchEffect(() => {
  if (hallResInfo.value?.restPrice == 0) {
    submitRest.value = false
  }
})
</script>
