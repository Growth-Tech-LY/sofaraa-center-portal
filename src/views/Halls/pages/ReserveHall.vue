<template>
  <div class="mt-20 bg-white border-t-8 border-[#D81B60] mx-auto p-7 rounded-lg shadow-lg h-4/5">
    <p class="pr-8 text-lg">حجز قاعة</p>
    <v-form class="grid grid-cols-2 gap-3 p-4 items-center justify-center">
      <div>
        <v-autocomplete
          v-model="hallName"
          :items="hallNames"
          label="إسم القاعة"
          item-title="label"
          item-value="value"
          placeholder="إسم القاعة"
          variant="outlined"
        ></v-autocomplete>
      </div>
      <div class="flex items-center justify-center">
        <v-autocomplete
          v-model="customer"
          :items="customers"
          label="إسم الزبون"
          item-title="label"
          item-value="value"
          placeholder="إسم الزبون"
          variant="outlined"
        ></v-autocomplete>
        <v-btn
          class="text-white mb-4"
          color="green-accent-4"
          density="comfortable"
          :icon="mdiPlus"
        ></v-btn>
      </div>
      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="packagePrice"
          :items="packages"
          label="نوع الباقة"
          item-title="label"
          item-value="value"
          placeholder="نوع الباقة"
          variant="outlined"
        ></v-autocomplete>

        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500">سعر الباقة : </span>{{ packagePrice }} د.ل
        </p>
      </div>

      <div class="mb-2">
        <v-text-field
          variant="outlined"
          label=" عدد الساعات المطلوبة"
          hide-details
          type="number"
        ></v-text-field>
      </div>
      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="servicesPrice"
          :items="services"
          label="نوع الخدمة"
          item-title="label"
          item-value="value"
          placeholder="نوع الخدمة"
          variant="outlined"
        ></v-autocomplete>

        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500">سعر الخدمة :</span> {{ servicesPrice }} د.ل
        </p>
      </div>

      <div class="mb-2">
        <v-text-field
        v-model="servicesNumber"
          variant="outlined"
          label=" عدد الأفراد "
          hide-details
          type="number"
        ></v-text-field>
      </div>

      <div class="flex item-center justify-center gap-8">
        <v-text-field
          label=" التاريخ من "
          item-title="label"
          item-value="value"
          placeholder="التاريخ من"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          label="التاريخ إلي"
          item-title="label"
          item-value="value"
          placeholder="التاريخ إلي"
          variant="outlined"
        ></v-text-field>
      </div>

      <div class="flex item-center justify-center gap-8">
        <v-text-field
          :prepend-icon="mdiTimerOutline"
          label="الوقيت من"
          item-title="label"
          item-value="value"
          placeholder="الوقيت من"
          variant="outlined"
          :rules="[Rules.time]"
        ></v-text-field>
        <v-text-field
          label="الوقيت إلي"
          item-title="label"
          item-value="value"
          placeholder="الوقيت إلي"
          variant="outlined"
          :rules="[Rules.time]"
          :prepend-icon="mdiTimerOutline"
        ></v-text-field>
      </div>

      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="PaymentMethod"
          :items="PaymentMethods"
          label="طريقة الدفع  "
          item-title="label"
          item-value="value"
          placeholder=" طريقة الدفع"
          variant="outlined"
        ></v-autocomplete>

        <v-autocomplete
          v-model="reserveType"
          :items="reserveTypes"
          label="نوع الحجز  "
          item-title="label"
          item-value="value"
          placeholder=" نوع الحجز"
          variant="outlined"
        ></v-autocomplete>
      </div>
      <div class="flex item-center justify-center gap-8">
        <v-text-field
        v-model="paid"
          label="المدفوع"
          item-title="label"
          item-value="value"
          placeholder="المدفوع"
          variant="outlined"
          type="number"
        ></v-text-field>
        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500">سعر الإجمالي : </span> {{ totalPayment }} د.ل
        </p>
        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500"> المتبقي : </span>{{ remainingPayment }} د.ل
        </p>
      </div>

      <div>
        <v-btn
          :disabled="!form"
          size="large"
          class="mx-3"
          color="green"
          @click="submitHallData"
          type="submit"
        >
          إضافة
        </v-btn>
        <v-btn size="large" class="mx-3" color="red" @click="closeModel"> ألغاء </v-btn>
      </div>
    </v-form>
  </div>
  <div>
    <v-snackbar v-model="showMessage" :timeout="2000" color="success" :location="'top left'">
      تمت الإضافة بنجاح
    </v-snackbar>
  </div>
</template>
<script setup lang="ts">
import { mdiPlus, mdiTimerOutline } from '@mdi/js'
import { defineEmits, ref, watchEffect } from 'vue'


const form =ref(false)

const Rules= {
  time: (vlue :number) => vlue >0 && vlue <=24 || "time not valild "
}

const emit = defineEmits<{
  close: []
  refresh: []
}>()

const closeModel = () => {
  emit('close')
}
const reload = () => {
  emit('refresh')
}

// const updateModel = () => {
//   emit('update');
// };
const hallName = ref('')
const customer = ref('')
const PaymentMethod = ref('')
const reserveType = ref('')
const hallType = ref()
const subscription = ref(1)
const packagePrice = ref<number | undefined>(undefined)
const servicesPrice = ref<number | undefined>(undefined)
const servicesNumber = ref<number>(1)
const showMessage = ref(false)
const fromTime = ref(0)
const toTime = ref(0)
const totalPayment = ref(0)
const paid = ref(0)
const totalServicesPrice = ref(0)
const remainingPayment = ref(0)

const prices = ref<{
  hour: number
  halfDay: number
  day: number
  week: number
  month: number
}>({
  hour: 0,
  halfDay: 0,
  day: 0,
  week: 0,
  month: 0
})

//the Test data to try the logic
const hallNames = [
  {
    label: 'ابن الهيثم',
    value: 'ابن الهيثم',
    index: 1
  },
  {
    label: 'ابن بطوطة',
    value: 'ابن بطوطة',
    index: 2
  }
] as const

const customers = [
  {
    label: 'مصباح',
    value: 'مصباح',
    index: 1
  },
  {
    label: 'هيثم',
    value: 'هيثم',
    index: 2
  },
  {
    label: 'خالد',
    value: 'خالد',
    index: 3
  }
] as const

const packages = [
  {
    label: 'ساعة',
    value: 100,
    index: 1
  },
  {
    label: 'نصف يوم',
    value: 350,
    index: 2
  },
  {
    label: 'أسبوع',
    value: 1200,
    index: 3
  }
] as const

const services = [
  {
    label: 'إفطار',
    value: 25,
    index: 1
  },
  {
    label: ' وجبة غذاء',
    value: 40,
    index: 2
  },
  {
    label: 'إستراحة قهوة',
    value: 1200,
    index: 3
  }
] as const

const PaymentMethods = [
  {
    label: 'نقدا',
    value: 'نقدا',
    index: 1
  },
  {
    label: ' بطاقة مصرفية',
    value: ' بطاقة مصرفية',
    index: 2
  }
] as const

const reserveTypes = [
  {
    label: 'مبدئ',
    value: 'مبدئ',
    index: 1
  },
  {
    label: 'نهائي',
    value: 'نهائي',
    index: 2
  }
] as const

const calculatePaymrnt = () => {
  if (servicesPrice.value) {
    totalServicesPrice.value = servicesPrice.value * servicesNumber.value
  }

  console.log(totalServicesPrice.value )
  console.log(totalPayment.value )
}

watchEffect(() => {
  calculatePaymrnt()
})

//----------------------------------------------------------

const submitHallData = () => {

  if (!form){
      
  }
  // const response = await apiClient.post('Hall_management', {
  //   name: hallName.value,
  //   hallTypeId: hallType.value,
  //   vipId: subscription.value,
  //   hourPrice: prices.value.hour,
  //   halfDayPrice: prices.value.halfDay,
  //   weekPrice: prices.value.week,
  //   monthPrice: prices.value.month
  // })
  // console.log(response.data)
  // console.log(response.data.token)
  // localStorage.setItem('token', response.data.token)\
  // const body = {
  //   name: hallName.value,
  //   hallTypeId: hallType.value,
  //   vipId: subscription.value,
  //   hourPrice: prices.value.hour,
  //   halfDayPrice: prices.value.halfDay,
  //   weekPrice: prices.value.week,
  //   monthPrice: prices.value.month
  // }

  // postHall(body)
  //   .then(() => {
  //     showMessage.value = true
  //     console.log(body)
  //     // updateModel();
  //   })
  //   .catch((error: any) => {
  //     console.log(error)
  //   })
  //   .finally(() => {
  //     reload()
  //     hallName.value = ''
  //     hallType.value = 1
  //     subscription.value = 1
  //     prices.value.day = 0
  //     prices.value.halfDay = 0
  //     prices.value.hour = 0
  //     prices.value.month = 0
  //     prices.value.week = 0
  //   })
}
</script>
