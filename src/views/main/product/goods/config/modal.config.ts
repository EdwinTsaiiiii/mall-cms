import type { IForm } from "@/base-ui/form";

const modalConfig: IForm = {
  pageName: "goods",
  header: {
    title: ["新建数据", "new list"]
  },
  style: {
    dialogWidth: "50%",
    labelWidth: "140px",
    colLayout: {
      gutter: 0,
      span: 24
    }
  },
  handle: {
    yes: ["确定", "yes"],
    no: ["取消", "no"]
  },
  formItems: [
    {
      prop: "name",
      field: "input",
      label: ["商品名", "goods name"],
      placeholder: ["请输入商品名", "please input goods name"]
    },
    {
      prop: "desc",
      field: "input",
      label: ["商品描述", "goods desc"],
      placeholder: ["请输入商品描述", "please input goods desc"]
    },
    {
      prop: "oldPrice",
      field: "input",
      label: ["原价格", "original price"],
      placeholder: ["请输入原价格", "please input original price"]
    },
    {
      prop: "newPrice",
      field: "input",
      label: ["现价格", "current price"],
      placeholder: ["请输入现价格", "please input current price"]
    },
    {
      prop: "imgUrl",
      field: "input",
      label: ["图片地址", "goods url"],
      placeholder: ["请输入图片地址", "please input address"]
    },
    {
      prop: "inventoryCount",
      field: "input",
      label: ["库存", "inventory"],
      placeholder: ["请输入库存", "please input inventory"]
    },
    {
      prop: "address",
      field: "input",
      label: ["地址", "address"],
      placeholder: ["请输入商品地址", "please input goods address"]
    }
  ]
};

export default modalConfig;
