import {debounce} from "./utils"

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    //监听item中的图片是否加载完成
    //这个地方图片img确实被挂载，但是图片还没有占据高度
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImageListener = () => { 
      refresh()
      // console.log('事件总线，商品item已加载')
    }
    // this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}

import BackTop from 'components/content/backtop/BackTop'

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    //回到顶部方法，第三个参数控制快慢ms
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}