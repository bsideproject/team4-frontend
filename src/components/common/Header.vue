<template>
  <section class="header">
    <article class="header-wrapper bg-primary" v-if="getHeaderType === 'main'">
      <div class="header-wrapper__logo">
        <img src="@images/png/logo_white.png" alt="" />
      </div>
      <router-link to="/setting" class="header-wrapper__menu" />
    </article>

    <article class="header-wrapper" v-else-if="getHeaderType === 'check'">
      <a @click="goBack" class="header-wrapper__back"></a>
      <div class="header-wrapper__title">{{ getTitle }}</div>
      <button class="header-wrapper__check"></button>
    </article>

    <article class="header-wrapper" v-else-if="getHeaderType === 'more'">
      <a @click="goBack" class="header-wrapper__back"></a>
      <div class="header-wrapper__title">{{ getTitle }}</div>
      <button class="header-wrapper__more"></button>
    </article>

    <article class="header-wrapper" v-else-if="getHeaderType === 'none'">
      <a @click="goBack" class="header-wrapper__back"></a>
      <div class="header-wrapper__title">{{ getTitle }}</div>
    </article>
  </section>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { MODULE_NAME, TYPES } from '@store/common/headerStore.js'

const store = useStore()
const router = useRouter()

const getTitle = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getTitle}`]
)
const getHeaderType = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getHeaderType}`]
)
const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import '@styles/common/header.scss';
</style>