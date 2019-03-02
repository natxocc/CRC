<template>
  <div>
    <v-layout align-start row wrap>
      <v-flex class="px-1" md4 xs12>
        <v-text-field :label="lang.FiltroRapido" clearable hide-details v-model="quickFilter"></v-text-field>
      </v-flex>
    </v-layout>
    <!-- MINI TOOLBAR-->
    <v-flex class="pt-1">
      <v-toolbar color="primary" dense>
        <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="!user.selected">
          <v-icon>add</v-icon>
          {{lang.Nuevo}}
        </v-btn>
        <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="user.selected">
          <v-icon>add</v-icon>
          {{lang.Editar}}
        </v-btn>
        <v-btn @click="user.deleteModel=true" color="error" small v-if="user.selected">
          <v-icon>delete</v-icon>
          {{lang.Eliminar}}
        </v-btn>
      </v-toolbar>
    </v-flex>
    <!-- CONFIRM DELETE -->
    <v-dialog max-width="290" persistent v-model="user.deleteModel">
      <v-card>
        <v-card-text>{{lang.EliminarRegistro}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="user.deleteModel = false" color="warning" flat>{{lang.Cancelar}}</v-btn>
          <v-btn @click="onDelete" color="success" flat>{{lang.Aceptar}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- TABLA DE DATOS -->
    <data-table :columnDefs="columnDefs" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData" @rowSelected="rowSelected"/>
    <!-- DIALOG -->
    <dialog-data :data="dialogData" :fields="dialogFields" :lang="lang" :model="dialogModel" @cancel="dialogModel=false" @onChange="onChange" @onSave="onSave"/>
  </div>
</template>

<script>
import DataTable from "../components/DataTable.vue";
import DialogData from "../components/DialogData.vue";
import mixins from "../mixins";
export default {
  components: {
    DataTable,
    DialogData
  },
  mixins: [mixins],
  data() {
    return {
      // TABLE
      rowClassRules: {},
      user: {
        selected: false,
        deleteModel: false
      }
    };
  },
  methods: {
    callDataClients() {
      let self = this;
      this.callData({cmd: "getRecords", table: "Clientes"}).then(function(response) {
        self.defineDialog(self.columnDefs, false, "Clientes");
      });
    },
    // SELECTED ROW
    rowSelected: function(data) {
      if (data) {
        this.user.selected = true;
        this.defineDialog(this.columnDefs, data, "Clientes");
      } else {
        this.user.selected = false;
        this.defineDialog(this.columnDefs, false, "Clientes");
      }
    },
    onChange() {},
    onSave() {
      this.dialogModel = false;
      let self = this;
      this.callData({cmd: this.cmd, idkey: this.idKey, idvalue: this.dialogData[this.idKey], data: this.dialogData, table: this.dialogTable}).then(() => self.init());
    },
    onDelete() {
      this.user.deleteModel = false;
      let self = this;
      this.callData({cmd: "deleteRecord", idkey: this.idKey, idvalue: this.dialogData[this.idKey], table: this.table}).then(() => self.init());
    },
    init() {
      this.callDataClients();
    }
  },
  beforeMount() {
    this.setLang(localStorage.lang);
    this.callDataClients();
  },
  watch: {}
};
</script>

