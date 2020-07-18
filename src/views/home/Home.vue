<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>   
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from "./childComps/HomeRecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMultidata, getHomeGoods} from 'network/home'


export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    HomeRecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  created() {
    //1.请求首页多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },

  methods: {
    //网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(value => {
        this.banners = value.data.banner.list
        this.recommends = value.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(value => {
        this.goods[type].list.push(...value.data.list)
        this.goods[type].page++
      })
    },

    //事件监听相关的方法
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    //回到顶部方法，第三个参数控制快慢ms
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    //控制什么时候显示回到顶部按钮
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
    },

    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    }
  }
};
</script>

<style scoped>
  #home {
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    position: sticky;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
  }
  /* .content {
    overflow: hidden;
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
    top: 44px;
  } */
</style>