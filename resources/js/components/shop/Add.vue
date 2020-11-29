<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="px-5 pb-5">
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text">SHOP REGISTRATION FORM</v-card-title>
          <v-divider></v-divider>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit="handelSubmit">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="shop.shop_id"
                :rules="[v => !!v || 'Shop id is required']"
                label="Shop id"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="shop.name"
                :rules="[v => !!v || 'Name is required']"
                label="Shop name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field messages="optional" v-model="shop.location" label="Location"></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-file-input
          prepend-icon="image"
          v-model="shop.picture"
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
    shop: {},
    btn_loading: false
  }),
  methods: {
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.shop).forEach(key =>
        formData.append(key, this.shop[key])
      );

      axios
        .post("/api/shop", formData)
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

      Object.keys(this.shop).forEach(key =>
        formData.append(key, this.shop[key])
      );

      formData.append("_method", "put");

      axios
        .post("/api/shop/" + this.$route.params.id, formData)
        .then(response => {
          this.$router.go(-1);
          this.btn_loading = false;
        })
        .catch(error => {
          this.btn_loading = false;
        });
    },

    fetchShop() {
      axios
        .get("/api/shop/" + this.$route.params.id)
        .then(response => {
          this.shop = response.data.shop;
        })
        .catch(error => {});
    }
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchShop();
    } else {
      this.edit = false;
    }
  }
};
</script>