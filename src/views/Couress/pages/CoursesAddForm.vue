<template>
  <div
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-3/4 mx-auto py-16 px-16 rounded-lg shadow-lg"
  >
    <h2 class="text-2xl">- حجز دورة</h2>
    <v-form v-model="form" class="grid grid-cols-4 gap-4 mt-8">
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
      <v-text-field
        v-model="StartDate"
        class="col-start-3"
        :prepend-icon="mdiCalendarRange"
        label="التاريخ من"
        variant="outlined"
        placeholder="ادخل التاريخ من ..."
        type="date"
<<<<<<< HEAD
=======
        :rules="[rules.required]"
>>>>>>> be3bf314c364e024f4981945a659e0acad62a99e
      >
      </v-text-field>
      <v-text-field
        v-model="EndDate"
        :prepend-icon="mdiCalendarRange"
        clearable
        label="التاريخ الى"
        placeholder="ادخل التاريخ الى ..."
        variant="outlined"
        type="date"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        class="col-span-2"
        v-modle="numOfHours"
        :prepend-icon="mdiTimerEditOutline"
        clearable
        label="عدد الساعات "
        placeholder="ادخل عدد الساعات  ..."
        variant="outlined"
        prefix="د.ل"
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
        :rules="[rules.required]"
        clearable
        label=" الوقت الى  "
        placeholder="ادخل عدد الافراد  ..."
        variant="outlined"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="numOfstudents"
        class="col-span-2"
        :prepend-icon="mdiAccountMultipleOutline"
        :rules="[rules.required]"
        clearable
        label=" عدد الأفراد"
        placeholder="ادخل عدد الافراد  ..."
        variant="outlined"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="Price"
        class="col-span-2"
        :prepend-icon="mdiCash"
        :rules="[rules.required]"
        clearable
        label="سعر الدورة"
        placeholder="ادخل السعر  ..."
        variant="outlined"
        type="number"
      ></v-text-field>

      <div class="pr-20 col-start-2 row-start-6 col-span-2">
        <v-btn
          size="large"
          class="p-4 mt-4 w-2/6 ml-3"
          color="green"
          :disabled="!form"
          @click="submitCoures"
          >اضافة</v-btn
        >
        <v-btn size="large" class="p-4 mt-4 w-2/6" color="red" @click="closeModel">الغاء </v-btn>
      </div>

      <v-snackbar :timeout="2000" color="success" :location="'top left'">
        تمت الإضافة بنجاح
      </v-snackbar>
    </v-form>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, onMounted, ref, watchEffect } from 'vue'
import {
  mdiTimerEditOutline,
  mdiCalendarRange,
  mdiCash,
  mdiAccountMultipleOutline,
  mdiOfficeBuildingMarker,
  mdiHumanMaleBoard,
  mdiOrderAlphabeticalAscending
} from '@mdi/js'
import { postCoures } from '../CoursesService'
import {
  getCouresesFromMang,
  getHalls,
  getServices,
  getTeacher
} from '@/core/services/mainServices'
import type { Coures, Hall, Service, Teacher } from '@/core/models/Mainmodels'
import type { PostCoures } from '../models/courses'

const form = ref(false)

const emit = defineEmits<{
  close: []
}>()
//  Geting values   FROM API
const AllTeachers = ref<Teacher[]>()
const AllCoureses = ref<Coures[]>()
const AllHalls = ref<Hall[]>()
const AllService = ref<Service[]>()

// **********************
const rules = {
  required: (v: string) => !!v || 'الحقل اجباري'
}

// Vars using for body request
const Price = ref<number>()
const StartDate = ref<string>()
const EndDate = ref<string>()
const couresId = ref<string>()
const ServiceId = ref<string[]>()
const HallId = ref<string>()
const TeacherId = ref<string>()
const numOfstudents = ref<number>()
const numOfHours = ref<number>()
const timeFrom = ref<number>()
const timeTo = ref<number>()

// **************************

const closeModel = () => {
  emit('close')
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

onMounted(async () => {
  getAllData()
})
watchEffect(() => {
  console.log(couresId.value)
  console.log(TeacherId.value)
  console.log(ServiceId.value)
  console.log(HallId.value)
})

const submitCoures = async () => {
  const body: PostCoures = {
    couresManagementId: couresId.value,
    teacherManagementId: TeacherId.value,
    hall_managementId: HallId.value,
    serviceManagementId: ServiceId.value,
    Price: Price.value,
    numberOfRquiredHours: numOfHours.value,
    numberOfIndividuals: numOfstudents.value,
    startDate: StartDate.value,
    endDate: EndDate.value,
    fromTime: timeFrom.value,
    toTime: timeTo.value
  }

  postCoures(body)
    .then(() => {
      console.log(body)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
