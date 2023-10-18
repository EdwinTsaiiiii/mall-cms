import useMainStore from "@/store/main/main";
import type { IForm } from "@/base-ui/form";

// 将部门跟角色列表插入配置中
function useMapOptions(modalConfig: IForm) {
  const handleModalConfig = () => {
    const mainStore = useMainStore();
    // 此处不设置响应式
    let { entireRoles, entireDepartments } = mainStore;
    modalConfig.formItems.forEach((item) => {
      if (item.prop === "roleId" && entireRoles.length) {
        item.options = [...entireRoles];
      }
      if (item.prop === "departmentId" && entireDepartments.length) {
        item.options = [...entireDepartments];
      }
    });
    return modalConfig;
  };
  return {
    handleModalConfig
  };
}

export default useMapOptions;
