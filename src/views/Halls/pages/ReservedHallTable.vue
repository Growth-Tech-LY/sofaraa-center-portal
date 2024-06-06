<template>
  <div class="mx-auto mt-12 px-4">
    <div class="flex justify-between items-center">
      <p class="text-2xl">حجوزات القاعات</p>

      <RouterLink :to="{ name: 'hall-reserve' }">
        <v-btn class="mt-4 text-white" color="pink-darken-2" rounded="lg" :prepend-icon="mdiPlus"
          >اضافة حجز
        </v-btn>
      </RouterLink>
    </div>
    <div class="flex justify-between items-center relative">
      <v-btn @click="searchToggle" size="large" variant="text" :prepend-icon="mdiFilter">
        <v-tooltip activator="parent" location="bottom">بحث</v-tooltip></v-btn
      >

      <!-- //filter div -->
      <div
        v-show="showSearch"
        class="bg-white border-t-8 border-[#BF3B74] mx-auto p-7 rounded-lg shadow-lg w-3/4 z-50 left-40 top-64 fixed"
      >
        <p class="text-gray-700 mx-auto pr-3 mb-1">البحث</p>
        <div class="bg-white grid grid-cols-3 gap-4 justify-center items-center">
          <div class="flex gap-1 justify-center items-center">
            <v-autocomplete
              transition="slide-y-transition"
              v-model="searchHall"
              :items="hallData"
              label="إسم القاعة"
              item-title="name"
              item-value="value"
              placeholder="إسم القاعة"
              variant="outlined"
              :return-object="true"
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

          <div class="flex gap-1 justify-center items-center">
            <v-autocomplete
              v-model="searchCustomer"
              transition="slide-y-transition"
              :items="customerData"
              label="إسم الزبون"
              item-title="name"
              item-value="id"
              placeholder="إسم الزبون"
              variant="outlined"
              :return-object="true"
            ></v-autocomplete>
          </div>

          <div class="flex gap-1 justify-center items-center">
            <v-text-field
              v-model="paginations.phoneNumber"
              label="رقم الزبون"
              item-title="label"
              item-value="value"
              placeholder="رقم الزبون"
              variant="outlined"
            ></v-text-field>
          </div>
        </div>
        <v-btn size="large" class="mx-3" color="red" @click="searchToggle"> إغلاق </v-btn>
        <v-btn size="large" class="mx-3" color="pink-darken-2" @click="onSearchFilter"> بحث </v-btn>
        <v-btn size="large" class="mx-3" color="pink-darken-1" @click="clearFilter">
          تصفيت فلتر
        </v-btn>

        <!-- //filter div Ends-->
      </div>
    </div>

    <!-- <td class="w-3/4 mx-auto flex justify-center items-center mb-2">
      <div
        v-show="popUp"
        @click.self="toggelPopUp"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <ReserveHall
          @refresh="
            onOptionsChange({
              page: paginations.page,
              itemsPerPage: paginations.size
            })
          "
          @close="toggelPopUp"
        />
      </div>
      <div
        v-if="popUp2"
        @click.self="toggelPopUp2"
        class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
      >
        <editHall
          @editDone="EditMessage"
          @refresh="
            onOptionsChange({
              page: paginations.page,
              itemsPerPage: paginations.size
            })
          "
          @closeIt="toggelPopUp2"
          :id="idToEdit"
        />
      </div>
    </td> -->

    <v-data-table-server
      class="px-4"
      v-model:items-per-page="paginations.size"
      :page="paginations.page"
      :headers="headers"
      :items="hallsRes"
      :items-length="totalHalls"
      :loading="isLoading"
      :search="search"
      item-value="name"
      @update:options="onOptionsChange"
    >
      <template #[`item.actions`]="{ item }">
        <v-btn
          color="blue-darken-2"
          variant="text"
          size="medium"
          class="me-2"
          :append-icon="mdiNote"
          @click="openDetials(item)"
        >
          <v-tooltip activator="parent" location="bottom">عرض التفاصيل</v-tooltip>
        </v-btn>
        <v-btn
          color="green-darken-2"
          variant="text"
          size="medium"
          class="me-2"
          :append-icon="mdiPrinter"
          @click="openPrint(item)"
        >
          <v-tooltip activator="parent" location="bottom">إيصال قبض </v-tooltip>
        </v-btn>
        <RouterLink :to="{ name: 'edit-reserved', params: { id: item.id } }">
          <v-btn
            variant="text"
            class="me-2"
            size="medium"
            color="yellow-darken-2"
            :append-icon="mdiPencil"
          >
            <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
          </v-btn>
        </RouterLink>

        <v-btn
          variant="text"
          size="medium"
          color="red-darken-2"
          :append-icon="mdiDelete"
          @click="openDeleteModal(item)"
        >
          <v-tooltip activator="parent" location="bottom">حذف</v-tooltip>
        </v-btn>
      </template>
      <template v-slot:[`item.reservationsTypeId`]="{ value }">
        <p v-if="value == 1">مبديء</p>
        <p v-else>نهائي</p>
      </template>
      <template v-slot:[`item.paymentMethodId`]="{ value }">
        <p v-if="value == 1">نقدا</p>
        <p v-else-if="value == 2">شيك</p>
        <p v-else-if="value == 3">بطاقة مصرفية</p>
      </template>
    </v-data-table-server>
  </div>

  <div
    @click.self="confirmDelete = false"
    v-show="confirmDelete"
    class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005] flex justify-center items-center"
  >
    <div>
      <v-card>
        <v-card-title class="text-h5">هل أنت متأكد من حذف القاعة؟ </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mt-4" color="blue-darken-1" rounded="lg" @click="confirmDelete = false"
            >إلغاء</v-btn
          >
          <v-btn class="mt-4" color="pink-darken-1" rounded="lg" @click="deleteHallConfirm()"
            >نعم</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </div>
  <div>
    <v-snackbar
      v-model="showDeleteMessage"
      :timeout="2000"
      color="red-darken-4"
      :location="'top left'"
    >
      تم الحذف بنجاح
    </v-snackbar>
  </div>
  <div>
    <v-snackbar v-model="showEditMessage" :timeout="2000" color="success" :location="'top left'">
      تم التعديل بنجاح
    </v-snackbar>
  </div>
  <div
    data-aos="fade-left"
    v-if="popDetials"
    @click.self="toggeDetials"
    class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
  >
    <ReserveDetials :id="idToPrint" @closeIt="toggeDetials" />
  </div>

  <div
    data-aos="fade-left"
    v-if="popReceipt"
    @click.self="toggelReceipt"
    class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
  >
    <ReceiptView :id="idToPrint" @close="toggelReceipt" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { mdiDelete, mdiPencil, mdiPlus, mdiFilter, mdiNote, mdiCalendarRange , mdiReceipt ,mdiPrinter } from '@mdi/js'
import ReceiptView from './ReceiptView.vue'
import ReserveHall from './ReserveHall.vue'
import type { Hall, Customer, Service } from '@/core/models/Mainmodels'
import { deleteResHall, getResHallTaple } from '../hallReserve-services'
import type { PaginationParamas } from '@/core/models/pagination-params'
import type { ReservationTable } from '@/views/Halls/models/reserveModels'
import ReserveDetials from './ReserveDetials.vue'
import { getHalls, getCustomers, getServices } from '@/core/services/mainServices'

const headers: any = [
  { title: 'أسم القاعة', align: 'start', sortable: false, value: 'hall_ManagementName' },
  { title: ' أسم الزبون', value: 'customerManegentName', align: 'end' },
  { title: 'التاريخ من', value: 'startDate', align: 'end' },
  { title: 'التاريخ إلي', value: 'endDate', align: 'end' },
  { title: 'التوقيت من', value: 'fromTime', align: 'end' },
  { title: 'التوقيت إلي', value: 'toTime', align: 'end' },
  { title: 'نوع الحجز', value: 'reservationsTypeId', align: 'end' },
  { title: 'نوع الباقة', value: 'packageType', align: 'end' },
  { title: ' طريقة الدفع', value: 'paymentMethodId', align: 'end' },
  { title: 'المدفوع', value: 'payedPrice', align: 'end' },
  { title: 'الباقي', value: 'restPrice', align: 'end' },
  { title: 'الإجراءات', value: 'actions', align: 'end' }
]
const isLoading = ref(false)
const showEditMessage = ref(false)
const search = ref('')
const showSearch = ref(false)
const hallsRes = ref<ReservationTable[]>([])
const totalHalls = ref(0)
const errorCheck = ref(false)
const confirmDelete = ref(false)
const showDeleteMessage = ref(false)
const HallDeleteId = ref<string>('')
const popDetials = ref(false)
const idToEdit = ref('')
const idToPrint = ref('')

//filterParams

const searchHall = ref<Hall>()
const searchCustomer = ref<Customer>()
const SearchStartDate = ref('')
const SearchEndDate = ref('')
const phoneNumber = ref('')

//------------------------

const hallName = ref<Hall>()

const hallData = ref<Hall[]>([])
const customerData = ref<Customer[]>([])
const ServicesData = ref<Service[]>([])
const popReceipt = ref(false)

const paginations = ref<PaginationParamas>({
  page: 1,
  size: 10,
  customerName: '',
  Hallname: '',
  startDate: '',
  endDate: '',
  phoneNumber: ''
})

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

const packageType = [
  {
    label: 'ساعة',
    value: 'ساعة'
  },
  {
    label: 'نصف يوم',
    value: 'نصف يوم'
  },
  {
    label: 'أسبوع',
    value: 'أسبوع'
  },
  {
    label: 'شهر',
    value: 'أسبوع'
  }
] as const

const searchToggle = () => {
  showSearch.value = !showSearch.value
}

const toggelReceipt = () => {
  popReceipt.value = !popReceipt.value
}

const toggeDetials = () => {
  popDetials.value = !popDetials.value
}



const openDetials = (item: ReservationTable) => {
  idToEdit.value = item.id
  toggeDetials()
  console.log('this is :  ', idToEdit.value)
}

const receipt = ref<ReservationTable>()

const openPrint = (item: ReservationTable) => {
  idToPrint.value = item.id
  toggelReceipt()
  console.log('this is :  ', idToEdit.value)
}



onMounted(async () => {
  onGetHallsRes(paginations.value)
})

const onGetHallsRes = (paginations: PaginationParamas) => {
  isLoading.value = true
  getResHallTaple(paginations)
    .then((response) => {
      totalHalls.value = response.total
      hallsRes.value = response.data
      errorCheck.value = false
      getHalls().then((response) => {
        hallData.value = response
      })

      getCustomers().then((response) => {
        customerData.value = response
      })

      getServices()
    })
    .catch(() => {
      hallsRes.value = []
      errorCheck.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}

const onOptionsChange = ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
  paginations.value = {
    page: page,
    size: itemsPerPage,
    Hallname: '',
    customerName: '',
    startDate: '',
    endDate: '',
    phoneNumber: ''
  }
  onGetHallsRes(paginations.value)
  console.log('OnOptionsChange')
}

const onSearchFilter = () => {
  if (searchHall.value?.id) {
    paginations.value.Hallname = searchHall.value.id
  }
  if (searchCustomer.value?.id) {
    paginations.value.customerName = searchCustomer.value.id
  }
  onGetHallsRes(paginations.value)
}

const clearFilter = () => {
  searchHall.value = undefined
  searchCustomer.value = undefined
  paginations.value.Hallname = ''
  paginations.value.customerName = ''
  paginations.value.endDate = ''
  paginations.value.startDate = ''
  paginations.value.phoneNumber = ''
  onGetHallsRes(paginations.value)
}

const openDeleteModal = (item: ReservationTable) => {
  console.log('delete', item)
  HallDeleteId.value = item.id
  console.log(HallDeleteId.value)

  confirmDelete.value = true
}

const deleteHallConfirm = () => {
  console.log('delete :', HallDeleteId.value)
  deleteResHall(HallDeleteId.value)
    .then(() => {
      showDeleteMessage.value = true
    })
    .finally(() => {
      confirmDelete.value = false
      onOptionsChange({
        page: paginations.value.page,
        itemsPerPage: paginations.value.size
      })
    })
}
</script>
