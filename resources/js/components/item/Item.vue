<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">{{item.name}}</v-card-title>
        <v-divider></v-divider>
        <v-btn text outlined class="white--text no-print" @click="$router.go(-1)">close</v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar size="100">
            <img :src="'storage/logo.png' + item.photo && 'placeholder.png'" alt />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>{{item.item_id}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{item.item_category.category}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title>Balance : {{item.balance}}</v-list-item-title>
            <v-list-item-subtitle>{{`I.Balance : ${item.initial_balance}`}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{`${getConfig.date[2]} Beginning balance : ${item.beginning_balance}`}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-title>Received</v-list-item-title>
            <v-list-item-subtitle>{{`Quantity : ${item_received_count}`}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{`Price : $${item_received_price.toLocaleString()}`}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-title>Issued</v-list-item-title>
            <v-list-item-subtitle>{{`Quantity : ${item_issued_count}`}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{`Price : $${item_issued_price.toLocaleString()}`}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action class="ma-0 pa-0">
            <v-btn icon :to="{path:'/item/'+item.id + '/edit'}">
              <v-icon color="blue">edit</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>

      <v-tabs centered v-model="tab">
        <v-tabs-slider></v-tabs-slider>

        <v-tab>RECEIVED</v-tab>

        <v-tab>ISSUED</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="px-0">
        <v-tab-item>
          <Received />
        </v-tab-item>
        <v-tab-item>
          <Issued />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Received from "./Received.vue";
import Issued from "./Issued.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Received,
    Issued
  },
  data: () => ({
    tab: null,
    item_issued_count: 0,
    item_received_count: 0,
    item_received_price: 0,
    item_issued_price: 0,
    item: {
      item_category: {}
    }
  }),
  methods: {
    fetchItem() {
      axios
        .get("/api/item/" + this.$route.params.id)
        .then(response => {
          this.item_issued_count = response.data.item_issued_count;
          this.item_received_count = response.data.item_received_count;
          this.item_received_price = response.data.item_received_price;
          this.item_issued_price = response.data.item_issued_price;

          this.item = response.data.item;
        })
        .catch(error => {});
    }
  },
  computed: {
    ...mapGetters(['getConfig'])
  },
  watch: {},
  created() {
    this.fetchItem();
    console.log("getConfig", this.getConfig);
  }
};
</script>