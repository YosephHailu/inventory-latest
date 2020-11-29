<template>
  <v-row>
    <v-col>
      <v-card class="pb-5">
        <v-toolbar class="white">
          <v-divider></v-divider>
          <v-card-title class>ISSUED FINISHED GOODS REPORT</v-card-title>
          <v-divider></v-divider>
          <v-btn text outlined class="no-print" @click="$router.go(-1)">close</v-btn>
        </v-toolbar>

        <print-header />

        <v-simple-table dense class="pa-0" fixed-header>
          <thead>
            <tr>
              <th>Grn</th>
              <th>FG id</th>
              <th>FG name</th>
              <th>Shop</th>
              <th>Quantity</th>
              <th>AVG price</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(f_g_issued, grn) in issued_by_id" style="width: 100%">
              <td class="border-all text-top mr-0 blue--text" :key="grn + 'a'" colspan="2">
                {{grn}}
                <span
                  class="small"
                  small
                  style="font-size: 9px; padding: 0px;"
                >({{f_g_issued[0].f_g_issue.day + " - " + f_g_issued[0].f_g_issue.month + " - " + f_g_issued[0].f_g_issue.year}})</span>
              </td>
              <tr
                :class="item.balance <= item.min_balance ? 'red--text': ''"
                v-for="(received) in f_g_issued"
                :key="received.id"
                style="width: 100%"
              >
                <td class="starter-border"></td>
                <td>{{received.finished_good_id}}</td>
                <td>{{received.finished_good.name}}</td>
                <td>{{received.f_g_issue.shop && received.f_g_issue.shop.name}}</td>
                <td>{{received.quantity}}</td>
                <td class="no-right-border">{{ received.avg_price.toFixed(2)}}</td>
              </tr>

              <tr :key="grn + '1'">
                <td class="starter-border"></td>
                <td class="report-border"></td>
                <td class="report-border"></td>
                <td class="report-border"></td>
                <td class="blue--text" style="border: solid 1px">
                  Total :
                  {{f_g_issued.reduce(function (total, value) {
                  return total + Number(value.quantity);
                  }, 0)}}
                </td>
                <td class="blue--text" style="border: solid 1px">
                  Total :
                  {{f_g_issued.reduce(function (total, value) {
                  return total + Number(value.avg_price);
                  }, 0)}}
                </td>
              </tr>
            </template>
          </tbody>
        </v-simple-table>

        <v-pagination
          v-model="options.current_page"
          circle
          :length="options.last_page"
          @input="fetchIssuedFinishedGood"
        ></v-pagination>
      </v-card>
    </v-col>

    <v-col cols="2" class="no-print">
      <v-navigation-drawer>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title text-center">FILTER</v-list-item-title>
            <v-list-item-subtitle class="text-center">
              <v-btn small outlined @click="clearForm">clear</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-text-field hide-details label="Search by name or item id" v-model="search">
              <template v-slot:append>
                <v-btn icon @click="search = ''">
                  <v-icon size="20">close</v-icon>
                </v-btn>
              </template>
            </v-text-field>

            <v-select
              v-model="shop_id"
              hide-details
              :items="shops"
              item-text="name"
              item-value="id"
              label="Select shop"
              @input="fetchIssuedFinishedGood"
            >
              <template v-slot:append>
                <v-btn icon @click="shop_id = ''; fetchIssuedFinishedGood()">
                  <v-icon size="20">close</v-icon>
                </v-btn>
              </template>
            </v-select>

            <v-form ref="form" v-model="valid" class="pt-4">
              <v-row>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    hide-details
                    :rules="[v => !!v || 'Day from is required']"
                    v-model="date.day_from"
                    label="Day from"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" class="py-0">
                  <v-text-field
                    hide-details
                    :rules="[v => !!v || 'Day to is required']"
                    v-model="date.day_to"
                    label="Day to"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" class="py-0">
                  <v-autocomplete
                    hide-details
                    menu-props="auto"
                    item-text="name"
                    item-value="value"
                    v-model="date.month_from"
                    :items="months"
                    :rules="[v => !!v || 'Month form is required']"
                    label="Month from"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="6" class="py-0">
                  <v-autocomplete
                    hide-details
                    menu-props="auto"
                    item-text="name"
                    item-value="value"
                    v-model="date.month_to"
                    :rules="[v => !!v || 'Month to is required']"
                    :items="months"
                    label="Month to"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="6" class="py-0">
                  <v-autocomplete
                    hide-details
                    menu-props="auto"
                    v-model="date.year_from"
                    :items="years"
                    :rules="[v => !!v || 'Year form is required']"
                    label="Year from"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="6" class="py-0">
                  <v-autocomplete
                    hide-details
                    menu-props="auto"
                    v-model="date.year_to"
                    :items="years"
                    :rules="[v => !!v || 'Year to is required']"
                    label="Year to"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
            <v-btn class="mt-5 mx-1" text color="cyan" dark @click="dateFilter">
              <v-icon>search</v-icon>SEARCH
            </v-btn>
            <v-btn class="mt-5 mx-1" text color="cyan" dark @click="exportItem">
              <v-icon>import_export</v-icon>EXPORT
            </v-btn>
            <v-btn class="mt-5 mx-1" text color="cyan" dark @click="int_print">
              <v-icon class="mx-2">print</v-icon>Print
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>
    </v-col>
  </v-row>
</template>

<script>
import PrintHeader from "../layouts/PrintHeader";
import { months } from "../../helper/date";

export default {
  components: {
    PrintHeader
  },
  data: () => ({
    valid: false,
    delete_dialog: false,
    search: "",
    shop_id: "",
    items: [],
    item: {},
    options: {
      itemsPerPage: 100
    },
    total_items: 0,
    issued_by_id: [],
    shops: [],
    date: {},
    months
  }),
  methods: {
    clearForm() {
      this.date = {};
      this.search = "";
      this.shop_id = "";
      this.fetchIssuedFinishedGood();
    },
    dateFilter() {
      if (this.$refs.form.validate()) this.fetchIssuedFinishedGood();
    },
    fetchIssuedFinishedGood() {
      axios
        .get(
          "/api/finished_good_issue_detail?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.current_page +
            "&q=" +
            this.search +
            "&shop_id=" +
            this.shop_id +
            "&date=" +
            JSON.stringify(this.date)
        )
        .then(response => {
          console.log(response.data)
          this.options.current_page = response.data.f_g_issued.current_page;
          this.options.last_page = response.data.f_g_issued.last_page;
          this.issued_by_id = response.data.f_g_issued.data.reduce((r, a) => {
            r[a.f_g_issue.issue_id] = [...(r[a.f_g_issue.issue_id] || []), a];
            return r;
          }, {});
        })
        .catch(error => {
          console.log(error.response.data)
        });
    },
    
    exportItem() {
      window.open(
        "/f_g_issue_export?q=" + this.search + "&shop_id=" + this.shop_id,
        "_blank"
      );
    },

    int_print() {
      window.print();
    },

    fetchOptions() {
      axios
        .get("/api/shop")
        .then(response => {
          this.shops = response.data.shops;
        })
        .catch(error => {});
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchIssuedFinishedGood();
      },
      deep: true
    },
    search: {
      handler() {
        this.options.page = 1;
        this.debouncedGetItems();
      }
    }
  },
  created() {
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
    this.$store.state.mainStore.sidebar_panel = false;
    this.fetchIssuedFinishedGood();
    this.fetchOptions();
    this.debouncedGetItems = _.debounce(this.fetchIssuedFinishedGood, 1000);
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