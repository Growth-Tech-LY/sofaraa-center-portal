<template>
  <RouterView />
  <SnackBar />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SnackBar from './core/components/SnackBar.vue'
</script>
