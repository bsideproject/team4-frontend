<template>
  <section class="pet-profile">
    <article class="pet-profile__share">
      <div class="pet-profile__info">
        <div>
          <img src="@images/icons/profile_s_pet.svg" />
          <span>멍멍이<span class="share-bedge"></span></span>
        </div>
        <div>
          <button class="representative"></button>
          <button class="share">공유</button>
        </div>
      </div>
      <div class="pet-profile__info">
        <div>
          <img src="@images/icons/profile_s_pet.svg" />
          <span>아지</span>
        </div>
        <div>
          <button class="representative"></button>
          <button class="share">공유</button>
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