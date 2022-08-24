<template>
  <section></section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { setToken } from '@utils/login/index.js'
const route = useRoute()
const router = useRouter()

const { token } = route.query

setToken(token)

router.replace({ name: ROUTE.Main })
</script>

<style>
</style>