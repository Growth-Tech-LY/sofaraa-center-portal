<template>
    <div>
      <v-btn color="red-darken-1" :prepend-icon="mdiArrowRightTop" to="/hall-list">الرجوع</v-btn>
    </div>
    <div class="mt-20 bg-white border-t-8 border-[#BF3B74] mx-auto p-7 rounded-lg shadow-lg h-4/5">
      <p class="pr-8 text-lg">حجز قاعة</p>
      <v-form class="grid grid-cols-2 gap-3 p-4 items-center justify-center">
        <div>
           {{ newValue }}
          <v-autocomplete
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
          ></v-btn>
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
            v-model="servicesPrice"
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
            clearable
            label="التاريخ الى"
            placeholder="ادخل التاريخ الى ..."
            variant="outlined"
            type="date"
          ></v-text-field>
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
            :rules="[Rules.time ]"
            :prepend-icon="mdiTimerOutline"
          ></v-text-field>
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
    </div>
  </template>
  <script setup lang="ts">
  import { mdiPlus, mdiTimerOutline, mdiCalendarRange, mdiArrowRightTop } from '@mdi/js'
  import { onMounted, ref, watchEffect } from 'vue'
  import { getHalls, getCustomers, getServices } from '@/core/services/mainServices'
  import { Postreservation } from '../hallReserve-services'
  import { putResHall ,getResHallByID } from '../hallReserve-services'
  import type { Hall, Service, Customer } from '@/core/models/Mainmodels'
  import router from '@/router'
import { useRoute } from 'vue-router'
import type { ReservationTable } from '../models/reserveModels'
  
  const form = ref(false)
  
  const Rules = {
    time: (value: number) => (value > 0 && value <= 24) || 'يجب التكون القيكة بين ال 1 إلي 24 ' ,
    timeDiffrince: (value: number) => (value > fromTime.value) || ' يجب أن يكون قيمة الحقل أكبر من الوقت من' ,
    paymentCount : (value : number) => (value <= totalPayment.value) || 'قيمة المدخلة اكبر من الإجمالي '
  }
  
  const closeModel = () => {
    router.replace('/hall-list')
  }
  
  const oldValue= ref('قيمة القديمة : أبن هارون')
  const newValue= ref(oldValue.value)

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
  
  const subscription = ref(1)
  const packagePrice = ref<PaymentMethod | null>(null)
  
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
    console.log(hallName.value)
  })
  
  watchEffect(() => {
    servicesId.value = []
    selectedServicesPrice.value = 0
    for (let i = 0; i < servicesPrice.value.length; i++) {
      selectedServicesPrice.value = selectedServicesPrice.value + servicesPrice.value[i].servicePrice
      servicesId.value.push(servicesPrice.value[i].id)
    }
    console.log('theids', servicesId.value)
  })
  
  watchEffect(() => {
    console.log('the hallname value is ', hallName.value)
  })
  
  const onGetData = () => {
    getResHallByID(receivedID).then((response) => {
        resToEdit.value = response
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
          router.replace('/hall-list')
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
    console.log('Payment Methods:', paymentMethods.value)
    console.log('Selected Package Price:', packagePrice.value)
  
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
      console.log('Placeholder:', placeHolderNumber.value)
    } else {
      placeHolderNumber.value = ''
    }
  })
  </script>
  