import {
  getTodoList,
  putCheckedTodo,
  getTodo,
  postTodo,
  putTodo
} from '@/api/checklist/todo'
import { makeModuleTypes } from '@/utils/store/index'
import { Todo } from '@/types/checklist'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'

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
  'setCheckedTodo',
  'actPutTodo'
])
type TYPES = typeof TYPES[keyof typeof TYPES]

interface State {
  todoList: Array<Todo>,
  todo: Todo
}

const module = {
  namespaced: true,
  state: {
    todoList: [],
    todo: {},
  },
  getters: {
    [TYPES.getTodoList](state: State) {
      return state.todoList
    },
    [TYPES.getTodo](state: State) {
      return state.todo
    },
  },
  actions: {
    [TYPES.actTodoList](context: any, payload: string) {
      return getTodoList(payload).then((res: AxiosResponse<Success>) => {
        const { code, message, data } = res.data
        if (code === '401') {
          const { checklistDetailList } = data
          context.commit(TYPES.setTodoList, checklistDetailList || [])
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actTodo](context: any, payload: number) {
      return getTodo(payload).then((res: AxiosResponse<Success>) => {
        const { code, message, data } = res.data
        if (code === '405') {
          context.commit(TYPES.setTodo, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actCheckedTodo](context: any, payload: {todoId: number, date: string}) {
      return putCheckedTodo(payload).then((res: AxiosResponse<Success>) => {
        const { code, message, data } = res.data
        if (code === '411') {
          context.commit(TYPES.setCheckedTodo, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actSaveTodo](context: any, payload: Todo) {
      return postTodo(payload)
        .then((res: AxiosResponse<Success>) => {
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
    [TYPES.actPutTodo](context: any, payload: {data: Todo, modifyType: string}) {
      return putTodo(payload.data, payload.modifyType)
        .then((res: AxiosResponse<Success>) => {
          const { code, message } = res.data
          if (code === '407') {
            /**
             * TODO: 할 일 수정 성공시 처리
             */
          } else {
            throw new Error(message)
          }
        })
    }
  },
  mutations: {
    [TYPES.setTodoList](state: State, payload: Array<Todo>) {
      state.todoList = payload
    },
    [TYPES.setTodo](state: State, payload: Todo) {
      state.todo = payload
    },
    [TYPES.setCheckedTodo](state: State, payload: {checklistId: number, done: boolean}) {
      console.log(payload)
      state.todoList = state.todoList.map(td => {
        if (td.checklistId === payload.checklistId) {
          td.done = payload.done
        }
        return td
      })
    }
  },
}

export { module, MODULE_NAME, TYPES }
