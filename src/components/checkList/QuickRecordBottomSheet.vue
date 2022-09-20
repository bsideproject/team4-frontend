<template>
  <section class="bottom-sheet" v-if="isOpen">
    <article class="bottom-sheet__dimmed" @click="clickDimmed"></article>
    <article class="bottom-sheet__content">
      <div class="bottom-sheet__quick">
        <div>
          <p>퀵기록명</p>
          <input type="text" v-model="form.name" />
        </div>
        <div>
          <p>1일 실행횟수</p>
          <input
            type="text"
            v-model="form.total"
            maxlength="2"
            @input="onlyNumber"
          />
        </div>
        <div>
          <p>메모</p>
          <input type="text" v-model="form.explanation" />
        </div>
      </div>
      <button
        :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
        @click="clickSaveQuickRecord"
      >
        저장하기
      </button>
    </article>
  </section>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineExpose,
  watch,
  reactive,
  toRef,
  computed,
} from 'vue'
import {
  MODULE_NAME as MN_QUICK,
  TYPES as TY_QUICK,
} from '@/store/modules/checklist/quickRecordStore'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
import { useStore } from 'vuex'
import { dateToStringFormat } from '@/utils/common'

const props = defineProps({
  detail: {
    type: Object,
    required: true,
  },
})

const store = useStore()
const isOnEdit = ref(false)
const isOpen = ref(false)
const form = reactive({
  quickId: 0,
  name: '',
  total: 0,
  explanation: '',
})

toRef(form)

const getWeeklyCalendarDate = computed(
  () => store.getters[`${MN_HEADER}/${TY_HEADER.getWeeklyCalendarDate}`]
)

watch(
  () => props.detail,
  (newValue) => {
    form.quickId = newValue.quickId
    form.name = newValue.name
    form.total = newValue.total
    form.explanation = newValue.explanation
  },
  { deep: true }
)
watch(
  () => form,
  (newValue) => {
    const { name, total, explanation } = props.detail

    if (newValue.name && newValue.total) {
      if (
        newValue.name !== name ||
        newValue.total !== total ||
        newValue.explanation !== explanation
      ) {
        isOnEdit.value = true
        return false
      }
    }
    isOnEdit.value = false
  },
  { deep: true }
)

const clickDimmed = () => {
  closeBottomSheet()
}
const openBottomSheet = () => {
  isOpen.value = true
}
const closeBottomSheet = () => {
  isOpen.value = false
}
const clickSaveQuickRecord = () => {
  if (isOnEdit.value) {
    store
      .dispatch(`${MN_QUICK}/${TY_QUICK.actPutQuickRecord}`, form)
      .then(() => {
        store.dispatch(
          `${MN_QUICK}/${TY_QUICK.actQuickRecordList}`,
          dateToStringFormat(getWeeklyCalendarDate.value, '-')
        )
        closeBottomSheet()
      })
  }
}
const onlyNumber = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '')
}
defineExpose({
  openBottomSheet,
  closeBottomSheet,
})
</script>

<style lang="scss" scoped>
@import '@styles/common/bottomSheet.scss';
</style>