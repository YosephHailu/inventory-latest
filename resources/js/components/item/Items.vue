<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">RAW MATERIALS</v-card-title>
        <v-divider></v-divider>
        <v-btn text :to="{ path: '/item-report' }" dark>Reports</v-btn>
      </v-toolbar>

      <v-text-field
        label="Search by name or item id"
        v-model="search"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="totalItems"
        :footer-props="{
          'items-per-page-options': [15, 25, 50, 100, 500],
        }"
      >
        <template v-slot:item.action="{ item }">
          <v-btn icon v-bind:to="{ path: '/item/' + item.id }">
            <v-icon size="20">launch</v-icon>
          </v-btn>
          <v-btn icon v-bind:to="{ path: '/item/' + item.id + '/edit' }">
            <v-icon size="20">edit</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon size="20" class="red--text" @click="deleteItem(item)"
              >delete</v-icon
            >
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
    item: {},
    options: {
      itemsPerPage: 15,
    },
    totalItems: 0,
    itemsPerPage: 1,
    headers: [
      { text: "Item id", value: "item_id", class: "cyan--text" },
      { text: "Name", value: "name", class: "cyan--text" },
      {
        text: "Item category",
        value: "item_category.category",
        class: "cyan--text",
      },
      {
        text: "B. Balance",
        value: "beginning_balance",
        class: "cyan--text",
      },
      { text: "Balance", value: "balance", class: "cyan--text" },

      { text: "Unit", value: "unit.name", class: "cyan--text" },
      { text: "", value: "action", class: "cyan--text" },
    ],
  }),
  methods: {
    fetchItems() {
      axios
        .get(
          "/api/item?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page +
            "&sortBy=" +
            this.options.sortBy +
            "&q=" +
            this.search
        )
        .then((response) => {
          this.items = response.data.items.data;
          this.totalItems = response.data.items.total;
        })
        .catch((error) => {});
    },

    deleteItem(item) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/item/" + item.id)
          .then((response) => {
            this.fetchItems();
          })
          .catch((error) => {});
      }
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchItems();
      },
      deep: true,
    },
    search: {
      handler() {
        this.options.page = 1;
        this.debouncedGetItems();
      },
    },
  },
  created() {
    this.fetchItems();
    this.debouncedGetItems = _.debounce(this.fetchItems, 1000);
  },
};
</script>