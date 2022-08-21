<template>
  <div class="tabMenu">
    <div class="wrapper">
      <router-link to="/" class="tabMenu__tab active">
        <span>체크리스트</span>
      </router-link>
      <button class="tabMenu__tab" @click="comingSoon">양육일지</button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    function comingSoon() {
      alert('양육일지 Coming Soon!')
    }
    return {
      comingSoon,
    }
  }
}
</script>

<style scoped>

</style>