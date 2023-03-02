import SelfRequest from '../../index'

enum DashBboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
export function getCategoryGoodsCount() {
  return SelfRequest.get({
    url: DashBboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return SelfRequest.get({
    url: DashBboardAPI.categoryGoodsSale
  })
}export function getCategoryGoodsFavor() {
  return SelfRequest.get({
    url: DashBboardAPI.categoryGoodsFavor
  })
}export function getAddressGoodsSale() {
  return SelfRequest.get({
    url: DashBboardAPI.addressGoodsSale
  })
}
