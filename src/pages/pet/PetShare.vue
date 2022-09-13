<template>
  <section class="pet-profile">
    <article class="pet-profile__share">
      <div
        class="pet-profile__info"
        v-for="(item, index) in getPetList"
        :key="index"
      >
        <div>
          <img src="@images/icons/profile_s_pet.svg" />
          <span
            >{{ item.name
            }}<span
              class="share-bedge"
              v-if="item.shareScope === SHARE.FAMILY"
            ></span
          ></span>
        </div>
        <div>
          <button
            :class="[
              'representative',
              item.isMain ? 'representative-color' : '',
            ]"
          ></button>
          <button class="share" @click="() => clickSharePet(item.petId)">
            공유
          </button>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import SHARE from '@/constants/share.json'
import { MODULE_NAME, TYPES } from '@/store/modules/pet/petStore'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const getPetList = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getPetList}`]
)

onMounted(() => {
  store.dispatch(`${MODULE_NAME}/${TYPES.actPetList}`)
})

const clickSharePet = (petId) => {
  store.dispatch(`${MODULE_NAME}/${TYPES.actPostSharePet}`, petId)
}
</script>

<style lang="scss" scoped>
@import '@styles/pet/petProfile.scss';
</style>