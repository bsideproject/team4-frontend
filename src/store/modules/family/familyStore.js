import { selectFamilyList } from '@api/family/family.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'familyStore'
const TYPES = makeModuleTypes([
    'familyList',
    'getFamilyList',
    'selectFamilyList',
    'setFamilyList'
  ])

const module = {
  namespaced: true,
  state: {
    familyList: []
  },
  getters: {
    [TYPES.getFamilyList](state) {
      return state.familyList
    }
  },
  actions: {
    [TYPES.selectFamilyList](context, payload) {
      context.commit(TYPES.setFamilyList, [
        {
          name: '엄마',
          image: '',
        },
        {
          name: '아빠',
          image: '',
        },
        {
          name: '동생',
          image: '',
        },
      ])
      selectFamilyList(payload)
      .then(data => {
        console.log(data)

      }).catch(error => {
        console.log(error)
      })
    }
  },
  mutations: {
    [TYPES.setFamilyList](state, payload) {
      state.familyList = payload
    }
  }
}

export {
  module,
  MODULE_NAME,
  TYPES
}