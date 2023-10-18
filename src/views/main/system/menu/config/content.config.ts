import type { ITable } from "@/base-ui/table";

// 注意使用element-plus时，不能在tableItems中设置type，因为element-plus中的展开原理是给行元素添加type=expend所以导致冲突
const contentConfig: ITable = {
  pageName: "menu",
  header: {
    title: ["菜单列表", "menu list"],
    button: ["新建菜单", "create menu"]
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
      field: "normal",
      prop: "name",
      label: ["菜单名称", "menu name"],
      width: 180
    },
    { field: "normal", prop: "type", label: ["级别", "level"], width: 103 },
    {
      field: "normal",
      prop: "url",
      label: ["菜单url", "menu url"],
      width: 210
    },
    {
      field: "normal",
      prop: "icon",
      label: ["菜单icon", "menu icon"],
      width: 210
    },
    { field: "normal", prop: "sort", label: ["排序", "sort"], width: 90 },
    {
      field: "normal",
      prop: "permission",
      label: ["权限", "admission"],
      width: 210
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "created time"],
      width: 200,
      slotName: "createAt"
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "updated time"],
      width: 200,
      slotName: "updateAt"
    },
    {
      field: "handler",
      prop: "",
      label: ["操作", "operation"],
      width: 227,
      slotName: "handler"
    }
  ],
  childrenProps: {
    rowKey: "id",
    treeProps: { children: "children", hasChildren: "hasChildren" }
  }
};

export default contentConfig;
