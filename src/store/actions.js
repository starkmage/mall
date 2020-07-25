import { ADD_COUNT, ADD_TO_CART, ADD_TO_SAMESHOP, LOGIN_IN, ADD_TO_FAVLIST } from './mutation-types'

export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      //1.查找之前购物车里是否有该商品
      let hasProduct = context.state.cartList.find(value => value.iid === payLoad.iid && value.color === payLoad.color && value.size === payLoad.size)

      //2.查找之前购物车里是否有同店铺的商品
      let hasShop = context.state.cartList.find(value => value.shop === payLoad.shop)

      //2.判断执行哪个mutations
      if (hasProduct) {
        context.commit(ADD_COUNT, hasProduct)
        resolve('商品数量加1')
      } else if (hasShop) {
        payLoad.count = 1
        context.commit(ADD_TO_SAMESHOP, payLoad)
        resolve('加入购物车成功')
      } else {
        payLoad.count = 1
        context.commit(ADD_TO_CART, payLoad)
        resolve('加入购物车成功')
      }
    })

  },

  loginIn(context, payLoad) {
    return new Promise((resolve, reject) => {
      context.commit(LOGIN_IN, payLoad)
      resolve('登录成功')
    })
  },

  addFav(context, payLoad) {
    return new Promise((resolve, reject) => {
      payLoad.fav = true
      context.commit(ADD_TO_FAVLIST, payLoad)
      resolve('收藏成功')
    })
  }
}