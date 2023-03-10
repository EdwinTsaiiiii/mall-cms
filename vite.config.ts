import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from 'path';
// import vitePluginRequire from "vite-plugin-require";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // vitePluginRequire({
    //   fileRegex:/(.jsx?|.tsx?|.vue)$/
    // })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true, //自动打开
    base: './ ', //生产环境路径
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: 'http://152.136.185.210:5000', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
