<template>
  <v-container>
    <v-card class="px-5 pb-5">
      <v-toolbar class="cyan">
        <v-divider></v-divider>
        <v-card-title class="white--text">{{finished_good.name}}</v-card-title>
        <v-divider></v-divider>
        <v-btn text outlined class="white--text no-print" @click="$router.go(-1)">close</v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar size="100">
            <img :src="'/storage/finished_good/' + finished_good.photo" alt />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{finished_good.name}}</v-list-item-title>
            <v-list-item-subtitle>{{finished_good.finished_good_id}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{finished_good.finished_good_model.model}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title>Balance : {{finished_good.balance}}</v-list-item-title>
            <v-list-item-subtitle>{{`I.balance : ${finished_good.initial_balance.toLocaleString()},`}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{`Beginning balance : ${finished_good.beginning_balance.toLocaleString()},`}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-title>Received</v-list-item-title>
            <v-list-item-subtitle>{{`Quantity : ${f_g_received_count.toLocaleString()},`}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{`Price : $${f_g_received_price.toLocaleString()},`}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <v-list-item-title>Issued</v-list-item-title>
            <v-list-item-subtitle>{{`Quantity : ${f_g_issued_count.toLocaleString()},`}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{`Price : $${f_g_issued_price.toLocaleString()},`}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action class="ma-0 pa-0">
            <v-btn icon :to="{path:'/finished-good/'+finished_good.id + '/edit'}">
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

export default {
  components: {
    Received,
    Issued
  },
  data: () => ({
    tab: null,
    f_g_issued_count: 0,
    f_g_received_count: 0,
    f_g_received_price: 0,
    f_g_issued_price: 0,
    finished_good: {
      finished_good_model: {}
    }
  }),
  methods: {
    fetchItem() {
      axios
        .get("/api/finished_good/" + this.$route.params.id)
        .then(response => {
          this.f_g_issued_count = response.data.f_g_issued_count;
          this.f_g_received_count = response.data.f_g_received_count;
          this.f_g_issued_price = response.data.f_g_issued_price;
          this.f_g_received_price = response.data.f_g_received_price;

          this.finished_good = response.data.finished_good;
        })
        .catch(error => {});
    }
  },
  watch: {},
  created() {
    this.fetchItem();
  }
};
</script>