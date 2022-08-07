<template>
  <div class="Login">
    <button @click="clickKakaoLogin">카카오로 로그인하기</button>
    <h3>구글 로그인하기</h3>
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

<style>

</style>