<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import type { IAccount } from "@/types/login";
import { ElMessage } from "element-plus";
import useLoginStore from "@/store/login/login";
import { localCache } from "@/utils/cache";
import { LOGIN_NAME, LOGIN_PASSWORD } from "@/global/constant";

// 1. 定义数据
const account = reactive<IAccount>({
  name: localCache.getCache(LOGIN_NAME) ?? "",
  password: localCache.getCache(LOGIN_PASSWORD) ?? ""
});

// 2. 定义校验信息
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入账号信息", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: "必须是6-20位数字或字母组成",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "请输入密码信息", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: "必须是至少6位数字或字母组成",
      trigger: "blur"
    }
  ]
});

// 3. 执行账号的登录逻辑
const formRef = ref<FormInstance>();
const loginStore = useLoginStore();
const loginAction = (isRemPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户帐号和密码
      const name = account.name;
      const password = account.password;
      // 向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache(LOGIN_NAME, name);
          localCache.setCache(LOGIN_PASSWORD, password);
        }
      });
    } else {
      ElMessage.error("请您输入正确的格式后再操作");
    }
  });
};

defineExpose({
  loginAction
});
</script>

<template>
  <div class="panel-account">
    <el-form
      ref="formRef"
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
