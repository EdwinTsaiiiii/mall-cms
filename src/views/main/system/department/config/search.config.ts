import type { IForm } from "@/base-ui/form";

const searchConfig: IForm = {
  pageName: "department",
  header: [],
  style: {
    itemStyle: {
      padding: "5px 20px"
    }
  },
  handle: {
    reset: ["重置", "reset"],
    search: ["搜索", "search"]
  },
  formItems: [
    {
      label: ["部门名称", "department name"],
      prop: "name",
      field: "input",
      placeholder: ["请输入部门名称", "please input department name"]
    },
    {
      label: ["部门领导", "department leader"],
      prop: "leader",
      field: "input",
      placeholder: ["请输入部门领导", "please input department leader"]
    },
    {
      label: ["创建时间", "create time"],
      prop: "createAt",
      field: "datepicker",
      placeholder: ["请选择创建时间范围", "please select created time"],
      otherOptions: {
        startPlaceholder: ["开始时间", "begin"],
        endPlaceholder: ["结束时间", "end"],
        field: "daterange"
      }
    }
  ]
};

export default searchConfig;
