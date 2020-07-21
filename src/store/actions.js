import {ADD_COUNT, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, payLoad) {
    //1.查找之前购物车里是否有该商品
    let hasProduct = context.state.cartList.find(value => value.iid === payLoad.iid)

    //2.判断执行哪个mutations
    if (hasProduct) {
      context.commit(ADD_COUNT, hasProduct)
    } else {
      payLoad.count = 1
      context.commit(ADD_TO_CART, payLoad)
    }
  }
}