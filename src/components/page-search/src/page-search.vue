<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import SelfForm from "@/base-ui/form";
import type { IForm } from "@/base-ui/form";
import useMainStore from "@/store/main/main";

// 接收参数
const props = defineProps<{
  searchConfig: IForm;
}>();
const emit = defineEmits(["queryClick", "resetClick"]);

// 语言
const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});

// 创建表单的数据
const initialForm: any = {};
for (const item of props.searchConfig.formItems) {
  initialForm[item["prop"]] = item["initialValue"] ?? "";
}
const formData = reactive(initialForm);

// 监听按钮的点击
const selfFormRef = ref<InstanceType<typeof SelfForm>>();
// emit事件回调，子传父
const handleResetClick = () => {
  selfFormRef.value.handleResetFields();
  emit("resetClick");
};
const handleQueryClick = () => {
  emit("queryClick", formData);
};
</script>

<template>
  <div class="search">
    <SelfForm
      v-bind="searchConfig"
      v-model:formData="formData"
      ref="selfFormRef"
    >
      <template #footer>
        <div class="btns">
          <el-button type="default" @click="handleResetClick">
            <el-icon><RefreshRight /></el-icon>&nbsp;
            {{ searchConfig.handle.reset[lan] }}
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon><Search /></el-icon>
            {{ searchConfig.handle.search[lan] }}
          </el-button>
        </div>
      </template>
    </SelfForm>
  </div>
</template>

<style scoped lang="less">
.search {
  background-color: var(--day-bg-color1);
  padding: 20px;
  border-radius: 5px;
  transition: var(--day-night-transition);
}

.btns {
  text-align: right;
  padding: 0 0 10px 0;
}
</style>
