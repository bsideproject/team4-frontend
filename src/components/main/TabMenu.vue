<template>
  <div class="tab-menu">
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tab = ref('main')
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