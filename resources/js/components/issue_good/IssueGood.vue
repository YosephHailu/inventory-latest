<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="px-5 pb-5">
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text"
            >ISSUE ITEM REGISTRATION FORM</v-card-title
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
            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="issue_item.issue_id"
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

            <v-col cols="12" md="3" class="py-0">
              <v-select
                v-model="issue_item.section_id"
                :items="sections"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Supplier field is required']"
                label="Section"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-row>
                <v-col class="py-0">
                  <v-select
                    menu-props="auto"
                    v-model="issue_item.year"
                    :items="years"
                    label="Year"
                  ></v-select>
                </v-col>

                <v-col class="py-0">
                  <v-select
                    menu-props="auto"
                    item-text="name"
                    item-value="value"
                    v-model="issue_item.month"
                    :items="months"
                    @input="selectMonth()"
                    label="Month"
                  ></v-select>
                </v-col>

                <v-col class="py-0">
                  <v-text-field
                    v-model="issue_item.day"
                    :rules="[
                      (v) => v <= max_days || 'Invalid day value ',
                    ]"
                    label="Day"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="issue_item.request_no"
                label="Request number"
                :rules="[(v) => !!v || 'Request number is required *']"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="issue_item.issued_by"
                :rules="[(v) => !!v || 'Issued by is required *']"
                label="Issued by"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="issue_item.prepared_by"
                label="Prepared by"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="py-0">
              <v-text-field
                v-model="issue_item.received_by"
                label="Received by"
              ></v-text-field>
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
    max_days: 0,
    config: {},
    issue_item: {
      supplier: {},
    },
    btn_loading: false,
    sections: [],
    years: [],
    months,
  }),
  methods: {
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.issue_item).forEach((key) =>
          formData.append(key, this.issue_item[key])
        );

        axios
          .post("/api/issue_item", formData)
          .then((response) => {
            this.btn_loading = false;
            this.$router.push({
              path: "/issue-good/" + response.data.issue_item.id + "/manage",
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

        this.issue_item._method = "put";
        axios
          .post("/api/issue_item/" + this.$route.params.id, this.issue_item)
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

    fetchIssuedGoods() {
      axios
        .get("/api/issue_item/" + this.$route.params.id)
        .then((response) => {
          this.issue_item = response.data.issue_item;
          this.issue_item.month = this.issue_item.month + 0;
          this.$refs.form.validate();
          this.selectMonth();
        })
        .catch((error) => {});
    },

    fetchOptions() {
      axios
        .get("/api/itemIssueOptions")
        .then((response) => {
          this.sections = response.data.sections;
          this.config = response.data.config;
        })
        .catch((error) => {});
    },

    selectMonth() {
      this.max_days = this.months.filter(
        (month) => month.value === this.issue_item.month
      )[0].days;
    },
  },
  created() {
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchIssuedGoods();
    } else {
      this.issue_item.day = Number(this.$store.state.mainStore.config.date[0]);
      this.issue_item.month = Number(
        this.$store.state.mainStore.config.date[1]
      );
      this.issue_item.year = Number(this.$store.state.mainStore.config.date[2]);
      this.edit = false;
    }
    this.fetchOptions();
    this.selectMonth();
  },
};
</script>