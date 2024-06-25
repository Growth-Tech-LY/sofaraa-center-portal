<template>
  <div class="flex items-center justify-between w-[60%] md:w-[80%]  mx-auto mt-2 mb-6 px-8 lg:px-0 ">
    <div>
      <v-btn
        class="mt-4 text-white mr-5"
        color="pink-accent-4"
        rounded="lg"
        :prepend-icon="mdiLogoutVariant"
        @click="LogOutbtn"
        variant="elevated"
      >
        تسجيل الخروج
      </v-btn>
    </div>
    <div>  
      <img class="mx-auto" width="300" src="../assets/icons/sofaraaLogo2.png" alt="">
    </div>
    <div class="lg:mr-14">
      <v-btn
        :to="{ name: 'calander' }"
        class="mt-4 text-white mr-5"
        color="blue-accent-4"
        rounded="lg"
        :prepend-icon="mdiCalendarClockOutline"
        variant="elevated"
      >
        رجوع لجدول الحجوزات
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">

import { mdiLogoutVariant, mdiCalendarClockOutline } from '@mdi/js'
import router from '@/router'



const LogOutbtn = () => {
  localStorage.removeItem('token')
  router.replace('/login')
}


</script>
