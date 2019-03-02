<template>
  <v-snackbar :color="color" :timeout="1500" v-model="model">{{text}}</v-snackbar>
</template>

<script>
export default {
  props: {
    model: false,
    color: null,
    text: ""
  },
  data() {
    return {};
  }
};
</script>