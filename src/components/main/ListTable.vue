<template>
  <div class="list-table">
    <ul class="list-table-cardList">
      <!-- <li class="list-table-cardList__card">
        <div class="card__check">
          <span class="schedule"></span>
        </div>
        <div class="card__schedule">
          <p class="label">강아지 생일</p>
          <p class="time">오후 5:00 ~ 오후 12:00</p>
        </div>
      </li> -->
      <li
        class="list-table-cardList__card"
        v-for="(item, index) in getTodoList"
        :key="index"
      >
        <div class="card__check" @click="() => clickTodoChecked(item)">
          <span :class="['footprint', item.done ? 'checked' : '']"></span>
        </div>
        <div
          class="card__schedule"
          @click="() => clickTodoDetail(item.checklistId)"
        >
          <p class="label">{{ item.title }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  MODULE_NAME as MN_TODO,
  TYPES as TY_TODO,
} from '@/store/modules/checklist/todoStore'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
import { computed, onMounted, watch } from 'vue'
import { dateToStringFormat } from '@/utils/common/index'
import ROUTE from '@/constants/route'

const store = useStore()
const router = useRouter()

const getWeeklyCalendarDate = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getWeeklyCalendarDate}`]
)
const getTodoList = computed(
  () => store.getters[`${MN_TODO}/${TY_TODO.getTodoList}`]
)

onMounted(() => {
  fetchTodoList(getWeeklyCalendarDate.value)
})

watch(
  () => getWeeklyCalendarDate.value,
  (newValue) => {
    fetchTodoList(newValue)
  }
)

const fetchTodoList = (date) => {
  store.dispatch(
    `${MN_TODO}/${TY_TODO.fetchTodoList}`,
    dateToStringFormat(date, '-')
  )
}
const clickTodoChecked = (item) => {
  store.dispatch(`${MN_TODO}/${TY_TODO.fetchCheckedTodo}`, {
    todoId: item.checklistId,
    date: dateToStringFormat(new Date(item.date), '-'),
  })
}
const clickTodoDetail = (todoId) => {
  router.push({ name: ROUTE.Checklist.ModifyTodo, params: { todoId } })
}
</script>

<style lang="scss" scoped>
@import '@styles/main/listTable.scss';
</style>