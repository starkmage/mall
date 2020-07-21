<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import {mapGetters} from 'vuex'

export default {
  name: "Shopcart",
  components: {
    NavBar
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
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>