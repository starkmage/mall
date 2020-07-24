import { ADD_COUNT, ADD_TO_CART, ADD_TO_SAMESHOP } from './mutation-types'

export default {
  //mutations唯一的目的就是修改state的值
  //mutations中的每个方法尽可能完成的事件比较单一
  [ADD_COUNT](state, payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state, payLoad) {
    payLoad.selected = true
    state.cartList.push(payLoad)
  },
  [ADD_TO_SAMESHOP](state, payLoad) {
    payLoad.selected = true
    let index
    for (let i = state.cartList.length - 1; i >= 0; i--) {
      if (state.cartList[i].shop === payLoad.shop) {
        index = i
        break
      }
    }
    payLoad.shopShow = false
    state.cartList.splice(index + 1, 0, payLoad)
  },
  changeCount(state, payLoad) {
    //当删除一个商品时，需要考虑的情况
    //1.商品的index为0，或者商品是最后一个index时，要考虑越界的情况
    if (payLoad.newCount <= 0) {
      if ((payLoad.needIndex === 0 && state.cartList.length > 1 && state.cartList[payLoad.needIndex + 1].shop === state.cartList[payLoad.needIndex].shop) || (payLoad.needIndex > 0 && payLoad.needIndex !== state.cartList.length - 1 && state.cartList[payLoad.needIndex + 1].shop === state.cartList[payLoad.needIndex].shop && state.cartList[payLoad.needIndex - 1].shop !== state.cartList[payLoad.needIndex].shop)) {
        state.cartList[payLoad.needIndex + 1].shopShow = true
      }
      state.cartList.splice(payLoad.needIndex, 1)
    } else {
      state.cartList[payLoad.needIndex].count = payLoad.newCount
    }
  },
  changeSelected(state, payLoad) {
    state.cartList[payLoad].selected = !state.cartList[payLoad].selected
  }
}