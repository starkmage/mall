<template>
  <div class="item">
    <div class="shop-name">
      <img src="~assets/img/detail/shop.svg" alt="">
      <span>{{item.shop}}<i class="arrow-right"></i></span>
    </div>
    <div class="product">
      <div class="item-select">
        <!-- <CheckButton @checkBtnClick="checkedChange" v-model="itemInfo.checked"></CheckButton> -->
      </div>
      <div class="item-img">
        <img :src="item.image" alt />
      </div>
      <div class="item-info">
        <div class="item-title">{{item.title}}</div>
        <div class="item-param">
          <span>尺码: {{item.size}}</span>
          <span>颜色: {{item.color}}</span>
        </div>
        <div class="item-check">
          <div class="item-price">￥{{item.price}}</div>
          <div class="item-count">
            <button @click="deCrement">-</button>
            <input type="number" v-model.lazy.number="getCount" min="0"/>
            <button @click="inCrement">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartListItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    index: {
      type: Number,
      default() {
        return -1
      }
    }
  },
  methods: {
    //数量加减按钮，直接通过vuex的mutations修改商品数量
    deCrement() {
      this.$store.commit('changeCount', {needIndex: this.index, newCount: this.$store.state.cartList[this.index].count - 1})
    },
    inCrement() {
      this.$store.commit('changeCount', {needIndex: this.index, newCount: this.$store.state.cartList[this.index].count + 1})
    }
  },
  computed: {
    //利用get和set双向绑定vuex
    getCount: {
      get() {
        return this.$store.state.cartList[this.index].count
      },
      set(newCount) {
        let needIndex = this.index
        this.$store.commit('changeCount', {needIndex: needIndex, newCount: newCount})
      }
    }
  }
};
</script>

<style scoped>
.item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px 10px 0 10px;
  padding-bottom: 10px;
}

.shop-name {
  font-size: 16px;
  margin-bottom: 5px;
  height: 30px;
  display: flex;
  align-items: center;
}

.shop-name img {
  width: 16px;
  height: 16px;
}

.shop-name span {
  display: inline-block;
  margin-left: 10px;
  height: 16px;
  line-height: 16px;
}

.product {
  display: flex;
  height: 100px;
}

.item-img img {
  width: 80px;
  height: 100px;
}

.item-info {
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-param span {
  font-size: 13px;
  margin-right: 20px;
}

.item-check {
  display: flex;
  justify-content: space-between;
}

.item-price {
  color: orangered;
}

.item-check input {
  width: 30px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.item-check button {
  width: 30px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>