import {
  getGroupMemberList,
  deleteGroupMember,
  putGroupManager,
} from '@api/group/group.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'groupStore'
const TYPES = makeModuleTypes([
  'groupList',
  'getGroupList',
  'actGroupList',
  'setGroupList',

  'actDeleteGroupMember',
  'actPutGroupManager',
])

const module = {
  namespaced: true,
  state: {
    groupList: [],
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
    [TYPES.actDeleteGroupMember](context, payload) {
      deleteGroupMember(payload)
    },
    [TYPES.actPutGroupManager](context, payload) {
      putGroupManager(payload)
    },
  },
  mutations: {
    [TYPES.setGroupList](state, payload) {
      state.groupList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
