<template>
  <section>
    <v-card>
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">CONFIGURATION</v-card-title>
        <v-divider></v-divider>

        <v-btn @click="dialog=true" absolute dark fab right color="cyan">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-card class="pa-3">
      <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
        <v-row>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="config.grn_start"
              label="GRN start*"
              :rules="[v => !!v || 'GRN start id is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="config.grn_end"
              label="GRN end*"
              :rules="[v => !!v || 'GRN end is required']"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="config.issue_start"
              label="Issue number start*"
              :rules="[v => !!v || 'Issue number start id is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="config.issue_end"
              label="Issue number end*"
              :rules="[v => !!v || 'Issue number end is required']"
              required
            ></v-text-field>
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

    <v-card class="text-center my-3 py-3">
      <v-btn
        dark
        color="cyan accent-6"
        :loading="btn_loading"
        rounded
        @click.prevent="closeup"
      >CLOSE UP</v-btn>
    </v-card>

    <v-card class="text-center my-3 py-3">
      <v-btn
        dark
        color="primary accent-6"
        :loading="btn_loading"
        rounded
        @click.prevent="revalidate"
      >VALIDATE DATABASE BALANCE</v-btn>
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
      config: {},
      configs: []
    };
  },
  methods: {
    fetchConfig() {
      axios
        .get("/api/config")
        .then(response => {
          if (response.data.config) {
            this.config = response.data.config;
            this.edit = true;
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.config).forEach(key =>
          formData.append(key, this.config[key])
        );

        axios
          .post("/api/config", formData)
          .then(response => {
            this.fetchConfig();
            (this.dialog = false), (this.btn_loading = false);
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.config).forEach(key =>
        formData.append(key, this.config[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/config/" + this.config.id, formData)
        .then(response => {
          (this.dialog = false), (this.btn_loading = false);
        })
        .catch(error => {
          (this.dialog = false), (this.btn_loading = false);
        });
    },
    closeup() {
      this.btn_loading = true;
      axios
        .get("/api/closeup/")
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data);
        })
        .finally(() => {
          this.btn_loading = false;
        });
    },
    revalidate() {
      this.btn_loading = true;
      axios
        .get("/api/revalidate/")
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data);
        })
        .finally(() => {
          this.btn_loading = false;
        });
    }
  },
  created() {
    this.fetchConfig();
  }
};
</script>