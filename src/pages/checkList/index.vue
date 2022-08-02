<template>
  <div class="checkList">
    <div>펫프로필 영역</div>
    <div>주간달력 영역</div>
    <div>퀵메뉴 영역</div>
    <div>체크리스트 영역</div>

    <button>추가버튼</button>
  </div>
</template>

<script>
// import {ref, reactive} from "vue";
import customPopup from "@/components/CustomPopup";
export default {
  components: {
    customPopup,
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