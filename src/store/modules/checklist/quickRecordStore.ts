import {
  getQuickRecordList,
  putQuickRecordCount,
} from '@/api/checklist/quickRecord'
// import { makeModuleTypes } from '@/utils/store/index.js'

const MODULE_NAME = 'quickRecordStore'

enum TYPES {
  quickRecordList = 'quickRecordList',
  getQuickRecordList = 'getQuickRecordList',
  actQuickRecordList = 'actQuickRecordList',
  setQuickRecordList = 'setQuickRecordList',
  actCountQuickRecord = 'actCountQuickRecord',
}

// const TYPES2: object = makeModuleTypes([
//   'quickRecordList',
//   'getQuickRecordList',
//   'actQuickRecordList',
//   'setQuickRecordList',
//   'actCountQuickRecord',
// ])

const module = {
  namespaced: true,
  state: {
    quickRecordList: [],
  },
  getters: {
    [TYPES.getQuickRecordList](state: any){
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
