<template>
  <section class="setting-main">
    <article class="setting-main__profile">
      <div class="setting-main__profile_image">
        <img
          :src="
            getUser.userImageUr ||
            require('@images/icons/profile_big_default.svg')
          "
          alt=""
        />
        <span class="setting-main__profile_name">{{ getUser.name }}</span>
      </div>
    </article>

    <article class="setting-main__info">
      <div>
        <div class="setting-main__info_icon">
          <router-link to="/setting/profile">
            <img src="@images/icons/profile_mini.svg" />
          </router-link>
        </div>
        <div class="setting-main__info_name">
          <span>내 정보</span>
        </div>
      </div>
      <div>
        <div class="setting-main__info_icon">
          <router-link to="/pet/profile">
            <img src="@images/icons/footprint_check.svg" />
          </router-link>
        </div>
        <div class="setting-main__info_name">
          <span>펫 정보</span>
        </div>
      </div>
      <div>
        <div class="setting-main__info_icon">
          <router-link to="/group">
            <img src="@images/icons/share_group.svg" />
          </router-link>
        </div>
        <div class="setting-main__info_name">
          <span>그룹 정보</span>
        </div>
      </div>
    </article>

    <article class="setting-main__menu">
      <div>
        <router-link to="/setting/notice">공지사항</router-link>
      </div>
      <div>
        <router-link to="/setting/licence">라이선스</router-link>
      </div>
      <div>
        <router-link to="/setting/feedback">피드백</router-link>
      </div>
      <div class="none-border">
        <a href="#" @click="clickLogout">로그아웃</a>
      </div>
      <div class="none-border">
        <router-link to="/setting/withdraw">회원탈퇴</router-link>
      </div>
    </article>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/login/index'
import { useStore } from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import { MODULE_NAME, TYPES } from '@/store/modules/user/userStore'
import ROUTE from '@/constants/route'

const store = useStore()
const router = useRouter()

const onError = (e) => {
  console.log(e)
  e.target.src = require('@images/icons/profile_big_default.svg')
}

const clickLogout = () => {
  removeToken()
  router.replace({ name: ROUTE.Login })
}

const getUser = computed(() => store.getters[`${MODULE_NAME}/${TYPES.getUser}`])

onMounted(() => {
  store.dispatch(`${MODULE_NAME}/${TYPES.fetchGetUser}`)
})
</script>

<style lang="scss" scoped>
@import '@styles/setting/settingMain.scss';
</style>
