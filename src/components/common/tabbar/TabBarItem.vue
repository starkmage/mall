<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: [String, Object],
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      //看当前活跃的路由的路径是不是
      if(typeof this.path === 'string') {
        return this.$route.path.indexOf(this.path) !== -1
      }
      if(typeof this.path === 'object') {
        return this.$route.path === this.path.path
      }
    },
    activeStyle() {
      return this. isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      //加了catch防止重复点击同一个报错
      this.$router.replace(this.path).catch(err => err)
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 10px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
  margin-bottom: 4px;
}

</style>