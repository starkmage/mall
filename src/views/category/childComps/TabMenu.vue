<template>
  <scroll class="tab-menu">
    <div class="menu-item" v-for="(item,index) in categories" :key="index" :class="{active: index===currentIndex}" @click="itemClick(index)">
      {{item.title}}
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"

export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('selectTab', index)
    }
  }
}
</script>

<style scoped>
.tab-menu {
  width: 100px;
  height: 100%;
  box-sizing: border-box;
  background-color: #f6f6f6;
}

.menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.active {
  font-weight: 600;
  color: var(--color-high-text);
  border-left: 3px solid var(--color-high-text);
  background-color: #fff;
}
</style>