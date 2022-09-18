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
          <input type="text" v-model="form.total" />
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
import { ref, defineProps, defineExpose, watch, reactive, toRef } from 'vue'
import {
  MODULE_NAME as MN_QUICK,
  TYPES as TY_QUICK,
} from '@/store/modules/checklist/quickRecordStore'
import { useStore } from 'vuex'

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
    if (
      newValue.name !== name ||
      newValue.total !== total ||
      newValue.explanation !== explanation
    ) {
      isOnEdit.value = true
    } else {
      isOnEdit.value = false
    }
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
        closeBottomSheet()
      })
  }
}
defineExpose({
  openBottomSheet,
  closeBottomSheet,
})
</script>

<style lang="scss" scoped>
@import '@styles/common/bottomSheet.scss';
</style>