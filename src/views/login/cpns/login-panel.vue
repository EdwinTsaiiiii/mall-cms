<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><User /></el-icon> 账号登录
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><Iphone /></el-icon> 手机登录
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword" :checked="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
import LocalCache from '../../../utils/cache'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 拿到login-account真正导出的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')
    console.log(currentTab)
    const isKeepPassword = ref(LocalCache.getCache('isKeepPassword') || false)
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value) // value不一定有值，采用?.
      }else{
        phoneRef.value?.loginAction()
			}
    }
    return {
      accountRef,
      phoneRef,
      isKeepPassword,
      handleLoginClick
    }
  }
})
</script>
<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }

  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
