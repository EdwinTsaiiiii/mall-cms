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
      field: "normal",
      prop: "id",
      label: ["序号", "No"],
      minWidth: 80,
      isShow: true
    },
    {
      field: "normal",
      prop: "name",
      label: ["商品类别", "goods category"],
      isShow: true,
      minWidth: 80
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "created time"],
      slotName: "createAt",
      isShow: true,
      minWidth: 100
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "updated time"],
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
