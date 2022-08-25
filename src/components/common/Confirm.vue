<template>
  <section class="confirm">
    <article class="confirm__dimmed" @click="clickDimmed"></article>
    <article class="confirm__content">
      <p v-html="props.options.text"></p>
      <div>
        <button class="btn-md-default" @click="clickCancel">
          {{ props.options.cancel.label }}
        </button>
        <button class="btn-md-enabled" @click="clickOk">
          {{ props.options.ok.label }}
        </button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  options: Object,
  destroy: Function,
})

const clickOk = () => {
  props.options.ok.callback()
  props.destroy()
}
const clickCancel = () => {
  props.destroy()
}
const clickDimmed = () => {
  props.destroy()
}
</script>

<style lang="scss" scoped>
@import '@styles/common/confirm.scss';
</style>