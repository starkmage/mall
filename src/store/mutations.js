import {ADD_COUNT, ADD_TO_CART, ADD_TO_SAMESHOP} from './mutation-types'

export default {
  //mutations唯一的目的就是修改state的值
  //mutations中的每个方法尽可能完成的事件比较单一
  [ADD_COUNT](state, payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state, payLoad) {
    state.cartList.push(payLoad)
  },
  [ADD_TO_SAMESHOP](state, payLoad) {
    let index
    for(let i = state.cartList.length - 1; i >= 0; i--) {
      if(state.cartList[i].shop === payLoad.shop) {
        index = i
        break
      }
    }
    state.cartList.splice(index+1, 0, payLoad)
  },
  changeCount(state, payLoad) {
    if(payLoad.newCount <= 0) {
      state.cartList.splice(payLoad.needIndex, 1)
    } else {
      state.cartList[payLoad.needIndex].count = payLoad.newCount
    }
  }
}