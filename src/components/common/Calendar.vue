<template>
  <section class="calendar" v-if="isOpen">
    <article class="calendar__dimmed" @click="clickDimmed"></article>
    <article class="calendar__datepicker">
      <Datepicker
        :id="uid"
        v-model="picked"
        weekStart="0"
        locale="ko"
        :enableTimePicker="false"
        inline
        autoApply
        :maxDate="maxDate"
      />
    </article>
  </section>
</template>

<script setup>
import {
  defineProps,
  defineEmits,
  defineExpose,
  ref,
  watch,
  getCurrentInstance,
  onMounted,
} from 'vue'
import { dateToStringFormat } from '@/utils/common/index'

const props = defineProps({
  id: {
    type: String,
    default: '',
    required: true,
  },
  value: {
    type: Date,
    default: new Date(),
  },
  change: {
    type: Function,
  },
  maxDate: {
    type: Date,
    default: null,
  },
})
const emits = defineEmits(['change'])

const uid = ref('')
const isOpen = ref(false)
const picked = ref(props.value)

onMounted(() => {
  uid.value = props.id || `calendar${getCurrentInstance().uid}`
})

const openCalendar = () => {
  document.body.style.overflowY = 'hidden'
  isOpen.value = true
}
const closeCalendar = () => {
  document.body.style.overflowY = 'scroll'
  isOpen.value = false
}
const clickDimmed = () => {
  closeCalendar()
}

watch(
  () => isOpen.value,
  (newValue) => {
    if (newValue) {
      document.getElementById(uid.value)?.click()
    }
  }
)

watch(
  () => picked.value,
  (newValue) => {
    emits('change', dateToStringFormat(newValue))
    closeCalendar()
  }
)

defineExpose({
  openCalendar,
  closeCalendar,
})
</script>

<style lang="scss">
@import '@styles/common/calendar.scss';
</style>
