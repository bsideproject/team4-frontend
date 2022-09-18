<template>
  <section class="anomalies">
    <article
      :class="['anomalies__accordion', isFold ? 'on' : '']"
      @click="clickAnomaliesTitle"
    >
      <span class="title">이상 징후</span>
    </article>
    <article class="anomalies__content" v-if="isFold">
      <div class="anomalies__initial">
        <div class="anomalies__initial-area">
          <button class="btn-md-enabled add" @click="clickAddBtn">
            등록하기 / 체크하기
          </button>
          <button class="btn-md-default noting" @click="clickNotingBtn">
            이상없음
          </button>
        </div>
      </div>
      <div class="anomalies__list">
        <!-- <div class="noting-strange">
          <p>멍멍이에게 이상 없어요</p>
        </div> -->
        <div class="list">
          <ul>
            <li class="item">설사를 해요.</li>
            <li class="item">공복토를 했어요.</li>
            <li class="item">눈물 자국이 많아요.</li>
          </ul>
        </div>
      </div>
      <button class="btn-md-enabled" @click="clickEditBtn">수정</button>
    </article>
  </section>
</template>

<script setup>
import ROUTE from '@/constants/route'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isFold = ref(true)
const router = useRouter()

const clickAnomaliesTitle = () => {
  isFold.value = !isFold.value
}
const clickAddBtn = () => {
  alert('등록')
}
const clickNotingBtn = () => {
  alert('이상없음')
}
const clickEditBtn = () => {
  router.push({ name: ROUTE.Nurture.Anomalies.Create })
}
</script>

<style lang="scss" scoped>
@import '@styles/nurture/anomalies.scss';
</style>