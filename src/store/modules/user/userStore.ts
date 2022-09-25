import { getUser, putUser } from '@/api/setting/myProfile'
import { makeModuleTypes } from '@/utils/store/index'
import { User } from '@/types/user'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'
import { Commit } from 'vuex'

const MODULE_NAME = 'userStore'
const TYPES = makeModuleTypes([
  'user',
  'getUser',
  'actUser',
  'setUser',

  'actPutUser',
  'actDeleteUser',
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
    [TYPES.actUser]({ commit, }: {commit: Commit}) {
      return getUser()
        .then((res: AxiosResponse<Success>) => {
          const { code, data } = res.data
          if (code === '152') {
            commit(TYPES.setUser, data)
          }
        })
    },
    [TYPES.actPutUser]({ commit, }: {commit: Commit}, payload: User) {
      return putUser(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '153') {
            commit(TYPES.setUser, data)
          } else {
            throw new Error(message)
          }
        })
    },
  },
  mutations: {
    [TYPES.setUser](state: State, payload: User) {
      state.user = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
