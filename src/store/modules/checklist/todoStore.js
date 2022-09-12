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
      return getTodoList(payload).then((res) => {
        const { code, message, data } = res.data
        if (code === '401') {
          const { checklistDetailList } = data
          context.commit(TYPES.setTodoList, checklistDetailList || [])
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actTodo](context, payload) {
      return getTodo(payload).then((res) => {
        const { code, message, data } = res.data
        if (code === '405') {
          context.commit(TYPES.setTodo, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actCheckedTodo](context, payload) {
      return putCheckedTodo(payload).then((res) => {
        const { code, message } = res.data
        if (code === '411') {
          /**
           * TODO: 성공시 처리
           */
          console.log(res)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actSaveTodo](context, payload) {
      return postTodo(payload).then((res) => {
        const { code, message } = res.data
        if (code === '403') {
          /**
           * TODO: 성공시 처리
           */
        } else {
          throw new Error(message)
        }
      })
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
