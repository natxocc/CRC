import axios from 'axios'
import Quasar from "quasar";
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
      columnsDefs: [],
      columnsDefsSub: [],
      rowData: null
    }
  },
  methods: {
    // CALL AXIOS
    callData(post) {
      showLoading();
      post.sid = localStorage.sid
      post.lang = this.$q.lang.db
      return axios.post(localStorage.url, post).then((response) => {
        hideLoading();
        return response
      });
    },
    // DEFINE COLUMNS Y DATA
    defineTable(data) {
      this.columnDefs = data.data.columns;
      this.columnDefsSub = data.data.columnsSub;
      this.rowData = data.data.data;
    },
    // GET DAYS WEEK
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
    // GET YEARS MONTHS WEEKS
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
    // GET LANG
    getLang(lang) {
      import(`./lang/${lang}`).then((lang) => {
        this.$q.lang.set(lang.default);
      });
      localStorage.lang = this.lang;
    }
  },
  watch: {
    lang(lang) {
      this.getLang(lang);
    }
  },
  beforeMount() {
    if (!localStorage.lang) {
      this.getLang("es");
    }
  }
}