import { ref } from 'vue'
import pageModal from '@/components/page-modal'

// 页面是否有的逻辑，由页面进行决定
type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true
    editCb && editCb(item)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
