<template>
  <section class="login">
    <article class="login__logo">
      <img src="@images/login/avatar.jpg" alt="" />
    </article>
    <article class="login__sns">
      <button class="kakao" @click="() => clickLogin('kakao')">
        카카오로 로그인하기
      </button>
      <button class="google" @click="() => clickLogin('google')">
        구글로 로그인하기
      </button>
    </article>
  </section>
</template>

<script>
export default {
  setup() {
    const clickLogin = (target) => {
      location.href = `${process.env.VUE_APP_API_URL}/oauth2/authorization/${target}`
    }

    return {
      clickLogin,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@styles/login/login.scss';
</style>
