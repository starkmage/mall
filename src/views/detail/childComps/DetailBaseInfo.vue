<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.base-info {
  margin-top: 8px;
  padding: 0 8px;
  color: #999;
  border-bottom: 3px solid #f2f5f8;
}

.info-title {
  color: #222;
}

.info-price {
  margin-top: 12px;
}

.new-price {
  color: var(--color-high-text);
  font-size: 22px;
}

.old-price {
  font-size: 12px;
  margin-left: 7px;
  text-decoration: line-through;
}

.discount {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 7px;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
}

.info-other {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 25px;
  border-bottom: 1px solid rgba(100,100,100,0.1);
}

.info-service {
  /* margin-top: 16px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #333;
  line-height: 60px;
}

.info-service img {
  height: 14px;
  width: 14px;
  position: relative;
  top: 2px;
}
</style>