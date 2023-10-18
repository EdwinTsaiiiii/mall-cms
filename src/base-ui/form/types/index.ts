type IFormType = "input" | "password" | "select" | "datepicker" | "custom";

export interface IFormItem {
  prop: string;
  field: IFormType;
  label: string[];
  rules?: any[];
  placeholder?: any;
  // 针对select
  options?: any[];
  // 针对特殊属性
  otherOptions?: any;
  isHidden?: boolean;
  slotName?: string;
}

export interface IForm {
  pageName: string;
  header?: any;
  formItems: IFormItem[];
  style?: any;
  handle?: any;
}
