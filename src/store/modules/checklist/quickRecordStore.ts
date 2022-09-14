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
  'setCountOne'
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
      return putQuickRecordCount(payload)
        .then((res: AxiosResponse<Success>) => {
          const {code, message, data } = res.data

          if (code === '309') {
            context.commit(TYPES.setCountOne, data?.quickId)
          } else {
            throw new Error(message)
          }
        })
    },
  },
  mutations: {
    [TYPES.setQuickRecordList](state: State, payload: Array<QuickRecord>) {
      state.quickRecordList = payload
    },
    [TYPES.setCountOne](state: State, payload: number) {
      state.quickRecordList = state.quickRecordList.map(qr => {
        if (qr.quickId === payload) {
          qr.count++;
        }
        return qr
      })
    }
  },
}

export { module, MODULE_NAME, TYPES }
