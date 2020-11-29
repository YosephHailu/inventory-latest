<template>
  <v-data-table
    :headers="headers"
    :items="f_g_sale_details"
    :options.sync="options"
    :server-items-length="totalItems"
    :footer-props="{
        'items-per-page-options': [15, 25, 35, 45, 55]
      }"
  >
    <template
      v-slot:item.date="{ item }"
    >{{`${item.f_g_sale.year} - ${item.f_g_sale.month} - ${item.f_g_sale.day}`}}</template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      f_g_sale_details: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [
        {
          text: "Sale id",
          value: "f_g_sale.sale_id",
          class: "cyan--text"
        },
        { text: "Quantity", value: "quantity", class: "cyan--text" },
        { text: "Price", value: "price", class: "cyan--text" },
        { text: "Date", value: "date", class: "cyan--text" }
      ]
    };
  },
  methods: {
    fetchSoldGoods() {
      axios
        .get(
          "/api/shop_finished_good_sold/" +
            this.$route.params.shop_id +
            "/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then(response => {
          this.f_g_sale_details = response.data.f_g_sale_details.data;
          this.totalItems = response.data.f_g_sale_details.total;
        })
        .catch(error => {});
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchSoldGoods();
      },
      deep: true
    }
  },
  created() {
    this.fetchSoldGoods();
    this.debouncedReceivedGoods = _.debounce(this.fetchSoldGoods, 1000);
  }
};
</script>