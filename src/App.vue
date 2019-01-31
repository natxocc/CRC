<template>
  <div id="app">
    <q-layout>
      <!-- HEADER Y TOOLBAR -->
      <q-header :bordered="true" :elevated="true" :reveal="true">
        <q-toolbar>
          <q-btn @click="menu.left = !menu.left" dense flat icon="menu" round/>
          <q-toolbar-title>
            <strong>CRC</strong> Reale
          </q-toolbar-title>
          <q-space/>
          <q-btn :label="lang" color="primary" size="sm">
            <q-tooltip>{{$q.lang.inicio.CambiarIdiomaT}}</q-tooltip>
            <q-popup-proxy>
              <q-list dense>
                <q-item @click="lang='ca'" clickable>
                  <q-item-section>CATALÀ</q-item-section>
                </q-item>
                <q-item @click="lang='es'" clickable>
                  <q-item-section>ESPAÑOL</q-item-section>
                </q-item>
                <q-separator/>
              </q-list>
            </q-popup-proxy>
          </q-btn>
          <q-btn @click="userClick" dense flat icon="person" round/>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <!-- DIALOGO USUARIO -->
        <div class="justify-around">
          <q-dialog v-model="user.dialog">
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar color="primary" icon="person" text-color="white"/>
                <span class="q-ml-sm text-h4">{{$q.lang.inicio.InicioSesion}}</span>
              </q-card-section>
              <q-card-section class="row items-center">
                <div class="row q-col-gutter-x-2 q-col-gutter-y-sm">
                  <div class="col-12">
                    <q-input :label="$q.lang.inicio.Usuario" type="text" v-model="user.name">
                      <q-icon name="person" slot="prepend"/>
                      <q-icon @click="user.name = ''" class="cursor-pointer" name="close" slot="append"/>
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-input :label="$q.lang.inicio.Clave" :type="user.passShow ? 'text' : 'password'" v-model="user.pass">
                      <q-icon name="lock" slot="prepend"/>
                      <q-icon @click="user.pass = ''" class="cursor-pointer" name="close" slot="append"/>
                      <q-icon :name="user.passShow ? 'visibility' : 'visibility_off'" @click="user.passShow=!user.passShow" class="cursor-pointer" slot="append"/>
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-checkbox :label="$q.lang.inicio.Recordarme" dense v-model="user.remember"/>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn :label="$q.lang.label.cancel" @click="close" color="negative" flat/>
                <q-btn :label="$q.lang.label.ok" @click="login" color="primary" flat/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <!-- MENU RIGHT -->
        <q-drawer :bordered="true" :elevated="true" :overlay="true" side="right" v-if="user.logged" v-model="menu.right"></q-drawer>
        <!-- MENU LEFT -->
        <q-drawer :bordered="true" :elevated="true" :overlay="true" side="left" v-model="menu.left">
          <q-btn class="full-width" flat icon="home" inline to="/"></q-btn>
          <q-list :separator="true" bordered>
            <q-item :key="i" :to="option.to" clickable v-for="(option,i) in menu.leftList" v-ripple>
              <q-item-section avatar>
                <q-icon :name="option.icon" color="primary"/>
              </q-item-section>
              <q-item-section>{{$q.lang.menu[option.name]}}</q-item-section>
            </q-item>
          </q-list>
        </q-drawer>
        <!-- ROUTER VIEW -->
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <router-view/>
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
// import languages from './lang/index.json'
// import('./lang/es')
export default {
  data() {
    return {
      lang: this.$q.lang.isoName,
      menu: {
        left: false,
        right: false,
        leftList: [
          {
            icon: "euro_symbol",
            name: "Recibos",
            to: "/recibos/todos"
          },
          {
            icon: "timeline",
            name: "Polizas",
            to: "/polizas"
          },
          {
            icon: "contacts",
            name: "Clientes",
            to: "/recibos"
          },
          {
            icon: "healing",
            name: "Siniestros",
            to: "/recibos"
          },
          {
            icon: "person",
            name: "Usuarios",
            to: "/recibos"
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
  watch: {
    lang(lang) {
      import(`./lang/${lang}`).then((lang) => {
        this.$q.lang.set(lang.default);
      });
    }
  },
  beforeMount() {
    // Remove on final version
    // this.lang="es"
    if (window.location.hostname == "localhost") {
      localStorage.url = "servidor";
    } else {
      this.url = localStorage.url = window.location.hostname;
    }
    // || ^^ Remove on final version
  },
  created() {
    this.lang = "es";
  }
};
</script>
