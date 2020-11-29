<template>
  <v-data-table
    :headers="headers"
    :items="finished_good_issued"
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
        v-bind:to="{path:'/issue-finished-good/'+item.f_g_issue_id + '/manage'}"
      >Manage</v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      finished_good_issued: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [
        {
          text: "Issue id",
          value: "f_g_issue.issue_id",
          class: "cyan--text"
        },
        { text: "Quantity", value: "quantity", class: "cyan--text" },
        { text: "AVG price", value: "avg_price", class: "cyan--text" },
        { text: "", value: "action", class: "cyan--text" }
      ]
    };
  },
  methods: {
    fetchIssuedFinishedGoods() {
      axios
        .get(
          "/api/finished_good_issued/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then(response => {
          this.finished_good_issued = response.data.finished_good_issued.data;
          this.totalItems = response.data.finished_good_issued.total;
        })
        .catch(error => {});
    }
  },
  watch: {},
  created() {
    this.fetchIssuedFinishedGoods();
    this.debouncedReceivedGoods = _.debounce(
      this.fetchIssuedFinishedGoods,
      1000
    );
  }
};
</script>