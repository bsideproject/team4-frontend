<template><section></section></template>

<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  MODULE_NAME as MN_GROUP,
  TYPES as TY_GROUP,
} from '@/store/modules/group/groupStore'

const route = useRoute()
const store = useStore()

const { type, userId } = route.params

if (type === 'new') {
  store.dispatch(`${MN_GROUP}/${TY_GROUP.actPostGroup}`, userId)
} else if (type === 'exist') {
  store.dispatch(`${MN_GROUP}/${TY_GROUP.actPostGroupMember}`, userId)
}
</script>

<style>
</style>