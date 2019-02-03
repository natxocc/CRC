<template>
  <div class="container">
    <!-- SELECT FILTERS GESTION -->
    <div class="row text-center">
      <div class="col-xs-12" style="padding: 10px">
        <q-input :label="$q.lang.FiltroRapido" dense type="text" v-model="quickFilter">
          <q-icon name="filter_list" slot="prepend"/>
          <q-icon @click="quickFilter = ''" class="cursor-pointer" name="close" slot="append"/>
        </q-input>
      </div>
    </div>
    <!-- TABLA DE DATOS -->
    <n-tables :columnDefs="columnDefs" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData" table="Clientes"/>
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
      rowClassRules: {}
    };
  },
  methods: {
    callDataClients() {
      let self = this;
      showLoading();
      axios
        .post(localStorage.url, {
          cmd: "getRecords",
          table: "Clientes",
          subtable: false,
          id: false,
          orderby: "NombreCompleto ASC",
          where: false
        })
        .then(function(response) {
          self.columnDefs = response.data.columns;
          self.columnDefsSub = response.data.columnsSub;
          hideLoading();
          self.rowData = response.data.data;
        });
    }
  },
  beforeMount() {
    this.callDataClients();
  },
  watch: {}
};
</script>

