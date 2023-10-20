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
      field: "normal",
      prop: "id",
      label: ["id", "id"],
      isShow: true,
      minWidth: 50
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
      prop: "name",
      label: ["商品名称", "goods name"],
      isShow: true,
      minWidth: 150
    },
    {
      field: "normal",
      prop: "oldPrice",
      label: ["原价格", "original price"],
      slotName: "oldPrice",
      isShow: true,
      minWidth: 80
    },
    {
      field: "normal",
      prop: "newPrice",
      label: ["现价格", "current price"],
      slotName: "newPrice",
      isShow: true,
      minWidth: 80
    },
    {
      field: "image",
      prop: "imgUrl",
      label: ["商品图片", "goods picture"],
      slotName: "image",
      isShow: true,
      minWidth: 100
    },
    {
      field: "status",
      prop: "enable",
      label: ["状态", "status"],
      slotName: "status",
      isShow: true,
      minWidth: 60
    },
    {
      field: "normal",
      prop: "inventoryCount",
      label: ["库存", "inventory"],
      isShow: true,
      minWidth: 70
    },
    {
      field: "normal",
      prop: "saleCount",
      label: ["销量", "sale count"],
      isShow: true,
      minWidth: 70
    },
    {
      field: "normal",
      prop: "address",
      label: ["地址", "address"],
      isShow: true,
      minWidth: 80
    },
    {
      field: "time",
      prop: "createAt",
      label: ["创建时间", "creative time"],
      slotName: "createAt",
      isShow: true,
      minWidth: 120
    },
    {
      field: "time",
      prop: "updateAt",
      label: ["更新时间", "update time"],
      slotName: "updateAt",
      isShow: true,
      minWidth: 120
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
