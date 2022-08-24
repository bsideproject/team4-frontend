<template>
  <div class="createProfile">
    <div class="createProfile-photo">
      <img class="createProfile-photo__img" src="@assets/images/icons/profile.svg" alt="" />
    </div>
    <div class="createProfile-form">
      <div class="createProfile-form__row">
        <div class="row__label">이름*</div>
        <div class="row__input">
          <input type="text" placeholder="이름을 입력해주세요">
        </div>
      </div>
      <div class="createProfile-form__row">
        <div class="row__label">성별*</div>
        <div class="row__input">
          <label for="gender">
            <input type="radio" name="gender">
            여자
          </label>
          <label for="gender">
            <input type="radio" name="gender">
            남자
          </label>
        </div>
      </div>
      <div class="createProfile-form__row">
        <div class="row__label">품종</div>
        <div class="row__input">
          <input type="text" placeholder="품종을 입력해주세요">
        </div>
      </div>
      <div class="createProfile-form__row">
        <div class="row__label">생일</div>
        <div class="row__input">
          <input type="text" placeholder="0000.00.00">
        </div>
      </div>
      <div class="createProfile-form__row">
        <div class="row__label">나이</div>
        <div class="row__input">
          <input type="text" placeholder="나이를 입력해주세요">
        </div>
      </div>
      <div class="createProfile-form__row">
        <div class="row__label">입양 날짜</div>
        <div class="row__input">
          <input type="text" placeholder="0000.00.00">
        </div>
      </div>
      <div class="createProfile-form__row">
        <div class="row__label">동물등록번호</div>
        <div class="row__input">
          <input type="text" placeholder="등록번호를 입력해주세요">
        </div>
      </div>
      <button class="empty__btn btn-lg-disabled" @click="nextStep">완료</button>
    </div>
  </div>
</template>

<script setup>
const currentStep = 1;
function nextStep() {
  this.currentStep += 1;
}
</script>

<style scoped>

</style>