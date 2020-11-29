<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="px-5 pb-5">
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text"
            >GOOD RECEIVE REGISTRATION FORM</v-card-title
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
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="handelSubmit"
          class="pt-4"
        >
          <v-row>
            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                type="number"
                v-model="good_receive.good_receive_id"
                :rules="[
                  (v) => !!v || 'GRN is required',
                  (v) =>
                    v >= config.grn_start || 'MIN GRN IS : ' + config.grn_start,
                  (v) =>
                    v <= config.grn_end || 'MAX GRN IS : ' + config.grn_end,
                ]"
                label="Good receive id"
                :messages="
                  'FROM - ' + config.grn_start + ' - TO - ' + config.grn_end
                "
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-select
                v-model="good_receive.supplier_id"
                :items="suppliers"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Supplier field is required']"
                label="Item supplier"
              ></v-select>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="good_receive.invoice_no"
                label="Invoice number"
                :rules="[(v) => !!v || 'Invoice number is required *']"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="good_receive.pro_no"
                label="Proforma number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="good_receive.po_no"
                label="Purchase number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="good_receive.lc_no"
                label="LC Number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="good_receive.prepared_by"
                label="Prepared by"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="good_receive.approved_by"
                label="Approved by"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-row>
                <v-col class="py-0">
                  <v-autocomplete
                    menu-props="auto"
                    v-model="good_receive.year"
                    :items="years"
                    label="Year"
                  ></v-autocomplete>
                </v-col>

                <v-col class="py-0">
                  <v-autocomplete
                    menu-props="auto"
                    item-text="name"
                    item-value="value"
                    v-model="good_receive.month"
                    :items="months"
                    @input="selectMonth()"
                    label="Month"
                  ></v-autocomplete>
                </v-col>

                <v-col class="py-0">
                  <v-text-field
                    v-model="good_receive.day"
                    :rules="[
                      (v) => v <= max_days || 'Invalid date value' + max_days,
                    ]"
                    label="Day"
                    @input="selectMonth()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>

        <div class="text-center mt-3">
          <v-btn
            v-if="edit"
            type="submit"
            dark
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click.prevent="handelUpdate"
            >Update</v-btn
          >

          <v-btn
            dark
            type="submit"
            v-else
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click.prevent="handelSubmit"
            >Save</v-btn
          >
        </div>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { months } from "../../helper/date";
import AddItem from "./AddItem";
export default {
  components: {
    AddItem,
  },
  data: () => ({
    date_menu: false,
    edit: false,
    valid: false,
    max_days: 0,
    good_receive: {
      supplier: {},
    },
    config: {},
    btn_loading: false,
    suppliers: [],
    years: [],
    months,
  }),
  methods: {
    handelSubmit() {
      this.selectMonth();
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.good_receive).forEach((key) =>
          formData.append(key, this.good_receive[key])
        );

        axios
          .post("/api/good_receive", formData)
          .then((response) => {
            this.btn_loading = false;
            this.$router.push({
              path:
                "/receive-good/" + response.data.good_receive.id + "/manage",
            });
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
      if (this.$refs.form.validate()) {
        this.btn_loading = true;

        this.good_receive._method = "put";

        axios
          .post("/api/good_receive/" + this.$route.params.id, this.good_receive)
          .then((response) => {
            this.btn_loading = false;
            this.$router.go(-1);
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

    fetchGoodReceive() {
      axios
        .get("/api/good_receive/" + this.$route.params.id)
        .then((response) => {
          this.good_receive = response.data.good_receive;
          this.selectMonth();
        })
        .catch((error) => {});
    },

    fetchOptions() {
      axios
        .get("/api/goodReceiveOptions")
        .then((response) => {
          this.suppliers = response.data.suppliers;
          this.config = response.data.config;
        })
        .catch((error) => {});
    },
    selectMonth() {
      this.max_days = this.months.filter(
        (month) => month.value === this.good_receive.month
      )[0].days;
    },
  },
  created() {
    this.fetchOptions();
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
    // this.good_receive.year = new Date().getFullYear();
    // this.good_receive.month = new Date().getMonth() + 1;
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchGoodReceive();
    } else {
      this.good_receive.day = Number(
        this.$store.state.mainStore.config.date[0]
      );
      this.good_receive.month = Number(
        this.$store.state.mainStore.config.date[1]
      );
      this.good_receive.year = Number(
        this.$store.state.mainStore.config.date[2]
      );
      this.edit = false;
      this.selectMonth();
    }
  },
};
</script>