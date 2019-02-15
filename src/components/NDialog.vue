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
            <div :key="key" class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-bind="props[key]" v-for="(value,key, index) in data">
              <q-card-section>
                <!-- ES TEXTO -->
                <q-input :label="fields.name[index]" dense stack-label type="text" v-bind="props[key]" v-if="fields.type[index] =='textColumn'" v-model="data[key]"></q-input>
                <!-- ES SELECT -->
                <q-select :label="fields.name[index]" :options="props[key].options" :options-dense="true" dense hide-selected stack-label type="text" use-input v-bind="props[key]" v-if="fields.type[index] =='selectColumn'" v-model="data[key]"/>
                <!-- ES NUMERO -->
                <q-input :label="fields.name[index]" dense stack-label type="number" v-bind="props[key]" v-if="fields.type[index] =='numberColumn'" v-model="data[key]"></q-input>
                <!-- ES BIT -->
                <q-toggle :label="fields.name[index]" dense v-bind="props[key]" v-if="fields.type[index] =='bitColumn'" v-model="data[key]"/>
                <!-- ES FECHA -->
                <q-input :label="fields.name[index]" dense mask="date" v-bind="props[key]" v-if="fields.type[index] =='dateColumn'" v-model="data[key]">
                  <q-icon class="cursor-pointer" name="event" slot="append">
                    <q-popup-proxy>
                      <q-date @input="getDateTime(data[key])" minimal todayBtn v-model="data[key]"/>
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
    data: null,
    fields: null,
    props: null
  },
  data() {
    return {};
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
    view(data) {
      console.log(data);
    },
    getListOptions(list) {
      console.log(list);
      return list;
      // let value = val.toLowerCase();
      // return list.filter(val => val.toLowerCase().indexOf(value) > -1)
    },
    filterFn(val, list) {;
      // update(() => {

      // });
      // return;
      // if (data === '') {

      // }
      // update(() => {
      //   const needle = val.toLowerCase()
      //   this.select = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      // })
    }
  },
  beforeMount() {},
  watch: {
    props: {
      handler(val) {},
      deep: true
    }
  }
};
</script>

