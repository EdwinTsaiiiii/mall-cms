import type { ITable } from "@/base-ui/table";

// 注意使用element-plus时，不能在tableItems中设置type，因为element-plus中的展开原理是给行元素添加type=expend所以导致冲突
const contentConfig: ITable = {
  pageName: "menu",
  permissionName: "system",
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
      minWidth: 80,
      isShow: true
    },
    {
      field: "normal",
      prop: "type",
      label: ["级别", "level"],
      minWidth: 80,
      isShow: true
    },
    {
      field: "normal",
      prop: "url",
      label: ["菜单url", "menu url"],
      minWidth: 140,
      isShow: true
    },
    {
      field: "icon",
      prop: "icon",
      label: ["菜单icon", "menu icon"],
      slotName: "icon",
      minWidth: 60,
      isShow: true
    },
    {
      field: "normal",
      prop: "sort",
      label: ["排序", "sort"],
      minWidth: 60,
      isShow: true
    },
    {
      field: "type",
      prop: "type",
      label: ["菜单类型", "menu type"],
      slotName: "type",
      minWidth: 120,
      isShow: true
    },
    {
      field: "normal",
      prop: "permission",
      label: ["权限", "admission"],
      minWidth: 120,
      isShow: true
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "created time"],
      slotName: "createAt",
      minWidth: 100,
      isShow: true
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "updated time"],
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
  ],
  childrenProps: {
    rowKey: "id",
    treeProps: { children: "children", hasChildren: "hasChildren" }
  }
};

export default contentConfig;
