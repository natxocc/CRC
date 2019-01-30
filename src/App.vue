<template>
  <div id="app">
    <q-layout>
      <!-- HEADER Y TOOLBAR -->
      <q-header
        :bordered="true"
        :elevated="true"
        :reveal="true"
      >
        <q-toolbar>
          <q-btn
            @click="menu.left = !menu.left"
            dense
            flat
            icon="menu"
            round
          />
          <q-toolbar-title>
            <strong>CRC</strong> Reale
          </q-toolbar-title>
          <q-space/>
          <q-btn-dropdown
            :label="lang"
            color="primary"
            size="sm"
            split
          >
            <q-list dense>
              <q-item
                @click="lang='ca'"
                clickable
              >
                <q-item-section>CATALÀ</q-item-section>
              </q-item>
              <q-item
                @click="lang='es'"
                clickable
              >
                <q-item-section>ESPAÑOL</q-item-section>
              </q-item>
              <q-separator/>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            @click="userClick"
            dense
            flat
            icon="person"
            round
          />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <!-- MENU LEFT -->
        <q-drawer
          :bordered="true"
          :elevated="true"
          :overlay="true"
          side="left"
          v-if="user.logged"
          v-model="menu.left"
        >
          <q-btn
            class="full-width"
            flat
            icon="home"
            inline
            to="/"
          ></q-btn>
          <q-list
            bordered
            padding
          >
            <q-expansion-item
              :icon="option.icon"
              :key="i"
              :label="option.name"
              expand-separator
              v-for="(option,i) in menu.leftList"
            >
              <q-item
                :key="i"
                :to="subs.to"
                v-for="(subs,i) in option.subs"
              >
                <q-item-section>{{subs.name}}</q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-drawer>
        <!-- MENU RIGHT -->
        <q-drawer
          :bordered="true"
          :elevated="true"
          :overlay="true"
          side="right"
          v-if="user.logged"
          v-model="menu.right"
        ></q-drawer>
        <!-- DIALOGO USUARIO -->
        <div class="justify-around">
          <q-dialog v-model="user.dialog">
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  color="primary"
                  icon="person"
                  text-color="white"
                />
                <span class="q-ml-sm text-h4">{{$q.lang.login.InicioSesion}}</span>
              </q-card-section>
              <q-card-section class="row items-center">
                <div class="row q-col-gutter-x-2 q-col-gutter-y-sm">
                  <div class="col-12">
                    <q-input
                      :label="$q.lang.login.Usuario"
                      type="text"
                      v-model="user.name"
                    >
                      <q-icon
                        name="person"
                        slot="prepend"
                      />
                      <q-icon
                        @click="user.name = ''"
                        class="cursor-pointer"
                        name="close"
                        slot="append"
                      />
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-input
                      :label="$q.lang.login.Clave"
                      :type="user.passShow ? 'text' : 'password'"
                      v-model="user.pass"
                    >
                      <q-icon
                        name="lock"
                        slot="prepend"
                      />
                      <q-icon
                        @click="user.pass = ''"
                        class="cursor-pointer"
                        name="close"
                        slot="append"
                      />
                      <q-icon
                        :name="user.passShow ? 'visibility' : 'visibility_off'"
                        @click="user.passShow=!user.passShow"
                        class="cursor-pointer"
                        slot="append"
                      />
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-checkbox
                      :label="$q.lang.login.Recordarme"
                      dense
                      v-model="user.remember"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  :label="$q.lang.Cancelar"
                  @click="close"
                  color="negative"
                  flat
                />
                <q-btn
                  :label="$q.lang.Aceptar"
                  @click="login"
                  color="primary"
                  flat
                />
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
import("./lang/es").then((lang) => {
  this.$q.lang.set('es');
});
export default {
  data() {
    return {
      lang: 'es',
      menu: {
        left: false,
        right: false,
        leftList: [
          {
            icon: "euro_symbol",
            name: this.$q.lang.menu.Recibos,
            subs: [
              {
                name: this.$q.lang.menu.GestionDeRecibos,
                to: "/recibos/gestion"
              },
              {name: this.$q.lang.menu.BajasProvisionales, to: "/recibos/bajas"}
            ]
          },
          {
            icon: "timeline",
            name: this.$q.lang.menu.Polizas,
            subs: [
              {
                name: this.$q.lang.menu.NuevaProduccion,
                to: "/polizas/produccion"
              },
              {name: this.$q.lang.menu.BajasDefinitivas, to: "/polizas/bajas"}
            ]
          },
          {
            icon: "contacts",
            name: this.$q.lang.menu.Clientes,
            subs: [
              {name: this.$q.lang.menu.ListaDeClientes, to: "/clientes/lista"}
            ]
          },
          {
            icon: "healing",
            name: this.$q.lang.menu.Siniestros,
            subs: [{name: this.$q.lang.menu.Siniestros, to: "/siniestro/lista"}]
          },
          {
            icon: "person",
            name: this.$q.lang.menu.Usuarios,
            subs: [{name: this.$q.lang.menu.GestionDeUsuarios, to: "/usuarios"}]
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
    this.lang = "es";
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
