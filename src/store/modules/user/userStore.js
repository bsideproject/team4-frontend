import { getUser, putUser } from '@api/setting/myProfile.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'userStore'
const TYPES = makeModuleTypes([
  'user',
  'getUser',
  'actUser',
  'setUser',

  'actPutUser',
  'actDeleteUser',
])

const module = {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    [TYPES.getUser](state) {
      return state.user
    },
  },
  actions: {
    [TYPES.actUser](context, payload) {
      getUser()
        .then((res) => {
          const { code, data } = res.data
          if (code === '152') {
            context.commit(TYPES.setUser, data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [TYPES.actPutUser](context, payload) {
      console.log(context, payload)
      putUser(payload).then((res) => console.log('putUser', res))

      // context.commit(TYPES.setUser, )
    },
  },
  mutations: {
    [TYPES.setUser](state, payload) {
      state.user = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
