<template>
  <div class="other">
    <div class="item">
      <img src="~assets/img/profile/message.svg" alt />
      <span>消息通知</span>
    </div>
    <div class="item" @click="locationClick">
      <img src="~assets/img/profile/location.svg" alt />
      <span>收货地址</span>
    </div>
    <div class="item">
      <img src="~assets/img/profile/pointer.svg" alt />
      <span>积分兑换</span>
    </div>
    <div class="item">
      <img src="~assets/img/profile/viper.svg" alt />
      <span>会员中心</span>
    </div>
    <div class="item" @click="appClick">
      <img src="~assets/img/profile/app.svg" alt />
      <span>APP下载</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserOther",
  methods: {
    appClick() {
      this.$toast.show("骗你的宝贝，没有APP", 2000);
    },
    locationClick() {
      if (!this.$store.state.isLogin) {
        this.$toast.show("请您先登录");
      } else {
        this.$router.push("/location");
      }
    },
  },
};
</script>

<style scoped>
.other {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}

.item {
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.item span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
}

.item img {
  width: 22px;
  height: 22px;
  margin-left: 20px;
  margin-right: 30px;
}
</style>