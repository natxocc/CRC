<template>
  <div>
    <q-img
      :src="require('../assets/office.jpg')"
      alt="Image"
      :ratio="16/9"
      spinner-color="white"
      contain
    />
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      openDialog: false,
      user: {
        name: '',
        pass: ''
      }
    };
  },
  methods: {
    
  }
};
</script>
