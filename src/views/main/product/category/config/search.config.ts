import type { IForm } from "@/base-ui/form";

const searchConfig: IForm = {
  pageName: "category",
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
      label: ["商品类别", "goods category"],
      rules: [],
      placeholder: ["请输入商品类别", "please input goods category"]
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
