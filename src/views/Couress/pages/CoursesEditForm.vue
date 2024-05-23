<template>
  <div
    class="mt-16 bg-white border-t-[20px] border-[#BF3B74] w-3/4 mx-auto py-16 px-16 rounded-lg shadow-lg"
  >
    <v-form class="grid grid-cols-4 gap-4 mt-8">
      <v-text-field
        class="w-5/6 col-span-2"
        clearable
        label="اسم دورة"
        variant="outlined"
        placeholder="ادخل إسم الباقة..."
      ></v-text-field>
      <v-autocomplete
        class="col-span-2"
        chips
        label="اسم القاعة"
        variant="outlined"
        placeholder="اسم القاعة "
        :items="['قاعة الخورزمي', 'معمل الحاسوب 1', 'معمل الحاسوب 2 (الكبير)']"
        item-title="lable"
        item-value="value"
        clearable
      ></v-autocomplete>
      <v-text-field
        class="col-span-2 col-start-1 w-5/6"
        clearable
        label="اسم الأستاذ"
        placeholder="ادخل سعر الساعة ..."
        variant="outlined"
      ></v-text-field>

      <v-text-field
        :prepend-icon="mdiTimerEditOutline"
        label="الساعة من"
        variant="outlined"
        placeholder="ادخل الساعة من ..."
        type="number"
      >
      </v-text-field>
      <v-text-field
        v-model="weekPrice"
        :prepend-icon="mdiTimerEditOutline"
        clearable
        label="الساعة الى"
        placeholder="ادخل الساعة الى ..."
        variant="outlined"
        prefix="د.ل"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="monthPrice"
        class="col-span-2 w-5/6"
        clearable
        label="سعر  الاسبوع"
        placeholder="ادخل سعر  الشهر ..."
        variant="outlined"
        prefix="د.ل"
        type="number"
      ></v-text-field>

      <v-text-field
        class="col-start-3"
        :prepend-icon="mdiCalendarRange"
        label="التاريخ من"
        variant="outlined"
        placeholder="ادخل التاريخ من ..."
        type="number"
      >
      </v-text-field>
      <v-text-field
        v-model="weekPrice"
        :prepend-icon="mdiCalendarRange"
        clearable
        label="التاريخ الى"
        placeholder="ادخل التاريخ الى ..."
        variant="outlined"
        type="date"
      ></v-text-field>
      <div class="pr-20 col-start-1">
        <v-btn
          size="large"
          class="p-4 mt-4 w-2/6 ml-3"
          color="green"
          type="submit"
          @click="submitPackage"
          :disabled="!form"
          >اضافة</v-btn
        >
        <v-btn size="large" class="p-4 mt-4 w-2/6" color="red" @click="closeModel">الغاء </v-btn>
      </div>
      <v-snackbar :timeout="2000" color="success" :location="'top left'">
        تمت الإضافة بنجاح
      </v-snackbar>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { mdiTimerEditOutline, mdiCalendarRange } from '@mdi/js'
</script>
