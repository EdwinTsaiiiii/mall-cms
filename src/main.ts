import "normalize.css";
import "./assets/css/index.less";
import { createApp } from "vue";
import App from "./App.vue";
import pinia from "@/store";
import router from "./router";

const obj = {
  name: "zs"
};

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
