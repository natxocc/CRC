import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recibos from './views/Recibos.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recibos',
      name: 'Recibos',
      component: Recibos
    }
  ]
})
