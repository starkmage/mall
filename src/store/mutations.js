import {ADD_COUNT, ADD_TO_CART} from './mutation-types'

export default {
  //mutations唯一的目的就是修改state的值
  //mutations中的每个方法尽可能完成的事件比较单一
  [ADD_COUNT](state, payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state, payLoad) {
    state.cartList.push(payLoad)
  }
}