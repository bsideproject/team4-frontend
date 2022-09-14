import {
  getQuickRecordList,
  putQuickRecordCount,
} from '@/api/checklist/quickRecord'
import { makeModuleTypes } from '@/utils/store/index'
import { QuickRecord } from '@/types/checklist'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'

const MODULE_NAME = 'quickRecordStore'
const TYPES = makeModuleTypes([
  'quickRecordList',
  'getQuickRecordList',
  'actQuickRecordList',
  'setQuickRecordList',
  'actCountQuickRecord',
])
type TYPES = typeof TYPES[keyof typeof TYPES]

interface State {
  quickRecordList: Array<QuickRecord>
}

const module = {
  namespaced: true,
  state: {
    quickRecordList: [],
  },
  getters: {
    [TYPES.getQuickRecordList](state: State) {
      return state.quickRecordList
    },
  },
  actions: {
    [TYPES.actQuickRecordList](context: any, payload: string) {
      getQuickRecordList(payload).then((res: AxiosResponse<Success>) => {
        const { quickDetailList } = res.data?.data

        context.commit(TYPES.setQuickRecordList, quickDetailList || {})
      })
    },
    [TYPES.actCountQuickRecord](context: any, payload: number) {
      console.log(payload)
      putQuickRecordCount(payload).then((res: AxiosResponse<Success>) => {
        console.log(res)
      })
    },
  },
  mutations: {
    [TYPES.setQuickRecordList](state: State, payload: Array<QuickRecord>) {
      state.quickRecordList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
