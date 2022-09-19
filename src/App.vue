<template>
  <comp-header />
  <main ref="main">
    <router-view />
  </main>
  <comp-footer />
</template>

<script setup>
// import { defineComponent } from 'vue'
import CompHeader from '@/components/common/Header.vue'
import CompFooter from '@/components/common/Footer.vue'

// export default defineComponent({
//   name: 'App',
//   components: {
//     CompHeader,
//     CompFooter,
//   },
// })
</script>

<style lang="scss">
@import 'assets/styles/common.scss';
</style>
