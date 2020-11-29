<template>
  <section>
    <v-btn @click="dialog = !dialog" class="cyan white--text text-center">
      <v-icon>add</v-icon>NEW SALE
    </v-btn>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text">NEW SALES REGISTRATION FORM</v-card-title>
          <v-divider></v-divider>
        </v-toolbar>
        <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
          <v-container>
            <v-row>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="f_g_sale.sale_id"
                  label="Sale id*"
                  :rules="[v => !!v || 'Sale id is required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="f_g_sale.to"
                  label="To"
                  :rules="[v => !!v || 'Soled to field is required']"
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
                    <v-text-field v-model="f_g_sale.day" label="Day"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn
              color="blue darken-1"
              :loading="btn_loading"
              text
              @click.prevent="handelSubmit"
            >Save & Manage</v-btn>
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
      f_g_sale: {}
    };
  },
  methods: {
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.f_g_sale).forEach(key =>
        formData.append(key, this.f_g_sale[key])
      );

      formData.append("shop_id", this.$route.params.id);

      axios
        .post("/api/finished_good_sale/", formData)
        .then(response => {
          this.btn_loading = false;
          this.$router.push({
            path: "/sale-finished-good/" + response.data.f_g_sale.id + "/manage"
          });
        })
        .catch(error => {
          console.log(error.response.data);
        })
        .finally(() => {
          this.btn_loading = false;
        });
    }
  },
  watch: {},
  created() {
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
  }
};
</script>


<style scoped>
td {
  height: 0px !important;
  border-top: solid 1px !important;
  border-right: solid 1px !important;
}
.report-border {
  border: 0px !important;
  border-top: solid 1px !important;
}
.starter-border {
  border: 0px !important;
  border-right: solid 1px !important;
}
.border-all {
  border: solid 1px !important;
}
.no-right-border {
  border-right: 0px;
}
th {
  background-color: #7fffd4 !important;
}
</style>