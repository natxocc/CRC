<template>
  <v-snackbar v-model="model" :color="color" :timeout="1500">
    {{text}}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    model: false,
    color: null,
    text: ""
  },
  data() {
    return {
    };
  }
};
</script>