<template>
  <div class="checkList">
    <quick-menu/>
    <list-table/>

    <div class="floatArea">
      <button class="btn--float">
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</template>

<script>
import WeeklyCalendar from '@/components/common/WeeklyCalendar'
import QuickMenu from '@/components/checkList/QuickMenu'
import ListTable from '@/components/checkList/ListTable'
export default {
  components: {
    WeeklyCalendar,
    QuickMenu,
    ListTable
  },
  setup() {
    
  }
}
</script>

<style scoped>

</style>