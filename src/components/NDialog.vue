<template>
  <div>
    <q-dialog :maximized="true" transition-hide="slide-down" transition-show="slide-up" v-model="model">
      <q-card>
        <!-- TOOLBAR -->
        <q-toolbar class="bg-primary text-white">
          <q-btn @click="readonly=false" class="text-white" dense flat icon="add">{{$q.lang.Nuevo}}
          </q-btn>
          <q-btn :disable="!readonly" @click="readonly=false" class="text-white" dense flat icon="edit">{{$q.lang.Editar}}
          </q-btn>
          <q-btn :disable="readonly" @click="onSave" class="text-white" dense flat icon="save">{{$q.lang.Guardar}}
          </q-btn>
          <q-space/>
          <q-btn @click="readonly=true;$emit('cancel', true)" class="text-white" dense flat icon="close">
          </q-btn>
        </q-toolbar>

        <q-separator/>
        <!-- INICIO DE DATOS -->
        <q-card-section class="scroll" style="max-height: 90%">
          <div class="row">
            <div :key="key" class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(value,key, index) in data">
              <q-card-section>
                <!-- ES TEXTO -->
                <q-input :label="key" :readonly="readonly" dense stack-label type="text" v-if="columns[index].type =='textColumn'" v-model="data[key]"></q-input>
                <!-- ES NUMERO -->
                <q-input :label="key" :readonly="readonly" dense stack-label type="number" v-if="columns[index].type =='numberColumn'" v-model="data[key]"></q-input>
                <!-- ES BIT -->
                <q-toggle :disable="readonly" :label="key" dense v-if="columns[index].type =='bitColumn'" v-model="data[key]"/>
                <!-- ES FECHA -->
                <q-input :disable="readonly" :label="key" dense mask="date" v-if="columns[index].type =='dateColumn'" v-model="data[key]">
                  <q-icon class="cursor-pointer" name="event" slot="append">
                    <q-popup-proxy>
                      <q-date :style="style" minimal todayBtn v-model="data[key]"/>
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
export default {
  name: "NDialog",
  props: {
    model: null,
    columns: null,
    data: null,
    table: null
  },
  data() {
    return {
      readonly: null
    };
  },
  methods: {
    onSave: function() {
      this.$emit("onSave", true);
    },
    onCancel: function() {
      this.model = false;
      this.$emit("onCancel", true);
    }
  },
  beforeMount() {
    this.readonly = true;
  }
};
</script>

