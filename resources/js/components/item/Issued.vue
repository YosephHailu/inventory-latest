<template>
  <v-data-table
    :headers="headers"
    :items="item_issued"
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
        v-bind:to="{path:'/issue-good/'+item.issue_item_id + '/manage'}"
      >Manage</v-btn>
      <v-btn icon v-bind:to="{path:'/issue-good/'+item.issue_item_id + '/edit'}">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      item_issued: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [
        {
          text: "Issue number",
          value: "issue_item.issue_id",
          class: "cyan--text"
        },
        {
          text: "Issued by",
          value: "issue_item.issued_by",
          class: "cyan--text"
        },
        {
          text: "Section",
          value: "issue_item.section.name",
          class: "cyan--text"
        },
        { text: "Quantity", value: "quantity", class: "cyan--text" },
        { text: "AVG price", value: "avg_price", class: "cyan--text" },
        { text: "", value: "action", class: "cyan--text" }
      ]
    };
  },
  methods: {
    fetchIssuedGoods() {
      axios
        .get(
          "/api/item_issued/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then(response => {
          this.item_issued = response.data.item_issued.data;
          this.totalItems = response.data.item_issued.total;
        })
        .catch(error => {});
    }
  },
  watch: {},
  created() {
    this.fetchIssuedGoods();
    this.debouncedReceivedGoods = _.debounce(this.fetchIssuedGoods, 1000);
  }
};
</script>