<template>
  <section class="my-profile">
    <article class="my-profile__image">
      <img src="@images/profile.svg" />
    </article>

    <article class="my-profile__form">
      <form>
        <div>
          <label for="name">이름</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div>
          <label for="email">이메일</label>
          <input type="text" id="email" disabled />
        </div>
      </form>

      <button @click="clickEditProfile">수정하기</button>
    </article>
  </section>
</template>

<script>
import { ref } from 'vue'
import { editProfile } from '@api/setting/myProfile.js'

export default {
  name: ROUTE.Setting.Profile,
  setup() {
    const name = ref('')
    const clickEditProfile = () => {
      editProfile({ name: name.value })
    }

    return {
      name,
      clickEditProfile,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@styles/setting/myProfile.scss';
</style>