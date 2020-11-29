<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="px-5 pb-5">
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text"
            >FINISHED GOOD ISSUE REGISTRATION FORM</v-card-title
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
        <v-form ref="form" v-model="valid" @submit="handelSubmit" class="pt-4">
          <v-row>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="f_g_issue.issue_id"
                :rules="[
                  (v) => !!v || 'Issue number is required',
                  (v) =>
                    v >= config.issue_start ||
                    'MIN Issue number IS : ' + config.issue_start,
                  (v) =>
                    v <= config.issue_end ||
                    'MAX Issue number IS : ' + config.issue_end,
                ]"
                label="Issue id"
                :messages="
                  'FROM - ' + config.issue_start + ' - TO - ' + config.issue_end
                "
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6" class="py-0">
              <v-autocomplete
                v-model="f_g_issue.shop_id"
                :items="shops"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Shop field is required']"
                label="Shop"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-row>
                <v-col class="py-0">
                  <v-autocomplete
                    menu-props="auto"
                    v-model="f_g_issue.year"
                    :items="years"
                    label="Year"
                  ></v-autocomplete>
                </v-col>

                <v-col class="py-0">
                  <v-autocomplete
                    menu-props="auto"
                    item-text="name"
                    item-value="value"
                    v-model="f_g_issue.month"
                    @input="selectMonth()"
                    :items="months"
                    label="Month"
                  ></v-autocomplete>
                </v-col>

                <v-col class="py-0">
                  <v-text-field
                    v-model="f_g_issue.day"
                    label="Day"
                    :rules="[(v) => v <= max_days || 'Invalid date value']"
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
            dark
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click="handelUpdate"
            >Save</v-btn
          >

          <v-btn
            dark
            v-else
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click="handelSubmit"
            >Save</v-btn
          >
        </div>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { months } from "../../helper/date";
export default {
  data: () => ({
    date_menu: false,
    edit: false,
    valid: false,
    config: {},
    max_days: 0,
    f_g_issue: {
      supplier: {},
    },
    btn_loading: false,
    shops: [],
    years: [],
    months,
  }),
  methods: {
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_issue).forEach((key) =>
          formData.append(key, this.f_g_issue[key])
        );

        axios
          .post("/api/finished_good_issue", formData)
          .then((response) => {
            this.btn_loading = false;
            this.$router.push({
              path:
                "/issue-finished-good/" +
                response.data.f_g_issue.id +
                "/manage",
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
        let formData = new FormData();

        Object.keys(this.f_g_issue).forEach((key) =>
          formData.append(key, this.f_g_issue[key])
        );

        formData.append("_method", "put");

        axios
          .post("/api/finished_good_issue/" + this.$route.params.id, formData)
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

    fetchIssuedFinishedGoods() {
      axios
        .get("/api/finished_good_issue/" + this.$route.params.id)
        .then((response) => {
          console.log(response.data);
          this.f_g_issue = response.data.f_g_issue;
          this.f_g_issue.month = this.f_g_issue.month + 0;
          this.selectMonth();
        })
        .catch((error) => {});
    },

    fetchOptions() {
      axios
        .get("/api/shop")
        .then((response) => {
          this.shops = response.data.shops;
          this.config = response.data.config;
        })
        .catch((error) => {});
    },

    selectMonth() {
      this.max_days = this.months.filter(
        (month) => month.value === this.f_g_issue.month
      )[0].days;
      console.log(this.max_days);
    },
  },
  created() {
    this.fetchOptions();
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchIssuedFinishedGoods();
    } else {
      this.f_g_issue.day = Number(this.$store.state.mainStore.config.date[0]);
      this.f_g_issue.month = Number(this.$store.state.mainStore.config.date[1]);
      this.f_g_issue.year = Number(this.$store.state.mainStore.config.date[2]);
      this.edit = false;
      this.selectMonth();
    }
  },
};
</script>