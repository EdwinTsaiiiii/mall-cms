<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phoneInfo" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phoneInfo.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="auth_code">
        <el-input v-model="phoneInfo.auth_code" class="auth-code" />
        <el-button class="auth-code-btn" @click="getCode(phoneInfo.auth_code)">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    // 手机号登录信息
    const phoneInfo = reactive({
      phone: '',
      auth_code: ''
    })
    // 绑定的组件对象，此处需要获取某个组件对应的类型
    const formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
    // 登录逻辑
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 进行登录验证的逻辑
          store.dispatch('login/phoneLoginAction', { ...phoneInfo })
        }
      })
    }
    // 获取验证码
    const getCode = (phone: string) => {
      alert('暂不支持获取验证码业务')
    }
    return {
      rules,
      phoneInfo,
      formRef,
      loginAction,
      getCode
    }
  }
})
</script>
<style scoped>
.auth-code {
  width: 100px;
}
.auth-code-btn {
  margin-left: 15px;
}
</style>
