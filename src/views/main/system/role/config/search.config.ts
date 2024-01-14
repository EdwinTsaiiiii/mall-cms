import type { IForm } from "@/base-ui/form";

const searchConfig: IForm = {
  pageName: "role",
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
      label: ["角色名称", "role name"],
      prop: "name",
      field: "input",
      placeholder: ["请输入角色名称", "please input role name"]
    },
    {
      label: ["角色权限", "role admission"],
      prop: "intro",
      field: "input",
      placeholder: ["请输入角色权限", "please input role admission"]
    },
    {
      prop: "createAt",
      field: "datepicker",
      label: ["创建时间", "created time"],
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
