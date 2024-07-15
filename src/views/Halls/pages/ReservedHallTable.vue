<template>
  <div class="mx-auto mt-12 px-4">
    <div class="flex justify-between items-center">
      <p class="text-2xl">إدارة حجوزات القاعات</p>
      <v-btn
   v-if="premissions.halls.add"
        :to="{ name: 'hall-reserve' }"
        class="mt-4 text-white"
        color="pink-darken-2"
        rounded="lg"
        :prepend-icon="mdiPlus"
        >اضافة حجز
      </v-btn>
    </div>
    <div class="flex justify-between items-center relative">
      <v-btn @click="searchToggle" size="large" variant="text" :prepend-icon="mdiFilter">
        <v-tooltip activator="parent" location="bottom">بحث</v-tooltip></v-btn
      >

      <!-- //filter div -->
      <div
      data-aos="zoom-in-up"
        v-if="showSearch"
        class="bg-white border-t-8 border-[#BF3B74] mx-auto p-7 rounded-lg shadow-lg w-3/4 z-50 left-40 top-64 fixed"
      >
        <p class="text-gray-700 mx-auto pr-3 mb-1">البحث</p>
        <div  class="bg-white grid grid-cols-3 gap-4 justify-center items-center">
          <div  class="flex gap-1 justify-center items-center">
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

    <v-data-table-server
      class="px-4"
      sticky
      :items-per-page="paginations.size"
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
        <div class="grid grid-cols-3 gap-1 justify-center items-center">
          <v-btn
            color="blue-darken-2"
            variant="text"
            class="mb-1"
            size="medium"
            :append-icon="mdiNote"
            @click="openDetials(item)"
          >
            <v-tooltip activator="parent" location="bottom">عرض التفاصيل</v-tooltip>
          </v-btn>
          <v-btn
            color="blue-grey"
            variant="text"
            size="medium"
            :append-icon="mdiPrinter"
            @click="openPrint(item)"
          >
            <v-tooltip activator="parent" location="bottom">إيصال قبض </v-tooltip>
          </v-btn>
          <RouterLink :to="{ name: 'edit-reserved', params: { id: item.id } }">
            <v-btn 
            v-if="premissions.halls.edit"
            variant="text" size="medium" color="yellow-darken-2" :append-icon="mdiPencil">
              <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
            </v-btn>
          </RouterLink>

          <v-btn
              v-if="premissions.halls.edit"
            variant="text"
            @click="openEditRestPrice(item)"
            size="medium"
            color="green-darken-2"
            :append-icon="mdiCash"
          >
            <v-tooltip activator="parent" location="bottom">تعديل المتبقي </v-tooltip>
          </v-btn>

          <v-btn
          v-if="premissions.halls.delete"
            variant="text"
            size="medium"
            color="red-darken-2"
            :append-icon="mdiDelete"
            @click="openDeleteModal(item)"
          >
            <v-tooltip activator="parent" location="bottom">حذف</v-tooltip>
          </v-btn>
        </div>
      </template>
      <template #[`item.reservationsTypeId`]="{ value }">
        <p v-if="value == 1">مبديء</p>
        <p v-else>نهائي</p>
      </template>
      <template #[`item.paymentMethodId`]="{ value }">
        <p v-if="value == 1">نقدا</p>
        <p v-else-if="value == 2">بطاقة مصرفية</p>
        <p v-else-if="value == 3">شيك</p>
      </template>
    </v-data-table-server>
  </div>

  <div
    @click.self="confirmDelete = false"
    v-show="confirmDelete"
    class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005] flex justify-center items-center"
  >
    <div data-aos="zoom-in">
      <v-card>
        <v-card-title class="text-h5">هل أنت متأكد من حذف الحجز؟ </v-card-title>
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
    <ReserveDetials :id="idToEdit" @closeIt="toggeDetials" />
  </div>

  <div
    data-aos="fade-left"
    v-if="popReceipt"
    @click.self="toggelReceipt"
    class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
  >
    <ReceiptView :id="idToPrint" @close="toggelReceipt" />
  </div>

  <div
    data-aos="fade-left"
    v-if="popRestPrice"
    @click.self="toggeRestPrice"
    class="fixed h-screen w-full top-0 left-0 bg-gray-500/50 z-[1005]"
  >
    <EditRestPrice
      :id="idToEdit"
      @close="toggeRestPrice"
      @refresh="
        onOptionsChange({
          page: paginations.page,
          itemsPerPage: paginations.size
        })
      "
      @editDone="EditMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import {
  mdiDelete,
  mdiPencil,
  mdiPlus,
  mdiFilter,
  mdiNote,
  mdiCalendarRange,
  mdiReceipt,
  mdiPrinter,
  mdiCash
} from '@mdi/js'
import ReceiptView from './ReceiptView.vue'
import ReserveHall from './ReserveHall.vue'
import EditRestPrice from './EditRestPrice.vue'
import type { Hall, Customer, Service } from '@/core/models/Mainmodels'
import { deleteResHall, getResHallTaple } from '../hallReserve-services'
import type { PaginationParamas } from '@/core/models/pagination-params'
import type { ReservationTable } from '@/views/Halls/models/reserveModels'
import ReserveDetials from './ReserveDetials.vue'
import { getHalls, getCustomers, getServices } from '@/core/services/mainServices'
import { premissions } from '@/core/stores/premissions'

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
const popRestPrice = ref(false)
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
  CustomerId: '',
  HallId: '',
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

const toggeRestPrice = () => {
  popRestPrice.value = !popRestPrice.value
}

const openDetials = (item: ReservationTable) => {
  idToEdit.value = item.id
  toggeDetials()
}

const openEditRestPrice = (item: ReservationTable) => {
  idToEdit.value = item.id
  toggeRestPrice()
}

const EditMessage = () => {
  showEditMessage.value = !showEditMessage.value
}

const receipt = ref<ReservationTable>()

const openPrint = (item: ReservationTable) => {
  idToPrint.value = item.id
  toggelReceipt()
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
  // Set size to a very large number if itemsPerPage is -1
  const size = itemsPerPage === -1 ? totalHalls.value : itemsPerPage;
  
  paginations.value = {
    page: page,
    size: size,
    HallId: '',
    CustomerId: '',
    startDate: '',
    endDate: '',
    phoneNumber: ''
  }
  onGetHallsRes(paginations.value)

}

const onSearchFilter = () => {
  if (searchHall.value?.id) {
    paginations.value.HallId = searchHall.value.id
  }
  if (searchCustomer.value?.id) {
    paginations.value.CustomerId = searchCustomer.value.id
  }
  onGetHallsRes(paginations.value)
}

const clearFilter = () => {
  searchHall.value = undefined
  searchCustomer.value = undefined
  paginations.value.HallId = ''
  paginations.value.CustomerId = ''
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
