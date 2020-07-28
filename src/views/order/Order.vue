<template>
  <div class="order">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/favlist/back.svg" alt />
      </div>
      <div slot="center">确认订单</div>
    </nav-bar>

    <scroll class="content">
      <order-location></order-location>
      <div class="product">
        <order-product v-for="(item, index) in $store.state.orderProduct" :key="index" :item="item"></order-product>
      </div>
      <order-notes>
        <notes-item>
          <div slot="left">配送方式</div>
          <div slot="right">标准快递，全国包邮</div>
        </notes-item>
        <notes-item :dynamic="true" @click.native="invoiceClick">
          <div slot="left">发票信息</div>
          <div slot="right">电子发票 个人 商品明细</div>
        </notes-item>
        <notes-item :dynamic="true" @click.native="couponClick">
          <div slot="left">优惠券</div>
          <div slot="right">暂无可用优惠券</div>
        </notes-item>
        <notes-item :dynamic="true" @click.native="pointClick">
          <div slot="left">积分抵扣</div>
          <div slot="right">共有0积分，满1000积分可用</div>
        </notes-item>
        <notes-item>
          <div slot="left">温馨提醒</div>
          <div slot="right">请仔细核对订单信息</div>
        </notes-item>
      </order-notes>
    </scroll>

    <order-check class="check"></order-check>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import OrderLocation from "./childComps/OrderLocation";
import OrderProduct from "./childComps/OrderProduct";
import OrderNotes from "./childComps/OrderNotes";
import NotesItem from "./childComps/NotesItem";
import OrderCheck from "./childComps/OrderCheck";

export default {
  name: "Order",
  components: {
    NavBar,
    Scroll,
    OrderLocation,
    OrderProduct,
    OrderNotes,
    NotesItem,
    OrderCheck,
  },
  methods: {
    backClick() {
      this.$store.dispatch("cleanProduct");
      this.$router.back();
    },
    invoiceClick() {
      this.$toast.show("暂不支持修改发票信息");
    },
    couponClick() {
      this.$toast.show("您暂无可用优惠券");
    },
    pointClick() {
      this.$toast.show("您的积分不足");
    },
  },
};
</script>

<style scoped>
.order {
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

.product {
  border-bottom: 5px solid rgba(0, 0, 0, 0.1);
}

.check {
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
}

.content {
  height: calc(100% - 44px - 214px);
  overflow: hidden;
}
</style>