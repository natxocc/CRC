import Vue from "vue";
import Vuex from "vuex"
import lang from "./lang"
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    lang,
    loading: true,
    notify: {
      model: false,
      color: '',
      text: ''
    }
  }
})