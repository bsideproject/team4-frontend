<template>
  <pet-profile />
  <hr />
  <weekly-calendar />
</template>

<script>
import PetProfile from '@/components/common/PetProfile.vue'
import WeeklyCalendar from '@/components/common/WeeklyCalendar.vue'

export default {
  name: ROUTE.Main,
  components: {
    PetProfile,
    WeeklyCalendar,
  },
}
</script>

<style>
</style>