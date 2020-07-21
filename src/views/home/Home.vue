<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" v-show="isTabFixed" class="tab-control" ref="tabControlSub"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
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

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from "./childComps/HomeRecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'


export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommendView,
    FeatureView
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
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

  mounted() {
    //监听item中的图片是否加载完成
    //这个地方图片img确实被挂载，但是图片还没有占据高度
    /* const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImageListener = () => {refresh()}
    this.$bus.$on('itemImageLoad', this.itemImageListener) */
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)

    //回到首页，一定要刷新一次，要不然会出现莫名其妙的问题
    this.$refs.scroll.refresh()

    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },

  deactivated() {
    //1.保存离开时的y值
    this.saveY = this.$refs.scroll.getScrollY()

    //2.取消首页的高度刷新
    this.$bus.$off('itemImageLoad', this.itemImageListener)
    //取消了有一个问题，再回来的时候需要再次激活
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
      this.$refs.tabControlSub.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },

    //滚动监听
    contentScroll(position) {
      //控制什么时候显示回到顶部按钮
      this.isShowBackTop = -position.y > 1000

      //控制tab-control是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop
    },

    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
      // console.log("已经加载更多商品了")
    },

    //tab-control的offset获取
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
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
    /* 使用better-scroll，以下属性不需要了
    position: sticky;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
  } */
  .content {
    overflow: hidden;
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
    top: 44px;
  }

  .tab-control {
    position: relative;
    z-index: 1;
  }
</style>