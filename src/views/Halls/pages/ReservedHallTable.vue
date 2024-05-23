<template>
  <div class="mx-auto mt-12 px-4 relative">
    <div class="flex justify-between items-center">
      <p class="text-2xl">حجوزات القاعات</p>
<RouterLink to="/hall-reserve">
      <v-btn
        class="mt-4 text-white"
        color="green-accent-4"
        rounded="lg"
        :prepend-icon="mdiPlus"
        
        >اضافة حجز
      </v-btn>
    </RouterLink>
    </div>
    <div class="flex justify-between items-center">
      <v-btn @click="searchToggle" size="large" variant="text" :prepend-icon="mdiFilter">
        <v-tooltip activator="parent" location="bottom">بحث</v-tooltip></v-btn
      >

      <div v-show="showSearch" class="flex flex-col w-1/2 right-20 absolute">
        <p class="w-3/4 text-gray-700 mx-auto pr-3">البحث</p>
        <v-text-field
          v-model="search"
          class="w-3/4 mx-auto"
          density="compact"
          placeholder="بحث اسم القاعة ..... "
          hide-details
        ></v-text-field>
      </div>
    </div>

    <td class="w-3/4 mx-auto flex justify-center items-center mb-2">
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
    </td>

    <v-data-table-server
      class="px-4"
      v-model:items-per-page="paginations.size"
      :page="paginations.page"
      :headers="headers"
      :items="halls"
      :items-length="totalHalls"
      :loading="isLoading"
      :search="search"
      item-value="name"
      @update:options="onOptionsChange"
    >
      <template #[`item.actions`]="{ item }">
        <v-btn
          variant="text"
          class="me-2"
          size="medium"
          @click="openEdit(item)"
          :append-icon="mdiPencil"
        >
          <v-tooltip activator="parent" location="bottom">تعديل</v-tooltip>
        </v-btn>

        <!-- :to="{ name: 'edit-hall', params: { id: item.id } }" -->

        <v-btn variant="text" size="medium" :append-icon="mdiDelete" @click="openDeleteModal(item)">
          <v-tooltip activator="parent" location="bottom">حذف</v-tooltip>
        </v-btn>
      </template>
      <template v-slot:[`item.vipId`]="{ value }">
        <p v-if="value == 2">VIP</p>
        <p v-else>عادي</p>
      </template>
      <template v-slot:[`item.hallTypeId`]="{ value }">
        <p v-if="value == 1">قاعة</p>
        <p v-else-if="value == 2">مكتب</p>
        <p v-else-if="value == 3">مكتبة</p>
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
          <v-btn
            class="mt-4 text-white"
            color="green-accent-4"
            rounded="lg"
            @click="confirmDelete = false"
            >إلغاء</v-btn
          >
          <v-btn
            class="mt-4 text-white"
            color="red-darken-2"
            rounded="lg"
            @click="deleteHallConfirm()"
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
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { mdiDelete, mdiPencil, mdiPlus, mdiFilter } from '@mdi/js'

import ReserveHall from './ReserveHall.vue';
// import editHall from '@/views/halls/pages/editHall.vue'
// import type { Hall } from '../models/hall'
// import { getHalls, deleteHall } from '../hall-service'
import type { PaginationParamas} from '@/core/models/pagination-params';

const headers: any = [
  { title: 'أسم القاعة', align: 'start', sortable: false, value: 'name' },
  { title: ' أسم الزبون', value: 'hourPrice', align: 'end' },
  { title: 'التاريخ من', value: 'hallTypeId', align: 'end' },
  { title: 'التاريخ إلي', value: 'vipId', align: 'end' },
  { title: 'التوقيت من', value: 'halfDayPrice', align: 'end' },
  { title: 'التوقيت إلي', value: 'weekPrice', align: 'end' },
  { title: 'نوع الحجز', value: 'monthPrice', align: 'end' },
  { title: 'نوع القاعة', value: 'monthPrice', align: 'end' },
  { title: ' طريقة الدفع', value: 'actions', align: 'end' },
  { title: '  الدفع', value: 'actions', align: 'end' },
  { title: 'السعر', value: 'actions', align: 'end' },
  { title: 'المدفوع', value: 'actions', align: 'end' },
]
const isLoading = ref(false)
const showEditMessage = ref(false)
const search = ref('')
const showSearch = ref(false)
// const halls = ref<Hall[]>([])
const totalHalls = ref(0)
const errorCheck = ref(false)
const confirmDelete = ref(false)
const showDeleteMessage = ref(false)
const HallDeleteId = ref<number>(0)
const popUp = ref(false)
const popUp2 = ref(false)
const idToEdit = ref(0)

const paginations = ref<PaginationParamas>({
  page: 1,
  size: 10,
  Name: ''
})

// const searchToggle = () => {
//   showSearch.value = !showSearch.value
// }

const toggelPopUp = () => {
  popUp.value = !popUp.value
}
// const EditMessage = () => {
//   showEditMessage.value = !showEditMessage.value
// }

// const openEdit = (item: Hall) => {
//   idToEdit.value = item.id
//   toggelPopUp2()
// }

// const toggelPopUp2 = () => {
//   popUp2.value = !popUp2.value

//   // console.log(idToEdit.value)
// }

// onMounted(async () => {
//   onGetHalls(paginations.value)
// })

// const onGetHalls = (paginations: PaginationParamas) => {
//   isLoading.value = true
//   getHalls(paginations)
//     .then((response) => {
//       totalHalls.value = response.total
//       halls.value = response.data
//       errorCheck.value = false
//     })
//     .catch(() => {
//       halls.value = []
//       errorCheck.value = true
//     })
//     .finally(() => {
//       isLoading.value = false
//     })
// }

const onOptionsChange = ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
  paginations.value = {
    page: page,
    size: itemsPerPage,
    Name: search.value
  }
  // onGetHalls(paginations.value)
  console.log('OnOptionsChange');
  
}

// const openDeleteModal = (item: Hall) => {
//   console.log('delete', item)
//   HallDeleteId.value = item.id

//   confirmDelete.value = true
// }

// const deleteHallConfirm = () => {
//   console.log('delete :', HallDeleteId.value)
//   deleteHall(HallDeleteId.value)
//     .then(() => {
//       showDeleteMessage.value = true
//     })
//     .finally(() => {
//       confirmDelete.value = false
//       onOptionsChange({
//         page: paginations.value.page,
//         itemsPerPage: paginations.value.size
//       })
//     })
// }
</script>
