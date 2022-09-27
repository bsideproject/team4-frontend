import { getOneLineDiaryList, saveOneLineDiary, modifyOneLineDiary, deleteOneLineDiary } from '@/api/nurture/oneLineDiary'
import { makeModuleTypes } from '@/utils/store/index'
import { OneLineDiary } from '@/types/oneLineDiary'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'
import { Commit, Dispatch } from 'vuex'

const MODULE_NAME = 'oneLineDiaryStore'
const TYPES = makeModuleTypes([
  'oneLineDiaryList',

  'getOneLineDiaryList',
  
  'fetchSaveOneLineDiary',
  'fetchModifyOneLineDiary',
  'fetchDeleteOneLineDiary',
  
  'setOneLineDiaryList',
])
type TYPES = typeof TYPES[keyof typeof TYPES]; 

interface State {
  oneLineDiaryList: Array<OneLineDiary>,
}

const module = {
  namespaced: true,
  state: {
    oneLineDiaryList: [],
  },
  getters: {
    [TYPES.getOneLineDiaryList](state: State) {
      return state.oneLineDiaryList
    },
  },
  actions: {
    [TYPES.getOneLineDiaryList]({ commit, }: {commit: Commit}, payload: number) {
      return getOneLineDiaryList(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data
          if (code === '502') {
            commit(TYPES.setOneLineDiaryList, data.petDiaryList)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.fetchSaveOneLineDiary]({ dispatch, }: {dispatch: Dispatch}, payload: OneLineDiary) {
      return saveOneLineDiary(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message } = res.data

          if (code === '501') {
            dispatch(TYPES.getOneLineDiaryList, payload.petId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.fetchModifyOneLineDiary]({ dispatch, }: {dispatch: Dispatch}, payload: OneLineDiary) {
      return modifyOneLineDiary(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message } = res.data

          if (code === '503') {
            dispatch(TYPES.getOneLineDiaryList, payload.petId)
          } else {
            throw new Error(message)
          }
        })
    },
    [TYPES.fetchDeleteOneLineDiary]({ dispatch, }: {dispatch: Dispatch}, payload: { petId: number, diaryId: number }) {
      return deleteOneLineDiary(payload)
        .then((res: AxiosResponse<Success>) => {
          const { code, message } = res.data

          if (code === '504') {
            dispatch(TYPES.getOneLineDiaryList, payload.petId)
          } else {
            throw new Error(message)
          }
        })
    }
  },
  mutations: {
    [TYPES.setOneLineDiaryList](state: State, payload: Array<OneLineDiary>) {
      state.oneLineDiaryList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
