<template>
  <div class="fav-list">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/favlist/back.svg" alt="">
      </div>
      <div slot="center">我的收藏({{favList.length}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <fav-list-item v-for="(item,index) in favList" :key="index" :item="item"></fav-list-item>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import FavListItem from './childComps/FavListItem'

import {mapGetters} from 'vuex'

export default {
  name: "FavList",
  components: {
    NavBar,
    Scroll,
    FavListItem
  },
  computed: {
    ...mapGetters(['favList'])
  },
  methods: {
    backClick() {
      this.$router.back()
    }
  },
  mounted() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.fav-list {
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
  height: calc(100% - 44px);
  overflow: hidden;
}

</style>