import "normalize.css";
import "./assets/css/index.less";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import icons from "@/global/register-icon";
import registerStore from "@/store";

const app = createApp(App);

app.use(icons);
registerStore(app);
app.use(router);
app.mount("#app");
