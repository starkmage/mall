<template>
  <div class="cart-list">
    <cart-list-item v-for="(product,index) in cartList" :key="index" :item="product" :index="index"></cart-list-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CartListItem from './CartListItem'




export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>

</style>