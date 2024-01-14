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

let labelWidth = ref<string>("120px");
window.addEventListener("resize", () => {
  if (window.visualViewport.width < 1200) labelWidth.value = "100px";
  if (window.visualViewport.width < 600) labelWidth.value = "80px";
  else labelWidth.value = "120px";
});
</script>

<template>
  <!-- 1.1.表单输入 -->
  <el-form
    :model="formData"
    ref="formRef"
    :label-width="labelWidth"
    size="large"
  >
    <el-row class="el-row">
      <template v-for="item in formItems" :key="item.prop">
        <el-col class="el-col">
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
  padding: 20px 0;
  margin-bottom: 0;
}

@media (min-width: 1200px) and (max-width: 1920px) {
  .el-col-24 {
    max-width: 33.3%;
    flex: 0 0 33.3%;
  }
}

@media (min-width: 900px) and (max-width: 1200px) {
  .el-col-24 {
    max-width: 50%;
    flex: 0 0 50%;
  }
}
</style>
