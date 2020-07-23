import { ADD_COUNT, ADD_TO_CART, ADD_TO_SAMESHOP } from './mutation-types'

export default {
  addCart(context, payLoad) {
    //1.查找之前购物车里是否有该商品
    let hasProduct = context.state.cartList.find(value => value.iid === payLoad.iid && value.color === payLoad.color && value.size === payLoad.size)

    //2.查找之前购物车里是否有同店铺的商品
    let hasShop = context.state.cartList.find(value => value.shop === payLoad.shop)

    //2.判断执行哪个mutations
    if (hasProduct) {
      context.commit(ADD_COUNT, hasProduct)
    } else if (hasShop) {
      payLoad.count = 1
      context.commit(ADD_TO_SAMESHOP, payLoad)
    } else {
      payLoad.count = 1
      context.commit(ADD_TO_CART, payLoad)
    }
  }
}