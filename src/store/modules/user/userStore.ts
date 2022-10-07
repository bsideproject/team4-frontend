import { getUser, modifyUser, saveLeaveFamily, fetchDeleteUser } from '@/api/setting/user'
import { makeModuleTypes } from '@/utils/store/index'
import { User } from '@/types/user'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'
import { Commit, Dispatch } from 'vuex'
import { removeToken } from '@/utils/login'

const MODULE_NAME = 'userStore'
const TYPES = makeModuleTypes([
  'user',
  'getUser',

  'fetchGetUser',
  'fetchModifyUser',
  'fetchSaveLeaveFamily',
  'fetchDeleteUser',

  'setUser'
])
type TYPES = typeof TYPES[keyof typeof TYPES]; 

interface State {
  user: object,
}

const module = {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    [TYPES.getUser](state: State) {
      return state.user
    },
  },
  actions: {
    [TYPES.fetchGetUser]({ commit, }: {commit: Commit}) {
      return getUser()
        .then((res: AxiosResponse<Success>) => {
          const { code, data } = res.data
          if (code === '152') {
            commit(TYPES.setUser, data)
          }
        })
    },
    [TYPES.fetchModifyUser]({ commit, }: {commit: Commit}, payload: User) {
      return modifyUser(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '153') {
            commit(TYPES.setUser, data)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.fetchSaveLeaveFamily]({ dispatch, }: {dispatch: Dispatch}) {
      return saveLeaveFamily()
        .then((res: AxiosResponse<Success>) => {
          const { code, message } = res.data

          if (code === '155') {
            dispatch(TYPES.fetchGetUser)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.fetchDeleteUser]() {
      return fetchDeleteUser()
        .then((res: AxiosResponse<Success>) => {
          const { code, message } = res.data

          if (code === '154') {
            removeToken()
            location.reload()
          } else {
            throw new Error(message)
          }
        })
    }
  },
  mutations: {
    [TYPES.setUser](state: State, payload: User) {
      state.user = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
