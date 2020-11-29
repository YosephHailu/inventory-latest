<template>
  <v-container>
    <v-card class="pb-5">
      <v-toolbar>
        <v-divider></v-divider>
        <v-card-title>FINISHED GOOD REPORT</v-card-title>
        <v-divider></v-divider>
        <v-btn text outlined class="no-print" @click="$router.go(-1)">close</v-btn>
      </v-toolbar>

      <print-header />

      <v-row class="px-5 no-print">
        <v-text-field hide-details label="Search by name or item id" v-model="search">
          <template v-slot:append>
            <v-btn icon @click="search = ''">
              <v-icon size="20">close</v-icon>
            </v-btn>
          </template>
        </v-text-field>

        <v-select
          v-model="model_id"
          hide-details
          :items="finished_good_models"
          item-text="model"
          item-value="id"
          label="Select model"
          @input="fetchFinishedGoods"
        >
          <template v-slot:append>
            <v-btn icon @click="model_id = null; fetchFinishedGoods()">
              <v-icon size="20">close</v-icon>
            </v-btn>
          </template>
        </v-select>
        <v-spacer></v-spacer>
        <v-btn class="mt-5 mx-1" text color="cyan" dark @click="exportItem">
          <v-icon>import_export</v-icon>EXPORT
        </v-btn>
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
          </tr>
        </thead>
        <tbody>
          <template v-for="(category, indexas) in group" style="width: 100%">
            <td class="border-all text-top" :key="indexas">{{indexas}}</td>
            <tr
              :class="item.balance <= item.min_balance ? 'red--text': ''"
              v-for="(item) in category"
              :key="item.id"
              style="width: 100%"
            >
              <td class="starter-border"></td>
              <td>{{item.finished_good_id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.balance}}</td>
              <td class="no-right-border">{{item.beginning_balance}}</td>
            </tr>

            <tr :key="indexas + '1'">
              <td class="starter-border"></td>
              <td class="report-border"></td>
              <td class="report-border"></td>
              <td class="blue--text" style="border: solid 1px">
                Total :
                {{category.reduce(function (total, value) {
                return total + Number(value.balance);
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
    </v-card>
  </v-container>
</template>

<script>
import PrintHeader from "../layouts/PrintHeader";

export default {
  components: {
    PrintHeader
  },
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
          "/api/finished_good?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.current_page +
            "&q=" +
            this.search +
            "&finished_good_model_id=" +
            this.model_id
        )
        .then(response => {
          this.options.current_page = response.data.finished_goods.current_page;
          this.options.last_page = response.data.finished_goods.last_page;
          this.group = response.data.finished_goods.data.reduce((r, a) => {
            r[a.finished_good_model.model] = [
              ...(r[a.finished_good_model.model] || []),
              a
            ];
            return r;
          }, {});
        })
        .catch(error => {});
    },
    
    exportItem() {
      window.open(
        "/finished_good_export?q=" + this.search + "&finished_good_model_id=" + this.model_id,
        "_blank"
      );
    },

    int_print() {
      window.print();
    },

    fetchOptions() {
      axios
        .get("/api/finishedGoodOptions")
        .then(response => {
          this.finished_good_models = response.data.finished_good_models;
        })
        .catch(error => {});
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchFinishedGoods();
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
    // this.$store.state.mainStore.sidebar_panel = false;
    this.fetchFinishedGoods();
    this.fetchOptions();
    this.debouncedGetItems = _.debounce(this.fetchFinishedGoods, 1000);
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