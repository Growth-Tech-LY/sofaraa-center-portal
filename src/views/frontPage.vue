<template>
  <body>
    <!-- <div class="preloader loaded-success fixed inset-0 z-50 bg-gray-50">
	  <div class="absolute left-1/2 top-1/2 transform -translate-y-1/2">
	    <div class="relative mx-auto my-12">
	      <div class="inline-block">
	        <svg class="animate-spin h-8 w-8 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
	          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
	          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
	        </svg>
	      </div>
	    </div>
	  </div>
	</div> -->
    <main class="py-10">
      <div class="flex justify-center items-center w3/4 mx-auto bg-gray-100 px-4">
        <div>
          <p class="text-3xl bold">We are a Digital Agency serve Social Content</p>
          <p class="text-gray-500 text-lg">
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
        <p class="text-gray-500 text-xl">
          We are a Digital Agency serve Brand Identity| We would direct you to limitless ideas and
          move your brand into a global landscape.
        </p>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-8 w-3/4 mx-auto rounded-sm">
        <div
          data-aos="fade-left"
          class="flex flex-col justify-center items-center text-center bg-gray-100 py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/adLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-down"
          class="flex flex-col justify-center items-center text-center rounded-sm bg-gray-100 py-4 shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/messageLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-right"
          class="flex flex-col justify-center items-center text-center bg-gray-100 py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/messageLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-left"
          class="flex flex-col justify-center items-center text-center bg-gray-100 py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/teacherLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-up"
          class="flex flex-col justify-center items-center text-center bg-gray-100 py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
        >
          <img src="../../../../src/assets/icons/messageLogo.svg" alt="" />
          <h3 class="text-lg leading-normal mb-2 font-semibold text-black">SEO Services</h3>
          <p class="text-gray-500">
            This is a wider card with supporting text below as a natural content.
          </p>
        </div>

        <div
          data-aos="fade-right"
          class="flex flex-col justify-center items-center text-center bg-gray-100 py-4 rounded-sm shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-pink-300"
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
      <div class="bg-gray-100 my-8" data-aos="fade-up" data-aos-anchor-placement="center-center">
        <v-carousel height="600" show-arrows="hover" cycle hide-delimiter-background>
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-img :src="slide.src" height="100%" :alt="slide.alt">
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
        <div class="flex items-center justify-center gap-6 bg-gray-100">
          <img data-aos="fade-right" src="../../../../src/assets/images/partners2.PNG" />
          <img data-aos="fade-down" src="../../../../src/assets/images/partners3.PNG" />
          <img data-aos="fade-left" src="../../../../src/assets/images/partners4.PNG" />
        </div>
      </div>
    </main>
 <footer class="bg-pink-600">
<p>daskdlsadksadjlas</p>
<p>daskdlsadksadjlas</p>
<p>daskdlsadksadjlas</p>
<p>daskdlsadksadjlas</p>
 </footer>
  </body>
</template>

<script setup lang="ts">
const slides = [
  {
    src: '../../../../src/assets/images/1.PNG',
    alt: 'Image 1 description',
    caption: 'First Slide'
  },
  {
    src: '../../../../src/assets/images/2.PNG',
    alt: 'Image 2 description',
    caption: 'Second Slide'
  },
  {
    src: '../../../../src/assets/images/3.PNG',
    alt: 'Image 3 description',
    caption: 'Third Slide'
  },
  {
    src: '../../../../src/assets/images/4.PNG',
    alt: 'Image 4 description',
    caption: 'Fourth Slide'
  }
  // { src: '../../../../src/assets/images/1.PNG', alt: 'Image 5 description', caption: 'Fifth Slide' }
]
</script>
