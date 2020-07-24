<template>
  <div class="check-button" :class="{selected: isSelected}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isSelected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check-button img {
  width: 16px;
  height: 16px;
}

.selected {
  background-color: orangered;
  border-color: orangered;
}
</style>