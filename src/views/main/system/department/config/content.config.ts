import type { ITable } from "@/base-ui/table";

const contentConfig: ITable = {
  pageName: "department",
  header: {
    title: ["部门列表", "department list"],
    button: ["新建部门", "create department"]
  },
  handle: {
    yes: ["确定", "yes"],
    no: ["取消", "no"],
    edit: ["编辑", "edit"],
    delete: ["删除", "delete"],
    title: ["您确定要删除吗?", "Are you sure to delete?"]
  },
  tableItems: [
    { type: "selection", prop: "select", label: ["选择", "select"], width: 80 },
    { type: "index", prop: "index", label: ["序号", "No"], width: 80 },
    {
      type: "normal",
      prop: "name",
      label: ["部门名称", "department name"],
      width: 240
    },
    {
      type: "normal",
      prop: "leader",
      label: ["部门领导", "department leader"],
      width: 240
    },
    {
      type: "parent",
      prop: "parentId",
      label: ["上级部门", "superior department"],
      width: 240,
      slotName: "parentId"
    },
    {
      type: "time",
      prop: "createAt",
      label: ["创建时间", "creative time"],
      width: 240,
      slotName: "createAt"
    },
    {
      type: "time",
      prop: "updateAt",
      label: ["更新时间", "update time"],
      width: 240,
      slotName: "updateAt"
    },
    {
      type: "handler",
      prop: "",
      label: ["操作", "operation"],
      width: 253,
      slotName: "handler"
    }
  ]
};

export default contentConfig;
