<template>
  <v-data-table
    :headers="headers"
    :items="f_g_issue_details"
    :options.sync="options"
    :server-items-length="totalItems"
    :footer-props="{
        'items-per-page-options': [15, 25, 35, 45, 55]
      }"
  >
    <template
      v-slot:item.date="{ item }"
    >{{`${item.f_g_issue.year} - ${item.f_g_issue.month} - ${item.f_g_issue.day}`}}</template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      f_g_issue_details: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [
        {
          text: "ISSUE ID",
          value: "f_g_issue.issue_id",
          class: "cyan--text"
        },
        { text: "Quantity", value: "quantity", class: "cyan--text" },
        { text: "AVG Price", value: "avg_price", class: "cyan--text" },
        { text: "Date", value: "date", class: "cyan--text" }
      ]
    };
  },
  methods: {
    fetchReceivedGoods() {
      axios
        .get(
          "/api/shop_finished_good_received/" +
            this.$route.params.shop_id +
            "/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then(response => {
          this.f_g_issue_details = response.data.f_g_issue_details.data;
          this.totalItems = response.data.f_g_issue_details.total;
        })
        .catch(error => {});
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchReceivedGoods();
      },
      deep: true
    }
  },
  created() {
    this.fetchReceivedGoods();
    this.debouncedReceivedGoods = _.debounce(this.fetchReceivedGoods, 1000);
  }
};
</script>