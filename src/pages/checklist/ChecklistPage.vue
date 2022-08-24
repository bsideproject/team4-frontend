<template>

  <pet-profile />
  <tab-menu />
  <weekly-calendar v-if="petList.length !== 0"/>

  <div :class="petList.length !== 0 ? 'checkList' : 'checkList--empty'">
    <div v-if="petList.length !== 0">
      <quick-menu/>
      <list-table/>
    </div>
    <div v-else>
      <div class="empty__img">
        <img src="@assets/images/png/petadd_illust.png" alt=""/>
      </div>
      <p class="empty__txt">등록된 펫이 없습니다. <br/>펫을 등록해주세요!</p>
      <button class="empty__btn btn-lg-enabled" @click="$router.push('profile/create')">등록</button>
    </div>

  </div>

  <div class="floatArea">
    <button class="floatArea__btn--float">
      <span></span>
      <span></span>
    </button>
  </div>
</template>


<script>
import PetProfile from '@/components/common/PetProfile.vue'
import TabMenu from '@/components/common/TabMenu.vue'
import WeeklyCalendar from '@/components/common/WeeklyCalendar'
import QuickMenu from '@/components/checkList/QuickMenu'
import ListTable from '@/components/checkList/ListTable'


import { useStore } from 'vuex'
import '@store/pet/petStore.js'

export default {
  components: {
    WeeklyCalendar,
    QuickMenu,
    ListTable,
    PetProfile,
    TabMenu,
  },
  setup() {
    const store = useStore()
    const petList = store.state.petStore.petList

    return {
      petList,
      store,
    }
  },
}
</script>

<style scoped>

</style>