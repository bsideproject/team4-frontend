<template>
  <section class="one-line-diary">
    <article class="one-line-diary__comment">
      <span>하루에 1개의 일기만 쓸 수 있어요!</span>
    </article>
    <article class="one-line-diary__content">
      <textarea v-model="contents"></textarea>
      <div class="text-count">
        <span :class="[Number(textCount) <= 140 ? 'fc-primary' : 'fc-warn']">{{
          textCount
        }}</span>
        <span> / 140자</span>
      </div>
    </article>
    <button
      :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
      @click="clickWriteComplete"
    >
      작성완료
    </button>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_DIARY,
  TYPES as TY_DIARY,
} from '@/store/modules/nurture/oneLineDiaryStore'
import {
  MODULE_NAME as MN_PET,
  TYPES as TY_PET,
} from '@/store/modules/pet/petStore'
import ROUTE from '@/constants/route'
import { useToast } from 'vue-toast-notification'

const contents = ref('')
const textCount = ref(0)
const isOnEdit = ref(false)
const router = useRouter()
const store = useStore()
const toast = useToast()

const getMainPetId = computed(
  () => store.getters[`${MN_PET}/${TY_PET.getMainPetId}`]
)

onMounted(() => {
  store.dispatch(`${MN_PET}/${TY_PET.fetchPetList}`).then(() => {
    // store.dispatch(
    //   `${MN_DIARY}/${TY_DIARY.getOneLineDiaryList}`,
    //   getMainPetId.value
    // )
  })
})

watch(
  () => contents.value,
  (newValue) => {
    textCount.value = newValue.length

    if (newValue && newValue.length <= 140) {
      isOnEdit.value = true
    } else {
      isOnEdit.value = false
    }
  }
)

const clickWriteComplete = () => {
  if (!isOnEdit.value) {
    return false
  }

  const data = {
    petId: getMainPetId.value,
    contents: contents.value,
  }

  store
    .dispatch(`${MN_DIARY}/${TY_DIARY.fetchSaveOneLineDiary}`, data)
    .then(() => {
      toast.clear()
      toast.open({
        type: 'success',
        message: '한 줄 일기가 저장되었습니다.',
        position: 'bottom',
      })
      router.replace({ name: ROUTE.Nurture.Main })
    })
}
</script>

<style lang="scss" scoped>
@import '@styles/nurture/createOneLineDiary.scss';
</style>