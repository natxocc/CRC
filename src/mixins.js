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
    /**
     *
     *
     * @param {*} data
     * @returns Columns and Data from table
     */
    getColumnsData(data) {
      if (data.data.success) {
        let ret = {}
        ret.columnDefs = data.data.columns;
        ret.rowData = data.data.data;
        if (data.data.columnsSub) ret.columnDefsSub = data.data.columnsSub
        return ret;
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
    setDialogData(columns, data) {
      console.log(columns)
      let result = []
      result.data = {}
      result.info = {}
      let fields = columns.map((x) => x.field)
      for (let i = 0; i < fields.length; i++) {
        result.info[fields[i]] = {}
        result.info[fields[i]].props = {}
        result.info[fields[i]].name = columns[i].headerName
        result.info[fields[i]].type = columns[i].type
        result.info[fields[i]].props.disable = false
        result.info[fields[i]].props.hidden = false
        result.info[fields[i]].options = []
        // Values
        if (!data) {
          if (columns[i].type == "text") result.data[fields[i]] = ""
          if (columns[i].type == "number") result.data[fields[i]] = 0
          if (columns[i].type == "date") result.data[fields[i]] = new Date().toISOString().substr(0, 10)
          if (columns[i].type == "general") result.data[fields[i]] = ""
          if (columns[i].type == "bit") result.data[fields[i]] = 0
        } else {
          result.data[fields[i]] = data[fields[i]]
        }
      }

      console.log(result)
    },
    filterDialogOptions(val, update) {
      update(() => { })
    },
    setDialogOptions() {

    },
    getDialogOptions() {

    },
    /**
     *
     *
     * @param {*} year
     * @param {*} week
     * @returns {dateini, dateend} of week
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
     * @param {*} data
     * @returns datetime
     */
    getDateTime(data) {
      // let now = new Date()
      // now.setHours(now.getHours())
      // now.setMinutes(now.getMinutes())
      // now.setSeconds(now.getSeconds())
      // return date
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
    noAuth(data) {
      if (!data.data.success) self.$q.notify({
        message: self.$q.lang.SinAutorizacion,
        icon: "close",
        color: "negative"
      });
    }
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