<template>
  <section class="pet-profile">
    <article class="pet-profile__image">
      <div @click="clickEditProfileImage">
        <img :src="form.image" @error="onError" />
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
        <div class="field-area">
          <label for="name">이름*</label>
          <input
            type="text"
            id="name"
            maxlength="20"
            v-model="form.name"
            @keydown="keydownName"
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div class="field-area">
          <label for="sex">성별*</label>
          <div class="radio-area">
            <label for="female">여자</label>
            <input
              type="radio"
              id="female"
              name="sex"
              v-model="form.sex"
              value="F"
            />
          </div>
          <div class="radio-area">
            <label for="male">남자</label>
            <input
              type="radio"
              id="male"
              name="sex"
              v-model="form.sex"
              value="M"
            />
          </div>
        </div>
        <div class="field-area">
          <label for="kind">품종</label>
          <input
            type="text"
            id="kind"
            maxlength="20"
            v-model="form.kind"
            placeholder="품종을 입력해주세요."
          />
        </div>
        <div class="field-area date-area">
          <label for="birthday">생일</label>
          <input
            id="birthday"
            v-model="form.birthYmd"
            readonly
            placeholder="0000.00.00"
            @click="clickBirthYmd"
          />
        </div>

        <div class="field-area">
          <label for="name">나이</label>
          <input
            type="text"
            id="age"
            maxlength="2"
            v-model="form.age"
            placeholder="나이를 입력해주세요."
          />
        </div>
        <div class="field-area date-area">
          <label for="adoptYmd">입양 날짜</label>
          <input
            id="adoptYmd"
            v-model="form.adoptYmd"
            readonly
            placeholder="0000.00.00"
            @click="clickAdoptYmd"
          />
        </div>
        <div class="field-area">
          <label for="petNumber">동물등록번호</label>
          <input
            type="text"
            id="petNumber"
            maxlength="20"
            v-model="form.petNumber"
            placeholder="등록번호를 입력해주세요."
          />
        </div>
      </form>

      <button
        :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
        @click="clickEditProfile"
      >
        완료
      </button>
    </article>
    <calendar
      ref="birthCalendar"
      id="birthCalendar"
      @change="changeBirthCalendar"
      :max-date="new Date()"
    />
    <calendar
      ref="adoptCalendar"
      id="adoptCalendar"
      @change="changeAdoptCalendar"
      :max-date="new Date()"
    />
  </section>
</template>

<script setup>
import Calendar from '@components/common/Calendar.vue'
import { reactive, ref, toRefs, watch } from 'vue'
import { MODULE_NAME, TYPES } from '@store/pet/petStore.js'
import { useStore } from 'vuex'

const store = useStore()
const isOnEdit = ref(false)
const birthCalendar = ref(null)
const adoptCalendar = ref(null)
const form = reactive({
  image: '',
  name: '',
  sex: '',
  kind: '',
  birthYmd: '',
  age: '',
  adoptYmd: '',
  petNumber: '',
})

const onError = (e) => {
  e.target.src = require('@images/icons/profile_big_default.svg')
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

const clickBirthYmd = () => {
  birthCalendar.value.openCalendar()
}
const clickAdoptYmd = () => {
  adoptCalendar.value.openCalendar()
}
const changeBirthCalendar = (value) => {
  form.birthYmd = value
}
const changeAdoptCalendar = (value) => {
  form.adoptYmd = value
}

const clickEditProfile = () => {
  console.log(form)
  /**
   * 펫 등록 API 호출
   */
  store.dispatch(`${MODULE_NAME}/${TYPES.actPostPet}`, form)
}

watch(
  () => form,
  (newForm) => {
    isOnEdit.value = Object.entries(newForm)
      .filter((f) => f[0] !== 'image')
      .every((f) => f[1])
  },
  { deep: true }
)

toRefs(form)
</script>

<style lang="scss" scoped>
@import '@styles/pet/createPet.scss';
</style>