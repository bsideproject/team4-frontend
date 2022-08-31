<template>
  <section class="pet-profile">
    <article class="pet-profile__image">
      <div @click="clickEditProfileImage">
        <img :src="refImage" />
      </div>
    </article>

    <article class="pet-profile__form">
      <form>
        <input
          id="iptFile"
          class="hide"
          type="file"
          accept="image/*"
          @change="changeProfileImage"
        />
        <div>
          <label for="name">이름*</label>
          <input
            type="text"
            id="name"
            v-model="refName"
            @keydown="keydownName"
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div class="check">
          <label for="sex">성별</label>
          <!-- <div><input type="checkbox" value="F" /></div>
          <div><input type="checkbox" value="M" /></div> -->
          <input type="checkbox" value="F" />
          <input type="checkbox" value="M" />
        </div>
        <div>
          <label for="name">품종</label>
          <input type="text" placeholder="품종을 입력해주세요." />
        </div>
        <div>
          <label for="name">생일</label>
          <input type="text" placeholder="0000.00.00" />
        </div>
        <div>
          <label for="name">나이</label>
          <input type="text" placeholder="나이를 입력해주세요." />
        </div>
        <div>
          <label for="name">입양 날짜</label>
          <input type="text" placeholder="0000.00.00" />
        </div>
        <div>
          <label for="name">동물등록번호</label>
          <input type="text" placeholder="등록번호를 입력해주세요." />
        </div>
      </form>

      <button
        :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
        @click="clickEditProfile"
      >
        완료
      </button>
    </article>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const refImage = ref('')

onMounted(() => {
  if (!refImage.value) {
    refImage.value = require('@images/icons/profile_big_default.svg')
  }
})

const clickEditProfileImage = () => {
  document.getElementById('iptFile').click()
}
const changeProfileImage = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    refImage.value = e.target.result
  }

  reader.readAsDataURL(file)
}
</script>

<style lang="scss" scoped>
@import '@styles/pet/petProfile.scss';
</style>