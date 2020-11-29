<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">USERS</v-card-title>
        <v-divider></v-divider>
      </v-toolbar>

      <v-text-field label="Search by name or item id" v-model="search"></v-text-field>
      <v-data-table
        :headers="headers"
        :items="users"
        :options.sync="options"
        :server-items-length="totalItems"
        :footer-props="{
        'items-per-page-options': [15, 25, 50, 100, 500]
      }"
      >
        <template v-slot:item.action="{ item }">
          <v-btn icon v-bind:to="{path:'/user/'+item.id + '/edit'}">
            <v-icon size="20">edit</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon size="20" class="red--text" @click="deleteUser(item)">delete</v-icon>
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
    users: [],
    item: {},
    options: {
      itemsPerPage: 15
    },
    totalItems: 0,
    itemsPerPage: 1,
    headers: [
      { text: "User id", value: "user_id", class: "cyan--text" },
      { text: "First name", value: "first_name", class: "cyan--text" },
      { text: "Last name", value: "last_name", class: "cyan--text" },
      { text: "Email", value: "email", class: "cyan--text" },

      { text: "User", value: "username", class: "cyan--text" },
      { text: "", value: "action", class: "cyan--text" }
    ]
  }),
  methods: {
    fetchUsers() {
      axios
        .get(
          "/api/user?itemsPerPage=" +
            this.options.itemsPerPage +
            "&page=" +
            this.options.page +
            "&sortBy=" +
            this.options.sortBy +
            "&q=" +
            this.search
        )
        .then(response => {
          this.users = response.data.users.data;
          this.totalItems = response.data.users.total;
        })
        .catch(error => {});
    },

    deleteUser(item) {
      if (confirm("Are you sure you went to delete")) {
        axios
          .delete("/api/user/" + item.id)
          .then(response => {
            this.fetchUsers();
          })
          .catch(error => {});
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchUsers();
      },
      deep: true
    },
    search: {
      handler() {
        this.options.page = 1;
        this.debouncedGetItems();
      }
    }
  },
  created() {
    this.fetchUsers();
    this.debouncedGetItems = _.debounce(this.fetchUsers, 1000);
  }
};
</script>