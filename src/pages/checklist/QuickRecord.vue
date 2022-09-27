<template>
  <section class="quick-record">
    <article class="quick-record__title">
      <p>퀵 기록이란?</p>
      <p>매일 반복되는 할 일을 빠르게 체크할 수 있어요.</p>
    </article>
    <article class="quick-record__list">
      <div
        class="quick-record__item"
        v-for="(item, index) in getQuickRecordList"
        :key="index"
      >
        <!-- <span class="quick-record__icon"></span> -->
        <div
          class="quick-record__content"
          @click="() => clickQuickRecordContent(item.quickId)"
        >
          <p class="font-bold">{{ item.name }}</p>
          <p class="font-primary">1일 {{ item.total }}번</p>
          <p>{{ item.explanation }}</p>
        </div>
      </div>
    </article>
    <quick-record-bottom-sheet ref="quickRecordBottomSheet" :detail="detail" />
  </section>
</template>

<script setup>
import QuickRecordBottomSheet from '@/components/checkList/QuickRecordBottomSheet.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_QUICK,
  TYPES as TY_QUICK,
} from '@/store/modules/checklist/quickRecordStore'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
import { dateToStringFormat } from '@/utils/common/index'

const store = useStore()
const quickRecordBottomSheet = ref(null)

const detail = ref({})

const getWeeklyCalendarDate = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getWeeklyCalendarDate}`]
)
const getQuickRecordList = computed(
  () => store.getters[`${MN_QUICK}/${TY_QUICK.getQuickRecordList}`]
)

onMounted(() => {
  fetchQuickRecordList(getWeeklyCalendarDate.value)
})
watch(
  () => getWeeklyCalendarDate.value,
  (newValue) => fetchQuickRecordList(newValue)
)
const fetchQuickRecordList = (date) => {
  store.dispatch(
    `${MN_QUICK}/${TY_QUICK.fetchQuickRecordList}`,
    dateToStringFormat(date, '-')
  )
}
const clickQuickRecordContent = (quickId) => {
  detail.value = getQuickRecordList.value.find((l) => l.quickId === quickId)
  quickRecordBottomSheet.value.openBottomSheet()
}
</script>

<style lang="scss" scoped>
@import '@styles/checklist/quickRecord.scss';
</style>