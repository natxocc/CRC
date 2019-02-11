import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recibos from './views/Recibos.vue'
import Clientes from './views/Clientes.vue'
import Polizas from './views/Polizas.vue'
import Usuarios from './views/Usuarios.vue'
import Registros from './views/Registros.vue'
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
      path: '/polizas/:poliza',
      name: 'Polizas',
      component: Polizas
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Usuarios
    },
    {
      path: '/registros',
      name: 'Registros',
      component: Registros
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ]
})
