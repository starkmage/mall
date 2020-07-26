<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/favlist/back.svg" alt />
      </div>
      <div slot="center">确认订单</div>
    </nav-bar>
    <order-location></order-location>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import OrderLocation from "./childComps/OrderLocation";

export default {
  name: "Order",
  components: {
    NavBar,
    OrderLocation,
  },
  methods: {
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.back img {
  width: 35%;
  position: relative;
  top: 5px;
}
</style>