<template>
  <v-data-table
    :headers="headers"
    :items="item_received"
    :options.sync="options"
    :server-items-length="totalItems"
    :footer-props="{
        'items-per-page-options': [15, 25, 35, 45, 55]
      }"
  >
    <template v-slot:item.date="{ item }">{{`${item.year} - ${item.month} - ${item.day}`}}</template>
    <template v-slot:item.action="{ item }" class="pa-0">
      <v-btn
        small
        class="blue-grey white--text"
        v-bind:to="{path:'/receive-good/'+item.good_receive_id + '/manage'}"
      >Manage</v-btn>
      <v-btn icon v-bind:to="{path:'/receive-good/'+item.good_receive_id + '/edit'}">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      item_received: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [
        {
          text: "GRN",
          value: "good_receive.good_receive_id",
          class: "cyan--text"
        },
        {
          text: "Supplier",
          value: "good_receive.supplier.name",
          class: "cyan--text"
        },
        {
          text: "Invoice number",
          value: "good_receive.invoice_no",
          class: "cyan--text"
        },
        { text: "Quantity", value: "quantity", class: "cyan--text" },
        { text: "Price", value: "item_price", class: "cyan--text" },
        { text: "", value: "action", class: "cyan--text" }
      ]
    };
  },
  methods: {
    fetchReceivedGoods() {
      axios
        .get(
          "/api/item_received/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then(response => {
          this.item_received = response.data.item_received.data;
          this.totalItems = response.data.item_received.total;
        })
        .catch(error => {});
    }
  },
  watch: {},
  created() {
    this.fetchReceivedGoods();
    this.debouncedReceivedGoods = _.debounce(this.fetchReceivedGoods, 1000);
  }
};
</script>