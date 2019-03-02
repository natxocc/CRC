<template>
  <div>
    <!-- TABS -->
    <v-tabs align-with-title centered color="secondary" icons-and-text>
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab to="/polizas/altas">
        {{lang.Altas}}
        <v-icon>assignment_turned_in</v-icon>
      </v-tab>
      <v-tab to="/polizas/bajas">
        {{lang.Bajas}}
        <v-icon>assignment_returned</v-icon>
      </v-tab>
      <!-- <v-tab-item :key="i" :value="'tab-' + i" v-for="i in 3">
      <v-card flat>-->
      <!-- <v-card-text>{{ text }}</v-card-text> -->
      <!-- </v-card>
      </v-tab-item>-->
    </v-tabs>
    <!-- TABS -->
    <!-- SELECT FILTERS TOTALS-->
    <v-layout align-start row wrap>
      <v-flex class="px-1" md4 xs12>
        <v-text-field :label="lang.FiltroRapido" clearable hide-details v-model="quickFilter"></v-text-field>
      </v-flex>
      <!-- SELECT FILTERS GESTION ALTAS Y BAJAS-->
      <v-flex class="px-1" md8 xs12>
        <v-dialog full-width v-model="filter.dialogMonth" width="290px">
          <v-text-field prepend-icon="event" readonly slot="activator" v-model="filter.yearmonth"></v-text-field>
          <v-date-picker :locale="locale" no-title scrollable type="month" v-model="filter.yearmonth" :first-day-of-week="1">
            <v-spacer></v-spacer>
            <v-btn @click="callDataAltas" color="primary" flat>OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <!-- MINI TOOLBAR-->
      <v-flex class="pt-1">
        <v-toolbar color="primary" dense>
          <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="!poliza.selected">
            <v-icon>add</v-icon>
            {{lang.Nuevo}}
          </v-btn>
          <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="poliza.selected">
            <v-icon>add</v-icon>
            {{lang.Editar}}
          </v-btn>
          <v-btn @click="poliza.deleteModel=true" color="error" small v-if="poliza.selected">
            <v-icon>delete</v-icon>
            {{lang.Eliminar}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary black--text font-weight-medium">
            {{calculos.importe}}
            <v-icon dark right>euro_symbol</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
    </v-layout>

    <!-- TABLA DE DATOS -->
    <data-table :columnDefs="columnDefs" :localeText="lang.table" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData" @filterData="filterData" @rowSelected="rowSelected"/>
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
      locale: localStorage.lang,
      // TABLE
      rowClassRules: {},
      filter: {
        yearmonth: new Date().toISOString().substr(0, 7),
        dialogMonth: false
      },
      tab: this.$route.params.poliza,
      // CALCULOS
      calculos: {
        importe: null,
        cobrado: null
      },
      poliza: {
        selected: false,
        deleteModel: false
      }
    };
  },
  methods: {
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
    // CALL ALTAS
    callDataAltas() {
      this.filter.dialogMonth = false;
      let self = this;
      let where = "(TipoInformacion LIKE 'Nueva%' ) AND (FechaAlta LIKE '" + this.filter.yearmonth + "%')";
      this.callData({cmd: "getRecords", table: "Polizas", where}).then(function(response) {
        self.defineDialog(self.columnDefs, false, "Polizas");
      });
    },
    // CALL BAJAS
    callDataBajas() {
      this.filter.dialogMonth = false;
      let self = this;
      let where = "(TipoInformacion LIKE 'Anula%' )  AND (FechaBaja LIKE '" + this.filter.yearmonth + "%')";
      this.callData({cmd: "getRecords", table: "Polizas", where}).then(function(response) {
        self.defineDialog(self.columnDefs, false, "Polizas");
      });
    },
    // SELECTED ROW
    rowSelected: function(data) {
      if (data) {
        this.poliza.selected = true;
        this.defineDialog(this.columnDefs, data, "Polizas");
      } else {
        this.poliza.selected = false;
        this.defineDialog(this.columnDefs, false, "Polizas");
      }
    }, //CALCULATE
    filterData(data) {
      let sumCobrado = 0;
      let sumImporte = 0;
      for (let i = 0; i < data.length; i++) {
        sumCobrado = sumCobrado + data[i].data.Cobrado;
        sumImporte = sumImporte + data[i].data.Importe;
      }
      this.calculos.importe = Number(sumImporte).toFixed(1);
      this.calculos.cobrado = Number(sumCobrado).toFixed(1);
    },
    // INITIALIZATION
    init() {
      if (this.$route.params.poliza == "bajas") this.callDataBajas();
      if (this.$route.params.poliza == "altas") this.callDataAltas();
    }
  },
  beforeMount() {
    this.setLang(localStorage.lang);
    this.init();
  },
  watch: {
    $route: "init"
  }
};
</script>