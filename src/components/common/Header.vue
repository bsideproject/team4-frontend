<template>
  <section class="header">
    <article class="header-wrapper bg-primary" v-if="getHeaderType === 'main'">
      <div class="header-wrapper__logo">
        <img src="@images/png/logo_white.png" alt="" />
      </div>
      <router-link to="/setting" class="header-wrapper__menu" />
    </article>

    <article
      class="header-wrapper bd-bottom"
      v-else-if="getHeaderType === 'check'"
    >
      <a @click="goBack" class="header-wrapper__back"></a>
      <div class="header-wrapper__title">{{ getTitle }}</div>
      <button class="header-wrapper__check"></button>
    </article>

    <article
      class="header-wrapper bd-bottom"
      v-else-if="getHeaderType === 'more'"
    >
      <a @click="goBack" class="header-wrapper__back"></a>
      <div class="header-wrapper__title">{{ getTitle }}</div>
      <button class="header-wrapper__more" @click="clickMore"></button>
      <bottom-sheet ref="optionBottomSheet" :option-list="getMoreOptionList" />
    </article>

    <article
      class="header-wrapper bd-bottom"
      v-else-if="getHeaderType === 'none'"
    >
      <a @click="goBack" class="header-wrapper__back"></a>
      <div class="header-wrapper__title">{{ getTitle }}</div>
    </article>

    <article
      class="header-wrapper bd-bottom"
      v-else-if="getHeaderType === 'share'"
    >
      <a @click="goBack" class="header-wrapper__back"></a>
      <div class="header-wrapper__title">{{ getTitle }}</div>
      <button class="header-wrapper__share" @click="clickShare"></button>
    </article>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { MODULE_NAME, TYPES } from '@store/common/headerStore.js'

const store = useStore()
const router = useRouter()
const optionBottomSheet = ref(null)

const getTitle = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getTitle}`]
)
const getHeaderType = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getHeaderType}`]
)
const getMoreOptionList = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getMoreOptionList}`]
)

const goBack = () => {
  router.back()
}
const clickMore = () => {
  optionBottomSheet.value.openBottomSheet()
}
const clickShare = () => {
  router.push({ name: ROUTE.Pet.Share })
}
</script>

<style lang="scss" scoped>
@import '@styles/common/header.scss';
</style>