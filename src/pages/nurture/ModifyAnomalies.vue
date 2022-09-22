<template>
  <section class="anomalies">
    <article
      class="anomalies__list"
      v-for="(tabItem, tabIdx) in anomaliesList"
      :key="tabIdx"
    >
      <div
        :class="['title', tabItem.isFold ? 'on' : '']"
        @click="() => clickAnomaliesTab(tabItem.tabName)"
      >
        <p>{{ tabItem.title }}</p>
      </div>
      <div class="content" v-if="tabItem.isFold">
        <div
          class="check-item"
          v-for="(contentItem, contentIdx) in tabItem.content"
          :key="contentIdx"
        >
          <input type="checkbox" :id="contentItem.value" />
          <label :for="contentItem.value">{{ contentItem.description }}</label>
        </div>
      </div>
    </article>
    <button class="btn-lg-enabled mg100">수정완료</button>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const anomaliesList = ref([])

anomaliesList.value = [
  {
    title: '대소변',
    tabName: 'a',
    isFold: true,
    content: [
      {
        description: '설사를 해요',
        value: 'a',
        checked: false,
      },
      {
        description: '변비가 있어요',
        value: 'b',
        checked: false,
      },
      {
        description: '소변을 너무 자주 봐요.',
        value: 'c',
        checked: false,
      },
    ],
  },
  {
    title: '호흡',
    tabName: 'b',
    isFold: false,
    content: [
      {
        description: '설사를 해요',
        value: 'a',
        checked: false,
      },
      {
        description: '변비가 있어요',
        value: 'b',
        checked: false,
      },
      {
        description: '소변을 너무 자주 봐요.',
        value: 'c',
        checked: false,
      },
    ],
  },
]

const clickAnomaliesTab = (tabName) => {
  console.log(tabName)
  anomaliesList.value = anomaliesList.value.map((a) => {
    if (a.tabName === tabName) {
      a.isFold = !a.isFold
    }

    return a
  })
}
</script>

<style lang="scss" scoped>
@import '@styles/nurture/createAnomalies.scss';
</style>