import { postPet, getPetList, getPet } from '@api/pet/pet.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'petStore'
const TYPES = makeModuleTypes([
  'petList',
  'getPetList',
  'actPetList',
  'setPetList',

  'actPostPet',
])

const module = {
  namespaced: true,
  state: {
    petList: [],
  },
  getters: {
    [TYPES.getPetList](state) {
      return state.petList
    },
  },
  actions: {
    [TYPES.actPetList](context, payload) {
      const petList = getPetList()
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('petList', petList)
      // context.commt(TYPES.setPetList, petList)

      context.commit(TYPES.setPetList, [])
    },
    [TYPES.actPostPet](context, payload) {
      console.log(context, payload)
      postPet(payload).then((res) => console.log(res))
    },
  },
  mutations: {
    [TYPES.setPetList](state, payload) {
      state.petList = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
