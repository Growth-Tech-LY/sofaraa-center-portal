<template>
  <div
    class="mt-6 bg-white border-t-[20px] border-[#BF3B74] w-3/4 mx-auto py-16 px-16 rounded-lg shadow-lg h-3/4 max-h-[90vh]"
  >
    <h2 class="text-2xl">- حجز دورة</h2>
    <v-form id="form" v-model="form" class="grid grid-cols-4 gap-4 mt-8">
      <v-autocomplete
        :prepend-icon="mdiHumanMaleBoard"
        v-model="TeacherId"
        class="col-span-2"
        chips
        label="اسم المعلم"
        variant="outlined"
        :items="AllTeachers"
        item-title="name"
        item-value="id"
        :rules="[rules.required]"
        clearable
      ></v-autocomplete>
      <v-autocomplete
        :prepend-icon="mdiOfficeBuildingMarker"
        v-model="HallId"
        class="col-span-2"
        chips
        label="اسم القاعة"
        variant="outlined"
        placeholder="اسم القاعة "
        :items="AllHalls"
        item-title="name"
        item-value="id"
        clearable
        :rules="[rules.required]"
      ></v-autocomplete>
      <v-autocomplete
        :prepend-icon="mdiOrderAlphabeticalAscending"
        v-model="couresId"
        class="col-span-1"
        chips
        label="اسم الدورة"
        variant="outlined"
        :items="AllCoureses"
        item-title="name"
        item-value="id"
        clearable
        :rules="[rules.required]"
      ></v-autocomplete>
      <v-autocomplete
        v-model="ServiceId"
        class="col-span-1"
        multiple
        chips
        label="اسم الخدمة"
        variant="outlined"
        :items="AllService"
        item-title="name"
        item-value="id"
        clearable
        :rules="[rules.required]"
      ></v-autocomplete>
      <v-date-input
        hide-actions
        id="Date"
        v-model="StartDate"
        class="col-start-3"
        label="التاريخ من"
        variant="outlined"
        placeholder="ادخل التاريخ من ..."
        :rules="[rules.required]"
      >
      </v-date-input>
      <v-date-input
        hide-actions
        v-model="EndDate"
        clearable
        label="التاريخ الى"
        placeholder="ادخل التاريخ الى ..."
        variant="outlined"
        :rules="[rules.required]"
      ></v-date-input>
      <v-text-field
        class="col-span-2"
        v-modle="numOfHours"
        :prepend-icon="mdiTimerEditOutline"
        clearable
        label="عدد الساعات "
        placeholder="ادخل عدد الساعات  ..."
        variant="outlined"
        type="number"
        :rules="[rules.required]"
      ></v-text-field>

      <v-text-field
        v-model="timeFrom"
        class=""
        :prepend-icon="mdiTimerEditOutline"
        :rules="[rules.required]"
        clearable
        label=" الوقت من "
        placeholder="ادخل عدد الافراد  ..."
        variant="outlined"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="timeTo"
        class=""
        :prepend-icon="mdiTimerEditOutline"
        :rules="[rules.required, rules.timeDiffrence]"
        clearable
        label=" الوقت الى  "
        placeholder="ادخل عدد الافراد  ..."
        variant="outlined"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="numOfstudents"
        class="col-span-1"
        :prepend-icon="mdiAccountMultipleOutline"
        :rules="[rules.required]"
        clearable
        label=" عدد الأفراد"
        placeholder="ادخل عدد الافراد  ..."
        variant="outlined"
        type="number"
      ></v-text-field>
      <v-autocomplete
        v-model="reserveType"
        class="col-span-1"
        :prepend-icon="mdiAccountMultipleOutline"
        :rules="[rules.required]"
        item-title="label"
        item-value="value"
        label=" نوع الحجز"
        placeholder="اختر نوع الحجز  ..."
        variant="outlined"
        :items="reserveTypes"
      ></v-autocomplete>
      <v-text-field
        v-model="Price"
        class="col-span-2"
        :prepend-icon="mdiCash"
        :rules="[rules.required]"
        clearable
        label="سعر الدورة"
        prefix="د.ل"
        placeholder="ادخل السعر  ..."
        variant="outlined"
        type="number"
      ></v-text-field>

      <div class="pr-20 col-start-1 col-span-3 mt-10 flex">
        <v-btn
          id="check"
          size="large"
          class="p-4 mt-4 w-1/6 ml-3 hover:scale-95"
          color="blue"
          @click="checkdate"
          :prepend-icon="mdiTimerEditOutline"
          :disabled="!timeFrom || !timeTo || !StartDate || !EndDate || !HallId"
          >تحقق</v-btn
        >
        <v-btn
          id="add"
          size="large"
          class="p-4 mt-4 w-1/6 ml-3 hover:scale-95"
          color="green"
          :disabled="!form"
          :prepend-icon="mdiBookPlus"
          @click="submitCoures"
          >حجز</v-btn
        >
        <v-btn
          id="cancel"
          size="large"
          class="p-4 mt-4 w-1/6 hover:scale-95"
          color="red"
          @click="closeModel"
          >الغاء
        </v-btn>
        <P
          v-show="availableResrv"
          class="border-green-500 border-4 p-2 rounded-lg text-green-800 w-1/4 mr-3 mt-3 text-center"
        >
          الموعد متاح للحجز <v-icon :icon="mdiCheckAll"></v-icon
        ></P>
        <P
          v-show="NotAvailableResrv"
          class="border-red-500 border-4 p-2 rounded-lg text-red-800 w-1/4 mr-3 mt-3 text-center"
        >
          الموعد غير متاح للحجز <v-icon :icon="mdiAlert"></v-icon
        ></P>
      </div>

      <v-snackbar :timeout="2000" color="blue" :location="'top left'" v-model="ReservMsg">
        تمت تحقق بنجاح
      </v-snackbar>
    </v-form>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, onMounted, ref, watchEffect } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import {
  mdiTimerEditOutline,
  mdiAlert,
  mdiCheckAll,
  mdiCash,
  mdiAccountMultipleOutline,
  mdiOfficeBuildingMarker,
  mdiHumanMaleBoard,
  mdiOrderAlphabeticalAscending,
  mdiBookPlus
} from '@mdi/js'
import { checkReservation, postCoures } from '../CoursesService'
import {
  getCouresesFromMang,
  getHalls,
  getServices,
  getTeacher
} from '@/core/services/mainServices'
import type { Coures, Hall, Service, Teacher } from '@/core/models/Mainmodels'
import type { PostCoures } from '../models/courses'

const form = ref(false)
const AddMsg = ref(false)
const ReservMsg = ref(false)
const availableResrv = ref(false)
const NotAvailableResrv = ref(false)

const emit = defineEmits<{
  close: []
  refresh: []
}>()
//  Geting values   FROM API
const AllTeachers = ref<Teacher[]>()
const AllCoureses = ref<Coures[]>()
const AllHalls = ref<Hall[]>()
const AllService = ref<Service[]>()

// **********************
const rules = {
  required: (v: string) => !!v || 'الحقل اجباري',
  timeDiffrence: (value : number) => value > timeFrom.value|| 'يجب ان يكون وقت النهاية اكبر من الوقت البداية '
}

// Vars using for body request
const Price = ref<number>()
const StartDate = ref()
const EndDate = ref()
const couresId = ref<string>()
const ServiceId = ref<string[]>()
const HallId = ref<string>()
const TeacherId = ref<string>()
const numOfstudents = ref<number>()
const numOfHours = ref<number>()
const timeFrom = ref<number>(0)
const timeTo = ref<number>(0)
const reserveType = ref<number>()

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
// **************************

const closeModel = () => {
  emit('close')
}
const refresh = () => {
  emit('refresh')
}
const getAllData = () => {
  getCouresesFromMang().then((response) => {
    AllCoureses.value = response
  })
  getServices().then((response) => {
    AllService.value = response
  })
  getHalls().then((response) => {
    AllHalls.value = response
  })
  getTeacher().then((response) => {
    AllTeachers.value = response
  })
}

const formatDate = (dateString: Date) => {
  // تحويل النص إلى كائن تاريخ
  const date = new Date(dateString)

  // الحصول على اليوم والشهر والسنة
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  // إعادة التنسيق إلى الشكل المطلوب
  return `${year}-${month}-${day}`
}

onMounted(async () => {
  getAllData()
})
watchEffect(() => {
  console.log(StartDate.value)
})

const checkdate = () => {
  checkReservation({
    hall_managementId: HallId.value,
    fromTime: Number(timeFrom.value),
    toTime: Number(timeTo.value),
    startDate: formatDate(StartDate.value),
    endDate: formatDate(EndDate.value)
  })
    .then((response) => {
      //       تم تغير
      if (response.message === 'حجز الدورة التدريبية متاح في الوقت المطلوب.') {
        ReservMsg.value = true
        availableResrv.value = true
        NotAvailableResrv.value = false
      }
    })
    .catch((error: any) => {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message
        //                             |                          |
        //                             v  تحتاج لتغير الرسالـة  v
        if (errorMessage === 'TrainingCoures is already reserved during the requested time.') {
          NotAvailableResrv.value = true
          availableResrv.value = false
        }
      }
    })
}

const submitCoures = async () => {
  const body: PostCoures = {
    couresManagementId: couresId.value,
    teacherManagementId: TeacherId.value,
    hall_managementId: HallId.value,
    serviceManagementId: ServiceId.value,
    Price: Price.value,
    numberOfRquiredHours: numOfHours.value,
    numberOfMaximumIndividuals: numOfstudents.value,
    startDate: StartDate.value,
    endDate: EndDate.value,
    fromTime: timeFrom.value,
    toTime: timeTo.value,
    reservationsTypeId: reserveType.value
  }

  postCoures(body)
    .then(() => {
      AddMsg.value = true
      refresh()
      closeModel()
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
