<template>
  <div class="tabMenu">
    <div class="wrapper">
      <router-link to="/" class="tabMenu__tab active">
        <span>체크리스트</span>
      </router-link>
      <button class="tabMenu__tab" @click="comingSoon">양육일지</button>
      <button class="tabMenu__tab" @click="comingSoon">건강일지</button>
    </div>
  </div>
</template>

<script setup>
const comingSoon = () => {
  alert('Coming Soon!')
}
</script>

<style scoped>
</style>