import { makeModuleTypes } from '@/utils/store/index'

const MODULE_NAME = 'headerStore'
const TYPES = makeModuleTypes([
  'title',
  'headerType',
  'moreOptionList',
  'weeklyCalendarDate',
  'isFixed',

  'getTitle',
  'getHeaderType',
  'getMoreOptionList',
  'getWeeklyCalendarDate',
  'getIsFixed',
  
  'setTitle',
  'setHeaderType',
  'setMoreOptionList',
  'setWeeklyCalendarDate',
  'setIsFixed'
])
type TYPES = typeof TYPES[keyof typeof TYPES]
type optionListType = Array<{title: string, callback: () => void}>
interface State {
  title: string,
  headerType: string,
  moreOptionList: optionListType,
  weeklyCalendarDate: Date,
  isFixed: boolean
}

const module = {
  namespaced: true,
  state: {
    title: '',
    headerType: '',
    moreOptionList: [],
    weeklyCalendarDate: new Date(),
    isFixed: false
  },
  getters: {
    [TYPES.getTitle](state: State) {
      return state.title
    },
    [TYPES.getHeaderType](state: State) {
      return state.headerType
    },
    [TYPES.getMoreOptionList](state: State) {
      return state.moreOptionList
    },
    [TYPES.getWeeklyCalendarDate](state: State) {
      return state.weeklyCalendarDate
    },
    [TYPES.getIsFixed](state: State) {
      return state.isFixed
    }
  },
  mutations: {
    [TYPES.setTitle](state: State, payload: string) {
      state.title = payload
    },
    [TYPES.setHeaderType](state: State, payload: string) {
      state.headerType = payload
    },
    [TYPES.setMoreOptionList](state: State, payload: optionListType) {
      state.moreOptionList = payload
    },
    [TYPES.setWeeklyCalendarDate](state: State, payload: Date) {
      state.weeklyCalendarDate = payload
    },
    [TYPES.setIsFixed](state: State, payload: boolean) {
      state.isFixed = payload
    }
  },
}

export { module, MODULE_NAME, TYPES }
