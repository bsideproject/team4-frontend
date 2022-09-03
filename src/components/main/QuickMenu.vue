<template>
  <div class="quick-menu">
    <div class="quick-menu-btn">
      <a href="/checklist/quick" class="quick-menu-btn--edit">편집</a>
    </div>
    <div class="quick-menu-group">
      <div class="quick-menu-group__item">
        <div class="item__count">
          <p class="item__count--current">10</p>
          <p class="item__count--total">11</p>
        </div>
        <p class="item__label">사료주기</p>
      </div>
      <div class="quick-menu-group__item">
        <div class="item__count">
          <p class="item__count--current">1</p>
          <p class="item__count--total">2</p>
        </div>
        <p class="item__label">간식주기</p>
      </div>
      <div class="quick-menu-group__item">
        <div class="item__count fulfilled">
          <p class="item__count--current">3</p>
          <p class="item__count--total">3</p>
        </div>
        <p class="item__label">산책하기</p>
      </div>
      <div class="quick-menu-group__item">
        <div class="item__count fulfilled">
          <p class="item__count--current">1</p>
          <p class="item__count--total">1</p>
        </div>
        <p class="item__label">양치하기</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import '@styles/main/quickMenu.scss';
</style>