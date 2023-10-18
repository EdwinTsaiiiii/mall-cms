export interface ITableItems {
  field: string;
  prop: string;
  label: string[];
  width: number;
  slotName?: string;
}
export interface ITable {
  pageName: string;
  tableItems: ITableItems[];
  header: any;
  handle?: any;
  childrenProps?: any;
}
