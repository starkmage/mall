<template>
  <div class="add" @click="addClick">
      <img src="~assets/img/location/new_location.svg" alt="">
      <span>添加新地址</span>
    </div>
</template>

<script>
export default {
  name: "AddLocation",
  methods: {
    addClick() {
      this.$router.push('/location/newlocation')
    }
  }
}
</script>

<style scoped>
.add {
  height: 40px;
}

  .add img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-left: 120px;
    margin-right: 10px;
  }

  .add span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #555;
  }
</style>