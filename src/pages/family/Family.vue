<template>
  <section class="family">
    <article class="family__list" v-if="getFamilyList.length">
      <div v-for="(item, index) in getFamilyList" :key="index">
        <img src="@images/icons/profile.svg" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </article>
    <article class="family__empty" v-else>
      <div class="family__empty_title">
        <span>아직 구성원이 없어요! :()</span>
        <span>초대해볼까요?</span>
      </div>
      <div class="family__empty_image">
        <img src="@images/png/group_illust.png" alt="" />
      </div>
    </article>
    <div class="family__invite">
      <button>초대하기</button>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { MODULE_NAME, TYPES } from '@store/family/familyStore.js'
import { useStore } from 'vuex'

const store = useStore()
const getFamilyList = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getFamilyList}`]
)

onMounted(() => {
  store.dispatch(`${MODULE_NAME}/${TYPES.selectFamilyList}`)
})
</script>

<style lang="scss" scoped>
@import '@styles/family/family.scss';
</style>