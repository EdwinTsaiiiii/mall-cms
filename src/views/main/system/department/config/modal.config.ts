import type { IForm } from "@/base-ui/form";

const modalConfig: IForm = {
  pageName: "department",
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
      label: ["部门名称", "department name"],
      prop: "name",
      type: "input",
      placeholder: ["请输入部门名称", "please input department name"]
    },
    {
      label: ["部门领导", "department leader"],
      prop: "leader",
      type: "input",
      placeholder: ["请输入部门领导", "please input department leader"]
    },
    {
      prop: "departmentId",
      type: "select",
      label: ["上级部门", "superior department"],
      placeholder: ["请选择上级部门", "please select superior department"],
      options: [{ id: "111", name: "无" }]
    }
  ]
};

export default modalConfig;
