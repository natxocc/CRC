import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recibos from './views/Recibos.vue'
import Clientes from './views/Clientes.vue'
import Page404 from './views/404.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recibos/:recibo',
      name: 'Recibos',
      component: Recibos
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: Clientes
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ]
})
