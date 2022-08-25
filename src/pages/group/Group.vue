<template>
  <section class="group">
    <article class="group__list" v-if="getGroupList.length">
      <div v-for="(item, index) in getGroupList" :key="index">
        <img src="@images/icons/profile.svg" alt="" />
        <span :class="item.role === 'ROLE_MANAGER' ? 'bdge' : ''">{{
          item.name
        }}</span>
      </div>
    </article>
    <article class="group__empty" v-else>
      <div class="group__empty_title">
        <span>아직 구성원이 없어요! :()</span>
        <span>초대해볼까요?</span>
      </div>
      <div class="group__empty_image">
        <img src="@images/png/group_illust.png" alt="" />
      </div>
    </article>
    <div class="group__invite">
      <button @click="clickInvite">초대하기</button>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_GROUP,
  TYPES as TY_GROUP,
} from '@store/group/groupStore.js'
import {
  MODULE_NAME as MN_HEADER,
  TYPES as TY_HEADER,
} from '@store/common/headerStore.js'

const store = useStore()

const getGroupList = computed(
  () => store.getters[`${MN_GROUP}/${TY_GROUP.getGroupList}`]
)

onMounted(() => {
  store.dispatch(`${MN_GROUP}/${TY_GROUP.selectGroupList}`)
  store.commit(`${MN_HEADER}/${TY_HEADER.setMoreOptionList}`, [
    {
      title: '그룹장 변경하기',
      callback: () => {
        alert('그룹장 변경하기')
      },
    },
    {
      title: '내보내기',
      callback: () => {
        alert('내보내기')
      },
    },
    {
      title: '그룹 삭제하기',
      callback: () => {
        alert('그룹 삭제하기')
      },
    },
  ])
})

const inviteURL = 'http://localhost:5000/family/invite'
const clickInvite = () => {
  if (navigator.share) {
    window.navigator.share({
      title: '펫하루 그룹 초대',
      text: '링크 클릭시 초대된 그룹에 함께하됩니다.',
      url: inviteURL,
    })
  } else {
    navigator.clipboard
      .writeText(inviteURL)
      .then(() => {
        alert('초대링크가 복사되었습니다.')
      })
      .catch((error) => {
        alert('잠시후 다시 시도해주세요.')
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/group/group.scss';
</style>