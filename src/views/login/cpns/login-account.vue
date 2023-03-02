<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password" show-password>
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import LocalCache from '@/utils/cache'
export default defineComponent({
  setup() {
    // 账号信息
    const account = reactive({
      name: LocalCache.getCache('name') || '',
      password: LocalCache.getCache('password') || ''
    })
    // 绑定的组件对象，此处需要获取某个组件对应的类型
    const formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
    // 登录逻辑
    const loginAction = (isKeepPassword: boolean) => {
      console.log(formRef)
      formRef.value?.validate((valid) => {
        if (valid) {
          // 判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存 此处信息可以加密
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
            LocalCache.setCache('isKeepPassword', isKeepPassword)
          } else {
            // 清空缓存
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
            LocalCache.deleteCache('isKeepPassword')
          }
          // 进行登录验证的逻辑
          store.dispatch('login/accountLoginAction', { ...account })
        }else{
          alert('用户名或密码错误！')
        }
      })
    }
    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>
<style scoped></style>
