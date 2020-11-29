<template>
  <section>
    <v-btn @click="dialog=true" absolute dark fab right centered color="cyan">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-toolbar class="cyan">
          <v-divider></v-divider>
          <v-card-title class="white--text">SUPPLIER REGISTRATION FORM</v-card-title>
          <v-divider></v-divider>
        </v-toolbar>

        <v-form ref="form" v-model="valid" @submit.prevent="handelSubmit">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="item.item_category.category"
                  :items="item_categories"
                  item-text="category"
                  item-value="id"
                  @change="fetchItem"
                  :rules="[v => !!v || 'Category field is required']"
                  label="Item category"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="item.item_id"
                  :items="items"
                  item-text="name"
                  item-value="item_id"
                  :rules="[v => !!v || 'Category field is required']"
                  label="Item category"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.quantity"
                  label="Quantity*"
                  :rules="[v => !!v || 'Quantity id is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.price"
                  label="Item price*"
                  :rules="[v => !!v || 'Price is required']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click.prevent="add">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      dialog: false,
      item: {
        item_category: {}
      },
      items: [],
      item_categories: []
    };
  },
  methods: {
    add() {
        console.log(this.item)
    },

    fetchOptions() {
      axios
        .get("/api/itemOptions")
        .then(response => {
          this.item_categories = response.data.itemCategories;
        })
        .catch(error => {});
    },
    fetchItem() {
        console.log(this.item.item_category)
    }
  },
  created() {
    this.fetchOptions();
  }
};
</script>