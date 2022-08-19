<template>
  <section :class="['calendar', isOpen ? 'show' : '']">
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
        noToday
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
