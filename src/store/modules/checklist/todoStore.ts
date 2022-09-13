import {
  getTodoList,
  putCheckedTodo,
  getTodo,
  postTodo,
} from '@/api/checklist/todo.js'
// import { makeModuleTypes } from '@/utils/store.js'

const MODULE_NAME = 'todoStore'

enum TYPES {
  todoList = 'todoList',
  getTodoList = 'getTodoList',
  actTodoList = 'actTodoList',
  setTodoList= 'setTodoList',

  todo = 'todo',
  getTodo = 'getTodo',
  actTodo = 'actTodo',
  setTodo = 'setTodo',

  actSaveTodo = 'actSaveTodo',

  actCheckedTodo = 'actCheckedTodo',
}
// const TYPES = makeModuleTypes([
//   'todoList',
//   'getTodoList',
//   'actTodoList',
//   'setTodoList',

//   'todo',
//   'getTodo',
//   'actTodo',
//   'setTodo',

//   'actSaveTodo',

//   'actCheckedTodo',
// ])

const module = {
  namespaced: true,
  state: {
    todoList: [],
    todo: {},
  },
  getters: {
    [TYPES.getTodoList](state: any) {
      return state.todoList
    },
    [TYPES.getTodo](state: any) {
      return state.todo
    },
  },
  actions: {
    [TYPES.actTodoList](context: any, payload: any) {
      return getTodoList(payload).then((res: any) => {
        const { code, message, data } = res.data
        if (code === '401') {
          const { checklistDetailList } = data
          context.commit(TYPES.setTodoList, checklistDetailList || [])
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actTodo](context: any, payload: any) {
      return getTodo(payload).then((res: any) => {
        const { code, message, data } = res.data
        if (code === '405') {
          context.commit(TYPES.setTodo, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actCheckedTodo](context: any, payload: any) {
      return putCheckedTodo(payload).then((res: any) => {
        const { code, message } = res.data
        if (code === '411') {
          /**
           * TODO: 성공시 처리
           */
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actSaveTodo](context: any, payload: any) {
      return postTodo(payload).then((res: any) => {
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
    [TYPES.setTodoList](state: any, payload: any) {
      state.todoList = payload
    },
    [TYPES.setTodo](state: any, payload: any) {
      state.todo = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
