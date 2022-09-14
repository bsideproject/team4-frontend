import { getUser, putUser } from '@/api/setting/myProfile'
import { makeModuleTypes } from '@/utils/store/index'
import { User } from '@/types/user'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'

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
    [TYPES.actUser](context: any) {
      getUser()
        .then((res: AxiosResponse<Success>) => {
          const { code, data } = res.data
          if (code === '152') {
            context.commit(TYPES.setUser, data)
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    },
    [TYPES.actPutUser](context: any, payload: User) {
      putUser(payload).then((res: AxiosResponse<Success>) => console.log('putUser', res))

      // context.commit(TYPES.setUser, )
    },
  },
  mutations: {
    [TYPES.setUser](state: any, payload: User) {
      state.user = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
