<template>
  <div class="bottom-bar">
    <div class="bar-left">
      <div>
        <img src="~assets/img/detail/service.svg" alt />
        <span>客服</span>
      </div>
      <div>
        <img src="~assets/img/detail/shop.svg" alt />
        <span>店铺</span>
      </div>
      <div @click="fav">
        <img src="~assets/img/detail/cfav.svg" v-if="!isFav" alt />
        <img src="~assets/img/detail/hascfav.svg" v-else alt />
        <span>收藏</span>
      </div>
    </div>
    <div class="add-cart" @click="addCart">加入购物车</div>
    <div class="buy" @click="buy">立即购买</div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  props: {
    isFav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //收藏
    fav() {
      if (this.$store.state.isLogin) {
        //1.如果没有收藏，加入收藏夹
        if(!this.isFav) {
          this.$emit("addFav");
        }
        //2.如果收藏了，移除收藏夹
        else {
          this.$emit("removeFav")
        }
      } else {
        this.$toast.show("请您先登录", 1000);
        this.$router.push("/login");
      }
    },

    //加入购物车
    addCart() {
      if (this.$store.state.isLogin) {
        this.$emit("addCart");
      } else {
        this.$toast.show("请您先登录", 1000);
        this.$router.push("/login");
      }
    },

    //立即购买
    buy() {
      if (this.$store.state.isLogin) {
        this.$emit("buy");
      } else {
        this.$toast.show("请您先登录", 1000);
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
}

.bar-left {
  flex: 2;
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-top: 3px;
}

.bar-left img {
  height: 20px;
  width: 20px;
}

.bar-left div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-left div span {
  margin-top: 6px;
}

.add-cart {
  flex: 1;
  font-size: 16px;
  text-align: center;
  line-height: 49px;
  background-color: #ffe817;
  color: #333;
}

.buy {
  flex: 1;
  font-size: 16px;
  text-align: center;
  line-height: 49px;
  background-color: #f69;
  color: #fff;
}
</style>