<template>
  <div class="weeklyCalendar section">
    <div class="weeklyCalendar-monthWrapper">
      <p class="weeklyCalendar-month" @click="clickWeekMonth">{{ month }}월</p>
      <calendar ref="compCalendar" id="mainCalendar" @change="changeCalendar" />
    </div>
    <div class="weeklyCalendar-dateWrapper">
      <div
        :class="[
          'weeklyCalendar-dateWrapper__date',
          index === 3 ? 'active' : '',
        ]"
        v-for="(item, index) in weeklyList"
        :key="index"
        @click="() => clickWeekDay(index)"
      >
        <p class="date__day">{{ item.day }}</p>
        <p class="date__num">{{ item.num }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Calendar from '@components/common/Calendar2.vue'
import { ref } from 'vue'

const today = ref(new Date())
const compCalendar = ref(null)
const week = ['일', '월', '화', '수', '목', '금', '토']
const weeklyList = ref([])
const month = ref(null)

const clickWeekMonth = () => {
  compCalendar.value.openCalendar()
}
const clickWeekDay = (index) => {
  const d = today.value
  d.setDate(d.getDate() + (index - 3))
  setWeeklyDate(d)
}
const changeCalendar = (value) => {
  setWeeklyDate(value)
}
const setWeeklyDate = (date) => {
  today.value = date
  month.value = date.getMonth() + 1
  weeklyList.value = makeWeeklyList(date)
}
const getMonth = (date) => {
  return date.getMonth() + 1
}
const getDayName = (widx) => {
  if (widx < 0) {
    widx += 7
  } else if (widx >= week.length) {
    widx -= 7
  }
  return week[widx]
}
const getDayNum = (date, i) => {
  const d = new Date(date)
  d.setDate(d.getDate() + i)
  return d.getDate()
}
const makeWeeklyList = (date) => {
  const before = []
  const after = []
  const today = date.getDay()
  for (let i = 1; i <= 3; i++) {
    before.push({ day: getDayName(today - i), num: getDayNum(date, i * -1) })
    after.push({ day: getDayName(today + i), num: getDayNum(date, i) })
  }
  return [
    ...before.reverse(),
    { day: getDayName(today), num: getDayNum(date, 0) },
    ...after,
  ]
}

month.value = getMonth(today.value)
weeklyList.value = makeWeeklyList(today.value)
</script>

<style>
</style>