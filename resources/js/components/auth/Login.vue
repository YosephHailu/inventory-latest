<template>
  <v-container class="col-md-8" align-content-center justify-center>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text"
          >LOGIN USING YOUR CREDENTIALS</v-card-title
        >
        <v-divider></v-divider>
      </v-toolbar>
      <v-form ref="form" v-model="valid" @submit="handelLogin">
        <v-row>
          <v-alert text type="error" :value="error" class="col-11 ml-3 mt-3"
            >INVALID USERNAME OR PASSWORD</v-alert
          >
          <v-col cols="12">
            <v-text-field
              v-model="user.username"
              :rules="[(v) => !!v || 'Username is required']"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="user.password"
              :append-icon="show_password ? 'visibility' : 'visibility_off'"
              :rules="[(v) => !!v || 'Password is required']"
              :type="show_password ? 'text' : 'password'"
              @click:append="show_password = !show_password"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center mt-3">
          <v-btn
            dark
            color="cyan accent-6"
            type="submit"
            :loading="btn_loading"
            rounded
            @click.prevent="handelLogin"
            >Login</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show_password: false,
    edit: false,
    valid: false,
    user: {},
    btn_loading: false,
    error: null,
  }),
  methods: {
    handelLogin() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.user).forEach((key) =>
        formData.append(key, this.user[key])
      );

      axios
        .post("/api/login", formData)
        .then((response) => {
          this.error = null;
          this.btn_loading = false;
          let user = response.data.user;
          if (user.role == "administrator") {
            this.$store.commit("updateUser", { logged_in: true, user });
            this.$router.push("/");
          }

          if (user.role === "raw material manager") {
            this.$store.commit("updateUser", { logged_in: true, user });
            this.$router.push("/");
          }

          if (user.role == "finished good manager") {
            this.$store.commit("updateUser", { logged_in: true, user });
            this.$router.push("/");
          }

          this.$store.dispatch("updateAlert", {
            message: "Successfully logged in ",
            type: "success",
            visible: true,
          });
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.btn_loading = false;
        });
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.user).forEach((key) =>
        formData.append(key, this.user[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/user/" + this.$route.params.id, formData)
        .then((response) => {
          this.$router.go(-1);
          this.btn_loading = false;
        })
        .catch((error) => {
          this.btn_loading = false;
        });
    },

    fetchStore() {
      axios
        .get("/api/user/" + this.$route.params.id)
        .then((response) => {
          this.user = response.data.user;
        })
        .catch((error) => {});
    },
  },
  created() {
    this.$store.state.mainStore.auth.logged_in = false;
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchStore();
    } else {
      this.edit = false;
    }
  },
};
</script>