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
        <v-dialog full-width width="290px" v-model="filter.dialogMonth">
          <v-text-field prepend-icon="event" readonly slot="activator" v-model="filter.yearmonth"></v-text-field>
          <v-date-picker :locale="locale" no-title scrollable type="month" v-model="filter.yearmonth">
            <v-spacer></v-spacer>
            <v-btn @click="callDataAltas" color="primary" flat>OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>
    <!-- TABLA DE DATOS -->
    <data-table :columnDefs="columnDefs" :quickFilter="quickFilter" :localeText="lang.table" :rowClassRules="rowClassRules" :rowData="rowData" @gridData="gridData"/>
  </div>
</template>

<script>
import DataTable from "../components/DataTable.vue";
import mixins from "../mixins";
export default {
  components: {
    DataTable
  },
  mixins: [mixins],
  data() {
    return {
      locale: localStorage.lang,
      // TABLE
      rowClassRules: {},
      filter: {
        yearmonth: new Date().toISOString().substr(0, 7),
        dialogMonth:false
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
    // CALL ALTAS
    callDataAltas() {
      this.filter.dialogMonth=false
      let self = this;
      let where = "(TipoInformacion LIKE 'Nueva%' ) AND (FechaAlta LIKE '"  + this.filter.yearmonth + "%')";
      this.callData({cmd: "getRecords", table: "Polizas", where}).then(function(response) {
        self.defineTable(response);
      });
    },
    // CALL BAJAS
    callDataBajas() {
      this.filter.dialogMonth=false
      let self = this;
      let where = "(TipoInformacion LIKE 'Anula%' )  AND (FechaBaja LIKE '"  + this.filter.yearmonth + "%')";
      this.callData({cmd: "getRecords", table: "Polizas", where}).then(function(response) {
        self.defineTable(response);
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