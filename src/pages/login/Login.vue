<template>
  <section class="login">
    <article class="login__logo">
      <img src="@images/png/logo_black.png" alt="" />
    </article>
    <article class="login__sns">
      <button class="kakao" @click="() => clickLogin('kakao')">
        카카오 계정으로 로그인
      </button>
      <button class="google" @click="() => clickLogin('google')">
        구글 계정으로 로그인
      </button>
    </article>
    <article class="login__terms">
      <div>
        <p class="terms__notice">
          회원가입 하는 경우
          <a
            href="https://fuzzy-scarer-071.notion.site/b9ece4c53a84451fa92fb3776baba1f6"
            >서비스 이용약관</a
          >과<br />
          <a
            href="https://fuzzy-scarer-071.notion.site/6e25778fac994bf49d41e3bbda89a0d3"
            >개인정보처리방침</a
          >에 동의하는 것으로 간주합니다.
        </p>
      </div>
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
