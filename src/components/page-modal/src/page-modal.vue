<template>
  <!-- destroy-on-close关闭立即将组件销毁 -->
  <el-dialog
    v-model="dialogVisible"
    title="新建用户"
    width="30%"
    center
    destroy-on-close
  >
    <self-form v-bind="modalConfig" v-model="formData"></self-form>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleComfirmClick"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import SelfForm from '@/base-ui/form'
export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    SelfForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    const store = useStore()
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    // 点击确定按钮的逻辑
    const handleComfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleComfirmClick
    }
  }
})
</script>
<style scoped></style>
