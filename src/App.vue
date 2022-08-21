<template>
  <comp-header/>
  <main>
    <pet-profile v-if="this.$route.name !== 'Login'"/>
    <tab-menu v-if="this.$route.name !== 'Login'"/>
    <weekly-calendar v-if="this.$route.name !== 'Login'"/>
    <router-view />
  </main>
  <comp-footer />
</template>

<script>
import CompHeader from '@/components/common/Header.vue'
import CompFooter from '@/components/common/Footer.vue'
import PetProfile from '@/components/common/PetProfile.vue'
import TabMenu from '@/components/common/TabMenu.vue'
import WeeklyCalendar from '@/components/common/WeeklyCalendar.vue'

export default {
  components: {
    CompHeader,
    CompFooter,
    PetProfile,
    TabMenu,
    WeeklyCalendar
  },
}
</script>

<style lang="scss">
@import 'assets/styles/common.scss';
</style>
