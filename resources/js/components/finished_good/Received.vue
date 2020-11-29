<template>
  <v-data-table
    :headers="headers"
    :items="finished_good_received"
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
        v-bind:to="{path:'/receive-finished-good/'+item.f_g_receive_id + '/manage'}"
      >Manage</v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      finished_good_received: [],
      options: {
        itemsPerPage: 15
      },
      totalItems: 0,
      headers: [
        {
          text: "GRN",
          value: "f_g_receive.receive_id",
          class: "cyan--text"
        },
        {
          text: "Department",
          value: "f_g_receive.department.name",
          class: "cyan--text"
        },
        { text: "Quantity", value: "quantity", class: "cyan--text" },
        { text: "Price", value: "cost", class: "cyan--text" },
        { text: "", value: "action", class: "cyan--text" }
      ]
    };
  },
  methods: {
    fetchReceivedGoods() {
      axios
        .get(
          "/api/finished_good_received/" +
            this.$route.params.id +
            "?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page
        )
        .then(response => {
          this.finished_good_received =
            response.data.finished_good_received.data;
          this.totalItems = response.data.finished_good_received.total;
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