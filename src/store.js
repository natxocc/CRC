import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    count: 5,
    notify: {
      model: true,
      color: '',
      text: 'Prueba'
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})