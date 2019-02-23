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
Vue.use(HighchartsVue);
Vue.prototype.$lang = locale;
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
