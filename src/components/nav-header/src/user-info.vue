<template>
  <div class="user-info">
    <el-dropdown>
      <div class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span class="user-name">{{ name }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.name)
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>
<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 10px;
  .user-name {
    margin-left: 5px;
  }
}
.el-dropdown-link:hover {
  background-color: rgb(248, 248, 248);
}
</style>
