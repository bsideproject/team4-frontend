import {
  postPet,
  getPetList,
  getPet,
  putMainPet,
  postSharePet,
  putPet,
  putDeactivatePet,
  deletePet,
} from '@api/pet/pet.js'
import { makeModuleTypes } from '@utils/store/index.js'

const MODULE_NAME = 'petStore'
const TYPES = makeModuleTypes([
  'pet',
  'getPet',
  'actPet',
  'setPet',

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

  'actPutPet',
  'actPutDeactivatePet',
  'actDeletePet',
])

const module = {
  namespaced: true,
  state: {
    pet: {},
    mainPetId: '',
    totalPetNumber: 0,
    petList: [],
  },
  getters: {
    [TYPES.getPet](state) {
      return state.pet
    },
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
    [TYPES.actPet](context, payload) {
      return getPet(payload).then((res) => {
        const { code, message, data } = res.data

        if (code === '202') {
          context.commit(TYPES.setPet, data)
        } else {
          throw new Error(message)
        }
      })
    },
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
    [TYPES.actPutPet](context, payload) {
      return putPet(payload).then((res) => {
        const { code, message, data } = res.data

        if (code === '204') {
          context.commit(TYPES.setPet, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPutDeactivatePet](context, payload) {
      return putDeactivatePet(payload).then((res) => {
        const { code, message } = res.data
        if (code === '205') {
          /**
           * TODO 펫 기록 중지 성공시
           */
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actDeletePet](context, payload) {
      return deletePet(payload).then((res) => {
        const { code, message } = res.data

        if (code === '207') {
          context.commit(TYPES.setPet, {})
          context.dispatch(TYPES.getPetList)
        } else {
          throw new Error(message)
        }
      })
    },
  },
  mutations: {
    [TYPES.setPet](state, payload) {
      state.pet = payload
    },
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
