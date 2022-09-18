<template><section></section></template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route, route.params)
</script>

<style>
</style>