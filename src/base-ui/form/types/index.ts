type IFormType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  prop: string;
  type: IFormType;
  label: string[];
  rules?: any[];
  placeholder?: any;
  // 针对select
  options?: any[];
  // 针对特殊属性
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IForm {
  pageName: string;
  header?: any;
  formItems: IFormItem[];
  style?: any;
  handle?: any;
}
