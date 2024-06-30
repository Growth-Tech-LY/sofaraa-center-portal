<template>
  <v-snackbar
    class="text"
    v-model="alertStore.open"
    :timeout="2000"
    :color="alertStore.color"
    :location="'top right'"
  >
    {{ alertStore.msg }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { alertStore } from '../stores/alert.store'
</script>
