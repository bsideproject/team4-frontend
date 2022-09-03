<template>
  <div class="tab-menu">
    <div class="wrapper">
      <router-link to="/" class="tab-menu__tab active">체크리스트</router-link>
      <span class="tab-menu__split"></span>
      <a href="#" class="tab-menu__tab" @click="comingSoon">양육일지</a>
      <span class="tab-menu__split"></span>
      <a href="#" class="tab-menu__tab" @click="comingSoon">건강일지</a>
    </div>
  </div>
</template>

<script setup>
const comingSoon = () => {
  alert('Coming Soon!')
}
</script>

<style lang="scss" scoped>
@import '@styles/main/tabMenu.scss';
</style>