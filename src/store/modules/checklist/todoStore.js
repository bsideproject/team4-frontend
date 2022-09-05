import {
  getTodoList,
  putCheckedTodo,
  getTodo,
  postTodo,
} from '@api/checklist/todo.js'
import { makeModuleTypes } from '@/utils/store'

const MODULE_NAME = 'todoStore'
const TYPES = makeModuleTypes([
  'todoList',
  'getTodoList',
  'actTodoList',
  'setTodoList',

  'todo',
  'getTodo',
  'actTodo',
  'setTodo',

  'actSaveTodo',

  'actCheckedTodo',
])

const module = {
  namespaced: true,
  state: {
    todoList: [],
    todo: {},
  },
  getters: {
    [TYPES.getTodoList](state) {
      return state.todoList
    },
    [TYPES.getTodo](state) {
      return state.todo
    },
  },
  actions: {
    [TYPES.actTodoList](context, payload) {
      getTodoList().then((res) => {
        console.log(res)
      })
      // context.commit(TYPES.setTodoList, )

      context.commit(TYPES.setTodoList, [
        {
          checklistId: 3,
          title: '반복 매일 할일 제목',
          explanation: '반복 매일 할일',
          date: [2022, 7, 1],
          done: false,
          repeated: true,
        },
        {
          checklistId: 4,
          title: '매주 토요일 반복 할일',
          explanation: '매주 토요일 할일',
          date: [2022, 7, 1],
          done: true,
          repeated: true,
        },
      ])
    },
    [TYPES.actTodo](context, payload) {
      // getTodo(payload)
      context.commit(TYPES.setTodo, {
        checklistId: 4,
        title: '매달 6/25일 반복할일',
        explanation: '매달 25일 반복 할일입니다',
        date: [2022, 6, 4],
        isDone: false,
        isRepeated: true,
        repeatDetail: {
          eventPeriod: 'monthly',
          eventDate: 'MONDAY',
          eventMonth: null,
          eventDay: '',
          eventWeek: 2,
          startedAt: [2022, 6, 1],
          endedAt: null,
        },
      })
    },
    [TYPES.actCheckedTodo](context, payload) {
      putCheckedTodo(payload)
    },
    [TYPES.actSaveTodo](context, payload) {
      postTodo(payload)
    },
  },
  mutations: {
    [TYPES.setTodoList](state, payload) {
      state.todoList = payload
    },
    [TYPES.setTodo](state, payload) {
      state.todo = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
