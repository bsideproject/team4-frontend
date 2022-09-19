<template>
  <section></section>
</template>

<script setup>
import ROUTE from '@/constants/route'
import { useRoute, useRouter } from 'vue-router'
import { setToken } from '@/utils/login/index'
const route = useRoute()
const router = useRouter()

const { token } = route.query

setToken(String(token))

router.replace({ name: ROUTE.Main })
</script>

<style>
</style>