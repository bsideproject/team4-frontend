<template>
  <div :class="['tab-menu', getIsFixed ? 'fixed' : '']">
    <div class="wrapper">
      <router-link
        to="/"
        :class="['tab-menu__tab', tab === 'main' ? 'active' : '']"
        >체크리스트</router-link
      >
      <span class="tab-menu__split"></span>
      <router-link
        to="/nurture"
        :class="['tab-menu__tab', tab === 'nurture' ? 'active' : '']"
        >양육일지</router-link
      >
      <span class="tab-menu__split"></span>
      <a href="#" class="tab-menu__tab" @click="comingSoon">건강일지</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'

const route = useRoute()
const store = useStore()
const tab = ref('main')

const getIsFixed = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getIsFixed}`]
)

if (route.path === '/nurture') {
  tab.value = 'nurture'
}

const comingSoon = () => {
  alert('Coming Soon!')
}
</script>

<style lang="scss" scoped>
@import '@styles/main/tabMenu.scss';
</style>