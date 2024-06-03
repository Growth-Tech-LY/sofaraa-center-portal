<template>
  <div
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-4/5 mx-auto py-16 px-16 rounded-lg shadow-lg"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const couresIdEdit = ref('')
const props = defineProps<{
  couresID: string
}>()

couresIdEdit.value = props.couresID
onMounted(() => {
  console.log(couresIdEdit.value)
})
</script>
