<template>
  <div class="list-table">
    <ul class="list-table-cardList">
      <li class="list-table-cardList__card">
        <div class="card__check">
          <img src="@images/icons/todo.png" alt="" />
        </div>
        <div class="card__schedule">
          <p class="label">강아지 생일</p>
          <p class="time">오후 5:00 ~ 오후 12:00</p>
        </div>
      </li>
      <li class="list-table-cardList__card">
        <div class="card__check">
          <img src="@images/icons/footprint_empty.png" alt="" />
        </div>
        <div class="card__schedule">
          <p class="label">약주기</p>
          <p class="time">오후 5:00 ~ 오후 12:00</p>
        </div>
      </li>
      <li class="list-table-cardList__card">
        <div class="card__check">
          <img src="@images/icons/footprint_full.png" alt="" />
        </div>
        <div class="card__schedule">
          <p class="label">목욕시키기</p>
          <p class="time">오후 5:00 ~ 오후 12:00</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@styles/main/listTable.scss';
</style>