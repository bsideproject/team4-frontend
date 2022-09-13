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

const MODULE_NAME = 'petStore'
enum TYPES {
  pet = 'pet',
  getPet = 'getPet',
  actPet = 'actPet',
  setPet = 'setPet',

  mainPetId = 'mainPetId',
  getMainPetId = 'getMainPetId',
  setMainPetId = 'setMainPetId',

  totalPetNumber = 'totalPetNumber',
  getTotalPetNumber = 'getTotalPetNumber',
  setTotalPetNumber = 'setTotalPetNumber',

  petList = 'petList',
  getPetList = 'getPetList',
  actPetList = 'actPetList',
  setPetList = 'setPetList',

  actPostPet = 'actPostPet',
  actPutMainPet = 'actPutMainPet',
  actPostSharePet = 'actPostSharePet',

  actPutPet = 'actPutPet',
  actPutDeactivatePet = 'actPutDeactivatePet',
  actDeletePet = 'actDeletePet',
}

// const TYPES = makeModuleTypes([
//   'pet',
//   'getPet',
//   'actPet',
//   'setPet',

//   'mainPetId',
//   'getMainPetId',
//   'setMainPetId',

//   'totalPetNumber',
//   'getTotalPetNumber',
//   'setTotalPetNumber',

//   'petList',
//   'getPetList',
//   'actPetList',
//   'setPetList',

//   'actPostPet',
//   'actPutMainPet',
//   'actPostSharePet',

//   'actPutPet',
//   'actPutDeactivatePet',
//   'actDeletePet',
// ])

const module = {
  namespaced: true,
  state: {
    pet: {},
    mainPetId: '',
    totalPetNumber: 0,
    petList: [],
  },
  getters: {
    [TYPES.getPet](state: any) {
      return state.pet
    },
    [TYPES.getPetList](state: any) {
      return state.petList
    },
    [TYPES.getMainPetId](state: any) {
      return state.mainPetId
    },
    [TYPES.getTotalPetNumber](state: any) {
      return state.totalPetNumber
    },
  },
  actions: {
    [TYPES.actPet](context: any, payload: any) {
      return getPet(payload).then((res: any) => {
        const { code, message, data } = res.data

        if (code === '202') {
          context.commit(TYPES.setPet, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPetList](context: any, payload: any) {
      return getPetList()
        .then((res: any) => {
          const { code, message, data } = res.data

          if (code === '203') {
            const { mainPetId, totalPetNumber, petList } = data

            context.commit(TYPES.setMainPetId, mainPetId || '')
            context.commit(TYPES.setTotalPetNumber, totalPetNumber || 0)
            context.commit(
              TYPES.setPetList,
              petList
                ?.map((pet: any) => {
                  pet.isMain = pet.petId === mainPetId
                  return pet
                })
                .sort((a: any, b: any) => b.isMain - a.isMain) || []
            )
          } else {
            throw new Error(message)
          }
        })
        .catch((err:any) => {
          console.log(err)
        })
    },
    [TYPES.actPostPet](context: any, payload: any) {
      return postPet(payload).then((res: any) => {
        const { code, message } = res.data
        if (code !== '201') {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPutMainPet](context: any, payload: any) {
      return putMainPet(payload).then((res: any) => {
        const { code, message } = res.data
        if (code === '209') {
          context.dispatch(TYPES.actPetList)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPostSharePet](context: any, payload: any) {
      return postSharePet(payload).then((res: any) => {
        const { code } = res.data
        if (code !== '208') {
          context.dispatch(TYPES.actPetList)
        }
      })
    },
    [TYPES.actPutPet](context: any, payload: any) {
      return putPet(payload).then((res: any) => {
        const { code, message, data } = res.data

        if (code === '204') {
          context.commit(TYPES.setPet, data)
        } else {
          throw new Error(message)
        }
      })
    },
    [TYPES.actPutDeactivatePet](context: any, payload: any) {
      return putDeactivatePet(payload).then((res: any) => {
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
    [TYPES.actDeletePet](context: any, payload: any) {
      return deletePet(payload).then((res: any) => {
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
    [TYPES.setPet](state: any, payload: any) {
      state.pet = payload
    },
    [TYPES.setPetList](state: any, payload: any) {
      state.petList = payload
    },
    [TYPES.setMainPetId](state: any, payload: any) {
      state.mainPetId = payload
    },
    [TYPES.setTotalPetNumber](state: any, payload: any) {
      state.totalPetNumber = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
