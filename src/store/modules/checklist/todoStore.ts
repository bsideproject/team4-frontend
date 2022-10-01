import {
  getTodoList,
  modifyTodo,
  getTodo,
  saveTodo,
  modifyCheckedTodo,
  deleteTodo
} from '@/api/checklist/todo'
import { makeModuleTypes } from '@/utils/store/index'
import { Todo } from '@/types/checklist'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'
import {  Commit } from "vuex";

const MODULE_NAME = 'todoStore'
const TYPES = makeModuleTypes([
  'todoList',
  'todo',

  'getTodoList',
  'getTodo',
  
  'fetchTodoList',
  'fetchTodo',
  'fetchSaveTodo',
  'fetchCheckedTodo',
  'fetchModifyTodo',

  'setTodoList',
  'setTodo',
  'setCheckedTodo'
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
    [TYPES.fetchTodoList]({ commit }: {commit: Commit}, payload: string) {
      return getTodoList(payload).then((res: AxiosResponse<Success>) => {
        const { code, message, data } = res.data
        if (code === '401') {
          const { checklistDetailList } = data
          commit(TYPES.setTodoList, checklistDetailList || [])
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.fetchTodo]({ commit }: {commit: Commit}, payload: number) {
      return getTodo(payload).then((res: AxiosResponse<Success>) => {
        const { code, message, data } = res.data
        if (code === '405') {
          commit(TYPES.setTodo, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.fetchCheckedTodo]({ commit }: {commit: Commit}, payload: {todoId: number, date: string}) {
      return modifyCheckedTodo(payload).then((res: AxiosResponse<Success>) => {
        const { code, message, data } = res.data
        if (code === '411') {
          commit(TYPES.setCheckedTodo, data)
        } else {
          throw new Error(message)
        }
      })
    },
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    [TYPES.fetchSaveTodo]({ commit }: {commit: Commit}, payload: Todo) {
      return saveTodo(payload)
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
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    [TYPES.fetchModifyTodo]({ commit }: {commit: Commit}, payload: {data: Todo, modifyType: string}) {
      return modifyTodo(payload.data, payload.modifyType)
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
    },
    [TYPES.deleteTodo]({ commit }: {commit: Commit}, payload: {data: Todo, deleteType: string}) {
      return deleteTodo(payload.data, payload.deleteType)
        .then((res: AxiosResponse<Success>) => {
          const { code, message } = res.data
          if (code === '409') {
            commit(TYPES.setTodo, {})
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
