<template>
  <section class="bottom-sheet" v-if="isOpen">
    <article class="bottom-sheet__dimmed" @click="clickDimmed"></article>
    <article class="bottom-sheet__content">
      <div class="bottom-sheet__floating">
        <h3>체크리스트</h3>
        <div class="icon-area">
          <!-- <div>
            <a src="#" @click="clickRegisterSchedule"
              ><img src="@images/icons/calendar.svg" alt=""
            /></a>
            <p>일정 등록</p>
          </div> -->
          <div>
            <a src="#" @click="clickRegisterTodo"
              ><img src="@images/icons/todo.svg" alt=""
            /></a>
            <p>할일 등록</p>
          </div>
        </div>
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