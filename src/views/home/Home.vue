<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']"></tab-control>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from "./childComps/HomeRecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMultidata} from 'network/home'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    //1.请求首页多个数据
    getHomeMultidata().then(value => {
      this.banners = value.data.banner.list
      this.recommends = value.data.recommend.list
    })
  }
};
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>