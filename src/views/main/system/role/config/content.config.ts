import type { ITable } from "@/base-ui/table";

const contentConfig: ITable = {
  pageName: "role",
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
      width: 80
    },
    { field: "index", prop: "index", label: ["序号", "No"], width: 100 },
    {
      field: "normal",
      prop: "name",
      label: ["角色名称", "role name"],
      width: 260
    },
    {
      field: "normal",
      prop: "intro",
      label: ["角色权限", "role admission"],
      width: 260
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "creative time"],
      width: 300,
      slotName: "createAt"
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "update time"],
      width: 300,
      slotName: "updateAt"
    },
    {
      field: "handler",
      prop: "",
      label: ["操作", "operation"],
      width: 313,
      slotName: "handler"
    }
  ]
};

export default contentConfig;
