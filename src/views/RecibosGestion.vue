<template>
  <div class="container">
    <!-- SELECT FILTERS -->
    <div class="row">
      <div
        class="col-xs-12 col-md-5"
        style="padding: 10px"
      >
        <q-input
          dense
          :label="$q.lang.recibo.FiltroRapido"
          type="text"
          v-model="quickFilter"
        >
          <q-icon
            name="filter_list"
            slot="prepend"
          />
          <q-icon
            @click="quickFilter = ''"
            class="cursor-pointer"
            name="close"
            slot="append"
          />
        </q-input>
      </div>
      <div
        class="col-xs-12 col-md-5"
        style="padding: 10px"
      >
        <q-select
          :options="[
        'PENDIENTE',
        'DEVUELTO',
        'COBRADO',
        'ANULADO',
        'EMITIDO'
        ]"
          @input="callData"
          dense
          expandBesides
          :label="$q.lang.recibo.FiltrosDeEstado"
          multiple
          optionsDense
          v-model="filterEstados"
        />
      </div>
      <div
        class="col-xs-12 col-md-2"
        style="padding: 10px"
      >
        <q-select
          :options="['6 MESES', '1 AÑO']"
          @input="callData"
          dense
          expandBesides
          :label="$q.lang.recibo.SeleccionarFechas"
          optionsDense
          v-model="filters.date"
        />
      </div>
    </div>
    <!-- MINI TOOLBAR -->
    <q-bar class="bg-primary text-white">
      <q-btn
        :disabled="recibo.selected"
        dense
        flat
        icon="add"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
        >{{$q.lang.recibo.NuevoReciboT}}</q-tooltip>{{$q.lang.recibo.NuevoRecibo}}
      </q-btn>
      <q-btn
        :disabled="!recibo.selected"
        @click="deleteRecord"
        color="warning"
        dense
        flat
        icon="delete"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
        >{{$q.lang.recibo.EliminarReciboT}}</q-tooltip>{{$q.lang.recibo.EliminarRecibo}}
      </q-btn>
      <q-btn
        :disabled="!recibo.selected"
        dense
        flat
        icon="add"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
        >{{$q.lang.recibo.NuevaGestionT}}</q-tooltip>{{$q.lang.recibo.NuevaGestion}}
      </q-btn>
      <q-btn
        :disabled="!recibo.selectedSub"
        dense
        flat
        icon="edit"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
        >{{$q.lang.recibo.EditarGestionT}}</q-tooltip>{{$q.lang.recibo.EditarGestion}}
      </q-btn>
      <q-btn
        :disabled="!recibo.selectedSub"
        color="warning"
        dense
        flat
        icon="delete"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
        >{{$q.lang.recibo.EliminarGestionT}}</q-tooltip>{{$q.lang.recibo.EliminarGestion}}
      </q-btn>
      <q-btn
        @click="client.dialog=true"
        dense
        flat
        icon="perm_contact_calendar"
        v-if="!client.selected && recibo.selected"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
        >Crear nuevo Cliente</q-tooltip>Nuevo Cliente
      </q-btn>
      <q-btn
        @click="client.dialog=true"
        dense
        flat
        icon="perm_contact_calendar"
        v-if="client.selected"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
        >Información de Contacto</q-tooltip>
        <span
          class="text-weight-bold"
          style="margin: 2px"
        >{{client.name}}{{client.telf1}} {{client.telf2}} {{client.mail}}</span>
      </q-btn>
      <q-space/>
      <div>
        <!-- AYUDA -->
        <q-tooltip>{{$q.lang.recibo.AyudaReciboT}}</q-tooltip>
        <q-btn-dropdown
          color="primary"
          icon="help_outline"
          size="sm"
          split
        >
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
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-bar>
    <!-- TABLA DE DATOS -->
    <n-tables
      :columnDefs="columnDefs"
      :columnDefsSub="columnDefsSub"
      :filters="filters"
      :masterDetail="true"
      :quickFilter="quickFilter"
      :rowClassRules="rowClassRules"
      :rowData="rowData"
      @rowSelected="rowSelected"
      @rowSelectedSub="rowSelectedSub"
      table="Recibos"
    />
    <!-- DIALOGO DE CLIENTES -->
    <n-dialog
      :columns="client.columns"
      :data="client.data"
      :model="client.dialog"
      :table="null"
      @cancel="client.dialog=false"
      @onSave="saveData"
    ></n-dialog>
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
      filterEstados: ["PENDIENTE"],
      filters: {
        // Estado: ["PENDIENTE"],
        // date: null
        // Importe: {type: "greaterThanOrEqual", filter: "0"}
      },
      rowClassRules: {
        pendiente:
          "data.Estado.includes('PENDIENTE') && data.MIEstado.includes('PENDIENTE')",
        anulado:
          "data.Estado.includes('ANULADO') || data.MIEstado.includes('ANULADO')",
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
      }
      // GESTION
    };
  },
  methods: {
    deleteRecord() {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "Desea Eliminar este Registro",
          cancel: true,
        })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    saveData() {
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
    callData() {
      let self = this;
      // Por defecto los últimos 12 meses
      let dateini = new Date();
      dateini.setMonth(dateini.getMonth() - 6);
      dateini = dateini.toISOString().substr(0, 10);
      let dateend = new Date().toISOString().substr(0, 10);
      let where = "(",
        or = "";
      for (let i = 0; i < this.filterEstados.length; i++) {
        where += or + "Estado LIKE '" + this.filterEstados[i] + "%'";
        or = " OR ";
      }
      where +=
        ") AND FechaEfecto>'" +
        dateini +
        "' AND FechaEfecto<='" +
        dateend +
        "'";
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
    }
  },
  beforeMount() {
    this.callData();
  }
};
</script>

