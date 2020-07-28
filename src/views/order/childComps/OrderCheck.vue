<template>
  <div class="check">
    <div class="detail">
      <div class="price">
        <span class="onleft">商品金额</span>
        <span class="onright">￥{{price.toFixed(2)}}</span>
      </div>
      <div class="price">
        <span class="onleft">运费</span>
        <span class="onright">+￥{{shipping.toFixed(2)}}</span>
      </div>
      <div class="price">
        <span class="onleft">优惠</span>
        <span class="onright">-￥{{des.toFixed(2)}}</span>
      </div>
    </div>
    <div class="total">
      实付金额：
      <span>￥{{total}}</span>
    </div>
    <button class="pay" @click="pay">提交订单</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OrderCheck",
  data() {
    return {
      price: 0,
      shipping: 0,
      des: 0,
    };
  },
  computed: {
    ...mapGetters(["orderProduct"]),
    total() {
      return this.price + this.shipping + this.des;
    },
  },
  created() {
    for (let item of this.orderProduct) {
      this.price += item.price * item.count;
    }
  },
  methods: {
    pay() {
      if (this.$store.state.location.length === 0) {
        this.$toast.show("您还没有选择收货地址");
      } else {
        const arr = [];
        for (let item of this.$store.state.orderProduct) {
          arr.push(item);
        }
        this.$store.dispatch("createOrder", arr).then((value) => {
          this.$toast.show(value);
          setTimeout(() => {
            this.$router.replace("/profile");
            this.$store.dispatch("cleanProduct");
          }, 1000);
        });
      }
    },
  },
};
</script>

<style scoped>
.check {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  border-top: 12px solid rgba(0, 0, 0, 0.1);
  height: 200px;
}

.price {
  display: flex;
  justify-content: space-between;
  margin: 5px 5px 10px 5px;
  align-items: center;
  font-size: 14px;
}

.onright {
  color: red;
}

.total {
  margin-top: 15px;
  align-self: flex-end;
  margin-right: 5px;
  font-weight: 600;
}

.total span {
  color: red;
}

.pay {
  margin-top: 25px;
  width: 325px;
  align-self: center;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: #fff;
  background-color: orange;
}
</style>