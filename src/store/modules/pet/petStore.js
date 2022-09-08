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
    petList: [
      // private Long petId;
      // private String name;
      // private PetShareScope shareScope;
      // private Long userId; // 펫 소유 사용자
      // private Long familyId; // 펫 공유 가족
      // private PetGender gender;
      // private String breed;
      // private String birthday;
      // private Long age;
      // private String adoptionDate;
      // private String animalRegistrationNumber;
    ],
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
      const petList = getPetList()
        .then((res) => {
          console.log(res)
          const { mainPetId, totalPetNumber, petList } = res.data?.data

          for (let pet of petList) {
            pet.isMain = pet.petId === mainPetId
          }
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
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [TYPES.actPostPet](context, payload) {
      console.log(context, payload)
      return postPet(payload).then((res) => {
        const { code } = res.data
        if (code === '201') {
          return true
        } else {
          return false
        }
      })
    },
    [TYPES.actPutMainPet](context, payload) {
      putMainPet(payload).then((res) => {
        console.log(res)

        context.dispatch(TYPES.actPetList)
      })
    },
    [TYPES.actPostSharePet](context, payload) {
      postSharePet(payload).then((res) => {
        console.log(res)

        context.dispatch(TYPES.actPetList)
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
