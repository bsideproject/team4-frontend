import {
  postPet,
  getPetList,
  getPet,
  putMainPet,
  postSharePet,
  putPet,
  putDeactivatePet,
  deletePet,
} from '@/api/pet/pet'
import { makeModuleTypes } from '@/utils/store/index'
import { Pet } from '@/types/pet'
import { Success } from '@/types/response'
import { AxiosResponse } from 'axios'

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
type TYPES = typeof TYPES[keyof typeof TYPES]

interface State {
  pet: object,
  mainPetId: string,
  totalPetNumber: number,
  petList: Array<object>,
}

const module = {
  namespaced: true,
  state: {
    pet: {},
    mainPetId: '',
    totalPetNumber: 0,
    petList: [],
  },
  getters: {
    [TYPES.getPet](state: State) {
      return state.pet
    },
    [TYPES.getPetList](state: State) {
      return state.petList
    },
    [TYPES.getMainPetId](state: State) {
      return state.mainPetId
    },
    [TYPES.getTotalPetNumber](state: State) {
      return state.totalPetNumber
    },
  },
  actions: {
    [TYPES.actPet](context: any, payload: string) {
      return getPet(payload).then((res: AxiosResponse<Success>) => {
        const { code, message, data } = res.data

        if (code === '202') {
          context.commit(TYPES.setPet, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPetList](context: any) {
      return getPetList()
        .then((res: AxiosResponse<Success>) => {
          const { code, message, data } = res.data

          if (code === '203') {
            const { mainPetId, totalPetNumber, petList } = data

            context.commit(TYPES.setMainPetId, mainPetId || '')
            context.commit(TYPES.setTotalPetNumber, totalPetNumber || 0)
            context.commit(
              TYPES.setPetList,
              petList
                ?.map((pet: Pet) => {
                  pet.isMain = pet.petId === mainPetId
                  return pet
                })
                .sort((a: any, b: any) => b.isMain - a.isMain) || []
            )
          } else {
            throw new Error(message)
          }
        })
     
    },
    [TYPES.actPostPet](context: any, payload: Pet) {
      return postPet(payload).then((res: AxiosResponse<Success>) => {
        const { code, message } = res.data
        if (code !== '201') {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPutMainPet](context: any, payload: Pet) {
      return putMainPet(payload).then((res: AxiosResponse<Success>) => {
        const { code, message } = res.data
        if (code === '209') {
          context.dispatch(TYPES.actPetList)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPostSharePet](context: any, payload: string) {
      return postSharePet(payload).then((res: AxiosResponse<Success>) => {
        const { code } = res.data
        if (code !== '208') {
          context.dispatch(TYPES.actPetList)
        }
      })
    },
    [TYPES.actPutPet](context: any, payload: Pet) {
      return putPet(payload).then((res: AxiosResponse<Success>) => {
        const { code, message, data } = res.data

        if (code === '204') {
          context.commit(TYPES.setPet, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPutDeactivatePet](context: any, payload: string) {
      return putDeactivatePet(payload).then((res: AxiosResponse<Success>) => {
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
    [TYPES.actDeletePet](context: any, payload: string) {
      return deletePet(payload).then((res: AxiosResponse<Success>) => {
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
    [TYPES.setPet](state: State, payload: Pet) {
      state.pet = payload
    },
    [TYPES.setPetList](state: State, payload: Array<Pet>) {
      state.petList = payload
    },
    [TYPES.setMainPetId](state: State, payload: string) {
      state.mainPetId = payload
    },
    [TYPES.setTotalPetNumber](state: State, payload: number) {
      state.totalPetNumber = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
