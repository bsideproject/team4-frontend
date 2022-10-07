<template>
  <section class="notice-detail">
    <article class="notice-detail__header">
      <div>
        <div class="notice-detail__title">펫하루 출시!</div>
        <div class="notice-detail__date">2022.10.8</div>
      </div>
    </article>
    <article class="notice-detail__content">
      <div>
        펫하루가 10월 8월에 출시 됩니다.<br />
        많은 기대 부탁드립니다!
      </div>
    </article>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.params.no)
</script>

<style lang="scss" scoped>
@import '@styles/setting/noticeDetalil.scss';
</style>
