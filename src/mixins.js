import axios from 'axios'
import { Loading } from "quasar";
function showLoading(options) {
  Loading.show(options);
}
function hideLoading(options) {
  Loading.hide(options);
}
export default {
  data() {
    return {
      lang: this.$q.lang.isoName,
      columnDefs: null,
      columnDefsSub: null,
      rowData: null,
      dialogModel: false,
      dialogMode: null,
      dialogTable: null,
      dialogData: {},
      dialogFields: {},
      quickFilter: null,
      idKey: null
    }
  },
  methods: {
    /**
     *
     *
     * @param {*} post
     * @returns Data from axios
     */
    callData(post) {
      showLoading();
      post.sid = localStorage.sid
      post.lang = this.$q.lang.db
      return axios.post(localStorage.url, post).then((response) => {
        hideLoading();
        return response
      });
    },
    saveData(post) {
      // console.log(post)
      let self = this;
      this.callData(post).then(function (response) {
        if (response.data.success == true) {
          self.$q.notify({
            message: self.$q.lang.DatosGuardados,
            timeout: 1000,
            color: "positive"
          });
        } else {
          self.$q.notify({
            message: self.$q.lang.ErrorOperacion,
            timeout: 1000,
            color: "negative"
          });
        }
      })
    },
    /**
     *
     *
     * @param {*} columns
     */
    setId(columns) {
      let idkey = columns.find(function (x) { return x.groupId === true })
      this.idKey = idkey.field
    },
    /**
     *
     *
     * @param {*} data
     * @returns
     */
    defineTable(data) {
      if (data.data.success) {
        this.columnDefs = data.data.columns;
        this.rowData = data.data.data;
        this.setId(this.columnDefs)
        if (data.data.columnsSub) this.columnDefsSub = data.data.columnsSub
        return true
      }
      else {
        this.$q.notify({
          message: this.$q.lang.SinAutorizacion,
          icon: "close",
          color: "negative"
        })
        return false;
      }
    },
    /**
     *
     *
     * @param {*} columns
     * @param {*} table
     * @param {*} data
     * @returns (true)
     */
    defineDialog(columns, table, data) {
      this.dialogTable = table
      let result = {}
      result.data = {}
      result.fields = {}
      let fields = columns.map((x) => x.field)
      for (let i = 0; i < fields.length; i++) {
        // Props
        result.fields[fields[i]] = {}
        result.fields[fields[i]].name = columns[i].headerName
        result.fields[fields[i]].type = columns[i].type
        result.fields[fields[i]].options = []
        if (columns[i].headerClass != "") {
          result.fields[fields[i]].props = {}
          result.fields[fields[i]].props.disable = columns[i].headerClass.disable ? columns[i].headerClass.disable : false
          result.fields[fields[i]].props.hidden = columns[i].headerClass.hidden ? columns[i].headerClass.hidden : false
          result.fields[fields[i]].props.autofocus = columns[i].headerClass.autofocus ? columns[i].headerClass.autofocus : false
          result.fields[fields[i]].props.autogrow = columns[i].headerClass.autogrow ? columns[i].headerClass.autogrow : false
          if (columns[i].headerClass.select) {
            result.fields[fields[i]].options = [...new Set(this.rowData.map((x) => x[fields[i]]))]
            result.fields[fields[i]].type = columns[i].headerClass.autocomplete ? "autocomplete" : "select"
          }
        }

        // Values
        this.dialogMode = "insertRecord"
        if (!data) {
          result.data[fields[i]] = null
          if (columns[i].type == "date") result.data[fields[i]] = new Date().toISOString().substr(0, 10)
          if (columns[i].type == "bit") result.data[fields[i]] = 0
        } else {
          this.dialogMode = "updateRecord"
          result.data[fields[i]] = data[fields[i]]
        }

      }
      console.log(result)
      this.dialogData = result.data;
      this.dialogFields = result.fields;
      return true
    },
    /**
     *
     *
     * @param {*} year
     * @param {*} week
     * @returns (dateini, dateend) of week
     */
    getDaysWeek(year, week) {
      var dateini = new Date(year, 0, 1),
        offset = dateini.getTimezoneOffset();
      dateini.setDate(dateini.getDate() + 4 - (dateini.getDay() || 7));
      dateini.setTime(dateini.getTime() + 7 * 24 * 60 * 60 * 1000 * (week + (year == dateini.getFullYear() ? -1 : 0)));
      dateini.setTime(dateini.getTime() + (dateini.getTimezoneOffset() - offset) * 60 * 1000);
      dateini.setDate(dateini.getDate() - 3);
      let dateend = new Date(dateini);
      dateend.setDate(dateini.getDate() + 6);
      dateini = dateini.toISOString().substr(0, 10);
      dateend = dateend.toISOString().substr(0, 10);
      let result = { dateini, dateend }
      return result;
    },
    /**
     *
     *
     * @returns [years]
     */
    getYears() {
      let year = new Date().getFullYear();
      let years = [];
      for (let i = 0; i < 20; i++) {
        years[i] = year - i;
      }
      return years
    },
    getMonths() {
      let months = []
      for (let i = 0; i < 12; i++) {
        months[i + 1] = ("0" + (i + 1)).slice(-2);
      }
      months[0] = "";
      return months
    },
    getWeeks() {
      let weeks = []
      for (let i = 0; i < 55; i++) {
        weeks[i] = i + 1;
      }
      return weeks
    },
    /**
     *
     *
     * @param {*} lang
     */
    getLang(lang) {
      import(`./lang/${lang}`).then((lang) => {
        this.$q.lang.set(lang.default);
      });
      localStorage.lang = this.lang;
    },
  },
  watch: {
    lang(lang) {
      this.getLang(lang);
    }
  },
  beforeMount() {
    if (!localStorage.lang) {
      localStorage.lang = "es"
    }
    this.lang = localStorage.lang;
  }
}