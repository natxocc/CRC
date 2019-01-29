import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RecibosGestion from './views/RecibosGestion.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recibos/gestion',
      name: 'RecibosGestion',
      component: RecibosGestion
    }
  ]
})
