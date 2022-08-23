<template>
  <section class="notice-list">
    <article>
      <div class="notice-list__item">
        <div class="notice-list__title">
          <router-link to="/setting/notice/detail/1">공지사항 제목</router-link>
        </div>
        <span class="notice-list__date">0000.00.00</span>
      </div>
      <div class="notice-list__item">
        <div class="notice-list__title">
          <router-link to="/setting/notice/detail/2">공지사항 제목</router-link>
        </div>
        <span class="notice-list__date">0000.00.00</span>
      </div>
    </article>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@styles/setting/noticeList.scss';
</style>