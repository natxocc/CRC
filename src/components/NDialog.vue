<template>
  <div>
    <q-dialog :maximized="true" transition-hide="slide-down" transition-show="slide-up" v-model="model">
      <q-card>
        <!-- TOOLBAR -->
        <q-toolbar class="bg-primary text-white">
          <q-btn @click="onSave" class="text-white" dense flat icon="save">{{$q.lang.Guardar}}</q-btn>
          <q-space/>
          <q-btn @click="readonly=true;$emit('cancel', true)" class="text-white" dense flat icon="close"></q-btn>
        </q-toolbar>
        <q-separator/>
        <!-- INICIO DE DATOS -->
        <q-card-section class="scroll" style="max-height: 90%">
          <div class="row">
            <div :key="key" class="col-xs-12 col-sm-6 col-md-4 col-lg-3"  v-for="(value,key, index) in data.data">
              <q-card-section>
                <!-- ES TEXTO -->
                <q-input :label="data.info[key].name" dense stack-label type="text" v-bind="data.info[key].props" v-if="data.info[key].type =='text'" v-model="data.data[key]" @input="onChange"></q-input>
                <!-- ES SELECT -->
                <q-select :label="data.info[key].name" :options="data.info[key].options" :options-dense="true" dense stack-label type="text" v-bind="data.info[key].props" v-if="data.info[key].type =='select'" v-model="data[key]" @input="onChange"/>
                <!-- ES NUMERO -->
                <q-input :label="data.info[key].name" dense stack-label type="number" v-bind="data.info[key].props" v-if="data.info[key].type =='number'" v-model="data.data[key]" @input="onChange"></q-input>
                <!-- ES BIT -->
                <q-toggle :label="data.info[key].name" dense v-bind="data.info[key].props" v-if="data.info[key].type =='bit'" v-model="data.data[key]"/>
                <!-- ES FECHA -->
                <q-input :label="data.info[key].name" dense mask="date" v-bind="data.info[key].props" v-if="data.info[key].type =='date'" v-model="data.data[key]" @input="onChange">
                  <q-icon class="cursor-pointer" name="event" slot="append">
                    <q-popup-proxy>
                      <q-date minimal todayBtn v-model="data.data[key]" @input="onChange"/>
                    </q-popup-proxy>
                  </q-icon>
                </q-input>
              </q-card-section>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Custom from "../mixins";
export default {
  mixins: [Custom],
  name: "NDialog",
  props: {
    model: null,
    data: null
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    onSave: function() {
      this.$emit("onSave", true);
    },
    onCancel: function() {
      this.model = false;
      this.$emit("onCancel", true);
    },
    onChange: function(event) {
      this.$emit("onChange",event)
    }
    // filterFn(val, update) {

    //   update(() =>{});
      // console.log(this.props["Gestion"].options)})
      // let stringOptions = this.props[this.keySelected].options
      // if (val === "") {
      //   update(() => {});
      //   return;
      // }
      // update(() => {
      //   const needle = val.toLowerCase();
      //   this.props[this.keySelected].options = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1);
      // });
    // }
  },
  beforeMount() {}
};
</script>

