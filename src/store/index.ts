import type { App } from "vue";
import { createPinia } from "pinia";
import useLoginStore from "@/store/login/login";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN } from "@/global/constant";
const pinia = createPinia();

// 注册pinia仓库
function registerStore(app: App<Element>) {
  app.use(pinia);
  const loginStore = useLoginStore();
  // 有token 的情况可以加载这些
  if (localCache.getCache(LOGIN_TOKEN)) {
    loginStore.loadLocalDataAction();
  }
}

export default registerStore;
