<template>
  <pet-list />
  <tab-menu />
  <weekly-calendar v-if="petList.length !== 0" />

  <div :class="petList.length !== 0 ? 'checkList' : 'checkList--empty'">
    <div v-if="petList.length !== 0">
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
        @click="$router.push('/pet/create')"
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
    <floating-bottom-sheet ref="floatingBottomSheet" />
  </div>
</template>


<script setup>
import PetList from '@/components/main/PetList.vue'
import TabMenu from '@/components/main/TabMenu.vue'
import WeeklyCalendar from '@/components/main/WeeklyCalendar'
import QuickMenu from '@/components/main/QuickMenu'
import ListTable from '@/components/main/ListTable'
import FloatingBottomSheet from '@/components/main/FloatingBottomSheet.vue'

import { ref } from 'vue'
import { useStore } from 'vuex'
import '@store/pet/petStore.js'

const store = useStore()
const petList = store.state.petStore.petList
const floatingBottomSheet = ref(null)
const clickFloating = () => {
  floatingBottomSheet.value.openBottomSheet()
}
</script>

<style lang="scss" scoped>
@import '@styles/main/main.scss';
</style>