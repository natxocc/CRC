import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify/lib";
import HighchartsVue from "highcharts-vue";
import "ag-grid-enterprise";
import locale from "./lang";
import "vuetify/src/stylus/app.styl";
import "./css.css";
Vue.use(Vuetify, {
  theme: {
    primary: "#004B9B",
    secondary: "#f0b400",
    accent: "#82B1FF"
  }
});
// import notify from "./plugins/notify.js";
// Vue.use(notify)
import { store } from './store.js'
Vue.use(HighchartsVue);
Vue.prototype.$lang = locale;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
