import type { IForm } from "@/base-ui/form";

const searchConfig: IForm = {
  pageName: "user",
  header: [],
  style: {
    labelWidth: "120px",
    itemStyle: {
      padding: "5px 20px"
    },
    colLayout: {
      gutter: 24,
      span: 8
    }
  },
  handle: {
    reset: ["重置", "reset"],
    search: ["搜索", "search"]
  },
  formItems: [
    {
      prop: "id",
      field: "input",
      label: ["id", "id"],
      rules: [],
      placeholder: ["请输入id", "please input your id"]
    },
    {
      prop: "name",
      field: "input",
      label: ["用户名", "username"],
      rules: [],
      placeholder: ["请输入用户名", "please input your username"]
    },
    {
      prop: "realname",
      field: "input",
      label: ["真实姓名", "realname"],
      rules: [],
      placeholder: ["请输入真实姓名", "please input your real name"]
    },
    {
      prop: "cellphone",
      field: "input",
      label: ["手机号码", "cellphone"],
      rules: [],
      placeholder: ["请输入手机号码", "please input your cellphone"]
    },
    {
      prop: "enable",
      field: "select",
      label: ["状态", "status"],
      rules: [],
      placeholder: ["请选择状态", "please select status"],
      options: [
        {
          id: 1,
          name: "启用/on"
        },
        {
          id: 0,
          name: "禁用/off"
        }
      ]
    },
    {
      prop: "createAt",
      field: "datepicker",
      label: ["创建时间", "created time"],
      rules: [],
      placeholder: ["请选择时间", "please select time"],
      otherOptions: {
        startPlaceholder: ["开始时间", "begin"],
        endPlaceholder: ["结束时间", "end"],
        field: "daterange"
      }
    }
  ]
};

export default searchConfig;
