<template>
  <div class="order-list">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/favlist/back.svg" alt />
      </div>
      <div slot="center">我的订单({{$store.state.orderList.length}})</div>
    </nav-bar>
    <scroll class="content">
      <order-list-item v-for="(item,index) in $store.state.orderList" :key="index" :products="item"></order-list-item>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import OrderListItem from "./childComps/OrderListItem"

export default {
  name: "OrderList",
  components: {
    NavBar,
    Scroll,
    OrderListItem
  },
  methods: {
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.order-list {
  position: relative;
  height: 100vh;
  background-color: #fff;
  z-index: 1;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.back img {
  width: 35%;
  position: relative;
  top: 5px;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>