<template>
  <div class="container">
    <!-- TABS -->
    <q-tabs active-bg-color="primary" active-color="white" class="bg-secondary text-primary" dense indicator-color="transparent" inline-label top-indicator v-model="tab">
      <q-route-tab :label="$q.lang.recibo.Gestion" icon="assignment_turned_in" name="gestion" to="/recibos/gestion"/>
      <q-route-tab :label="$q.lang.recibo.Bajas" icon="assignment_returned" name="bajas" to="/recibos/bajas"/>
      <q-tab :label="calculos.importe" class="text-primary" disabled icon="euro_symbol"/>
    </q-tabs>
    <!-- SELECT FILTERS -->
    <transition appear class="group" enter-active-class="fade" leave-active-class="fade">
      <div v-if="tab=='gestion'">
        <div class="row text-center">
          <div class="col-xs-12 col-md-5" style="padding: 10px">
            <q-input :label="$q.lang.recibo.FiltroRapido" dense type="text" v-model="quickFilter">
              <q-icon name="filter_list" slot="prepend"/>
              <q-icon @click="quickFilter = ''" class="cursor-pointer" name="close" slot="append"/>
            </q-input>
          </div>
          <div class="col-xs-12 col-md-5" style="padding: 10px">
            <q-select :label="$q.lang.recibo.FiltrosDeEstado" :options="filter.Estados" @input="callDataGestion" dense expandBesides multiple optionsDense v-model="filter.EstadosSel"/>
          </div>
          <div class="col-xs-12 col-md-2" style="padding: 10px">
            <q-toggle :label="$q.lang.recibo.TodosLosRegistros" @input="callDataGestion" dense v-model="filter.alldata">
              <q-tooltip anchor="top middle" self="bottom middle">{{$q.lang.recibo.TodosLosRegistrosT}}</q-tooltip>
            </q-toggle>
          </div>
        </div>
        <!-- MINI TOOLBAR -->
        <q-bar class="bg-primary text-white">
          <q-btn :disabled="recibo.selected" dense flat icon="add">
            <q-tooltip anchor="top middle" self="bottom middle">{{$q.lang.recibo.NuevoReciboT}}</q-tooltip>
            {{$q.lang.recibo.NuevoRecibo}}
          </q-btn>
          <q-btn :disabled="!recibo.selected" @click="deleteRecord" color="warning" dense flat icon="delete">
            <q-tooltip anchor="top middle" self="bottom middle">{{$q.lang.recibo.EliminarReciboT}}</q-tooltip>
            {{$q.lang.recibo.EliminarRecibo}}
          </q-btn>
          <q-btn :disabled="!recibo.selected" dense flat icon="add">
            <q-tooltip anchor="top middle" self="bottom middle">{{$q.lang.recibo.NuevaGestionT}}</q-tooltip>
            {{$q.lang.recibo.NuevaGestion}}
          </q-btn>
          <q-btn :disabled="!recibo.selectedSub" dense flat icon="edit">
            <q-tooltip anchor="top middle" self="bottom middle">{{$q.lang.recibo.EditarGestionT}}</q-tooltip>
            {{$q.lang.recibo.EditarGestion}}
          </q-btn>
          <q-btn :disabled="!recibo.selectedSub" color="warning" dense flat icon="delete">
            <q-tooltip anchor="top middle" self="bottom middle">{{$q.lang.recibo.EliminarGestionT}}</q-tooltip>
            {{$q.lang.recibo.EliminarGestion}}
          </q-btn>
          <q-btn @click="client.dialog=true" dense flat icon="perm_contact_calendar" v-if="!client.selected && recibo.selected">
            <q-tooltip anchor="top middle" self="bottom middle">Crear nuevo Cliente</q-tooltip>Nuevo Cliente
          </q-btn>
          <q-btn @click="client.dialog=true" dense flat icon="perm_contact_calendar" v-if="client.selected">
            <q-tooltip anchor="top middle" self="bottom middle">Información de Contacto</q-tooltip>
            <span class="text-weight-bold" style="margin: 2px">{{client.name}}{{client.telf1}} {{client.telf2}} {{client.mail}}</span>
          </q-btn>
          <q-space/>
          <div>
            <!-- AYUDA -->
            <q-btn color="primary" icon="help_outline" size="sm">
              <q-tooltip>{{$q.lang.recibo.AyudaReciboT}}</q-tooltip>
              <q-popup-proxy>
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      <q-item-label>{{$q.lang.recibo.RecibosSinTratamiento}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item style="background-color: #fcf18e;">
                    <q-item-section>
                      <q-item-label>{{$q.lang.recibo.RecibosPendientes}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item style="background-color: #88c9ff">
                    <q-item-section>
                      <q-item-label>{{$q.lang.recibo.RecibosAnulados}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item style="background-color: rgb(182, 255, 191)">
                    <q-item-section>
                      <q-item-label>{{$q.lang.recibo.RecibosCobrados}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item style="background-color: rgb(252, 151, 151);">
                    <q-item-section>
                      <q-item-label>{{$q.lang.recibo.RecibosUrgentes}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item style="background-color: #a8a8a7;">
                    <q-item-section>
                      <q-item-label>{{$q.lang.recibo.RecibosError}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-popup-proxy>
            </q-btn>
            <q-tooltip>{{$q.lang.recibo.AyudaReciboT}}</q-tooltip>
          </div>
        </q-bar>
      </div>
    </transition>

    <!-- TABLA DE DATOS -->
    <n-tables
      :columnDefs="columnDefs"
      :columnDefsSub="columnDefsSub"
      :masterDetail="true"
      :quickFilter="quickFilter"
      :rowClassRules="rowClassRules"
      :rowData="rowData"
      @gridData="gridData"
      @rowSelected="rowSelected"
      @rowSelectedSub="rowSelectedSub"
      table="Recibos"
    />
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
        month: ("0" + (new Date().getMonth() + 1)).slice(-2),
        year: new Date().getFullYear()
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
        importe: null,
        cobrado: null
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
        .post("http://" + localStorage.url + "/crc/php/consulta.php", {
          cmd: "updateRecord",
          table: "Clientes",
          idkey: "NIF",
          idvalue: self.client.data["NIF"],
          data: self.client.data
        })
        .then(function(response) {});
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
        .post("http://" + localStorage.url + "/crc/php/consulta.php", {
          cmd: "getRecords",
          table: "Recibos",
          subtable: "RecibosGestion",
          id: "CodigoRecibo",
          orderby: "Situacion DESC",
          where: where
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
      console.log(where);
      showLoading();
      axios
        .post("http://" + localStorage.url + "/crc/php/consulta.php", {
          cmd: "getRecords",
          table: "Recibos",
          where: where,
          orderby: false,
          subtable: false,
          id: false
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
        .post("http://" + localStorage.url + "/crc/php/consulta.php", {
          cmd: "getRecords",
          table: "Recibos",
          where: where,
          orderby: false,
          subtable: false,
          id: false
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
          .post("http://" + localStorage.url + "/crc/php/consulta.php", {
            cmd: "getRecords",
            table: "Clientes",
            where: where,
            orderby: false,
            subtable: false,
            id: false
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
      this.calculos.importe = Number(sumImporte).toFixed(0);
      this.calculos.cobrado = Number(sumCobrado).toFixed(0);
    }
  },
  beforeMount() {
    switch (this.$route.params.recibo) {
      case "bajas":
        this.callDataBajas();
        break;
      case "gestion":
        this.callDataGestion();
        break;
      default:
        console.log("numero");
        this.callDataRecibo();
        break;
    }
  },
  watch: {
    tab: function() {
      switch (this.$route.params.recibo) {
        case "bajas":
          this.callDataBajas();
          break;
        case "gestion":
          this.callDataGestion();
          break;
        default:
          console.log("numero");
          this.callDataRecibo();
          break;
      }
    }
  }
};
</script>

