import type { ITable } from "@/base-ui/table";

const contentConfig: ITable = {
  pageName: "role",
  permissionName: "system",
  header: {
    title: ["角色列表", "users list"],
    button: ["新建角色", "create user"]
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
      minWidth: 80,
      isShow: true
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
      label: ["角色名称", "role name"],
      minWidth: 80,
      isShow: true
    },
    {
      field: "normal",
      prop: "intro",
      label: ["角色权限", "role admission"],
      minWidth: 80,
      isShow: true
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "creative time"],
      slotName: "createAt",
      minWidth: 100,
      isShow: true
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "update time"],
      slotName: "updateAt",
      minWidth: 100,
      isShow: true
    },
    {
      field: "handler",
      prop: "",
      label: ["操作", "operation"],
      slotName: "handler",
      minWidth: 80,
      isShow: true
    }
  ]
};

export default contentConfig;
