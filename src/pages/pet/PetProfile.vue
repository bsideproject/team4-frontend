<template>
  <section class="pet-profile">
    <article class="pet-profile__list">
      <div
        :class="[
          'pet-profile__represent',
          detailId === item.petId ? 'detail' : '',
        ]"
        v-for="(item, index) in getPetList"
        :key="index"
        @click="() => clickPet(item.petId)"
      >
        <div class="pet-profile__info">
          <div>
            <img src="@images/icons/profile_s_pet.svg" />
            <span
              >{{ item.name
              }}<span
                class="share-bedge"
                v-if="item.shareScope === 'FAMILY'"
              ></span
            ></span>
          </div>
          <div>
            <button
              :class="[
                'representative',
                item.isMain ? 'representative-color' : '',
              ]"
              @click="(e) => clickRepresentative(item)"
            ></button>
            <button class="edit" @click="() => clickEdit(item.petId)">
              편집
            </button>
          </div>
        </div>
        <div
          :class="[
            'pet-profile__detail',
            detailId === item.petId ? 'show' : 'hide',
          ]"
        >
          <div v-if="item.gender">
            <span>성별</span>
            <span>{{ item.gender === 'MALE' ? '남자' : '여자' }}</span>
          </div>
          <div v-if="item.breed">
            <span>품종</span>
            <span>{{ item.breed }}</span>
          </div>
          <div v-if="item.birthday">
            <span>생일</span>
            <span>2020.08.20</span>
          </div>
          <div v-if="item.age">
            <span>나이</span>
            <span>2살</span>
          </div>
          <div v-if="item.adoptionDate">
            <span>입양 날짜</span>
            <span>2020.09.02</span>
          </div>
          <div v-if="item.animalRegistrationNumber">
            <span>동물등록번호</span>
            <span>1234567</span>
          </div>
        </div>
      </div>
    </article>
    <article class="pet-profile__create">
      <button class="btn-lg-enabled" @click="clickCreatePet">등록하기</button>
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { MODULE_NAME, TYPES } from '@/store/modules/pet/petStore'
import ROUTE from '@/constants/route'

const store = useStore()
const router = useRouter()
const toast = useToast()
const detailId = ref('')

const getPetList = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getPetList}`]
)
const getMainPetId = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getMainPetId}`]
)

onMounted(() => {
  store.dispatch(`${MODULE_NAME}/${TYPES.actPetList}`)
  detailId.value = getMainPetId.value
})
watch(
  () => getMainPetId.value,
  (newValue) => {
    detailId.value = newValue
  }
)
const clickPet = (petId) => {
  detailId.value = petId
}
const clickRepresentative = (pet) => {
  if (pet.petId === getMainPetId.value) {
    return false
  }

  store
    .dispatch(`${MODULE_NAME}/${TYPES.actPutMainPet}`, {
      mainPetId: pet.petId,
    })
    .then(() => {
      toast.clear()
      toast.open({
        type: 'success',
        message: `'${pet.name}'가 대표 펫으로 설정되었습니다.`,
        position: 'bottom',
      })
    })
}

const clickEdit = (petId) => {
  router.push({ name: ROUTE.Pet.Modify, params: { petId } })
}
const clickCreatePet = () => {
  router.push({ name: ROUTE.Pet.Create })
}
</script>

<style lang="scss" scoped>
@import '@styles/pet/petProfile.scss';
</style>