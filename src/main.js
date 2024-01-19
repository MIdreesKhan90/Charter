import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/sass/main.scss";

import VCalendar from "v-calendar";

import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(VCalendar, {});
app.use(router);
app.use(LoadingPlugin);
app.use(Toast, {});
app.mount("#app");
