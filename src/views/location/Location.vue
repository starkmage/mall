<template>
  <div class="location">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/favlist/back.svg" alt />
      </div>
      <div slot="center">地址管理</div>
    </nav-bar>
    <!-- <location-list></location-list> -->

    <scroll class="content">
      <location-list></location-list>
    </scroll>
    <add-locatin></add-locatin>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import LocationList from "./childComps/LocationList";
import AddLocatin from "./childComps/AddLocation";

export default {
  name: "Location",
  components: {
    NavBar,
    Scroll,
    LocationList,
    AddLocatin,
  },
  data() {
    return {
      newLocation: false,
    };
  },
  methods: {
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.location {
  position: relative;
  z-index: 1;
  height: 100vh;
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

.content {
  height: calc(100% - 44px - 50px);
  overflow: hidden;
}
</style>