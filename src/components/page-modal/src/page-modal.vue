<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import SelfForm from "@/base-ui/form";
import type { IForm } from "@/base-ui/form";
import useMainStore from "@/store/main/main";
import useSystemStore from "@/store/main/system/system";

const dialogVisible = ref(false);
const isEdit = ref(false);
const editData = ref();

const props = defineProps<{ modalConfigRef: IForm; otherInfo?: any }>();

// 语言
const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});

// 定义数据绑定,formData中的属性应该动态决定
const form = {};
for (const item of props.modalConfigRef.formItems) {
  form[item.prop] = "";
}
const formData = reactive(form);

// 定义弹窗（新建或编辑）
const setDialogVisible = (isNew: boolean, data: any = {}) => {
  dialogVisible.value = true;
  // 根据是不是新的，判断是否是编辑状态
  isEdit.value = !isNew;
  // 是编辑状态，将传入的数据输入到form中
  editData.value = data;
  for (const key in formData) {
    if (isNew) {
      formData[key] = "";
    } else {
      formData[key] = data[key];
    }
  }
};

// 点击确定
const systemStore = useSystemStore();
const handleConfirmClick = () => {
  const pageName = props.modalConfigRef.pageName;
  let data = { ...formData };
  //其他表单外的参数，如修改权限的相关的数据
  if (props.otherInfo) {
    data = { ...data, ...props.otherInfo };
  }
  // 判断是否编辑
  if (!isEdit.value) {
    systemStore.newPageDataAction(pageName, data);
  } else {
    systemStore.editPageDataAction(pageName, editData.value.id, data);
  }
  dialogVisible.value = false;
};

defineExpose({
  setDialogVisible
});
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="modalConfigRef.header.title[lan]"
      width="30%"
      center
    >
      <div class="form">
        <SelfForm
          v-bind="modalConfigRef"
          v-model:formData="formData"
        ></SelfForm>
        <slot></slot>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">
            {{ modalConfigRef.handle.no[lan] }}
          </el-button>
          <el-button type="primary" @click="handleConfirmClick">
            {{ modalConfigRef.handle.yes[lan] }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.form {
  padding: 10px 30px;
}
</style>
