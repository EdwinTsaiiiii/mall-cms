import type { App } from "vue";
import { createPinia } from "pinia";
import useLoginStore from "@/store/login/login";
const pinia = createPinia();

// 注册pinia仓库
function registerStore(app: App<Element>) {
  app.use(pinia);
  const loginStore = useLoginStore();
  loginStore.loadLocalDataAction();
}

export default registerStore;
