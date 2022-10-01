<template>
  <section class="bottom-sheet" v-if="isOpen">
    <article class="bottom-sheet__dimmed" @click="clickDimmed"></article>
    <article class="bottom-sheet__content">
      <div class="bottom-sheet__empty-pet">
        <div class="empty-pet-illust">
          <img src="@assets/images/png/petadd_illust.png" alt="" />
        </div>
        <p class="empty__txt">등록된 펫이 없습니다. <br />펫을 등록해주세요!</p>
        <button
          class="empty__btn btn-lg-enabled"
          @click="$router.push({ name: ROUTE.Pet.Create })"
        >
          등록
        </button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { useRouter } from 'vue-router'
import ROUTE from '@/constants/route'

const router = useRouter()
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

const clickRegisterSchedule = () => {
  router.push({ name: ROUTE.Checklist.Schedule })
  closeBottomSheet()
}

const clickRegisterTodo = () => {
  router.push({ name: ROUTE.Checklist.CreateTodo })
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