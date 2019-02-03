<template>
  <div class="container">
    <!-- TABS -->
    <q-tabs active-bg-color="primary" active-color="white" class="bg-secondary text-primary" dense indicator-color="transparent" inline-label top-indicator v-model="tab">
      <q-route-tab :label="$q.lang.Altas" icon="assignment_turned_in" name="gestion" to="/polizas/altas"/>
      <q-route-tab :label="$q.lang.Bajas" icon="assignment_returned" name="bajas" to="/polizas/bajas"/>
      <q-tab :label="calculos.importe" class="text-primary" disabled icon="euro_symbol"/>
    </q-tabs>
    <!-- SELECT FILTERS GESTION -->
    <div class="row text-center">
      <div class="col-xs-12 col-sm-4" style="padding: 10px">
        <q-input :label="$q.lang.FiltroRapido" dense type="text" v-model="quickFilter">
          <q-icon name="filter_list" slot="prepend"/>
          <q-icon @click="quickFilter = ''" class="cursor-pointer" name="close" slot="append"/>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-4" style="padding: 10px">
        <q-select :label="$q.lang.ano" :options="filter.years" @input="callDataAltas" dense expandBesides optionsDense v-model="filter.year"/>
      </div>
      <div class="col-xs-12 col-sm-4" style="padding: 10px">
        <q-select :label="$q.lang.mes" :options="filter.months" @input="callDataAltas" dense expandBesides optionsDense v-model="filter.month"/>
      </div>
    </div>
    <!-- TABLA DE DATOS -->
    <n-tables :columnDefs="columnDefs" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData" @gridData="gridData" />
  </div>
</template>

<script>
import NTables from "../components/NTables.vue";
import Vue from "vue";
import axios from "axios";
import {Loading, QSpinnerFacebook, QSpinnerGears} from "quasar";
function showLoading(options) {
  Loading.show(options);
}
function hideLoading(options) {
  Loading.hide(options);
}

export default {
  components: {
    NTables
  },
  data() {
    return {
      // TABLE
      columnDefs: [],
      rowData: null,
      quickFilter: null,
      rowClassRules: {},
      filter: {
        years: ["2020", "2019", "2018", "2017"],
        months: [
          "",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ],
        month: ("0" + (new Date().getMonth() + 1)).slice(-2),
        year: new Date().getFullYear()
      },
      tab: this.$route.params.poliza,
      // CALCULOS
      calculos: {
        importe: null,
        cobrado: null
      }
    };
  },
  methods: {
    callDataAltas() {
      let self = this;
      let where =
        "(FechaAlta LIKE '" +
        this.filter.year +
        "-" +
        this.filter.month +
        "%')";
      showLoading();
      axios
        .post(localStorage.url, {
          cmd: "getRecords",
          table: "Polizas",
          subtable: false,
          id: false,
          orderby: "FechaAlta DESC",
          where: where
        })
        .then(function(response) {
          self.columnDefs = response.data.columns;
          hideLoading();
          self.rowData = response.data.data;
        });
    },
    callDataBajas() {
      let self = this;
      let where =
        "(Estado LIKE 'ANULADO') AND (FechaAlta LIKE '" +
        this.filter.year +
        "-" +
        this.filter.month +
        "%')";
      showLoading();
      axios
        .post(localStorage.url, {
          cmd: "getRecords",
          table: "Polizas",
          subtable: false,
          id: false,
          orderby: "FechaAlta DESC",
          where: where
        })
        .then(function(response) {
          self.columnDefs = response.data.columns;
          hideLoading();
          self.rowData = response.data.data;
        });
    },
    //CALCULATE
    gridData(data) {
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
      switch (this.$route.params.poliza) {
        case "bajas":
          this.callDataBajas();
          break;
        case "altas":
          this.callDataAltas();
          break;
        default:
          // PONER AQUI LA CONSULTA DE UNA POLIZA
          break;
      }
    }
  },
  beforeMount() {
    this.init();
    let year = new Date().getFullYear();
    let years = [];
    for (let i = 0; i < 20; i++) {
      years[i] = year - i;
    }
    this.filter.years = years;
  },
  watch: {
    $route: "init"
  }
};
</script>

