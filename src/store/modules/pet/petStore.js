import {
  postPet,
  getPetList,
  getPet,
  putMainPet,
  postSharePet,
} from '@api/pet/pet.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'petStore'
const TYPES = makeModuleTypes([
  'mainPetId',
  'getMainPetId',
  'setMainPetId',

  'totalPetNumber',
  'getTotalPetNumber',
  'setTotalPetNumber',

  'petList',
  'getPetList',
  'actPetList',
  'setPetList',

  'actPostPet',
  'actPutMainPet',
  'actPostSharePet',
])

const module = {
  namespaced: true,
  state: {
    mainPetId: '',
    totalPetNumber: 0,
    petList: [],
  },
  getters: {
    [TYPES.getPetList](state) {
      return state.petList
    },
    [TYPES.getMainPetId](state) {
      return state.mainPetId
    },
    [TYPES.getTotalPetNumber](state) {
      return state.totalPetNumber
    },
  },
  actions: {
    [TYPES.actPetList](context, payload) {
      return getPetList()
        .then((res) => {
          const { code, message, data } = res.data

          if (code === '203') {
            const { mainPetId, totalPetNumber, petList } = data

            context.commit(TYPES.setMainPetId, mainPetId || '')
            context.commit(TYPES.setTotalPetNumber, totalPetNumber || 0)
            context.commit(
              TYPES.setPetList,
              petList
                ?.map((pet) => {
                  pet.isMain = pet.petId === mainPetId
                  return pet
                })
                .sort((a, b) => b.isMain - a.isMain) || []
            )
          } else {
            throw new Error(message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [TYPES.actPostPet](context, payload) {
      return postPet(payload).then((res) => {
        const { code, message } = res.data
        if (code !== '201') {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPutMainPet](context, payload) {
      return putMainPet(payload).then((res) => {
        const { code, message } = res.data
        if (code === '209') {
          context.dispatch(TYPES.actPetList)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPostSharePet](context, payload) {
      return postSharePet(payload).then((res) => {
        const { code } = res.data
        if (code !== '208') {
          context.dispatch(TYPES.actPetList)
        }
      })
    },
  },
  mutations: {
    [TYPES.setPetList](state, payload) {
      state.petList = payload
    },
    [TYPES.setMainPetId](state, payload) {
      state.mainPetId = payload
    },
    [TYPES.setTotalPetNumber](state, payload) {
      state.totalPetNumber = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
