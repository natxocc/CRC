<template>
  <div>
    <!-- SELECT FILTERS TOTALS-->
    <v-layout align-start row wrap>
      <v-flex class="px-1" md4 xs12>
        <v-text-field :label="lang.FiltroRapido" clearable hide-details v-model="quickFilter"></v-text-field>
      </v-flex>
      <!-- FILTER ONLY LIQ & CAJA -->
      <template>
        <v-flex class="px-1" md8 xs12>
          <v-dialog full-width v-model="filter.dateDialog" width="290px">
            <v-text-field prepend-icon="event" readonly slot="activator" v-model="filter.date"></v-text-field>
            <v-date-picker :first-day-of-week="1" :locale="locale" no-title scrollable show-week v-model="filter.date">
              <v-spacer></v-spacer>
              <v-btn @click="callDataLiq" color="primary" flat>OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
      </template>
    </v-layout>
    <!-- MINI TOOLBAR PARA LIQ-->
    <v-flex class="pt-1">
      <v-toolbar color="primary" dense>
        <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="!recibo.selected">
          <v-icon>add</v-icon>
          {{lang.NuevoMovimiento}}
        </v-btn>
        <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="recibo.selected">
          <v-icon>edit</v-icon>
          {{lang.Editar}}
        </v-btn>
        <v-btn @click="recibo.deleteModel=true" color="error" small v-if="recibo.selected">
          <v-icon>delete</v-icon>
          {{lang.Eliminar}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary black--text">
          {{calculos.importe}}
          <v-icon dark right>euro_symbol</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
    <!-- CONFIRM DELETE -->
    <v-dialog max-width="290" persistent v-model="recibo.deleteModel">
      <v-card>
        <v-card-text>{{lang.EliminarRegistro}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="recibo.deleteModel = false" color="warning" flat>{{lang.Cancelar}}</v-btn>
          <v-btn @click="onDelete" color="success" flat>{{lang.Aceptar}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- TABLA DE DATOS -->
    <data-table :columnDefs="columnDefs" :columnDefsSub="columnDefsSub" :filters="filters" :localeText="lang.table" :masterDetail="true" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData" @filterData="filterData" @rowSelected="rowSelected"/>
    <!-- DIALOGO -->
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
      filters: null,
      filter: {
        date: new Date().toISOString().substr(0, 10),
        dateDialog: false,
        yearmonth: new Date().toISOString().substr(0, 7),
        week: null
      },
      rowClassRules: {},
      // RECIBO
      recibo: {
        selected: null,
        selectedSub: false,
        deleteModel: false
      },
      // CALCULOS
      calculos: {
        importe: null
      }
    };
  },
  methods: {
    onChange(value, key) {
      // console.log(this.dialogFields);
    },
    onSave() {
      // console.log(this.dialogData);
      this.dialogModel = false;
      let self = this;
      this.callData({cmd: this.cmd, idkey: this.idKey, idvalue: this.dialogData[this.idKey], data: this.dialogData, table: this.dialogTable}).then(() => self.init());
    },
    onDelete() {
      this.recibo.deleteModel = false;
      let self = this;
      this.callData({cmd: "deleteRecord", idkey: this.idKey, idvalue: this.dialogData[this.idKey], table: this.table}).then(() => self.init());
    },
    // CALL DATA LIQ
    callDataLiq() {
      this.filter.dateDialog = false;
      let self = this;
      let filterdate = new Date(this.filter.date);
      let year = this.filter.date.substr(0, 4);
      let week = this.getWeek(filterdate);
      let days = this.getDaysWeek(year, week);
      let where = "(Gestion='COME' OR Gestion='COTR')";

      // AND (Situacion>='" + days.dateini + "' AND Situacion<='" + days.dateend + "') ORDER BY Situacion DESC";
      this.callData({cmd: "getRecords", table: "Caja", where}).then(function(response) {
        self.defineDialog(self.columnDefs, false, "Caja");
        self.dialogFields["Gestion"].props.disabled = true;
        self.dialogFields["CodigoRecibo"].props.disabled = true;
        self.dialogFields["Usuario"].props.disabled = true;
      });
    },
    // SELECTED ROW
    rowSelected: function(data) {
      if (data) {
        this.recibo.selected = true;
        this.defineDialog(this.columnDefs, data, "Caja");
      } else {
        this.recibo.selected = false;
        this.defineDialog(this.columnDefs, false, "Caja");
      }
      this.dialogFields["Gestion"].props.disabled = true;
      this.dialogFields["CodigoRecibo"].props.disabled = true;
      this.dialogFields["Usuario"].props.disabled = true;
    },
    //CALCULATE
    filterData(data) {
      let sumImporte = 0;
      for (let i = 0; i < data.length; i++) {
        sumImporte = sumImporte + data[i].data.Importe;
      }
      this.calculos.importe = Number(sumImporte).toFixed(1);
    },
    // INITIALIZATION
    init() {
      this.recibo.selected = null;
      this.dialogModel = false;
      this.callDataLiq();
    }
  },
  beforeMount() {
    this.setLang(localStorage.lang);
    this.init();
  },
  created() {}
};
</script>