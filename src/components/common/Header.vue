<template>
  <section
    v-if="getHeaderType !== 'login'"
    :class="['header', getHeaderType === 'main' && getIsFixed ? 'fixed' : '']"
  >
    <article
      :class="['header-wrapper', 'bg-primary', getIsFixed ? 'fixed' : '']"
      v-if="getHeaderType === 'main'"
    >
      <div class="fixed-logo" v-if="getIsFixed && getPetList.length">
        <img src="@images/icons/profile_xs_pet.svg" alt="" />
      </div>
      <div class="header-wrapper__logo" @click="clickMainHeaderLogo">
        <img src="@images/png/logo_white.png" alt="" />
      </div>
      <router-link to="/setting" class="header-wrapper__menu" />
    </article>

    <!-- <article
      class="header-wrapper bd-bottom"
      v-else-if="getHeaderType === 'login'"
    >
      <div class="header-wrapper__title">{{ getTitle }}</div>
    </article> -->

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
      <button
        class="header-wrapper__more"
        @click="clickMore"
        v-if="getMoreOptionList.length"
      ></button>
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
      <button
        class="header-wrapper__share"
        @click="clickShare"
        v-if="getUser.role === ROLE.MANAGER"
      ></button>
    </article>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
import {
  MODULE_NAME as MN_PET,
  TYPES as TY_PET,
} from '@/store/modules/pet/petStore'
import {
  MODULE_NAME as MN_USER,
  TYPES as TY_USER,
} from '@/store/modules/user/userStore'
import ROUTE from '@/constants/route'
import ROLE from '@/constants/role'

const store = useStore()
const router = useRouter()
const optionBottomSheet = ref(null)
const getTitle = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getTitle}`]
)
const getHeaderType = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getHeaderType}`]
)
const getMoreOptionList = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getMoreOptionList}`]
)
const getIsFixed = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getIsFixed}`]
)
const getPetList = computed(
  () => store.getters[`${MN_PET}/${TY_PET.getPetList}`]
)
const getUser = computed(() => store.getters[`${MN_USER}/${TY_USER.getUser}`])

const goBack = () => {
  router.back()
}
const clickMore = () => {
  optionBottomSheet?.value?.openBottomSheet()
}
const clickShare = () => {
  router.push({ name: ROUTE.Pet.Share })
}
const clickMainHeaderLogo = () => {
  location.reload()
}

document.addEventListener('scroll', function () {
  let fixedScrollY = 80
  let unFixedScrollY = 10

  if (getPetList.value?.length) {
    fixedScrollY = 100
    unFixedScrollY = 100
  }

  if (window.scrollY > fixedScrollY && !getIsFixed.value) {
    store.commit(`${MN_HEADER}/${TY_HEADER.setIsFixed}`, true)
  } else if (window.scrollY <= unFixedScrollY && getIsFixed.value) {
    store.commit(`${MN_HEADER}/${TY_HEADER.setIsFixed}`, false)
  }
})
</script>

<style lang="scss" scoped>
@import '@styles/common/header.scss';
</style>