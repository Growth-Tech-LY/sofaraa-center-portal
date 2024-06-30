<template>
  <div>
    <v-btn color="red-darken-1" :prepend-icon="mdiArrowRightTop" @click="closeModel">الرجوع</v-btn>
  </div>
  <div class="mt-20 bg-white border-t-8 border-[#BF3B74] mx-auto p-7 rounded-lg shadow-lg h-4/5">
    <p class="pr-8 text-lg">حجز قاعة</p>
    <v-form class="grid grid-cols-2 gap-3 p-4 items-center justify-center">
      <div>
        <v-autocomplete
          v-model="hallName"
          :items="hallData"
          label="إسم القاعة"
          item-title="name"
          placeholder="إسم القاعة"
          variant="outlined"
          :return-object="true"
        ></v-autocomplete>
      </div>

      <div class="flex items-center justify-center">
        <v-autocomplete
          v-model="customer"
          :items="customerData"
          label="إسم الزبون"
          item-title="name"
          item-value="id"
          placeholder="إسم الزبون"
          variant="outlined"
          :return-object="true"
        ></v-autocomplete>
       
      </div>

      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="packagePrice"
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
          variant="outlined"
          :label="placeHolderNumber"
          hide-details
          type="number"
        ></v-text-field>
      </div>
      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="services"
          :items="ServicesData"
          label="نوع الخدمة"
          multiple
          chips
          item-title="name"
          item-value="id"
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

      <div class="flex item-center justify-center gap-8 relative">
        <v-date-input
          v-model="startDate"
          class="col-start-3"
          label="التاريخ من"
          variant="outlined"
          placeholder="ادخل التاريخ من ..."
          :rules="[rules.required]"
        >
        </v-date-input>

        <v-date-input
          v-model="endDate"
          :rules="[rules.required]"
          label="التاريخ الى"
          placeholder="ادخل التاريخ الى ..."
          variant="outlined"
          :hide-actions="true"
        ></v-date-input>
        <p v-show="dateError" class="text-red-500 text-sm absolute left-8 bottom-0 ">القيمة أصغر من تاريخ البدء</p>
      </div>

      <div class="flex item-center justify-center gap-8">
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
            :disabled="!startDate || !endDate || !toTime || !fromTime || !hallName"
            :loading="loadingbtn"
            class="mt-2"
            @click="checkTime"
            >تحقق من القاعة</v-btn
          >

          <span v-show="reservationsChecked" class="absolute top-3 -left-8"
            ><v-icon size="large" color="green accent-3" :icon="mdiCheckCircle"></v-icon
          ></span>
        </div>
      </div>

      <div class="flex item-center justify-center gap-8">
        <v-autocomplete
          v-model="Payment"
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
            !services ||
            !individualNumber ||
            !startDate ||
            !endDate ||
            !fromTime ||
            !toTime ||
            !Payment ||
            !reserveType ||
            !paid ||
            dateError
          "
          size="large"
          class="mx-3"
          color="pink-darken-1"
          @click="submit"
        >
          تعديل
        </v-btn>
        <v-btn size="large" class="mx-3" color="red" @click="closeModel"> إلغاء </v-btn>
      </div>
    </v-form>
  </div>
  <div>
    <v-snackbar v-model="showAddMessage" :timeout="2000" color="success" :location="'top left'">
      تم التعديل بنجاح
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
</template>
<script setup lang="ts">
import {
  mdiPlus,
  mdiTimerOutline,
  mdiCalendarRange,
  mdiArrowRightTop,
  mdiCheckCircle
} from '@mdi/js'
import { onMounted, ref, watchEffect } from 'vue'
import { getHalls, getCustomers, getServices } from '@/core/services/mainServices'
import { CheckHallReserved, Postreservation } from '../hallReserve-services'
import { putResHall, getResHallByID } from '../hallReserve-services'
import type { Hall, Service, Customer } from '@/core/models/Mainmodels'
import router from '@/router'
import { useRoute } from 'vue-router'
import type { ReservationTable } from '../models/reserveModels'
import { VDateInput } from 'vuetify/labs/components'

const rules = {
  required: (v: string) => !!v || 'الحقل اجباري'
}

//date-fns function
watchEffect(() => {
  // formatPutDate(formDate.value)
  // console.log(formDate.value)
})

//------------------------------

const form = ref(false)
const dateError = ref(false)
const reservationsChecked = ref(false)
const snackbar = ref({
  show: false,
  message: ''
})

const Rules = {
  time: (value: number) => (value > 0 && value <= 24) || 'يجب أن تكون القيمة بين 1 إلى 24',
  timeDifference: (value: number) => value > fromTime.value || 'يجب أن تكون قيمة الحقل أكبر من الوقت من',
  paymentCount: (value: number) => value <= totalPayment.value || 'القيمة المدخلة أكبر من الإجمالي',
};


const closeModel = () => {
  router.replace({ name: 'reservations-list' })
}

// const route = useRoute()

// const receivedID = Number(route.params.id)
// console.log(receivedID)

const route = useRoute()
const receivedID = String(route.params.id)

// const updateModel = () => {
//   emit('update');
// };
const resToEdit = ref<ReservationTable>()
const hallName = ref<Hall>()
const oldHallName = ref<Hall>()
const hallData = ref<Hall[]>([])
const customerData = ref<Customer[]>([])
const ServicesData = ref<Service[]>([])
const customer = ref<Customer>()
const Payment = ref(1)
const reserveType = ref(1)
const packagePrice = ref<PaymentMethod | null>(null)

const individualNumber = ref<number>(1)
const showAddMessage = ref(false)
const loadingbtn = ref(false)
const fromTime = ref(0)
const toTime = ref(0)
const firstCheck = ref(1)

//variables of date
const startDate = ref<Date>()
const endDate = ref<Date>()
const placeHolderNumber = ref('')
const reForrmatStartDate = ref('')
//-----------------------------
//variables for the calculation of the total
const services = ref<Service[]>([])
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
  if (services.value) {
    totalServicesPrice.value = selectedServicesPrice.value * individualNumber.value
  }

  if (packagePrice.value && countOfrequiedTime.value) {
    totalPackagePrice.value = packagePrice.value.value * countOfrequiedTime.value
    totalPayment.value = totalServicesPrice.value + totalPackagePrice.value
  }
  remainingPayment.value = totalPayment.value - paid.value
}

watchEffect(() => {
  calculatePaymrnt()
})

watchEffect(() => {
  servicesId.value = []
  selectedServicesPrice.value = 0
  for (let i = 0; i < services.value.length; i++) {
    selectedServicesPrice.value = selectedServicesPrice.value + services.value[i].servicePrice
    servicesId.value.push(services.value[i].id)
  }
  console.log('theids', servicesId.value)
})

watchEffect(() => {
  console.log('the hallname value is ', hallName.value)
})

const onGetData = () => {
  getResHallByID(receivedID).then((response) => {
    resToEdit.value = response
    startDate.value = formatDate(response.startDate)
    endDate.value = formatDate(response.endDate)
  })

  getCustomers().then((response) => {
    customerData.value = response
  })

  getServices().then((response) => {
    ServicesData.value = response
  })

  getHalls().then((response) => {
    hallData.value = response
  })
}

onMounted(() => {
  onGetData()
})

//----------------------------------------------------------

// Function to reformat the date
const reformatDate = (dateStr: string): string => {
  const parts = dateStr.split('/')
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

const submit = () => {
  if (hallName.value && countOfrequiedTime.value && packagePrice.value && customer.value) {
    const body = {
      id: receivedID,
      hall_ManagementId: hallName.value.id,
      packageType: packagePrice.value.label,
      customerManegentId: customer.value.id,
      fromTime: fromTime.value,
      toTime: toTime.value,
      startDate: startDate.value,
      endDate: endDate.value,
      reservationsTypeId: reserveType.value,
      paymentMethodId: Payment.value,
      serviceManagementId: servicesId.value,
      numberOfRquiredHours: countOfrequiedTime.value,
      numberOfIndividuals: individualNumber.value,
      totalPrice: totalPayment.value,
      payedPrice: paid.value
      // restPrice: remainingPayment.value
    }
    putResHall(body)
      .then(() => {
        showAddMessage.value = true
        router.replace({ name: 'reservations-list' })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {})
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
          label: ' يوم',
          value: hallName.value.dayPrice
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
      case ' يوم':
        placeHolderNumber.value = 'عدد الأيام المطلوبة'
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
    console.log('Placeholder:', placeHolderNumber.value)
  } else {
    placeHolderNumber.value = ''
  }
})

watchEffect(() => {
  if (resToEdit.value) {
    hallData.value.forEach((item) => {
      if (item.name == resToEdit.value?.hall_ManagementName) {
        hallName.value = item
        return
      }
    })
    if (hallName.value) {
      if (resToEdit.value) {
        paymentMethods.value.forEach((item) => {
          if (item.label == resToEdit.value?.packageType) {
            packagePrice.value = item
            return
          }
        })
      }
    }
  }
})

watchEffect(() => {
  // if (resToEdit.value) {
  //   hallData.value.forEach((item) => {
  //     if (item.name == resToEdit.value?.hall_ManagementName) {
  //       hallName.value = item
  //       return
  //     }
  //   })
  // }
  if (resToEdit.value) {
    customerData.value.forEach((item) => {
      if (item.name == resToEdit.value?.customerManegentName) {
        customer.value = item
        return
      }
    })
  }

  if (resToEdit.value && ServicesData.value && firstCheck.value == 1) {
    services.value = []
    // Assuming serviceManagementName is a list of service names
    const serviceNames = Array.isArray(resToEdit.value.serviceManagementName)
      ? resToEdit.value.serviceManagementName
      : [resToEdit.value.serviceManagementName]

    ServicesData.value.forEach((item) => {
      if (serviceNames.includes(item.name)) {
        services.value.push(item)
        firstCheck.value++
      }
    })
  }

  if (resToEdit.value) {
    fromTime.value = resToEdit.value.fromTime
    toTime.value = resToEdit.value.toTime

    // startDate.value = resToEdit.value.startDate
    // endDate.value = resToEdit.value.endDate
    countOfrequiedTime.value = resToEdit.value.numberOfRquiredHours
    individualNumber.value = resToEdit.value.numberOfIndividuals
    Payment.value = resToEdit.value.paymentMethodId
    reserveType.value = resToEdit.value.reservationsTypeId
    paid.value = resToEdit.value.payedPrice
    totalPayment.value = resToEdit.value.totalPrice
    remainingPayment.value = resToEdit.value.restPrice
  }
})

// watchEffect(() => {
//   reForrmatStartDate.value = endDate.value
// })

// // WatchEffect to update reForrmatStartDate when endDate changes
// watchEffect(() => {
//   reForrmatStartDate.value = reformatDate(endDate.value)
// })

// Function to format the date for date picker
// const formatToDatePicker = (dateString: string): string => {
//   const date = new Date(dateString)
//   const year = date.getFullYear()
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const day = String(date.getDate()).padStart(2, '0')
//   return `${year}-${month}-${day}`
// }

watchEffect(() => {
  if (startDate.value && endDate.value) {
    if (endDate.value < startDate.value ) {
      dateError.value=true
      
    } else if (endDate.value >= startDate.value) {
      dateError.value= false
    } 
  }
})

const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/')

  return new Date(`${month}/${day}/${year}`)
}

const checkTime = () => {
  loadingbtn.value = true
  if (hallName.value) {
    const body = {
      hall_ManagementId: hallName.value.id,
      fromTime: fromTime.value,
      toTime: toTime.value,
      startDate: startDate.value,
      endDate: endDate.value
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
      .catch((error: any) => {
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
      })
  }
}

</script>
