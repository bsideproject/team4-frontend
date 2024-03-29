<template>
  <section class="todo">
    <article class="todo__form">
      <div>
        <label for="title">제목</label>
        <input
          name="title"
          v-model="todo.title"
          placeholder="할 일 제목을 입력해주세요"
        />
      </div>
      <div class="todo__date-area">
        <label for="date">날짜</label>
        <span></span>
        <input
          class="datepicker"
          name="date"
          v-model="todo.date"
          readonly
          @click="clickDate"
        />
        <calendar
          ref="compCalendar"
          id="todoCalendar"
          @change="changeCalendar"
        />
      </div>
    </article>
    <article class="todo__repeat">
      <div
        :class="['todo__repeat-title', todo.isRepeated ? 'on' : '']"
        @click="clickRepeatable"
      >
        <span class="bk-bold">반복 설정</span>
        <span class="pr-regular" v-if="repeatTab === tabData[0].value"
          >없음</span
        >
        <span class="pr-regular" v-else-if="repeatTab === tabData[1].value"
          >매일 반복</span
        >
        <span class="pr-regular" v-else-if="repeatTab === tabData[2].value"
          >매주
          {{
            weekData
              .filter((w) => w.checked)
              .map((w) => w.name)
              .join(',')
          }}
          반복</span
        >
        <span
          class="pr-regular"
          v-else-if="repeatTab === tabData[3].value && byDay"
          >매월 {{ todo.repeatDetail.eventDay }}일 반복</span
        >
        <span
          class="pr-regular"
          v-else-if="repeatTab === tabData[3].value && byWeek"
          >매월 {{ todo.repeatDetail.eventWeek }}주차
          {{
            weekData.find((w) => w.value === todo.repeatDetail.eventDate).name
          }}요일 반복</span
        >
        <span class="pr-regular" v-else-if="repeatTab === tabData[4].value"
          >매년 반복</span
        >
      </div>
      <div class="todo__repeat-area" v-if="todo.isRepeated">
        <div class="todo__repeat-tab">
          <ul>
            <li
              v-for="(item, index) in tabData"
              :key="index"
              :class="[repeatTab === item.value ? 'on' : '']"
              @click="() => clickRepeatTab(item.value)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="todo__tab-none" v-if="repeatTab === tabData[0].value">
          반복 설정 없음
        </div>
        <div
          class="todo__tab-every-year"
          v-else-if="repeatTab === tabData[1].value"
        >
          <!-- <input type="text" v-model="todo.repeatDetail.eventDay" /> 일 마다 -->
          매일 반복 설정
        </div>
        <div
          class="todo__tab-every-week"
          v-else-if="repeatTab === tabData[2].value"
        >
          <ul>
            <li
              :class="[item.checked ? 'on' : '']"
              v-for="(item, index) in weekData"
              :key="index"
              @click="() => clickWeekData(item.value)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div
          class="todo__tab-every-month"
          v-else-if="repeatTab === tabData[3].value"
        >
          <div>
            <input
              type="checkbox"
              id="byDay"
              name="byDay"
              v-model="byDay"
              @change="changeMonthlyByDay"
            />
            <label for="byDay">매월 {{ monthlyDate }}일 반복</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="byWeek"
              name="byWeek"
              v-model="byWeek"
              @change="changeMonthlyByWeek"
            />
            <label for="byWeek"
              >매월 {{ monthlyWeek }}주차 {{ monthlyDay }}요일 반복</label
            >
          </div>
        </div>
        <div
          class="todo__tab-every-year"
          v-else-if="repeatTab === tabData[4].value"
        >
          매년 반복 설정
        </div>
        <div v-if="repeatTab !== 'none'">
          <div class="todo__ended-area">
            <input
              type="checkbox"
              name="isRepeatEnded"
              v-model="isRepeatEnded"
            />
            <label for="isRepeatEnded">반복 종료일</label>
            <input
              v-if="isRepeatEnded"
              type="text"
              class="datepicker"
              name="date"
              v-model="todo.repeatDetail.endedAt"
              readonly
              @click="clickEndedDate"
            />
            <calendar
              ref="compRepeatEndedCalendar"
              id="repeatEndedCalendar"
              @change="changeRepeatEndedCalendar"
            />
          </div>
        </div>
      </div>
      <div
        :class="['todo__repeat-complete', todo.isDone ? 'on' : '']"
        @click="clickTodoDone"
      >
        할 일 완료
      </div>
    </article>
    <article>
      <button class="btn-lg-enabled" v-if="getOnEdit" @click="clickSaveTodo">
        저장하기
      </button>
      <button class="btn-lg-disabled" v-else>저장하기</button>
    </article>
  </section>
  <bottom-sheet ref="todoEditBottomSheet" :option-list="editOption" />
</template>

<script setup>
import Calendar from '@/components/common/Calendar.vue'
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue'
import {
  dateToStringFormat,
  getWeekNumber,
  stringToDate,
} from '@/utils/common/index'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_TODO,
  TYPES as TY_TODO,
} from '@/store/modules/checklist/todoStore'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
import { useToast } from 'vue-toast-notification'
import ROUTE from '@/constants/route'
import { _confirm } from '@/utils/common'

const instance = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const store = useStore()
const toast = useToast()
const todoEditBottomSheet = ref(null)
const compCalendar = ref(null)
const compRepeatEndedCalendar = ref(null)
const isRepeatEnded = ref(false)
const repeatTab = ref('none')
const byDay = ref(false)
const byWeek = ref(false)
const tabData = ref([])
const weekData = ref([])
const editOption = ref([])
const monthlyDate = ref('')
const monthlyDay = ref('')
const monthlyWeek = ref('')
const todo = reactive({
  checklistId: '',
  title: '',
  date: dateToStringFormat(new Date()),
  isDone: false,
  isRepeated: false,
  repeatDetail: {
    eventPeriod: repeatTab.value,
    eventDate: null,
    eventMonth: null,
    eventDay: null,
    eventWeek: null,
    // startedAt: [],
    endedAt: null,
  },
})
toRefs(todo)
tabData.value = [
  { name: '없음', value: 'none' },
  { name: '매일', value: 'daily' },
  { name: '매주', value: 'weekly' },
  { name: '매월', value: 'monthly' },
  { name: '매년', value: 'yearly' },
]
weekData.value = [
  { name: '일', checked: false, value: 'SUNDAY' },
  { name: '월', checked: false, value: 'MONDAY' },
  { name: '화', checked: false, value: 'TUESDAY' },
  { name: '수', checked: false, value: 'WEDNESDAY' },
  { name: '목', checked: false, value: 'THURSDAY' },
  { name: '금', checked: false, value: 'FRIDAY' },
  { name: '토', checked: false, value: 'SATURDAY' },
]
editOption.value = [
  {
    title: '이 일정만 수정',
    callback: () => {
      editTodo(todo, 'onlyThis')
    },
  },
  {
    title: '이후 일정 수정',
    callback: () => {
      editTodo(todo, 'afterThis')
    },
  },
  {
    title: '전체 일정 수정',
    callback: () => {
      editTodo(todo, 'all')
    },
  },
]

const getTodo = computed(() => store.getters[`${MN_TODO}/${TY_TODO.getTodo}`])
const getOnEdit = computed(() => {
  if (todo.isRepeated) {
    if (
      repeatTab.value === tabData.value[2].value &&
      weekData.value.every((w) => !w.checked)
    ) {
      return false
    } else if (
      repeatTab.value === tabData.value[3].value &&
      !byDay.value &&
      !byWeek.value
    ) {
      return false
    }

    if (isRepeatEnded.value && !todo.repeatDetail.endedAt) {
      return false
    }
  }
  return true
})

onMounted(async () => {
  const { todoId } = route.params

  await store.dispatch(`${MN_TODO}/${TY_TODO.fetchTodo}`, Number(todoId))
  Object.assign(todo, getTodo.value)
  todo.date = dateToStringFormat(new Date(getTodo.value.date))

  if (todo.isRepeated) {
    const eventPeriod = todo?.repeatDetail?.eventPeriod
    repeatTab.value = eventPeriod
    if (eventPeriod === tabData.value[2].value) {
      const weeklyDates = todo?.repeatDetail?.eventDate?.split(',')

      weekData.value = weekData.value.map((w) => {
        if (weeklyDates.includes(w.value)) {
          w.checked = true
        }
        return w
      })
    } else if (eventPeriod === tabData.value[3].value) {
      if (todo?.repeatDetail?.eventDay) {
        byDay.value = true
      } else if (
        todo?.repeatDetail?.eventDate &&
        todo?.repeatDetail?.eventWeek
      ) {
        byWeek.value = true
      }
    }
  } else {
    todo.repeatDetail = {
      eventPeriod: tabData.value[0],
      eventDate: null,
      eventMonth: null,
      eventDay: null,
      eventWeek: null,
      endedAt: null,
    }
  }
  if (todo.repeatDetail?.endedAt) {
    isRepeatEnded.value = true
  }

  store.commit(`${MN_HEADER}/${TY_HEADER.setMoreOptionList}`, [
    {
      title: '할 일 삭제',
      callback: () => {
        _confirm(instance, {
          text: '할 일을 삭제하시겠습니까?',
          ok: {
            label: '네',
            callback: () => {
              store
                .dispatch(`${MN_TODO}/${TY_TODO.deleteTodo}`, {
                  data: {
                    checklistId: todo.checklistId,
                    date: dateToStringFormat(stringToDate(todo.date), '-'),
                  },
                  deleteType: 'all',
                })
                .then(() => {
                  router.replace({ name: ROUTE.Main })
                })
            },
          },
          cancel: {
            label: '아니오',
          },
          style: {
            height: 100,
          },
        })
      },
    },
  ])
})

watch(
  () => repeatTab.value,
  (newValue) => {
    // weekData.value.map((w) => (w.checked = false))
    // byDay.value = false
    // byWeek.value = false
    if (newValue === 'monthly') {
      const todoDate = stringToDate(todo.date)
      const day = todoDate.getDay()
      monthlyDate.value = todoDate.getDate()
      monthlyWeek.value = getWeekNumber(todoDate)
      monthlyDay.value = weekData.value[day].name
    }
  }
)
watch(
  () => byDay.value,
  (newValue) => {
    if (newValue) {
      byWeek.value = false
      todo.repeatDetail.eventDate = null
      todo.repeatDetail.eventWeek = null
      const todoDate = stringToDate(todo.date)
      todo.repeatDetail.eventDay = todoDate.getDate()
    }
  }
)
watch(
  () => byWeek.value,
  (newValue) => {
    if (newValue) {
      byDay.value = false
      todo.repeatDetail.eventDay = null
      const todoDate = stringToDate(todo.date)
      todo.repeatDetail.eventDate = weekData.value[todoDate.getDay()].value
      todo.repeatDetail.eventWeek = getWeekNumber(todoDate)
    }
  }
)
const clickDate = () => {
  compCalendar.value.openCalendar()
}
const clickEndedDate = () => {
  compRepeatEndedCalendar.value.openCalendar()
}
const changeCalendar = (value) => {
  todo.date = value
}
const changeRepeatEndedCalendar = (value) => {
  todo.repeatDetail.endedAt = value
}
const clickRepeatTab = (value) => {
  repeatTab.value = value
}
const clickRepeatable = () => {
  todo.isRepeated = !todo.isRepeated
}
const clickWeekData = (value) => {
  weekData.value
    .filter((w) => w.value === value)
    .map((w) => (w.checked = !w.checked))
}
const clickTodoDone = () => {
  todo.isDone = !todo.isDone
}
const clickSaveTodo = () => {
  todo.repeatDetail.eventPeriod = repeatTab.value
  if (repeatTab.value === tabData.value[2].value) {
    todo.repeatDetail.eventDate = weekData.value
      .filter((w) => w.checked)
      .map((w) => w.value)
      .join(',')
  } else if (repeatTab.value === tabData.value[3].value) {
    const todoDate = stringToDate(todo.date)

    if (byDay.value) {
      todo.repeatDetail.eventDay = todoDate.getDate()
    } else if (byWeek.value) {
      todo.repeatDetail.eventDate = weekData.value[todoDate.getDay()].value
      todo.repeatDetail.eventWeek = getWeekNumber(todoDate)
    }
  }

  if (todo.date) {
    todo.date = dateToStringFormat(stringToDate(todo.date), '-')
  }
  if (todo.repeatDetail.endedAt) {
    todo.repeatDetail.endedAt = dateToStringFormat(
      stringToDate(todo.repeatDetail.endedAt),
      '-'
    )
  }

  if (todo.isRepeated) {
    todoEditBottomSheet.value.openBottomSheet()
  } else {
    editTodo(todo, 'none')
  }
}

const editTodo = (data, modifyType) => {
  store
    .dispatch(`${MN_TODO}/${TY_TODO.fetchModifyTodo}`, {
      data,
      modifyType,
    })
    .then(() => {
      toast.clear()
      toast.open({
        type: 'success',
        message: '할 일이 수정되었습니다.',
        position: 'bottom',
      })
      router.replace({ name: ROUTE.Main })
    })
}
</script>

<style lang="scss" scoped>
@import '@styles/checklist/todo.scss';
</style>