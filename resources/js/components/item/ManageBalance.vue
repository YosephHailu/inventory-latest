<template>
  <v-card class="pa-3">
    <v-toolbar class="cyan">
      <v-divider></v-divider>
      <v-card-title class="white--text">MANAGE ITEM INITIAL BALANCE</v-card-title>
      <v-divider></v-divider>
      <v-btn text outlined class="white--text no-print" @click="$router.go(-1)">close</v-btn>
    </v-toolbar>
    <v-form ref="form" v-model="valid" @submit="handelSubmit" class="pt-4 no-print">
      <v-row>
        <v-col cols="12" md="4" class="py-0">
          <v-autocomplete
            v-model="item.item_category.id"
            :items="item_categories"
            item-text="category"
            item-value="id"
            @change="fetchItem"
            :rules="[v => !!v || 'Category field is required']"
            label="Item category"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4" class="py-0">
          <v-autocomplete
            v-model="item.id"
            :items="items"
            item-text="name"
            item-value="id"
            @change="selectItem"
            :rules="[v => !!v || 'Item field is required']"
            label="Item "
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4" class="py-0">
          <v-text-field
            v-model="item.initial_balance"
            type="number"
            :messages="'Current balance : ' + item.balance "
            label="Initial balance"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-list-item v-if="item.id">
        <v-list-item-content>
          <v-list-item-title>{{item.name}}</v-list-item-title>
          <v-list-item-subtitle>{{item.item_category.category}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title>Current balance : {{item.balance}}</v-list-item-title>
          <v-list-item-subtitle>Initial balance : {{item.initial_balance}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <div class="text-center mt-3">
        <v-btn
          dark
          color="cyan accent-6"
          :loading="btn_loading"
          rounded
          @click="handelSubmit"
        >Update</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      btn_loading: false,
      item_id: null,
      item: {
        item_category: {}
      },
      items: [],
      item_categories: []
    };
  },
  methods: {
    clearForm() {
      this.item = {
        item_category: {}
      };
    },
    handelSubmit() {
      if (this.$refs.form.validate()) {
        this.btn_loading = true;
        let formData = new FormData();

        Object.keys(this.item).forEach(key =>
          formData.append(key, this.item[key])
        );

        axios
          .post("/api/updateItemBalance/" + this.item.id, formData)
          .then(response => {
            this.btn_loading = false;
            this.clearForm();
          })
          .catch(error => {
            this.btn_loading = false;
          });
      }
    },

    selectItem() {
      this.item = this.items.filter(item => {
        return item.id == this.item.id;
      })[0];
      this.$refs.form.validate();
    },

    fetchItem() {
      axios
        .get("/api/items?item_category_id=" + this.item.item_category.id)
        .then(response => {
          this.items = response.data.items;
        })
        .catch(error => {});
    },
    fetchOptions() {
      axios
        .get("/api/itemOptions")
        .then(response => {
          this.item_categories = response.data.itemCategories;
        })
        .catch(error => {});
    }
  },
  created() {
    this.fetchOptions();
  }
};
</script>