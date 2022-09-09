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
      getGroupMemberList(payload)
        .then((res) => {
          console.log(res)

          context.commit(TYPES.setGroupList, [])
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
