<template>
  <div class="list">
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @edit="onEdit" @add="addLocation"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LocationList",
  data() {
    return {
      chosenAddressId: '1',
      list: [],
    };
  },
  computed: {
    ...mapGetters(["location"]),
  },
  created() {
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
    }
  },
};
</script>

<style scoped>
</style>