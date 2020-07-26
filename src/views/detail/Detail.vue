<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ref="baseInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <div class="recommend" ref="recommend">
        <span>相似宝贝推荐</span>
      </div>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart" @addFav="addFav" @removeFav="removeFav" @buy="buy" :isFav="isFav"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      topList: [],
      isFav: false,
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //判断商品是否已经收藏
    for (let item of this.$store.state.favList) {
      if (item.iid === this.iid) {
        this.isFav = true;
      }
    }

    //2.根据iid请求详情数据
    getDetail(this.iid).then((value) => {
      const data = value.result;
      //1.顶部轮播图
      this.topImages = value.result.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services,
        data.skuInfo
      );
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.保存详情页信息
      this.detailInfo = data.detailInfo;
      //5.获取尺码等参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.请求推荐数据
    getRecommend().then((value) => {
      this.recommends = value.data.list;
    });
  },
  mounted() {
    //监听item中的图片是否加载完成
    /* const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImageListener = () => {refresh()}
    this.$bus.$on('itemImageLoad', this.itemImageListener) */

    this.$bus.$on("itemImageLoad", this.itemImageListener);
  },
  destroyed() {
    //离开详情页时关闭对滚动高度的刷新
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    //监听详情页图片加载
    imageLoad() {
      this.$refs.scroll.refresh();
      // console.log('详情图片已加载完成，高度已刷新')

      this.topList.push(0);
      this.topList.push(this.$refs.params.$el.offsetTop);
      this.topList.push(this.$refs.comment.$el.offsetTop);
      this.topList.push(this.$refs.recommend.offsetTop);
      // console.log(this.topList)
    },

    //点击navbar跳转到具体的位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.topList[index], 500);
    },

    //随着滚动改变顶部navbar的值
    contentScroll(position) {
      //1.获取y值
      const currentY = -position.y;

      //2.与NavBar的index进行比较
      //条件1，防止频繁赋值；条件2，防止越界
      for (let i = 0; i < this.topList.length; i++) {
        if (
          this.$refs.nav.currentIndex != i &&
          ((i < this.topList.length - 1 &&
            currentY >= this.topList[i] &&
            currentY < this.topList[i + 1]) ||
            (i === this.topList.length - 1 && currentY >= this.topList[i]))
        ) {
          this.$refs.nav.currentIndex = i;
        }
      }

      //3.监听什么时候显示回到顶部按钮
      this.isShowBackTop = -position.y > 1000;
    },

    //加入购物车操作
    addCart() {
      //保证商品数据加载之后才加入购物车
      if (this.topImages.length !== 0) {
        //1.获取购物车需要展示的信息
        const product = {};
        product.iid = this.iid;
        product.shop = this.shop.name;
        product.shopShow = true;
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.price = this.goods.nowPrice;
        product.color = this.goods.colors[this.$refs.baseInfo.selectedColor][
          "name"
        ];
        product.size = this.goods.sizes[this.$refs.baseInfo.selectedSize][
          "name"
        ];

        //2.将商品添加到购物车
        this.$store.dispatch("addCart", product).then((value) => {
          this.$toast.show(value, 500);
        });
      }
    },

    //把商品加入收藏夹
    addFav() {
      if (this.topImages.length !== 0) {
        //1.获取收藏夹需要展示的信息
        const product = {};
        product.iid = this.iid;
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.price = this.goods.nowPrice;
        product.favs = this.goods.columns[1];

        //2.把商品添加到收藏夹
        this.$store.dispatch("addFav", product).then((value) => {
          //更新界面收藏状态
          this.isFav = true

          this.$toast.show(value, 500);
        })
      }
    },

    //把商业移除收藏夹
    removeFav() {
      this.$store.dispatch("removeFav", this.iid).then((value) => {
        //更新界面收藏状态
        this.isFav = false
        
        this.$toast.show(value, 500);
      });
    },

    //生成订单页面
    buy() {
      this.$router.push('/order')
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 1;
  height: 100vh;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.recommend {
  font-size: 15px;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 12px;
}

.recommend span {
  display: inline-block;
  height: 30px;
  width: 150px;
  line-height: 30px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>