<template>
  <v-container>
    <v-row class="no-print">
      <v-col cols="3" class="pt-0">
        <v-text-field
          hide-details
          label="Search by finished good id or name"
          v-model="search"
        ></v-text-field>
      </v-col>

      <v-col cols="10" md="5" class="py-0">
        <v-row>
          <v-col class="py-0">
            <v-text-field
              hide-details
              v-model="date.day"
              label="Day"
            ></v-text-field>
          </v-col>

          <v-col class="py-0">
            <v-autocomplete
              hide-details
              menu-props="auto"
              item-text="name"
              item-value="value"
              v-model="date.month"
              :items="months"
              label="Month"
              @change="fetchFinishedGoods"
            ></v-autocomplete>
          </v-col>

          <v-col class="py-0">
            <v-autocomplete
              hide-details
              menu-props="auto"
              v-model="date.year"
              :items="years"
              label="Year"
              @change="fetchFinishedGoods"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
      <v-row class="pl-2">
        <v-btn class="mt-5" small outlined @click="clearForm">Clear</v-btn>
        <v-btn
          class="mt-5 mx-1"
          small
          text
          color="cyan"
          dark
          @click="exportItem"
        >
          <v-icon>import_export</v-icon>EXPORT
        </v-btn>
        <v-btn
          class="mt-5 mx-1"
          small
          text
          color="cyan"
          dark
          @click="int_print"
        >
          <v-icon class="mx-2">print</v-icon>Print
        </v-btn>
      </v-row>
    </v-row>

    <v-simple-table dense fixed-header>
      <thead>
        <tr>
          <th>Sale id</th>
          <th style="min-width: 150px">Finished Good id</th>
          <th>Name</th>
          <th>Date</th>
          <th>Quantity</th>
          <th>Price</th>
          <th class="no-print" max-width="15px" style="max-width: 45px"></th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(category, sale_id) in grouped_finished_goods"
          style="width: 100%"
        >
          <td
            class="border-all text-top mr-0 blue--text"
            :key="sale_id + 'a'"
            colspan="2"
          >
            {{ sale_id }}
            <span class="small" small style="font-size: 9px; padding: 0px"
              >({{
                category[0].f_g_sale.day +
                " - " +
                category[0].f_g_sale.month +
                " - " +
                category[0].f_g_sale.year
              }})</span
            >
          </td>
          <tr
            :class="item.balance <= item.min_balance ? 'red--text' : ''"
            v-for="item in category"
            :key="item.id"
            style="width: 100%"
          >
            <td class="starter-border"></td>
            <td>{{ item.finished_good.finished_good_id }}</td>
            <td>{{ item.finished_good.name }}</td>
            <td>
              {{
                item.f_g_sale.day +
                ":" +
                item.f_g_sale.month +
                ":" +
                item.f_g_sale.year
              }}
            </td>
            <td>{{ item.quantity }}</td>
            <td class="no-right-border">{{ item.price }}</td>
            <td class="no-print">
              <v-btn
                icon
                small
                :to="{
                  path:
                    '/shop-finished-good/' +
                    item.finished_good_id +
                    '/' +
                    $route.params.id,
                }"
              >
                <v-icon>launch</v-icon>
              </v-btn>
            </td>
          </tr>

          <tr :key="sale_id + 'b'">
            <td colspan="4" class="no-border"></td>
            <td colspan="3" class="pa-0">
              <tr>
                <td class="blue--text" style="border: solid 1px">
                  T. Quantity :
                  {{
                    category.reduce(function (total, value) {
                      return total + Number(value.quantity);
                    }, 0)
                  }}
                </td>

                <td class="blue--text" style="border: solid 1px">
                  T. Price :
                  {{
                    category.reduce(function (total, value) {
                      return total + Number(value.price * value.quantity);
                    }, 0)
                  }}
                </td>

                <td class="blue--text" style="border: solid 1px">
                  T. VAT :
                  {{
                    category
                      .reduce(function (total, value) {
                        return (
                          total + Number(value.price * value.quantity * 0.15)
                        );
                      }, 0)
                      .toLocaleString()
                  }}
                </td>
              </tr>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="no-border"></td>
          <td colspan="2" class="blue--text" style="border: solid 1px">
            Total quantity : {{ total_quantity.toLocaleString() }}
          </td>
        </tr>
        <tr>
          <td colspan="5" class="no-border"></td>
          <td colspan="2" class="blue--text" style="border: solid 1px">
            Price : {{ total_price.toLocaleString() }}
          </td>
        </tr>
        <tr>
          <td colspan="5" class="no-border"></td>
          <td colspan="2" class="blue--text" style="border: solid 1px">
            Total VAT : {{ total_vat.toLocaleString() }}
          </td>
        </tr>
      </tfoot>
    </v-simple-table>

    <v-pagination
      v-model="options.current_page"
      circle
      :length="options.last_page"
      @input="fetchFinishedGoods"
    ></v-pagination>
  </v-container>
</template>

<script>
import { months } from "../../helper/date";

export default {
  data: () => ({
    valid: false,
    delete_dialog: false,
    search: "",
    items: [],
    item: {},
    options: {
      itemsPerPage: 150,
    },
    total_items: 0,
    itemsPerPage: 1,
    grouped_finished_goods: [],
    finished_good_models: [],
    date: {
      year: "",
      month: "",
      day: "",
    },
    months,
    total_quantity: 0,
    total_vat: 0,
    total_price: 0,
  }),
  methods: {
    clearForm() {
      this.date = {
        year: "",
        month: "",
        day: "",
      };
      this.fetchFinishedGoods();
    },
    fetchFinishedGoods() {
      axios
        .get(
          "/api/shop_sale_details/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.current_page +
            "&q=" +
            this.search +
            "&year=" +
            this.date.year +
            "&month=" +
            this.date.month +
            "&day=" +
            this.date.day
        )
        .then((response) => {
          console.log("by-date", this.grouped_finished_goods)

          this.options.current_page =
            response.data.f_g_sale_details.current_page;
          this.options.last_page = response.data.f_g_sale_details.last_page;
          this.grouped_finished_goods = response.data.f_g_sale_details.data.reduce(
            (r, a) => {
              r[a.f_g_sale.date] = [...(r[a.f_g_sale.date] || []), a];
              return r;
            },
            {}
          );
          console.log("by-date", this.grouped_finished_goods)

          this.total_quantity = response.data.f_g_sale_details.data.reduce(
            function (total, value) {
              return total + Number(value.quantity);
            },
            0
          );

          this.total_price = response.data.f_g_sale_details.data.reduce(
            function (total, value) {
              return total + Number(value.quantity * value.price);
            },
            0
          );

          this.total_vat = response.data.f_g_sale_details.data.reduce(function (
            total,
            value
          ) {
            return total + Number(value.quantity * value.price * 0.15);
          },
          0);
        })
        .catch((error) => {
          // console.log(error.response.data)
        });
    },

    exportItem() {
      window.open(
        "/sales_export/" + this.$route.params.id + "?q=" + this.search,
        "_blank"
      );
    },

    int_print() {
      window.print();
    },
  },
  watch: {
    search: {
      handler() {
        this.options.page = 1;
        this.debouncedGetFinishedGoods();
      },
    },
    "date.day": {
      handler() {
        this.options.page = 1;
        this.debouncedGetFinishedGoods();
      },
    },
  },
  created() {
    this.years = new Array(2050 - 2000).fill(2000).map((n, i) => n + i);
    this.$store.state.mainStore.sidebar_panel = false;
    this.fetchFinishedGoods();
    this.debouncedGetFinishedGoods = _.debounce(this.fetchFinishedGoods, 1000);
  },
};
</script>


<style scoped>
td {
  height: 0px !important;
  border-top: solid 1px !important;
  border-right: solid 1px !important;
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
.no-border {
  border: 0px !important;
}
th {
  background-color: #7fffd4 !important;
}
</style>