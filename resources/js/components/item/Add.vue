<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="px-5 pb-5">
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text"
            >RAW MATERIAL REGISTRATION FORM</v-card-title
          >
          <v-divider></v-divider>
          <v-btn text outlined class="white--text" @click="$router.go(-1)"
            >close</v-btn
          >
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit="handelSubmit(false)">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="item.item_id"
                :rules="[(v) => !!v || 'Item id is required']"
                label="Item id"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="item.item_category.category"
                :items="itemCategories"
                item-text="category"
                :rules="[(v) => !!v || 'Category field is required']"
                label="Item category"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="item.name"
                :rules="[(v) => !!v || 'Name is required']"
                label="Item name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                v-model="item.unit.name"
                :items="units"
                item-text="name"
                :rules="[(v) => !!v || 'Unit field is required']"
                label="Measurement unit"
              ></v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                messages="optional"
                v-model="item.location"
                label="Location"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="item.min_balance"
                :rules="[(v) => !!v || 'Minimum balance is required']"
                label="Minimum balance"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-file-input
          prepend-icon="image"
          v-model="item.picture"
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
            @click="handelUpdate(true)"
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
    item: {
      unit: {},
      item_category: {},
    },
    btn_loading: false,
    itemCategories: [],
    units: [],
  }),
  methods: {
    clearForm() {
      this.item = {
        unit: {},
        item_category: {},
      };
    },
    handelSubmit(close) {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.item).forEach((key) =>
          formData.append(key, this.item[key])
        );

        formData.append("unit", JSON.stringify(this.item.unit));
        formData.append(
          "item_category",
          JSON.stringify(this.item.item_category)
        );

        axios
          .post("/api/item", formData)
          .then((response) => {
            if (close) this.$router.go(-1);
            else this.clearForm();
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

    handelUpdate() {
      console.log(this.item);
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.item).forEach((key) =>
          formData.append(key, this.item[key])
        );

        formData.append("unit", JSON.stringify(this.item.unit));
        formData.append(
          "item_category",
          JSON.stringify(this.item.item_category)
        );
        formData.append("_method", "put");

        axios
          .post("/api/item/" + this.item.id, formData)
          .then((response) => {
            console.log(response.data);

            // this.$router.push({ path: "/items" });
            this.btn_loading = false;

            this.$store.dispatch("updateAlert", {
              message: "Successfully updated ",
              type: "success",
              visible: true,
            });
          })
          .catch((error) => {
            this.btn_loading = false;
            console.log(error.response.data);
          });
      }
    },

    fetchItem() {
      axios
        .get("/api/item/" + this.$route.params.id)
        .then((response) => {
          this.item = response.data.item;
        })
        .catch((error) => {});
    },

    fetchOptions() {
      axios
        .get("/api/itemOptions")
        .then((response) => {
          this.itemCategories = response.data.itemCategories;
          this.units = response.data.units;
        })
        .catch((error) => {});
    },

    fetchItem() {
      axios
        .get("/api/item/" + this.$route.params.id)
        .then((response) => {
          this.item = response.data.item;
        })
        .catch((error) => {});
    },
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchItem();
    } else {
      this.edit = false;
    }
    this.fetchOptions();
  },
};
</script>