import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import {

} from '@fortawesome/free-regular-svg-icons'
import {  } from "@fortawesome/free-regular-svg-icons";
import "./assets/scss/main.scss";

library.add(
  faAngleDown,
  faAngleUp,
  faXmark
);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);

app.use(router);

app.mount("#app");
