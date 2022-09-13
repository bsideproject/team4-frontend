import {
  getQuickRecordList,
  putQuickRecordCount,
} from '@/api/checklist/quickRecord'
import { makeModuleTypes } from '@/utils/store/index'

const MODULE_NAME = 'quickRecordStore'

const TYPES = makeModuleTypes([
  'quickRecordList',
  'getQuickRecordList',
  'actQuickRecordList',
  'setQuickRecordList',
  'actCountQuickRecord',
])
type TYPES = typeof TYPES[keyof typeof TYPES]

const module = {
  namespaced: true,
  state: {
    quickRecordList: [],
  },
  getters: {
    [TYPES.getQuickRecordList](state: any) {
      return state.quickRecordList
    },
  },
  actions: {
    [TYPES.actQuickRecordList](context: any, payload: any) {
      getQuickRecordList(payload).then((res: any) => {
        const { quickDetailList } = res.data?.data

        context.commit(TYPES.setQuickRecordList, quickDetailList || {})
      })
    },
    [TYPES.actCountQuickRecord](context: any, payload: any) {
      console.log(payload)
      putQuickRecordCount(payload).then((res: any) => {
        console.log(res)
      })
    },
  },
  mutations: {
    [TYPES.setQuickRecordList](state: any, payload: any) {
      state.quickRecordList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
