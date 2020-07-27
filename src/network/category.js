import { request } from "./request"

//请求左侧分类数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

//请求子类的分类
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

//请求子类商品
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}