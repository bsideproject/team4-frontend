<template>
  <div class="pet-list section">
    <div class="pet-list-wrapper" v-if="props.petList.length">
      <div
        :class="['pet-list-wrapper__item', item.isMain ? 'active' : '']"
        v-for="(item, index) in props.petList"
        :key="index"
      >
        <p class="item__name">
          {{ item.name }}
        </p>
        <div
          class="item__photo"
          @click="router.push({ name: ROUTE.Pet.Profile, params: item.petId })"
        >
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