<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div
          v-for="(item,index) in slideCount"
          class="indi-item"
          :class="{active: index === currentIndex-1}"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000 //3000ms滚动一次
    },
    animDuration: {
      type: Number,
      default: 300 //300ms完成一张图片的滚动
    },
    moveRatio: {
      type: Number,
      default: 0.25 //手动滚动多少就会跳转到下一幅图
    },
    showIndicator: {
      type: Boolean,
      default: true //是否显示小圆点
    }
  },
  data() {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //swiper的宽度
      swiperStyle: {},
      currentIndex: 1,
      scrolling: false //是否正在滚动
    };
  },
  mounted() {
    //1.操作DOM，在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      //2.开启定时器
      this.startTime();
    }, 3000);
  },
  methods: {
    //定时器设置
    startTime() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer() {
      window.clearInterval(this.playTimer);
    },

    //设置滚动的位置
    setTransform(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`; //字符串中使用${}拼接变量，注意字符串用``
      this.swiperStyle["-webkit-transform"] = `translate3d(${position}px), 0, 0`; //兼容Safari和Chrome
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px), 0, 0`; //兼容IE9
    },

    //滚动到正确的位置
    scrollContent(currentPosition) {
      //1.设置正在滚动
      this.scrolling = true;
      //2.开始滚动
      this.swiperStyle.transition = "transform" + this.animDuration + "ms";
      this.setTransform(currentPosition);

      //3.判断滚动到的位置
      this.checkPosition();

      //4.滚动完成
      this.scrolling = false;
    },

    //判断是否滚动到正确位置
    checkPosition() {
      window.setTimeout(() => {
        //1.校验正确位置
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        //2.结束滚动后的回调
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },

    //操作DOM，在DOM前后添加Slide
    handleDom() {
      //1.获取要操作的元素
      let swiperEl = document.querySelector(".swiper"); //静态方法
      let slidesEls = []
      if(swiperEl) {
        slidesEls = swiperEl.getElementsByClassName("slide"); //动态方法
      }


      //2.保存个数
      this.slideCount = slidesEls.length;

      //3.如果大于1个，在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }

      //4.让swiper元素，显示第一个（目前是显示前面添加的最后一个元素）
      this.setTransform(-this.totalWidth);
    },

    //拖动事件的处理
    touchStart(e) {
      //1.如果正在移动，不可以拖动
      if (this.scrolling) return;

      //2.停止计时器
      this.stopTimer();

      //3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove(e) {
      //1.计算用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      //2.设置当前的位置
      this.setTransform(moveDistance);
    },

    touchEnd(e) {
      //1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      //2.判断最终的距离
      if (this.distance === 0) {
        return;
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex--;
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex++;
      }

      //3.滚动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //4.滚动完成后重新开启定时器
      this.startTime();
    },

    //小圆点控制上一个，下一个
    previous() {
      this.changeItem(-1);
    },

    next() {
      this.changeItem(1);
    },

    changeItem(num) {
      //1.移除定时器
      this.stopTimer();

      //2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //3.添加定时器
      this.startTime();
    }
  }
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>