<template>
  <div class="list-item">
    <order-product v-for="(item, index) in products" :key="index" :item="item"></order-product>
    <div class="price">总金额：<span>￥{{totalPrice.toFixed(2)}}</span></div>
  </div>
</template>

<script>
import OrderProduct from "./OrderProduct";


export default {
  name: "OrderListItem",
  components: {
    OrderProduct,
  },
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    totalPrice() {
      let price = 0
      for (let item of this.products) {
        price += item.price * item.count;
      }
      return price
    },
  },
};
</script>

<style scoped>
.list-item {
  border-bottom: 3px solid rgba(0,0,0,0.1);
}

.price {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  font-weight: 500;
}

.price span {
  color: red;
}
</style>