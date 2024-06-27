<template>
  <div class="pt-6">
    <p class="text-2xl">حجورات الدورات التدربية</p>
    <div class="flex w-full mx-auto justify-between">
      <div class="flex flex-col">
        <div class="flex justify-between items-center relative">
          <v-btn @click="searchToggle" size="large" variant="text" :prepend-icon="mdiFilter">
            <v-tooltip activator="parent" location="bottom">بحث</v-tooltip></v-btn
          >

          <!-- //filter div -->
          <div
            data-aos="zoom-in-up"
            v-if="showSearch"
            class="bg-white border-t-[12px] border-[#BF3B74] mx-auto p-7 rounded-lg shadow-lg w-1/4 z-50 left-1/2 top-10 fixed"
          >
            <p class="text-gray-700 mx-auto pr-3 mb-2 text-xl py-2">فلتر البحث</p>
            <div class="bg-white grid grid-cols-1 gap-4 justify-center items-center">
              <div class="flex gap-1 justify-center items-center">
                <v-autocomplete
                  :prepend-icon="mdiOfficeBuildingMarker"
                  transition="slide-y-transition"
                  v-model="search.Hall.id"
                  :items="AllHalls"
                  label="إسم القاعة"
                  item-title="name"
                  placeholder="إسم القاعة"
                  variant="outlined"
                  item-value="id"
                ></v-autocomplete>
              </div>
              <div class="flex gap-1 justify-center items-center">
                <v-autocomplete
                  :prepend-icon="mdiHumanMaleBoard"
                  transition="slide-y-transition"
                  v-model="search.Teacher.id"
                  :items="AllTeachers"
                  label="إسم المعلم"
                  item-title="name"
                  item-value="id"
                  placeholder="إسم المعلم"
                  variant="outlined"
                ></v-autocomplete>
              </div>
              <div class="flex gap-1 justify-center items-center">
                <v-autocomplete
                  :prepend-icon="mdiOrderAlphabeticalAscending"
                  transition="slide-y-transition"
                  v-model="search.Coures.id"
                  :items="AllCoureses"
                  label="إسم الدورة"
                  item-title="name"
                  item-value="id"
                  placeholder="بحث بإسم الدروة "
                  variant="outlined"
                  clearable
                ></v-autocomplete>
              </div>

              <div class="flex gap-1 justify-center items-center">
                <v-text-field
                  v-model="paginations.startDate"
                  dir="rtl"
                  :prepend-icon="mdiCalendarRange"
                  clearable
                  label="التاريخ من"
                  placeholder="ادخل التاريخ من ..."
                  variant="outlined"
                  type="date"
                ></v-text-field>
              </div>

              <div class="flex gap-1 justify-center items-center">
                <v-text-field
                  v-model="paginations.endDate"
                  dir="rtl"
                  :prepend-icon="mdiCalendarRange"
                  clearable
                  label="التاريخ الى"
                  placeholder="ادخل التاريخ الى ..."
                  variant="outlined"
                  type="date"
                ></v-text-field>
              </div>
            </div>
            <div class="flex flex-nowrap">
              <v-btn size="large" class="mx-3" color="red" @click="searchToggle"> إغلاق </v-btn>
              <v-btn
                size="large"
                class="mx-3"
                color="light-blue-accent-4"
                @click="onSearchFilter"
                @keydown.enter="onSearchFilter"
              >
                بحث
              </v-btn>
              <v-btn
                size="large"
                class="text-white"
                color="light-blue-accent-4 "
                variant="outlined"
                @click="clearFilter"
              >
                إلغاء البحث
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <v-btn
        class="mt-4 ml-5 text-white hover:scale-95"
        color="pink-darken-2"
        rounded="lg"
        :prepend-icon="mdiPlus"
        @click="toggelForm"
        >اضافة حجز</v-btn
      >

      <!--               The Coureses Add Form   Start       -->

      <div
        v-if="formPopUP"
        @click.self="toggelForm"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <v-btn
          class="absolute top-6 right-20 hover:scale-95"
          :prepend-icon="mdiCloseCircleOutline"
          color="pink-darken-2"
          @click="toggelForm"
          >أغلاق</v-btn
        >
        <div data-aos="zoom-in-up">
          <CoursesForm
            @close="toggelForm"
            @refresh="
              onOptionsChange({
                page: paginations.page,
                itemsPerPage: paginations.size
              })
            "
          />
        </div>
      </div>

      <!-- The viewStudents start -->
      <div
        v-if="viewStudents"
        @click.self="viewStudents = false"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <v-btn
          @click="viewStudents = false"
          class="absolute top-6 right-20 hover:scale-95"
          :prepend-icon="mdiCloseCircleOutline"
          color="pink-darken-2"
          >أغلاق</v-btn
        >
        <div data-aos="zoom-in-right">
          <ViewStudents :trainingCouresReservationsId="courseId" />
        </div>
      </div>

      <!-- view services model  -->
      <div
        v-if="viewServ"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
        @click.self="toggelServies"
      >
        <v-btn
          @click="toggelServies"
          class="absolute top-6 right-1/4 hover:scale-95"
          :prepend-icon="mdiCloseCircleOutline"
          color="pink-darken-2"
          >أغلاق</v-btn
        >
        <viewService :serv="service" />
      </div>
      <!-- [     Add Student Start           >>      ]  -->

      <div
        v-if="studentPopUp"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
        @click.self="studentPopUp = false"
      >
        <v-btn
          @click="toggelAddstudent"
          class="absolute top-6 right-32 hover:scale-95"
          :prepend-icon="mdiCloseCircleOutline"
          color="pink-darken-2"
          >أغلاق</v-btn
        >
        <div data-aos="zoom-in-right">
          <AddStudent
            :trainingCouresReservationsId="courseId"
            :price="coursesPrice"
            @close="toggelAddstudent"
          />
        </div>
      </div>

      <!--  <<  [        The Edit start          ] >>       -->
      <div
        v-if="editPopUp"
        @click.self="toggelEdit"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <CoursesEditForm :trainingCouresReservationsId="courseId" />
      </div>

      <!--              The Delete Start           -->
      <div
        @click.self="confirmDelete = false"
        v-show="confirmDelete"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005] flex justify-center items-center"
      >
        <div>
          <div class="bg-white p-4 rounded-lg shadow-lg">
            <p class="text-xl">هل أنت متأكد من حذف الدورة؟</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mt-4 text-white"
                color="green-accent-4"
                rounded="lg"
                variant="flat"
                @click="confirmDelete = false"
                >إلغاء</v-btn
              >
              <v-btn
                :append-icon="mdiDeleteOutline"
                class="mt-4 text-white"
                color="red-darken-2"
                rounded="lg"
                @click="onDelete"
                variant="flat"
                >نعم</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </div>
        </div>
      </div>
    </div>
    <v-data-table-server
      class="max-w-[750px]"
      v-model:items-per-page="paginations.size"
      :headers="headers"
      :items="courses"
      :items-length="paginations.size"
      :loading="loading"
      :search="searcher"
      item-value="name"
      @update:options="onOptionsChange"
    >
      <!-- view the services PopUp  -->
      <template #[`item.serviceManagementName`]="{ item }">
        <v-btn
          :icon="mdiInformationSlabCircleOutline"
          class="text-sm ml-4"
          size="sm"
          color="blue"
          variant="text"
          @click="openViewServies(item.serviceManagementName)"
        ></v-btn>
      </template>

      <!-- The  Actions  in the table  Start -->

      <template #[`item.actions`]="{ item }">
        <div class="grid grid-cols-2 gap-y-2">
          <v-btn
            class=""
            color="blue-darken-2"
            variant="text"
            size="medium"
            :prepend-icon="mdiAccountEye"
            @click="OpenViewstudent(item)"
          >
            <v-tooltip activator="parent" location="bottom">عرض الطالبة </v-tooltip>
          </v-btn>
          <v-btn
            class=""
            color="green"
            variant="text"
            size="medium"
            :prepend-icon="mdiAccountMultiplePlus"
            @click="OpenAddstudent(item)"
          >
            <v-tooltip activator="parent" location="bottom">اسناد طالب لدورة</v-tooltip>
          </v-btn>
          <RouterLink :to="{ name: 'edit-courese', params: { id: item.id } }"
            ><v-btn
              variant="text"
              class=""
              color="yellow-darken-2"
              :prepend-icon="mdiPencil"
              size="medium"
            >
              <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
            </v-btn></RouterLink
          >

          <v-btn
            color="deep-orange-darken-1"
            variant="text"
            size="medium"
            :prepend-icon="mdiDelete"
            @click="openDeleteModal(item.id)"
          >
            <v-tooltip activator="parent" location="bottom">حذف</v-tooltip>
          </v-btn>
        </div>
        <v-snackbar v-model="DeleteMsg" :timeout="2000" color="red" :location="'top right'">
          تم الحذف حجز الدورة
        </v-snackbar>
      </template>
    </v-data-table-server>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CoursesForm from './CoursesAddForm.vue'
import viewService from '../components/viewService.vue'
import {
  mdiPlus,
  mdiPencil,
  mdiDelete,
  mdiAccountMultiplePlus,
  mdiAccountEye,
  mdiFilter,
  mdiCloseCircleOutline
} from '@mdi/js'
import { deleteCoures, getCourses } from '../CoursesService'
import CoursesEditForm from './CoursesEditForm.vue'
import type { PaginationCoures } from '@/core/models/pagination-params'
import AddStudent from './AddStudent.vue'
import ViewStudents from './ViewStudents.vue'
import {
  mdiCalendarRange,
  mdiOrderAlphabeticalAscending,
  mdiHumanMaleBoard,
  mdiOfficeBuildingMarker,
  mdiInformationSlabCircleOutline,
  mdiDeleteOutline
} from '@mdi/js'
import type { Hall, Teacher, Coures } from '@/core/models/Mainmodels'
import { getCouresesFromMang, getHalls, getTeacher } from '@/core/services/mainServices'
import type { Couress } from '../models/courses'

// const searchHall = ref<Hall>()

const searcher = ref()
type SRH = {
  Hall: { id: string }
  Teacher: { id: string }
  Coures: { id: string }
}
const search = ref<SRH>({
  Hall: {
    id: ''
  },
  Teacher: {
    id: ''
  },
  Coures: {
    id: ''
  }
})
const loading = ref(false)
const courses = ref<Couress[]>([])
const AllTeachers = ref<Teacher[]>()
const AllCoureses = ref<Coures[]>()
const AllHalls = ref<Hall[]>()
const studentPopUp = ref(false)
const showSearch = ref(false)
const formPopUP = ref(false)
const editPopUp = ref(false)
const confirmDelete = ref(false)
const viewStudents = ref(false)
const viewServ = ref(false)
const courseId = ref<string>('')
const courseIdDelete = ref<string>('')
const DeleteMsg = ref(false)
const totalCustomers = ref(0)
const coursesPrice = ref<number>(0)
const service = ref<string[]>()
const paginations = ref<PaginationCoures>({
  page: 1,
  size: 10,
  TeacherId: '',
  CouresID: '',
  HallID: '',
  startDate: '',
  endDate: ''
})
const headers: any = [
  { title: 'اسم الدورة', key: 'couresManagementName', align: 'start', sortable: false },
  { title: ' الأستاذ ', key: 'teacherManagementName', align: 'start' },
  { title: ' سعر  ', key: 'price', align: 'start' },
  { title: ' القاعة', key: 'hall_managementName', align: 'center' },
  { title: ' الخدمة', key: 'serviceManagementName', align: 'center' },
  { title: 'تاريخ البدء', key: 'startDate', align: 'center' },
  { title: 'تاريخ الانتهاء', key: 'endDate', align: 'center' },
  { title: ' الساعات ', key: 'numberOfRquiredHours', align: 'center' },
  { title: ' الطلاب المسجلين ', key: 'numberOfIndividuals', align: 'center' },
  { title: '   حجم القاعة', key: 'numberOfMaximumIndividuals', align: 'center' },
  { title: 'الأجرائات', key: 'actions', align: 'center' }
]

// const test = [
//   {
//     id: '001',
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },

//   {
//     id: '002',
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },
//   {
//     id: '003',
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },
//   {
//     id: '004',
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },
//   {
//     id: '005',
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },
//   {
//     id: '006',
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   },
//   {
//     id: '007',
//     couresManagementName: 'دورة طبخ ',
//     teacherManagementName: 'الشيف العالم',
//     hall_managementName: 'Top Chaf',
//     serviceManagementName: 'فطور + غذاء',
//     endDate: '3/3/2023',
//     fromTime: '11',
//     toTime: '2'
//   }
// ]

// const toggelStudent = () => {
//   formPopUP.value = !formPopUP.value
// }
const searchToggle = () => {
  showSearch.value = !showSearch.value
}
const toggelForm = () => {
  formPopUP.value = !formPopUP.value
}
const openViewServies = (services: string[]) => {
  toggelServies()
  service.value = services
}
const toggelEdit = () => {
  editPopUp.value = !editPopUp.value
}
const toggelServies = () => {
  viewServ.value = !viewServ.value
}
const toggelAddstudent = () => {
  studentPopUp.value = !studentPopUp.value
}

const OpenAddstudent = (item: Couress) => {
  toggelAddstudent()
  courseId.value = item.id
  coursesPrice.value = item.price
}
const OpenViewstudent = (item: Couress) => {
  viewStudents.value = true
  courseId.value = item.id
}
const openDeleteModal = (id: string) => {
  courseIdDelete.value = id
  confirmDelete.value = true

  console.log(confirmDelete.value)
}

const getALLdeta = () => {
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

const onDelete = () => {
  deleteCoures(courseIdDelete.value)
    .then(() => {
      confirmDelete.value = false
    })
    .finally(() => {
      DeleteMsg.value = true
      onOptionsChange({
        page: paginations.value.page,
        itemsPerPage: paginations.value.size
      })
    })
}
onMounted(async () => {
  onGetCourse(paginations.value)
  getALLdeta()
})
const onGetCourse = (paginations: PaginationCoures | any) => {
  loading.value = true
  getCourses(paginations)
    .then((response) => {
      totalCustomers.value = response.total
      courses.value = response.data
    })
    .finally(() => {
      loading.value = false
    })
}

const onOptionsChange = ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
  paginations.value = {
    page: page,
    size: itemsPerPage,
    TeacherId: '',
    endDate: '',
    HallID: '',
    CouresID: '',
    startDate: ''
  }
  onGetCourse(paginations.value)
}
const onSearchFilter = () => {
  if (search.value.Coures != null) {
    paginations.value.CouresID = search.value.Coures.id
  }
  if (search.value.Hall != null) {
    paginations.value.HallID = search.value.Hall.id
  }
  if (search.value.Teacher != null) {
    paginations.value.TeacherId = search.value.Teacher.id
  }

  onGetCourse(paginations.value)
}

const clearFilter = () => {
  search.value.Hall.id = ''
  search.value.Teacher.id = ''
  search.value.Coures.id = ''
  paginations.value.HallID = ''
  paginations.value.CouresID = ''
  paginations.value.endDate = ''
  paginations.value.startDate = ''
  paginations.value.TeacherId = ''
  onGetCourse(paginations.value)
}
</script>
