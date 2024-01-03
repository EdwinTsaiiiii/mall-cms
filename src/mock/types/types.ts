export interface IMockData {
  idx?: number;
  title: string;
  location: string;
  house_type: string;
  house_code: string;
  price: string;
  tags: string;
  lease: string;
  area: string;
  orientation: string;
  floor: string;
  elevator: string;
  stall: string;
  water: string;
  electricity: string;
  fuel_gas: string;
  heating: string;
  facility: string;
  description: string;
}

export interface IMockDataList {
  IMockDataList: IMockData[];
}
