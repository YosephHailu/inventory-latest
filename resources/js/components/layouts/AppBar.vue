<template>
  <div class="no-print">
    <v-app-bar dark dense class="blue-grey">
      <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>

      <v-toolbar-title>INVENTORY MANAGEMENT-SYSTEM</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="getAuth.logged_in" class="text" text>
        <v-img src="logo.png" width="35px" class="mr-3" />
        {{ getAuth.user.first_name || "" + " " + getAuth.user.last_name }}</v-btn
      >
      <v-btn v-if="getAuth.logged_in" text @click="logout">LOGOUT</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getActivePanel", "getAuth"]),
  },
  methods: {
    ...mapActions(["updateActivePanel"]),
    toggleSidebar() {
      this.updateActivePanel(!this.getActivePanel);
    },
    logout() {
      this.$store.commit("logout", { logged_in: false });
      this.$router.push("/login");
    },
  },
  created() {
    console.log(this.getAuth);
  },
};
</script>