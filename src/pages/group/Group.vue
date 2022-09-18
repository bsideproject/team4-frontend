<template>
  <section class="group">
    <article class="group__list" v-if="getGroupList.length">
      <div
        class="group__person"
        v-for="(item, index) in getGroupList"
        :key="index"
      >
        <div class="group__profile">
          <img src="@images/icons/profile_big_default.svg" alt="" />
          <div
            class="group__export"
            v-if="isExport"
            @click="() => clickExport(item)"
          ></div>
          <div
            class="group__grant"
            v-if="isGrant"
            @click="() => clickGrant(item)"
          ></div>
        </div>

        <span :class="item.role === ROLE.MANAGER ? 'bdge' : ''">{{
          item.name
        }}</span>
      </div>
    </article>
    <article class="group__empty" v-else>
      <div class="group__empty_title">
        <p>아직 구성원이 없어요! :(</p>
        <p>초대해볼까요?</p>
      </div>
      <div class="group__empty_image">
        <img src="@images/png/group_illust.png" alt="" />
      </div>
    </article>
    <div class="group__invite" v-if="getGroupList.length < 4">
      <button @click="clickInvite">초대하기</button>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance, ref } from 'vue'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_GROUP,
  TYPES as TY_GROUP,
} from '@/store/modules/group/groupStore'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@/store/modules/common/headerStore'
import {
  MODULE_NAME as MN_USER,
  TYPES as TY_USER,
} from '@/store/modules/user/userStore'
import { _confirm } from '@/utils/common'
import ROLE from '@/constants/role'

const store = useStore()
const instance = getCurrentInstance()
const isExport = ref(false)
const isGrant = ref(false)

const getGroupList = computed(
  () => store.getters[`${MN_GROUP}/${TY_GROUP.getGroupList}`]
)
const getUser = computed(() => store.getters[`${MN_USER}/${TY_USER.getUser}`])
onMounted(() => {
  store.dispatch(`${MN_USER}/${TY_USER.actUser}`)

  const familyId = getUser.value.familyId
  if (familyId) {
    store.dispatch(`${MN_GROUP}/${TY_GROUP.actGroupList}`, familyId)
  }

  if (getUser.value.role === ROLE.MANAGER) {
    store.commit(`${MN_HEADER}/${TY_HEADER.setMoreOptionList}`, [
      {
        title: '그룹장 변경하기',
        callback: () => {
          isExport.value = false
          isGrant.value = true
        },
      },
      {
        title: '내보내기',
        callback: () => {
          isGrant.value = false
          isExport.value = true
        },
      },
      {
        title: '그룹 삭제하기',
        callback: () => {
          alert('그룹 삭제하기')
        },
      },
    ])
  }
})

const clickInvite = () => {
  console.log(getUser.value.userId)
  const inviteURL = `${process.env.VUE_APP_BASE_URL}/group/invite/${getUser.value.userId}`
  isExport.value = false
  isGrant.value = false
  // if (navigator.share) {
  //   window.navigator.share({
  //     title: '펫하루 그룹 초대',
  //     text: '링크 클릭시 초대된 그룹에 함께하게됩니다.',
  //     url: inviteURL,
  //   })
  // } else {
  navigator.clipboard
    .writeText(inviteURL)
    .then(() => {
      alert('초대링크가 복사되었습니다.')
    })
    .catch((error) => {
      alert('잠시후 다시 시도해주세요.')
      console.log(error)
    })
  // }
}
const clickGrant = (member) => {
  _confirm(instance, {
    text: `'${member.name}'님을 그룹장으로<br />변경하시겠습니까?`,
    ok: {
      label: '네',
      callback: () => {
        store.dispatch(`${MN_GROUP}/${TY_GROUP.actPutGroupManager}`, {
          userId: member.userId,
        })
      },
    },
    cancel: {
      label: '아니오',
    },
  })
  isGrant.value = false
}
const clickExport = (member) => {
  _confirm(instance, {
    text: `'${member.name}'님을 내보내시겠습니까?<br />'${member.name}'님이 남긴 글은 삭제되지않습니다.`,
    ok: {
      label: '내보내기',
      callback: () => {
        store.dispatch(`${MN_GROUP}/${TY_GROUP.actDeleteGroupMember}`, {
          userId: member.userId,
        })
      },
    },
    cancel: {
      label: '아니오',
    },
  })
  isExport.value = false
}
</script>

<style lang="scss" scoped>
@import '@styles/group/group.scss';
</style>