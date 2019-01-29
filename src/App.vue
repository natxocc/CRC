<template>
  <div id="app">
    <q-layout>
      <!-- HEADER Y TOOLBAR -->
      <q-header :bordered="true" :elevated="true" :reveal="true">
        <q-toolbar>
          <q-btn flat round dense icon="menu" @click="menu.left = !menu.left"/>
          <q-toolbar-title>
            <strong>CRC</strong> Reale
          </q-toolbar-title>
          <q-btn flat round dense icon="person" @click="userClick"/>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <!-- MENU LEFT -->
        <q-drawer
          v-model="menu.left"
          side="left"
          :bordered="true"
          :elevated="true"
          :overlay="true"
          v-if="user.logged"
        >
          <q-btn flat class="full-width" inline icon="home" to="/"></q-btn>
          <q-list bordered padding>
            <q-expansion-item
              expand-separator
              :icon="option.icon"
              :label="option.name"
              v-for="(option,i) in menu.leftList"
              :key="i"
            >
              <q-item v-for="(subs,i) in option.subs" :to="subs.to" :key="i">
                <q-item-section>{{subs.name}}</q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-drawer>
        <!-- MENU RIGHT -->
        <q-drawer
          v-if="user.logged"
          v-model="menu.right"
          side="right"
          :bordered="true"
          :elevated="true"
          :overlay="true"
        ></q-drawer>
        <!-- DIALOGO USUARIO -->
        <div class="justify-around">
          <q-dialog v-model="user.dialog">
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="person" color="primary" text-color="white"/>
                <span class="q-ml-sm text-h4">Inicie sesion</span>
              </q-card-section>
              <q-card-section class="row items-center">
                <div class="row q-col-gutter-x-2 q-col-gutter-y-sm">
                  <div class="col-12">
                    <q-input v-model="user.name" type="text" label="Usuario">
                      <q-icon slot="prepend" name="person"/>
                      <q-icon
                        slot="append"
                        name="close"
                        @click="user.name = ''"
                        class="cursor-pointer"
                      />
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-input
                      v-model="user.pass"
                      :type="user.passShow ? 'text' : 'password'"
                      label="Clave"
                    >
                      <q-icon slot="prepend" name="lock"/>
                      <q-icon
                        slot="append"
                        name="close"
                        @click="user.pass = ''"
                        class="cursor-pointer"
                      />
                      <q-icon
                        slot="append"
                        :name="user.passShow ? 'visibility' : 'visibility_off'"
                        @click="user.passShow=!user.passShow"
                        class="cursor-pointer"
                      />
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-checkbox v-model="user.remember" dense label="Recordarme"/>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="negative" @click="close"/>
                <q-btn flat label="Aceptar" color="primary" @click="login"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>

        <!-- ROUTER VIEW -->
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        >
          <router-view/>
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: {
        left: false,
        right: false,
        leftList: [
          {
            icon: "euro_symbol",
            name: "Recibos",
            subs: [
              { name: "Gestión de Recibos", to: "/recibos/gestion" },
              { name: "Bajas Provisionales", to: "/recibos/bajas" }
            ]
          },
          {
            icon: "timeline",
            name: "Polizas",
            subs: [
              { name: "Nueva Producción", to: "/polizas/produccion" },
              { name: "Bajas Definitivas", to: "/polizas/bajas" }
            ]
          },
          {
            icon: "contacts",
            name: "Clientes",
            subs: [{ name: "Lista de Clientes", to: "/clientes/lista" }]
          },
          {
            icon: "healing",
            name: "Siniestros",
            subs: [
              { name: "Lista de Siniestros", to: "/siniestro/lista" },
              { name: "Consultar Siniestro", to: "/siniestro/consulta" }
            ]
          },
          {
            icon: "person",
            name: "Usuarios",
            subs: [{ name: "Gestión de Usuarios", to: "/usuarios" }]
          }
        ]
      },
      user: {
        logged: false,
        name: "",
        pass: "",
        passShow: true,
        sid: "",
        remember: false,
        dialog: false
      }
    };
  },
  methods: {
    close: function() {
      this.user.dialog = false;
    },
    login() {
      if (this.user.remember) {
        localStorage.user = this.user.name;
        localStorage.pass = this.user.pass;
        localStorage.sid = this.user.sid;
        localStorage.logged = this.user.logged;
      } else {
        sessionStorage.user = this.user.name;
        sessionStorage.pass = this.user.pass;
        sessionStorage.sid = this.user.sid;
        sessionStorage.logged = this.user.logged;
      }
      this.user.dialog = false;
      this.user.logged = true;
    },
    userClick() {
      if (this.user.logged) {
        this.menu.right = !this.menu.right;
      } else {
        this.user.dialog = true;
      }
    }
  },
  beforeMount() {
    // Remove on final version
    if (window.location.hostname == "localhost") {
      localStorage.url = "servidor";
    } else {
      this.url = localStorage.url = window.location.hostname;
    }
    // || ^^ Remove on final version
  }
};
</script>
