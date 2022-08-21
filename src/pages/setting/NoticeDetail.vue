<template>
  <section class="notice-detail">
    <article class="notice-detail__header">
      <div>
        <div class="notice-detail__title">공지사항 제목</div>
        <div class="notice-detail__date">2022.08.31</div>
      </div>
    </article>
    <article class="notice-detail__content">
      <div>내용입니다.</div>
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
