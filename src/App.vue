<template>
  <div id="app">
    <v-app id="inspire" v-cloak>
      <!-- MENU LATERAL IZQUIERDO -->
      <v-navigation-drawer app disable-resize-watcher fixed v-model="menu.left">
        <template>
          <v-card>
            <v-card-actions>
              <v-btn block color="primary" flat to="/">
                <v-icon>home</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <v-list>
          <v-list-tile :key="index" :to="value.to" v-for="(value, key, index) in menu.leftList">
            <v-list-tile-avatar>
              <v-icon>{{ value.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ value.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <!-- TOOLBAR -->
      <v-toolbar :scroll-threshold="200" app color="primary" dark fixed scroll-off-screen>
        <v-toolbar-side-icon @click.stop="menu.left = !menu.left" color="secondary" flat></v-toolbar-side-icon>
        <v-toolbar-title>CRC Reale Valls</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- BOTON USUARIO -->
        <div>
          <v-btn @click="user.dialog=true" color="red" flat icon>
            <v-icon>person</v-icon>
          </v-btn>
        </div>
        <div>
          <v-btn @click="newMessage('lnlk','success')" color="success" flat icon>
            <v-icon>person</v-icon>
          </v-btn>
        </div>

        <!-- SELECCION IDIOMA -->
        <v-menu bottom class="align-center" transition="slide-y-transition">
          <v-btn dark icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="setLang('es')">
              <v-list-tile-title>Español</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="setLang('ca')">
              <v-list-tile-title>Català</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <!-- DIALOG USER -->
      <v-dialog @keydown.esc="user.dialog=false" v-model="user.dialog">
        <v-card>
          <v-card-title class="headline secondary" primary-title>Inicio de sesión</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field clearable label="Usuario" required v-model="user.name"></v-text-field>
              <v-text-field @keyup.enter="user.dialog=false" clearable label="Contraseña" required type="password" v-model="user.pass"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="user.dialog=false" color="warning" flat>{{lang.Cancelar}}</v-btn>
            <v-btn @click="user.dialog=false" color="primary" flat>{{lang.Aceptar}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- GO UP BUTTON -->
      <v-fab-transition>
        <v-btn :style="{bottom: $vuetify.breakpoint.smOnly ? '64px' : '' }" @click="toTop" bottom color="red" dark fab fixed right v-scroll="onScroll" v-show="gotop">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-fab-transition>
      <!-- ROUTER VIEW -->
      <v-content>
        <v-container class="pa-1" fill-height fluid>
          <v-layout align-start justify-center>
            <v-flex text-xs-center>
              <!-- LOADING -->
              <v-dialog persistent v-model="$store.state.loading" width="100">
                <v-card>
                  <v-card-text>
                    <div class="text-xs-center">
                    <v-progress-circular color="secondary" indeterminate></v-progress-circular>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <!-- FOOTER -->
      <v-footer app color="primary" dark>
        <span class="white--text">&copy; Ntx Software v0.1</span>
      </v-footer>
      <!-- NOTIFICATIONS -->
      <v-snackbar :color="$store.state.notify.color" :timeout="1500" v-model="$store.state.notify.model">{{ $store.state.notify.text}}</v-snackbar>
    </v-app>
  </div>
</template>
<script>
import mixins from "./mixins";
import SnackBar from "./components/SnackBar.vue";
export default {
  mixins: [mixins],
  components: {
    SnackBar
  },
  data() {
    return {
      gotop: false,
      menu: {
        left: false,
        right: false,
        leftList: null
      },
      user: {
        user: null,
        pass: null,
        name: null,
        mail: null,
        dialog: false
      }
    };
  },
  methods: {
    onScroll() {
      // if (typeof window === "undefined") return;
      const top = window.pageYOffset || document.documentElement.offsetTop || 0;
      this.gotop = top > 200;
    },
    toTop() {
      this.$router.push({hash: ""});
      this.$vuetify.goTo(0);
    },
    login() {
      let self = this;
      this.callData({cmd: "login", user: self.user.user, pass: self.user.pass})
        .then(function(response) {
          if (response.success) {
            localStorage.sid = response.sid;
            localStorage.mail = response.info.data.email;
            localStorage.username = response.info.data.fullname;
            self.newMessage(self.lang.Bienvenido, "success");
          } else {
            self.newMessage(self.lang.UsuarioClaveIncorrecta, "error");
            self.logout();
          }
        })
        .catch(function(response) {
          self.newMessage(self.lang.ErrorRed, "error");
        });
      this.user.dialog = false;
    },
    logout() {
      let self = this;
      this.callData({cmd: "logout"});
      localStorage.removeItem("sid");
      localStorage.removeItem("mail");
      localStorage.removeItem("username");
      self.user.name = localStorage.username;
      self.user.mail = localStorage.mail;
      this.menu.left = false;
      this.menu.right = false;
    },
    checkUser() {
      let self = this;
      this.callData({cmd: "checkUser"}).then(function(response) {
        if (response.success) {
          self.user.name = localStorage.username;
          self.user.mail = localStorage.mail;
        } else {
          self.logout();
        }
      });
    },
    menuUser() {
      if (localStorage.sid) {
        this.menu.right = !this.menu.right;
      } else {
        this.user.dialog = true;
      }
    },
    sendBug() {
      window.open("https://github.com/natxocc/CRC/issues", "_system");
    }
  },
  beforeMount() {
    this.$store.state.notify.model = false
    this.$store.state.loading = false
    // console.log(this.$store)
    if (localStorage.sid) this.checkUser();
    localStorage.url = "http://servidor/crc/php/post.php";
    if (window.location.hostname != "localhost") localStorage.url = "http://" + window.location.hostname + "/crc/php/post.php";
    this.setLang(localStorage.lang);
    // console.log(this.lang);
    this.menu.leftList = [
      {
        icon: "euro_symbol",
        name: this.lang.menu.Recibos,
        to: "/recibos/gestion"
      },
      {
        icon: "timeline",
        name: this.lang.menu.Polizas,
        to: "/polizas/altas"
      },
      {
        icon: "contacts",
        name: this.lang.menu.Clientes,
        to: "/clientes"
      },
      {
        icon: "healing",
        name: this.lang.menu.Siniestros,
        to: "/recibos"
      },
      {
        icon: "person",
        name: this.lang.menu.Usuarios,
        to: "/usuarios"
      },
      {
        icon: "person",
        name: this.lang.menu.Registros,
        to: "/registros"
      }
    ];
  },
  created() {
  }
};
</script>