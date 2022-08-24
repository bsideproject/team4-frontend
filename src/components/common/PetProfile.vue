<template>
  <div class="petProfile section">
    <div class="petProfile-wrapper" v-if="petList.length !== 0">
      <div class="petProfile-wrapper__item active">
        <p class="item__name">멍멍이</p>
        <div class="item__photo">
          <img class="item__photo--round" src="@images/pet_02.jpeg" alt="">
        </div>
      </div>
      <div class="petProfile-wrapper__item">
        <p class="item__name">까꿍이</p>
        <div class="item__photo">
          <img class="item__photo--round" src="@images/pet_02.jpeg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useStore } from 'vuex'
import '@store/pet/petStore.js'

export default {
  setup() {
    const store = useStore()
    const petList = store.state.petStore.petList

    return {
      petList,
      store,
    }
  },
}
</script>

<style>

</style>