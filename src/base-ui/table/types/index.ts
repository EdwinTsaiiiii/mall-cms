export interface ITableItems {
  field: string;
  prop: string;
  label: string[];
  minWidth?: number;
  slotName?: string;
  isShow: boolean;
}
export interface ITable {
  pageName: string;
  permissionName: string;
  tableItems: ITableItems[];
  header: any;
  handle?: any;
  childrenProps?: any;
}
