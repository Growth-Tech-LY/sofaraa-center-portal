<template>
  <div
    class="mt-16 bg-white border-t-[20px] border-[#BF3B74] w-5/6 mx-auto p-7 rounded-lg shadow-lg"
  >
  <p class="pr-4 font-bold text-lg mb-2">تفاصيل الخدمات</p>
    <div v-for="(item, i) in services" :key="i">
      <div>
      <p class="text-lg pr-8 mb-2">{{ item.name  }} :</p>
<div class="bg-gray-100 border border-white p-2 mb-2">
  <p>الوصف :</p>
  <p >{{ item.descreption }}</p>
</div>
    </div>
    </div>
    <div class="w-32">
      <v-btn size="large" class="p-4 mt-4 w-2/6" color="red" @click="closeModel">الغاء </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '@/core/models/Mainmodels'
import { getServices } from '@/core/services/mainServices'
import { onMounted, ref, computed } from 'vue'

const services = ref<Service[]>([])

const emit = defineEmits<{
  close: []
  refresh: []
}>()

const closeModel = () => {
  emit('close')
}

onMounted(() => {
  getServices().then((response) => {
    services.value = response
  })
})


</script>
