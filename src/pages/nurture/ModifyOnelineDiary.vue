<template>
  <section class="one-line-diary">
    <article class="one-line-diary__comment">
      <span>하루에 1개의 일기만 쓸 수 있어요!</span>
    </article>
    <article class="one-line-diary__content">
      <textarea v-model="content"></textarea>
      <div class="text-count">
        <span class="fc-primary">{{ textCount }}</span>
        <span> / 140자</span>
      </div>
    </article>
    <button
      :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
      @click="clickWriteComplete"
    >
      작성완료
    </button>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const content = ref('')
const textCount = ref(0)
const isOnEdit = ref(false)

watch(
  () => content.value,
  (newValue) => {
    textCount.value = newValue.length

    if (newValue) {
      isOnEdit.value = true
    } else {
      isOnEdit.value = false
    }
  }
)

const clickWriteComplete = () => {
  if (!isOnEdit.value) {
    return false
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/nurture/createOneLineDiary.scss';
</style>