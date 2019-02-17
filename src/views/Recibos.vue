<template>
  <div class="container">
    <!-- TABS -->
    <q-tabs active-bg-color="primary" active-color="white" class="bg-secondary text-primary" dense indicator-color="transparent" inline-label top-indicator v-model="myRoute">
      <q-route-tab :label="$q.lang.Gestion" icon="assignment_turned_in" name="gestion" to="/recibos/gestion"/>
      <q-route-tab :label="$q.lang.BajasPendientes" icon="assignment_returned" name="bajas" to="/recibos/bajas"/>
      <q-route-tab :label="$q.lang.Liquidacion" icon="credit_card" name="liq" to="/recibos/liq"/>
      <q-tab :label="calculos.importe" class="text-primary" disabled icon="euro_symbol"/>
    </q-tabs>
    <!-- SELECT FILTERS TOTALS-->
    <div>
      <div class="row text-center">
        <div class="col-xs-12 col-md-4" style="padding: 10px">
          <q-input :label="$q.lang.FiltroRapido" dense type="text" v-model="quickFilter">
            <q-icon name="filter_list" slot="prepend"/>
            <q-icon @click="quickFilter = ''" class="cursor-pointer" name="close" slot="append"/>
          </q-input>
        </div>
        <!-- FILTER ONLY GESTION -->
        <template v-if="this.$route.params.recibo=='gestion'">
          <div class="col-xs-12 col-md-4" style="padding: 10px">
            <q-select :label="$q.lang.FiltrosDeEstado" :options="this.$q.lang.estados" @input="callDataGestion" dense expandBesides multiple optionsDense v-model="filter.estadosSel"/>
          </div>
          <div class="col-xs-6 col-md-2" style="padding: 10px">
            <q-select :label="$q.lang.HistorialUsuario" :options="this.$q.lang.userby" @input="callDataGestion" dense expandBesides optionsDense v-model="filter.userby"/>
          </div>
          <div class="col-xs-6 col-md-2" style="padding: 10px">
            <q-toggle :label="$q.lang.TodosLosRegistros" @input="callDataGestion" dense v-model="filter.alldata">
              <q-tooltip anchor="top middle" self="bottom middle">{{$q.lang.TodosLosRegistrosT}}</q-tooltip>
            </q-toggle>
          </div>
        </template>
        <!-- FILTER ONLY BAJAS -->
        <template v-else-if="this.$route.params.recibo=='bajas'">
          <div class="col-xs-12 col-md-4" style="padding: 10px">
            <q-select :label="$q.lang.ano" :options="filter.years" @input="callDataBajas" dense expandBesides optionsDense v-model="filter.year"/>
          </div>
          <div class="col-xs-12 col-md-4" style="padding: 10px">
            <q-select :label="$q.lang.mes" :options="filter.months" @input="callDataBajas" dense expandBesides optionsDense v-model="filter.month"/>
          </div>
        </template>
        <!-- FILTER ONLY LIQ & CAJA -->
        <template v-else-if="this.$route.params.recibo=='liq'">
          <div class="col-xs-12 col-md-4" style="padding: 10px">
            <q-select :label="$q.lang.ano" :options="filter.years" @input="callDataLiq" dense expandBesides optionsDense v-model="filter.year"/>
          </div>
          <div class="col-xs-12 col-md-4" style="padding: 10px">
            <q-select :label="$q.lang.semana" :options="filter.weeks" @input="callDataLiq" dense expandBesides optionsDense v-model="filter.week"/>
          </div>
        </template>
      </div>
      <!-- MINI TOOLBAR-->
      <q-bar class="bg-primary text-white">
        <q-btn @click="dialogModel=true" dense flat icon="add" v-if="!recibo.selected && !recibo.selectedSub">{{$q.lang.NuevoRecibo}}</q-btn>
        <q-btn @click="deleteRecord" color="warning" dense flat icon="delete" v-if="recibo.selected">{{$q.lang.EliminarRecibo}}</q-btn>
        <q-btn @click="dialogModel=true" dense flat icon="add" v-if="recibo.selected">{{$q.lang.NuevaGestion}}</q-btn>
        <q-btn color="warning" dense flat icon="delete" v-if="recibo.selectedSub">{{$q.lang.EliminarGestion}}</q-btn>
        <q-btn dense flat icon="edit" v-if="recibo.selectedSub">{{$q.lang.EditarGestion}}</q-btn>
        <q-space/>
        <!-- COLORS HELP -->
        <div>
          <q-btn color="primary" icon="help_outline" size="sm">
            <q-popup-proxy>
              <q-list dense>
                <q-item :key="key" :style="{'background-color': helpColors[key]}" v-for="(value, key) in $q.lang.ayuda">
                  <q-item-section>
                    <q-item-label>{{value}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-popup-proxy>
          </q-btn>
        </div>
      </q-bar>
    </div>
    <!-- TABLA DE DATOS -->
    <n-tables :columnDefs="columnDefs" :columnDefsSub="columnDefsSub" :filters="filters" :masterDetail="true" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData" @gridData="gridData" @rowSelected="rowSelected" @rowSelectedSub="rowSelectedSub"/>
    <!-- DIALOGO DE CLIENTES -->
    <n-dialog :data="dialogData" :fields="dialogFields" :model="dialogModel" @cancel="dialogModel=false" @onChange="onChange" @onSave="onSave"></n-dialog>
  </div>
</template>

<script>
import NTables from "../components/NTables.vue";
import NDialog from "../components/NDialog.vue";
import Custom from "../mixins";
export default {
  components: {
    NTables,
    NDialog
  },
  mixins: [Custom],
  data() {
    return {
      dialog: {
        newGestion: {},
        editRecibo: {}
      },
      filters: null,
      filter: {
        userby: {
          value: "NombreTomador",
          label: this.$q.lang.userby[0].label
        },
        estadosSel: [{value: "PENDIENTE", label: this.$q.lang.estados[0].label}, {value: "DEVUELTO", label: this.$q.lang.estados[1].label}],
        alldata: false,
        years: [],
        weeks: [],
        months: [],
        month: parseInt(("0" + (new Date().getMonth() + 1)).slice(-2)),
        year: new Date().getFullYear(),
        week: 1
      },
      rowClassRules: {
        error: "data.Estado.includes('COBRADO') && data.Gestion.includes('ANULADO')",
        pendiente: "data.Estado.includes('PENDIENTE') && data.Gestion.includes('PENDIENTE')",
        anulado: "data.Estado.includes('ANULADO') || (data.Gestion.includes('ANULADO') && !data.Estado.includes('COBRADO'))",
        cobrado: "data.Estado.includes('COBRADO') || (data.Gestion.includes('COBRADO') && data.Importe == data.Cobrado)"
      },
      // RECIBO
      recibo: {
        selected: null,
        selectedSub: false
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
      // console.log(value, key);
    },
    onSave() {
      this.saveData({cmd: this.dialogMode, idkey: this.idKey, idvalue: this.dialogData[this.idKey], data: this.dialogData, table: this.dialogTable});
      this.init();
    },
    deleteRecord() {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "Desea Eliminar este Registro",
          cancel: true
        })
        .onOk(() => {
          this.saveData({cmd: "deleteRecord", idkey: this.idKey, idvalue: this.dialogData[this.idKey], table: this.dialogTable});
          this.init();
        })
        .onCancel(() => {});
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
        self.defineTable(response);
        self.defineDialog(self.columnDefs, "Recibos");

        // self.dialogFields["Gestion"].options = self.$q.lang.gestion;
        // self.dialogFields["Gestion"].type = "select";
        // self.dialogModel=true
      });
    },
    // CALL DATA BAJAS
    callDataBajas() {
      let self = this;
      let where = "(Gestion LIKE 'ANULADO') AND (FechaEfecto LIKE '" + this.filter.year + "-" + this.filter.month + "%')";
      this.callData({cmd: "getRecords", table: "Recibos", where}).then(function(response) {
        self.defineTable(response);
      });
    },
    // CALL DATA LIQ
    callDataLiq() {
      let self = this;
      let days = this.getDaysWeek(this.filter.year, this.filter.month);
      let where = "(Estado LIKE 'COBRADO') AND (Situacion>='" + days.dateini + "' AND Situacion<='" + days.dateend + "') ORDER BY Situacion DESC";
      this.callData({cmd: "getRecords", table: "Recibos", where}).then(function(response) {
        self.defineTable(response);
      });
    },
    // CALL DATA RECIBO
    callDataRecibo() {
      let self = this;
      let where = "(CodigoRecibo='" + this.$route.params.recibo + "')";
      this.callData({cmd: "getRecords", table: "Recibos", where}).then(function(response) {
        self.defineTable(response);
      });
    },
    // SELECTED ROW
    rowSelected: function(params) {
      // console.log(params);
      if (!params.length) {
        this.recibo.selected = false;
        this.defineDialog(this.columnDefs, "Recibos");
      } else {
        this.recibo.selected = true;
        this.defineDialog(this.columnDefsSub, "RecibosGestion");
        this.dialogFields["CodigoRecibo"].props = {hidden: true};
        this.dialogFields["CodigoPoliza"].props = {hidden: true};
        this.dialogFields["NombreTomador"].props = {hidden: true};
        this.dialogFields["FechaGestion"].props = {hidden: true};
        this.dialogFields["Usuario"].props = {hidden: true};
        this.dialogFields["Comentarios"].props = {autogrow: true, autofocus: true};
        this.dialogData["CodigoRecibo"] = params[0].CodigoRecibo;
        this.dialogData["CodigoPoliza"] = params[0].CodigoPoliza;
        this.dialogData["NombreTomador"] = params[0].NombreTomador;
        this.dialogData["FechaGestion"] = params[0].FechaGestion;
        this.dialogData["Usuario"] = localStorage.username;
      }
    },
    // SELECTED SUB ROWS
    rowSelectedSub: function(params) {
      if (params.length == 0) {
        this.recibo.selectedSub = false;
        return;
      }
      this.recibo.selectedSub = true;
    },
    //CALCULATE
    gridData(data) {
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
      if (this.$route.params.recibo == "bajas") this.callDataBajas();
      if (this.$route.params.recibo == "gestion") this.callDataGestion();
      if (this.$route.params.recibo == "liq") this.callDataLiq();
      if (this.$route.params.recibo == "") this.callDataRecibo();
    }
  },
  beforeMount() {
    this.filter.months = this.getMonths();
    this.filter.weeks = this.getWeeks();
    this.filter.years = this.getYears();
    this.init();
  },
  watch: {
    $route: "init"
  }
};
</script>