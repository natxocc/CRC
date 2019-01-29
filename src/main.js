import Vue from 'vue'
import App from './App.vue'
import router from './router'
import HighchartsVue from 'highcharts-vue'
// import Quasar from 'quasar'
import Quasar from './lib/quasar.esm'
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css"
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css"
import 'ag-grid-enterprise'
// import "./lib/ag-grid-enterprise.min"
import "./lib/icons.css"
import "./lib/customCSS.css"
// import "../node_modules/quasar/dist/quasar.min.css"
import "./lib/quasar.min.css"
Vue.config.productionTip = false
Vue.use(Quasar)
Vue.use(HighchartsVue);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
