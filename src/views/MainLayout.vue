<template>
  <NavBar />

  <div class="w-[90%] mx-auto border-none">
    <v-locale-provider rtl>
      <v-card>
        <v-layout>
          <v-navigation-drawer v-model="drawer" :rail="false" permanent @click="rail = false">
            <img width="120px" src="/src/assets/icons/sofaraaLogo.png" />
            <v-list-item
              prepend-avatar=""
              title="مركز سفراء العلم"
              class="font-extrabold text-4xl"
              nav
            >
              <template v-slot:append>
                <!-- <v-btn :icon="mdiChevronLeft" variant="text" @click.stop="rail = !rail"></v-btn> -->
              </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
              <RouterLink :to="{ name: 'reservations-list' }">
                <v-list-item
                  :prepend-icon="mdiHomeCityOutline"
                  title="إدارة حجوزات القاعات"
                  value="halls"
                ></v-list-item>
              </RouterLink>

              <RouterLink to="/courses">
                <v-list-item
                  :prepend-icon="mdiHumanMaleBoardPoll"
                  title="حجز دورة"
                  value="home"
                ></v-list-item>
              </RouterLink>
            </v-list>
          </v-navigation-drawer>

          <v-main>
            <main class="min-h-screen">
              <RouterView />
            </main>
          </v-main>
        </v-layout>
      </v-card>
    </v-locale-provider>
  </div>
  <div>
    <!-- <CalanderView/> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavBar from './NavBar.vue'
import CalanderView from './Halls/pages/CalanderView.vue';
import {
  mdiHumanMaleBoard,
  mdiRoomServiceOutline,
  mdiChevronLeft,
  mdiAccountGroupOutline,
  mdiAccountTie,
  mdiHomeCityOutline,
  mdiWalletGiftcard,
  mdiHumanMaleBoardPoll
} from '@mdi/js'

const user = ref()
const drawer = ref(true)
const rail = ref(true)
</script>
