import type { IForm } from "@/base-ui/form";

const modalConfig: IForm = {
  pageName: "menu",
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
      label: ["菜单名", "menu name"],
      placeholder: ["请输入菜单名", "please input menu name"]
    },
    {
      prop: "type",
      field: "input",
      label: ["菜单级别", "menu level"],
      placeholder: ["请输入菜单级别", "please input menu level"]
    },
    {
      prop: "url",
      field: "input",
      label: ["路由地址", "route location"],
      placeholder: ["请输入路由地址", "please input route location"]
    },
    {
      prop: "sort",
      field: "input",
      label: ["菜单序列", "menu order"],
      placeholder: ["请输入菜单序列", "please input menu order"]
    },
    {
      prop: "parentId",
      field: "input",
      label: ["父级Id", "parent Id"],
      placeholder: ["请输入父级Id", "please input parent Id"]
    }
  ]
};

export default modalConfig;
