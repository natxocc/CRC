export default {
  data() {
    return {
      lang: null,
      columnDefs: null,
      columnDefsSub: null,
      rowData: null,
      quickFilter: null,
      idKey: null,
      table: null,
      cmd: null,
      dialogModel: false,
      dialogData: {},
      dialogFields: {},
      dialogTable: null,
      dialogTitle: null
    };
  },
  methods: {
    callData(post) {
      let self = this;
      post.sid = localStorage.sid;
      post.lang = this.lang.db;
      this.$store.state.loading = true
      return fetch(localStorage.url, {
        method: "post",
        body: JSON.stringify(post)
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          self.$store.state.loading = false
          if (post.cmd == "getRecords") {
            self.defineTable(response);
            return response;
          }
          if (response.success == true) {
            self.newMessage(self.lang.DatosGuardados, "success")
          } else {
            self.newMessage(self.lang.ErrorOperacion, "error")
          }
          return response;
        });
    },
    newMessage(text, color) {
      this.$store.state.notify.text = text
      this.$store.state.notify.color = color
      this.$store.state.notify.model = true
    },
    setId(columns) {
      let idkey = columns.find(function (x) {
        return x.groupId === true;
      });
      this.idKey = idkey.field;
    },
    defineTable(data) {
      if (data.success) {
        this.columnDefs = data.columns;
        this.rowData = data.data;
        this.table = data.table;
        if (data.columnsSub) this.columnDefsSub = data.columnsSub;
        return true;
      } else {
        this.newMessage(self.lang.SinAutorizacion, "error")
        return false;
      }
    },
    defineDialog(columns, data, table) {
      this.setId(columns);
      let result = {};
      result.data = {};
      result.fields = {};
      let fields = columns.map(x => x.field);
      for (let i = 0; i < fields.length; i++) {
        // Props
        result.fields[fields[i]] = {};
        result.fields[fields[i]].name = columns[i].headerName;
        result.fields[fields[i]].type = columns[i].type;
        result.fields[fields[i]].options = [];
        if (columns[i].headerClass != "") {
          result.fields[fields[i]].props = {};
          result.fields[fields[i]].props.disabled = columns[i].headerClass
            .disabled
            ? columns[i].headerClass.disabled
            : false;
          result.fields[fields[i]].props.hidden = columns[i].headerClass.hidden
            ? columns[i].headerClass.hidden
            : false;
          result.fields[fields[i]].props.autofocus = columns[i].headerClass
            .autofocus
            ? columns[i].headerClass.autofocus
            : false;
          result.fields[fields[i]].props.autogrow = columns[i].headerClass
            .autogrow
            ? columns[i].headerClass.autogrow
            : false;
          if (columns[i].headerClass.select) {
            result.fields[fields[i]].options = [
              ...new Set(this.rowData.map(x => x[fields[i]]))
            ];
            result.fields[fields[i]].type = "select";
          }
          if (columns[i].headerClass.autocomplete) {
            result.fields[fields[i]].options = [
              ...new Set(this.rowData.map(x => x[fields[i]]))
            ];
            result.fields[fields[i]].type = "autocomplete";
          }
          if (columns[i].headerClass.combo) {
            result.fields[fields[i]].options = [
              ...new Set(this.rowData.map(x => x[fields[i]]))
            ];
            result.fields[fields[i]].type = "combo";
          }
          if (columns[i].headerClass.required) {
            result.fields[fields[i]].props.rules = [
              val => !!val || this.lang.CampoObligatorio
            ];
          }
        }
        // Values
        result.data[fields[i]] = null;
        if (!data) {
          this.cmd = "insertRecord";
          if (columns[i].type == "date")
            result.data[fields[i]] = new Date().toISOString().substr(0, 10);
          if (columns[i].type == "datetime")
            result.data[fields[i]] = new Date().toISOString().slice(0, 19).replace("T", " ");
          if (columns[i].type == "bit") result.data[fields[i]] = 0;
          this.dialogTitle = this.lang.Nuevo
        } else {
          this.cmd = "updateRecord";
          this.dialogTitle = this.lang.Editar
          result.data[fields[i]] = data[fields[i]];
        }
      }
      if (table) {
        this.table = table;
        this.dialogTable = table;
      }
      this.dialogData = result.data;
      this.dialogFields = result.fields;
      // console.log(result)
      return true;
    },
    setItems(field, type, items) {
      this.dialogFields[field].options = items;
      this.dialogFields[field].type = type;
    },
    getWeek(d) {
      // Copy date so don't modify original
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      // Get first day of year
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      // Return array of year and week number
      // return [d.getUTCFullYear(), weekNo];
      return weekNo;
    },
    getDaysWeek(year, week) {
      var dateini = new Date(year, 0, 1),
        offset = dateini.getTimezoneOffset();
      dateini.setDate(dateini.getDate() + 4 - (dateini.getDay() || 7));
      dateini.setTime(
        dateini.getTime() +
        7 *
        24 *
        60 *
        60 *
        1000 *
        (week + (year == dateini.getFullYear() ? -1 : 0))
      );
      dateini.setTime(
        dateini.getTime() + (dateini.getTimezoneOffset() - offset) * 60 * 1000
      );
      dateini.setDate(dateini.getDate() - 2); // Antes -3 pero comienza en Domingo
      let dateend = new Date(dateini);
      dateend.setDate(dateini.getDate() + 7);// Antes +6 pero faltaba incluir el domingo en MtSQL
      dateini = dateini.toISOString().substr(0, 10);
      dateend = dateend.toISOString().substr(0, 10);
      let result = {
        dateini,
        dateend
      };
      return result;
    },
    setLang(lang) {
      if (!localStorage.lang || !lang) lang = "es";
      this.lang = this.$lang[lang];
      if (localStorage.lang != lang) {
        localStorage.lang = lang;
        location.reload();
      }
    }
  },
  beforeMount() {
  }
};
