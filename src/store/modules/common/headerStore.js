import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'headerStore'
const TYPES = makeModuleTypes([
  'title',
  'getTitle',
  'setTitle',
  'headerType',
  'getHeaderType',
  'setHeaderType',
  'moreOptionList',
  'getMoreOptionList',
  'setMoreOptionList'
])
const module = {
  namespaced: true,
  state: {
    title: '',
    headerType: '',
    moreOptionList: []
  },
  getters: {
    [TYPES.getTitle](state) {
      return state.title
    },
    [TYPES.getHeaderType](state) {
      return state.headerType
    },
    [TYPES.getMoreOptionList](state) {
      return state.moreOptionList
    }
  },
  mutations: {
    [TYPES.setTitle](state, payload) {
      state.title = payload
    },
    [TYPES.setHeaderType](state, payload) {
      state.headerType = payload
    },
    [TYPES.setMoreOptionList](state, payload) {
      state.moreOptionList = payload
    }
  }
}

export {
  module,
  MODULE_NAME,
  TYPES
}