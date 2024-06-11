<template>
  <div>
    <v-btn color="red-darken-1" :prepend-icon="mdiArrowRightTop" @click="closeModel">الرجوع</v-btn>
  </div>
  <div class="mt-20 bg-white border-t-8 border-[#BF3B74] mx-auto p-7 rounded-lg shadow-lg h-4/5">
    <p class="pr-8 text-lg">حجز قاعة</p>
    <v-form class="grid grid-cols-2 gap-3 p-4 items-center justify-center">
      <div>
        <v-autocomplete
          transition="slide-y-transition"
          v-model="hallName"
          :items="hallData"
          label="إسم القاعة"
          item-title="name"
          item-value="value"
          placeholder="إسم القاعة"
          variant="outlined"
          :return-object="true"
        ></v-autocomplete>
      </div>
      <div class="flex items-center justify-center">
        <v-autocomplete
          v-model="customer"
          transition="slide-y-transition"
          :items="customerData"
          label="إسم الزبون"
          item-title="name"
          item-value="id"
          placeholder="إسم الزبون"
          variant="outlined"
          :return-object="true"
        ></v-autocomplete>
        <v-btn
          class="text-white mb-4"
          color="green-accent-4"
          density="comfortable"
          :icon="mdiPlus"
          @click="toggeAddCustomer"
        ></v-btn>
      </div>
      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="packagePrice"
          transition="slide-y-transition"
          :items="paymentMethods"
          label="نوع الباقة"
          item-title="label"
          item-value="value"
          :return-object="true"
          placeholder="نوع الباقة"
          variant="outlined"
        ></v-autocomplete>

        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500">سعر الباقة : </span>{{ packagePrice?.value }} د.ل
        </p>
      </div>

      <div class="mb-2">
        <v-text-field
          v-model="countOfrequiedTime"
          :label="placeHolderNumber"
          variant="outlined"
          hide-details
          type="number"
        ></v-text-field>
      </div>
      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="servicesPrice"
          transition="slide-y-transition"
          :items="ServicesData"
          label="نوع الخدمة"
          multiple
          chips
          item-title="name"
          item-value="servicePrice"
          placeholder="نوع الخدمة"
          :return-object="true"
          variant="outlined"
        ></v-autocomplete>

        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500">سعر الخدمة :</span> {{ selectedServicesPrice }} د.ل
        </p>
      </div>

      <div class="mb-2">
        <v-text-field
          v-model="individualNumber"
          variant="outlined"
          label=" عدد الأفراد "
          hide-details
          type="number"
        ></v-text-field>
      </div>

      <div class="flex item-center justify-center gap-8">
        <v-text-field
          v-model="formDate"
          dir="rtl"
          :prepend-icon="mdiCalendarRange"
          clearable
          label="التاريخ من"
          placeholder="ادخل التاريخ من ..."
          variant="outlined"
          type="date"
        ></v-text-field>
        <v-text-field
          v-model="toDate"
          dir="rtl"
          :prepend-icon="mdiCalendarRange"
          :rules="[Rules.dateRange]"
          clearable
          label="التاريخ الى"
          placeholder="ادخل التاريخ الى ..."
          variant="outlined"
          type="date"
        ></v-text-field>
      </div>

      <div class="flex item-center justify-center gap-4 mb-2">
        <v-text-field
          v-model="fromTime"
          :prepend-icon="mdiTimerOutline"
          label="الوقيت من"
          item-title="label"
          item-value="value"
          placeholder="الوقيت من"
          variant="outlined"
          :rules="[Rules.time]"
        ></v-text-field>
        <v-text-field
          v-model="toTime"
          label="الوقيت إلي"
          item-title="label"
          item-value="value"
          placeholder="الوقيت إلي"
          variant="outlined"
          :rules="[Rules.time]"
          :prepend-icon="mdiTimerOutline"
        ></v-text-field>
        <div class="relative flex">
          <v-btn
            color="blue accent-4"
            :disabled="!toDate || !formDate || !toTime || !fromTime || !hallName"
            :loading="loadingbtn"
            class="mt-2"
            @click="checkTime"
            >تحقق من القاعة</v-btn
          >
          <div v-show="showSchedule" v-if="hallName">
              <v-btn
              :to="{ name: 'schedule-table' , params: { id: hallName.id }  }"
                color="yellow-darken-2"
                :disabled="!hallName"
                :loading="loadingbtn"
                class="mt-2 mr-4 text-white"
                @click="checkTime"
                >عرض جدول</v-btn
              >
          </div>
          <span v-show="reservationsChecked" class="absolute top-3 -left-8"
            ><v-icon size="large" color="green accent-3" :icon="mdiCheckCircle"></v-icon
          ></span>
        </div>
      </div>
      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="Payment"
          transition="slide-y-transition"
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
          transition="slide-y-transition"
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
          :rules="[Rules.paymentCount]"
        ></v-text-field>
        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500">سعر الإجمالي : </span> {{ totalPayment }}د.ل
        </p>
        <p class="ms-3 text-lg font-bold text-gray-900 text-center mt-4">
          <span class="text-red-500"> المتبقي : </span>{{ remainingPayment }}د.ل
        </p>
      </div>

      <div>
        <v-btn
          :disabled="
            !hallName ||
            !customer ||
            !packagePrice ||
            !countOfrequiedTime ||
            !servicesPrice ||
            !individualNumber ||
            !formDate ||
            !toDate ||
            !fromTime ||
            !toTime ||
            !Payment ||
            !reserveType ||
            !paid
          "
          size="large"
          class="mx-3"
          color="pink-darken-1"
          @click="submitHallData"
        >
          إضافة
        </v-btn>

        <v-btn size="large" class="mx-3" color="red" @click="closeModel"> ألغاء </v-btn>
      </div>
    </v-form>
  </div>
  <div>
    <v-snackbar v-model="showAddMessage" :timeout="2000" color="success" :location="'top left'">
      تمت الإضافة بنجاح
    </v-snackbar>

    <v-snackbar
      v-model="snackbar.show"
      :timeout="2000"
      color="blue-darken-2"
      :location="'top center'"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>

  <div
    data-aos="fade-left"
    v-if="popAddCustomer"
    @click.self="toggeAddCustomer"
    class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
  >
    <AddCustomerRes @close="toggeAddCustomer" @refresh="OngetCustomers" />
  </div>
</template>
<script setup lang="ts">
import {
  mdiPlus,
  mdiTimerOutline,
  mdiCalendarRange,
  mdiArrowRightTop,
  mdiCheckCircle
} from '@mdi/js'
import AddCustomerRes from './AddCustomerRes.vue'
import { onMounted, ref, watchEffect } from 'vue'
import { getHalls, getCustomers, getServices } from '@/core/services/mainServices'
import { CheckHallReserved, Postreservation } from '../hallReserve-services'
import type { Hall, Service, Customer } from '@/core/models/Mainmodels'
import router from '@/router'

import type { AxiosError } from 'axios'

const form = ref(false)

//date-fns function
// watchEffect( () => {
//   import { formatDate } from '@/core/healpers/dateFormat'
//   const date = ref()
//   formatDate(date.value)

//   console.log(date.value);

// })

const Rules = {
  time: (value: number) => (value > 0 && value <= 24) || 'يجب التكون القيمة بين ال 1 إلي 24 ',
  dateRange: (value: string) => {
    if (!formDate.value) return true
    const fromDate = new Date(formDate.value)
    const toDate = new Date(value)
    return toDate >= fromDate || 'تاريخ النهاية يجب أن يكون أكبر من تاريخ البداية'
  },
  paymentCount: (value: number) => value <= totalPayment.value || 'قيمة المدخلة اكبر من الإجمالي '
}

const closeModel = () => {
  router.replace({ name: 'reservations-list' })
}

const hallName = ref<Hall>()
const hallId = ref('')
const oldHallName = ref<Hall>()
const hallData = ref<Hall[]>([])
const customerData = ref<Customer[]>([])
const ServicesData = ref<Service[]>([])
const customer = ref<Customer>()
const Payment = ref(1)
const reserveType = ref(1)
const idToEdit = ref('')
const subscription = ref(1)
const packagePrice = ref<PaymentMethod | null>(null)

//popUps
const popAddCustomer = ref(false)
const reservationsChecked = ref(false)
const loadingbtn = ref(false)
const showSchedule = ref(false)

const snackbar = ref({
  show: false,
  message: ''
})

const toggeAddCustomer = () => {
  popAddCustomer.value = !popAddCustomer.value
}

const toggleSchedule = () => {
  showSchedule.value = !showSchedule.value
}

const OngetCustomers = () => {
  getCustomers().then((response) => {
    customerData.value = response
    popAddCustomer.value = !popAddCustomer.value
    showAddMessage.value = true
  })
}


//--------------------

const individualNumber = ref<number>(1)
const showAddMessage = ref(false)
const fromTime = ref(0)
const toTime = ref(0)
const totalTime = ref(0)
const formDate = ref('')
const toDate = ref('')
const placeHolderNumber = ref('')
//variables for the calculation of the total
const servicesPrice = ref<Service[]>([])
const selectedServicesPrice = ref(0)
const totalPayment = ref(0)
const paid = ref(0)
const totalServicesPrice = ref(0)
const remainingPayment = ref(0)
const totalPackagePrice = ref(0)
const countOfrequiedTime = ref<number | undefined>(undefined)

//hold services id
const servicesId = ref<string[]>([])

//------------------------------------

//the Test data to try the logic

const PaymentMethods = [
  {
    label: 'نقدا',
    value: 1,
    index: 1
  },
  {
    label: ' بطاقة مصرفية',
    value: 2,
    index: 2
  },
  {
    label: 'شيك',
    value: 3,
    index: 3
  }
] as const

const reserveTypes = [
  {
    label: 'مبدئ',
    value: 1,
    index: 1
  },
  {
    label: 'نهائي',
    value: 2,
    index: 2
  }
] as const

const calculatePaymrnt = () => {
  if (servicesPrice.value) {
    totalServicesPrice.value = selectedServicesPrice.value * individualNumber.value
  }

  if (packagePrice.value && countOfrequiedTime.value) {
    totalPackagePrice.value = packagePrice.value.value * countOfrequiedTime.value
    totalPayment.value = totalServicesPrice.value + totalPackagePrice.value
  }
}

watchEffect(() => {
  calculatePaymrnt()
  remainingPayment.value = totalPayment.value - paid.value
})

watchEffect(() => {
  servicesId.value = []
  selectedServicesPrice.value = 0
  for (let i = 0; i < servicesPrice.value.length; i++) {
    selectedServicesPrice.value = selectedServicesPrice.value + servicesPrice.value[i].servicePrice
    servicesId.value.push(servicesPrice.value[i].id)
  }
})

const onGetData = () => {
  getHalls().then((response) => {
    hallData.value = response
  })

  getCustomers().then((response) => {
    customerData.value = response
  })

  getServices().then((response) => {
    ServicesData.value = response
  })
}

onMounted(() => {
  onGetData()
})

//----------------------------------------------------------

const submitHallData = () => {
  if (hallName.value && countOfrequiedTime.value && packagePrice.value && customer.value) {
    const body = {
      hall_ManagementId: hallName.value.id,
      packageType: packagePrice.value.label,
      customerManegentId: customer.value.id,
      serviceManagementId: servicesId.value,
      totalPrice: totalPayment.value,
      payedPrice: paid.value,
      restPrice: remainingPayment.value,
      fromTime: fromTime.value,
      toTime: toTime.value,
      startDate: formDate.value,
      endDate: toDate.value,
      reservationsTypeId: reserveType.value,
      paymentMethodId: Payment.value,
      numberOfRquiredHours: countOfrequiedTime.value,
      numberOfIndividuals: individualNumber.value
    }
    Postreservation(body)
      .then(() => {
        showAddMessage.value = true
        closeModel()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        hallName.value = undefined

        customer.value = undefined

        packagePrice.value = null

        countOfrequiedTime.value = undefined

        servicesPrice.value = []

        individualNumber.value = 1

        formDate.value = ''
        toDate.value = ''

        fromTime.value = 0
        toTime.value = 0
        Payment.value = 0
        reserveType.value = 0
        paid.value = 0
      })
  }
}

type PaymentMethod = {
  label: string
  value: number
}

const paymentMethods = ref<PaymentMethod[]>([])

watchEffect(() => {
  if (hallName.value !== oldHallName.value) {
    oldHallName.value = hallName.value

    // Reset payment methods and package price
    paymentMethods.value = []
    packagePrice.value = null

    // Set new payment methods if hallName is not null
    if (hallName.value) {
      paymentMethods.value = [
        {
          label: 'ساعة',
          value: hallName.value.hourPrice
        },
        {
          label: 'نصف يوم',
          value: hallName.value.halfDayPrice
        },
        {
          label: 'أسبوع',
          value: hallName.value.weekPrice
        },
        {
          label: 'شهر',
          value: hallName.value.monthPrice
        }
      ]
    }
  }
})
watchEffect(() => {
  if (packagePrice.value) {
    switch (packagePrice.value.label) {
      case 'ساعة':
      case 'نصف يوم':
        placeHolderNumber.value = 'عدد الساعات المطلوبة'
        break
      case 'أسبوع':
        placeHolderNumber.value = 'عدد الأسابيع المطلوبة'
        break
      case 'شهر':
        placeHolderNumber.value = 'عدد الأشهر المطلوبة'
        break
      default:
        placeHolderNumber.value = ''
    }
  } else {
    placeHolderNumber.value = ''
  }
})

//checking if hall is available function
const checkTime = () => {
  loadingbtn.value = true
  if (hallName.value) {
    const body = {
      hall_ManagementId: hallName.value.id,
      fromTime: fromTime.value,
      toTime: toTime.value,
      startDate: formDate.value,
      endDate: toDate.value
    }
    CheckHallReserved(body)
      .then((response) => {
        console.log(response)
        loadingbtn.value = false

        if (response.message === 'Hall is available for the requested time.') {
          snackbar.value.message = 'الحجز متاح'
          reservationsChecked.value = true
        } else {
          snackbar.value.message = 'الحجز غير متاح'
          reservationsChecked.value = false
        }

        snackbar.value.show = true
      })
      .catch((error: AxiosError) => {
        console.log(error)
        loadingbtn.value = false

        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message

          if (errorMessage === 'Hall is already reserved during the requested time.') {
            snackbar.value.message = 'الحجز غير متاح'
            reservationsChecked.value = false
          } else {
            snackbar.value.message = 'حدث خطأ ما. حاول مرة أخرى.'
          }
        } else {
          snackbar.value.message = 'حدث خطأ ما. حاول مرة أخرى.'
        }

        snackbar.value.show = true
        toggleSchedule()
      })
  }
}



</script>
