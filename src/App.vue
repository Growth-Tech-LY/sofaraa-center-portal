<template>
  <RouterView />
  <SnackBar />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SnackBar from './core/components/SnackBar.vue'
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
