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
          <label for="gender">성별*</label>
          <div class="radio-area">
            <label for="female">여자</label>
            <input
              type="radio"
              id="female"
              name="gender"
              v-model="form.gender"
              value="FEMALE"
            />
          </div>
          <div class="radio-area">
            <label for="male">남자</label>
            <input
              type="radio"
              id="male"
              name="gender"
              v-model="form.gender"
              value="MALE"
            />
          </div>
        </div>
        <div class="field-area">
          <label for="breed">품종</label>
          <input
            type="text"
            id="breed"
            maxlength="20"
            v-model="form.breed"
            placeholder="품종을 입력해주세요."
          />
        </div>
        <div class="field-area date-area">
          <label for="birthday">생일</label>
          <input
            id="birthday"
            v-model="form.birthday"
            readonly
            placeholder="0000.00.00"
            @click="clickBirthday"
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
          <label for="adoptionDate">입양 날짜</label>
          <input
            id="adoptionDate"
            v-model="form.adoptionDate"
            readonly
            placeholder="0000.00.00"
            @click="clickAdoptionDate"
          />
        </div>
        <div class="field-area">
          <label for="animalRegistrationNumber">동물등록번호</label>
          <input
            type="text"
            id="animalRegistrationNumber"
            maxlength="20"
            v-model="form.animalRegistrationNumber"
            placeholder="등록번호를 입력해주세요."
          />
        </div>
      </form>

      <button
        :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
        @click="clickEditProfile"
      >
        완료하기
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
import Calendar from '@/components/common/Calendar.vue'
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import {
  MODULE_NAME as MN_PET,
  TYPES as TY_PET,
} from '@/store/modules/pet/petStore'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import ROUTE from '@/constants/route'

const store = useStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()
const isOnEdit = ref(false)
const birthCalendar = ref(null)
const adoptCalendar = ref(null)
const form = reactive({
  image: '',
  name: '',
  gender: '',
  breed: '',
  birthday: '',
  age: '',
  adoptionDate: '',
  animalRegistrationNumber: '',
})
toRefs(form)
const getPet = computed(() => store.getters[`${MN_PET}/${TY_PET.getPet}`])

onMounted(async () => {
  await store.dispatch(`${MN_PET}/${TY_PET.fetchPet}`, route.params.petId)

  Object.assign(form, getPet.value)

  store.commit(`${MN_HEADER}/${TY_HEADER.setMoreOptionList}`, [
    {
      title: '삭제하기',
      callback: () => {
        store
          .dispatch(`${MN_PET}/${TY_PET.fetchDeletePet}`, getPet.value.petId)
          .then(() => {
            toast.clear()
            toast.open({
              type: 'success',
              message: '펫이 삭제되었습니다.',
              position: 'bottom',
            })
            router.replace({ name: ROUTE.Pet.Profile })
          })
      },
    },
    {
      title: '기록중지',
      callback: () => {
        store
          .dispatch(
            `${MN_PET}/${TY_PET.fetchModifyDeactivatePet}`,
            getPet.value.petId
          )
          .then(() => {
            toast.clear()
            toast.open({
              type: 'success',
              message: '펫의 기록이 중지되었습니다.',
              position: 'bottom',
            })
            router.replace({ name: ROUTE.Pet.Profile })
          })
      },
    },
  ])
})

watch(
  () => form,
  (newValue, oldValue) => {
    if (newValue.name && newValue.gender) {
      // if (
      //   JSON.stringify(Object.values(newValue)) !==
      //   JSON.stringify(Object.values(getPet.value))
      // ) {
      console.log('old', oldValue)
      console.log('new', newValue)

      //   isOnEdit.value = true
      //   return
      // }
    }
    isOnEdit.value = false
  },
  { deep: true }
)

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

const clickBirthday = () => {
  birthCalendar.value.openCalendar()
}
const clickAdoptionDate = () => {
  adoptCalendar.value.openCalendar()
}
const changeBirthCalendar = (value) => {
  form.birthday = value
}
const changeAdoptCalendar = (value) => {
  form.adoptionDate = value
}

const clickEditProfile = () => {
  /**
   * 펫 등록 API 호출
   */
  store.dispatch(`${MN_PET}/${TY_PET.fetchModifyPet}`, form).then(() => {
    toast.clear()
    toast.open({
      type: 'success',
      message: '펫 프로필이 수정되었습니다.',
      position: 'bottom',
    })
    router.replace({ name: ROUTE.Pet.Profile })
  })
}

watch(
  () => form,
  (newForm) => {
    isOnEdit.value = Object.entries(newForm)
      .filter((f) => f[0] === 'name' || f[0] === 'gender')
      .every((f) => f[1])
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
@import '@styles/pet/createPet.scss';
</style>