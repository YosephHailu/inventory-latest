<template>
  <v-data-table
    :headers="headers"
    :items="f_g_return_details"
    :options.sync="options"
    :server-items-length="totalItems"
    :footer-props="{
      'items-per-page-options': [15, 25, 35, 45, 55],
    }"
  >
    <template v-slot:item.date="{ item }">{{
      `${item.f_g_return.year} - ${item.f_g_return.month} - ${item.f_g_return.day}`
    }}</template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      f_g_return_details: [],
      options: {
        itemsPerPage: 15,
      },
      totalItems: 0,
      headers: [
        {
          text: "Return ID",
          value: "f_g_return.return_id",
          class: "cyan--text",
        },
        { text: "Quantity", value: "quantity", class: "cyan--text" },
        { text: "Date", value: "date", class: "cyan--text" },
      ],
    };
  },
  methods: {
    fetchReturnedGoods() {
      axios
        .get(
          "/api/shop_finished_good_returned/" +
            this.$route.params.shop_id +
            "/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then((response) => {
          this.f_g_return_details = response.data.f_g_return_details.data;
          this.totalItems = response.data.f_g_return_details.total;
        })
        .catch((error) => {});
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchReturnedGoods();
      },
      deep: true,
    },
  },
  created() {
    this.fetchReturnedGoods();
    this.debouncedReturnedGoods = _.debounce(this.fetchReturnedGoods, 1000);
  },
};
</script>