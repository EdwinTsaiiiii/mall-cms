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
      label: ["部门名称", "department name"],
      minWidth: 80,
      isShow: true
    },
    {
      field: "normal",
      prop: "leader",
      label: ["部门领导", "department leader"],
      minWidth: 80,
      isShow: true
    },
    {
      field: "parent",
      prop: "parentId",
      label: ["上级部门", "superior department"],
      minWidth: 80,
      slotName: "parentId",
      isShow: true
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "creative time"],
      minWidth: 100,
      slotName: "createAt",
      isShow: true
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "update time"],
      minWidth: 100,
      slotName: "updateAt",
      isShow: true
    },
    {
      field: "handler",
      prop: "",
      label: ["操作", "operation"],
      minWidth: 80,
      slotName: "handler",
      isShow: true
    }
  ]
};

export default contentConfig;
