import type { ITable } from "@/base-ui/table";

const contentConfig: ITable = {
  pageName: "goods",
  header: {
    title: ["商品列表", "goods list"],
    button: ["新建商品", "create goods"]
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
      width: 60
    },
    { field: "index", prop: "index", label: ["序号", "No"], width: 60 },
    {
      field: "normal",
      prop: "name",
      label: ["商品名称", "goods name"],
      width: 273
    },
    {
      field: "normal",
      prop: "oldPrice",
      label: ["原价格", "original price"],
      width: 80,
      slotName: "oldPrice"
    },
    {
      field: "normal",
      prop: "newPrice",
      label: ["现价格", "current price"],
      width: 80,
      slotName: "newPrice"
    },
    {
      field: "image",
      prop: "imgUrl",
      label: ["商品图片", "goods picture"],
      width: 140,
      slotName: "image"
    },
    {
      field: "status",
      prop: "enable",
      label: ["状态", "status"],
      width: 100,
      slotName: "status"
    },
    {
      field: "normal",
      prop: "inventoryCount",
      label: ["库存", "inventory"],
      width: 80
    },
    {
      field: "normal",
      prop: "saleCount",
      label: ["销量", "sale count"],
      width: 80
    },
    { field: "normal", prop: "address", label: ["地址", "address"], width: 80 },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "creative time"],
      width: 190,
      slotName: "createAt"
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "update time"],
      width: 190,
      slotName: "updateAt"
    },
    {
      field: "handler",
      prop: "",
      label: ["操作", "operation"],
      width: 200,
      slotName: "handler"
    }
  ]
};

export default contentConfig;
