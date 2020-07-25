<template>
  <div class="login">
    <nav-bar class="nav-bar">
      <div slot="center">欢迎登录</div>
    </nav-bar>
    <div class="login-box">
      <div class="id">
        <img src="~assets/img/login/user.svg" alt />
        <input type="text" v-model="id" />
      </div>
      <div class="pw">
        <img src="~assets/img/login/password.svg" alt />
        <input type="password" v-model="passWord" />
      </div>
      <div class="login-button">
        <button @click="login">立即登录</button>
        <button @click="backClick">取消登录</button>
      </div>
      <div class="tips">tips:账号、密码随便输入即可</div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Login",
  components: {
    NavBar,
  },
  data() {
    return {
      id: "",
      passWord: "",
    };
  },
  methods: {
    backClick() {
      this.$router.back();
    },

    login() {
      if (this.id.length === 0) {
        this.$toast.show("账号不能为空");
        return;
      }
      if (this.passWord.length === 0) {
        this.$toast.show("密码不能为空");
        return;
      }
      this.$store.dispatch("loginIn", this.id).then((value) => {
        this.$toast.show(value);
        this.$router.back();
      });
    },
  },

  //组件内的导航守卫，这一步的目的是保证从用户资料页面登录后，会跳转到新的用户界面
  //而比如在商品详情页登录后，会回到商品详情页
  //要防止溢出
  beforeRouteLeave(to, from, next) {
    if (to.query.id === null && this.$store.state.userId !== null) {
      next({ path: "/profile", query: { id: this.$store.state.userId } });
    } else {
      next();
    }
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.login-box {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}

.id,
.pw {
  margin-left: 70px;
  margin-bottom: 30px;
}

.id img,
.pw img {
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.3);
  vertical-align: middle;
}

.login-box input {
  height: 30px;
  width: 200px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  vertical-align: middle;
}

.login-button {
  margin-left: 74px;
}

.login-box button {
  width: 90px;
  height: 35px;
  margin-right: 40px;
  background-color: var(--color-tint);
  color: #fff;
  border: none;
  font-size: 15px;
}

.tips {
  text-align: center;
  margin-top: 40px;
  color: #555;
  font-size: 14px;
}
</style>