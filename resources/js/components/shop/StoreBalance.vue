<template>
  <v-container>
    <v-row class="px-5 no-print">
      <v-text-field hide-details label="Search by finished good id or name" v-model="search">
        <template v-slot:append>
          <v-btn icon @click="search = ''">
            <v-icon size="20">close</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="mt-5 mx-1" text color="cyan" dark @click="int_print">
        <v-icon class="mx-2">print</v-icon>Print
      </v-btn>
    </v-row>

    <v-simple-table dense fixed-header>
      <thead>
        <tr>
          <th>Model</th>
          <th>Finished Good id</th>
          <th>Name</th>
          <th>Balance</th>
          <th>B balance</th>
          <th class="no-print" max-width="15px" style="max-width:45px"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(category, index) in group" style="width: 100%">
          <td class="border-all text-top" :key="index + 'a'">{{index}}</td>
          <tr
            :class="item.balance <= item.min_balance ? 'red--text': ''"
            v-for="(item) in category"
            :key="item.id"
            style="width: 100%"
          >
            <td class="starter-border"></td>
            <td>{{item.finished_good.finished_good_id}}</td>
            <td>{{item.finished_good.name}}</td>
            <td>{{item.quantity}}</td>
            <td class="no-right-border">{{item.beginning_balance}}</td>
            <td class="no-print" style="max-width:65px">
              <v-btn
                icon
                :to="{path: '/shop-finished-good/' + item.finished_good_id + '/' + $route.params.id}"
              >
                <v-icon>launch</v-icon>
              </v-btn>
            </td>
          </tr>

          <tr :key="index + 'b'">
            <td class="starter-border"></td>
            <td class="report-border"></td>
            <td class="report-border"></td>
            <td class="blue--text" style="border: solid 1px">
              Total :
              {{category.reduce(function (total, value) {
              return total + Number(value.quantity);
              }, 0)}}
            </td>
            <td></td>
          </tr>
        </template>
      </tbody>
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
export default {
  data: () => ({
    valid: false,
    delete_dialog: false,
    search: "",
    model_id: "",
    items: [],
    item: {},
    options: {
      itemsPerPage: 150
    },
    total_items: 0,
    itemsPerPage: 1,
    group: [],
    finished_good_models: []
  }),
  methods: {
    fetchFinishedGoods() {
      axios
        .get(
          "/api/shop_finished_goods/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.current_page +
            "&q=" +
            this.search +
            "&finished_good_model_id=" +
            this.model_id
        )
        .then(response => {
          this.options.current_page = response.data.shop_f_gs.current_page;
          this.options.last_page = response.data.shop_f_gs.last_page;
          this.group = response.data.shop_f_gs.data.reduce((r, a) => {
            r[a.finished_good.finished_good_model.model] = [
              ...(r[a.finished_good.finished_good_model.model] || []),
              a
            ];
            return r;
          }, {});
        })
        .catch(error => {});
    },
    int_print() {
      window.print();
    }
  },
  watch: {
    search: {
      handler() {
        this.options.page = 1;
        this.debouncedGetFinishedGoods();
      }
    }
  },
  created() {
    this.fetchFinishedGoods();
    this.debouncedGetFinishedGoods = _.debounce(this.fetchFinishedGoods, 1000);

  }
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
th {
  background-color: #7fffd4 !important;
}
</style>