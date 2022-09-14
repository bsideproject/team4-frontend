<template>
  <section class="my-profile">
    <article class="my-profile__image">
      <div @click="clickEditProfileImage">
        <img :src="form.image" @error="onError" />
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
          <input type="text" id="name" v-model="form.name" />
        </div>
        <div>
          <label for="email">이메일</label>
          <input type="text" id="email" disabled v-model="form.email" />
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
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { MODULE_NAME, TYPES } from '@/store/modules/user/userStore'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

const store = useStore()
const toast = useToast()
const isOnEdit = ref(false)

const form = reactive({
  id: '',
  name: '',
  email: '',
  image: '',
})
toRefs(form)

const getUser = computed(() => store.getters[`${MODULE_NAME}/${TYPES.getUser}`])

onMounted(async () => {
  await store.dispatch(`${MODULE_NAME}/${TYPES.actUser}`)

  Object.assign(form, getUser.value)
})
watch(
  () => form,
  (newValue) => {
    if (newValue.name && newValue.name !== getUser.value.name) {
      isOnEdit.value = true
    } else {
      isOnEdit.value = false
    }
  },
  { deep: true }
)
const onError = (e) => {
  e.target.src = require('@images/icons/profile_big_default.svg')
}
const clickEditProfile = () => {
  if (isOnEdit.value) {
    store.dispatch(`${MODULE_NAME}/${TYPES.actPutUser}`, form).then(() => {
      isOnEdit.value = false
      toast.clear()
      toast.open({
        type: 'success',
        message: '내 정보가 수정되었습니다.',
        position: 'bottom',
      })
    })
  }
}

const clickEditProfileImage = () => {
  document.getElementById('iptFile').click()
}
const changeProfileImage = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    form.image = e.target.result
  }

  reader.readAsDataURL(file)
}
</script>

<style lang="scss" scoped>
@import '@styles/setting/myProfile.scss';
</style>