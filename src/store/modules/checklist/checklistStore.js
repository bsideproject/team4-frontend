// import { selectGroupList } from '@api/group/group.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'checklistStore'
const TYPES = makeModuleTypes([
    'quickRecordList',
    'getQuickRecordList',
    'selectQuickRecordList',
    'setQuickRecordList'
  ])

const module = {
  namespaced: true,
  state: {
    quickRecordList: []
  },
  getters: {
    [TYPES.getQuickRecordList](state) {
      return state.quickRecordList
    }
  },
  actions: {
    [TYPES.selectQuickRecordList](context, payload) {
      context.commit(TYPES.setQuickRecordList, [
        {
          quickId: '1', 
          name: '퀵기록명1', 
          count: 3, 
          total: 1, 
          explanation: '퀵기록 설명1', 
          order: 1
        },
        {
          quickId: '2', 
          name: '퀵기록명2', 
          count: 3, 
          total: 2, 
          explanation: '퀵기록 설명2', 
          order: 2
        },
        {
          quickId: '3', 
          name: '퀵기록명3', 
          count: 3, 
          total: 3, 
          explanation: '퀵기록 설명3', 
          order: 3
        },
        {
          quickId: '4', 
          name: '퀵기록명4', 
          count: 3, 
          total: 1, 
          explanation: '퀵기록 설명4', 
          order: 4
        },
      ])
    
    }
  },
  mutations: {
    [TYPES.setQuickRecordList](state, payload) {
      state.quickRecordList = payload
    }
  }
}

export {
  module,
  MODULE_NAME,
  TYPES
}