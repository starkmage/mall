<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed: {
    /* cartLength() {
      return this.$store.getters.cartLength
    } */

    //直接用store中的getters
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  height: calc(100% - 44px - 40px - 49px);
  overflow: hidden;
}
</style>