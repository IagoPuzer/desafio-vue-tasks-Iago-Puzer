import { createApp } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import "./style.css";
import App from "./App.vue";
import "./plugins/axios";

createApp(App).use(createPinia()).use(ToastPlugin).mount("#app");
