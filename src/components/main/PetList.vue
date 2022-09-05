<template>
  <div class="pet-list section">
    <div class="pet-list-wrapper" v-if="props.petList.length">
      <div class="pet-list-wrapper__item active">
        <p class="item__name">멍멍이</p>
        <div
          class="item__photo"
          @click="router.push({ name: ROUTE.Pet.Profile })"
        >
          <img class="item__photo--round" src="@images/pet_02.jpeg" alt="" />
        </div>
      </div>
      <div class="pet-list-wrapper__item">
        <p class="item__name">까꿍이</p>
        <div class="item__photo">
          <img class="item__photo--round" src="@images/pet_02.jpeg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import ROUTE from '@constants/route.json'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import '@store/pet/petStore.js'
const props = defineProps({
  petList: {
    type: Array,
    required: false,
  },
})
const router = useRouter()
</script>

<style lang="scss" scoped>
@import '@styles/main/petList.scss';
</style>