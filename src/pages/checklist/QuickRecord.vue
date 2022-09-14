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
        <span class="quick-record__icon"></span>
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
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { MODULE_NAME, TYPES } from '@/store/modules/checklist/quickRecordStore'

const store = useStore()
const quickRecordBottomSheet = ref(null)

const detail = ref({})

const getQuickRecordList = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getQuickRecordList}`]
)

onMounted(() => {
  store.dispatch(`${MODULE_NAME}/${TYPES.actQuickRecordList}`)
})

const clickQuickRecordContent = (quickId) => {
  detail.value = getQuickRecordList.value.find((l) => l.quickId === quickId)
  quickRecordBottomSheet.value.openBottomSheet()
}
</script>

<style lang="scss" scoped>
@import '@styles/checklist/quickRecord.scss';
</style>