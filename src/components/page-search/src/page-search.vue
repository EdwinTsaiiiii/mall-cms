<template>
  <self-form v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h1 class="header">高级检索</h1>
    </template>
    <template #footer>
      <div class="handle-btns">
        <el-button type="default" @click="handleResetClick">
          <el-icon><RefreshRight /></el-icon>&nbsp;重置
        </el-button>
        <el-button type="primary" @click="handleQueryClick">
          <el-icon><Search /></el-icon>&nbsp;搜索
        </el-button>
      </div>
    </template>
  </self-form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import SelfForm from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    SelfForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性，应该由配置文件中的fields决定
    // 优化1 ：fromData中的属性应该动态决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // 优化2：点击重置操作
    const handleResetClick = () => {
      // for(const key in formOriginData){
      //   // 如果form组件中是双向绑定，不能直接修改，要通过每个key去修改
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // formData.value改变 -> formData改变 -> form中的modelValue改变 -> :model-value改变
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    // 优化3：点击搜索操作
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>
<style scoped>
.header {
  margin: 0;
  padding: 40px 0 10px;
  font-size: 24px;
  color: #409eff;
}
.handle-btns {
  text-align: right;
  padding: 0 40px 30px 0;
}
</style>
