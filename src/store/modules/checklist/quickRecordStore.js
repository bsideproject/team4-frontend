import {
  getQuickRecordList,
  putQuickRecordCount,
} from '@api/checklist/quickRecord.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'quickRecordStore'
const TYPES = makeModuleTypes([
  'quickRecordList',
  'getQuickRecordList',
  'actQuickRecordList',
  'setQuickRecordList',
  'actCountQuickRecord',
])

const module = {
  namespaced: true,
  state: {
    quickRecordList: [],
  },
  getters: {
    [TYPES.getQuickRecordList](state) {
      return state.quickRecordList
    },
  },
  actions: {
    [TYPES.actQuickRecordList](context, payload) {
      getQuickRecordList(payload).then((res) => {
        const { quickDetailList } = res.data?.data

        context.commit(TYPES.setQuickRecordList, quickDetailList || {})
      })
    },
    [TYPES.actCountQuickRecord](context, payload) {
      console.log(payload)
      putQuickRecordCount(payload).then((res) => {
        console.log(res)
      })
    },
  },
  mutations: {
    [TYPES.setQuickRecordList](state, payload) {
      state.quickRecordList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
