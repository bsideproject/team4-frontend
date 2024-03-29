import {
  getQuickRecordList,
  modifyQuickRecord,
  modifyQuickRecordCount,
} from '@/api/checklist/quickRecord'
import { makeModuleTypes } from '@/utils/store/index'
import { QuickRecord } from '@/types/checklist'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'
import { Commit } from 'vuex'

const MODULE_NAME = 'quickRecordStore'
const TYPES = makeModuleTypes([
  'quickRecordList',
  
  'getQuickRecordList',
  
  'fetchQuickRecordList',
  'fetchModifyQuickRecord',
  'fetchModifyQuickRecordCount',

  'setQuickRecordList',
  'setCountOne',
  'setQuickRecord'
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
    [TYPES.fetchQuickRecordList]({ commit }: {commit: Commit}, payload: string) {
      getQuickRecordList(payload).then((res: AxiosResponse<Success>) => {
        const { quickDetailList } = res.data?.data

        commit(TYPES.setQuickRecordList, quickDetailList || [])
      })
    },
    [TYPES.fetchModifyQuickRecordCount]({ commit }: {commit: Commit}, payload: { quickId: number, date: string }) {
      return modifyQuickRecordCount(payload)
        .then((res: AxiosResponse<Success>) => {
          const {code, message, data } = res.data

          if (code === '309') {
            commit(TYPES.setCountOne, data?.quickId)
          } else {
            throw new Error(message)
          }
        })
    },
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    [TYPES.fetchModifyQuickRecord]({ commit }: {commit: Commit}, payload: QuickRecord) {
      return modifyQuickRecord(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message } = res.data

          if (code === '305') {
            /**
             * 퀵기록 성공시
             */
          } else {
            throw new Error(message)
          }
        })
    }
  },
  mutations: {
    [TYPES.setQuickRecordList](state: State, payload: Array<QuickRecord>) {
      state.quickRecordList = payload?.sort((a, b) => {
        if (a.order > b.order) {
          return 1
        } else {
          return -1
        }
      })
    },
    [TYPES.setCountOne](state: State, payload: number) {
      state.quickRecordList = state.quickRecordList.map(qr => {
        if (qr.quickId === payload) {
          qr.count++;
        }
        return qr
      })
    },
    [TYPES.setQuickRecord](state: State, payload: QuickRecord) {
      state.quickRecordList = state.quickRecordList.map(qr => {
        if (qr.quickId === payload.quickId) {
          qr = payload
        }
        return qr
      })
    }
  },
}

export { module, MODULE_NAME, TYPES }
