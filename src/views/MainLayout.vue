<template>
  <NavBar />

  <div class="w-[90%] mx-auto border-none">
    <v-locale-provider rtl>
      <v-card>
        <v-layout>
          <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
            <!-- <img width="120px" src="/src/assets/icons/sofaraaLogo.png" /> -->
            <v-list-item
              prepend-avatar=""
              title="مركز سفراء العلم"
              class="font-extrabold text-4xl"
              nav
            >
              <template v-slot:append>
                <v-btn :icon="mdiChevronLeft" variant="text" @click.stop="rail = !rail"></v-btn>
              </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
              <RouterLink :to="{ name: 'reservations-list'}">
                <v-list-item
                  :prepend-icon="mdiHomeCityOutline"
                  title="حجوزات القاعات "
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

              <!-- <RouterLink to="/hall-list">
                <v-list-item :prepend-icon="mdiAccountTie" title="test" value="Staff"></v-list-item>
              </RouterLink>
              
              <RouterLink to="/hall-list">
                <v-list-item
                  :prepend-icon="mdiHumanMaleBoard"
                  title="test"
                  value="teachers"
                ></v-list-item>
              </RouterLink>

              <RouterLink to="/hall-list">
                <v-list-item
                  :prepend-icon="mdiAccountGroupOutline"
                  title="test"
                  value="students "
                ></v-list-item>
              </RouterLink>
              <v-list-item
                :prepend-icon="mdiAccountGroupOutline"
                title="test"
                value="customers"
              ></v-list-item>
              <RouterLink to="/hall-list">
                <v-list-item
                  :prepend-icon="mdiWalletGiftcard"
                  title="test"
                  value="packages"
                ></v-list-item>
              </RouterLink> -->
              <!-- <v-list-item
                :prepend-icon="mdiRoomServiceOutline"
                title="test"
                value="services"
              ></v-list-item> -->
              <!-- <v-btn @click="LogOutbtn">
                  <v-list-item
                    :prepend-icon="mdiLogout"
                    title="LogOut"
                    color="red"
                    value="logout"
                    variant="text"
                  ></v-list-item>
                </v-btn> -->
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavBar from './NavBar.vue'

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
