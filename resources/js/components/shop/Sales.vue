<template>
  <section>
    <div class="text-center">
      <v-spacer></v-spacer>

      <v-btn @click="dialog = !dialog" class="cyan white--text text-center">
        <v-icon>add</v-icon>NEW SALE
      </v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="f_g_sales"
      :options.sync="options"
      :server-items-length="totalItems"
      :footer-props="{
        'items-per-page-options': [15, 25, 35, 45, 55],
      }"
    >
      <template v-slot:item.date="{ item }">{{
        `${item.year} - ${item.month} - ${item.day}`
      }}</template>
      <template v-slot:item.action="{ item }">
        <v-btn
          small
          class="blue-grey white--text"
          v-bind:to="{ path: '/sale-finished-good/' + item.id + '/manage' }"
          >Manage</v-btn
        >
        <v-btn icon @click="initEdit(item)">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="red--text" @click="deleteSale(item)">delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title v-if="edit" class="white--text"
            >SALES REGISTRATION FORM</v-card-title
          >
          <v-card-title v-else class="white--text"
            >NEW SALES REGISTRATION FORM</v-card-title
          >
          <v-divider></v-divider>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
          <v-container>
            <v-row>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="f_g_sale.sale_id"
                  label="Sale id*"
                  :rules="[(v) => !!v || 'Category id is required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="f_g_sale.to"
                  label="To"
                  :rules="[(v) => !!v || 'Soled to field is required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-row>
                  <v-col class="py-0">
                    <v-autocomplete
                      menu-props="auto"
                      v-model="f_g_sale.year"
                      :items="years"
                      label="Year"
                    ></v-autocomplete>
                  </v-col>

                  <v-col class="py-0">
                    <v-autocomplete
                      menu-props="auto"
                      item-text="name"
                      item-value="value"
                      v-model="f_g_sale.month"
                      :items="months"
                      label="Month"
                    ></v-autocomplete>
                  </v-col>

                  <v-col class="py-0">
                    <v-text-field
                      v-model="f_g_sale.day"
                      label="Day"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn
              v-if="!edit"
              color="blue darken-1"
              :loading="btn_loading"
              text
              @click.prevent="handelSubmit"
              >Save & Manage</v-btn
            >

            <v-btn
              v-else
              color="blue darken-1"
              :loading="btn_loading"
              text
              @click.prevent="handelUpdate"
              >Save</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
import { months } from "../../helper/date";
export default {
  data() {
    return {
      valid: false,
      btn_loading: false,
      dialog: false,
      months,
      f_g_sale: {},
      f_g_sales: [],
      options: {
        itemsPerPage: 15,
      },
      totalItems: 0,
      edit: false,
      headers: [
        {
          text: "Sale id",
          value: "sale_id",
          class: "cyan--text",
        },
        {
          text: "Sold to",
          value: "to",
          class: "cyan--text",
        },
        {
          text: "Date",
          value: "date",
          class: "cyan--text",
        },
        { text: "", value: "action", class: "cyan--text" },
      ],
    };
  },
  methods: {
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_sale).forEach((key) =>
          formData.append(key, this.f_g_sale[key])
        );

        formData.append("shop_id", this.$route.params.id);

        axios
          .post("/api/finished_good_sale/", formData)
          .then((response) => {
            this.btn_loading = false;
            this.$router.push({
              path:
                "/sale-finished-good/" + response.data.f_g_sale.id + "/manage",
            });
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          })
          .finally(() => {
            this.btn_loading = false;
          });
      }
    },

    handelUpdate() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_sale).forEach((key) =>
          formData.append(key, this.f_g_sale[key])
        );

        formData.append("shop_id", this.$route.params.id);
        formData.append("_method", "put");

        axios
          .post("/api/finished_good_sale/" + this.f_g_sale.id, formData)
          .then((response) => {
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          })
          .finally(() => {
            this.btn_loading = false;
            this.dialog = false;
          });
      }
    },

    fetchSales() {
      axios
        .get(
          "/api/shop_sales/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then((response) => {
          this.f_g_sales = response.data.f_g_sales.data;
          this.totalItems = response.data.f_g_sales.total;
        })
        .catch((error) => {});
    },

    initEdit(f_g_sale) {
      this.edit = true;
      this.f_g_sale = f_g_sale;
      this.dialog = true;
    },
    deleteSale(f_g_sale) {
      if (confirm("Are you sure you went to delete this item")) {
        axios
          .delete("/api/finished_good_sale/" + f_g_sale.id)
          .then((response) => {
            this.f_g_sales.splice(this.f_g_sales.indexOf(f_g_sale), 1);
          })
          .catch((error) => {});
      }
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchSales();
      },
      deep: true,
    },
  },
  created() {
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
    this.fetchSales();
    this.debouncedReceivedGoods = _.debounce(this.fetchSales, 1000);

    this.f_g_sale.day = Number(this.$store.state.mainStore.config.date[0]);
    this.f_g_sale.month = Number(this.$store.state.mainStore.config.date[1]);
    this.f_g_sale.year = Number(this.$store.state.mainStore.config.date[2]);
  },
};
</script>