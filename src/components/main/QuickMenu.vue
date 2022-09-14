<template>
  <div class="quick-menu">
    <div class="quick-menu-btn">
      <a href="/checklist/quick" class="quick-menu-btn--edit">편집</a>
    </div>
    <div class="quick-menu-group">
      <div
        class="quick-menu-group__item"
        v-for="(item, index) in getQuickRecordList"
        :key="index"
      >
        <div
          :class="['item__count', isDisabled(item.quickId) ? 'disabled' : '']"
          @click="() => clickQuickRecordCount(item.quickId)"
        >
          <p class="item__count--current">{{ item.count }}</p>
          <p class="item__count--total">{{ item.total }}</p>
        </div>
        <p class="item__label">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
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
const getWeeklyCalendarDate = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getWeeklyCalendarDate}`]
)
const getQuickRecordList = computed(
  () => store.getters[`${MN_QUICK}/${TY_QUICK.getQuickRecordList}`]
)
onMounted(() => {
  actQuickRecordList(getWeeklyCalendarDate.value)
})

watch(
  () => getWeeklyCalendarDate.value,
  (newValue) => actQuickRecordList(newValue)
)
const actQuickRecordList = (date) => {
  store.dispatch(
    `${MN_QUICK}/${TY_QUICK.actQuickRecordList}`,
    dateToStringFormat(date, '.')
  )
}
const clickQuickRecordCount = (quickId) => {
  if (isDisabled(quickId)) {
    return false
  }
  store.dispatch(`${MN_QUICK}/${TY_QUICK.actCountQuickRecord}`, quickId)
}
const isDisabled = (quickId) => {
  const { total, count } = getQuickRecordList.value.find(
    (q) => q.quickId === quickId
  )
  return total === count
}
</script>

<style lang="scss" scoped>
@import '@styles/main/quickMenu.scss';
</style>