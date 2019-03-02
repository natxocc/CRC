import Vue from "vue";
import Vuex from "vuex"
import lang from "./lang"
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    lang,
    loading: true,
    user: {
      user:null,
      pass: null,
      mail: null,
      name: null
    },
    notify: {
      model: false,
      color: '',
      text: ''
    }
  }
})