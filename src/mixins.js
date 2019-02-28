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
          result.fields[fields[i]].props.disable = columns[i].headerClass
            .disable
            ? columns[i].headerClass.disable
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
          if (columns[i].headerClass.select || columns[i].headerClass.autocomplete) {
            result.fields[fields[i]].options = [
              ...new Set(this.rowData.map(x => x[fields[i]]))
            ];
            result.fields[fields[i]].type = columns[i].headerClass.autocomplete
              ? "autocomplete"
              : "select";
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
      return true;
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
      dateini.setDate(dateini.getDate() - 3);
      let dateend = new Date(dateini);
      dateend.setDate(dateini.getDate() + 6);
      dateini = dateini.toISOString().substr(0, 10);
      dateend = dateend.toISOString().substr(0, 10);
      let result = {
        dateini,
        dateend
      };
      return result;
    },
    getWeeks() {
      let weeks = [];
      for (let i = 0; i < 55; i++) {
        weeks[i] = i + 1;
      }
      return weeks;
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
