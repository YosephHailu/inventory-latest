<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">FINISHED GOODS</v-card-title>
        <v-divider></v-divider>
        <v-btn text :to="{path: '/finished-good-report'}" dark>Reports</v-btn>
      </v-toolbar>

      <v-text-field label="Search by name or item id" v-model="search"></v-text-field>
      <v-data-table
        :headers="headers"
        :items="finished_goods"
        :options.sync="options"
        :server-items-length="totalItems"
        :footer-props="{
        'items-per-page-options': [15, 25, 50, 100, 500]
      }"
      >
        <template v-slot:item.action="{ item }">
          <v-btn icon v-bind:to="{path:'/finished-good/'+item.id}">
            <v-icon size="20">launch</v-icon>
          </v-btn>
          <v-btn icon v-bind:to="{path:'/finished-good/'+item.id + '/edit'}">
            <v-icon size="20">edit</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon size="20" class="red--text" @click="deleteItem(item)">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    delete_dialog: false,
    search: "",
    finished_goods: [],
    finished_good: {},
    options: {
      itemsPerPage: 15
    },
    totalItems: 0,
    itemsPerPage: 1,
    headers: [
      {
        text: "Finished good id",
        value: "finished_good_id",
        class: "cyan--text"
      },
      { text: "Name", value: "name", class: "cyan--text" },
      {
        text: "category",
        value: "finished_good_model.model",
        class: "cyan--text"
      },
      {
        text: "B. Balance",
        value: "beginning_balance",
        class: "cyan--text"
      },
      { text: "Balance", value: "balance", class: "cyan--text" },

      { text: "Unit", value: "unit.name", class: "cyan--text" },
      { text: "", value: "action", class: "cyan--text" }
    ]
  }),
  methods: {
    fetchFinishedGoods() {
      axios
        .get(
          "/api/finished_good?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page +
            "&sortBy=" +
            this.options.sortBy +
            "&q=" +
            this.search
        )
        .then(response => {
          this.finished_goods = response.data.finished_goods.data;
          this.totalItems = response.data.finished_goods.total;
        })
        .catch(error => {});
    },

    deleteItem(finished_good) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/finished_good/" + finished_good.id)
          .then(response => {
            this.fetchFinishedGoods();
          })
          .catch(error => {});
      }
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