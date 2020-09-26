import { ADD_COUNT, ADD_TO_CART, ADD_TO_SAMESHOP, LOGIN_IN, ADD_TO_FAVLIST, REMOVE_FROM_FAVLIST, ADD_LOCATION, REMOVE_LOCATION, SELECT_ORDER_LOCATION, BUY_PRODUCT, CLEAN_PRODUCT, CREATE_ORDER } from './mutation-types'

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
      context.commit(ADD_TO_FAVLIST, payLoad)
      resolve('收藏成功')
    })
  },

  removeFav(context, payLoad) {
    return new Promise((resolve, reject) => {
      context.commit(REMOVE_FROM_FAVLIST, payLoad)
      resolve('已取消收藏')
    })
  },

  addLocation(context, payLoad) {
    return new Promise((resolve, reject) => {
      context.commit(ADD_LOCATION, payLoad)
      resolve('地址添加成功')
    })
  },

  removeLocation(context, id) {
    return new Promise((resolve, reject) => {
      context.commit(REMOVE_LOCATION, id)
      resolve('删除地址成功')
    })
  },

  selectOrderLocation(context, index) {
    return new Promise((resolve, reject) => {
      context.commit(SELECT_ORDER_LOCATION, index)
      resolve('成功选择收货地址')
    })
  },

  buyProduct(context, product) {
    return new Promise((resolve, reject) => {
      context.commit(BUY_PRODUCT, product)
      resolve('正在生成订单')
    })
  },

  cleanProduct(context) {
    context.commit(CLEAN_PRODUCT)
  },

  createOrder(context, products) {
    return new Promise((resolve, reject) => {
      context.commit(CREATE_ORDER, products)
      resolve('下单成功，由赵公子买单')
    })

  }
}