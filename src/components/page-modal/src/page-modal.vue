<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import useSystemStore from "@/store/main/system/system";
import SelfForm from "@/base-ui/form";
import type { IForm } from "@/base-ui/form";
import useMainStore from "@/store/main/main";

const dialogVisible = ref(false);
const isEdit = ref(false);
const editData = ref();

const props = defineProps<{ modalConfigRef: IForm }>();

// 语言
const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});

// 定义数据绑定
const formData = reactive({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
});

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
  if (!isEdit.value) {
    systemStore.newUserDataAction(formData);
  } else {
    systemStore.editUserDataAction(editData.value.id, formData);
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
