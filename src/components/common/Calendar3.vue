<template>
  <section :class="['calendar', isOpen ? 'show' : '']">
    <article class="calendar__dimmed" @click="clickDimmed"></article>
    <article class="calendar__datepicker">
      <datepicker :id="uid" v-model="picked" :locale="ko" />
    </article>
  </section>
</template>

<script setup>
import Datepicker from 'vue3-datepicker'
import {
  defineProps,
  defineEmits,
  defineExpose,
  ref,
  watch,
  getCurrentInstance,
  onMounted,
} from 'vue'
import { ko } from 'date-fns/locale'

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
})
const emits = defineEmits(['change'])

const uid = ref('')
const isOpen = ref(false)
const picked = ref(props.value)

onMounted(() => {
  uid.value = props.id || `calendar${getCurrentInstance().uid}`
})

const openCalendar = () => {
  isOpen.value = true
}
const closeCalendar = () => {
  isOpen.value = false
}
const clickDimmed = () => {
  closeCalendar()
}

watch(
  () => isOpen.value,
  (newValue) => {
    if (newValue) {
      document.getElementById(uid.value).click()
    }
  }
)

watch(
  () => picked.value,
  (newValue) => {
    emits('change', newValue)
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