<template>
  <div class="list-table">
    <ul class="list-table-cardList">
      <li class="list-table-cardList__card">
        <div class="card__check">
          <span class="schedule"></span>
        </div>
        <div class="card__schedule">
          <p class="label">강아지 생일</p>
          <p class="time">오후 5:00 ~ 오후 12:00</p>
        </div>
      </li>
      <li
        class="list-table-cardList__card"
        v-for="(item, index) in getTodoList"
        :key="index"
      >
        <div
          class="card__check"
          @click="() => clickTodoChecked(item.checklistId)"
        >
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
import { MODULE_NAME, TYPES } from '@store/checklist/todoStore.js'
import { computed, onMounted } from '@vue/runtime-core'

const store = useStore()
const router = useRouter()

const getTodoList = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getTodoList}`]
)

onMounted(() => {
  store.dispatch(`${MODULE_NAME}/${TYPES.actTodoList}`)
})

const clickTodoChecked = (todoId) => {
  store.dispatch(`${MODULE_NAME}/${TYPES.actCheckedTodo}`, todoId)
}
const clickTodoDetail = (todoId) => {
  router.push(`/checklist/todo?id=${todoId}`)
}
</script>

<style lang="scss" scoped>
@import '@styles/main/listTable.scss';
</style>