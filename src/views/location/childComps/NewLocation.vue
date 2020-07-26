<template>
  <div class="new-location">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/favlist/back.svg" alt />
      </div>
      <div slot="center">添加新地址</div>
    </nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import areaList from "assets/area.js";

import NavBar from "components/common/navbar/NavBar";

export default {
  name: "NewLocation",
  data() {
    return {
      areaList
    };
  },
  components: {
    NavBar,
  },
  methods: {
    onSave(content) {
      this.$store.dispatch('addLocation',content).then(value => {
        this.$toast.show(value)
        this.$router.back()
      })
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.new-location {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}

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