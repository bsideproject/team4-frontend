<template>
  <div :class="['pet-list', getIsFixed ? 'fixed' : '']">
    <div class="pet-list-wrapper" v-if="props.petList.length">
      <swiper
        :slides-per-view="4"
        :space-between="10"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(item, index) in props.petList" :key="index">
          <div class="pet-list-wrapper__item">
            <div class="name-area">
              <span v-if="item.isMain">
                <img src="@images/star.png" />
              </span>
              <span class="item__name">
                {{ item.name }}
              </span>
            </div>
            <div
              class="item__photo"
              @click="
                router.push({ name: ROUTE.Pet.Profile, params: item.petId })
              "
            >
              <img
                class="item__photo--round"
                src="@images/icons/profile_s_pet.svg"
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
import ROUTE from '@/constants/route'
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
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
const store = useStore()

const getIsFixed = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getIsFixed}`]
)

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