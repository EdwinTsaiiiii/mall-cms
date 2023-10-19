import type { IForm } from "@/base-ui/form";

const modalConfig: IForm = {
  pageName: "category",
  header: {
    title: ["新建数据", "new list"]
  },
  style: {
    dialogWidth: "50%",
    labelWidth: "140px",
    colLayout: {
      gutter: 0,
      span: 24
    }
  },
  handle: {
    yes: ["确定", "yes"],
    no: ["取消", "no"]
  },
  formItems: [
    {
      prop: "name",
      field: "input",
      label: ["商品类别", "goods category"],
      placeholder: ["请输入商品类别", "please input goods category"]
    }
  ]
};

export default modalConfig;
