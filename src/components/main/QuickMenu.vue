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
        @click="() => clickQuickRecordCount(item.quickId)"
      >
        <div class="item__count">
          <p class="item__count--current">{{ item.count }}</p>
          <p class="item__count--total">{{ item.total }}</p>
        </div>
        <p class="item__label">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { MODULE_NAME, TYPES } from '@store/checklist/quickRecordStore'

const store = useStore()

const getQuickRecordList = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getQuickRecordList}`]
)
onMounted(() => {
  store.dispatch(`${MODULE_NAME}/${TYPES.actQuickRecordList}`)
})

const clickQuickRecordCount = (quickId) => {
  store.dispatch(`${MODULE_NAME}/${TYPES.actCountQuickRecord}`, quickId)
}
</script>

<style lang="scss" scoped>
@import '@styles/main/quickMenu.scss';
</style>