import { ref } from "vue";
import type PageContent from "@/components/page-content/page-content.vue";

// search中的查询查询和重置
function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>();
  const handleQueryClick = (searchInfo: any) => {
    // @ts-ignore
    contentRef.value?.fetchUserListData(searchInfo);
  };
  const handleResetClick = () => {
    // @ts-ignore
    contentRef.value?.handleResetClick();
  };
  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  };
}

export default usePageContent;
