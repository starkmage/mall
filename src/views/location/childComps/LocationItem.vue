<template>
  <div class="location">
    <div class="people">
      <span class="name">{{name}}</span>
      <span>{{tel}}</span>
      <span v-if="isDefault" class="is-default">默认</span>
    </div>
    <div class="address">{{address}}</div>
  </div>
</template>

<script>
export default {
  name: "OrderLocation",
  data() {
    return {
      name: "",
      tel: "",
      address: "",
      isDefault: false
    };
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    this.name = this.item.name;
    this.tel = this.item.tel;
    this.address =
      this.item.province +
      this.item.city +
      this.item.county +
      this.item.addressDetail;
    this.isDefault = this.item.isDefault
  },
};
</script>

<style scoped>
.location {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 3px solid rgba(0.1, 0.2, 0.2, 0.1);
}

.people {
  margin-left: 5px;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 600;
}

.name {
  margin-right: 15px;
}

.address {
  margin-left: 5px;
  font-size: 13px;
  color: #666;
}

.is-default {
  background-color: red;
  margin-left: 15px;
  color: #fff;
  font-size: 13px;
}
</style>