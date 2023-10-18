import type { IForm } from "@/base-ui/form";

const modalConfig: IForm = {
  pageName: "role",
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
      field: "input",
      label: ["角色名称", "role name"],
      prop: "name",
      placeholder: ["请输入角色名称", "please input role name"]
    },
    {
      field: "input",
      label: ["权限介绍", "admission intro"],
      prop: "intro",
      placeholder: ["请输入权限介绍", "please input admission intro"]
    }
  ]
};

export default modalConfig;
