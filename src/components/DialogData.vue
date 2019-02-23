<template>
  <div>
    <v-dialog fullscreen hide-overlay scrollable transition="dialog-bottom-transition" v-model="model">
      <v-card tile>
        <v-toolbar card color="primary" dark>
          <v-btn @click="$emit('cancel', true)" dark icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="onSave" color="success" dark small>
            <v-icon>save</v-icon>
            {{lang.Guardar}}
          </v-btn>
        </v-toolbar>
        <v-layout row wrap>
          <template v-for="(value,key, index) in data">
            <v-flex :key="index" class="px-1" lg1 md3 sm4 v-bind="fields[key].props" xs12>
              <!-- ES TEXTO -->
              <v-text-field :label="fields[key].name" @input="onChange(data[key], key)" type="text" v-bind="fields[key].props" v-if="fields[key].type =='text'" v-model="data[key]"></v-text-field>
              <!-- ES NUMERO -->
              <v-text-field :label="fields[key].name" @input="onChange(data[key], key)" type="number" v-bind="fields[key].props" v-if="fields[key].type =='number'" v-model="data[key]"></v-text-field>
              <!-- ES SELECT -->
              <v-select :items="fields[key].options" :label="fields[key].name" v-bind="fields[key].props" v-if="fields[key].type =='select'" v-model="data[key]"></v-select>
              <!-- ES AUTOCOMPLETE -->
              <v-autocomplete :items="fields[key].options" :label="fields[key].name" v-bind="fields[key].props" v-if="fields[key].type =='autocomplete'" v-model="data[key]"></v-autocomplete>
              <!-- ES BIT -->
              <v-switch :label="fields[key].name" v-bind="fields[key].props" v-if="fields[key].type =='bit'" v-model="data[key]"></v-switch>
            </v-flex>
          </template>
        </v-layout>
      </v-card>
    </v-dialog>
    <!-- <q-dialog :maximized="true" transition-hide="slide-down" transition-show="slide-up" v-model="model">
    <q-card>-->
    <!-- TOOLBAR -->
    <!-- <q-toolbar class="bg-primary text-white">
          <q-btn @click="onSave" class="text-white" dense flat icon="save">{{$q.lang.Guardar}}</q-btn>
          <q-space/>
          <q-btn @click="readonly=true;$emit('cancel', true)" class="text-white" dense flat icon="close"></q-btn>
        </q-toolbar>
    <q-separator/>-->
    <!-- INICIO DE DATOS -->
    <!-- <q-card-section>
          <div class="row">
            <div :key="key" class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-bind="fields[key].props" v-for="(value,key, index) in data">
    <q-card-section>-->
    <!-- ES TEXTO -->
    <!-- <q-input :label="fields[key].name" @input="onChange(data[key], key)" dense stack-label type="text" v-bind="fields[key].props" v-if="fields[key].type =='text'" v-model="data[key]"></q-input> -->
    <!-- ES SELECT -->
    <!-- <q-select :label="fields[key].name" :options="options[key].options" :options-dense="true" @filter="filterFn" @input="onChange(data[key], key)" dense stack-label type="text" v-bind="fields[key].props" v-if="fields[key].type =='select' && options" v-model="data[key]"/> -->
    <!-- ES AUTOCOMPLETE -->
    <!-- <q-select :label="fields[key].name" :options="options[key].options" :options-dense="true" @filter="filterFn" @input="onChange(data[key], key)" @keyup.native="selected=key" @new-value="createValue" dense hide-selected input-debounce="0" stack-label type="text" use-input v-bind="fields[key].props" v-if="fields[key].type =='autocomplete' && options" v-model="data[key]"/> -->
    <!-- ES NUMERO -->
    <!-- <q-input :label="fields[key].name" @input="onChange(data[key], key)" dense stack-label type="number" v-bind="fields[key].props" v-if="fields[key].type =='number'" v-model="data[key]"></q-input> -->
    <!-- ES BIT -->
    <!-- <q-toggle :label="fields[key].name" dense v-bind="fields[key].props" v-if="fields[key].type =='bit'" v-model="data[key]"/> -->
    <!-- ES FECHA -->
    <!-- <q-input :label="fields[key].name" @input="onChange(data[key], key)" dense mask="date" v-bind="fields[key].props" v-if="fields[key].type.includes('date')" v-model="data[key]">
                  <q-icon class="cursor-pointer" name="event" slot="append">
                    <q-popup-proxy>
                      <q-date @input="onChange(data[key], key)" minimal todayBtn v-model="data[key]"/>
                    </q-popup-proxy>
                  </q-icon>
                </q-input>
              </q-card-section>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>-->
  </div>
</template>

<script>
export default {
  name: "DialogData",
  props: {
    model: null,
    data: null,
    fields: null,
    lang: null
  },
  methods: {
    onSave: function() {
      console.log(this.data);
      this.$emit("onSave", true);
    },
    onCancel: function() {
      this.$emit("onCancel", true);
      this.model = false;
    },
    onChange: function(value, key) {
      if (this.data[key].value) this.data[key] = this.data[key].value;
      this.$emit("onChange", this.data[key], key);
    }
  }
};
</script>