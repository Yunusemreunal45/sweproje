import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // "./router/index.js" olarak da deneyebilirsiniz

createApp(App).use(router).mount("#app");
