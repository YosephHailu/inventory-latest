<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">ISSUED FINISHED GOODS</v-card-title>
        <v-divider></v-divider>
        <v-btn text :to="{path: '/issue-finished-good-report'}" dark>Reports</v-btn>
      </v-toolbar>

      <v-text-field label="Search by name or item id" v-model="search"></v-text-field>
      <v-data-table
        :headers="headers"
        :items="f_g_issues"
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
            v-bind:to="{path:'issue-finished-good/'+item.id + '/manage'}"
          >Manage</v-btn>
          <v-btn icon v-bind:to="{path:'issue-finished-good/'+item.id + '/edit'}">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon class="red--text" @click="deleteGoodReceive(item)">delete</v-icon>
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
    items: [],
    f_g_issues: [],
    item: {},
    options: {
      itemsPerPage: 15
    },
    totalItems: 0,
    headers: [
      { text: "GRN", value: "issue_id", class: "cyan--text" },
      { text: "Shop", value: "shop.name", class: "cyan--text" },
      { text: "Date", value: "date", class: "cyan--text" },
      { text: "", value: "action", class: "cyan--text" }
    ]
  }),
  methods: {
    fetchIssuedGoods() {
      axios
        .get(
          "/api/finished_good_issue?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page +
            "&q=" +
            this.search
        )
        .then(response => {
          this.f_g_issues = response.data.f_g_issues.data;
          this.totalItems = response.data.f_g_issues.total;
        })
        .catch(error => {});
    },

    deleteGoodReceive(item) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/finished_good_issue/" + item.id)
          .then(response => {
            this.fetchIssuedGoods();
          })
          .catch(error => {});
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchIssuedGoods();
      },
      deep: true
    },
    search: {
      handler() {
        this.debouncedReceivedGoods();
      }
    }
  },
  created() {
    this.fetchIssuedGoods();
    this.debouncedReceivedGoods = _.debounce(this.fetchIssuedGoods, 1000);
  }
};
</script>