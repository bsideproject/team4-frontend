import { getUser, putUser } from '@/api/setting/myProfile'
// import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'userStore'
const TYPES = {
  user : 'user',
  getUser : 'getUser',
  actUser : 'actUser',
  setUser : 'setUser',

  actPutUser : 'actPutUser',
  actDeleteUser : 'actDeleteUser',
} as const;
type TYPES = typeof TYPES[keyof typeof TYPES]; 

// enum TYPES {
//   user = 'user',
//   getUser = 'getUser',
//   actUser = 'actUser',
//   setUser = 'setUser',

//   actPutUser = 'actPutUser',
//   actDeleteUser = 'actDeleteUser',
// }
// const TYPES = makeModuleTypes([
//   'user',
//   'getUser',
//   'actUser',
//   'setUser',

//   'actPutUser',
//   'actDeleteUser',
// ])

const module = {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    [TYPES.getUser](state: any) {
      return state.user
    },
  },
  actions: {
    [TYPES.actUser](context: any, payload: any) {
      getUser()
        .then((res: any) => {
          const { code, data } = res.data
          if (code === '152') {
            context.commit(TYPES.setUser, data)
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    },
    [TYPES.actPutUser](context: any, payload: any) {
      putUser(payload).then((res: any) => console.log('putUser', res))

      // context.commit(TYPES.setUser, )
    },
  },
  mutations: {
    [TYPES.setUser](state: any, payload: any) {
      state.user = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
