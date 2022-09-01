<template>
  <section class="todo">
    <article class="todo__form">
      <div>
        <label for="title">제목</label>
        <input
          name="title"
          v-model="title"
          placeholder="할 일 제목을 입력해주세요"
        />
      </div>
      <div class="todo__date-area">
        <label for="date">날짜</label>
        <span></span>
        <input name="date" v-model="date" readonly @click="clickDate" />
        <calendar
          ref="compCalendar"
          id="todoCalendar"
          @change="changeCalendar"
        />
      </div>
    </article>
    <article class="todo__repeat">
      <div
        :class="['todo__repeat-title', isRepeatable ? 'on' : '']"
        @click="clickRepeatable"
      >
        <span class="bk-bold">반복 설정</span>
        <span class="pr-regular">없음</span>
      </div>
      <div class="todo__repeat-area" v-if="isRepeatable">
        <div class="todo__repeat-tab">
          <ul>
            <li
              :class="[repeatTab === 'none' ? 'on' : '']"
              @click="() => clickRepeatTab('none')"
            >
              없음
            </li>
            <li
              :class="[repeatTab === 'everyDay' ? 'on' : '']"
              @click="() => clickRepeatTab('everyDay')"
            >
              매일
            </li>
            <li
              :class="[repeatTab === 'everyWeek' ? 'on' : '']"
              @click="() => clickRepeatTab('everyWeek')"
            >
              매주
            </li>
            <li
              :class="[repeatTab === 'everyMonth' ? 'on' : '']"
              @click="() => clickRepeatTab('everyMonth')"
            >
              매월
            </li>
            <li
              :class="[repeatTab === 'everyYear' ? 'on' : '']"
              @click="() => clickRepeatTab('everyYear')"
            >
              매년
            </li>
          </ul>
        </div>
        <div class="todo__tab-none" v-if="repeatTab === 'none'">
          반복 설정 없음
        </div>
        <div class="todo__tab-every-day" v-else-if="repeatTab === 'everyDay'">
          <input type="text" value="1" /> 일 마다
        </div>
        <div class="todo__tab-every-week" v-else-if="repeatTab === 'everyWeek'">
          <ul>
            <li>월</li>
            <li>화</li>
            <li>수</li>
            <li>목</li>
            <li>금</li>
            <li>토</li>
            <li>일</li>
          </ul>
        </div>
        <div
          class="todo__tab-every-month"
          v-else-if="repeatTab === 'everyMonth'"
        >
          <div>
            <input type="checkbox" id="byDay" name="everyMonth" value="byDay" />
            <label for="byDay">매월 25일 반복</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="byWeek"
              name="everyMonth"
              value="byWeek"
            />
            <label for="byWeek">매월 3주차 목요일 반복</label>
          </div>
        </div>
        <div class="todo__tab-every-year" v-else-if="repeatTab === 'everyYear'">
          매년 반복 설정
        </div>
      </div>
      <div class="todo__repeat-complete">할 일 완료</div>
    </article>
  </section>
</template>

<script setup>
import Calendar from '@components/common/Calendar.vue'
import { ref } from 'vue'
import { dateToStringFormat } from '@utils/common/index.js'

const compCalendar = ref(null)
const title = ref('')
const date = ref(dateToStringFormat(new Date()))
const isRepeatable = ref(false)
const repeatTab = ref('none')

const clickDate = () => {
  compCalendar.value.openCalendar()
}
const changeCalendar = (value) => {
  date.value = value
}
const clickRepeatTab = (value) => {
  repeatTab.value = value
}
const clickRepeatable = () => {
  isRepeatable.value = !isRepeatable.value
}
</script>

<style lang="scss" scoped>
@import '@styles/checklist/todo.scss';
</style>