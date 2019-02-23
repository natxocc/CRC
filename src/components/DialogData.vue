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
              <!-- ES FECHA -->
              <v-dialog full-width ref="dialog" width="290px">
                <v-text-field :label="fields[key].name" @input="onChange(data[key], key)" prepend-icon="event" readonly v-bind="fields[key].props" v-if="fields[key].type.includes('date')" v-model="data[key]"></v-text-field>
                <v-date-picker :locale="locale" no-title scrollable v-model="data[key]">
                  <v-spacer></v-spacer>
                  <v-btn @click="$refs.dialog.save();onChange(data[key], key)" color="primary" flat>OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </template>
        </v-layout>
      </v-card>
    </v-dialog>
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