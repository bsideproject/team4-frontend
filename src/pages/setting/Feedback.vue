<template>
  <section class="feedback">
    <article class="feedback__comment">
      <span>OO님, 펫하루 사용은 어떠하셨나요?</span>
      <img src="@images/png/feedback_illust.png" />
    </article>
    <article class="feedback__content">
      <textarea
        placeholder="펫하루를 사용하면서 불편한 점이 있으셨다면 자유롭게 의견을 보내주세요. :)"
      ></textarea>
    </article>
    <button class="btn-lg-disabled">보내기</button>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@styles/setting/feedback.scss';
</style>