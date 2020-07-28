<template>
  <div class="shop-info">
    <div class="info-top">
      <img :src="shop.logo" alt />
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="info-middle">
      <div class="info-middle-left info-middle-item">
        <div>
          <div class="count">{{shop.sells | sellsCount}}</div>
          <div class="text">总销量</div>
        </div>
        <div>
          <div class="count">{{shop.goodsCount}}</div>
          <div class="text">全部宝贝</div>
        </div>
      </div>
      <div class="info-middle-right info-middle-item">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td :class="{'score-better': item.isBetter, 'score-bad': !item.isBetter}">{{item.score}}</td>
            <td :class="{'text-better': item.isBetter, 'text-bad': !item.isBetter}"><span>{{item.isBetter ? "高" : "低"}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="info-bottom">
      <div class="enter-shop" @click="enterClick">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellsCount(value) {
      if(value < 10000) return value
      return (value/10000).toFixed(1) + '万'
    }
  },
  methods: {
    enterClick() {
      this.$toast.show('店铺页面正在开发')
    }
  }
}
</script>

<style scoped>
.shop-info {
  padding: 18px 8px;
  border-bottom: 5px solid #f2f5f8;
}

.info-top {
  display: flex;
  align-items: center;
}

.info-top img {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
}

.title {
  font-size: 16px;
  margin-left: 10px;
  line-height: 55px;
}


.info-middle {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.info-middle-item {
  flex: 1;
}

.info-middle-left {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  color: #333;
  border-right: 1px solid rgba(0,0,0,0.1)
}

.count {
  font-size: 18px;
}

.text {
  margin-top: 10px;
  font-size: 12px;
}

.info-middle-right {
  font-size: 14px;
  color: #333;
  display: flex;
  justify-content: center;
  align-content: center;
}

.info-middle-right table {
  width: 120px;
}

.info-middle-right table td {
  padding: 3px 0;
}

.info-middle-right .score-better {
  color: #5ea732;
}

.info-middle-right .score-bad {
  color: #f13e3a;
}

.info-middle-right .text-better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.info-middle-right .text-bad span {
  background-color: #f13e3a;
  color: #fff;
  text-align: center;
}

.info-bottom {
  text-align: center;
  margin-top: 10px;
}

.enter-shop {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
}
</style>