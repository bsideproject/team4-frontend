<template>
  <div class="pet-list section">
    <div class="pet-list-wrapper" v-if="props.petList.length">
      <swiper
        :slides-per-view="4"
        :space-between="30"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(item, index) in props.petList" :key="index">
          <div :class="['pet-list-wrapper__item', item.isMain ? 'active' : '']">
            <p class="item__name">
              {{ item.name }}
            </p>
            <div
              class="item__photo"
              @click="
                router.push({ name: ROUTE.Pet.Profile, params: item.petId })
              "
            >
              <img
                class="item__photo--round"
                src="@images/pet_02.jpeg"
                alt=""
              />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>


<script setup>
import ROUTE from '@constants/route.json'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y])

const props = defineProps({
  petList: {
    type: Array,
    required: false,
  },
})
const router = useRouter()

const onSwiper = (swiper) => {
  // console.log(swiper)
}
const onSlideChange = () => {
  // console.log(2)
}
</script>

<style lang="scss" scoped>
@import '@styles/main/petList.scss';
</style>