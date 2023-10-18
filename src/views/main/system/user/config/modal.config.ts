import type { IForm } from "@/base-ui/form";

const modalConfig: IForm = {
  pageName: "users",
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
      label: ["用户名", "username"],
      placeholder: ["请输入用户名", "please input your username"]
    },
    {
      prop: "realname",
      field: "input",
      label: ["真实姓名", "realname"],
      placeholder: ["请输入真实姓名", "please input your real name"]
    },
    {
      prop: "password",
      field: "password",
      label: ["用户密码", "user password"],
      placeholder: ["请输入密码", "please input your password"],
      isHidden: false
    },
    {
      prop: "cellphone",
      field: "input",
      label: ["手机号码", "cellphone"],
      placeholder: ["请输入手机号码", "please input your cellphone"]
    },
    {
      prop: "departmentId",
      field: "select",
      label: ["选择部门", "select department"],
      placeholder: ["请选择部门", "please select your department"],
      options: [{ id: "111", name: "无" }]
    },
    {
      prop: "roleId",
      field: "select",
      label: ["选择角色", "select role"],
      placeholder: ["请选择角色", "please select your role"],
      options: [{ id: "111", name: "无" }]
    }
  ]
};

export default modalConfig;
