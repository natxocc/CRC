export default {
 
  install(Vue, options) {

    Vue.prototype.$notify = {
      data() {
        return {
          test: true
        }
      },
      success() {
        console.log(this.test)
        return this.test

      },
    };
  }
}