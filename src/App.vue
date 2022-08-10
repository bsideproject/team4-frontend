<template>
  <comp-header />
  <hr />
  <main>
    <router-view />
  </main>
  <hr />
  <comp-footer />
</template>

<script>
import CompHeader from '@/components/common/Header.vue'
import CompFooter from '@/components/common/Footer.vue'

export default {
  name: 'App',
  components: {
    CompHeader,
    CompFooter,
  },
}
</script>

<style lang="scss">
@import 'assets/styles/common.scss';
</style>
