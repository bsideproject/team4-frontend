<template>
  <section class="withdraw">
    <article class="withdraw__confirm">
      <p class="title">{{ getUser.name }}님, 펫하루를 떠나나요?</p>
      <img src="@images/png/bye_illust.png" />
      <p>정말 탈퇴하시겠습니까?</p>
      <p>지금까지 기록한 모든 내용 및 정보가 삭제됩니다.</p>
      <p>* 공유된 그룹에 글을 작성한 경우, 글은 유지됩니다.</p>
      <div class="withdraw__check">
        <input type="checkbox" id="confirm-check" @click="clickConfirmCheck" />
        <label for="confirm-check"
          >탈퇴 전 주의사항을 숙지하였으며 이에 동의합니다.</label
        >
      </div>
    </article>
    <button
      :class="[isOnEdit ? 'btn-lg-enabled' : 'btn-lg-disabled']"
      @click="clickWithdraw"
    >
      탈퇴하기
    </button>
  </section>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import {
  MODULE_NAME as MN_USER,
  TYPES as TY_USER,
} from '@/store/modules/user/userStore'
import { useStore } from 'vuex'
import { _confirm } from '@/utils/common'
import ROLE from '@/constants/role'
import { useRouter } from 'vue-router'
import ROUTE from '@/constants/route'

const instance = getCurrentInstance()
const isOnEdit = ref(false)
const store = useStore()
const router = useRouter()

const getUser = computed(() => store.getters[`${MN_USER}/${TY_USER.getUser}`])
const getConfirmInfo = computed(() => {
  const defalutText =
    '펫하루에 쌓은 반려동물과의 추억이 모두<br/>사라지며, 탈퇴 후에는 계정, 펫, 양육일지 등<br/>어떤 정보도 복원할 수 없습니다.<br/>그래도 탈퇴하시겠습니까?'
  const ingroupText =
    '펫하루에 쌓은 반려동물과의 추억이 모두<br/>사라지며, 탈퇴 후에는 계정, 펫, 양육일지 등<br/>어떤 정보도 복원할 수 없습니다.<br/><br/>그룹과 공유하고 있는<br/>반려동물에 남긴 정보는 유지됩니다.<br/><br/>그래도 탈퇴하시겠습니까?'
  const managerText =
    '그룹장을 탈퇴할 수 없습니다<br/>그룹장을 다른 구성원으로 지정하시겠습니까?'
  const defaultOkLabel = '탈퇴하기'
  const managerOkLabel = '지정하기'
  const info = {}
  if (getUser.value.role === ROLE.MANAGER) {
    info.text = managerText
    info.okLabel = managerOkLabel
    info.okCallback = () => {
      router.push({ name: ROUTE.Group.Info })
    }
    info.height = 115
  } else if (getUser.value.familyId) {
    info.text = ingroupText
    info.okLabel = defaultOkLabel
    info.okCallback = () => {
      store.dispatch(`${MN_USER}/${TY_USER.fetchDeleteUser}`)
    }
    info.height = 225
  } else {
    info.text = defalutText
    info.okLabel = defaultOkLabel
    info.okCallback = () => {
      store.dispatch(`${MN_USER}/${TY_USER.fetchDeleteUser}`)
    }
    info.height = 145
  }

  return info
})

onMounted(() => {
  store.dispatch(`${MN_USER}/${TY_USER.fetchGetUser}`)
})

const clickConfirmCheck = (e) => {
  isOnEdit.value = e.target.checked
}

const clickWithdraw = () => {
  if (!isOnEdit.value) {
    return false
  }
  _confirm(instance, {
    text: getConfirmInfo.value.text,
    ok: {
      label: getConfirmInfo.value.okLabel,
      callback: getConfirmInfo.value.okCallback,
    },
    cancel: {
      label: '아니오',
    },
    style: {
      height: getConfirmInfo.value.height,
    },
  })
}
</script>

<style lang="scss" scoped>
@import '@styles/setting/withdraw.scss';
</style>