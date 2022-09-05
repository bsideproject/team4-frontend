import { getGroupMemberList } from '@api/group/group.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'groupStore'
const TYPES = makeModuleTypes([
  'groupList',
  'getGroupList',
  'actGroupList',
  'setGroupList',
])

const module = {
  namespaced: true,
  state: {
    groupList: [
      //   {
      //     "userId": 번호,
      //     "name": "이름",
      //     "role": "권한"
      // }
    ],
  },
  getters: {
    [TYPES.getGroupList](state) {
      return state.groupList
    },
  },
  actions: {
    [TYPES.actGroupList](context, payload) {
      context.commit(TYPES.setGroupList, [
        {
          userId: 1,
          name: '엄마',
          image: '',
          role: 'ROLE_MANAGER',
        },
        {
          userId: 2,
          name: '아빠',
          image: '',
          role: 'ROLE_USER',
        },
        {
          userId: 3,
          name: '동생',
          image: '',
          role: 'ROLE_USER',
        },
      ])
      getGroupMemberList(payload)
        .then((res) => {
          console.log(res)

          // const groupList = res.data?.data?.familyMemberList
          // context.commit(TYPES.setGroupList, groupList || [])
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mutations: {
    [TYPES.setGroupList](state, payload) {
      state.groupList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
