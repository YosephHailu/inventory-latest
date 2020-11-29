
<template>
  <div class="text-center">
    <v-snackbar v-model="alert.visible" :color="alert.type" right top>
      {{ alert.message }}

      <v-btn text @click="closeAlert()"> Close </v-btn>
      <template v-slot:action> close </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    alert: {
      get() {
        return this.$store.state.mainStore.alert;
      },
      set(value) {
        this.$store.commit("toggleAlert", value);
      },
    },
  },
  methods: {
    closeAlert() {
      this.$store.dispatch("updateAlert", {
        message: "Mesage is ",
        type: "success",
      });
    },
  },
};
</script>