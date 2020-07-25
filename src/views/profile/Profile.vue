<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">斯塔克商城</div>
    </nav-bar>
    <user-name></user-name>
    <user-info></user-info>
    <user-other></user-other>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import UserName from "./childComps/UserName";
import UserInfo from "./childComps/UserInfo"
import UserOther from "./childComps/UserOther"

export default {
  name: "Profile",
  components: {
    NavBar,
    UserName,
    UserInfo,
    UserOther
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>