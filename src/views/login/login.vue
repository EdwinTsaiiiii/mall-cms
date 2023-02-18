<template>
  <div class="login">
    <!-- 组件创建出来一个组件的实例，是类 -->
    <login-panel></login-panel>
  </div>
</template>
<script lang="ts">
// defineComponent只是更好地支持ts
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'
export default defineComponent({ // defineComponent传入的是一个对象，不是类
  components:{
    LoginPanel
  },
  setup(){
    return{

    }
  }
})
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
