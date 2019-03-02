<template>
  <div>
    <v-dialog fullscreen hide-overlay scrollable transition="dialog-bottom-transition" v-model="model">
      <v-card tile>
        <v-toolbar card color="primary" dark dense>
          <v-btn @click="onSave" dark flat>
            <v-icon>save</v-icon>
            {{lang.Guardar}}
          </v-btn>
          <!-- <v-toolbar-title>Settings</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-btn @click="$emit('cancel', true)" dark icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-layout row wrap>
            <template v-for="(value,key, index) in data">
              <v-flex :key="index" lg2 md4 pa-1 sm6 v-show="!fields[key].props.hidden" xs12>
                <!-- ES TEXTO -->
                <v-textarea rows="1" auto-grow :disabled="fields[key].props.disabled" :label="fields[key].name" :rules="fields[key].props.rules" @input="onChange(data[key], key)" v-if="fields[key].type =='text'" v-model="data[key]"></v-textarea>
                <!-- ES NUMERO -->
                <v-text-field :disabled="fields[key].props.disabled" :label="fields[key].name" :rules="fields[key].props.rules" @input="onChange(data[key], key)" type="number" v-if="fields[key].type =='number'" v-model="data[key]"></v-text-field>
                <!-- ES SELECT -->
                <v-select :disabled="fields[key].props.disabled" :items="fields[key].options" :label="fields[key].name" :rules="fields[key].props.rules" @input="onChange(data[key], key)" v-if="fields[key].type =='select'" v-model="data[key]"></v-select>
                <!-- ES AUTOCOMPLETE -->
                <v-autocomplete :disabled="fields[key].props.disabled" :items="fields[key].options" :label="fields[key].name" :rules="fields[key].props.rules" @input="onChange(data[key], key)" v-if="fields[key].type =='autocomplete'" v-model="data[key]"></v-autocomplete>
                <!-- ES COMBO -->
                <v-combobox :disabled="fields[key].props.disabled" :items="fields[key].options" :label="fields[key].name" :rules="fields[key].props.rules" @input="onChange(data[key], key)" v-if="fields[key].type =='combo'" v-model="data[key]"></v-combobox>
                <!-- ES BIT -->
                <v-switch :disabled="fields[key].props.disabled" :label="fields[key].name" v-if="fields[key].type =='bit'" v-model="data[key]"></v-switch>
                <!-- ES FECHA U HORA -->
                <v-text-field :disabled="fields[key].props.disabled" :label="fields[key].name" @click:append="getDate(data[key], key)" @input="onChange(data[key], key)" append-icon="event" v-if="fields[key].type.includes('date')" v-model="data[key]"></v-text-field>
              </v-flex>
            </template>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dateDialog" width="290px">
      <v-date-picker :locale="locale" @input="setDateTime(dateModel)" no-title scrollable v-model="dateModel" :first-day-of-week="1"></v-date-picker>
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
  data() {
    return {
      locale: localStorage.lang,
      dateModel: "",
      timeModel: "",
      dateDialog: false,
      key: null
    };
  },
  methods: {
    onSave: function() {
      this.$emit("onSave", true);
    },
    onCancel: function() {
      this.$emit("onCancel", true);
      this.model = false;
    },
    onChange: function(value, key) {
      if (this.data[key].value) this.data[key] = this.data[key].value;
      this.$emit("onChange", this.data[key], key);
    },
    getDate(value, key) {
      this.dateModel = this.data[key].substr(0, 10);
      this.timeModel = this.data[key].substr(10, 16);
      this.key = key;
      this.dateDialog = true;
    },
    setDateTime(value) {
      if (this.fields[this.key].type == "date") {
        this.data[this.key] = value;
      } else {
        let now = new Date();
        let date = new Date(value);
        date.setHours(now.getHours() + 1, now.getMinutes(), 0);
        this.data[this.key] = date
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");
      }
      this.dateDialog = false;
    }
  },
  computed: {}
};
</script>