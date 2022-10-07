<template>
  <section class="one-line-diary">
    <article
      :class="['one-line-diary__accordion', isFold ? 'on' : '']"
      @click="clickAnomaliesTitle"
    >
      <span class="title">한 줄 일기</span>
    </article>
    <article class="one-line-diary__content" v-if="isFold">
      <div class="one-line-diary__initial" v-if="!getIsWriteDiaryToday">
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
        <div :class="['top-area', item.deleted ? 'unknown' : '']">
          <div class="profile-image">
            <img src="@images/icons/profile_big_default.svg" />
          </div>
          <div class="info">
            <p class="info-writer">
              {{ item.deleted ? '알 수 없음' : item.userName }}
            </p>
            <p class="info-date">{{ item.lastModifiedAt }}</p>
          </div>
          <div class="btn" v-if="getUser.userId === item.userId">
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
    </article>
  </section>
</template>

<script setup>
import ROUTE from '@/constants/route'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
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
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
import {
  MODULE_NAME as MN_USER,
  TYPES as TY_USER,
} from '@/store/modules/user/userStore'
import { dateToStringFormat, _confirm } from '@/utils/common'

const instance = getCurrentInstance()
const isFold = ref(false)
const router = useRouter()
const store = useStore()

const getMainPetId = computed(
  () => store.getters[`${MN_PET}/${TY_PET.getMainPetId}`]
)
const getOneLineDiaryList = computed(
  () => store.getters[`${MN_DIARY}/${TY_DIARY.getOneLineDiaryList}`]
)
const getWeeklyCalendarDate = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getWeeklyCalendarDate}`]
)
const getUser = computed(() => store.getters[`${MN_USER}/${TY_USER.getUser}`])
const getIsWriteDiaryToday = computed(() =>
  getOneLineDiaryList.value.some((d) => d.userId === getUser.value.userId)
)

onMounted(() => {
  store.dispatch(`${MN_USER}/${TY_USER.fetchGetUser}`).then(() => {
    store.dispatch(`${MN_PET}/${TY_PET.fetchPetList}`).then(() => {
      store.dispatch(`${MN_DIARY}/${TY_DIARY.getOneLineDiaryList}`, {
        petId: getMainPetId.value,
        date: dateToStringFormat(getWeeklyCalendarDate.value, '-'),
      })
    })
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
  _confirm(instance, {
    text: '작성하신 한 줄 일기를 삭제하시겠습니까?',
    ok: {
      label: '네',
      callback: () => {
        store
          .dispatch(`${MN_DIARY}/${TY_DIARY.fetchDeleteOneLineDiary}`, {
            petId: getMainPetId.value,
            diaryId,
          })
          .then(() => {
            store.dispatch(`${MN_DIARY}/${TY_DIARY.getOneLineDiaryList}`, {
              petId: getMainPetId.value,
              date: dateToStringFormat(getWeeklyCalendarDate.value, '-'),
            })
          })
      },
    },
    cancel: {
      label: '아니오',
    },
    style: {
      height: 100,
    },
  })
}
</script>

<style lang="scss" scoped>
@import '@styles/nurture/oneLineDiary.scss';
</style>