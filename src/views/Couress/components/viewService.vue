<template>
  <div
    dir="ltr"
    class="mt-12 bg-white border-t-[20px] border-[#BF3B74] w-1/4 mx-auto py-16 px-16 rounded-lg shadow-lg h-2/4 overflow-y-scroll"
  >
    <p
      class="p-3 text-center bg-slate-100 drop-shadow-lg mb-3 text-slate-600 rounded-lg"
      v-for="s in serv"
      :key="s"
    >
      {{ s }}
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  serv: string[] | undefined
}>()

console.log(props.serv)
</script>

<style>
::-webkit-scrollbar {
  width: 12px;
  background-color: #f0f0f0; /* لون خلفية شريط التمرير */
  border-radius: 12px;
}

/* جزء "المسار" من الشريط */
::-webkit-scrollbar-track {
  background: #f0f0f0; /* اللون الرصاصي الباهت للخلفية */
  border-radius: 10px; /* جعل الحواف دائرية */
}

/* جزء "المقبض" من الشريط */
::-webkit-scrollbar-thumb {
  background-color: #bf3b74; /* اللون الرصاصي للمقبض */
  border-radius: 10px; /* جعل الحواف دائرية */
  border: 3px solid #f0f0f0; /* المسافة حول المقبض */
}
</style>
