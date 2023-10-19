import type { ITable } from "@/base-ui/table";

const contentConfig: ITable = {
  pageName: "category",
  header: {
    title: ["分类列表", "category list"],
    button: ["新建分类", "create category"]
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
      width: 100
    },
    { field: "index", prop: "index", label: ["序号", "No"], width: 100 },
    {
      field: "normal",
      prop: "name",
      label: ["商品类别", "goods category"],
      width: 300
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "created time"],
      width: 350,
      slotName: "createAt"
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "updated time"],
      width: 350,
      slotName: "updateAt"
    },
    {
      field: "handler",
      prop: "",
      label: ["操作", "operation"],
      width: 413,
      slotName: "handler"
    }
  ]
};

export default contentConfig;
