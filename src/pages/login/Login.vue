<template>
  <div class="login">
    <h3>카카오로 로그인하기</h3>
    <h3>구글로 로그인하기</h3>
  </div>
</template>

<script>
import { login } from '@/api/login/login.js'
// import { ref } from '@vue/reactivity'

export default {
  setup() {
    // const info = ref({id: 'test', password: 'qwer1234'})

    const clickKakaoLogin = () => {
      login({id: 'test', password: 'qwer1234'})
    }

    return {
      clickKakaoLogin,
      // info
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/login/login.scss';
</style>
