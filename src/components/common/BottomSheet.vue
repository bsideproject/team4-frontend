<template>
  <section class="bottom-sheet" v-if="isOpen">
    <article class="bottom-sheet__dimmed" @click="clickDimmed"></article>
    <article class="bottom-sheet__content">
      <div
        class="bottom-sheet__common"
        v-for="(item, index) in props.optionList"
        :key="index"
      >
        <span @click="() => clickItem(item.callback)">{{ item.title }}</span>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'
const props = defineProps({
  optionList: Array,
})
const isOpen = ref(false)

const clickDimmed = () => {
  closeBottomSheet()
}
const openBottomSheet = () => {
  document.body.style.overflowY = 'hidden'
  isOpen.value = true
}
const closeBottomSheet = () => {
  document.body.style.overflowY = 'scroll'
  isOpen.value = false
}
const clickItem = (callback) => {
  callback()
  closeBottomSheet()
}
defineExpose({
  openBottomSheet,
  closeBottomSheet,
})
</script>

<style lang="scss" scoped>
@import '@styles/common/bottomSheet.scss';
</style>