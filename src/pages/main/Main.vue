<template>
  <section class="checklist-main">
    <pet-list :pet-list="getPetList" />
    <tab-menu />
    <weekly-calendar v-if="getPetList.length" />

    <div :class="getPetList.length ? 'checkList' : 'checkList--empty'">
      <div v-if="getPetList.length">
        <quick-menu />
        <list-table />
      </div>
      <div v-else>
        <div class="empty__img">
          <img src="@assets/images/png/petadd_illust.png" alt="" />
        </div>
        <p class="empty__txt">등록된 펫이 없습니다. <br />펫을 등록해주세요!</p>
        <button
          class="empty__btn btn-lg-enabled"
          @click="$router.push({ name: ROUTE.Pet.Create })"
        >
          등록
        </button>
      </div>
    </div>

    <div class="floatArea">
      <button class="floatArea__btn--float" @click="clickFloating">
        <span></span>
        <span></span>
      </button>
    </div>

    <floating-bottom-sheet ref="floatingBottomSheet" />
  </section>
</template>


<script setup>
import PetList from '@/components/main/PetList.vue'
import TabMenu from '@/components/main/TabMenu.vue'
import WeeklyCalendar from '@/components/main/WeeklyCalendar'
import QuickMenu from '@/components/main/QuickMenu'
import ListTable from '@/components/main/ListTable'
import FloatingBottomSheet from '@/components/main/FloatingBottomSheet.vue'

import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_PET,
  TYPES as TY_PET,
} from '@/store/modules/pet/petStore'
import ROUTE from '@/constants/route'

const store = useStore()
const floatingBottomSheet = ref(null)

const getPetList = computed(
  () => store.getters[`${MN_PET}/${TY_PET.getPetList}`]
)

onMounted(() => {
  store.dispatch(`${MN_PET}/${TY_PET.fetchPetList}`)
})

const clickFloating = () => {
  floatingBottomSheet.value.openBottomSheet()
}
</script>

<style lang="scss" scoped>
@import '@styles/main/main.scss';
</style>