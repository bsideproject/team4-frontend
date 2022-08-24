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
import { MODULE_NAME, TYPES } from '@store/group/groupStore.js'
import { useStore } from 'vuex'

const store = useStore()
const getGroupList = computed(
  () => store.getters[`${MODULE_NAME}/${TYPES.getGroupList}`]
)

onMounted(() => {
  store.dispatch(`${MODULE_NAME}/${TYPES.selectGroupList}`)
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