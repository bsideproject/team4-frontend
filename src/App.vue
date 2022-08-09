<template>
  <comp-header />
  <hr />
  <pet-profile />
  <hr />
  <weekly-calendar />
  <hr />
  <div class="main">
    <router-view />
  </div>
  <hr />
  <comp-footer />
</template>

<script>
import CompHeader from "@/components/common/Header.vue";
import CompFooter from "@/components/common/Footer.vue";
import PetProfile from "@/components/common/PetProfile.vue";
import WeeklyCalendar from "@/components/common/WeeklyCalendar.vue";

export default {
  name: 'App',
  components: {
    CompHeader,
    CompFooter,
    PetProfile,
    WeeklyCalendar
  }
}
</script>

<style lang="scss">
@import "assets/styles/common.scss";
</style>
