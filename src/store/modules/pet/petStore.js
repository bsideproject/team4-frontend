import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'petStore'
const TYPES = makeModuleTypes([
  'petList',
  'getPetList',
  'actPetList',
  'setPetList',
])

const module = {
  namespaced: true,
  state: {
    petList: [],
  },
  getters: {},
  actions: {},
  mutations: {},
}

export { module, MODULE_NAME, TYPES }
