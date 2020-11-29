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
            <v-col cols="12" md="4">
              <v-text-field
                v-model="store.store_id"
                :rules="[v => !!v || 'Store id is required']"
                label="Store id"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="store.name"
                :rules="[v => !!v || 'Name is required']"
                label="Store name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field messages="optional" v-model="store.location" label="Location"></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-file-input
          prepend-icon="image"
          v-model="store.picture"
          class="mx-0"
          messages="optional"
          label="Photo"
        ></v-file-input>

        <div class="text-center mt-3">
          <v-btn
            v-if="edit"
            dark
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click="handelUpdate"
          >Save</v-btn>

          <v-btn
            dark
            v-else
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click="handelSubmit"
          >Save</v-btn>
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
    store: {},
    btn_loading: false
  }),
  methods: {
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.store).forEach(key =>
        formData.append(key, this.store[key])
      );

      axios
        .post("/api/store", formData)
        .then(response => {
          this.$router.go(-1);
          this.btn_loading = false;
        })
        .catch(error => {
          this.btn_loading = false;
        });
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.store).forEach(key =>
        formData.append(key, this.store[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/store/" + this.$route.params.id, formData)
        .then(response => {
          this.$router.go(-1);
          this.btn_loading = false;
        })
        .catch(error => {
          this.btn_loading = false;
        });
    },

    fetchStore() {
      axios
        .get("/api/store/" + this.$route.params.id)
        .then(response => {
          this.store = response.data.store;
        })
        .catch(error => {});
    }
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchStore();
    } else {
      this.edit = false;
    }
  }
};
</script>