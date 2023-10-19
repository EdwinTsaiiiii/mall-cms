import type { IForm } from "@/base-ui/form";

const searchConfig: IForm = {
  pageName: "goods",
  header: [],
  style: {
    labelWidth: "120px",
    itemStyle: {
      padding: "5px 20px"
    },
    colLayout: {
      gutter: 24,
      span: 8
    }
  },
  handle: {
    reset: ["重置", "reset"],
    search: ["搜索", "search"]
  },
  formItems: [
    {
      prop: "id",
      field: "input",
      label: ["id", "id"],
      rules: [],
      placeholder: ["请输入id", "please input id"]
    },
    {
      prop: "name",
      field: "input",
      label: ["商品名称", "goods name"],
      rules: [],
      placeholder: ["请输入商品名称", "please input goods name"]
    },
    {
      prop: "enable",
      field: "select",
      label: ["状态", "status"],
      rules: [],
      placeholder: ["请选择状态", "please select status"],
      options: [
        {
          name: "已上架/on",
          id: 1
        },
        {
          name: "已下架/off",
          id: 0
        }
      ]
    },
    {
      prop: "address",
      field: "input",
      label: ["地址", "address"],
      rules: [],
      placeholder: ["请输入商品地址", "please input goods address"]
    },
    {
      prop: "createAt",
      field: "datepicker",
      label: ["创建时间", "created time"],
      rules: [],
      placeholder: ["请选择时间", "please select time"],
      otherOptions: {
        startPlaceholder: ["开始时间", "begin"],
        endPlaceholder: ["结束时间", "end"],
        field: "daterange"
      }
    }
  ]
};

export default searchConfig;
