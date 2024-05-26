<template>
  <div
    class="mt-16 bg-white border-t-[20px] border-[#BF3B74] w-3/4 mx-auto py-16 px-16 rounded-lg shadow-lg"
  >
    <v-form v-model="form" class="grid grid-cols-4 gap-4 mt-8">
      <v-text-field
        v-model="courseName"
        class="w-5/6 col-span-2"
        clearable
        label="اسم دورة"
        variant="outlined"
        placeholder="ادخل إسم الباقة..."
        :rules="[Rules.required, Rules.Length]"
      ></v-text-field>
      <v-autocomplete
        v-model="courseServ"
        class="col-span-2"
        chips
        label="اسم القاعة"
        variant="outlined"
        placeholder="اسم القاعة "
        :items="['قاعة الخورزمي', 'معمل الحاسوب 1', 'معمل الحاسوب 2 (الكبير)']"
        item-title="lable"
        item-value="value"
        clearable
      ></v-autocomplete>
      <v-text-field
        v-model="teacherName"
        class="col-span-2 col-start-1 w-5/6"
        clearable
        label="اسم الأستاذ"
        placeholder="ادخل سعر الساعة ..."
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="FromTime"
        :prepend-icon="mdiTimerEditOutline"
        label="الساعة من"
        variant="outlined"
        placeholder="ادخل الساعة من ..."
        type="number"
      >
      </v-text-field>
      <v-text-field
        v-modle="ToTime"
        :prepend-icon="mdiTimerEditOutline"
        clearable
        label="الساعة الى"
        placeholder="ادخل الساعة الى ..."
        variant="outlined"
        prefix="د.ل"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="Price"
        class="col-span-2 w-5/6"
        clearable
        label="سعر  "
        placeholder="ادخل سعر   ..."
        variant="outlined"
        prefix="د.ل"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="StartDate"
        class="col-start-3"
        :prepend-icon="mdiCalendarRange"
        label="التاريخ من"
        variant="outlined"
        placeholder="ادخل التاريخ من ..."
        type="date"
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
      ></v-text-field>
      <div class="pr-20 col-start-1">
        <v-btn
          size="large"
          class="p-4 mt-4 w-2/6 ml-3"
          color="green"
          type="submit"
          @click="submitPackage"
          :disabled="!form"
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
import { mdiTimerEditOutline, mdiCalendarRange } from '@mdi/js'
import { postCoures } from '../models/CoursesService'
import { getCouresesFromMang } from '@/core/services/mainServices'
import type { Coures } from '@/core/models/Mainmodels'
const teacherName = ref('')
const courseName = ref('')
const courseServ = ref()

const Price = ref<number>()
const ReservationId = ref('')
const couresManagementId = ref('')
const AllCoureses = ref<Coures[]>()

// const TeacherManagementId = ref('')
// const Hall_managementId = ref('')
// const ServiceManagementId = ref('')
const FromTime = ref(0)
const ToTime = ref(0)
const StartDate = ref('')
const EndDate = ref('')

const form = ref(false)
const Rules = {
  Length: (v: string) => v.length >= 3 || ' يجب ان يكون اكبر من 3 حروف',
  required: (v: string) => !!v || 'الحقل اجباري'
}

const emit = defineEmits<{
  close: []
}>()

const closeModel = () => {
  emit('close')
}

const getAllData = () => {
  getCouresesFromMang()
}

onMounted(async () => {
  getAllData()
})
watchEffect(() => {})

// const submitPackage = async () => {
//   const body = {
//     reservationId: ReservationId,
//     couresManagementId: CouresManagementId,
//     teacherManagementId: TeacherManagementId,
//     hall_managementId: Hall_managementId,
//     serviceManagementId: ServiceManagementId,
//     fromTime: FromTime,
//     toTime: ToTime,
//     startDate: StartDate,
//     endDate: EndDate
//   }
//   postCoures(body)

// }
</script>
