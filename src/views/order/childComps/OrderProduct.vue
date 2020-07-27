<template>
  <div class="item">
    <div class="shop-name" v-if="item.shopShow">
      <img src="~assets/img/detail/shop.svg" alt="">
      <span>{{item.shop}}<i class="arrow-right"></i></span>
    </div>
    <div class="product">
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
          <div class="item-count">X{{item.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderProduct",
  props: {
    item: {
      type: Object,
      defaule() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.item {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  padding-bottom: 5px;
}

.shop-name {
  font-size: 16px;
  margin-bottom: 5px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-left: 5px;
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
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  height: 100px;
}

.item-select {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
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
  align-items: center;
  font-size: 15px;
}

.item-price {
  color: orangered;
}
</style>