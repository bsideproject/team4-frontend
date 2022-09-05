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
      const user = getUser()
        .then((res) => {
          console.log('getUser', res)
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('user', user)
      context.commit(TYPES.setUser, {
        id: 2,
        name: '송레10',
        email: 'sir950123@gmail.com',
        mainPetId: null,
        role: 'ROLE_MANAGER',
        familyId: null,
        deleted: false,
        image: '',
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
