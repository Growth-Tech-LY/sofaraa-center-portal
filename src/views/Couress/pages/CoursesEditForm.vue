<template>
  <div
    class="mt-16 bg-white border-t-[20px] border-[#BF3B74] w-3/4 mx-auto py-16 px-16 rounded-lg shadow-lg"
  >
    <v-form v-model="form" class="grid grid-cols-4 gap-4 mt-8">
      <v-autocomplete
        :prepend-icon="mdiHumanMaleBoard"
        v-model="coures.teacherManagementId"
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
        v-model="coures.hall_managementId"
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
        v-model="coures.couresManagementId"
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
        v-model="coures.serviceManagementId"
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
        v-model="coures.startDate"
        class="col-start-3"
        label="التاريخ من"
        variant="outlined"
        placeholder="ادخل التاريخ من ..."
        :rules="[rules.required]"
      >
      </v-date-input>

      <v-date-input
        :rules="[rules.required]"
        label="التاريخ الى"
        placeholder="ادخل التاريخ الى ..."
        v-model="coures.endDate"
        variant="outlined"
        :hide-actions="true"
      ></v-date-input>
      <v-text-field
        class="col-span-2"
        v-modle="coures.numberOfRquiredHours"
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
        v-model="coures.fromTime"
        class=""
        :prepend-icon="mdiTimerEditOutline"
        :rules="[rules.required]"
        clearable
        label=" الوقت من "
        placeholder="بداية الكورس ..."
        variant="outlined"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="coures.toTime"
        class=""
        :prepend-icon="mdiTimerEditOutline"
        :rules="[rules.required]"
        clearable
        label=" الوقت الى  "
        placeholder="  نهاية الكورس  ..."
        variant="outlined"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="coures.numberOfMaximumIndividuals"
        class="col-span-2"
        :prepend-icon="mdiAccountMultipleOutline"
        :rules="[rules.required]"
        clearable
        label=" عدد الأفراد"
        placeholder="ادخل عدد الافراد  ..."
        variant="outlined"
        type="number"
      ></v-text-field>

      <v-autocomplete
        v-model="coures.reservationsTypeId"
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
        v-model="coures.Price"
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
          class="p-4 mt-4 w-2/6 ml-3 text-white"
          color="yellow-accent-4"
          :disabled="!form"
          @click="submit"
          >تعديل</v-btn
        >
        <v-btn size="large" class="p-4 mt-4 w-2/6" color="red" :to="{ name: 'coureses-list' }"
          >الغاء
        </v-btn>
      </div>

      <v-snackbar
        :timeout="2000"
        color="yellow-accent-3"
        v-model="UpdateMsg"
        :location="'top right'"
      >
        تم تعديل بنجاح
      </v-snackbar>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import type { Coures, Hall, Service, Teacher } from '@/core/models/Mainmodels'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { onMounted, ref } from 'vue'
import type { PostCoures } from '../models/courses'
import {
  mdiTimerEditOutline,
  mdiCash,
  mdiAccountMultipleOutline,
  mdiOfficeBuildingMarker,
  mdiHumanMaleBoard,
  mdiOrderAlphabeticalAscending
} from '@mdi/js'
import {
  getCouresesFromMang,
  getHalls,
  getServices,
  getTeacher
} from '@/core/services/mainServices'
import { useRoute } from 'vue-router'
import { UpdateCoures, getCourseByID } from '../CoursesService'

const form = ref(false)
const UpdateMsg = ref(false)
const route = useRoute()
const receivedID = ref(String(route.params.id))
const rules = {
  required: (v: string) => !!v || 'الحقل اجباري'
}
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

const getAlldeta = () => {
  getServices().then((response) => {
    AllService.value = response
  })
  getCouresesFromMang().then((response) => {
    AllCoureses.value = response
  })
  getHalls().then((response) => {
    AllHalls.value = response
  })
  getTeacher().then((response) => {
    AllTeachers.value = response
  })
}

onMounted(async () => {
  getAlldeta()
})

const AllTeachers = ref<Teacher[]>()
const AllCoureses = ref<Coures[]>()
const AllHalls = ref<Hall[]>()
const AllService = ref<Service[]>()

const coures = ref<PostCoures>({
  couresManagementId: undefined,
  teacherManagementId: undefined,
  hall_managementId: undefined,
  serviceManagementId: [],
  Price: undefined,
  numberOfRquiredHours: undefined,
  numberOfMaximumIndividuals: undefined,
  fromTime: undefined,
  toTime: undefined,
  startDate: undefined,
  endDate: undefined,
  reservationsTypeId: 0
})

const submit = () => {
  UpdateCoures(coures.value).then(() => {
    UpdateMsg.value = true
  })
}
const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/')

  return new Date(`${month}/${day}/${year}`)
}
const getCurrentData = () => {
  getCourseByID(receivedID.value).then((response) => {
    coures.value.couresManagementId = response.couresManagementName
    coures.value.hall_managementId = response.hall_managementName
    coures.value.teacherManagementId = response.teacherManagementName
    coures.value.serviceManagementId = response.serviceManagementName
    coures.value.reservationsTypeId = response.reservationsTypeId
    coures.value.numberOfMaximumIndividuals = response.numberOfMaximumIndividuals
    coures.value.numberOfRquiredHours = response.numberOfRquiredHours
    coures.value.startDate = formatDate(response.startDate)
    coures.value.endDate = formatDate(response.endDate)
    coures.value.Price = response.price
    coures.value.fromTime = response.fromTime
    coures.value.toTime = response.toTime
  })
}

onMounted(() => {
  getCurrentData()
})
</script>
