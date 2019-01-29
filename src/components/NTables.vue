<template>
  <div style="text-align: left">
    <!-- TABLA DE DATOS -->
    <ag-grid-vue
      style="height: 500px;"
      class="ag-theme-balham"
      :animateRows="true"
      :columnDefs="columnDefs"
      :columnTypes="columnTypes"
      :masterDetail="masterDetail"
      :detailCellRendererParams="detailCellRendererParams"
      :enableRangeSelection="true"
      :enableCellChangeFlash="true"
      :floatingFilter="false"
      :localeText="localeText"
      multiSortKey="ctrl"
      :rowData="rowData"
      rowGroupPanelShow="always"
      :rowClassRules="rowClassRules"
      :suppressDragLeaveHidesColumns="true"
      :suppressMakeColumnVisibleAfterUnGroup="true"
      :suppressSizeToFit="true"
      :suppressColumnVirtualisation="true"
      :sizeColsToFix="true"
      :statusBar="statusBar"
      :defaultColDef="defaultColDef"
      :sideBar="sideBar"
      @row-data-changed="onRowDataChanged"
      @selection-changed="onSelectionChanged"
      @grid-ready="onGridReady"
      @cell-clicked="onCellClicked"
      @cell-value-changed="onCellValueChanged"
      @filter-changed="onFilterChanged"
    ></ag-grid-vue>
  </div>
</template>

<script>
//           :rowMultiSelectWithClick="false"
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";
import axios from "axios";
import localeText from "../locales/NTables";
import quasar from "quasar";

// EXPORT DEFAULT
export default {
  name: "NTables",
  props: {
    columnDefs: null,
    columnDefsSub: null,
    rowData: null,
    table: null,
    masterDetail: null,
    rowClassRules: null,
    filters: null,
    quickFilter: null
  },
  data() {
    return {
      // Uso AgGrid
      gridApi: null,
      columnApi: null,
      detailCellRendererParams: null,
      rowSelection: null,
      defaultColDef: {
        enablePivot: false,
        editable: false,
        resizable: true,
        filter: true,
        sortable: true
      },
      columnTypes: {
        dateColumn: {
          filter: "agSetColumnFilter"
        },
        textColumn: {
          filter: "agSetColumnFilter"
        },
        numberColumn: {
          filter: "agNumberColumnFilter",
          enableValue: true,
          enableRowGroup: true
        },
        generalColumn: {
          filter: "agSetColumnFilter",
          enableRowGroup: true
        },
        bitColumn: {
          filter: "agSetColumnFilter",
          enableRowGroup: true,
          cellRenderer: function(params) {
            return `<input type='checkbox' onclick="return false;" ${
              params.value ? "checked" : ""
            } />`;
          }
        }
      },
      statusBar: {
        statusPanels: [
          { statusPanel: "agTotalRowCountComponent", align: "left" },
          { statusPanel: "agFilteredRowCountComponent" },
          { statusPanel: "agSelectedRowCountComponent" },
          { statusPanel: "agAggregationComponent" }
        ]
      },
      sideBar: {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel"
          }
        ],
        defaultToolPanel: "",
        enablePivot: false
      },
      localeText: localeText
    };
  },
  components: {
    AgGridVue
  },
  methods: {
    onGridReady(params) {
      if (params.api && params.columnApi) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        //this.autoSizeColumns();
      }
    },
    onRowDataChanged(params) {
      if (params.api && params.columnApi) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.createSubtable();
        this.autoFilter();
      }
    },
    autoSizeColumns() {
      var allColumnIds = [];
      if (this.columnApi) {
        this.columnApi.getAllColumns().forEach(function(column) {
          allColumnIds.push(column.colId);
        });
        this.columnApi.autoSizeColumns(allColumnIds);
      }
    },
    autoFilter() {
      if (this.gridApi) {
        this.gridApi.setFilterModel(this.filters);
        this.gridApi.onFilterChanged();
      }
    },
    onFilterChanged() {
      this.$emit("gridData", this.gridApi.rowModel);
    },
    onCellClicked(event) {
      this.$emit("cellClicked", event);
    },
    onSelectionChanged(params) {
      let row = this.gridApi.getSelectedRows();
      this.$emit("rowSelected", row);
    },
    onCellValueChanged(value) {},
    createSubtable() {
      let self = this;
      var subGrid;
      this.detailCellRendererParams = {
        detailGridOptions: {
          enableRangeSelection: true,
          columnDefs: this.columnDefsSub,
          defaultColDef: this.defaultColDef,
          columnTypes: this.columnTypes,
          localeText: localeText,
          onGridReady(params) {
            this.gridApi = params.api;
          },
          onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
          },
          onCellValueChanged(value) {},
          onSelectionChanged(event) {
            let row = this.gridApi.getSelectedRows();
            self.$emit("rowSelectedSub", row);
          }
        },
        getDetailRowData: params => {
          params.successCallback(params.data.callRecords);
        },
        template: function(params) {
          return (
            '<div style="height: 100%; background-color: #EDF6FF; padding: 20px; box-sizing: border-box;">' +
            '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
            "</div>"
          );
        }
      };
    }
  },
  beforeMount() {},
  created() {},
  watch: {
    quickFilter: function() {
      this.gridApi.setQuickFilter(this.quickFilter);
    },
    filters: {
      handler(val) {
        this.autoFilter();
      },
      deep: true
    }
  }
};
</script>

