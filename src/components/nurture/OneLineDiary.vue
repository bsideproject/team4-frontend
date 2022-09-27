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
      <div
        class="one-line-diary__list"
        v-for="(item, index) in getOneLineDiaryList"
        :key="index"
      >
        <div class="top-area">
          <div class="profile-image">
            <img src="@images/icons/profile_big_default.svg" />
          </div>
          <div class="info">
            <p class="info-writer">{{ item.writer }}</p>
            <p class="info-date">{{ item.lastModifiedAt }}</p>
          </div>
          <div class="btn">
            <button
              class="btn-md-default btn-edit"
              @click="() => clickEditOneLineDiary(item.diaryId)"
            >
              수정
            </button>
            <button
              class="btn-md-default btn-delete"
              @click="() => clickDeleteOneLineDiary(item.diaryId)"
            >
              삭제
            </button>
          </div>
        </div>
        <div class="content-area">
          <p>{{ item.contents }}</p>
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
    </article>
  </section>
</template>

<script setup>
import ROUTE from '@/constants/route'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_DIARY,
  TYPES as TY_DIARY,
} from '@/store/modules/nurture/oneLineDiaryStore'
import {
  MODULE_NAME as MN_PET,
  TYPES as TY_PET,
} from '@/store/modules/pet/petStore'
const isFold = ref(false)
const router = useRouter()
const store = useStore()

const getMainPetId = computed(
  () => store.getters[`${MN_PET}/${TY_PET.getMainPetId}`]
)

const getOneLineDiaryList = computed(
  () => store.getters[`${MN_DIARY}/${TY_DIARY.getOneLineDiaryList}`]
)

onMounted(() => {
  store.dispatch(`${MN_PET}/${TY_PET.fetchPetList}`).then(() => {
    store.dispatch(
      `${MN_DIARY}/${TY_DIARY.getOneLineDiaryList}`,
      getMainPetId.value
    )
  })
})

const clickAnomaliesTitle = () => {
  isFold.value = !isFold.value
}
const clickWriteOneLineDiary = () => {
  router.push({ name: ROUTE.Nurture.OneLineDiary.Create })
}
const clickEditOneLineDiary = (diaryId) => {
  router.push({ name: ROUTE.Nurture.OneLineDiary.Modify, params: { diaryId } })
}
const clickDeleteOneLineDiary = (diaryId) => {
  store
    .dispatch(`${MN_DIARY}/${TY_DIARY.fetchDeleteOneLineDiary}`, {
      petId: getMainPetId.value,
      diaryId,
    })
    .then(() => {
      store.dispatch(
        `${MN_DIARY}/${TY_DIARY.getOneLineDiaryList}`,
        getMainPetId.value
      )
    })
}
</script>

<style lang="scss" scoped>
@import '@styles/nurture/oneLineDiary.scss';
</style>