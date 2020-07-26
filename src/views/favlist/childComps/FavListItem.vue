<template>
  <div class="item" @click="itemClick">
      <div class="item-img">
        <img :src="item.image" alt />
      </div>
      <div class="item-info">
        <div class="item-title">{{item.title}}</div>
        <div class="fav-people">{{item.favs}}</div>
        <div class="item-price">￥{{item.price}}</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "FavListItem",
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    itemClick() {
      this.$router.push('/detail/' + this.item.iid)
    }
  }
};
</script>

<style scoped>
.item {
  display: flex;
  height: 100px;
  margin: 5px 5px 15px 5px;
  border-bottom: 1px solid rgba(0,0,0,0.1)
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

.fav-people {
  font-size: 13px;
  color: #555;
}

.item-price {
  color: orangered;
}
</style>