<template>
  <section class="pet-profile">
    <article class="pet-profile__represent">
      <div class="pet-profile__info">
        <div>
          <img src="@images/icons/profile_s_pet.svg" />
          <span>멍멍이<span class="share-bedge"></span></span>
        </div>
        <div>
          <button class="representative"></button>
          <button class="edit">편집</button>
        </div>
      </div>
      <div class="pet-profile__detail">
        <div>
          <span>성별</span>
          <span>남자</span>
        </div>
        <div>
          <span>품종</span>
          <span>시츄</span>
        </div>
        <div>
          <span>생일</span>
          <span>2020.08.20</span>
        </div>
        <div>
          <span>나이</span>
          <span>2살</span>
        </div>
        <div>
          <span>입양 날짜</span>
          <span>2020.09.02</span>
        </div>
        <div>
          <span>동물등록번호</span>
          <span>1234567</span>
        </div>
      </div>
    </article>
    <article class="pet-profile__others">
      <div class="pet-profile__info">
        <div>
          <img src="@images/icons/profile_s_pet.svg" />
          <span>아지<span class="share-bedge"></span></span>
        </div>
        <div>
          <button class="representative"></button>
        </div>
      </div>
      <div class="pet-profile__info">
        <div>
          <img src="@images/icons/profile_s_pet.svg" />
          <span>햄쥐</span>
        </div>
        <div>
          <button class="representative"></button>
        </div>
      </div>
      <div class="pet-profile__info">
        <div>
          <img src="@images/icons/profile_s_pet.svg" />
          <span>치즈</span>
        </div>
        <div>
          <button class="representative"></button>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import '@styles/pet/petProfile.scss';
</style>