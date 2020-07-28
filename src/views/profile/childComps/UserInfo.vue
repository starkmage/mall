<template>
  <div class="info">
    <div class="fav" @click="favClick">
      <p class="top">{{$store.state.favList.length}}</p>
      <p class="bottom">商品关注</p>
    </div>
    <div class="buy" @click="orderClick">
      <p class="top">{{$store.state.orderList.length}}</p>
      <p class="bottom">我的订单</p>
    </div>
    <div class="coupon" @click="couponClick">
      <p class="top">0</p>
      <p class="bottom">优惠券</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  methods: {
    favClick() {
      if(!this.$store.state.isLogin) {
        this.$toast.show('请您先登录')
      } else {
        this.$router.push('/fav')
      }
    },
    orderClick() {
      if(!this.$store.state.isLogin) {
        this.$toast.show('请您先登录')
      } else {
        this.$router.push('/orderlist')
      }
    },
    couponClick() {
      if(!this.$store.state.isLogin) {
        this.$toast.show('请您先登录')
      } else {
        this.$toast.show('暂无优惠券可用')
      }
    }
  }
}
</script>

<style scoped>
.info {
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 10px solid rgba(0,0,0,0.06);
}

.fav, .buy, .coupon {
  height: 100%;
  flex: 1;
  text-align: center;
}

.fav, .buy {
  border-right: 1px solid rgba(0,0,0,0.1);
}

.top {
  color: orangered;
  font-size: 19px;
  margin-top: 15px;
}

.bottom {
  margin-top: 7px;
  font-size: 13px;
}
</style>