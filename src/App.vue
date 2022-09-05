<template>
  <comp-header />
  <main ref="main">
    <router-view />
  </main>
  <comp-footer />
</template>

<script>
import CompHeader from '@/components/common/Header.vue'
import CompFooter from '@/components/common/Footer.vue'

export default {
  components: {
    CompHeader,
    CompFooter,
  },
}
</script>

<style lang="scss">
@import 'assets/styles/common.scss';
</style>
