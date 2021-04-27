import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import "./plugins/filters";

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  name: "Root",
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
