import { makeModuleTypes } from '@/utils/store/index'

const MODULE_NAME = 'headerStore'
const TYPES = makeModuleTypes([
  'title',
  'getTitle',
  'setTitle',
  'headerType',
  'getHeaderType',
  'setHeaderType',
  'moreOptionList',
  'getMoreOptionList',
  'setMoreOptionList',

  'weeklyCalendarDate',
  'getWeeklyCalendarDate',
  'setWeeklyCalendarDate',
])
type TYPES = typeof TYPES[keyof typeof TYPES]
type optionListType = Array<{title: string, callback: () => void}>
interface State {
  title: string,
  headerType: string,
  moreOptionList: optionListType,
  weeklyCalendarDate: Date,
}

const module = {
  namespaced: true,
  state: {
    title: '',
    headerType: '',
    moreOptionList: [],
    weeklyCalendarDate: new Date(),
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
  },
}

export { module, MODULE_NAME, TYPES }
