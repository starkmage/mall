<template>
  <div class="list">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/favlist/back.svg" alt="">
      </div>
      <div slot="center">选择收货地址</div>
    </nav-bar>
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @edit="onEdit" @add="addLocation" @select="selectLocation"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar";

export default {
  name: "OrderLocationList",
  data() {
    return {
      chosenAddressId: '1',
      list: [],
    };
  },
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(["location"]),
  },
  created() {
    this.chosenAddressId = String(this.$store.state.orderLocationIndex + 1)
    for (let index in this.location) {
      const obj = {};
      //注意这里的index是字符串
      obj.id = String(index*1+1);
      obj.name = this.location[index].name;
      obj.tel = this.location[index].tel;
      obj.address =
        this.location[index].province +
        "" +
        this.location[index].city +
        "" +
        this.location[index].county +
        "" +
        this.location[index].addressDetail;
      obj.isDefault = this.location[index].isDefault;
      this.list.push(obj);
    }
  },
  methods: {
    onEdit() {
      this.$toast.show("抱歉，暂不支持修改地址")
    },
    addLocation() {
      this.$router.push('/location/newlocation')
    },
    selectLocation(item,index) {
      this.$store.dispatch('selectOrderLocation', index).then(value => {
        this.$toast.show(value)
        this.$router.back()
      })
    },
    backClick() {
      this.$router.back()
    }
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.back img {
  width: 35%;
  position: relative;
  top: 5px;
}
</style>