<template>
  <section>
    <v-card>
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">COMPANY INFORMATION</v-card-title>
        <v-divider></v-divider>
      </v-toolbar>
    </v-card>

    <v-card class="pa-3">
      <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
        <v-row>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="company.name"
              label="Name*"
              :rules="[v => !!v || 'Name field is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="company.phone"
              label="Phone"
              :rules="[v => !!v || 'Phone is required']"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="py-0">
            <v-text-field v-model="company.address" label="Address" required></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="py-0">
            <v-text-field v-model="company.email" label="Email" required></v-text-field>
          </v-col>

          <v-col cols="2" v-if="edit" class="text-center">
            <v-avatar>
              <v-img :src="'/storage/company/' + company.logo" />
            </v-avatar>
          </v-col>
          <v-col cols="10" class="py-0">
            <v-file-input
              prepend-icon="image"
              v-model="company.picture"
              class="mx-0"
              messages="optional"
              label="Logo"
            ></v-file-input>
          </v-col>
        </v-row>
        <div class="text-center mt-3">
          <v-btn
            v-if="edit"
            type="submit"
            dark
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click.prevent="handelUpdate(true)"
          >Update</v-btn>

          <v-btn
            v-else
            type="submit"
            dark
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click.prevent="handelSubmit(false)"
          >Save</v-btn>
        </div>
      </v-form>
    </v-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      valid: false,
      delete_dialog: false,
      btn_loading: false,
      dialog: false,
      company: {},
      companys: []
    };
  },
  methods: {
    fetchCompany() {
      axios
        .get("/api/company")
        .then(response => {
          if (response.data.company) {
            this.company = response.data.company;
            this.edit = true;
          }
        })
        .catch(error => {});
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.company).forEach(key =>
          formData.append(key, this.company[key])
        );

        axios
          .post("/api/company", formData)
          .then(response => {
            this.fetchCompany();
            this.btn_loading = false;
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.company).forEach(key =>
        formData.append(key, this.company[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/company/" + this.company.id, formData)
        .then(response => {
          this.btn_loading = false;
          this.fetchCompany();
        })
        .catch(error => {
          this.btn_loading = false;
        });
    }
  },
  created() {
    this.fetchCompany();
  }
};
</script>