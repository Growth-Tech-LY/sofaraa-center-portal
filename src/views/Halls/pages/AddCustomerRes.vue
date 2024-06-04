<template>
    <div
      class="mt-16 bg-white border-t-[20px] border-[#BF3B74] w-5/6 mx-auto p-7 rounded-lg shadow-lg"
    >
      <p class="pr-8 text-lg">إضافة زبون جديد</p>
      <div class="grid grid-cols-3 gap-4 mt-6">
        <v-text-field
          v-model="customerName"
          class="col-span-2"
          clearable
          label="اسم الزبون"
          variant="outlined"
          placeholder="ادخل إسم الزبون..."
        ></v-text-field
        ><v-text-field
          v-model="customerEmail"
          clearable
          label="بريد الإلكتروني"
          variant="outlined"
          placeholder="ادخل البريد الإلكتروني"
        ></v-text-field>
        <v-text-field
          v-model="PhoneNumber"
          clearable
          label="رقم الهاتف "
          variant="outlined"
        ></v-text-field>
  
        <div class="col-start-1">
          <v-btn
            :disabled="!customerName || !customerEmail || !PhoneNumber"
            size="large"
            class="p-4 mt-4 w-2/6 ml-3"
            color="pink-darken-1"
            @click="submitCustomer"
            >اضافة</v-btn
          >
          <v-btn size="large" class="p-4 mt-4 w-2/6" color="red" @click="closeModel">الغاء </v-btn>
        </div>
      </div>
      <v-snackbar v-model="showMessage" :timeout="2000" color="success" :location="'top left'">
        تمت الإضافة بنجاح
      </v-snackbar>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { postCustomer } from '../hallReserve-services';

  
  const customerName = ref('')
  const customerEmail = ref('')
  const PhoneNumber = ref('')
  
  const showMessage = ref(false)
  
  const emit = defineEmits<{
    close: []
    refresh: []
  }>()
  
  const closeModel = () => {
    emit('close')
  }
  
  const reload = () => {
    emit('refresh')
  }
  // watchEffect(() => {
  //   console.log(courseName.value)
  //   console.log(curriculum.value)
  //   console.log(totalHours.value)
  //   console.log(totalDays.value)
  //   console.log(subscriptionPrice.value)
  // })
  
  const submitCustomer = async () => {
    const body = {
      name: customerName.value,
      email: customerEmail.value,
      phoneNumber: PhoneNumber.value
    }
  
    postCustomer(body)
      .then(() => {
        showMessage.value = true
        console.log(body)
        // updateModel();
      })
      .catch((error: any) => {
        console.log(error)
      })
      .finally(() => {
        reload()
        customerName.value = ''
        customerEmail.value = ''
        PhoneNumber.value = '0'
      })
  }
  </script>
  