<template>
  <div class="checkList">
    <pet-profile></pet-profile>
    <weekly-calendar></weekly-calendar>
    <quick-menu></quick-menu>
    <list></list>

    <button>추가+</button>
  </div>
</template>

<script>
// import {ref, reactive} from "vue";
import customPopup from "@/components/CustomPopup";
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