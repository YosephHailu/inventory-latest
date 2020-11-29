<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="px-5 pb-5">
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text">FINISHED GOOD RECEIVE REGISTRATION FORM</v-card-title>
          <v-divider></v-divider>
          <v-btn text outlined class="white--text" @click="$router.go(-1)">close</v-btn>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit" class="pt-4">
          <v-row>
            <v-col cols="6" class="py-0">
              <v-text-field
                type="number"
                v-model="f_g_receive.receive_id"
                :rules="[ v => !!v || 'GRN is required', 
                  v => v >= config.grn_start || 'MIN GRN IS : ' + config.grn_start,
                  v => v <= config.grn_end || 'MAX GRN IS : ' + config.grn_end]"
                label="Finished good receive id"
                :messages="'FROM - ' + config.grn_start + ' - TO - ' + config.grn_end"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6" class="py-0">
              <v-select
                v-model="f_g_receive.department_id"
                :items="departments"
                item-text="name"
                item-value="id"
                :rules="[v => !!v || 'Department field is required']"
                label="Department"
              ></v-select>
            </v-col>

            <v-col class="py-0">
              <v-row>
                <v-col class="py-0">
                  <v-select
                    menu-props="auto"
                    v-model="f_g_receive.year"
                    :items="years"
                    label="Year"
                  ></v-select>
                </v-col>

                <v-col class="py-0">
                  <v-select
                    menu-props="auto"
                    item-text="name"
                    item-value="value"
                    v-model="f_g_receive.month"
                    :items="months"
                    @input="selectMonth()"
                    label="Month"
                  ></v-select>
                </v-col>

                <v-col class="py-0">
                  <v-text-field
                    v-model="f_g_receive.day"
                    :rules="[v => v <= max_days || 'Invalid date value', v => v > 0 || 'Invalid date value']"
                    label="Day"
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
          >Update</v-btn>

          <v-btn
            dark
            type="submit"
            v-else
            color="cyan accent-6"
            :loading="btn_loading"
            rounded
            @click.prevent="handelSubmit"
          >Save</v-btn>
        </div>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { months } from "../../helper/date";
export default {
  components: {},
  data: () => ({
    date_menu: false,
    edit: false,
    valid: false,
    max_days: 0,
    f_g_receive: {},
    config: {},
    btn_loading: false,
    departments: [],
    years: [],
    months
  }),
  methods: {
    handelSubmit() {
      this.selectMonth();
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_receive).forEach(key =>
          formData.append(key, this.f_g_receive[key])
        );

        axios
          .post("/api/finished_good_receive", formData)
          .then(response => {
            this.btn_loading = false;
            this.$router.push({
              path:
                "/receive-finished-good/" +
                response.data.f_g_receive.id +
                "/manage"
            });
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },

    handelUpdate() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.f_g_receive).forEach(key =>
          formData.append(key, this.f_g_receive[key])
        );

        formData.append("_method", "put");

        axios
          .post("/api/finished_good_receive/" + this.$route.params.id, formData)
          .then(response => {
            this.btn_loading = false;
            this.$router.go(-1);
            this.$store.dispatch("updateAlert", {
              message: "Successfully saved ",
              type: "success",
              visible: true,
            });
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },

    fetchGoodReceive() {
      axios
        .get("/api/finished_good_receive/" + this.$route.params.id)
        .then(response => {
          this.f_g_receive = response.data.f_g_receive;
          this.selectMonth();
          this.$refs.form.validate();
        })
        .catch(error => {});
    },

    fetchOptions() {
      axios
        .get("/api/department")
        .then(response => {
          this.departments = response.data.departments;
          this.config = response.data.config;
        })
        .catch(error => {});
    },
    selectMonth() {
      this.max_days = this.months.filter(
        month => month.value === this.f_g_receive.month
      )[0].days;
    }
  },
  created() {
    this.fetchOptions();
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
    if (this.$route.params.id) {
      this.edit = true;
      this.fetchGoodReceive();
    } else {
      this.f_g_receive.day = Number(this.$store.state.mainStore.config.date[0]);
      this.f_g_receive.month = Number(
        this.$store.state.mainStore.config.date[1]
      );
      this.f_g_receive.year = Number(
        this.$store.state.mainStore.config.date[2]
      );
      this.edit = false;
    }
  }
};
</script>