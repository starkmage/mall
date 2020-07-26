<template>
  <div class="location" @click="changeLocation">
    <div class="people">
      <span class="name">{{name}}</span>
      <span>{{tel}}</span>
    </div>
    <div class="address">{{address}}</div>
    <i class="arrow-right"></i>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OrderLocation",
  data() {
    return {
      index: 0,
      name: "",
      tel: "",
      address: "",
    };
  },
  computed: {
    ...mapGetters(["location"]),
  },
  created() {
    this.index = this.$store.state.orderLocationIndex
    if (this.location.length !== 0) {
      this.name = this.location[this.index].name;
      this.tel = this.location[this.index].tel;
      this.address =
        this.location[this.index].province +
        this.location[this.index].city +
        this.location[this.index].county +
        this.location[this.index].addressDetail;
    } else {
      this.name = "地址为空";
      this.address = "请先创建地址";
    }
  },
  methods: {
    changeLocation() {
      this.$router.push('/order/selectlocation')
    }
  }
};
</script>

<style scoped>
.location {
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 5px solid rgba(0.1, 0.2, 0.2, 0.1)
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

i {
  position: relative;
  right: 10px;
  top: -20px;
  float: right;
}
</style>