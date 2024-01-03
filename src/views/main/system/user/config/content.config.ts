import type { ITable } from "@/base-ui/table";

const contentConfig: ITable = {
  pageName: "users",
  permissionName: "system",
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
      isShow: true,
      minWidth: 80
    },
    {
      field: "index",
      prop: "index",
      label: ["序号", "No"],
      isShow: true,
      minWidth: 80
    },
    {
      field: "normal",
      prop: "id",
      label: ["id", "id"],
      minWidth: 50,
      isShow: true
    },
    {
      field: "normal",
      prop: "name",
      label: ["用户名", "username"],
      isShow: true,
      minWidth: 80
    },
    {
      field: "normal",
      prop: "realname",
      label: ["真实姓名", "realname"],
      isShow: true,
      minWidth: 80
    },
    {
      field: "normal",
      prop: "cellphone",
      label: ["手机号码", "cellphone"],
      isShow: true,
      minWidth: 80
    },
    {
      field: "status",
      prop: "enable",
      label: ["状态", "status"],
      slotName: "status",
      isShow: true,
      minWidth: 50
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "creative time"],
      slotName: "createAt",
      isShow: true,
      minWidth: 100
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "update time"],
      slotName: "updateAt",
      isShow: true,
      minWidth: 100
    },
    {
      field: "handler",
      prop: "",
      label: ["操作", "operation"],
      slotName: "handler",
      isShow: true,
      minWidth: 80
    }
  ]
};

export default contentConfig;
