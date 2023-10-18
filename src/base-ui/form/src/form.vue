<script setup lang="ts">
import type { FormInstance } from "element-plus";
import type { IFormItem } from "@/base-ui/form";
import useMainStore from "@/store/main/main";
import { computed, ref } from "vue";

const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});

// 接收参数
defineProps<{
  pageName: string;
  style: any;
  header: any;
  handle: any;
  formItems: IFormItem[];
  formData: any;
}>();

// 注意取formRef步骤不能在放方法中
const formRef = ref<FormInstance>();

const handleResetFields = () => {
  formRef.value?.resetFields();
};

defineExpose({
  handleResetFields
});
</script>

<template>
  <!-- 1.1.表单输入 -->
  <el-form
    :model="formData"
    ref="formRef"
    :label-width="style.labelWidth"
    size="large"
  >
    <el-row :gutter="style.colLayout.gutter">
      <template v-for="item in formItems" :key="item.prop">
        <el-col :span="style.colLayout.span">
          <el-form-item :label="item.label[lan]" :prop="item.prop">
            <!--输入类型-->
            <template v-if="item.field === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder[lan]"
              />
            </template>
            <!--密码类型-->
            <template v-if="item.field === 'password'">
              <el-input
                show-password
                v-model="formData[item.prop]"
                :placeholder="item.placeholder[lan]"
              />
            </template>
            <!--选择类型-->
            <template v-if="item.field === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.placeholder[lan]"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.id">
                  <el-option :label="option.name" :value="option.id" />
                </template>
              </el-select>
            </template>
            <!--日期选择类型-->
            <template v-if="item.field === 'datepicker'">
              <el-date-picker
                :type="item.otherOptions.field"
                range-separator="-"
                :start-placeholder="item.otherOptions.startPlaceholder[lan]"
                :end-placeholder="item.otherOptions.endPlaceholder[lan]"
                v-model="formData.createAt"
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<style scoped lang="less">
:global(.el-input__wrapper) {
  transition: var(--day-night-transition) !important;
}

.el-form-item {
  padding: 20px 40px;
  margin-bottom: 0;
}
</style>
