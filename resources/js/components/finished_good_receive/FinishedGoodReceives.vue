<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">RECEIVED FINISHED GOODS</v-card-title>
        <v-divider></v-divider>
        <v-btn text :to="{path: '/receive-finished-good-report'}" dark>Reports</v-btn>
      </v-toolbar>

      <v-text-field label="Search by grn" v-model="search"></v-text-field>
      <v-data-table
        :headers="headers"
        :items="received_finished_goods"
        :options.sync="options"
        :server-items-length="totalItems"
        :footer-props="{
        'items-per-page-options': [15, 25, 35, 45, 55]
      }"
      >
        <template v-slot:item.date="{ item }">{{`${item.day} - ${item.month} - ${item.year}`}}</template>
        <template v-slot:item.action="{ item }">
          <v-btn
            small
            class="blue-grey white--text"
            v-bind:to="{path:'receive-finished-good/'+item.id + '/manage'}"
          >Manage</v-btn>
          <v-btn icon v-bind:to="{path:'receive-finished-good/'+item.id + '/edit'}">
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
    received_finished_goods: [],
    item: {},
    options: {
      itemsPerPage: 15
    },
    totalItems: 0,
    headers: [
      { text: "GRN", value: "receive_id", class: "cyan--text" },
      { text: "Department", value: "department.name", class: "cyan--text" },
      { text: "Date", value: "date", class: "cyan--text" },
      { text: "Action", value: "action", class: "cyan--text" }
    ]
  }),
  methods: {
    fetchReceivedGoods() {
      axios
        .get(
          "/api/finished_good_receive?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page +
            "&q=" +
            this.search
        )
        .then(response => {
          this.received_finished_goods =
            response.data.received_finished_goods.data;
          this.totalItems = response.data.received_finished_goods.total;
        })
        .catch(error => {});
    },

    deleteGoodReceive(item) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/finished_good_receive/" + item.id)
          .then(response => {
          console.log(response.data)

            this.fetchReceivedGoods();
          })
          .catch(error => {
          console.log(error.response.data)
          });
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchReceivedGoods();
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
    this.debouncedReceivedGoods = _.debounce(this.fetchReceivedGoods, 1000);
  }
};
</script>