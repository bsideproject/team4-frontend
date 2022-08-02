<template>
  <div class="checkList">
    <pet-profile></pet-profile>
    <weekly-calendar></weekly-calendar>
    <quick-menu></quick-menu>
    <list></list>

    <button>추가+</button>

    <custom-popup>
      <template v-slot:create>등록 폼</template>
      <template v-slot:detail>조회/수정 화면</template>
    </custom-popup>
  </div>
</template>

<script>
// import {ref, reactive} from "vue";
import customPopup from "@/components/common/CustomPopup";
import petProfile from "@/components/checkList/petProfile";
import quickMenu from "@/components/checkList/quickMenu";
import list from "@/components/checkList/list";

export default {
  components: {
    customPopup,
    petProfile,
    quickMenu,
    list
  },
  setup() {
    function showModal() {
      console.log('##모달 팝업')
    }
    return {
      showModal,
    }
  }
}
</script>

<style scoped>

</style>