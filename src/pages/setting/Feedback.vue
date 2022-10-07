<template>
  <section class="feedback">
    <article class="feedback__comment">
      <span>{{ getUser.name }}님, 펫하루 사용은 어떠하셨나요?</span>
      <img src="@images/png/feedback_illust.png" />
    </article>
    <article class="feedback__content">
      <textarea
        placeholder="펫하루를 사용하면서 불편한 점이 있으셨다면 자유롭게 의견을 보내주세요. :)"
        v-model="contents"
      ></textarea>
    </article>
    <button
      :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
      @click="clickSendFeedback"
    >
      보내기
    </button>
  </section>
</template>

<script setup>
import { saveFeedback } from '@/api/setting/feedback'
import { computed, onMounted, ref, watch } from 'vue'
import { useToast } from 'vue-toast-notification'
import {
  MODULE_NAME as MN_USER,
  TYPES as TY_USER,
} from '@/store/modules/user/userStore'
import { useStore } from 'vuex'

const contents = ref('')
const isOnEdit = ref(false)
const toast = useToast()
const store = useStore()

const getUser = computed(() => store.getters[`${MN_USER}/${TY_USER.getUser}`])

onMounted(() => {
  store.dispatch(`${MN_USER}/${TY_USER.fetchGetUser}`)
})

watch(
  () => contents.value,
  (newValue) => {
    if (newValue.length) {
      isOnEdit.value = true
    } else {
      isOnEdit.value = false
    }
  }
)

const clickSendFeedback = () => {
  saveFeedback({ contents: contents.value }).then((res) => {
    const { code, message } = res.data
    if (code === '700') {
      toast.clear()
      toast.open({
        type: 'success',
        message: '피드백 보내기가 완료됐습니다.',
        position: 'bottom',
      })
    } else {
      throw new Error(message)
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@styles/setting/feedback.scss';
</style>