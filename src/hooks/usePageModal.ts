import { ref } from "vue";
import type PageModal from "@/components/page-modal/page-modal.vue";

type callbackType = (item: any) => void;

// modal框是用来新建还是编辑
function usePageModal(editCallback?: callbackType) {
  const modalRef = ref<InstanceType<typeof PageModal>>();
  const handleNewDataClick = () => {
    // @ts-ignore
    modalRef.value?.setDialogVisible(true);
  };
  const handleEditDataClick = (data: any) => {
    if (editCallback) editCallback(data);
    // @ts-ignore
    modalRef.value?.setDialogVisible(false, data);
  };

  return {
    modalRef,
    handleNewDataClick,
    handleEditDataClick
  };
}

export default usePageModal;
