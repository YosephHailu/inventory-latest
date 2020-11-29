<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="px-5 pb-5">
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text">STORE REGISTRATION FORM</v-card-title>
          <v-divider></v-divider>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit="handelSubmit">
          <v-row>
            <v-col cols="12" md="4" class="py-0">
              <v-text-field
                v-model="user.user_id"
                :rules="[v => !!v || 'User id is required']"
                label="User id"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="py-0">
              <v-text-field
                v-model="user.first_name"
                :rules="[v => !!v || 'First name is required']"
                label="First name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="py-0">
              <v-text-field
                v-model="user.last_name"
                :rules="[v => !!v || 'Last name is required']"
                label="Last name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="user.email"
                :rules="[v => !!v || 'Email is required']"
                label="Email"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                v-model="user.username"
                :rules="[v => !!v || 'Username is required']"
                label="Username"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                v-model="user.password"
                :rules="[v => !!v || 'Password is required']"
                label="Password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-select
                v-model="user.role"
                :items="['Administrator', 'Raw material manager', 'Finished good manager' ]"
                :rules="[v => !!v || 'Password is required']"
                label="Select role"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-form>

        <div class="text-center mt-3">
          <v-btn
            v-if="edit"
            dark
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click="handelUpdate"
          >UPDATE</v-btn>

          <v-btn
            dark
            v-else
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click="handelSubmit"
          >REGISTER</v-btn>
        </div>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    edit: false,
    valid: false,
    user: {},
    btn_loading: false
  }),
  methods: {
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.user).forEach(key =>
        formData.append(key, this.user[key])
      );

      axios
        .post("/api/user", formData)
        .then(response => {
          console.log(response.data)
          this.$router.go(-1);
          this.btn_loading = false;
        })
        .catch(error => {
          console.log(error.response.data)
          this.btn_loading = false;
        });
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.user).forEach(key =>
        formData.append(key, this.user[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/user/" + this.$route.params.id, formData)
        .then(response => {
          this.$router.go(-1);
          this.btn_loading = false;
        })
        .catch(error => {
          console.log(error.response.data)
          this.btn_loading = false;
        });
    },

    fetchUser() {
      axios
        .get("/api/user/" + this.$route.params.id)
        .then(response => {
          this.user = response.data.user;
        })
        .catch(error => {});
    }
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchUser();
    } else {
      this.edit = false;
    }
  }
};
</script>