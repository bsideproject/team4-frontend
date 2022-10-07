<template><section></section></template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_GROUP,
  TYPES as TY_GROUP,
} from '@/store/modules/group/groupStore'
import { _confirm } from '@/utils/common'
import { getCurrentInstance } from 'vue'
import ROUTE from '@/constants/route'

const instance = getCurrentInstance()
const route = useRoute()
const store = useStore()
const router = useRouter()

const { type, userId } = route.params

_confirm(instance, {
  text: '초대된 그룹에 합류하시겠습니까?',
  ok: {
    label: '네',
    callback: () => {
      if (type === 'new') {
        store
          .dispatch(`${MN_GROUP}/${TY_GROUP.fetchSaveGroup}`, userId)
          .then(() => {
            router.replace({ name: ROUTE.Main })
          })
          .catch(() => {
            location.href = process.env.VUE_APP_BASE_URL
          })
      } else if (type === 'exist') {
        store
          .dispatch(`${MN_GROUP}/${TY_GROUP.fetchSaveGroupMember}`, userId)
          .then(() => {
            router.replace({ name: ROUTE.Main })
          })
          .catch(() => {
            location.href = process.env.VUE_APP_BASE_URL
          })
      }
    },
  },
  cancel: {
    label: '아니오',
    callback: () => {
      router.replace({ name: ROUTE.Main })
    },
  },
  style: {
    height: 100,
  },
})
</script>

<style>
</style>