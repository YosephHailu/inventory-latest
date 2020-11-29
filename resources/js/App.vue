<template>
  <v-app class>
    <v-row class="px-2">
      <Navigation v-if="$store.state.mainStore.auth.logged_in" />
      <v-content class="grey lighten-4">
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="cyan"
          @click="$vuetify.goTo(0, 0)"
          class="no-print"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
        <AppBar />
        <v-progress-linear
          v-if="getLoading"
          height="10"
          color="red"
          class="blue"
          indeterminate
        ></v-progress-linear>

        <v-toolbar
          dense
          flat
          class="blue--text no-print"
          v-if="$store.state.mainStore.auth.logged_in"
        >
          <v-btn
            text
            small
            size="1"
            @click="$router.go(-1)"
            class="body btn-nav blue--text"
          >
            <v-icon small>keyboard_backspace</v-icon>
          </v-btn>
          <v-btn text small to="/" size="1" class="body btn-nav blue--text">
            <v-icon small class="mr-1">home</v-icon>home
          </v-btn>
          <v-breadcrumbs
            class="pt-4 pl-3"
            :items="breadcrumbList"
            divider="/"
          ></v-breadcrumbs>
        </v-toolbar>

        <div class="pa-4">
          <Message />
          <router-view></router-view>
        </div>
      </v-content>
    </v-row>
  </v-app>
</template>
<script>
import Message from "./components/global/Message";
import AppBar from "./components/layouts/AppBar";
import Navigation from "./components/layouts/Navigation";
import { mapGetters } from "vuex";

export default {
  components: {
    Navigation,
    Message,
    AppBar,
  },
  data() {
    return {
      breadcrumbList: [],
    };
  },
  computed: mapGetters(["getLoading"]),
  methods: {
    fetchConfig() {
      axios
        .get("/api/setting")
        .then((response) => {
          this.$store.commit("updateConfig", { config: response.data });
        })
        .catch((error) => {});
    },
  },
  watch: {
    $route() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    },
  },
  created() {
    this.fetchConfig();
  },
};
</script>

<style>
@media print {
  td {
    height: 0px !important;
  }
  .no-print,
  .no-print * {
    display: none !important;
  }
  .v-content {
    padding: 0px !important;
  }
  .v-data-footer {
    display: none !important;
  }
  td {
    height: 36px !important;
  }
}
</style>