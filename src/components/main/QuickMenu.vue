<template>
  <div class="quickMenu">
    <div class="quickMenu-btn">
      <a href="/quickNote" class="quickMenu-btn--edit">편집</a>
    </div>
    <div class="quickMenu-group">
      <div class="quickMenu-group__item">
        <div class="item__count">
          <p class="item__count--current">10</p>
          <p class="item__count--total">11</p>
        </div>
        <p class="item__label">사료주기</p>
      </div>
      <div class="quickMenu-group__item">
        <div class="item__count">
          <p class="item__count--current">1</p>
          <p class="item__count--total">2</p>
        </div>
        <p class="item__label">간식주기</p>
      </div>
      <div class="quickMenu-group__item">
        <div class="item__count fulfilled">
          <p class="item__count--current">3</p>
          <p class="item__count--total">3</p>
        </div>
        <p class="item__label">산책하기</p>
      </div>
      <div class="quickMenu-group__item">
        <div class="item__count fulfilled">
          <p class="item__count--current">1</p>
          <p class="item__count--total">1</p>
        </div>
        <p class="item__label">양치하기</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@styles/main/quickMenu.scss';
</style>