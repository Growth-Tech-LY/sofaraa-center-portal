<template>
  <!-- component -->
  <div class="flex h-screen overflow-hidden">
    <!-- Left Pane -->
    <div class="hidden lg:flex items-center justify-center flex-1 bg-white text-black shadow-2xl">
      <!-- <div class="max-w-md text-center"> -->
      <!--   <<[      big pic here !!        ]>> -->
      <div class=""><img src="../assets/LoginPic.jpg" class="bg-contain" alt="" /></div>
      <!-- </div> -->
    </div>
    <!-- Right Pane -->
    <div class="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
      <div class="max-w-md w-full p-6">
        <img src="../assets/icons/sofaraaLogo.png" class="h-40 mx-auto" alt="" />
        <h1 class="text-3xl font-semibold mb-6 text-gray-600 text-center">تسجيل الدخول</h1>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          تسجيل الدخول لمنظومة الحجزوات للمركز
        </h1>
        <div class="mt-4 flex flex-col lg:flex-row items-center justify-between"></div>

        <form action="#" method="POST" class="space-y-4">
          <!-- Your form elements go here -->
          <div>
            <label for="username" dir="rtl" class="block text-xs font-medium text-gray-400 mb-2"
              >إسم المستخدم</label
            >

            <v-text-field
              :append-inner-icon="mdiAccountCircle"
              label="اسم المستخدم"
              variant="solo-filled"
              :loading="isLoading"
              id="username"
              v-model="UserData.Name"
              :rules="[rules.required]"
            ></v-text-field>
          </div>

          <div>
            <label for="password" dir="rtl" class="block text-xs font-medium text-gray-400 mb-2"
              >رمز الدخول
            </label>
            <v-text-field
              :append-inner-icon="mdiKey"
              label="رمز الدخول "
              type="password"
              v-model="UserData.password"
              variant="solo-filled"
              id="password"
              :rules="[rules.required]"
              :loading="isLoading"
            ></v-text-field>
          </div>
          <div>
            <v-btn
              :disabled="!UserData.Name || !UserData.password"
              rounded="lg"
              color="pink-darken-3"
              elevation="20"
              class=""
              size="x-large"
              block
              @click="LoginBtn"
              :loading="isLoading"
              >تسجيل الدخول</v-btn
            >
          </div>
        </form>
        <div class="mt-4 text-sm text-gray-600 text-center">
          <!-- <p>
            Already have an account? <a href="#" class="text-black hover:underline">Login here</a>
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/axios'

import { mdiAccountCircle, mdiKey } from '@mdi/js'
const router = useRouter()
const isLoading = ref(false)
type user = {
  Name: string
  password: string
}
const UserData = ref<user>({
  Name: '',
  password: ''
})

const rules = {
  required: (v: string) => !!v || 'الحقل اجباري'
}
const LoginBtn = async () => {
  isLoading.value = true

  const response = await apiClient.post('Auth/Login', {
    userName: UserData.value.Name,
    password: UserData.value.password
  })
  // console.log(response.data)
  console.log(response.data.token)
  localStorage.setItem('token', response.data.token)
  isLoading.value = false
  router.replace('/')
}
watchEffect(() => {
  console.log(UserData.value.Name)
  console.log(UserData.value.password)
})
</script>
