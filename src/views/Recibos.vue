<template>
  <div class="container">
    <!-- TABS -->
    <q-tabs active-bg-color="primary" active-color="white" class="bg-secondary text-primary" dense indicator-color="transparent" inline-label top-indicator v-model="tab">
      <q-route-tab :label="$q.lang.Gestion" icon="assignment_turned_in" name="gestion" to="/recibos/gestion"/>
      <q-route-tab :label="$q.lang.BajasPendientes" icon="assignment_returned" name="bajas" to="/recibos/bajas"/>
      <q-route-tab :label="$q.lang.Liquidacion" icon="credit_card" name="liq" to="/recibos/liq"/>
      <q-route-tab :label="$q.lang.ControlCaja" icon="done_all" name="ant" to="/recibos/ant"/>
      <q-tab :label="calculos.importe" class="text-primary" disabled icon="euro_symbol"/>
    </q-tabs>
    <!-- SELECT FILTERS GESTION -->
    <div v-if="tab=='gestion'">
      <div class="row text-center">
        <div class="col-xs-12 col-md-5" style="padding: 10px">
          <q-input :label="$q.lang.FiltroRapido" dense type="text" v-model="quickFilter">
            <q-icon name="filter_list" slot="prepend"/>
            <q-icon @click="quickFilter = ''" class="cursor-pointer" name="close" slot="append"/>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-5" style="padding: 10px">
          <q-select :label="$q.lang.FiltrosDeEstado" :options="filter.Estados" @input="callDataGestion" dense expandBesides multiple optionsDense v-model="filter.EstadosSel"/>
        </div>
        <div class="col-xs-12 col-md-2" style="padding: 10px">
          <q-toggle :label="$q.lang.TodosLosRegistros" @input="callDataGestion" dense v-model="filter.alldata">
            <q-tooltip anchor="top middle" self="bottom middle">{{$q.lang.TodosLosRegistrosT}}</q-tooltip>
          </q-toggle>
        </div>
      </div>
      <!-- MINI TOOLBAR-->
      <q-bar class="bg-primary text-white">
        <q-btn dense flat icon="add" v-if="!recibo.selected && !recibo.selectedSub">
          {{$q.lang.NuevoRecibo}}
        </q-btn>
        <q-btn @click="deleteRecord" color="warning" dense flat icon="delete" v-if="recibo.selected">
          {{$q.lang.EliminarRecibo}}
        </q-btn>
        <q-btn dense flat icon="add" v-if="recibo.selected">
          {{$q.lang.NuevaGestion}}
        </q-btn>
        <q-btn color="warning" dense flat icon="delete" v-if="recibo.selectedSub">
          {{$q.lang.EliminarGestion}}
        </q-btn>
        <q-btn dense flat icon="edit" v-if="recibo.selectedSub">
          {{$q.lang.EditarGestion}}
        </q-btn>
        <q-space/>
        <!-- AYUDA -->
        <div>
          <q-btn color="primary" icon="help_outline" size="sm">
            <q-popup-proxy>
              <q-list dense>
                <q-item>
                  <q-item-section>
                    <q-item-label>{{$q.lang.RecibosSinTratamiento}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item style="background-color: #fcf18e;">
                  <q-item-section>
                    <q-item-label>{{$q.lang.RecibosPendientes}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item style="background-color: #88c9ff">
                  <q-item-section>
                    <q-item-label>{{$q.lang.RecibosAnulados}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item style="background-color: rgb(182, 255, 191)">
                  <q-item-section>
                    <q-item-label>{{$q.lang.RecibosCobrados}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item style="background-color: rgb(252, 151, 151);">
                  <q-item-section>
                    <q-item-label>{{$q.lang.RecibosUrgentes}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item style="background-color: #a8a8a7;">
                  <q-item-section>
                    <q-item-label>{{$q.lang.RecibosError}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-popup-proxy>
          </q-btn>
        </div>
      </q-bar>
      <!-- LINE CLIENTES -->
      <div class="row textcenter">
        <q-btn @click="client.dialog=true" dense flat icon="perm_contact_calendar" v-if="!client.selected && recibo.selected">
        </q-btn>
        <q-btn @click="client.dialog=true" dense flat icon="perm_contact_calendar" v-if="client.selected">
          <span class="text-weight-bold" style="margin: 2px">{{client.name}}{{client.telf1}} {{client.telf2}} {{client.mail}}</span>
        </q-btn>
      </div>
    </div>
    <!-- SELECT FILTERS BAJAS -->
    <div v-if="tab=='bajas'">
      <div class="row text-center">
        <div class="col-xs-12 col-sm-4" style="padding: 10px">
          <q-input :label="$q.lang.FiltroRapido" dense type="text" v-model="quickFilter">
            <q-icon name="filter_list" slot="prepend"/>
            <q-icon @click="quickFilter = ''" class="cursor-pointer" name="close" slot="append"/>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-4" style="padding: 10px">
          <q-select :label="$q.lang.ano" :options="filter.years" @input="callDataBajas" dense expandBesides optionsDense v-model="filter.year"/>
        </div>
        <div class="col-xs-12 col-sm-4" style="padding: 10px">
          <q-select :label="$q.lang.mes" :options="filter.months" @input="callDataBajas" dense expandBesides optionsDense v-model="filter.month"/>
        </div>
      </div>
    </div>
    <!-- SELECT FILTERS LIQUIDACION -->
    <div v-if="tab=='liq'">
      <div class="row text-center">
        <div class="col-xs-12 col-sm-4" style="padding: 10px">
          <q-input :label="$q.lang.FiltroRapido" dense type="text" v-model="quickFilter">
            <q-icon name="filter_list" slot="prepend"/>
            <q-icon @click="quickFilter = ''" class="cursor-pointer" name="close" slot="append"/>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-4" style="padding: 10px">
          <q-select :label="$q.lang.ano" :options="filter.years" @input="callDataLiq" dense expandBesides optionsDense v-model="filter.year"/>
        </div>
        <div class="col-xs-12 col-sm-4" style="padding: 10px">
          <q-select :label="$q.lang.semana" :options="filter.weeks" @input="callDataLiq" dense expandBesides optionsDense v-model="filter.week"/>
        </div>
      </div>
    </div>
    <!-- TABLA DE DATOS -->
    <n-tables :columnDefs="columnDefs" :columnDefsSub="columnDefsSub" :masterDetail="true" :quickFilter="quickFilter" :rowClassRules="rowClassRules" :rowData="rowData" @gridData="gridData" @rowSelected="rowSelected" @rowSelectedSub="rowSelectedSub"/>
    <!-- DIALOGO DE CLIENTES -->
    <n-dialog :columns="client.columns" :data="client.data" :model="client.dialog" :table="null" @cancel="client.dialog=false" @onSave="saveDataClient"></n-dialog>
  </div>
</template>

<script>
import NTables from "../components/NTables.vue";
import NDialog from "../components/NDialog.vue";
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
    NTables,
    NDialog
  },
  data() {
    return {
      // TABLE
      columnDefs: [],
      columnDefsSub: [],
      rowData: null,
      quickFilter: null,
      filter: {
        EstadosSel: ["PENDIENTE"],
        Estados: ["PENDIENTE", "DEVUELTO", "COBRADO", "ANULADO", "EMITIDO"],
        alldata: false,
        years: [],
        weeks: [],
        months: [],
        month: ("0" + (new Date().getMonth() + 1)).slice(-2),
        year: new Date().getFullYear(),
        week: 1
      },
      rowClassRules: {
        error:
          "data.Estado.includes('COBRADO') && data.MIEstado.includes('ANULADO')",
        pendiente:
          "data.Estado.includes('PENDIENTE') && data.MIEstado.includes('PENDIENTE')",
        anulado:
          "data.Estado.includes('ANULADO') || (data.MIEstado.includes('ANULADO') && !data.Estado.includes('COBRADO'))",
        cobrado:
          "data.Estado.includes('COBRADO') || (data.MIEstado.includes('COBRADO') && data.Importe == data.Cobrado)"
      },
      // CLIENT
      client: {
        columns: null,
        data: null,
        name: null,
        telf: null,
        mail: null,
        dialog: false,
        selected: false
      },
      // RECIBO
      recibo: {
        selected: null,
        selectedSub: false
      },
      // GESTION
      tab: this.$route.params.recibo,
      // CALCULOS
      calculos: {
        importe: null
      }
    };
  },
  methods: {
    // AXIOS
    deleteRecord() {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "Desea Eliminar este Registro",
          cancel: true
        })
        .onOk(() => {})
        .onCancel(() => {});
    },
    saveDataClient() {
      let self = this;
      axios
        .post(localStorage.url, {
          cmd: "updateRecord",
          table: "Clientes",
          idkey: "NIF",
          idvalue: self.client.data["NIF"],
          data: self.client.data
        })
        .then(function(response) {
          if (response.data == true) {
            self.$q.notify({
              message: self.$q.lang.DatosGuardados,
              color: "positive"
            });
          }
        });
    },
    callDataGestion() {
      let self = this;
      // Por defecto los últimos 13 meses
      let dateini = new Date();
      dateini.setMonth(dateini.getMonth() - 13);
      dateini = dateini.toISOString().substr(0, 10);
      let dateend = new Date().toISOString().substr(0, 10);
      let where = "(",
        or = "";
      for (let i = 0; i < this.filter.EstadosSel.length; i++) {
        where += or + "Estado LIKE '" + this.filter.EstadosSel[i] + "%'";
        or = " OR ";
      }
      where += ")";
      let whereMore = [
        " AND (FechaEfecto BETWEEN '" + dateini + "' AND '" + dateend + "')"
      ];
      if (!this.filter.alldata) where += whereMore;
      showLoading();
      axios
        .post(localStorage.url, {
          cmd: "getRecords",
          table: "Recibos",
          subtable: "RecibosGestion",
          id: "CodigoRecibo",
          orderby: "Situacion DESC",
          where: where,
          lang: this.$q.lang.db
        })
        .then(function(response) {
          self.columnDefs = response.data.columns;
          self.columnDefsSub = response.data.columnsSub;
          hideLoading();
          self.rowData = response.data.data;
        });
    },
    callDataBajas() {
      let self = this;
      let where =
        "(MIEstado LIKE 'ANULADO') AND (FechaEfecto LIKE '" +
        this.filter.year +
        "-" +
        this.filter.month +
        "%')";
      showLoading();
      axios
        .post(localStorage.url, {
          cmd: "getRecords",
          table: "Recibos",
          where: where,
          orderby: false,
          subtable: false,
          id: false,
          lang: this.$q.lang.db
        })
        .then(function(response) {
          self.columnDefs = response.data.columns;
          self.columnDefsSub = response.data.columnsSub;
          hideLoading();
          self.rowData = response.data.data;
        });
    },
    callDataLiq() {
      let self = this;
      let dateini = this.getMonday(this.filter.year, this.filter.week);
      let dateend = new Date(dateini);
      dateend.setDate(dateini.getDate() + 6);
      dateini = dateini.toISOString().substr(0, 10);
      dateend = dateend.toISOString().substr(0, 10);
      console.log(dateini);
      console.log(dateend);
      // console.log(dateini + "--" + dateend);
      let where =
        "(Estado LIKE 'COBRADO') AND (Situacion>='" +
        dateini +
        "' AND Situacion<='" +
        dateend +
        "')";
      showLoading();
      axios
        .post(localStorage.url, {
          cmd: "getRecords",
          table: "Recibos",
          where: where,
          orderby: "Situacion DESC",
          subtable: false,
          id: false,
          lang: this.$q.lang.db
        })
        .then(function(response) {
          self.columnDefs = response.data.columns;
          self.columnDefsSub = response.data.columnsSub;
          hideLoading();
          self.rowData = response.data.data;
        });
    },
    callDataAnt() {
      let self = this;
      let where =
        "(Estado LIKE 'PENDIENTE') AND (Cobrado>0 AND Cobrado<>Importe)";
      showLoading();
      axios
        .post(localStorage.url, {
          cmd: "getRecords",
          table: "Recibos",
          where: where,
          orderby: "Situacion DESC",
          subtable: false,
          id: false,
          lang: this.$q.lang.db
        })
        .then(function(response) {
          self.columnDefs = response.data.columns;
          self.columnDefsSub = response.data.columnsSub;
          hideLoading();
          self.rowData = response.data.data;
        });
    },
    callDataRecibo() {
      let self = this;
      let where = "(CodigoRecibo='" + this.$route.params.recibo + "')";
      showLoading();
      axios
        .post(localStorage.url, {
          cmd: "getRecords",
          table: "Recibos",
          where: where,
          orderby: false,
          subtable: false,
          id: false,
          lang: this.$q.lang.db
        })
        .then(function(response) {
          self.columnDefs = response.data.columns;
          self.columnDefsSub = response.data.columnsSub;
          hideLoading();
          self.rowData = response.data.data;
        });
    },
    // SELECTED ROWS
    rowSelectedSub: function(params) {
      if (params.length == 0) {
        this.recibo.selectedSub = false;
        return;
      }
      this.recibo.selectedSub = true;
    },
    rowSelected: function(params) {
      if (params.length == 0) {
        this.recibo.selected = false;
        this.client.selected = false;
        return;
      }
      this.recibo.selected = true;
      let self = this;
      if (params[0].NombreTomador) {
        let where = "NombreCompleto = '" + params[0].NombreTomador + "'";
        axios
          .post(localStorage.url, {
            cmd: "getRecords",
            table: "Clientes",
            where: where,
            orderby: false,
            subtable: false,
            id: false,
            lang: this.$q.lang.db
          })
          .then(function(response) {
            if (response.data.data.length) {
              self.client.columns = response.data.columns;
              self.client.data = response.data.data[0];
              self.client.selected = true;
              self.client.name = response.data.data[0].NombreCompleto;
              self.client.telf = response.data.data[0].Telefono;
              self.client.mail = response.data.data[0].CorreoElectronico;
            } else {
              self.client.selected = false;
              self.client.telf = self.client.mail = self.client.name = null;
              self.client.columns = self.client.data = null;
            }
          });
      }
    },
    //CALCULATE
    gridData(data) {
      let sumCobrado = 0;
      let sumImporte = 0;
      for (let i = 0; i < data.length; i++) {
        sumCobrado = sumCobrado + data[i].data.Cobrado;
        sumImporte = sumImporte + data[i].data.Importe;
      }
      this.calculos.importe =
        this.$route.params.recibo == "ant"
          ? Number(sumCobrado).toFixed(2)
          : Number(sumImporte).toFixed(1);
    },
    // INITIALIZATION
    init() {
      switch (this.$route.params.recibo) {
        case "bajas":
          this.callDataBajas();
          break;
        case "gestion":
          this.callDataGestion();
          break;
        case "liq":
          this.callDataLiq();
          break;
        case "ant":
          this.callDataAnt();
          break;
        default:
          this.callDataRecibo();
          break;
      }
    },
    getMonday(year, week) {
      var d = new Date(year, 0, 1),
        offset = d.getTimezoneOffset();
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      d.setTime(
        d.getTime() +
          7 * 24 * 60 * 60 * 1000 * (week + (year == d.getFullYear() ? -1 : 0))
      );
      d.setTime(d.getTime() + (d.getTimezoneOffset() - offset) * 60 * 1000);
      d.setDate(d.getDate() - 3);
      return d;
    }
  },
  beforeMount() {
    this.init();
    let year = new Date().getFullYear();
    let years = [];
    let months = [];
    let weeks = [];
    for (let i = 0; i < 20; i++) {
      years[i] = year - i;
    }
    for (let i = 0; i < 55; i++) {
      weeks[i] = i + 1;
    }
    for (let i = 0; i < 12; i++) {
      months[i+1] = ("0" + (i + 1)).slice(-2);
    }
    months[0]="";
    this.filter.months = months;
    this.filter.weeks = weeks;
    this.filter.years = years;
  },
  watch: {
    $route: "init"
  }
};
</script>

