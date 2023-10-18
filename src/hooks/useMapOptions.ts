import useMainStore from "@/store/main/main";
import type { IForm } from "@/base-ui/form";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";

// 将部门跟角色列表插入配置中
function useMapOptions(modalConfig: IForm) {
  const handleModalConfig = () => {
    const mainStore = useMainStore();
    let { entireRoles, entireDepartments } = storeToRefs(mainStore);
    // 为了去除proxy
    const entireDepartments_new = toRaw(entireDepartments.value);
    const entireRoles_new = toRaw(entireRoles.value);
    modalConfig.formItems.forEach((item) => {
      if (item.prop === "roleId" && entireRoles_new.length) {
        item.options = [...entireRoles_new];
      }
      if (item.prop === "departmentId" && entireDepartments_new.length) {
        item.options = [...entireDepartments_new];
      }
    });
    return modalConfig;
  };
  return {
    handleModalConfig
  };
}

export default useMapOptions;
