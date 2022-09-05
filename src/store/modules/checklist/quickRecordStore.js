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
      getQuickRecordList()
      context.commit(TYPES.setQuickRecordList, [
        {
          quickId: '1',
          name: '퀵기록명1',
          count: 1,
          total: 3,
          explanation: '퀵기록 설명1',
          order: 1,
        },
        {
          quickId: '2',
          name: '퀵기록명2',
          count: 2,
          total: 3,
          explanation: '퀵기록 설명2',
          order: 2,
        },
        {
          quickId: '3',
          name: '퀵기록명3',
          count: 3,
          total: 3,
          explanation: '퀵기록 설명3',
          order: 3,
        },
        {
          quickId: '4',
          name: '퀵기록명4',
          count: 4,
          total: 4,
          explanation: '퀵기록 설명4',
          order: 4,
        },
      ])
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
