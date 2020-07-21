<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //1.创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    //2.回到顶部
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })

    //3.监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },

    refresh() {
      this.scroll && this.scroll.refresh()
      // console.log('我出现几次代表scroll的refresh被执行了几次，高度已经刷新');
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>>