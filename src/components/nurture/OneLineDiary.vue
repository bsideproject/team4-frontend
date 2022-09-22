<template>
  <section class="one-line-diary">
    <article
      :class="['one-line-diary__accordion', isFold ? 'on' : '']"
      @click="clickAnomaliesTitle"
    >
      <span class="title">한 줄 일기</span>
    </article>
    <article class="one-line-diary__content" v-if="isFold">
      <div class="one-line-diary__initial">
        <div class="one-line-diary__initial-area">
          <button class="btn-md-enabled write" @click="clickWriteOneLineDiary">
            오늘의 한 줄 일기 쓰러 가기
          </button>
        </div>
      </div>
      <div class="one-line-diary__list">
        <div class="top-area">
          <div class="profile-image">
            <img src="@images/icons/profile_big_default.svg" />
          </div>
          <div class="info">
            <p class="info-writer">엄마</p>
            <p class="info-date">7/29 09:40</p>
          </div>
        </div>
        <div class="content-area">
          <p>동생이 쓴 한 줄 일기 내용입니다.</p>
        </div>
      </div>
      <div class="one-line-diary__list">
        <div class="top-area unknown">
          <div class="profile-image">
            <img src="@images/icons/profile_big_default.svg" />
          </div>
          <div class="info">
            <p class="info-writer">알 수 없음</p>
            <p class="info-date">7/29 09:40</p>
          </div>
        </div>
        <div class="content-area">
          <p>엄마가 쓴 한 줄 일기 내용입니다.</p>
        </div>
      </div>
      <div class="one-line-diary__list">
        <div class="top-area">
          <div class="profile-image">
            <img src="@images/icons/profile_big_default.svg" />
          </div>
          <div class="info">
            <p class="info-writer">나</p>
            <p class="info-date">7/29 09:40</p>
          </div>
          <div class="btn">
            <button
              class="btn-md-default btn-edit"
              @click="clickEditOneLineDiary"
            >
              수정
            </button>
            <button
              class="btn-md-default btn-delete"
              @click="clickDeleteOneLineDiary"
            >
              삭제
            </button>
          </div>
        </div>
        <div class="content-area">
          <p>
            오늘 멍멍이랑 산책하다가 옆동네 길냥이를 발견했다. 호기심 많은
            멍멍이는 냅다 길냥이한테 다가갔다. 당연히 냥냥펀치를 맞았다. 그 후
            만난 길냥이들한테는 달려들지 않고 기가 팍 죽은 채로 조용히 갈 길
            가는 게 웃겼다ㅋㅋ 백사십자 분량은 딱 이정도다.
          </p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import ROUTE from '@/constants/route'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isFold = ref(false)
const router = useRouter()

const clickAnomaliesTitle = () => {
  isFold.value = !isFold.value
}
const clickWriteOneLineDiary = () => {
  router.push({ name: ROUTE.Nurture.OneLineDiary.Create })
}
const clickEditOneLineDiary = () => {
  alert('한 줄 일기 수정')
}
const clickDeleteOneLineDiary = () => {
  alert('한 줄 일기 삭제')
}
</script>

<style lang="scss" scoped>
@import '@styles/nurture/oneLineDiary.scss';
</style>