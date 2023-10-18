import type { ITable } from "@/base-ui/table";

const contentConfig: ITable = {
  pageName: "users",
  header: {
    title: ["用户列表", "users list"],
    button: ["新建用户", "create user"]
  },
  handle: {
    yes: ["确定", "yes"],
    no: ["取消", "no"],
    edit: ["编辑", "edit"],
    delete: ["删除", "delete"],
    title: ["您确定要删除吗?", "Are you sure to delete?"]
  },
  tableItems: [
    {
      field: "selection",
      prop: "select",
      label: ["选择", "select"],
      width: 80
    },
    { field: "index", prop: "index", label: ["序号", "No"], width: 80 },
    {
      field: "normal",
      prop: "name",
      label: ["用户名", "username"],
      width: 200
    },
    {
      field: "normal",
      prop: "realname",
      label: ["真实姓名", "realname"],
      width: 200
    },
    {
      field: "normal",
      prop: "cellphone",
      label: ["手机号码", "cellphone"],
      width: 200
    },
    {
      field: "status",
      prop: "enable",
      label: ["状态", "status"],
      width: 133,
      slotName: "status"
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "creative time"],
      width: 240,
      slotName: "createAt"
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "update time"],
      width: 240,
      slotName: "updateAt"
    },
    {
      field: "handler",
      prop: "",
      label: ["操作", "operation"],
      width: 240,
      slotName: "handler"
    }
  ]
};

export default contentConfig;
