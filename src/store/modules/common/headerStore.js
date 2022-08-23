import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'headerStore'
const TYPES = makeModuleTypes([
  'title',
  'getTitle',
  'setTitle',
  'headerType',
  'getHeaderType',
  'setHeaderType'
])
const module = {
  namespaced: true,
  state: {
    title: '',
    headerType: ''
  },
  getters: {
    [TYPES.getTitle](state) {
      return state.title
    },
    [TYPES.getHeaderType](state) {
      return state.headerType
    }
  },
  mutations: {
    [TYPES.setTitle](state, payload) {
      state.title = payload
    },
    [TYPES.setHeaderType](state, payload) {
      state.headerType = payload
    }
  }
}

export {
  module,
  MODULE_NAME,
  TYPES
}