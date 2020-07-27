import { ADD_COUNT, ADD_TO_CART, ADD_TO_SAMESHOP, LOGIN_IN, ADD_TO_FAVLIST, REMOVE_FROM_FAVLIST, ADD_LOCATION, REMOVE_LOCATION, SELECT_ORDER_LOCATION, BUY_PRODUCT, CLEAN_PRODUCT } from './mutation-types'

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
  },

  //修改登录状态
  [LOGIN_IN](state, payLoad) {
    state.isLogin = true
    state.userId = payLoad
  },

  //添加到收藏夹
  [ADD_TO_FAVLIST](state, payLoad) {
    state.favList.push(payLoad)
  },

  //从收藏夹移除
  [REMOVE_FROM_FAVLIST](state, payLoad) {
    let removeIndex
    for (let index in state.favList) {
      if (state.favList[index].iid === payLoad) {
        removeIndex = index
      }
    }
    state.favList.splice(removeIndex, 1)
  },

  //添加地址
  [ADD_LOCATION](state, payLoad) {
    state.location.push(payLoad)
  },

  //删除地址
  [REMOVE_LOCATION](state, id) {
    for (let index in state.location) {
      if (state.location[index].id === id) {
        state.location.splice(index, 1)
      }
    }
  },

  //选择收货地址
  [SELECT_ORDER_LOCATION](state, index) {
    state.orderLocationIndex = index
  },

  //从详情页购买商品
  [BUY_PRODUCT](state, product) {
    state.orderProduct.push(product)
  },

  //订单页点击了后退按钮
  [CLEAN_PRODUCT](state) {
    state.orderProduct = []
  },

  //修改订单页商品是否显示店铺名字
  showShop(state) {
    state.orderProduct[0].shopShow = true
  }
}