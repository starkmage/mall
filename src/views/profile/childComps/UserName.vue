<template>
  <div>
    <div class="user-name" v-if="!$store.state.isLogin">
      <img src="~assets/img/profile/avator.png" alt />
      <div @click="loginClick" class="go-login">
        <div>请先登录您的账号</div>
        <i class="arrow-right"></i>
      </div>
    </div>
    <div v-else class="user-name">
      <img src="~assets/img/profile/avator1.jpg" alt />
      <div @click="loginClick" class="go-login">
        <div>欢迎您，亲爱的{{$store.state.userId}}</div>
        <i class="arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserName",
  methods: {
    loginClick() {
      if(!this.$store.state.isLogin) {
        this.$router.push("./login");
      }
    },
  },
};
</script>

<style scoped>
.user-name {
  height: 80px;
  background-color: var(--color-tint);
  font-size: 18px;
  color: #fff;
  display: flex;
  align-items: center;
}

.user-name img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 20px;
}

.go-login {
  display: flex;
  align-items: center;
}

.arrow-right {
  border-color: #fff;
  position: absolute;
  right: 20px;
}
</style>