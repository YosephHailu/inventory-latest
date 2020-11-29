<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="px-5 pb-5">
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text"
            >FINISHED GOOD REGISTRATION FORM</v-card-title
          >
          <v-divider></v-divider>
          <v-btn
            text
            outlined
            class="white--text no-print"
            @click="$router.go(-1)"
            >close</v-btn
          >
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit="handelSubmit(false)">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="finished_good.finished_good_id"
                :rules="[(v) => !!v || 'Finished good id is required']"
                label="Finished good id"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-autocomplete
                v-model="finished_good.finished_good_model_id"
                :items="finished_good_models"
                item-text="model"
                item-value="id"
                :rules="[(v) => !!v || 'Model field is required']"
                label="Item model"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="finished_good.name"
                :rules="[(v) => !!v || 'Name is required']"
                label="Name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                v-model="finished_good.unit_id"
                :items="units"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Unit field is required']"
                label="Measurement unit"
              ></v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                messages="optional"
                v-model="finished_good.location"
                label="Location"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                messages="optional"
                v-model="finished_good.size"
                label="Size"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="finished_good.minimum_balance"
                :rules="[(v) => !!v || 'Minimum balance is required']"
                label="Minimum balance"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-file-input
                prepend-icon="image"
                v-model="finished_good.picture"
                class="mx-0"
                messages="optional"
                label="Photo"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-form>

        <div class="text-center mt-3">
          <v-btn
            v-if="edit"
            dark
            type="submit"
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click.prevent="handelUpdate(true)"
            >Update</v-btn
          >

          <div v-else>
            <v-btn
              dark
              color="cyan accent-6"
              :loading="btn_loading"
              rounded
              @click="handelSubmit(false)"
              >Add</v-btn
            >

            <v-btn
              dark
              class="float-right"
              color="cyan darken-3"
              :loading="btn_loading"
              rounded
              @click="handelSubmit(true)"
              >Save & Close</v-btn
            >
          </div>
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
    finished_good: {
      unit: {},
    },
    btn_loading: false,
    finished_good_models: [],
    units: [],
  }),
  methods: {
    clearForm() {
      this.finished_good = {
        unit: {},
      };
    },
    handelSubmit(close) {
      if (this.$refs.form.validate()) {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.finished_good).forEach((key) =>
        formData.append(key, this.finished_good[key])
      );

        axios
          .post("/api/finished_good", formData)
          .then((response) => {
            console.log(response.data);
            if (close) this.$router.go(-1);
            this.btn_loading = false;
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch((error) => {
            console.log(error.response.data);
            this.btn_loading = false;
          });
      }
    },

    handelUpdate() {
      if (this.$refs.form.validate()) {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.finished_good).forEach((key) =>
        formData.append(key, this.finished_good[key])
      );

      formData.append("unit", JSON.stringify(this.finished_good.unit));
      formData.append(
        "item_category",
        JSON.stringify(this.finished_good.item_category)
      );
      formData.append("_method", "put");

        axios
          .post("/api/finished_good/" + this.finished_good.id, formData)
          .then((response) => {
            if (close) this.$router.push({ path: "/finished-goods" });
            this.btn_loading = false;
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch((error) => {
            this.btn_loading = false;
          });
      }
    },

    fetchOptions() {
      axios
        .get("/api/finishedGoodOptions")
        .then((response) => {
          this.finished_good_models = response.data.finished_good_models;
          this.units = response.data.units;
        })
        .catch((error) => {});
    },

    fetchFinishedGood() {
      axios
        .get("/api/finished_good/" + this.$route.params.id)
        .then((response) => {
          this.finished_good = response.data.finished_good;
        })
        .catch((error) => {});
    },
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchFinishedGood();
    } else {
      this.edit = false;
    }
    this.fetchOptions();
  },
};
</script>