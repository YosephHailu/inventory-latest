<template>
  <section>
    <div class="text-center">
      <v-spacer></v-spacer>

      <v-btn @click="dialog = !dialog" class="cyan white--text text-center">
        <v-icon>add</v-icon>NEW RETURN
      </v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="f_g_returns"
      :options.sync="options"
      :server-items-length="totalItems"
      :footer-props="{
        'items-per-page-options': [15, 25, 35, 45, 55]
      }"
    >
      <template v-slot:item.date="{ item }">{{`${item.year} - ${item.month} - ${item.day}`}}</template>
      <template v-slot:item.action="{ item }">
        <v-btn
          small
          class="blue-grey white--text"
          v-bind:to="{path:'/return-finished-good/'+item.id + '/manage'}"
        >Manage</v-btn>
        <v-btn icon @click="initEdit(item)">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="red--text" @click="deleteReturn(item)">delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

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
              <v-col cols="12" class="py-0">
                <v-text-field v-model="f_g_return.return_id" label="Return id*" required></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-textarea v-model="f_g_return.reason" label="Reason" rows="2" required></v-textarea>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-row>
                  <v-col class="py-0">
                    <v-autocomplete
                      menu-props="auto"
                      v-model="f_g_return.year"
                      :items="years"
                      label="Year"
                    ></v-autocomplete>
                  </v-col>

                  <v-col class="py-0">
                    <v-autocomplete
                      menu-props="auto"
                      item-text="name"
                      item-value="value"
                      v-model="f_g_return.month"
                      :items="months"
                      label="Month"
                    ></v-autocomplete>
                  </v-col>

                  <v-col class="py-0">
                    <v-text-field v-model="f_g_return.day" label="Day"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn
              v-if="!edit"
              color="blue darken-1"
              :loading="btn_loading"
              text
              @click.prevent="handelSubmit"
            >Save & Manage</v-btn>

            <v-btn
              v-else
              color="blue darken-1"
              :loading="btn_loading"
              text
              @click.prevent="handelUpdate"
            >Save</v-btn>
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
      f_g_return: {},
      f_g_returns: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      edit: false,
      headers: [
        {
          text: "Return id",
          value: "return_id",
          class: "cyan--text"
        },
        {
          text: "Reason",
          value: "reason",
          class: "cyan--text"
        },
        {
          text: "Date",
          value: "date",
          class: "cyan--text"
        },
        { text: "", value: "action", class: "cyan--text" }
      ]
    };
  },
  methods: {
    handelSubmit() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.f_g_return).forEach(key =>
        formData.append(key, this.f_g_return[key])
      );

      formData.append("shop_id", this.$route.params.id);

      axios
        .post("/api/finished_good_return/", formData)
        .then(response => {
          this.btn_loading = false;
          this.$router.push({
            path:
              "/return-finished-good/" + response.data.f_g_return.id + "/manage"
          });
        })
        .catch(error => {
          console.log(error.response.data);
        })
        .finally(() => {
          this.btn_loading = false;
        });
    },

    handelUpdate() {
      this.btn_loading = true;
      let formData = new FormData();

      Object.keys(this.f_g_return).forEach(key =>
        formData.append(key, this.f_g_return[key])
      );

      formData.append("shop_id", this.$route.params.id);
      formData.append("_method", "put");

      axios
        .post("/api/finished_good_return/" + this.f_g_return.id, formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data);
        })
        .finally(() => {
          this.btn_loading = false;
          this.dialog = false;
        });
    },

    fetchReturns() {
      axios
        .get(
          "/api/shop_returns/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then(response => {
          this.f_g_returns = response.data.f_g_returns.data;
          this.totalItems = response.data.f_g_returns.total;
        })
        .catch(error => {});
    },

    initEdit(f_g_return) {
      this.edit = true;
      this.f_g_return = f_g_return;
      this.dialog = true;
    },
    deleteReturn(f_g_return) {
      if (confirm("Are you sure you went to delete this item")) {
        axios
          .delete("/api/finished_good_return/" + f_g_return.id)
          .then(response => {
            this.f_g_returns.splice(this.f_g_returns.indexOf(f_g_return), 1);
          })
          .catch(error => {});
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchReturns();
      },
      deep: true
    }
  },
  created() {
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
    this.fetchReturns();
    this.debouncedReceivedGoods = _.debounce(this.fetchReturns, 1000);
  }
};
</script>