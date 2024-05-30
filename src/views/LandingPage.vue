<template>
  <nav>
    <div class="w-36 pt-4 pl-10">
    <v-btn
      rounded="lg"
      color="pink-darken-3"
      elevation="20"
      
      block
      @click="toLoginPage"
      >تسجيل الدخول</v-btn
    >
  </div>
  </nav>
  <body dir="rtl" class="p-4 relative">
    <v-b></v-b>

    <main class="py-10">
      <div
        class="flex justify-center items-center w3/4 mx-auto bg-sofaraa-slide bg-custom-image bg-cover bg-center h-96 w-full bg-fixed p-4"
      >
        <div>
          <p class="text-3xl bold">We are a Digital Agency serve Social Content</p>
          <p class="text-white text-lg">
            We are a Digital Agency serve Brand Identity| We would direct you to limitless ideas and
            move your brand into a global landscape.
          </p>
          <div class="flex items-center justify-center mt-4 gap-2">
            <v-btn color="pink-lighten-1 "><a href="#">اي حاجة</a></v-btn>
            <v-btn color="pink-lighten-1">خدماتنا</v-btn>
          </div>
        </div>
        <div class="w-1/2">
          <img src="../../src/assets/icons/sofaraaLogo.png" alt="" />
        </div>
      </div>
      <div class="text-center mt-8">
        <p class="text-3xl bold" data-aos="fade-up" data-aos-duration="1000">What We Do</p>
        <p class="text-pink-400 text-4xl pb-8">__________________</p>
        <p class="text-gray-500 text-xl mb-4">
          We are a Digital Agency serve Brand Identity| We would direct you to limitless ideas and
          move your brand into a global landscape.
        </p>
      </div>

      <div
        class="justify-center items-center border bg-sofaraa-Hall bg-cover bg-center bg-fixed p-2 h-[40rem]"
      >
        <!-- <div class="h-auto w-full">
          <img src="../assets/images/develop.PNG" />
        </div> -->
      </div>

      <div class="grid grid-cols-3 gap-4 mt-8 w-3/4 mx-auto rounded-sm">
        <div
          data-aos="fade-left"
          class="flex flex-col justify-center items-center text-center py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/adLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-down"
          class="flex flex-col justify-center items-center text-center rounded-sm py-4 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/messageLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-right"
          class="flex flex-col justify-center items-center text-center py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/messageLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-left"
          class="flex flex-col justify-center items-center text-center py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/teacherLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-up"
          class="flex flex-col justify-center items-center text-center py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/messageLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-right"
          class="flex flex-col justify-center items-center text-center py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/messageLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>
      </div>

      <div class="text-center my-8">
        <p class="text-3xl bold" data-aos="fade-up" data-aos-duration="1000">Our work</p>
        <p class="text-pink-400 text-4xl pb-8">__________________</p>
        <p class="text-gray-500 text-xl">
          We create engaging experiences that are innovatingand beautiful.
        </p>
      </div>
      <!-- //phto gallery -->
      <div class="bg-gray-50 my-8" data-aos="fade-up" data-aos-anchor-placement="center-center">
        <v-carousel height="700" show-arrows="hover" cycle hide-delimiter-background>
          <v-carousel-item v-for="(goals, i) in slides" :key="i">
            <v-img :src="goals.src" height="100%" :alt="goals.alt">
              <!-- <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide.caption }}</div>
          </v-row> -->
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div>
        <div class="text-center my-8">
          <p class="text-3xl bold" data-aos="fade-up" data-aos-duration="1000">Partners</p>
          <p class="text-pink-400 text-4xl pb-8">__________________</p>
        </div>
        <div class="flex items-center justify-center gap-6 bg-gray-50">
          <img
            class="w-40 h-50"
            data-aos="fade-right"
            src="../../../../src/assets/images/partners2.PNG"
          />
          <img
            class="w-40 h-50"
            data-aos="fade-down"
            src="../../../../src/assets/images/partners3.PNG"
          />
          <img
            class="w-40 h-50"
            data-aos="fade-left"
            src="../../../../src/assets/images/partners4.PNG"
          />
        </div>
      </div>
    </main>
    <footer class="bg-gray-50 pb-10">
      <div class="flex justify-between px-4 pt-4">
        <div class="text-center flex flex-col justify-start items-start">
          <p class="text-pink-600 bold text-2xl">Contact us</p>

          <div class="flex justify-center items-center gap-4">
            <img src="../../../../src/assets/icons/location.svg" alt="" />
            <p>حي الأندلس / طرابلس</p>
          </div>

          <div class="flex justify-center items-center gap-4">
            <img src="../../../../src/assets/icons/email.svg" alt="" />
            <p>Info@sofaraa-alelm.ly</p>
          </div>
          <div class="flex justify-center items-center gap-4">
            <img src="../../../../src/assets/icons/phone.svg" alt="" />
            <p>218920920071+</p>
          </div>
        </div>

        <div class="text-center">
          <p class="text-pink-600 bold text-2xl">Contact us</p>
          <p>Hai Alandalus Libyan/Tripoli</p>
          <p>Info@sofaraa-alelm.ly</p>
          <p>+218920920071</p>
        </div>
        <div class="text-center">
          <p class="text-pink-600 bold text-2xl">Contact us</p>
          <p>Hai Alandalus Libyan/Tripoli</p>
          <p>Info@sofaraa-alelm.ly</p>
          <p>218920920071+</p>
        </div>
      </div>
    </footer>
    <div class="bold text-2xl text-center bg-gray-50">
      <p>Copyright © 2021 Design by sofaraa-alelm</p>
    </div>
  </body>
</template>

<script setup lang="ts">
import router from '@/router'

const slides = [
  {
    src: '../../../../src/assets/images/slide1.jpg',
    alt: 'Image 1 description',
    caption: 'First Slide'
  },
  {
    src: '../../../../src/assets/images/slide2.jpg',
    alt: 'Image 2 description',
    caption: 'Second Slide'
  },
  {
    src: '../../../../src/assets/images/slide3.jpg',
    alt: 'Image 3 description',
    caption: 'Third Slide'
  },
  {
    src: '../../../../src/assets/images/slide4.jpg',
    alt: 'Image 4 description',
    caption: 'Fourth Slide'
  }
]

const toLoginPage = () => {
  router.replace('/login')
}

// { src: '../../../../src/assets/images/1.PNG', alt: 'Image 5 description', caption: 'Fifth Slide' }
</script>
