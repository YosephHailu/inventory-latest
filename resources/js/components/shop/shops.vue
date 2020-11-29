<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">SHOPES</v-card-title>
        <v-divider></v-divider>
      </v-toolbar>

      <v-row>
        <v-col v-for="(shop, index) in shops" :key="index" cols="6">
          <v-card class="text-center py-3">
            <v-avatar class="ma-3" size="125">
              <v-img :src="'./storage/shop/'+shop.photo"></v-img>
            </v-avatar>
            <v-toolbar-title class="text-center">{{shop.name}}</v-toolbar-title>
            <v-card-subtitle class="text-center py-0">{{shop.shop_id}}</v-card-subtitle>
            <v-btn :to="{path: '/shop/' + shop.id + '/edit'}" small>Edit</v-btn>
            <v-btn small @click="initDelete(shop)" class="red white--text">Delete</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="delete_dialog" class="danger" persistent max-width="290">
      <v-card class="red" dark>
        <v-card-title class="center headline">Confirm</v-card-title>
        <v-card-text>
          This operation is irreversible. are you sure you went to continue,
          Press cancel to get back
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white " text @click="delete_dialog = false;">Cancel</v-btn>
          <v-btn color="white" text @click="confirmDelete">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    delete_dialog: false,
    shops: [],
    shop: {}
  }),
  methods: {
    fetchStores() {
      axios
        .get("/api/shop")
        .then(response => {
          this.shops = response.data.shops;
        })
        .catch(error => {});
    },

    initDelete(shop) {
      this.shop = shop;
      this.delete_dialog = true;
    },
    confirmDelete() {
      axios
        .delete("/api/shop/" + this.shop.id)
        .then(response => {
          this.fetchStores();
          this.delete_dialog = false;
        })
        .catch(error => {
          this.delete_dialog = false;
        });
    }
  },
  created() {
    this.fetchStores();
  }
};
</script>