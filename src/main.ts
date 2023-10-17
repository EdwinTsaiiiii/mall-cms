import "normalize.css";
import "./assets/css/index.less";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import icons from "@/global/register-icon";
import registerStore from "@/store";
// @ts-ignore
import ElementPlus from "element-plus";
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn
});
app.use(icons);
registerStore(app);
app.use(router);
app.mount("#app");
