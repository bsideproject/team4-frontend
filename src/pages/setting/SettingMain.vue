<template>
  <section class="setting-main">
    <article class="setting-main__profile">
      <div class="profile-image">
        <img src="@images/login/avatar.jpg" alt="" />
      </div>
      <div class="profile-name">
        <span>별 펫이랑</span>
      </div>
    </article>

    <article class="setting-main__info">
      <div>
        <router-link to="/setting/profile">내 정보</router-link>
      </div>
      <div>
        <a href="#">펫 정보</a>
      </div>
      <div>
        <router-link to="/family">가족 정보</router-link>
      </div>
    </article>

    <article class="setting-main__menu">
      <div>
        <a href="#">공지사항</a>
      </div>
      <div>
        <a href="#">라이선스</a>
      </div>
      <div>
        <a href="#">피드백</a>
      </div>
      <div class="none-border">
        <a href="#">로그아웃</a>
      </div>
      <div class="none-border">
        <a href="#">회원탈퇴</a>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: ROUTE.Setting.Main,
}
</script>

<style lang="scss" scoped>
@import '@styles/setting/settingMain.scss';
</style>