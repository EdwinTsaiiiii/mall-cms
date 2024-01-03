export interface IAnalysis {
  categoryGoodsCount: ICategoryGoodsCount[];
  categoryGoodsSale: ICategoryGoodsSale[];
  categoryGoodsFavor: ICategoryGoodsFavor[];
  addressGoodsSale: IAddressGoodsSale[];
  goodsAmountList: IGoodsAmountList[];
}

export interface ICategoryGoodsCount {
  id: number;
  name: string;
  goodsCount: number;
}

export interface ICategoryGoodsSale {
  id: number;
  name: string;
  goodsSale: number;
}
export interface ICategoryGoodsFavor {
  id: number;
  name: string;
  goodsFavor: number;
}
export interface IAddressGoodsSale {
  address: string;
  count: number;
}
export interface IGoodsAmountList {
  tip: string;
  title: string;
  amount: string;
  number1: number;
  number2: number;
  subtitle: string;
}
