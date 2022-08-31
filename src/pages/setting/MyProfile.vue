<template>
  <section class="my-profile">
    <article class="my-profile__image">
      <div @click="clickEditProfileImage">
        <img :src="refImage" />
      </div>
      <input
        id="iptFile"
        class="hide"
        type="file"
        accept="image/*"
        @change="changeProfileImage"
      />
    </article>

    <article class="my-profile__form">
      <form>
        <div>
          <label for="name">이름</label>
          <input
            type="text"
            id="name"
            v-model="refName"
            @keydown="keydownName"
          />
        </div>
        <div>
          <label for="email">이메일</label>
          <input type="text" id="email" disabled v-model="refEmail" />
        </div>
      </form>

      <button
        :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
        @click="clickEditProfile"
      >
        수정하기
      </button>
    </article>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { selectProfile, editProfile } from '@api/setting/myProfile.js'

const info = {
  id: '',
  name: '',
  email: '',
  image: '',
}
const refId = ref('')
const refName = ref('')
const refEmail = ref('')
const refImage = ref('')
const isOnEdit = ref(false)

onMounted(() => {
  selectProfile()
    .then((res) => {
      console.log(res)
      const data = res.data

      info.id = data.id
      info.name = data.name
      info.email = data.email
      info.image = data.image

      refId.value = data.id
      refName.value = data.name
      refEmail.value = data.email
      refImage.value = data.image
    })
    .catch((error) => {
      console.log(error)
    })

  if (!refImage.value) {
    refImage.value = require('@images/icons/profile_big_default.svg')
  }
})

const clickEditProfile = () => {
  if (isOnEdit.value) {
    editProfile({ name: refName.value })
  }
}
const keydownName = () => {
  if (refName.value && info.id !== refName.value) {
    isOnEdit.value = true
  } else {
    isOnEdit.value = false
  }
}
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
@import '@styles/setting/myProfile.scss';
</style>