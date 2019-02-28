<template>
  <div>
    <v-layout align-start row wrap>
      <v-flex class="px-1" md4 xs12>
        <v-text-field :label="lang.FiltroRapido" clearable hide-details v-model="quickFilter"></v-text-field>
      </v-flex>
    </v-layout>
    <!-- TABLA DE DATOS -->
    <data-table :columnDefs="columnDefs" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData"/>
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
      // TABLE
      rowClassRules: {}
    };
  },
  methods: {
    callDataRegs() {
      let self = this;
      this.callData({cmd: "getRecords", table: "Registros"}).then(function(response) {
        self.defineTable(response);
      });
    }
  },
  beforeMount() {
    this.setLang(localStorage.lang);
    this.callDataRegs();
  },
  watch: {}
};
</script>

