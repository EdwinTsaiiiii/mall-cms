import MyRequest from "../../index";

enum DashboardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",
  goodsAmountList = "/goods/amount/list"
}

export function getCategoryGoodsCount() {
  return MyRequest.get({
    url: DashboardAPI.categoryGoodsCount
  });
}

export function getCategoryGoodsSale() {
  return MyRequest.get({
    url: DashboardAPI.categoryGoodsSale
  });
}
export function getCategoryGoodsFavor() {
  return MyRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return MyRequest.get({
    url: DashboardAPI.addressGoodsSale
  });
}

export function getGoodsAmountList() {
  return MyRequest.get({
    url: DashboardAPI.goodsAmountList
  });
}
