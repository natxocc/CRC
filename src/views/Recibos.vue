<template>
  <div>
    <!-- TABS -->
    <v-tabs show-arrows align-with-title centered color="secondary" icons-and-text>
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab to="/recibos/gestion">
        {{lang.Gestion}}
        <v-icon>assignment_turned_in</v-icon>
      </v-tab>
      <v-tab to="/recibos/bajas">
        {{lang.BajasPendientes}}
        <v-icon>assignment_returned</v-icon>
      </v-tab>
      <v-tab to="/recibos/liq">
        {{lang.Liquidacion}}
        <v-icon>credit_card</v-icon>
      </v-tab>
    </v-tabs>

    <!-- SELECT FILTERS TOTALS-->
    <v-layout align-start row wrap>
      <v-flex class="px-1" md4 xs12>
        <v-text-field :label="lang.FiltroRapido" clearable hide-details v-model="quickFilter"></v-text-field>
      </v-flex>
      <!-- FILTER ONLY GESTION -->
      <template v-if="this.$route.params.recibo=='gestion'">
        <v-flex class="px-1" md4 xs12>
          <v-select :items="this.lang.estados" :label="lang.FiltrosDeEstado" @input="callDataGestion" hide-details multiple return-object v-model="filter.estadosSel"></v-select>
        </v-flex>
        <v-flex class="px-1" md2 xs6>
          <v-select :items="this.lang.userby" :label="lang.HistorialUsuario" @input="callDataGestion" hide-details return-object v-model="filter.userby"></v-select>
        </v-flex>
        <v-flex class="px-1" md2 xs6>
          <v-switch :label="lang.TodosLosRegistros" @change="callDataGestion" hide-details v-model="filter.alldata"></v-switch>
        </v-flex>
      </template>
      <!-- FILTER ONLY BAJAS -->
      <template v-if="this.$route.params.recibo=='bajas'">
        <v-flex class="px-1" md8 xs12>
          <v-dialog full-width v-model="filter.dateMonth" width="290px">
            <v-text-field prepend-icon="event" readonly slot="activator" v-model="filter.yearmonth"></v-text-field>
            <v-date-picker :locale="locale" no-title scrollable type="month" v-model="filter.yearmonth">
              <v-spacer></v-spacer>
              <v-btn @click="callDataBajas" color="primary" flat>OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
      </template>
    </v-layout>
    <!-- FILTER ONLY LIQ & CAJA -->
    <v-layout align-start row wrap>
      <template v-if="this.$route.params.recibo=='liq'">
        <v-flex class="px-1" md8 xs12>
          <v-dialog full-width v-model="filter.dateDialog" width="290px">
            <v-text-field prepend-icon="event" readonly slot="activator" v-model="filter.date"></v-text-field>
            <v-date-picker :locale="locale" no-title scrollable show-week v-model="filter.date" :first-day-of-week="1">
              <v-spacer></v-spacer>
              <v-btn @click="callDataLiq" color="primary" flat>OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
      </template>
    </v-layout>
    <!-- <template v-else-if="this.$route.params.recibo=='liq'">
          <div class="col-xs-12 col-md-4" style="padding: 10px">
            <q-select :label="$q.lang.ano" :options="filter.years" @input="callDataLiq" dense expandBesides optionsDense v-model="filter.year"/>
          </div>
          <div class="col-xs-12 col-md-4" style="padding: 10px">
            <q-select :label="$q.lang.semana" :options="filter.weeks" @input="callDataLiq" dense expandBesides optionsDense v-model="filter.week"/>
          </div>
        </template>
    </div>-->
    <!-- MINI TOOLBAR-->
    <v-flex class="pt-1">
      <v-toolbar color="primary" dense>
        <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="!recibo.selected && !recibo.selectedSub">
          <v-icon>add</v-icon>
          {{lang.NuevoRecibo}}
        </v-btn>
        <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="recibo.selected">
          <v-icon>add</v-icon>
          {{lang.NuevaGestion}}
        </v-btn>
        <v-btn @click="dialogModel=true" color="secondary black--text" small v-if="recibo.selectedSub">
          <v-icon>edit</v-icon>
          {{lang.EditarGestion}}
        </v-btn>
        <v-btn @click="recibo.deleteModel=true" color="error" small v-if="recibo.selected">
          <v-icon>delete</v-icon>
          {{lang.EliminarRecibo}}
        </v-btn>
        <v-btn @click="recibo.deleteModel=true" color="error" small v-if="recibo.selectedSub">
          <v-icon>delete</v-icon>
          {{lang.EliminarGestion}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary black--text">
          {{calculos.importe}}
          <v-icon dark right>euro_symbol</v-icon>
        </v-btn>
        <!-- COLORS HELP -->
        <v-menu offset-y open-on-hover top>
          <v-btn color="secondary" icon slot="activator" small>
            <v-icon>help_outline</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile :key="index" :style="{'background-color': helpColors[key]}" v-for="(value, key, index) in lang.ayuda">
              <v-list-tile-title>{{ value }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
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
    <data-table :columnDefs="columnDefs" :columnDefsSub="columnDefsSub" :filters="filters" :localeText="lang.table" :masterDetail="true" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData" @filterData="filterData" @rowSelected="rowSelected" @rowSelectedSub="rowSelectedSub"/>
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
      fec: "02",
      filter: {
        userby: {
          value: "NombreTomador"
          // label: this.lang.userby[0].label
        },
        estadosSel: null,
        alldata: false,
        date: null,
        dateDialog: false,
        weeks: [],
        yearmonth: new Date().toISOString().substr(0, 7),
        week: 1,
        dateMonth: false
      },
      rowClassRules: {
        error: "data.Estado.includes('COBRADO') && data.Gestion.includes('ANULADO')",
        pendiente: "data.Estado.includes('PENDIENTE') && data.Gestion.includes('PE')",
        anulado: "data.Estado.includes('ANULADO') || (data.Gestion.includes('AN') && !data.Estado.includes('COBRADO'))",
        cobrado: "data.Estado.includes('COBRADO') || (data.Gestion.includes('CO') && data.Importe == data.Cobrado)",
        urgente: function(params) {
          let now = new Date();
          let date = new Date(params.data.FechaEfecto);
          now.setDate(now.getDate() - 25);
          return date < now;
        }
      },
      // RECIBO
      recibo: {
        selected: null,
        selectedSub: false,
        deleteModel: false
      },
      // GESTION
      myRoute: this.$route.params.recibo,
      // CALCULOS
      calculos: {
        importe: null
      },
      helpColors: ["", "#fcf18e", "#88c9ff", "rgb(182, 255, 191)", "rgb(252, 151, 151)", "#a8a8a7"]
    };
  },
  methods: {
    onChange(value, key) {
      // console.log(this.dialogFields);
      if (this.dialogData["Gestion"] == "COME" || this.dialogData["Gestion"] == "COTR") {
        this.dialogFields["Importe"].props.disabled = false;
      } else {
        this.dialogFields["Importe"].props.disabled = true;
      }
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
      if ((this.table == "Recibos" && this.dialogData["Usuario"] > 0) || (this.table == "RecibosGestion" && this.dialogData["Gestion"] == "PEPE")) {
        this.callData({cmd: "deleteRecord", idkey: this.idKey, idvalue: this.dialogData[this.idKey], table: this.table}).then(() => self.init());
      } else {
        this.newMessage(this.lang.SinAutorizacion, "error");
      }
    },
    // CALL DATA GESTION
    callDataGestion() {
      let self = this;
      let dateini = new Date();
      dateini.setMonth(dateini.getMonth() - 13);
      dateini = dateini.toISOString().substr(0, 10);
      let dateend = new Date().toISOString().substr(0, 10);
      let where = "(",
        or = "";
      for (let i = 0; i < this.filter.estadosSel.length; i++) {
        where += or + "Estado LIKE '" + this.filter.estadosSel[i].value + "%'";
        or = " OR ";
      }
      where += ")";
      if (!this.filter.alldata) where += " AND (FechaEfecto BETWEEN '" + dateini + "' AND '" + dateend + "')";
      where += " ORDER BY Situacion DESC";
      this.callData({cmd: "getRecords", table: "Recibos", where, subtable: "RecibosGestion", id: this.filter.userby.value}).then(function(response) {
        self.defineDialog(self.columnDefs, false, "Recibos");
        self.setItems("Gestion", "select", self.lang.gestion);
        self.setItems("Estado", "select", self.lang.estados);
      });
    },
    // CALL DATA BAJAS
    callDataBajas() {
      this.filter.dateMonth = false;
      let self = this;
      let where = "(Gestion LIKE 'AN%') AND (FechaEfecto LIKE '" + this.filter.yearmonth + "%')";
      this.callData({cmd: "getRecords", table: "Recibos", where}).then(function(response) {});
    },
    // CALL DATA LIQ
    callDataLiq() {
      this.filter.dateDialog = false
      let self = this;
      // let days = this.getDaysWeek(this.filter.year, this.filter.month);
      // let where = "(Estado LIKE 'COBRADO') AND (Situacion>='" + days.dateini + "' AND Situacion<='" + days.dateend + "') ORDER BY Situacion DESC";
      // this.callData({cmd: "getRecords", table: "Recibos", where}).then(function(response) {});
    },
    // CALL DATA RECIBO
    callDataRecibo() {
      let self = this;
      let where = "(CodigoRecibo='" + this.$route.params.recibo + "')";
      this.callData({cmd: "getRecords", table: "Recibos", where}).then(function(response) {});
    },
    // SELECTED ROW
    rowSelected: function(data) {
      if (data) {
        this.recibo.selected = true;
        this.defineDialog(this.columnDefsSub, false, "RecibosGestion");
        //Defaults
        this.dialogData["CodigoRecibo"] = data.CodigoRecibo;
        this.dialogData["CodigoPoliza"] = data.CodigoPoliza;
        this.dialogData["NombreTomador"] = data.NombreTomador;
        this.dialogData["Usuario"] = localStorage.username;
      } else {
        this.recibo.selected = false;
        this.defineDialog(this.columnDefs, false, "Recibos");
        this.dialogFields["Estado"].options = this.lang.estados;
        this.dialogFields["Estado"].type = "select";
      }
      this.dialogFields["Gestion"].options = this.lang.gestion;
      this.dialogFields["Gestion"].type = "select";
    },
    // SELECTED SUB ROWS
    rowSelectedSub: function(data) {
      if (data) {
        this.defineDialog(this.columnDefsSub, data, "RecibosGestion");
        this.recibo.selectedSub = true;
        this.dialogFields["Gestion"].options = this.lang.gestion;
        this.dialogFields["Gestion"].type = "select";
      } else {
        this.recibo.selectedSub = false;
        return;
      }
    },
    //CALCULATE
    filterData(data) {
      let sumCobrado = 0;
      let sumImporte = 0;
      for (let i = 0; i < data.length; i++) {
        sumCobrado = sumCobrado + data[i].data.Cobrado;
        sumImporte = sumImporte + data[i].data.Importe;
      }
      this.calculos.importe = this.$route.params.recibo == "caja" ? Number(sumCobrado).toFixed(2) : Number(sumImporte).toFixed(1);
    },
    // INITIALIZATION
    init() {
      this.filter.estadosSel = [{value: "PENDIENTE", text: this.lang.estados[0].text}, {value: "DEVUELTO", text: this.lang.estados[1].text}];
      this.recibo.selected = null;
      this.recibo.selectedSub = false;
      this.dialogModel = false;
      if (this.$route.params.recibo == "bajas") this.callDataBajas();
      if (this.$route.params.recibo == "gestion") this.callDataGestion();
      if (this.$route.params.recibo == "liq") this.callDataLiq();
      if (this.$route.params.recibo == "") this.callDataRecibo();
    }
  },
  beforeMount() {
    this.setLang(localStorage.lang);
    this.init();
  },
  created() {},
  watch: {
    $route: "init"
  }
};
</script>