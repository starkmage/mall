<template>
  <div class="bottom-bar">
    <div class="all-select">
      <check-button :isSelected="allSelected" @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div>
      <span>
        合计：
        <span class="total-price">￥{{totalPrice}}</span>
      </span>
      <span class="go-check" @click="goCheck">结算 ({{totalCount}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.price * item.count, 0)
        .toFixed(2);
    },
    totalCount() {
      return this.$store.state.cartList
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.count, 0);
    },
    allSelected() {
      if (this.$store.state.cartList.length === 0) return false;
      // 性能较低，因为会全部遍历
      // return !this.$store.state.cartList.filter(item => !item.selected).length
      //性能较高的方法
      return !this.$store.state.cartList.some((item) => !item.selected);
    },
  },
  methods: {
    selectAllClick() {
      //1.如果已经是全选了，变成全不选
      if (this.allSelected) {
        for (let index in this.$store.state.cartList) {
          if (this.$store.state.cartList[index].selected === true) {
            this.$store.commit('changeSelected', index)
          }
        }
      }
      //2.如果不是全选状态，变成全选状态
      else {
        for (let index in this.$store.state.cartList) {
          if (this.$store.state.cartList[index].selected === false) {
            this.$store.commit('changeSelected', index)
          }
        }
      }
    },

    goCheck() {
      
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.all-select {
  margin-left: 10px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.all-select span {
  margin-left: 10px;
}

.total-price {
  color: orangered;
}

.go-check {
  margin-left: 20px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: orangered;
  color: #fff;
}
</style>