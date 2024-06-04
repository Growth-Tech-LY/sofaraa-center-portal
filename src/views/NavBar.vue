<template>
  <div class="flex items-center justify-between w-[90%] mx-auto mt-2 mb-6">
    <div>
      <v-btn
        class="mt-4 text-white"
        color="red-darken-1"
        rounded="lg"
        :prepend-icon="mdiLogoutVariant"
        @click="LogOutbtn"
        variant="plain"
        >تسجيل الخروج</v-btn
      >
    </div>
    <div>
      <h1 class="text-4xl font-bold text-gray-500 pr-20">
        <v-img class="mx-auto" width="350" src="/src/assets/icons/sofaraaLogo2 .png"></v-img>

      </h1>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { mdiLogoutVariant } from '@mdi/js'
import router from '@/router'

const LogOutbtn = () => {
  localStorage.removeItem('token')
  router.replace('/login')
}
</script>
